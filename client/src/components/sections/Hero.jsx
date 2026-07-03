function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Background */}
      <div className="absolute left-1/2 top-0 h-[750px] w-[750px] -translate-x-1/2 rounded-full bg-blue-500/25 blur-[220px]" />

      <div className="absolute left-20 top-36 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute right-10 bottom-24 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-16 lg:flex-row">

        {/* LEFT */}

        <div className="max-w-xl">

          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400 backdrop-blur">
            🚀 Built for Students & Developers
          </div>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Find Your Team.
            <br />

            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Build Amazing Projects.
            </span>

            <br />

            Get Hired.
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-9 text-slate-300">
            ConnectSphere helps students discover teammates,
            collaborate on real-world projects, showcase their
            skills, and land internships through one modern
            collaboration platform.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 hover:scale-105 hover:bg-blue-700">
              Get Started
            </button>

            <button className="rounded-xl border border-slate-700 px-8 py-4 font-semibold transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-500">
              Explore Projects
            </button>

          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">

            <span>✓ Team Matching</span>

            <span>✓ Project Collaboration</span>

            <span>✓ Internship Discovery</span>

          </div>

        </div>

        {/* RIGHT */}

        <div className="w-full max-w-md">

          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-7 backdrop-blur-xl shadow-[0_0_80px_rgba(59,130,246,0.18)] transition-all duration-500 hover:-translate-y-2">

            <div className="mb-5 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
              Demo Preview
            </div>

            {/* User */}

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-2xl font-bold">
                D
              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Demo User
                </h3>

                <p className="text-slate-400">
                  Computer Science Student
                </p>

              </div>

            </div>

            {/* Stats */}

            <div className="mt-8 grid grid-cols-3 gap-4">

              <div className="rounded-2xl bg-slate-800 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700">

                <h4 className="text-3xl font-bold text-blue-500">
                  8
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Active Projects
                </p>

              </div>

              <div className="rounded-2xl bg-slate-800 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700">

                <h4 className="text-3xl font-bold text-blue-500">
                  42
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Connections
                </p>

              </div>

              <div className="rounded-2xl bg-slate-800 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700">

                <h4 className="text-3xl font-bold text-blue-500">
                  12
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Skills
                </p>

              </div>

            </div>

            {/* Activity */}

            <div className="mt-8">

              <h4 className="mb-4 text-lg font-semibold">
                Recent Activity
              </h4>

              <div className="space-y-4">

                <div className="rounded-xl border-l-4 border-blue-500 bg-slate-800 p-4 transition-all duration-300 hover:translate-x-2 hover:bg-slate-700">
                  👥 Joined React Team
                </div>

                <div className="rounded-xl border-l-4 border-blue-500 bg-slate-800 p-4 transition-all duration-300 hover:translate-x-2 hover:bg-slate-700">
                  🚀 Submitted Smart Study Planner
                </div>

                <div className="rounded-xl border-l-4 border-blue-500 bg-slate-800 p-4 transition-all duration-300 hover:translate-x-2 hover:bg-slate-700">
                  💼 Applied for Frontend Internship
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;