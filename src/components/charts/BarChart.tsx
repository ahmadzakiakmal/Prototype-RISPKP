import React from "react";
import { Bar } from "react-chartjs-2";
import jsonData from "@/data/Data_Penyebab_Kebakaran.json";

interface DataKejadianKebakaran {
  faktor: string;
  "2020": number;
  "2021": number;
  "2022": number;
  "2023": number;
}

interface DatasetStructure {
  label: string;
  data: number[];
  backgroundColor: string;
}

const BarChart = () => {
  const rawData: DataKejadianKebakaran[] = jsonData;
  const dataset: DatasetStructure[] = [];

  const years: Array<keyof DataKejadianKebakaran> = [
    "2020",
    "2021",
    "2022",
    "2023",
  ];

  const colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
  ];

  years.forEach((year): void => {
    const data = rawData.map((data) => data[year]);
    const datasetStructure: DatasetStructure = {
      label: year,
      data: data as number[],
      backgroundColor: colors[years.indexOf(year)],
    };
    dataset.push(datasetStructure);
  });

  const data = {
    labels: rawData.map((data) => data.faktor),
    datasets: dataset,
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    // maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    }
  };

  return(
    <div className="min-w-[500px] min-h-[300px]">
      {/* @ts-expect-error: ChartJS' typedef is not complete */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
