import { useState, useEffect } from "react";

function ProjectForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    requiredRoles: "",
    maxMembers: 4,
    status: "Open",
  });

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title || "",
      description: initialData.description || "",
      tech: initialData.tech ? initialData.tech.join(", ") : "",
      requiredRoles: initialData.requiredRoles
        ? initialData.requiredRoles.join(", ")
        : "",
      maxMembers: initialData.maxMembers || 4,
      status: initialData.status || "Open",
    });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "maxMembers"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      description: formData.description,
      status: formData.status,

      tech: formData.tech
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      requiredRoles: formData.requiredRoles
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      maxMembers: formData.maxMembers,
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Project Title */}
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Project Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Description
        </label>

        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Tech Stack */}
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Tech Stack
        </label>

        <input
          type="text"
          name="tech"
          value={formData.tech}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
        />

        <p className="mt-2 text-sm text-slate-400">
          Separate technologies with commas (e.g. React, Node.js, MongoDB)
        </p>
      </div>

      {/* Required Roles */}
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Required Roles
        </label>

        <input
          type="text"
          name="requiredRoles"
          value={formData.requiredRoles}
          onChange={handleChange}
          placeholder="Frontend, Backend, UI/UX"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
        />

        <p className="mt-2 text-sm text-slate-400">
          Separate roles with commas.
        </p>
      </div>

      {/* Maximum Members */}
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Maximum Team Size
        </label>

        <select
          name="maxMembers"
          value={formData.maxMembers}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
        >
          <option value={2}>2 Members</option>
          <option value={3}>3 Members</option>
          <option value={4}>4 Members</option>
          <option value={5}>5 Members</option>
          <option value={6}>6 Members</option>
          <option value={7}>7 Members</option>
          <option value={8}>8 Members</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Status
        </label>

        <select
  name="status"
  value={formData.status}
  onChange={handleChange}
>
  <option value="Open">Open</option>
  <option value="In Progress">In Progress</option>
  <option value="Closed">Closed</option>
</select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-700 px-5 py-2 text-slate-300 hover:border-slate-500"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Save Project
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;