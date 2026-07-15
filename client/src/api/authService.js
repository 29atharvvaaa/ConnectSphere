import axios from "axios";

const API = axios.create({
  baseURL: "https://connectsphere-api-y9y8.onrender.com/api/auth",
});

// Register User
export const registerUser = async (userData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
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
export const updateProfile = async (token, profileData) => {
  const response = await API.put("/profile", profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};