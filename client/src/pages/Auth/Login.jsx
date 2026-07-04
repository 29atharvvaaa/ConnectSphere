import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../../api/authService";
function Login() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  email: "",
  password: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(formData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful!");

    navigate("/dashboard");
  } catch (error) {
    alert(
      error.response?.data?.message || "Login Failed"
    );
  }
};
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-16">

      {/* Background Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[180px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-10 shadow-[0_0_60px_rgba(59,130,246,0.15)]">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-slate-400">
            Login to continue to ConnectSphere.
          </p>

        </div>

<form
  onSubmit={handleSubmit}
  className="mt-10 space-y-6"
>
          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">

              <Mail className="text-slate-400" size={18} />

              <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
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
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="••••••••"
  className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-slate-500"
/>

            </div>

          </div>

          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-slate-400">

              <input
                type="checkbox"
                className="rounded border-slate-600 bg-slate-800"
              />

              Remember me

            </label>

            <button
              type="button"
              className="text-blue-400 hover:text-blue-300"
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
          >
            Login
          </button>

        </form>

        <p className="mt-8 text-center text-slate-400">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;