import type { DadoChuvaCompleto } from "../types/chuva";

type Props = {
  dados: DadoChuvaCompleto[];
  diaInicial: number;
  mes: number;
};

export default function PrevisaoMedia({ dados, diaInicial, mes }: Props) {
  if (!dados || dados.length === 0) return null;

  // Encontrar o índice do dia inicial
  const indiceInicial = dados.findIndex((dado) => {
    const data = new Date(dado.data);
    return data.getDate() === diaInicial && data.getMonth() + 1 === mes;
  });

  // Pegar os 5 dias consecutivos a partir do índice encontrado
  const cincoDias = indiceInicial >= 0 ? dados.slice(indiceInicial-1, indiceInicial-1 + 5) : [];

  return (
    <div>
      <h3>Classificação dos 5 dias</h3>
      {cincoDias.map((dado) => (
        <div key={dado.data}>
          {dado.data}: {dado.classificacao} (Total: {dado.totalDia.toFixed(2)}, Max horário: {dado.maxHorario.toFixed(2)})
        </div>
      ))}
    </div>
  );
}
