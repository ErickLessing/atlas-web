import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
} from "@tanstack/react-router";
import Signup from "./pages/auth/Signup";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/auth/Login";
import { Dashboard } from "./pages/protected";
import { WelcomePage } from "./pages/auth";
import { supabase } from "./lib/supabase";

const checkAuth = async () => {
  const { data } = await supabase.auth.getSession();
  if (!data.session) throw new Error("redirect:/login");
};

// Root route (main layout)
const rootRoute = createRootRoute({
  component: RootLayout,
});

// ✅ Public (Auth) Routes
const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
});

const welcomeRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/",
  component: WelcomePage,
});

const signupRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/signup",
  component: Signup,
});

const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/login",
  component: Login,
});

// ✅ Protected Route Enforcement (Using a Loader)
const protectedLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  beforeLoad: checkAuth, // Now a function, not a hook
});
// ✅ Protected Pages
const dashboardRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/dashboard",
  component: Dashboard,
});

// ✅ Create the router
const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([welcomeRoute, signupRoute, loginRoute]),
  protectedLayoutRoute.addChildren([dashboardRoute]),
]);

export const router = createRouter({ routeTree });

// ✅ Router provider component
export function AppRouter() {
  return <RouterProvider router={router} />;
}
