import { useEffect, useState } from "react";
import { createJob, updateJob } from "../../api/jobService";

function JobForm({
  initialData = null,
  onSuccess,
  onClose,
  isEditing = false,
}) {
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        company: initialData.company || "",
        location: initialData.location || "",
        type: initialData.type || "Internship",
        description: initialData.description || "",
        salary: initialData.salary || "",
        skills: initialData.skills
          ? initialData.skills.join(", ")
          : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      if (isEditing) {
        await updateJob(initialData._id, payload);
        alert("Opportunity Updated Successfully!");
      } else {
        await createJob(payload);
        alert("Opportunity Posted Successfully!");
      }

      onSuccess();
      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong."
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
          placeholder="Salary / Stipend"
          value={formData.salary}
          onChange={handleChange}
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
        />

      </div>

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-blue-500"
      >
        <option>Internship</option>
        <option>Full Time</option>
        <option>Part Time</option>
        <option>Remote</option>
      </select>

      <input
        name="skills"
        placeholder="React, Node.js, MongoDB"
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
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-60"
        >
          {loading
            ? isEditing
              ? "Updating..."
              : "Posting..."
            : isEditing
            ? "Update Opportunity"
            : "Publish Opportunity"}
        </button>

      </div>

    </form>
  );
}

export default JobForm;