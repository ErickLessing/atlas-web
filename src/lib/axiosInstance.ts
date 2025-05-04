import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("jwtToken");
  return token ? `Bearer ${token}` : null;
};

const api = axios.create({
  baseURL: "http://localhost:5239/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
    config.headers["Access-Control-Allow-Origin"] = "*";
  }
  console.log("🚀 Sending request to:", config.url);
  console.log("🔑 Authorization Header:", config.headers.Authorization);
  return config;
});

export default api;
