import { ArrowRight, Users } from "lucide-react";
import projects from "../../data/projects";

function FeaturedProjects() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
            FEATURED PROJECTS
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white md:text-6xl">
            Build Something
            <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Explore student-led projects looking for passionate developers,
            designers, and innovators.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_20px_60px_rgba(59,130,246,0.18)]"
            >
              {/* Status */}

              <div className="mb-6 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
                🟢 Launching Soon
              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-white">
                {project.title}
              </h3>

              <p className="mt-3 text-slate-400">
                {project.description}
              </p>

              {/* Tech */}

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Team */}

              <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">
                <div className="flex items-center gap-2 text-slate-400">
                  <Users size={18} />
                  <span>{project.members} Members</span>
                </div>

                <button className="flex items-center gap-2 font-medium text-blue-400 transition hover:gap-4">
                  View Project
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}

        <div className="mt-16 text-center">
          <button className="rounded-2xl border border-blue-500/30 px-8 py-4 font-semibold text-blue-400 transition-all duration-300 hover:bg-blue-600 hover:text-white">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;