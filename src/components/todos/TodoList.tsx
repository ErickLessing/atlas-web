import { useState } from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Add workout tracker", completed: false },
    { id: 2, title: "Add writing prompt", completed: false },
    { id: 3, title: "Add drawing prompt", completed: false },
    { id: 4, title: "Add meal planner", completed: false },
    { id: 5, title: "Add habit tracker", completed: false },
    { id: 6, title: "Add financial tracker", completed: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="w-full flex flex-col md:items-center justify-center overflow-none border border-[#0000001a] p-4 rounded text-start md:text-center">
      <h2 className="text-xl font-semibold mb-4 text-[#002b36]" > My Todos</h2>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} onToggle={toggleTodo} />
      ))}
    </div>
  );
};

export default TodoList;
