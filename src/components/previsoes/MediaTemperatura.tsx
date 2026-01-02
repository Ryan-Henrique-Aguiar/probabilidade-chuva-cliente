
import {imagensTemperatura, imagensUmidade } from "../clima/imagens";
import type { DadoTemperaturaUmidade } from "../types/temperaturaUmidade"

type Props = {
    dados: DadoTemperaturaUmidade[];
    diaInicial: number;
    mes: number;
}

function getImagemTemperatura(classificacao: number) {
    
    if(classificacao<18){
        return imagensTemperatura.baixa
    }
    if(classificacao>= 18 || classificacao<25){
        return imagensTemperatura.media
    }
    if(classificacao>= 25 || classificacao<30){
        return imagensTemperatura.alta
    }
    if(classificacao>=30){
        return imagensTemperatura.muitoAlta
    }
}

export default function PrevisaoTemperaturaUmidade({dados,diaInicial,mes}:Props){
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

        const temperatura = String(dado.tempMedia)
        const imagemTemperatura = getImagemTemperatura(dado.tempMedia)

        const umidade = String(dado.umdMedia)
        const imagemUmidade = imagensUmidade.umidade
        return (
            <div key={dado.data} className="cartao-dia">
                {/* Imagem do Clima (em cima) */}
                <img
                src={imagemTemperatura}
                alt={String(temperatura)}
                style={{ width: "40px", height: "40px" }}
                />
                

                {/* Data e Classificação (centralizados) */}
                <span className="data-classificacao">
                {diaStr}/{mesStr}
                </span>
                <span className="data-classificacao">{temperatura}</span>
                
                {/* Detalhes (pequenos) */}
                <span className="detalhes">
                <img src={imagemUmidade} alt="Icon imagem umidade" style={{width:"20px",height:"20px"}} /> {umidade}%
                </span>
                
            </div>
            );
      })}
    </div>
  );
}