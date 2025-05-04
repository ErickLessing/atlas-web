import { useCalendar } from "@/context/CalendarProvider";
import HabitItem from "./HabitItem";
import { Habit } from "@/types/habit.type";
import { format } from "date-fns";


export const HabitTracker = ({ habits }: { habits: Habit[] }) => {
  const {selectedDate} = useCalendar();
  if (!habits?.length) return null;

  return (
    <div className="w-full flex flex-col md:items-center justify-center overflow-none border border-[#0000001a] p-4 rounded text-start md:text-center">
      <div className="flex flex-row justify-between w-full items-center mb-2 px-2">
        <h2 className="text-xl font-semibold">{format(selectedDate, "d MMMM yyyy")}</h2>
      </div>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
};
