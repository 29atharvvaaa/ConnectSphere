import JobForm from "./JobForm";

function EditJobModal({
  isOpen,
  onClose,
  job,
  onUpdate,
}) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Edit Opportunity
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-slate-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <JobForm
          initialData={job}
          onSuccess={onUpdate}
          onClose={onClose}
          isEditing={true}
        />

      </div>
    </div>
  );
}

export default EditJobModal;