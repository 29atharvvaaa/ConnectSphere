import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/projects",
});

const getToken = () => localStorage.getItem("token");

// ================= GET ALL PROJECTS =================
export const getProjects = async () => {
  const response = await API.get("/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ================= GET SINGLE PROJECT =================
export const getProjectById = async (id) => {
  const response = await API.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ================= MY PROJECTS =================
export const getMyProjects = async () => {
  const response = await API.get("/my-projects", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ================= CREATE PROJECT =================
export const createProject = async (projectData) => {
  const response = await API.post("/", projectData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ================= UPDATE PROJECT =================
export const updateProject = async (id, projectData) => {
  const response = await API.put(`/${id}`, projectData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ================= DELETE PROJECT =================
export const deleteProject = async (id) => {
  const response = await API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ================= SEND JOIN REQUEST =================
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

// ================= ACCEPT REQUEST =================
export const acceptRequest = async (projectId, userId) => {
  const response = await API.put(
    `/${projectId}/accept/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// ================= REJECT REQUEST =================
export const rejectRequest = async (projectId, userId) => {
  const response = await API.put(
    `/${projectId}/reject/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};