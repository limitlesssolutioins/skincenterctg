import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../firebase/AuthContext';
import { FaHome, FaBox, FaStethoscope, FaNewspaper, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import './dashboard.css';

const DashboardLayout = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>SkinCenter Admin</h3>
          <p className="user-email">{currentUser?.email}</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaBox /> Productos
          </NavLink>
          <NavLink to="/admin/services" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaStethoscope /> Servicios
          </NavLink>
          <NavLink to="/admin/blog" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaNewspaper /> Blog
          </NavLink>
          <NavLink to="/admin/team" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaUsers /> Equipo
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
