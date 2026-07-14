import { useEffect, useMemo, useState } from "react";
import {
  getJobs,
  applyJob,
  deleteJob,
} from "../../api/jobService";

import {
  MapPin,
  Briefcase,
  ArrowRight,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import PostJobModal from "../../components/jobs/PostJobModal";
import EditJobModal from "../../components/jobs/EditJobModal";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (id) => {
    try {
      await applyJob(id);
      alert("Application Submitted!");
      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to Apply");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this opportunity?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);
      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowEdit(true);
  };

  const handleUpdate = () => {
    setShowEdit(false);
    setSelectedJob(null);
    fetchJobs();
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.location.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(keyword)
        );

      const matchesFilter =
        filter === "All" || job.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [jobs, search, filter]);
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 py-20">

        <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
                INTERNSHIP OPPORTUNITIES
              </span>

              <h1 className="mt-6 text-5xl font-bold">
                Find Your Next
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Dream Internship
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-slate-400">
                Explore internships and jobs posted by students and companies.
                Apply instantly or publish your own opportunity.
              </p>

            </div>

            <button
              onClick={() => setShowModal(true)}
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-500"
            >
              + Post Opportunity
            </button>

          </div>

          {/* Search + Filter */}

          <div className="mt-10 flex flex-col gap-4 md:flex-row">

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 outline-none"
            >
              <option>All</option>
              <option>Internship</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Remote</option>
            </select>

          </div>

        </div>

      </section>

      {/* Jobs */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        {loading ? (

          <h2 className="text-center text-xl text-slate-400">
            Loading Jobs...
          </h2>

        ) : filteredJobs.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-700 py-24 text-center">

            <div className="text-6xl">💼</div>

            <h2 className="mt-5 text-3xl font-bold">
              No Jobs Found
            </h2>

            <p className="mt-3 text-slate-400">
              Try another search or post a new opportunity.
            </p>

          </div>

        ) : (

          <div className="grid gap-8">

            {filteredJobs.map((job) => {

              const isOwner =
                job.postedBy?._id === user?._id;

              return (

                <div
                  key={job._id}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-blue-500 hover:shadow-xl"
                >

                  <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">

                    <div className="flex-1">

                      <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-400">
                        {job.type}
                      </span>

                      <h2 className="mt-5 text-3xl font-bold">
                        {job.title}
                      </h2>

                      <p className="mt-2 text-lg text-slate-400">
                        {job.company}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-6 text-slate-400">

                        <div className="flex items-center gap-2">
                          <MapPin size={18} />
                          {job.location}
                        </div>

                        <div className="flex items-center gap-2">
                          <Briefcase size={18} />
                          {job.salary}
                        </div>

                        <div className="flex items-center gap-2">
                          <Users size={18} />
                          {job.applicants.length} Applicants
                        </div>

                      </div>

                      <p className="mt-6 text-slate-300">
                        {job.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">

                        {job.skills.map((skill, index) => (

                          <span
                            key={index}
                            className="rounded-full bg-slate-800 px-3 py-1 text-sm text-blue-300"
                          >
                            {skill}
                          </span>

                        ))}

                      </div>

                    </div>

                    <div className="flex flex-col gap-3">

                      {isOwner ? (
                        <>
                          <button
                            onClick={() => handleEdit(job)}
                            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400"
                          >
                            <Pencil size={18} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(job._id)}
                            className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-500"
                          >
                            <Trash2 size={18} />
                            Delete
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleApply(job._id)}
                          className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-500"
                        >
                          Apply Now
                          <ArrowRight size={18} />
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </section>

      <PostJobModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchJobs}
      />

      <EditJobModal
        isOpen={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
        onUpdate={handleUpdate}
      />

    </div>
  );
}

export default Jobs;