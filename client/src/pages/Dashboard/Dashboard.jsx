import { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";
import { getDashboard } from "../../services/dashboardService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const profileData = await getProfile(token);
      const dashboardData = await getDashboard();

      setUser(profileData);
      setDashboard(dashboardData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user || !dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-2xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>

            <p className="mb-2 text-blue-400">
              Welcome Back 👋
            </p>

            <h1 className="text-5xl font-bold">
              {user.name}
            </h1>

            <p className="mt-3 text-slate-400">
              Keep building amazing projects and grow your developer portfolio.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

            <p className="text-sm text-slate-400">
              Current Role
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {user.role}
            </h2>

          </div>

        </div>

        {/* Stats */}

<div className="grid gap-6 md:grid-cols-4">

  {/* Projects Created */}
  <div
    onClick={() => navigate("/my-projects")}
    className="cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500"
  >
    <p className="text-slate-400">
      Projects Created
    </p>

    <h2 className="mt-3 text-5xl font-bold text-blue-500">
      {dashboard.projectsCreated}
    </h2>
  </div>

  {/* Projects Joined */}
  <div
    onClick={() => navigate("/projects")}
    className="cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500"
  >
    <p className="text-slate-400">
      Projects Joined
    </p>

    <h2 className="mt-3 text-5xl font-bold text-blue-500">
      {dashboard.projectsJoined}
    </h2>
  </div>

  {/* Jobs Posted */}
  <div
    onClick={() => navigate("/my-jobs")}
    className="cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500"
  >
    <p className="text-slate-400">
      Jobs Posted
    </p>

    <h2 className="mt-3 text-5xl font-bold text-blue-500">
      {dashboard.jobsPosted}
    </h2>
  </div>

  {/* Jobs Applied */}
  <div
    onClick={() => navigate("/jobs")}
    className="cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500"
  >
    <p className="text-slate-400">
      Jobs Applied
    </p>

    <h2 className="mt-3 text-5xl font-bold text-blue-500">
      {dashboard.jobsApplied}
    </h2>
  </div>

</div>

        {/* Recent Projects */}

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-8 text-3xl font-bold">
            Recent Projects
          </h2>

          {dashboard.recentProjects.length === 0 ? (

            <p className="text-slate-400">
              No projects yet.
            </p>

          ) : (

            <div className="grid gap-6 md:grid-cols-2">

              {dashboard.recentProjects.map((project) => (

                <div
                  key={project._id}
                  className="rounded-2xl border border-slate-700 bg-slate-800 p-6"
                >

                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-slate-400">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {project.tech.map((tech) => (

                      <span
                        key={tech}
                        className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-400"
                      >
                        {tech}
                      </span>

                    ))}

                  </div>

                  <button
                    onClick={() => navigate(`/projects/${project._id}`)}
                    className="mt-6 rounded-xl bg-blue-600 px-5 py-2 hover:bg-blue-700"
                  >
                    View Project
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Recent Jobs */}

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-8 text-3xl font-bold">
            Recent Jobs Posted
          </h2>

          {dashboard.recentJobs.length === 0 ? (

            <p className="text-slate-400">
              No jobs posted yet.
            </p>

          ) : (

            <div className="space-y-6">

              {dashboard.recentJobs.map((job) => (

                <div
                  key={job._id}
                  className="rounded-2xl border border-slate-700 bg-slate-800 p-6"
                >

                  <h3 className="text-2xl font-bold">
                    {job.title}
                  </h3>

                  <p className="mt-2 text-slate-400">
                    {job.company}
                  </p>

                  <p className="mt-4 text-slate-300">
                    {job.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {job.skills.map((skill) => (

                      <span
                        key={skill}
                        className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-400"
                      >
                        {skill}
                      </span>

                    ))}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;