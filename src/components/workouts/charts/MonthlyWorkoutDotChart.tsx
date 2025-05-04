import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { getDate } from "date-fns";

import {
  Workout,
  workoutTypeAliases,
  workoutTypeColors,
  workoutTypeOrder,
} from "@/types/workout.types";

ChartJS.register(PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface Props {
  workouts: Workout[];
}

const MonthlyWorkoutDotChart = ({ workouts }: Props) => {
  const datasets = workoutTypeOrder.map((type) => {
    const data = workouts
      .filter((w) => w.type === type)
      .map((w) => ({
        x: getDate(w.date), // 1–31
        y: type,
      }));

    return {
      label: type,
      data,
      pointRadius: 6,
      pointHoverRadius: 8,
      backgroundColor: workoutTypeColors[type] || "#ccc",
    };
  });

  return (
    <div className="w-full">
      <Scatter
        data={{ datasets }}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label} on day ${ctx.parsed.x}`,
              },
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              type: "linear",
              min: 1,
              max: 31,
              ticks: {
                stepSize: 1,
              },
            },
            y: {
              type: "category",
              labels: workoutTypeOrder, // full names
              ticks: {
                callback: (_, index) =>
                  workoutTypeAliases[workoutTypeOrder[index]] ??
                  workoutTypeOrder[index],
              },
            },
          },
        }}
      />
    </div>
  );
};

export default MonthlyWorkoutDotChart;
