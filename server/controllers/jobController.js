const Job = require("../models/Job");

// ================= CREATE JOB =================
const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user,
    });

    await job.populate("postedBy", "name email");

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL JOBS =================
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name email")
      .populate("applicants", "name email")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET SINGLE JOB =================
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name email")
      .populate("applicants", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET MY JOBS =================
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      postedBy: req.user,
    })
      .populate("postedBy", "name email")
      .populate("applicants", "name email")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE JOB =================
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    job.title = req.body.title;
    job.company = req.body.company;
    job.location = req.body.location;
    job.salary = req.body.salary;
    job.type = req.body.type;
    job.description = req.body.description;
    job.skills = req.body.skills;

    await job.save();

    await job.populate("postedBy", "name email");
    await job.populate("applicants", "name email");

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE JOB =================
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await job.deleteOne();

    res.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= APPLY JOB =================
const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Owner cannot apply
    if (job.postedBy.toString() === req.user) {
      return res.status(400).json({
        message: "You posted this job.",
      });
    }

    // Already applied
    if (
      job.applicants.some(
        (applicant) => applicant.toString() === req.user
      )
    ) {
      return res.status(400).json({
        message: "Already applied.",
      });
    }

    job.applicants.push(req.user);

    await job.save();

    await job.populate("postedBy", "name email");
    await job.populate("applicants", "name email");

    res.json({
      message: "Application submitted successfully.",
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
  applyJob,
};