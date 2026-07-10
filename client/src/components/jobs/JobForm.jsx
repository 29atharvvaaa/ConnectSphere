import { useState } from "react";
import { createJob } from "../../api/jobService";

function JobForm({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Internship",
    description: "",
    skills: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createJob({
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim()),
      });

      alert("Opportunity Posted Successfully!");

      onSuccess();
      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to Post Opportunity"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div className="grid gap-5 md:grid-cols-2">

        <input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
          required
        />

        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
          required
        />

        <input
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
        />

      </div>

      <input
        name="skills"
        placeholder="React, Node, MongoDB"
        value={formData.skills}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
      />

      <textarea
        rows={5}
        name="description"
        placeholder="Describe the opportunity..."
        value={formData.description}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
        required
      />

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-700 px-6 py-3"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
        >
          {loading ? "Posting..." : "Publish Opportunity"}
        </button>

      </div>

    </form>
  );
}

export default JobForm;