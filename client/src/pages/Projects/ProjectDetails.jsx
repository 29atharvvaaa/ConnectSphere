import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditProjectModal from "./EditProjectModal";

import {
  getProjectById,
  joinProject,
  deleteProject,
  updateProject,
} from "../../services/projectService";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const data = await getProjectById(id);
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoin = async () => {
    try {
      const updatedProject = await joinProject(id);
      setProject(updatedProject);

      alert("Successfully joined the project!");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to join project");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(project._id);
      alert("Project deleted successfully!");
      navigate("/projects");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete project");
    }
  };

  const handleUpdate = async (projectData) => {
    try {
      await updateProject(project._id, projectData);

      await fetchProject();

      setShowEditModal(false);

      alert("Project updated successfully!");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to update project");
    }
  };

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  const isOwner = currentUser?._id === project.owner?._id;

  const isMember =
    project.members?.some((member) =>
      (typeof member === "string" ? member : member._id) === currentUser?._id
    ) || false;

  return (
    <div className="min-h-screen bg-slate-950 px-10 py-12 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 p-10">
        <h1 className="text-5xl font-bold">{project.title}</h1>

        <p className="mt-5 text-lg text-slate-400">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {(project.tech || []).map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-500/20 px-4 py-2 text-blue-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-slate-800 p-5">
            <p className="text-sm text-slate-400">Status</p>
            <h2 className="mt-2 text-xl font-bold">
              {project.status}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <p className="text-sm text-slate-400">Members</p>
            <h2 className="mt-2 text-xl font-bold">
              {project.members?.length || 0}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <p className="text-sm text-slate-400">Owner</p>
            <h2 className="mt-2 text-xl font-bold">
              {project.owner?.name || "Unknown"}
            </h2>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          {isOwner ? (
            <>
              <button
                onClick={() => setShowEditModal(true)}
                className="rounded-xl bg-blue-600 px-8 py-3 font-semibold transition hover:bg-blue-700"
              >
                Edit Project
              </button>

              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-8 py-3 font-semibold transition hover:bg-red-700"
              >
                Delete Project
              </button>
            </>
          ) : isMember ? (
            <button
              disabled
              className="cursor-not-allowed rounded-xl bg-gray-600 px-8 py-3 font-semibold text-white"
            >
              Joined
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Join Project
            </button>
          )}
        </div>
      </div>

      {showEditModal && (
        <EditProjectModal
          project={project}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default ProjectDetails;