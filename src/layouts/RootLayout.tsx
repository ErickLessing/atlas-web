import { Link, Outlet } from "@tanstack/react-router";

const RootLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Outlet /> {/* Renders the current page */}
    </div>
  );
};

export default RootLayout;
