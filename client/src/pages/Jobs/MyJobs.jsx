import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase } from "lucide-react";

import { getMyJobs } from "../../api/jobService";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getMyJobs();
      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-2 text-5xl font-bold">
          My Jobs
        </h1>

        <p className="mb-10 text-slate-400">
          Internship opportunities you've posted.
        </p>

        {jobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 py-20 text-center">
            <h2 className="text-2xl font-bold">
              No Jobs Posted
            </h2>

            <p className="mt-3 text-slate-400">
              Start by posting your first opportunity.
            </p>
          </div>
        ) : (
          <div className="grid gap-8">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <span className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-300">
                      {job.type}
                    </span>

                    <h2 className="mt-4 text-3xl font-bold">
                      {job.title}
                    </h2>

                    <p className="mt-2 text-slate-400">
                      {job.company}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-6 text-slate-400">

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
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-slate-800 px-3 py-1 text-sm text-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>

                  <div className="text-center">

                    <div className="mb-4 text-4xl font-bold text-blue-400">
                      {job.applicants.length}
                    </div>

                    <p className="mb-5 text-slate-400">
                      Applicants
                    </p>

                    <Link
  to="/jobs"
                      className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
                    >
                        View Jobs</Link>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyJobs;