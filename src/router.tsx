import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
} from "@tanstack/react-router";
import RootLayout from "./layouts/RootLayout";
import { Dashboard } from "./pages/protected";
import { AuthPage } from "./pages/AuthPage";
import { useCurrentUser } from "./hooks/useCurrentUser";
import WorkoutPage from "./pages/protected/workouts";
import HabitsPage from "./pages/protected/habits";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  shouldReload: () => true,
  component: () => {
    const { data: user, isLoading } = useCurrentUser();
    if (isLoading) return <p>Loading...</p>;
    return user ? <Dashboard /> : <AuthPage />;
  },
});

const workoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workout",
  component: () => <WorkoutPage />,
});

const habitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/habits",
  component: () => <HabitsPage />,
});

const routeTree = rootRoute.addChildren([homeRoute, workoutRoute, habitRoute]);

export const router = createRouter({ routeTree });

export function AppRouter() {
  return <RouterProvider router={router} />;
}
