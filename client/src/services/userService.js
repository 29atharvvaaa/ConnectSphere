import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/users",
});

const getToken = () => localStorage.getItem("token");

// ================= Logged-in User =================
export const getMyProfile = async () => {
  const response = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ================= Public User Profile =================
export const getUserProfile = async (id) => {
  const response = await API.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ================= Update Profile =================
export const updateProfile = async (profileData) => {
  const response = await API.put("/profile", profileData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};