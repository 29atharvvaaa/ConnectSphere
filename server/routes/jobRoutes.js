const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
  applyJob,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

// ================= PUBLIC ROUTES =================
router.get("/", getJobs);

// ================= PROTECTED ROUTES =================
router.get("/my-jobs", protect, getMyJobs);

// ================= PUBLIC ROUTES =================
router.get("/:id", getJobById);

router.post("/", protect, createJob);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

router.post("/:id/apply", protect, applyJob);

module.exports = router;

router.post("/", protect, createJob);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

router.post("/:id/apply", protect, applyJob);

module.exports = router;