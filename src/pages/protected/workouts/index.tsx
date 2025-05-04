import WorkoutUploadDialog from "@/components/workouts/WorkoutUploadDialog";
import WorkoutTable from "../../../components/workouts/WorkoutTable";
import { useCalendar } from "../../../context/CalendarProvider";
import DateRangeCard from "@/components/cards/DateRangeCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useUserWorkouts } from "@/hooks/useUserWorkouts";
import YearlyWorkoutChart from "@/components/workouts/charts/YearlyWorkoutChart";
import MonthlyWorkoutDotChart from "@/components/workouts/charts/MonthlyWorkoutDotChart";
import DailyWorkoutChart from "@/components/workouts/charts/DailyWorkoutChart";
import WeeklyWorkoutChart from "@/components/workouts/charts/WeeklyWorkoutChart";

const WorkoutPage = () => {
  const { viewMode, getRange } = useCalendar();
  const { data: user } = useCurrentUser();
  const range = getRange();
  const { data: workouts = [], isLoading: workoutsLoading } = useUserWorkouts(
    user?.id ?? null,
    range.start,
    range.end
  );

  return (
    <div className="grid grid-cols-3 gap-4 auto-rows-max p-8">
      {/* Row 1 - Left (Chart spans 2 cols) */}
      <div className="col-span-2">
        {viewMode === "year" && <YearlyWorkoutChart workouts={workouts} />}
        {viewMode === "month" && <MonthlyWorkoutDotChart workouts={workouts} />}
        {viewMode === "week" && <WeeklyWorkoutChart workouts={workouts} />}
        {viewMode === "day" && <DailyWorkoutChart workouts={workouts} />}
      </div>
      {/* Row 1 - Right */}
      <div className="flex flex-col items-end gap-4">
        <DateRangeCard title="Workouts" />
        <div className=" rounded w-full">
          <WorkoutUploadDialog />
        </div>
      </div>

      {/* Row 2 - Full Width Table */}
      <div className="col-span-3">
        <WorkoutTable workouts={workouts} isLoading={workoutsLoading} />
      </div>
    </div>
  );
};

export default WorkoutPage;
