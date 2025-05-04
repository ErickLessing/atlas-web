import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useHabits } from "@/hooks/useHabits";
import { AddHabitDialog } from "@/components/habits/AddHabitDialog";
import { format } from "date-fns";
import MonthlyHabitDotChart from "@/components/habits/charts/MonthlyHabitDotChart";
import DateRangeCard from "@/components/cards/DateRangeCard";
import { useCalendar } from "@/context/CalendarProvider";
import EditHabitDialog from "@/components/habits/EditHabitDialog";
import ArchiveHabitDialog from "@/components/habits/ArchiveHabitDialog";
import DeleteHabitDialog from "@/components/habits/DeleteHabitDialog";
import { HabitTracker } from "@/components/habits/HabitTracker";
import WeeklyHabitDotChart from "@/components/habits/charts/WeeklyHabitDotChart";
import YearlyHabitStackChart from "@/components/habits/charts/YearlyHabitStackChart";

export default function HabitsPage() {
  const { data: user, isLoading: userLoading } = useCurrentUser();

  const userId = userLoading ? -1 : user!.id;

  const { getRange, viewMode } = useCalendar();
  const { start, end } = getRange();

  const startStr = format(start, "yyyy-MM-dd");
  const endStr = format(end, "yyyy-MM-dd");

  const { data: habits, isLoading } = useHabits(userId, startStr, endStr);

  if (isLoading || !habits) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto p-6">
      {/* Left column: Habit list */}
      <div className="col-span-1 border border-[#0000001a] rounded p-4">
        <DateRangeCard title="Habits" />
        <div className="flex justify-between items-center my-4">
          <h1 className="text-xl font-semibold">My Habits</h1>
          <AddHabitDialog userId={userId!} />
        </div>
        <ul>
          {habits.map((habit) => (
            <li
              key={habit.id}
              className="border border-[#0000001a] rounded p-2 mb-2 text-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">{habit.name}</div>
                <div className="flex gap-2 ">
                  <EditHabitDialog habit={habit} />
                  {/* <ArchiveHabitDialog habitId={habit.id} /> */}
                  <DeleteHabitDialog habitId={habit.id} />
                </div>
              </div>

              <div>Current Streak: {habit.currentStreak} </div>
              <div>Highest Streak: {habit.highestStreak} </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right columns: Dot chart */}
      <div className="col-span-1 md:col-span-2 border border-[#0000001a] rounded p-4">
        {viewMode === "month" && <MonthlyHabitDotChart habits={habits} />}
        {viewMode === "week" && <WeeklyHabitDotChart habits={habits} />}
        {viewMode === "day" && <HabitTracker habits={habits} />}
        {viewMode === "year" && <YearlyHabitStackChart habits={habits} />}
      </div>
    </div>
  );
}
