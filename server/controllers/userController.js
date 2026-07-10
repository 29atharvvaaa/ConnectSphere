const User = require("../models/User");

// ================= GET MY PROFILE =================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET USER BY ID =================
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      bio,
      college,
      branch,
      year,
      location,
      skills,
      github,
      linkedin,
      portfolio,
      resume,
      profilePic,
    } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name ?? user.name;
    user.bio = bio ?? user.bio;
    user.college = college ?? user.college;
    user.branch = branch ?? user.branch;
    user.year = year ?? user.year;
    user.location = location ?? user.location;
    user.github = github ?? user.github;
    user.linkedin = linkedin ?? user.linkedin;
    user.portfolio = portfolio ?? user.portfolio;
    user.resume = resume ?? user.resume;
    user.profilePic = profilePic ?? user.profilePic;

    if (skills) {
      user.skills = skills;
    }

    await user.save();

    const updatedUser = await User.findById(req.user).select("-password");

    res.status(200).json({
      message: "Profile Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  getUserById,
  updateProfile,
};