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
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

// Create Project
router.post("/", protect, createProject);

// Get All Projects
router.get("/", protect, getProjects);

// Get Logged-in User's Projects
router.get("/my-projects", protect, getMyProjects);

// Get Single Project
router.get("/:id", protect, getProjectById);

// Update Project
router.put("/:id", protect, updateProject);

// Delete Project
router.delete("/:id", protect, deleteProject);

//Join Project
router.post("/:id/join", protect, joinProject);

module.exports = router;