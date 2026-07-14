const Project = require("../models/Project");

// ================= CREATE PROJECT =================
const createProject = async (req, res) => {
  try {
    // console.log("req.user =", req.user);
    // console.log("typeof req.user =", typeof req.user);

    const {
  title,
  description,
  tech,
  status,
  maxMembers,
  requiredRoles,
} = req.body;

    const project = await Project.create({
  title,
  description,
  tech,
  status,
  maxMembers,
  requiredRoles,
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
    const { search } = req.query;

    let filter = {};

    if (search) {
      filter = {
        $or: [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            description: {
              $regex: search,
              $options: "i",
            },
          },
          {
            tech: {
              $in: [new RegExp(search, "i")],
            },
          },
        ],
      };
    }

    const projects = await Project.find(filter)
      .populate("owner", "name email")
      .populate("members", "name email");

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
})
.populate("owner", "name email")
.populate("members", "name email");

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
    const project = await Project.findById(req.params.id)
      .populate("owner", "name email")
      .populate("members", "name email")
      .populate("pendingRequests", "name email");

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
    project.maxMembers = req.body.maxMembers;
    project.requiredRoles = req.body.requiredRoles;

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
// ================= JOIN PROJECT =================
const joinProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Owner cannot join their own project
    if (project.owner.toString() === req.user) {
      return res.status(400).json({
        message: "You already own this project",
      });
    }

    // Already a member
    if (
      project.members.some(
        (member) => member.toString() === req.user
      )
    ) {
      return res.status(400).json({
        message: "You are already a team member",
      });
    }

    // Already requested
    if (
      project.pendingRequests.some(
        (user) => user.toString() === req.user
      )
    ) {
      return res.status(400).json({
        message: "Request already sent",
      });
    }

    // Team full
    if (project.members.length >= project.maxMembers) {
      return res.status(400).json({
        message: "Project team is full",
      });
    }

    // Add request
    project.pendingRequests.push(req.user);

await project.save();

await project.populate("owner", "name email");
await project.populate("members", "name email");
await project.populate("pendingRequests", "name email");

res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= ACCEPT REQUEST =================
const acceptRequest = async (req, res) => {
  try {
    const { id, userId } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Only owner can accept
    if (project.owner.toString() !== req.user) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // Request exists?
    if (
      !project.pendingRequests.some(
        (u) => u.toString() === userId
      )
    ) {
      return res.status(400).json({
        message: "Request not found",
      });
    }

    // Team full?
    if (project.members.length >= project.maxMembers) {
      return res.status(400).json({
        message: "Project team is full",
      });
    }

    // Remove request
    project.pendingRequests = project.pendingRequests.filter(
      (u) => u.toString() !== userId
    );

    // Add member
    project.members.push(userId);

    await project.save();
    await project.populate("owner", "name email");
await project.populate("members", "name email");
await project.populate("pendingRequests", "name email");
    res.json({
      message: "Request accepted successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= REJECT REQUEST =================
const rejectRequest = async (req, res) => {
  try {
    const { id, userId } = req.params;

    const project = await Project.findById(id);

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

    project.pendingRequests = project.pendingRequests.filter(
      (u) => u.toString() !== userId
    );

    await project.save();
    await project.populate("owner", "name email");
await project.populate("members", "name email");
await project.populate("pendingRequests", "name email");
    res.json({
      message: "Request rejected successfully",
      project,
    });
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
  acceptRequest,
  rejectRequest,
};