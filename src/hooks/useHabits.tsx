import { useQuery } from "@tanstack/react-query";
import api from "../lib/axiosInstance";
import { formatISO } from "date-fns";
import { Habit } from "@/types/habit.type";

export const useHabits = (userId: number, start?: string, end?: string) => {
  const today = formatISO(new Date());
  const effectiveStart = start ?? today;
  const effectiveEnd = end ?? today;

  return useQuery<Habit[]>({
    queryKey: ["habits", userId, effectiveStart, effectiveEnd],
    queryFn: async () => {
      const res = await api.get("/habits", {
        params: {
          userId,
          start: effectiveStart,
          end: effectiveEnd,
        },
      });
      return res.data;
    },
    enabled: !!userId,
  });
};
