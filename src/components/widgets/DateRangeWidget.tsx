import { useCalendar } from "@/context/CalendarProvider";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const DateRangeWidget = () => {
  const { selectedDate, viewMode, formatDate, previous, next, getRange } =
    useCalendar();
  const { start, end } = getRange();
  const renderTitle = () => {
    if (viewMode === "month") {
      return formatDate(selectedDate, "MMMM yyyy"); // "April 2025"
    }
    if (viewMode === "year") {
      return formatDate(selectedDate, "yyyy"); // "2025"
    }
    return formatDate(selectedDate); // default full date
  };
  const label =
    viewMode === "day"
      ? formatDate(selectedDate)
      : viewMode === "week"
      ? `${format(start, "d MMM")} - ${format(end, "d MMM yyyy")}`
      : renderTitle();
  return (
    <div className="flex items-center justify-between w-full">
      <Button
        variant="outline"
        className="bg-[#fdf6e3] border border-[#0000001a] cursor-pointer hover:bg-[#eee8d5] "
        onClick={previous}
      >
        ←
      </Button>
      <div className="text-sm font-medium text-center">{label}</div>
      <Button
        variant="outline"
        className="bg-[#fdf6e3] border border-[#0000001a] cursor-pointer hover:bg-[#eee8d5] "
        onClick={next}
      >
        →
      </Button>
    </div>
  );
};

export default DateRangeWidget;
