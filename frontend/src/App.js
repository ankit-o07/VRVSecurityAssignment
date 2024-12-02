import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from "react-toastify";

import RefreshHandler from './Helper/RefreshHandler';
import Error404 from './Helper/Error404';

import './App.css';

import GuestUser from './Pages/GuestUser';

import Login from './Pages/Login';
import Register from './Pages/Registration';

import Home from './Pages/Home';
import CreatePost from './Components/Posts/CreatePost';
import EditPost from './Components/Posts/EditPost';
import PostDetails from './Components/Posts/PostDetails';
import UserDashboard from './Components/User/Dashboard';

import ModeratorDashBoard from './Components/Moderator/DashBoard';
import AdminDashboard from './Components/Admin/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Private route wrapper
  const PrivatesRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  // Moderator route wrapper
  const ModeratorRoute = ({ element }) => {
    const role = localStorage.getItem("role");
    return role === "Moderator" ? element : <Navigate to="/home" />;
  };

  // Admin route wrapper
  const AdminRoute = ({ element }) => {
    const role = localStorage.getItem("role");
    return role === "Admin" ? element : <Navigate to="/home" />;
  };

  return (
    <div className="App">
      {/* Handles refresh to maintain authentication state */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        {/* Public Route: Guest User */}
        <Route path="/" element={<PrivatesRoute element={<GuestUser />} />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes: Common User */}
        <Route path="/home" element={<PrivatesRoute element={<Home />} />} />
        <Route
          path="/user/create"
          element={<PrivatesRoute element={<CreatePost />} />}
        />
        <Route
          path="/user/edit/:id"
          element={<PrivatesRoute element={<EditPost />} />}
        />
        <Route path="/user/post/:id" element={<PostDetails />} />
        <Route
          path="/user/dashboard"
          element={<PrivatesRoute element={<UserDashboard />} />}
        />

        {/* Private Routes: Moderator */}
        <Route
          path="/moderator/dashboard"
          element={<ModeratorRoute element={<ModeratorDashBoard />} />}
        />

        {/* Private Routes: Admin */}
        <Route
          path="/admin/dashboard"
          element={<AdminRoute element={<AdminDashboard />} />}
        />

        {/* Fallback Route: 404 Error */}
        <Route path="*" element={<Error404 />} />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
