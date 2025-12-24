
import { useState } from 'react';
import './App.css'
import FiltroLocalizacao from "./components/filtrolocalizacao/FiltroLocalizacao";
import GraficoChuva from './components/graficocidade/graficoChuva';
import { buscarDadosCidadePorAno } from './api/cidade.api';
import type { DadoChuva } from './components/types/chuva';



function App() {
    const [dados, setDados] = useState<DadoChuva[]>([]);
  const [cidade, setCidade] = useState<string | null>(null);

  async function carregarDados(cidadeSelecionada: string) {
    setCidade(cidadeSelecionada);
    const ano = 2025;
    const resposta = await buscarDadosCidadePorAno(cidadeSelecionada, ano);
    setDados(resposta);
  }

  return (
    <div className="container">
      <h1>Probabilidade de Chuva</h1>
      <FiltroLocalizacao onSelecionarCidade={carregarDados} />
      {cidade && <h2>Média de Chuvas em {cidade}</h2>}
      {dados.length > 0 && <GraficoChuva dados={dados} />}
    </div>
  );
}

export default App
