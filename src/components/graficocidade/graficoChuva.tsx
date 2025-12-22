import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

type DadoChuva = {
  data: string;
  totalDia: number;
};

type Props = {
  dados: DadoChuva[];
};

export default function GraficoChuva({ dados }: Props) {
  if (!dados || dados.length === 0) {
    return <p>Sem dados para exibir</p>;
  }

  return (
    <ResponsiveContainer width="200%" height={500}>
      <LineChart data={dados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="totalDia"
          stroke="#1976d2"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
