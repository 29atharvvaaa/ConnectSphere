const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  applyJob,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getJobs);
router.get("/:id", getJobById);

// Protected Routes
router.post("/", protect, createJob);
router.post("/:id/apply", protect, applyJob);

module.exports = router;