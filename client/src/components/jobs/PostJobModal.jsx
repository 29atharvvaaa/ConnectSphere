import { X } from "lucide-react";
import JobForm from "./JobForm";

function PostJobModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

      <div className="w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Post Opportunity
            </h2>

            <p className="mt-1 text-slate-400">
              Share an internship or job opportunity with students.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={24} />
          </button>

        </div>

        {/* Body */}
        <div className="p-8">
          <JobForm
            onClose={onClose}
            onSuccess={onSuccess}
          />
        </div>

      </div>

    </div>
  );
}

export default PostJobModal;