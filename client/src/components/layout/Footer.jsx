import {
  Globe,
  User,
  Mail,
} from "lucide-react";
function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">

          <div>
            <h2 className="text-3xl font-bold text-blue-500">
              ConnectSphere
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              Helping students connect, collaborate, build real-world projects,
              and prepare for successful careers.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Platform
            </h3>

            <ul className="space-y-4 text-slate-400">
              <li>Projects</li>
              <li>Dashboard</li>
              <li>Internships</li>
              <li>Team Matching</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-4 text-slate-400">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Connect
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-slate-400">
  <Globe size={20} />
  GitHub
</div>

<div className="flex items-center gap-3 text-slate-400">
  <User size={20} />
  Instagram
</div>

              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={20} />
                support@connectsphere.com
              </div>

            </div>
          </div>

        </div>

        <div className="my-12 h-px bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>© 2026 ConnectSphere. All rights reserved.</p>

          <div className="flex gap-6">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;