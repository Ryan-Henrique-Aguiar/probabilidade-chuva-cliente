import { useEffect, useState } from "react";
import "./FiltroLocalizacao.css";

type Dados = {
  [regiao: string]: {
    [estado: string]: string[];
  }; 
};
type Props = {
  onSelecionarCidade: (cidade: string) => void;
};

export default function FiltroLocalizacao({ onSelecionarCidade }: Props) {
  const [dados, setDados] = useState<Dados>({});
  const [regiaoAberta, setRegiaoAberta] = useState(false);
  const [estadoAberto, setEstadoAberto] = useState(false);
  const [cidadeAberta, setCidadeAberta] = useState(false);

  const [regiaoSelecionada, setRegiaoSelecionada] = useState<string | null>(null);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/localizacao/listarcidadesporestado")
      .then((res) => res.json())
      .then((data: Dados) => setDados(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSelectRegiao = (r: string) => {
    setRegiaoSelecionada(r);
    setRegiaoAberta(false);
    setEstadoSelecionado(null);
    setCidadeSelecionada(null);
  };

  const handleSelectEstado = (e: string) => {
    setEstadoSelecionado(e);
    setEstadoAberto(false);
    setCidadeSelecionada(null);
  
  };

  const handleSelectCidade = (c: string) => {
    setCidadeSelecionada(c);
    setCidadeAberta(false);
    onSelecionarCidade(c);
  };
  return (
    <div className="filtro-container">
      <div className="botao-container">
        {/* REGIÃO */}
        <div className="relative">
          <button
            className="botao"
            onClick={() => setRegiaoAberta(!regiaoAberta)}
          >
            Região {regiaoSelecionada ? `: ${regiaoSelecionada}` : ""}
          </button>
          {regiaoAberta && (
            <div className="dropdown">
              {Object.keys(dados).map((r) => (
                <button key={r} onClick={() => handleSelectRegiao(r)}>
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ESTADO */}
        <div className="relative">
          <button
            className="botao"
            onClick={() => setEstadoAberto(!estadoAberto)}
          >
            Estado {estadoSelecionado ? `: ${estadoSelecionado}` : ""}
          </button>
          {estadoAberto && (
            <div className="dropdown">
              {regiaoSelecionada
                ? Object.keys(dados[regiaoSelecionada]).map((e) => (
                    <button key={e} onClick={() => handleSelectEstado(e)}>
                      {e}
                    </button>
                  ))
                : <p style={{ padding: "0.5rem", color: "#888" }}>Selecione uma região</p>}
            </div>
          )}
        </div>

        {/* CIDADE */}
        <div className="relative">
          <button
            className="botao"
            onClick={() => setCidadeAberta(!cidadeAberta)}
          >
            Cidade {cidadeSelecionada ? `: ${cidadeSelecionada}` : ""}
          </button>
          {cidadeAberta && (
            <div className="dropdown">
              {regiaoSelecionada && estadoSelecionado
                ? dados[regiaoSelecionada][estadoSelecionado].map((c) => (
                    <button key={c} onClick={() => handleSelectCidade(c)}>
                      {c}
                    </button>
                  ))
                : <p style={{ padding: "0.5rem", color: "#888" }}>Selecione região e estado</p>}
            </div>
          )}
        </div>
      </div>

      {/* RESULTADO */}
      {regiaoSelecionada && estadoSelecionado && cidadeSelecionada && (
        <p className="resultado">
          Selecionado: {regiaoSelecionada} → {estadoSelecionado} → {cidadeSelecionada}
        </p>
      )}
    </div>
  );
}
