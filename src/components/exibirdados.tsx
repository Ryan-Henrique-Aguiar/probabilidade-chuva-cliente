import { useEffect, useState } from "react";
import { buscarDadosCidadePorAno } from "../api/cidade.api";



export default function ExibirDadosSimples() {
    
    // Apenas para guardar o resultado e o status.
    const [resultadoApi, setResultadoApi] = useState("Aguardando busca...");
    const cidade = "brasilia";
    const ano = 2022;   

    // Executa a busca
    useEffect(() => {
        const buscarDados = async () => {
            
            const dadosRetornados = await buscarDadosCidadePorAno(cidade, ano);
                
            // CONVERSÃO MÁGICA: Converte o objeto JavaScript em uma string formatada
            const textoFormatado = JSON.stringify(dadosRetornados, null, 2);
                
            setResultadoApi(textoFormatado); // Salva o texto formatado no estado
        
        };
        buscarDados();
    }, []);

    return (
        <div>
            <h1>({cidade}, {ano})</h1>
            
            {resultadoApi}
            
        </div>
    );
}