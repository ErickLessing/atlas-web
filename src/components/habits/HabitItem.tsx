import { useCalendar } from "@/context/CalendarProvider";
import api from "@/lib/axiosInstance";
import { Habit } from "@/types/habit.type";
import { useQueryClient } from "@tanstack/react-query";
import { format, isAfter, isBefore, set } from "date-fns";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HabitItemProps {
  habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
  const queryClient = useQueryClient();
  const { selectedDate } = useCalendar();
  const [override, setOverride] = useState<boolean | null>(null);
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  console.log("habits: ", habit);

  const completed =
    override !== null
      ? override
      : habit.logs.some(
          (log) => format(log.date, "yyyy-MM-dd") === formattedDate
        );

  const toggle = async () => {

    if (isAfter(selectedDate, new Date())) {
      return;
    }

    const currentlyCompleted = habit.logs.some(
      (log) => format(log.date, "yyyy-MM-dd") === formattedDate
    );

    // Optimistically flip the UI
    setOverride(!currentlyCompleted);

    try {
      await api.post("/habits/log", {
        habitId: habit.id,
        date: formattedDate,
      });

      // Refetch to sync
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    } catch (err) {
      console.error("Failed to toggle habit", err);
      // Revert override on error
      setOverride(null);
    }
  };

  useEffect(() => {
    setOverride(null);
  }, [selectedDate]);

  return (
    <div
      className={`flex items-center gap-3 p-3 border border-[#0000001a] my-1 rounded w-full ${
        isAfter(selectedDate, new Date()) ? "" : "cursor-pointer hover:bg-[#eee8d5] "
      }`}
      onClick={toggle}
    >
      {/* Animated Checkbox */}
      <motion.div
        className="w-5 h-5 border-2 border-[#0000001a] rounded-md flex items-center justify-center"
        initial={{ backgroundColor: "#fdf6e3" }}
        animate={{ backgroundColor: completed ? "#0000001a" : "#fdf6e3" }} // Green when checked
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {completed && (
          <motion.span
            className="text-[#fdf6e3] font-bold text-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            ✔
          </motion.span>
        )}
      </motion.div>

      {/* Strikethrough Text */}
      <motion.div className="relative">
        <motion.span
          className={`text-lg ${completed ? "text-gray-500" : ""}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: completed ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {habit.name}
        </motion.span>

        <motion.div
          className="absolute left-0 bottom-3 h-[2px] bg-gray-500 w-full"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: completed ? 1 : 0,
            clipPath: completed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

export default HabitItem;
