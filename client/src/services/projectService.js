import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/projects",
});

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Get all projects
export const getProjects = async () => {
  const response = await API.get("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getProjectById = async (id) => {
  const response = await API.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Get logged-in user's projects
export const getMyProjects = async () => {
  const response = await API.get("/my-projects", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Create project
export const createProject = async (projectData) => {
  const response = await API.post("/", projectData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Update project
export const updateProject = async (id, projectData) => {
  const response = await API.put(`/${id}`, projectData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Delete project
export const deleteProject = async (id) => {
  const response = await API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Join Project
export const joinProject = async (id) => {
  const response = await API.post(
    `/${id}/join`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};