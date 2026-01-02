# Previsão de Chuva e Temperatura (Frontend)

## Descrição
Este projeto é o **frontend** da aplicação de previsão de chuva e temperatura, desenvolvido em **React** com **Vite** e **TypeScript**.  

O frontend consome os dados do backend (Java + Spring Boot), processados a partir de arquivos CSV do **INMET**, e apresenta:

- Gráficos de temperatura e chuva média ao longo do ano.
- Probabilidade de chuva nos próximos 5 dias.
- Visualização clara e interativa dos dados meteorológicos.

O uso de **TypeScript** garante maior robustez do código e facilita a manutenção.

---

## Tecnologias Utilizadas
- **React** (biblioteca para construção da interface)
- **Vite** (bundler e dev server rápido)
- **TypeScript** (tipagem estática para segurança e legibilidade)
- **Recharts** (para gráficos interativos)
- **Fetch API / Axios** (para consumir os endpoints do backend)
- **CSS / SCSS** (estilização)

---

## Funcionamento

1. **Consumo da API**
   - O frontend faz requisições para o backend via endpoints REST:
     - Média e classificação de chuva
     - Probabilidade de chuva em 5 dias
     - Média de temperatura e umidade
   - Dados recebidos são tipados com **interfaces TypeScript** e exibidos dinamicamente nos gráficos.

2. **Visualização**
   - **Gráficos de linha** mostrando médias de chuva e temperatura ao longo do ano.
   - **Indicadores de probabilidade** para os próximos 5 dias.
   - Interface simples, clara e responsiva.

