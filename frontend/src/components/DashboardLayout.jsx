import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">📚 Menu</h2>
        <nav>
          <NavLink to="/dashboard/courses" className="nav-item">
            Cours
          </NavLink>
          <NavLink to="/dashboard/enrollments" className="nav-item">
            Inscriptions
          </NavLink>
        </nav>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="dropdown" onClick={toggleDropdown}>
            <div className="dropdown-toggle">
              <span>{user?.username}</span>
              <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Déconnexion</button>
              </div>
            )}
          </div>
        </header>

        <section className="content">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
