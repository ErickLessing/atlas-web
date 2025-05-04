import { useAuth } from "../../context/AuthProvider";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import DateWidget from "../../components/widgets/DateWidget";
import TodoList from "../../components/todos/TodoList";
import { CalendarView } from "@/components/calendar/CalenderView";


export const Dashboard = () => {
  const { logout } = useAuth();
  const { data: user, isLoading, isError, error } = useCurrentUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!user) return null;
  return (
    <div className="p-6 flex flex-col lg:grid lg:grid-cols-3 gap-6">
      {/* Top Row (Welcome + Date) */}
      <div className="lg:col-span-2 flex items-center p-4 border border-[#0000001a] rounded shadow-lg min-w-[300px] flex-col">
        <p className="text-[#002b36] text-lg font-semibold mb-6">Welcome, {user?.username}!</p>
        <CalendarView />
      </div>
      <div className="lg:col-span-1 p-4 border border-[#0000001a] rounded shadow-lg min-w-[250px]">
        <DateWidget />
        <div className="mt-4">
          <TodoList />
        </div>
      </div>

      {/* Bottom Row (Todo List) */}
      {/* <div className="lg:col-span-3 p-4 border rounded shadow-lg min-w-[250px]">
        <WorkoutTable />
      </div>
      <div className="lg:col-span-1 p-4 border rounded shadow-lg min-w-[250px] mb-8">
        <WorkoutUpload />
      </div> */}

     
    </div>
  );
};
