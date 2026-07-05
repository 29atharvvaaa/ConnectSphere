const Project = require("../models/Project");

// ================= CREATE PROJECT =================
const createProject = async (req, res) => {
  try {
    console.log("req.user =", req.user);
    console.log("typeof req.user =", typeof req.user);

    const { title, description, tech, status } = req.body;

    const project = await Project.create({
      title,
      description,
      tech,
      status,
      owner: req.user,
      members: [req.user],
    });

    console.log("Saved project:", project);

    res.status(201).json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL PROJECTS =================
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "owner",
      "name email"
    );

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET MY PROJECTS =================
const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET SINGLE PROJECT =================
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE PROJECT =================
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Only owner can update
    if (project.owner.toString() !== req.user) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    project.title = req.body.title;
    project.description = req.body.description;
    project.tech = req.body.tech;
    project.status = req.body.status;

    await project.save();

    await project.populate("owner", "name email");

    res.json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE PROJECT =================
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.owner.toString() !== req.user) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await project.deleteOne();

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= JOIN PROJECT =================
const joinProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.members.includes(req.user)) {
      return res.status(400).json({
        message: "Already joined",
      });
    }

    project.members.push(req.user);

    await project.save();

    await project.populate("owner", "name email");

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
  joinProject,
};