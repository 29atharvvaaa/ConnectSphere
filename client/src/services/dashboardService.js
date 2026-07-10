import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/dashboard",
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