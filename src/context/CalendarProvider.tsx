import { createContext, useContext } from "react";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { useCalendarStore } from "@/store/useCalendarStore";
export type ViewMode = "day" | "week" | "month" | "year";

interface CalendarContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  formatDate: (date: Date, formatStr?: string) => string;
  prepareDate: (date: Date) => string;
  formatTime: (date: Date, formatStr?: string) => string;
  getRange: () => { start: Date; end: Date };
  next: () => void;
  previous: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { selectedDate, setSelectedDate, viewMode, setViewMode } =
    useCalendarStore();

  const formatDate = (date: Date, formatStr: string = "EEEE, d MMMM yyyy") => {
    return format(date, formatStr);
  };

  const formatTime = (date: Date, formatStr: string = "HH:mm") => {
    return format(date, formatStr);
  };

  const prepareDate = (date: Date) => {
    return format(date, "yyyy-MM-dd'T'HH:mm:ssxxx"); // ISO 8601 format
  };

  const getRange = (): { start: Date; end: Date } => {
    switch (viewMode) {
      case "day":
        return {
          start: startOfDay(selectedDate),
          end: endOfDay(selectedDate),
        };
      case "week":
        return {
          start: startOfWeek(selectedDate, { weekStartsOn: 1 }),
          end: endOfWeek(selectedDate, { weekStartsOn: 1 }),
        };
      case "month":
        return {
          start: startOfMonth(selectedDate),
          end: endOfMonth(selectedDate),
        };
      case "year":
        return {
          start: startOfYear(selectedDate),
          end: endOfYear(selectedDate),
        };
    }
  };

  const next = () => {
    const newDate = new Date(selectedDate);

    switch (viewMode) {
      case "day":
        newDate.setDate(newDate.getDate() + 1);
        break;
      case "week":
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case "year":
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
    }

    setSelectedDate(newDate);
  };

  const previous = () => {
    const newDate = new Date(selectedDate);

    switch (viewMode) {
      case "day":
        newDate.setDate(newDate.getDate() - 1);
        break;
      case "week":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case "year":
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
    }

    setSelectedDate(newDate);
  };

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        viewMode,
        setViewMode,
        formatDate,
        prepareDate,
        formatTime,
        getRange,
        previous,
        next,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
