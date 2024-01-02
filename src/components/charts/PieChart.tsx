import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import jsonData from "@/data/Persentase_Penyebab_Kebakaran.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function PieChart() {
  const data = jsonData;

  return (
    <Doughnut
      options={{
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
      }}
      data={data}
    />
  );
}
