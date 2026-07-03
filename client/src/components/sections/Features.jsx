import {
  Users,
  FolderKanban,
  Briefcase,
  ArrowRight,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: <Users size={42} />,
      title: "Find Teammates",
      description:
        "Connect with talented students based on skills, interests, technologies, and project goals to build the perfect team.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <FolderKanban size={42} />,
      title: "Project Collaboration",
      description:
        "Create projects, manage tasks, share files, track progress, and collaborate with your teammates in one place.",
      color: "from-violet-500 to-blue-500",
    },
    {
      icon: <Briefcase size={42} />,
      title: "Internship Discovery",
      description:
        "Browse internship opportunities, connect with recruiters, and prepare your portfolio to land your dream role.",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 px-6">

      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
            WHY CONNECTSPHERE
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white md:text-6xl">
            Everything You Need To
            <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Build Together
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Whether you're looking for teammates, building portfolio-worthy
            projects, or preparing for internships, ConnectSphere gives you
            everything in one modern workspace.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-3">

          {features.map((feature, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/50 hover:shadow-[0_20px_60px_rgba(59,130,246,0.18)]"
            >

              {/* Glow */}

              <div
                className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-r ${feature.color} opacity-10 blur-3xl`}
              />

              {/* Icon */}

              <div
                className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                {feature.icon}
              </div>

              {/* Title */}

              <h3 className="mt-8 text-2xl font-bold text-white">
                {feature.title}
              </h3>

              {/* Description */}

              <p className="mt-5 leading-8 text-slate-400">
                {feature.description}
              </p>

              {/* Bottom Link */}

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

        {/* Bottom Stats */}

        <div className="mt-20 grid grid-cols-2 gap-6 rounded-3xl border border-slate-800 bg-slate-950/70 p-10 backdrop-blur-xl md:grid-cols-4">

          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-500">500+</h3>
            <p className="mt-2 text-slate-400">Students</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-500">120+</h3>
            <p className="mt-2 text-slate-400">Projects</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-500">80+</h3>
            <p className="mt-2 text-slate-400">Internships</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-500">24/7</h3>
            <p className="mt-2 text-slate-400">Community</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Features;