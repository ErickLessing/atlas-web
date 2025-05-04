import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../lib/axiosInstance";
import { TUser } from "../types/user.types";

const fetchUserProfile = async (): Promise<TUser | null> => {
  const token = localStorage.getItem("jwtToken");
  console.log("refreshing user", token != null);
  if (!token) return null;

  const { data } = await api.get("/user/me");
  return data;
};

export const useCurrentUser = (): UseQueryResult<TUser | null, Error> => {
  const token = localStorage.getItem("jwtToken");

  return useQuery<TUser | null, Error>({
    queryKey: ["user"],
    queryFn: fetchUserProfile,
    enabled: !!token, // Only fetch if there's a token
    staleTime: 1000 * 60 * 60, // Cache user for 5 minutes
    retry: 1, // Retry once on failure
  });
};
