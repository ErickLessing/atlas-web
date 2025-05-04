import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { Workout, workoutTypeColors } from "@/types/workout.types";
import { getMonth } from "date-fns";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

interface Props {
  workouts: Workout[];
}

const YearlyWorkoutChart = ({ workouts }: Props) => {
  const types = Array.from(new Set(workouts.map((w) => w.type)));

  const dataByType = useMemo(() => {
    return types.map((type) => {
      const monthlyCounts = Array(12).fill(0);

      workouts.forEach((w) => {
        if (w.type === type) {
          const month = getMonth(w.date); // 0-based
          monthlyCounts[month]++;
        }
      });

      return {
        label: type,
        data: monthlyCounts,
        backgroundColor:  workoutTypeColors[type] || "#e5e7eb",
        stack: "workouts",
      };
    });
  }, [workouts]);

  return (
    <div className="w-full border rounded p-4">
        <h2 className="text-2xl font-semibold mb-4">Monthly Workout Count</h2>
      <Bar
        data={{
          labels: monthLabels,
          datasets: dataByType,
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `${ctx.dataset.label}: ${ctx.raw} workout${ctx.raw === 1 ? "" : "s"}`,
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              title: { display: true, text: "Month" },
            },
            y: {
              stacked: true,
              title: { display: true, text: "Workout Count" },
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
          },
        }}
      />
    </div>
  );
};

export default YearlyWorkoutChart;
