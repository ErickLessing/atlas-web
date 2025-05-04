import {
  Link,
  Outlet,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect, useState } from "react";
import {
  Home,
  Dumbbell,
  ListTodo,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthProvider";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/workout", label: "Workouts", icon: Dumbbell },
  { to: "/habits", label: "Habits", icon: ListTodo },
];

const RootLayout = () => {
  const { data: user } = useCurrentUser();
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    router.invalidate();
  }, [user]);

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center h-screen bg-[#fdf6e3] text-[#002b36] ">
        <Outlet />
      </div>
    );

  return (
    <div className="flex h-screen bg-[#fdf6e3] text-[#002b36] ">
      <motion.nav
        initial={false}
        animate={{ width: collapsed ? 64 : 192 }}
        transition={{ duration: 0.25 }}
        className="h-full border-r border-[#0000001a] bg-[#fdf6e3] text-[#002b36] flex flex-col justify-between items-start px-2 py-4 overflow-hidden"
      >
        <div className="w-full px-1">
          <div
            className="w-full flex justify-end mb-6 bg-[#eee8d5]"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <button
              // onClick={() => setCollapsed((prev) => !prev)}
              className="text-[#657b83] hover:text-[#002b36] transition"
            >
              {collapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
          </div>

          <ul className="flex flex-col  gap-1 w-full">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center rounded px-3 py-2 gap-3 w-full transition hover:bg-[#eee8d5] ${
                    pathname === to ? "font-semibold bg-[#eee8d5]" : ""
                  }`}
                >
                  <div className="min-w-[20px] min-h-[28px] items-center flex justify-center">
                    <Icon size={18} />
                  </div>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className=""
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full px-1 min-h-[32px]">
          <button
            onClick={logout}
            className="flex items-center rounded px-3 py-2 w-full gap-3 hover:bg-[#eee8d5] transition"
          >
            <div className="min-w-[20px] min-h-[28px] flex items-center justify-center">
              <LogOut size={18} />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className=""
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <div className="flex-1 flex-grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
