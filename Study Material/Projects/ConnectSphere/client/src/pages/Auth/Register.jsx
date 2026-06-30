import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

function Register() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-16">

      {/* Background Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[180px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-10 shadow-[0_0_60px_rgba(59,130,246,0.15)]">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-3 text-slate-400">
            Join ConnectSphere and start collaborating.
          </p>

        </div>

        <form className="mt-10 space-y-6">

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">

              <User className="text-slate-400" size={18} />

              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-slate-500"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">

              <Mail className="text-slate-400" size={18} />

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-slate-500"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">

              <Lock className="text-slate-400" size={18} />

              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-slate-500"
              />

            </div>

          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
          >
            Create Account
          </button>

        </form>

        <p className="mt-8 text-center text-slate-400">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;