import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const RadarChart = ({ dataPoints }) => {
  const data = {
    labels: ["Commits", "Pull Requests", "Issues", "Reviews"],
    datasets: [
      {
        label: "",
        data: dataPoints,
        backgroundColor: "transparent",
        borderColor: "#238636",
        borderWidth: 2,
        pointBackgroundColor: "#238636",
        pointBorderColor: "#238636",
        pointRadius: 3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: false,
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          display: false
        },
        grid: {
          color: "#e5e7eb"
        },
        angleLines: {
          color: "#e5e7eb"
        },
        pointLabels: {
          color: "#57606a",
          font: {
            size: 11
          }
        }
      }
    }
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
