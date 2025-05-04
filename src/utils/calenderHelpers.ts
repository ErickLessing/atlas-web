import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

export function getCalendarDays(date: Date) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 }); // Sunday
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });

  return eachDayOfInterval({ start, end });
}
