import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getMonth } from "date-fns";
import { Habit } from "@/types/habit.type";
import { generateGrayscaleShades } from "@/utils/chartHelpers";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Props {
  habits: Habit[];
}

const YearlyHabitStackChart = ({ habits }: Props) => {
  const colors = generateGrayscaleShades(habits.length);

  let globalMaxCount = 0;

  habits.forEach((habit) => {
    const counts = Array(12).fill(0);

    habit.logs.forEach((log) => {
      const month = getMonth(new Date(log.date));
      counts[month]++;
    });

    const maxForHabit = Math.max(...counts);
    if (maxForHabit > globalMaxCount) {
      globalMaxCount = maxForHabit;
    }
  });

  const datasets = habits.map((habit, index) => {
    const counts = Array(12).fill(0); // 12 months

    habit.logs.forEach((log) => {
      const month = getMonth(new Date(log.date)); // 0-based index
      counts[month]++;
    });

    return {
      label: habit.name,
      data: counts,
      backgroundColor: colors[index], // Optional: make unique colors per habit
      stack: "habit",
    };
  });

  return (
    <div className="w-full">
      <Bar
        data={{ labels: months, datasets }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} logs`,
              },
            },
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
              title: { display: true, text: "Completions" },
              max: Math.min(30, globalMaxCount + 10),
            },
          },
        }}
      />
    </div>
  );
};

export default YearlyHabitStackChart;
