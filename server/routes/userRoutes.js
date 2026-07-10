const express = require("express");

const {
  getProfile,
  updateProfile,
  getUserById,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Logged-in user's profile
router.get("/profile", protect, getProfile);

// Update logged-in user's profile
router.put("/profile", protect, updateProfile);

// Public profile by ID
router.get("/:id", protect, getUserById);

module.exports = router;