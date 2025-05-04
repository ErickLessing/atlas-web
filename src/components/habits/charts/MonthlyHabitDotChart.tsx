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
  import { Habit } from "@/types/habit.type";
  
  ChartJS.register(PointElement, LinearScale, CategoryScale, Tooltip, Legend);
  
  interface Props {
    habits: Habit[];
  }
  
  const MonthlyHabitDotChart = ({ habits }: Props) => {
    const habitNames = habits.map((h) => h.name);
  
    const datasets = habits.map((habit) => {
      const data = habit.logs.map((log) => ({
        x: getDate(new Date(log.date)), // 1–31
        y: habit.name,
      }));
  
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
                    `${ctx.dataset.label} on day ${ctx.parsed.x}`,
                },
              },
              legend: { display: false },
            },
            scales: {
              x: {
                type: "linear",
                min: 1,
                max: 31,
                ticks: { stepSize: 1 },
              },
              y: {
                type: "category",
                labels: habitNames,
              },
            },
          }}
        />
      </div>
    );
  };
  
  export default MonthlyHabitDotChart;
  