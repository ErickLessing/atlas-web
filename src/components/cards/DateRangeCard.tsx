import { useCalendar, ViewMode } from "@/context/CalendarProvider";
import DateRangeWidget from "../widgets/DateRangeWidget";

const viewModes: ViewMode[] = ["day", "week", "month", "year"];

const DateRangeCard = ({ title }: { title: string }) => {
  const { viewMode, setViewMode, setSelectedDate, formatDate } = useCalendar();

  return (
    <div className="p-4 border border-[#0000001a] rounded flex flex-col justify-center items-center w-full">
      <div className="text-xl font-bold">{title}</div>
      <div
        className="text-lg mb-2 cursor-pointer"
        onClick={() => setSelectedDate(new Date())}
      >
        {formatDate(new Date())}
      </div>

      <div className="flex w-full mb-2 gap-1 justify-center">
        {viewModes.map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`w-full text-xs rounded ${
              viewMode === mode
                ? "bg-[#eee8d5] border border-[#0000001a]"
                : "cursor-pointer border border-[#0000001a] hover:bg-[#eee8d5]"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      <DateRangeWidget />
    </div>
  );
};

export default DateRangeCard;
