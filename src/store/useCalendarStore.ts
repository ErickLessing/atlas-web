import { create } from "zustand";

type ViewMode = "day" | "week" | "month" | "year";

interface CalendarState {
  selectedDate: Date;
  viewMode: ViewMode;
  setSelectedDate: (date: Date) => void;
  setViewMode: (mode: ViewMode) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: new Date(),
  viewMode: "month",
  setSelectedDate: (date) => set({ selectedDate: date }),
  setViewMode: (mode) => set({ viewMode: mode }),
}));