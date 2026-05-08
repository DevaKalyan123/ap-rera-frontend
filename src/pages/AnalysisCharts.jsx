import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

export default function AnalysisChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "PROJECTS",
        data: [45, 0, 0, 0, 0, 0],
        borderColor: "green",
        backgroundColor: "green",
        pointRadius: 5,
      },
      {
        label: "AGENTS",
        data: [3, 0, 0, 0, 0, 0],
        borderColor: "#00bcd4",
        backgroundColor: "#00bcd4",
        pointStyle: "rect",
        pointRadius: 5,
      },
      {
        label: "COMPLAINTS",
        data: [4, 0, 0, 0, 0, 0],
        borderColor: "red",
        backgroundColor: "red",
        pointStyle: "triangle",
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div style={{ height: "350px", padding: "20px" }}>
      <Line data={data} options={options} />
    </div>
  );
}