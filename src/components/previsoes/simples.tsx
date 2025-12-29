import { useState, useEffect } from "react";

type Props = {
  cidade: string;
};

export default function PrevisaoSimples({ cidade }: Props) {
  const [diaselecionado, setdiaselecionado] = useState<number>(1);
  const [messelecionado, setmesselecionado] = useState<number>(1);
  const [probabilidade, setprobabilidade] = useState<number | null>(null);

  // estado "gatilho" para o useEffect
  const [calcular, setCalcular] = useState<boolean>(false);

  useEffect(() => {
    if (!calcular) return; // só roda quando clicar no botão
    if (!diaselecionado || !messelecionado) return;

    fetch(
      `http://localhost:8081/api/cidade/probabilidade5dias?nome=${cidade}&dia=${diaselecionado}&mes=${messelecionado}`
    )
      .then((res) => res.json())
      .then((data: number) => setprobabilidade(data))
      .catch((err) => {
        console.error(err);
        setprobabilidade(null);
      })
      .finally(() => setCalcular(false)); // reseta o gatilho
  }, [diaselecionado, messelecionado, calcular, cidade]);

  return (
    <div>
      
    Dia Inicial:{" "}
    <input
        type="text"
        value={diaselecionado ?? ""}
        onChange={(e) => setdiaselecionado(Number(e.target.value))}
        size={5}
        maxLength={2}
    />
    

    
    Mês:{" "}
    <input
        type="text"
        value={messelecionado ?? ""}
        onChange={(e) => setmesselecionado(Number(e.target.value))}
        size={5}
        maxLength={2}
    />

    <button onClick={() => setCalcular(true)}>✔</button>
    

    
    {probabilidade !== null
        ? `Probabilidade: ${probabilidade * 100}%`
        : "Digite dia e mês e clique em calcular"}
    
    </div>
  );
}
