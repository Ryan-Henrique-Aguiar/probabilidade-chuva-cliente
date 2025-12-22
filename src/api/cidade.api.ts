export async function buscarDadosCidadePorAno(
  cidade: string,
  ano: number
) {
  const res = await fetch(
    `http://localhost:8081/api/cidade/classificacao?nome=${cidade}&ano=${ano}`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar dados da cidade");
  }

  return res.json();
}