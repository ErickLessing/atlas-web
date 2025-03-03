import { useAuth } from "../../context/AuthProvider";

export const Dashboard = () => {
  const { logout, user } = useAuth();

  return (
    <>
      <h1>Hello, {user?.name}</h1>
      <div onClick={() => logout()}>Logout</div>
    </>
  );
};
