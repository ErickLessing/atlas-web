import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { getDay } from "date-fns";
import { Habit } from "@/types/habit.type";

ChartJS.register(PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface Props {
  habits: Habit[];
}

const WeeklyHabitDotChart = ({ habits }: Props) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const datasets = habits.map((habit) => {
    const data = habit.logs.map((log) => {
      const day = getDay(new Date(log.date)); // Sunday = 0, Monday = 1, ...
      const x = day === 0 ? 7 : day; // Convert Sunday from 0 → 7 for display

      return {
        x,
        y: habit.name,
      };
    });

    return {
      label: habit.name,
      data,
      pointRadius: 6,
      pointHoverRadius: 8,
      backgroundColor: "#000",
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
                label: (ctx) =>
                  `${ctx.dataset.label} on ${daysOfWeek[ctx.parsed.x - 1]}`,
              },
            },
            legend: { display: false },
          },
          scales: {
            x: {
              type: "linear",
              min: 1,
              max: 7,
              ticks: {
                stepSize: 1,
                callback: (tickValue: string | number) => {
                  const value = Number(tickValue);
                  return daysOfWeek[value - 1];
                },
              },
              title: { display: true, text: "Day of Week" },
            },
            y: {
              type: "category",
              labels: habits.map((h) => h.name),
            },
          },
        }}
      />
    </div>
  );
};

export default WeeklyHabitDotChart;
