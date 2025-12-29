export async function buscarDadosCidadePorAno(
  cidade: string,
) {
  const res = await fetch(
    `http://localhost:8081/api/cidade/classificacaomedia?nome=${cidade}`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar dados da cidade");
  }

  return res.json();
}