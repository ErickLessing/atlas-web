import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getDay } from "date-fns";
import {
  Workout,
  workoutTypeColors,
  workoutTypeOrder,
} from "@/types/workout.types";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  workouts: Workout[];
}

const WeeklyWorkoutChart = ({ workouts }: Props) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const datasets = workoutTypeOrder.map((type) => {
    const data = Array(7).fill(0);
    workouts
      .filter((w) => w.type === type)
      .forEach((w) => {
        const dayIndex = (getDay(w.date) + 6) % 7; // Monday=0
        data[dayIndex]++;
      });

    return {
      label: type,
      data,
      backgroundColor: workoutTypeColors[type] || "#ccc",
      stack: "workouts",
    };
  });

  return (
    <Bar
      data={{ labels: weekDays, datasets }}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true },
        },
      }}
    />
  );
};

export default WeeklyWorkoutChart;
