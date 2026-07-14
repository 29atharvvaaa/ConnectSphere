import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getMyProfile,
  getUserProfile,
} from "../../services/userService";

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const isOwnProfile =
    !id || id === currentUser?._id;

  useEffect(() => {
    loadProfile();
  }, [id]);

  const loadProfile = async () => {
    try {
      const data = isOwnProfile
        ? await getMyProfile()
        : await getUserProfile(id);

      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}
      <section className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-14">

          <div className="flex flex-col items-center gap-6 md:flex-row">

            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">

              <h1 className="text-5xl font-bold">
                {user.name}
              </h1>

              <p className="mt-2 text-xl text-slate-400">
                {user.role}
              </p>

              <p className="mt-2 text-slate-400">
                {user.email}
              </p>

              {user.location && (
                <div className="mt-3 flex items-center gap-2 text-slate-400">
                  <MapPin size={18} />
                  {user.location}
                </div>
              )}

              {isOwnProfile && (
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">

        <div className="grid gap-8 lg:grid-cols-3">

  {/* Left */}
          <div className="space-y-6">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-4 text-2xl font-bold">
                About
              </h2>

              <p className="text-slate-300">
                {user.bio || "No bio added yet."}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-4 text-2xl font-bold">
                Education
              </h2>

              <p>{user.college || "Not added"}</p>

              <p className="text-slate-400">
                {user.branch || "Not added"}
              </p>

              <p className="text-slate-400">
                {user.year || "Not added"}
              </p>
            </div>

          </div>

          {/* Middle */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-5 text-2xl font-bold">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {user.skills?.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-600/20 px-4 py-2 text-blue-300"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-slate-400">
                  No skills added.
                </p>
              )}

            </div>

          </div>

          {/* Right */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-5 text-2xl font-bold">
              Links
            </h2>

            <div className="space-y-4">

              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-400 hover:text-blue-300"
                >
                  GitHub →
                </a>
              )}

              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-400 hover:text-blue-300"
                >
                  LinkedIn →
                </a>
              )}

              {user.portfolio && (
                <a
                  href={user.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-400 hover:text-blue-300"
                >
                  Portfolio →
                </a>
              )}

              {!user.github &&
                !user.linkedin &&
                !user.portfolio && (
                  <p className="text-slate-400">
                    No links added.
                  </p>
                )}

            </div>

          </div>

        </div>

        {/* Quick Actions */}
{isOwnProfile && (
  <div className="mt-10 grid gap-6 md:grid-cols-2">

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        📁 My Projects
      </h2>

      <p className="mt-3 text-slate-400">
        View and manage all the projects you've created.
      </p>

      <button
        onClick={() => navigate("/my-projects")}
        className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
      >
        View Projects
      </button>
    </div>

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        💼 My Jobs
      </h2>

      <p className="mt-3 text-slate-400">
        Manage the internship opportunities you've posted.
      </p>

      <button
        onClick={() => navigate("/my-jobs")}
        className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
      >
        View Jobs
      </button>
    </div>

  </div>
)}

      </section>

    </div>
  );
}

export default Profile;