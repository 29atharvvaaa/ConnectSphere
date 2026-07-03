import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
} from "../../services/authService";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    college: "",
    skills: "",
    profilePic: "",
    branch: "",
    github: "",
    linkedin: "",
    portfolio: "",
    resume: "",
    year: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = await getProfile(token);

        setFormData({
          name: user.name || "",
          bio: user.bio || "",
          college: user.college || "",
          skills: user.skills?.join(", ") || "",
          profilePic: user.profilePic || "",
          branch: user.branch || "",
          github: user.github || "",
          linkedin: user.linkedin || "",
          portfolio: user.portfolio || "",
          resume: user.resume || "",
          year: user.year || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await updateProfile(token, {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      alert("Profile Updated Successfully!");
      navigate("/profile");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to Update Profile"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-xl space-y-6"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Edit Profile
        </h1>

        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Full Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* College */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            College
          </label>
          <input
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="Enter your college"
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* Branch */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Branch
          </label>
          <input
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Enter your branch"
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* Year */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Current Year
          </label>
          <input
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="First Year / Second Year"
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Tell everyone about yourself..."
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Skills
          </label>
          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="C++, React, Node.js"
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Profile Picture URL
          </label>
          <input
            name="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            GitHub URL
          </label>
          <input
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            LinkedIn URL
          </label>
          <input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Portfolio URL
          </label>
          <input
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* Resume */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Resume URL
          </label>
          <input
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-500"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex-1 rounded-xl border border-slate-700 py-4 font-semibold text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;