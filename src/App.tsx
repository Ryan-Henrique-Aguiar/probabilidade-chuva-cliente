
import { useState } from 'react';
import './App.css'
import FiltroLocalizacao from "./components/filtrolocalizacao/FiltroLocalizacao";
import GraficoChuva from './components/graficocidade/graficoChuva';
import { buscarDadosCidadePorAno, buscarDadosTemperaturaCidadePorAno } from './api/cidade.api';
import {type DadoChuvaCompleto, type DadoChuva } from './components/types/chuva';
import PrevisaoSimples from './components/previsoes/simples';
import PrevisaoMedia from './components/previsoes/Media';
import PrevisaoTemperaturaUmidade from './components/previsoes/MediaTemperatura';
import type { DadoTemperaturaUmidade } from './components/types/temperaturaUmidade';




function App() {
  const [dadosCompletos, setDadosCompletos] = useState<DadoChuvaCompleto[]>([]);
    const [dados, setDados] = useState<DadoChuva[]>([]);
  const [cidade, setCidade] = useState<string | null>(null);

  const [dadosTemperaturaUmidade, setdadosTemperaturaUmidade] = useState<DadoTemperaturaUmidade[]>([]);

  const [diaInicial, setDiaInicial] = useState<number | null>(null);
  const [mesInicial, setMesInicial] = useState<number | null>(null);

  async function carregarDados(cidadeSelecionada: string) {
    setCidade(cidadeSelecionada);
    const resposta = await buscarDadosCidadePorAno(cidadeSelecionada);
    setDados(resposta);
    setDadosCompletos(resposta)
    
    const repostaTempUmid = await buscarDadosTemperaturaCidadePorAno(cidadeSelecionada);
    setdadosTemperaturaUmidade(repostaTempUmid);
  }

  return (
    <div className="container">
      <h1>Escolha a Cidade</h1>
      <FiltroLocalizacao onSelecionarCidade={carregarDados} />
      
      <div className='container-dados-visualizacao'>
      
      <div className='container-grafico'>
      {cidade && <h2>Média de Chuvas em {cidade}</h2>}
      {dados.length > 0 && <GraficoChuva dados={dados} />}
      </div>

    <div className="container-probabilidade">
      {cidade&&<PrevisaoSimples cidade={cidade} setDiaInicial={setDiaInicial} 
  setMesInicial={setMesInicial}/>}
  {cidade && diaInicial && mesInicial && dadosCompletos.length > 0 && (
        <PrevisaoMedia  
          dados={dadosCompletos} 
          diaInicial={diaInicial} 
          mes={mesInicial} 
        />
        
      )}
      {cidade&&diaInicial&&mesInicial&&dadosTemperaturaUmidade.length > 0 &&(
        <PrevisaoTemperaturaUmidade dados={dadosTemperaturaUmidade} diaInicial={diaInicial} mes={mesInicial}/>
      )}
      </div>
      </div>
      </div>
  );
}

export default App
