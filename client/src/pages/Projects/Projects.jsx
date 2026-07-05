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
        <div className="mb-12 flex items-center justify-between">

          <div>
            <p className="text-blue-400">
              Explore
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              Student Projects
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Discover innovative student projects, collaborate with talented
              developers, and build your portfolio by joining exciting teams.
            </p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
          >
            + Create Project
          </button>

        </div>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 py-24 text-center">
            <h2 className="text-2xl font-bold">
              No Projects Yet
            </h2>

            <p className="mt-3 text-slate-400">
              Click "Create Project" to add your first project.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
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