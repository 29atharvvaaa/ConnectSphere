import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import EditProjectModal from "./EditProjectModal";

import {
  getProjectById,
  joinProject,
  deleteProject,
  updateProject,
  acceptRequest,
  rejectRequest,
} from "../../services/projectService";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);

      const data = await getProjectById(id);
      setProject(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
  try {
    await joinProject(id);

    toast.success("Join request sent successfully!");

    fetchProject();
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to send join request."
    );
  }
};

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(project._id);

      toast.success("Project Deleted");

      navigate("/projects");
    } catch (error) {
      console.log(error);

      toast.error(
  error.response?.data?.message ||
    "Failed to delete project."
);
    }
  };

  const handleUpdate = async (projectData) => {
    try {
      await updateProject(project._id, projectData);

      await fetchProject();

      setShowEditModal(false);

      toast.success("Project updated successfully!");
    } catch (error) {
      console.log(error);

      toast.error(
  error.response?.data?.message ||
    "Failed to update project."
);
  };
};

  const handleAccept = async (userId) => {
  try {
    await acceptRequest(project._id, userId);

    toast.success("Request accepted successfully!");

    fetchProject();
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to accept request."
    );
  }
};

  const handleReject = async (userId) => {
    try {
      await rejectRequest(project._id, userId);

      toast.success("Request rejected.");

      fetchProject();
    } catch (error) {
      console.log(error);

      toast.error(
  error.response?.data?.message ||
    "Failed to reject request."
);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-2xl text-white">
        Loading Project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-2xl text-white">
        Project not found.
      </div>
    );
  }

  const isOwner =
    currentUser?._id ===
    (project.owner?._id || project.owner);

  const isMember =
    project.members?.some(
      (member) =>
        (typeof member === "string"
          ? member
          : member._id) === currentUser?._id
    ) || false;
  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

          <div className="flex flex-col justify-between gap-8 lg:flex-row">

            <div>

              <h1 className="text-5xl font-bold">
                {project.title}
              </h1>

              <p className="mt-5 text-lg text-slate-400">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                {(project.tech || []).map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-500/20 px-4 py-2 text-blue-400"
                  >
                    {tech}
                  </span>
                ))}

              </div>

            </div>

            <div className="flex flex-col gap-3">

              {isOwner ? (
                <>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="rounded-xl bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700"
                  >
                    Edit Project
                  </button>

                  <button
                    onClick={handleDelete}
                    className="rounded-xl bg-red-600 px-8 py-3 font-semibold hover:bg-red-700"
                  >
                    Delete Project
                  </button>
                </>
              ) : isMember ? (
                <button
                  disabled
                  className="cursor-not-allowed rounded-xl bg-gray-700 px-8 py-3 font-semibold"
                >
                  Team Member
                </button>
              ) : (
                <button
                  onClick={handleJoin}
                  className="rounded-xl bg-green-600 px-8 py-3 font-semibold hover:bg-green-700"
                >
                  Send Join Request
                </button>
              )}

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="mt-10 grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-slate-400">Status</p>

            <h2 className="mt-2 text-2xl font-bold">
              {project.status}
            </h2>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-slate-400">Members</p>

            <h2 className="mt-2 text-2xl font-bold">
              {project.members.length}/{project.maxMembers}
            </h2>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-slate-400">Owner</p>

            <h2
  onClick={() => navigate(`/profile/${project.owner?._id}`)}
  className="mt-2 cursor-pointer text-xl font-bold transition hover:text-blue-400"
>
  {project.owner?.name}
</h2>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-slate-400">Pending Requests</p>

            <h2 className="mt-2 text-2xl font-bold">
              {project.pendingRequests?.length || 0}
            </h2>
          </div>

        </div>

        {/* Required Roles */}

        <div className="mt-10 rounded-3xl bg-slate-900 p-8">

          <h2 className="mb-5 text-2xl font-bold">
            Required Roles
          </h2>

          {project.requiredRoles?.length === 0 ? (
            <p className="text-slate-400">
              No specific roles required.
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">

              {project.requiredRoles.map((role, index) => (
                <span
                  key={index}
                  className="rounded-full bg-purple-500/20 px-4 py-2 text-purple-300"
                >
                  {role}
                </span>
              ))}

            </div>
          )}

        </div>

        {/* Team Members */}

        <div className="mt-10 rounded-3xl bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-bold">
            Team Members
          </h2>

          <div className="space-y-4">

            {project.members.map((member) => (

              <div
  key={member._id}
  onClick={() => navigate(`/profile/${member._id}`)}
  className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-800 p-5 transition hover:bg-slate-700"
>

                <div>
                  <h3 className="font-semibold">
                    {member.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {member.email}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Pending Requests */}

        {isOwner && (
          <div className="mt-10 rounded-3xl bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              Pending Join Requests
            </h2>

            {project.pendingRequests?.length === 0 ? (

              <p className="text-slate-400">
                No pending requests.
              </p>

            ) : (

              <div className="space-y-4">

                {project.pendingRequests.map((user) => (

                  <div
  key={user._id}
  className="flex flex-col justify-between gap-4 rounded-xl bg-slate-800 p-5 md:flex-row md:items-center"
>

                    <div
  onClick={() => navigate(`/profile/${user._id}`)}
  className="cursor-pointer transition hover:text-blue-400"
>
  <h3 className="font-semibold">
    {user.name}
  </h3>

  <p className="text-sm text-slate-400">
    {user.email}
  </p>
</div>

                    <div className="flex gap-3">

                      <button
                        onClick={() => handleAccept(user._id)}
                        className="rounded-lg bg-green-600 px-5 py-2 hover:bg-green-700"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(user._id)}
                        className="rounded-lg bg-red-600 px-5 py-2 hover:bg-red-700"
                      >
                        Reject
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>
        )}

        {/* Links */}

        {(project.github || project.demo) && (

          <div className="mt-10 rounded-3xl bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              Project Links
            </h2>

            <div className="flex gap-4">

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700"
                >
                  GitHub
                </a>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700"
                >
                  Live Demo
                </a>
              )}

            </div>

          </div>

        )}

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
