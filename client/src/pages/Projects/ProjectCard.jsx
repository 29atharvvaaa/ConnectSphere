import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const isOwner =
    project.owner?._id === currentUser?._id ||
    project.owner === currentUser?._id;

  const memberCount = Array.isArray(project.members)
    ? project.members.length
    : project.members || 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:border-blue-500 hover:scale-[1.02]">
      {/* Card Content */}
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/projects/${project._id}`)}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {project.title}
            </h2>

            <p className="mt-2 text-slate-400">
              {project.description}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              project.status === "Open"
                ? "bg-green-500/20 text-green-400"
                : project.status === "In Progress"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {project.status}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {(project.tech || []).map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-slate-400">
          <Users size={18} />
          <span>
            {memberCount} {memberCount === 1 ? "Member" : "Members"}
          </span>
        </div>
      </div>

      {/* Show Join Button only if NOT owner */}
      {/* Show View Button only if NOT owner */}
{!isOwner && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      navigate(`/projects/${project._id}`);
    }}
    className="mt-6 w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
  >
    View Project
  </button>
)}
    </div>
  );
}

export default ProjectCard;