import { useEffect, useState } from "react";
import { getJobs, applyJob } from "../../api/jobService";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 py-24">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
            INTERNSHIP OPPORTUNITIES
          </span>

          <h1 className="mt-8 text-6xl font-bold">
            Find Your Next
            <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Dream Internship
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
            Explore internships from startups and companies looking
            for talented student developers. Build experience before
            graduation.
          </p>
        </div>
      </section>

      {/* Jobs */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        {loading ? (
          <h2 className="text-center text-xl text-slate-400">
            Loading Jobs...
          </h2>
        ) : jobs.length === 0 ? (
          <h2 className="text-center text-xl text-slate-400">
            No Jobs Available
          </h2>
        ) : (
          <div className="grid gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_20px_60px_rgba(59,130,246,0.18)]"
              >
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                  <div>
                    <div className="mb-4 inline-flex rounded-full bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400">
                      {job.type}
                    </div>

                    <h2 className="text-3xl font-bold">
                      {job.title}
                    </h2>

                    <p className="mt-3 text-lg text-slate-400">
                      {job.company}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-6 text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        {job.location}
                      </div>

                      <div className="flex items-center gap-2">
                        <Briefcase size={18} />
                        {job.salary}
                      </div>
                    </div>

                    <p className="mt-5 text-slate-300">
                      {job.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
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

                  <button
                    onClick={() => handleApply(job._id)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                  >
                    Apply Now
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 bg-slate-900 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-5xl font-bold">
            Don't See Your Dream Internship?
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            New internship opportunities are posted every week.
            Build projects, grow your profile, and recruiters
            will discover you.
          </p>

          <button className="mt-10 rounded-2xl bg-blue-600 px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]">
            Explore Projects Instead
          </button>
        </div>
      </section>
    </div>
  );
}

export default Jobs;