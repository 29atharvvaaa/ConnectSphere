import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/auth",
});

// Register
export const register = async (userData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

// Login
export const login = async (userData) => {
  const response = await API.post("/login", userData);
  return response.data;
};

// Get Profile
export const getProfile = async (token) => {
  const response = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update Profile
export const updateProfile = async (token, userData) => {
  const response = await API.put("/profile", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};