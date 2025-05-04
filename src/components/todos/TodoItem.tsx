import { motion } from "framer-motion";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onToggle,
}) => {
  return (
    <div
      className="flex items-center gap-3 p-3 border border-[#0000001a] my-1 rounded cursor-pointer w-full hover:bg-[#eee8d5]"
      onClick={() => onToggle(id)}
    >
      {/* ✅ Animated Checkbox */}
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

      {/* ✅ Improved Strikethrough Animation */}
      <motion.div className="relative">
        <motion.span
          className={`text-lg ${completed ? "text-gray-500" : ""}`}
          initial={{ opacity: 1 }}
          animate={{
            opacity: completed ? 0.5 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {title}
        </motion.span>

        {/* Strikethrough line animation */}
        <motion.div
          className="absolute left-0 bottom-3 h-[2px] bg-gray-500 w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: completed ? 1 : 0, clipPath: completed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default TodoItem;
