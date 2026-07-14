import axios from "axios";

const API = "http://localhost:5001/api/jobs";

const getToken = () => localStorage.getItem("token");

// ================= GET ALL JOBS =================
export const getJobs = async () => {
  const res = await axios.get(API);
  return res.data;
};

// ================= GET SINGLE JOB =================
export const getJobById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

// ================= GET MY JOBS =================
export const getMyJobs = async () => {
  const res = await axios.get(`${API}/my-jobs`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

// ================= CREATE JOB =================
export const createJob = async (jobData) => {
  const res = await axios.post(API, jobData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

// ================= UPDATE JOB =================
export const updateJob = async (id, jobData) => {
  const res = await axios.put(`${API}/${id}`, jobData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

// ================= DELETE JOB =================
export const deleteJob = async (id) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

// ================= APPLY FOR JOB =================
export const applyJob = async (id) => {
  const res = await axios.post(
    `${API}/${id}/apply`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res.data;
};