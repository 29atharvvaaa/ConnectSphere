import { users } from "../../data/users";
import {
  User,
  Briefcase,
  Code2,
  Mail,
  Globe,
  Linkedin,
  Edit,
} from "lucide-react";

function Profile() {
  const user = users[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}

      <section className="relative overflow-hidden border-b border-slate-800 py-24">

        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="flex flex-col items-center gap-10 lg:flex-row">

            {/* Avatar */}

            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-6xl font-bold shadow-[0_0_50px_rgba(59,130,246,0.5)]">
              {user.name.charAt(0)}
            </div>

            {/* Info */}

            <div className="flex-1">

              <h1 className="text-5xl font-bold">
                {user.name}
              </h1>

              <p className="mt-4 text-xl text-slate-400">
                {user.role}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-500">
                  <Edit size={18} />
                  Edit Profile
                </button>

                <button className="rounded-xl border border-slate-700 px-6 py-3 transition hover:border-blue-500">
                  View Resume
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Content */}

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-3">

        {/* Left */}

        <div className="space-y-8">

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              About
            </h2>

            <p className="leading-8 text-slate-400">
              Passionate Computer Science student interested in
              building real-world applications, collaborating with
              developers, and preparing for internships.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              Contact
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={18} />
                demo@connectsphere.com
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Globe size={18} />
                github.com/demo
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Linkedin size={18} />
                linkedin.com/demo
              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-8 lg:col-span-2">

          {/* Skills */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <div className="mb-6 flex items-center gap-3">

              <Code2 className="text-blue-500" />

              <h2 className="text-2xl font-bold">
                Skills
              </h2>

            </div>

            <div className="flex flex-wrap gap-4">

              {user.skills.map((skill) => (

                <span
                  key={skill}
                  className="rounded-full bg-blue-600/20 px-5 py-3 text-blue-400 transition hover:bg-blue-600 hover:text-white"
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

          {/* Statistics */}

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">

              <User className="mx-auto mb-4 text-blue-500" size={34} />

              <h3 className="text-4xl font-bold text-blue-500">
                8
              </h3>

              <p className="mt-2 text-slate-400">
                Projects
              </p>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">

              <Briefcase
                className="mx-auto mb-4 text-blue-500"
                size={34}
              />

              <h3 className="text-4xl font-bold text-blue-500">
                5
              </h3>

              <p className="mt-2 text-slate-400">
                Internships Applied
              </p>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">

              <Code2
                className="mx-auto mb-4 text-blue-500"
                size={34}
              />

              <h3 className="text-4xl font-bold text-blue-500">
                {user.skills.length}
              </h3>

              <p className="mt-2 text-slate-400">
                Skills
              </p>

            </div>

          </div>

          {/* Recent Activity */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-8 text-2xl font-bold">
              Recent Activity
            </h2>

            <div className="space-y-5">

              <div className="rounded-xl border-l-4 border-blue-500 bg-slate-800 p-5">
                🚀 Created Smart Study Planner Project
              </div>

              <div className="rounded-xl border-l-4 border-blue-500 bg-slate-800 p-5">
                👥 Joined React Development Team
              </div>

              <div className="rounded-xl border-l-4 border-blue-500 bg-slate-800 p-5">
                💼 Applied for Frontend Internship
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Profile;