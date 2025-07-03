import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons"; // Import settings icon
import "./UserSidebar.css"; // Import the CSS for styling

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate(); // Hook to navigate programmatically

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar open/close
  };

  const handleLogout = () => {
    // Clear user session, token, or any stored data
    localStorage.removeItem("userToken"); // Clear token from local storage
    sessionStorage.clear(); // Clear sessionStorage if used

    // Redirect user to the login page
    navigate("/login");
  };

  return (
    <div>
      {/* Settings Icon for Small Screens */}
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faCog} /> {/* Replaced hamburger with settings icon */}
      </div>

      {/* Sidebar */}
      <div className={`user-sidebar ${isOpen ? "user-sidebar-active" : ""}`}>
        <div className="user-sidebar-content">
          <h3 className="user-sidebar-header">User Dashboard</h3>
          <nav className="user-sidebar-nav">
            <ul>
              <li>
                <NavLink
                  to="/userdashboard" // Correct link to User Profile
                  className={({ isActive }) => isActive ? "user-sidebar-active-link" : ""}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orderhistory" // Correct link to Orders
                  className={({ isActive }) => isActive ? "user-sidebar-active-link" : ""}
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upload" // Correct link to Upload
                  className={({ isActive }) => isActive ? "user-sidebar-active-link" : ""}
                >
                  Uploads
                </NavLink>
              </li>
              {/* Logout Button */}
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
