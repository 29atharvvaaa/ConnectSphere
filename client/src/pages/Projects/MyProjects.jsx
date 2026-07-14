import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyProjects } from "../../services/projectService";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getMyProjects();
      setProjects(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-2 text-5xl font-bold">
          My Projects
        </h1>

        <p className="mb-10 text-slate-400">
          Projects created by you.
        </p>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 py-20 text-center">
            <h2 className="text-2xl font-bold">
              No Projects Yet
            </h2>

            <p className="mt-3 text-slate-400">
              Create your first project to start collaborating.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {projects.map((project) => (
              <div
                key={project._id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="mb-4 flex items-center justify-between">

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      project.status === "Open"
                        ? "bg-green-500/20 text-green-400"
                        : project.status === "In Progress"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {project.status}
                  </span>

                  <span className="text-slate-400">
                    👥 {project.members.length}/{project.maxMembers}
                  </span>

                </div>

                <h2 className="text-2xl font-bold">
                  {project.title}
                </h2>

                <p className="mt-4 text-slate-400 line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${project._id}`}
                  className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
                >
                  Manage Project
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyProjects;