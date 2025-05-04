import { useState, useEffect } from "react";
import { useCalendar } from "../../context/CalendarProvider";

const DateWidget = () => {
  const { selectedDate, formatDate, formatTime } = useCalendar();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-4 rounded border border-[#0000001a] flex flex-col items-end pr-8">
      <div className=" text-xl ">{formatDate(selectedDate)}</div>
      <div className="text-lg text-gray-800">
        {formatTime(currentTime, "HH:mm")}
      </div>
    </div>
  );
};

export default DateWidget;
