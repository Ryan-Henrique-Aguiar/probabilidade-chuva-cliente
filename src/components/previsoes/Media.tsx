import type { DadoChuvaCompleto } from "../types/chuva";
import { imagensClima } from "../clima/imagens";
import './cards.css'

type Props = {
  dados: DadoChuvaCompleto[];
  diaInicial: number;
  mes: number;
};

function getImagemClima(classificacao: string) {
  switch (classificacao.toLowerCase()) {
    case "sem chuva":
      return imagensClima.sol;
    case "parcialmente nublado":
        return imagensClima.nublado;
    case "chuva fraca":
      return imagensClima.chuvaesol;

    case "chuva moderada":
      return imagensClima.chuvaesol;

    case "chuva forte":
        return imagensClima.chuvamoderada

    case "chuva muito forte":
      return imagensClima.tempestade;


    default:
      return imagensClima.sol; // imagem padrão
  }
}


export default function PrevisaoMedia({ dados, diaInicial, mes }: Props) {
  if (!dados || dados.length === 0) return null;

  // Encontrar o índice do dia inicial
  const indiceInicial = dados.findIndex((dado) => {
    const data = new Date(dado.data);
    return data.getDate() === diaInicial && data.getMonth() + 1 === mes;
  });

  // Pegar os 5 dias consecutivos a partir do índice encontrado
  const cincoDias = indiceInicial >= 0 ? dados.slice(indiceInicial, indiceInicial + 5) : [];

  return (
    <div className="container-cards">
      
      {cincoDias.map((dado) => {
        const data = new Date(dado.data);
        const diaStr = String(data.getDate()).padStart(2, "0");
        const mesStr = String(data.getMonth() + 1).padStart(2, "0");
        const imagemClima = getImagemClima(dado.classificacao);
        return (
            <div key={dado.data} className="cartao-dia">
                {/* Imagem do Clima (em cima) */}
                <img
                src={imagemClima}
                alt={dado.classificacao}
                style={{ width: "40px", height: "40px" }}
                />

                {/* Data e Classificação (centralizados) */}
                <span className="data-classificacao">
                {diaStr}/{mesStr}
                </span>
                <span className="data-classificacao">{dado.classificacao}</span>
                
                {/* Detalhes (pequenos) */}
                <span className="detalhes">
                Total: {dado.totalDia.toFixed(2)}
                </span>
                <span className="detalhes">
                Max horário: {dado.maxHorario.toFixed(2)}
                </span>
            </div>
            );
      })}
    </div>
  );
  
}
