import ProjectForm from "./ProjectForm";

function CreateProjectModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Create New Project
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-400 transition hover:text-white"
          >
            ×
          </button>
        </div>

        <ProjectForm
          onSubmit={onCreate}
          onCancel={onClose}
        />

      </div>
    </div>
  );
}

export default CreateProjectModal;