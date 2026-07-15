import axios from "axios";

const API = axios.create({
  baseURL: "https://connectsphere-api-y9y8.onrender.com/api/dashboard",
});

const getToken = () => localStorage.getItem("token");

export const getDashboard = async () => {
  const response = await API.get("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};