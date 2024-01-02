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
  const data = {
    labels: [
      "Arus Pendek",
      "Kecelakaan",
      "Putung Rokok",
      "Bakar Sampah",
      "Kesengajaan",
      "Selang Bensin Lepas",
      "Kegiatan Dapur",
      "Percikan Las",
      "Tidak Diketahui",
      "Human Error",
      "Pletikan Kembang Api",
    ],
    datasets: [
      {
        label: "Data Penyebab Kebakaran",
        data: [81.4, 39.19, 25.12, 24.12, 24.12, 3.1, 3.1, 2.1, 1.1, 1.1, 1.0],
        backgroundColor: [
          "#003E5D",
          "#68E7EA",
          "#FEDC6D",
          "#FE9C00",
          "#FFCFAD",
          "#A63945",
          "#43682B",
          "#F9BA54",
          "#FF4F6F",
          "#600222",
          "#006F65",
        ],
        hoverOffset: 4,
      },
    ],
  };

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
