export interface Habit {
  id: number;
  name: string;
  logs: HabitLog[];
  isActive: boolean;
  highestStreak: number;
  currentStreak: number;
}

export interface HabitLog {
  id: number;
  habitId: number;
  date: string; // ISO date (yyyy-mm-dd)
}
