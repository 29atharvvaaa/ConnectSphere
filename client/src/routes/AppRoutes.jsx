import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Projects from "../pages/Projects/Projects";
import ProjectDetails from "../pages/Projects/ProjectDetails";
import Jobs from "../pages/Jobs/Jobs";
import EditProfile from "../pages/Profile/EditProfile";
import MyProjects from "../pages/Projects/MyProjects";
import MyJobs from "../pages/Jobs/MyJobs";

import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        {/* My Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Public User Profile */}
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;