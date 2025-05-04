import { useCalendar } from "@/context/CalendarProvider";
import { getCalendarDays } from "@/utils/calenderHelpers";
import { format, isSameMonth } from "date-fns";


export const CalendarView = () => {
  const { selectedDate } = useCalendar();
  const days = getCalendarDays(selectedDate);

  return (
    <div className="w-full text-[#002b36]">
      <div
        className="w-full flex justify-between items-center mb-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} style={{ fontWeight: "bold" }}>
            {d}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
        }}
      >
        {days.map((day) => (
          <div
            key={day.toISOString()}
            style={{
              padding: 8,
              minHeight: 80,
              border: "1px solid #0000001a",
              background: isSameMonth(day, selectedDate) ? "#fdf6e3" : "#eee8d5",
              fontSize: 12,
            }}
          >
            <div style={{ fontWeight: "bold" }}>{format(day, "d")}</div>
            {/* dots will go here */}
          </div>
        ))}
      </div>
    </div>
  );
};
