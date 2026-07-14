import { useEffect, useState } from "react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";

import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";
import EditProjectModal from "./EditProjectModal";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (projectData) => {
    try {
      await createProject(projectData);
      setShowCreate(false);
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowEdit(true);
  };

  const handleUpdate = async (projectData) => {
    try {
      await updateProject(selectedProject._id, projectData);
      setShowEdit(false);
      setSelectedProject(null);
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  // Search + Filter
  const filteredProjects = projects.filter((project) => {
    const text = search.toLowerCase();

    const matchesSearch =
  project.title?.toLowerCase().includes(text) ||
  project.description?.toLowerCase().includes(text) ||
  project.tech?.some((tech) =>
    tech.toLowerCase().includes(text)
  );

    let matchesFilter = true;

if (filter === "Open") {
  matchesFilter = project.status === "Open";
} else if (filter === "In Progress") {
  matchesFilter = project.status === "In Progress";
} else if (filter === "Completed") {
  matchesFilter =
    project.status === "Completed" ||
    project.status === "Closed";
}

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-2xl text-white">
        Loading Projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-blue-400">
                Explore
              </p>

              <h1 className="mt-2 text-5xl font-bold">
                Student Projects
              </h1>

              <p className="mt-4 max-w-2xl text-slate-400">
                Discover innovative student projects,
                collaborate with talented developers,
                and build your portfolio.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">

              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-80 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none transition focus:border-blue-500"
              />

              <button
                onClick={() => setShowCreate(true)}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
              >
                + Create Project
              </button>

            </div>

          </div>

          {/* Filters */}

          <div className="flex flex-wrap gap-3">

            {[
  "All",
  "Open",
  "In Progress",
  "Completed",
].map((item) => (
  <button
    key={item}
    onClick={() => setFilter(item)}
    className={`rounded-full px-5 py-2 transition ${
      filter === item
        ? "bg-blue-600 text-white"
        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
    }`}
  >
    {item}
  </button>
))}

          </div>

        </div>

        {filteredProjects.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-700 py-24 text-center">

            <div className="text-6xl">
              📂
            </div>

            <h2 className="mt-6 text-3xl font-bold">
              No Projects Found
            </h2>

            <p className="mt-3 text-slate-400">
              Try changing your search or filter,
              or create a new project.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
              />
            ))}

          </div>

        )}

      </div>

      <CreateProjectModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={handleCreate}
      />

      <EditProjectModal
        isOpen={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default Projects;