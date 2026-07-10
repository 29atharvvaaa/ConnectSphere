import axios from "axios";

const API = "http://localhost:5001/api/jobs";

export const getJobs = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(API, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const applyJob = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/${id}/apply`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};