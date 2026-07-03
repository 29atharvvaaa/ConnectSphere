import { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";

import projects from "../../data/projects";
import { internships } from "../../data/internships";
import { notifications } from "../../data/notifications";

function Dashboard() {
const [user, setUser] = useState(null);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getProfile(token);

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProfile();
}, []);
if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
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

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500">

            <p className="text-slate-400">
              Active Projects
            </p>

            <h2 className="mt-3 text-5xl font-bold text-blue-500">
              {projects.length}
            </h2>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500">

            <p className="text-slate-400">
              Internships
            </p>

            <h2 className="mt-3 text-5xl font-bold text-blue-500">
              {internships.length}
            </h2>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500">

            <p className="text-slate-400">
              Notifications
            </p>

            <h2 className="mt-3 text-5xl font-bold text-blue-500">
              {notifications.length}
            </h2>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500">

            <p className="text-slate-400">
              Skills
            </p>

            <h2 className="mt-3 text-5xl font-bold text-blue-500">
              {user.skills.length}
            </h2>

          </div>

        </div>

        {/* Notifications */}

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-6 text-3xl font-bold">
            Recent Notifications
          </h2>

          <div className="space-y-4">

            {notifications.map((note) => (

              <div
                key={note.id}
                className="rounded-2xl border-l-4 border-blue-500 bg-slate-800 p-5 transition-all duration-300 hover:translate-x-2"
              >
                {note.message}
              </div>

            ))}

          </div>

        </div>

        {/* Projects */}

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-8 text-3xl font-bold">
            Active Projects
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            {projects.map((project) => (

              <div
                key={project.id}
                className="rounded-3xl border border-slate-700 bg-slate-800 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
              >

                <div className="mb-4 flex items-center justify-between">

                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>

                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                    {project.status}
                  </span>

                </div>

                <p className="text-slate-400">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  {project.tech.map((tech) => (

                    <span
                      key={tech}
                      className="rounded-full bg-blue-600/20 px-3 py-2 text-sm text-blue-400"
                    >
                      {tech}
                    </span>

                  ))}

                </div>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-sm text-slate-500">
                    👥 {project.members} Members
                  </span>

                  <button className="rounded-xl bg-blue-600 px-4 py-2 transition hover:bg-blue-700">
                    View
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Internships */}

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-8 text-3xl font-bold">
            Internship Opportunities
          </h2>

          <div className="space-y-5">

            {internships.map((internship) => (

              <div
                key={internship.id}
                className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-700 bg-slate-800 p-6 transition-all duration-300 hover:border-blue-500 hover:bg-slate-800/80 md:flex-row md:items-center"
              >

                <div>

                  <h3 className="text-2xl font-bold">
                    {internship.role}
                  </h3>

                  <p className="mt-2 text-slate-400">
                    {internship.company}
                  </p>

                </div>

                <div className="flex items-center gap-5">

                  <span className="text-slate-400">
                    📍 {internship.location}
                  </span>

                  <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700">
                    Apply
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;