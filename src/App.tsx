
import { useState } from 'react';
import './App.css'
import FiltroLocalizacao from "./components/filtrolocalizacao/FiltroLocalizacao";
import GraficoChuva from './components/graficocidade/graficoChuva';
import { buscarDadosCidadePorAno } from './api/cidade.api';
import {type DadoChuvaCompleto, type DadoChuva } from './components/types/chuva';
import PrevisaoSimples from './components/previsoes/simples';
import PrevisaoMedia from './components/previsoes/Media';




function App() {
  const [dadosCompletos, setDadosCompletos] = useState<DadoChuvaCompleto[]>([]);
    const [dados, setDados] = useState<DadoChuva[]>([]);
  const [cidade, setCidade] = useState<string | null>(null);

  const [diaInicial, setDiaInicial] = useState<number | null>(null);
  const [mesInicial, setMesInicial] = useState<number | null>(null);

  async function carregarDados(cidadeSelecionada: string) {
    setCidade(cidadeSelecionada);
    const resposta = await buscarDadosCidadePorAno(cidadeSelecionada);
    setDados(resposta);
    setDadosCompletos(resposta)
  
  }

  return (
    <div className="container">
      <h1>Probabilidade de Chuva</h1>
      <FiltroLocalizacao onSelecionarCidade={carregarDados} />
      {cidade && <h2>Média de Chuvas em {cidade}</h2>}
      {dados.length > 0 && <GraficoChuva dados={dados} />}
    <div>
      {cidade&&<PrevisaoSimples cidade={cidade} setDiaInicial={setDiaInicial} 
  setMesInicial={setMesInicial}/>}
      </div>
      {cidade && diaInicial && mesInicial && dadosCompletos.length > 0 && (
        <PrevisaoMedia  
          dados={dadosCompletos} 
          diaInicial={diaInicial} 
          mes={mesInicial} 
        />
      )}

    </div>
  );
}

export default App
