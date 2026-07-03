import {
  Users,
  Briefcase,
  MessageCircle,
  Trophy,
  ArrowRight,
} from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <Users size={34} />,
      title: "Find the Right Team",
      description:
        "Search for teammates based on skills, technologies, interests, and project ideas.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: "📁",
      title: "Build Real Projects",
      description:
        "Create projects, assign roles, manage tasks, and collaborate from one place.",
      color: "from-violet-500 to-blue-500",
    },
    {
      icon: <MessageCircle size={34} />,
      title: "Communicate Easily",
      description:
        "Stay connected with your teammates using built-in collaboration features.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Briefcase size={34} />,
      title: "Explore Internships",
      description:
        "Browse internship opportunities posted by companies and recruiters.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Trophy size={34} />,
      title: "Grow Your Portfolio",
      description:
        "Showcase completed projects and create a profile recruiters love.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: "🛡️",
      title: "Verified Community",
      description:
        "Join a trusted network built specifically for students and developers.",
      color: "from-emerald-500 to-cyan-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 px-6">

      {/* Background Glow */}
      <div className="absolute left-20 top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="absolute right-20 bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white md:text-6xl">
            Build Your Career
            <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              In Six Simple Steps
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            ConnectSphere makes it easy to discover teammates,
            collaborate on real-world projects, showcase your skills,
            and prepare for placements—all from one platform.
          </p>

        </div>

        {/* Timeline */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {steps.map((step, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/50 hover:shadow-[0_20px_60px_rgba(59,130,246,0.18)]"
            >

              {/* Step Number */}

              <div className="absolute right-6 top-6 text-5xl font-black text-slate-800">
                0{index + 1}
              </div>

              {/* Glow */}

              <div
                className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-r ${step.color} opacity-10 blur-3xl`}
              />

              {/* Icon */}

              <div
                className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                {step.icon}
              </div>

              {/* Title */}

              <h3 className="mt-8 text-2xl font-bold text-white">
                {step.title}
              </h3>

              {/* Description */}

              <p className="mt-5 leading-8 text-slate-400">
                {step.description}
              </p>

              {/* Button */}

              <button className="mt-8 flex items-center gap-2 font-medium text-blue-400 transition group-hover:gap-4">

                Learn More

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </button>

            </div>

          ))}

        </div>

        {/* Bottom CTA */}

        <div className="mt-24 rounded-[32px] border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 p-12 text-center shadow-[0_0_80px_rgba(59,130,246,0.08)]">

          <h3 className="text-4xl font-bold text-white">
            Ready To Build Something Amazing?
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Join thousands of students collaborating on real projects,
            building stronger portfolios, and discovering internship
            opportunities every day.
          </p>

          <button className="mt-10 rounded-2xl bg-blue-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/40 transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]">
            Get Started Free
          </button>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;