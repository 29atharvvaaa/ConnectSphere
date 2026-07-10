import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Plus } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const active = "text-blue-400 font-semibold";
  const normal = "text-slate-300 hover:text-blue-400 transition";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900 shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-500"
        >
          ConnectSphere
        </Link>

        {/* Navigation */}
        <div className="hidden gap-8 md:flex">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? active : normal)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? active : normal)}
          >
            Projects
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) => (isActive ? active : normal)}
          >
            Jobs
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Post Internship Button */}
          <button
            className="hidden items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500 md:flex"
          >
            <Plus size={18} />
            Post Internship
          </button>

          {/* User */}
          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-800"
          >
            <div className="hidden text-right md:block">
              <p className="font-bold text-white">
                {user?.name}
              </p>

              <p className="text-sm text-slate-300">
                {user?.role}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </Link>

          <button
            onClick={logout}
            className="rounded-lg bg-red-600 p-2 transition hover:bg-red-700"
          >
            <LogOut size={18} />
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;