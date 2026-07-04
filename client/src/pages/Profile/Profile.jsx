import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/authService";
import {
  User,
  Briefcase,
  Code2,
  Mail,
  Globe,
  Edit,
} from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 py-24">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-10 lg:flex-row">

            {/* Avatar */}
            <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-6xl font-bold shadow-[0_0_50px_rgba(59,130,246,0.5)]">

              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}

            </div>

            {/* Hero Info */}
            <div className="flex-1">

              <h1 className="text-5xl font-bold">
                {user.name}
              </h1>

              <p className="mt-4 text-xl text-slate-400">
                {user.role}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <button
                  onClick={() => navigate("/edit-profile")}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-500"
                >
                  <Edit size={18} />
                  Edit Profile
                </button>

                {user.resume ? (
                  <a
                    href={user.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-700 px-6 py-3 transition hover:border-blue-500"
                  >
                    View Resume
                  </a>
                ) : (
                  <button
                    disabled
                    className="cursor-not-allowed rounded-xl border border-slate-700 px-6 py-3 text-slate-500"
                  >
                    No Resume
                  </button>
                )}

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-3">

        {/* LEFT COLUMN */}

        <div className="space-y-8">

          {/* About */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              About
            </h2>

            <p className="leading-8 text-slate-400">
              {user.bio || "No bio added yet."}
            </p>

          </div>

          {/* Contact */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              Contact
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={18} />
                {user.email}
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Globe size={18} />
                {user.college || "No college added"}
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Briefcase size={18} />
                {user.role}
              </div>

            </div>

          </div>

          {/* Links */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              Links
            </h2>

            <div className="space-y-4">

              {user.github ? (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-400 hover:underline"
                >
                  GitHub
                </a>
              ) : (
                <p className="text-slate-500">
                  GitHub not added
                </p>
              )}

              {user.linkedin ? (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-400 hover:underline"
                >
                  LinkedIn
                </a>
              ) : (
                <p className="text-slate-500">
                  LinkedIn not added
                </p>
              )}

              {user.portfolio ? (
                <a
                  href={user.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-400 hover:underline"
                >
                  Portfolio
                </a>
              ) : (
                <p className="text-slate-500">
                  Portfolio not added
                </p>
              )}

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN */}

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

              {user.skills.length > 0 ? (
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-600/20 px-5 py-3 text-blue-400 transition hover:bg-blue-600 hover:text-white"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-slate-400">
                  No skills added yet.
                </p>
              )}

            </div>

          </div>

          {/* Statistics */}

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">

              <User
                className="mx-auto mb-4 text-blue-500"
                size={34}
              />

              <h3 className="text-4xl font-bold text-blue-500">
                0
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
                0
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
                🚀 Welcome to ConnectSphere!
              </div>

              <div className="rounded-xl border-l-4 border-blue-500 bg-slate-800 p-5">
                👤 Profile created successfully.
              </div>

              <div className="rounded-xl border-l-4 border-blue-500 bg-slate-800 p-5">
                💼 Start adding your projects and skills.
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Profile;