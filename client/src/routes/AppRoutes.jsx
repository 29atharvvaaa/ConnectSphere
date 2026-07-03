import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Projects from "../pages/Projects/Projects";
import Jobs from "../pages/Jobs/Jobs";
import EditProfile from "../pages/Profile/EditProfile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}

export default AppRoutes;