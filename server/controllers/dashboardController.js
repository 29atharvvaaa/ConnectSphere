const Project = require("../models/Project");
const Job = require("../models/Job");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user;

    // Projects created by logged in user
    const projectsCreated = await Project.countDocuments({
      owner: userId,
    });

    // Projects joined by logged in user
    const projectsJoined = await Project.countDocuments({
      members: userId,
    });

    // Jobs posted by logged in user
    const jobsPosted = await Job.countDocuments({
      postedBy: userId,
    });

    // Jobs applied by logged in user
    const jobsApplied = await Job.countDocuments({
      applicants: userId,
    });

    // Recent Projects
    const recentProjects = await Project.find({
      owner: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Jobs
    const recentJobs = await Job.find({
      postedBy: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      projectsCreated,
      projectsJoined,
      jobsPosted,
      jobsApplied,
      recentProjects,
      recentJobs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};