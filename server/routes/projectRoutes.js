const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
  joinProject,
  acceptRequest,
  rejectRequest,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

// Create Project
router.post("/", protect, createProject);

// Get All Projects
router.get("/", protect, getProjects);

// My Projects
router.get("/my-projects", protect, getMyProjects);

// Single Project
router.get("/:id", protect, getProjectById);

// Update
router.put("/:id", protect, updateProject);

// Delete
router.delete("/:id", protect, deleteProject);

// Join Request
router.post("/:id/join", protect, joinProject);

// Accept Request
router.put("/:id/accept/:userId", protect, acceptRequest);

// Reject Request
router.put("/:id/reject/:userId", protect, rejectRequest);

module.exports = router;