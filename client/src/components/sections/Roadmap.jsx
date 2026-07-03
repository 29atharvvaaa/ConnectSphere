import {
  Briefcase,
  Bot,
  MessageSquare,
  Trophy,
  BarChart3,
  Globe,
} from "lucide-react";

function Roadmap() {
  const roadmap = [
    {
      icon: <Briefcase size={32} />,
      title: "Internship Portal",
      description:
        "Discover verified internships from companies and startups.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Bot size={32} />,
      title: "AI Team Matching",
      description:
        "Get matched with teammates based on skills and interests.",
      color: "from-violet-500 to-blue-500",
    },
    {
      icon: <MessageSquare size={32} />,
      title: "Real-Time Team Chat",
      description:
        "Collaborate with teammates using built-in messaging.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Trophy size={32} />,
      title: "Hackathons & Events",
      description:
        "Participate in coding competitions and campus events.",
      color: "from-orange-500 to-yellow-500",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Portfolio Analytics",
      description:
        "Track profile views, project engagement, and recruiter visits.",
      color: "from-green-500 to-cyan-500",
    },
    {
      icon: <Globe size={32} />,
      title: "Developer Community",
      description:
        "Join discussions, share ideas, and grow with other students.",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 px-6 py-24">

      {/* Background Glow */}

      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
            PRODUCT ROADMAP
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white md:text-6xl">
            What's
            <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Coming Next
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            ConnectSphere is actively being developed. Here's a preview of
            features planned for upcoming releases.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {roadmap.map((item, index) => (

            <div
              key={index}
              className="group rounded-3xl border border-slate-800 bg-slate-950/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_20px_60px_rgba(59,130,246,0.18)]"
            >

              <div
                className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                {item.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-400">
                {item.description}
              </p>

              <span className="mt-8 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
                🚀 Launching Soon
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Roadmap;