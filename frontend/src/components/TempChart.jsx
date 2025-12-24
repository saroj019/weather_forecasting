import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function TempChart({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  const data = {
    labels: forecast.map(d => d.date),
    datasets: [
      {
        label: "Max Temp",
        data: forecast.map(d => d.max)
      },
      {
        label: "Min Temp",
        data: forecast.map(d => d.min)
      }
    ]
  };

  return <Line data={data} />;
}
