import projects from "../../data/projects";

function Projects() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-12">

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

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {projects.map((project) => (

            <div
              key={project.id}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)]"
            >

              {/* Status */}

              <div className="mb-5 flex items-center justify-between">

                <span className="rounded-full bg-blue-600/20 px-3 py-1 text-sm font-medium text-blue-400">
                  {project.status}
                </span>

                <span className="text-sm text-slate-500">
                  👥 {project.members} Members
                </span>

              </div>

              {/* Title */}

              <h2 className="text-2xl font-bold">
                {project.title}
              </h2>

              {/* Description */}

              <p className="mt-4 leading-7 text-slate-400">
                {project.description}
              </p>

              {/* Tech */}

              <div className="mt-6 flex flex-wrap gap-2">

                {project.tech.map((tech) => (

                  <span
                    key={tech}
                    className="rounded-full bg-slate-800 px-4 py-2 text-sm text-blue-400"
                  >
                    {tech}
                  </span>

                ))}

              </div>

              {/* Footer */}

              <div className="mt-8 flex items-center justify-between">

                <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-700">
                  Join Project
                </button>

                <button className="rounded-xl border border-slate-700 px-5 py-3 transition-all duration-300 hover:border-blue-500 hover:bg-slate-800">
                  Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Projects;