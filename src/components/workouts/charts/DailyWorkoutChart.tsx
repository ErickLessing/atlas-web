import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Workout } from "@/types/workout.types";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  workouts: Workout[];
}

const DailyWorkoutChart = ({ workouts }: Props) => {
  const totalCalories = workouts.reduce(
    (sum, w) => sum + (w.activeCalories ?? 0),
    0
  );
  const avgHeartRate =
    workouts.reduce((sum, w) => sum + (w.heartRate ?? 0), 0) /
      workouts.length || 0;

  const labels = ["Calories", "Avg Heart Rate"];
  const data = [totalCalories, Math.round(avgHeartRate)];

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Metrics",
            data,
            backgroundColor: ["#1f2937", "#4b5563"],
          },
        ],
      }}
      options={{
        responsive: true,
        indexAxis: "y",
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { beginAtZero: true },
        },
      }}
    />
  );
};

export default DailyWorkoutChart;
