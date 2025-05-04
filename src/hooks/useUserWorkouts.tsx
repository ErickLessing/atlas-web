import { useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import api from "../lib/axiosInstance";
import { Workout } from "../types/workout.types";

export const useUserWorkouts = (
  userProfileId: number | null,
  start?: Date,
  end?: Date
) => {
  return useQuery<Workout[]>({
    queryKey: [
      "workouts",
      userProfileId,
      start?.toISOString(),
      end?.toISOString(),
    ],
    queryFn: async () => {
      const { data } = await api.get("/workout", {
        params: {
          userProfileId,
          startDate: start?.toISOString().split("T")[0],
          endDate: end?.toISOString().split("T")[0],
        },
      });

      return data.map((w: any) => ({
        ...w,
        date: parseISO(w.date),
        time: w.time ? parseISO(`1970-01-01T${w.time}`) : null,
      }));
    },
    enabled: !!userProfileId && !!start && !!end,
  });
};
