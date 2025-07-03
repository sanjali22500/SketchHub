import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo2 from ".././images/logo-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminSidebar() {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    // Clear tokens from sessionStorage
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("userToken");  // in case you use this elsewhere
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("name");

    navigate("/adminlogin");
  };

  return (
    <div>
      <div className="sidebar">
        <div className="admin-nav">
          <h1>Welcome Admin</h1>
          <button onClick={handleLogout} className="logout-btn">
            <FontAwesomeIcon className="logout-icon" icon={faArrowRightFromBracket} />
            Logout
          </button>
        </div>
        <div className="admin-logo">
          <img src={logo2} alt="SketchHub Logo" />
          <h1>
            SketchHub <br /> Admin
          </h1>
        </div>
        <ul>
          <li className={activeLink === "dashboard" ? "active" : ""}>
            <Link
              to="/admindashboard"
              onClick={() => handleSetActive("dashboard")}
            >
              Dashboard
            </Link>
          </li>
          <li className={activeLink === "users" ? "active" : ""}>
            <Link to="/manageusers" onClick={() => handleSetActive("users")}>
              Users
            </Link>
          </li>
          <li className={activeLink === "product" ? "active" : ""}>
            <Link to="/adminproduct" onClick={() => handleSetActive("product")}>
              Product
            </Link>
          </li>
          <li className={activeLink === "carts" ? "active" : ""}>
            <Link to="/admincart" onClick={() => handleSetActive("carts")}>
              Carts
            </Link>
          </li>
          <li className={activeLink === "wishlist" ? "active" : ""}>
            <Link
              to="/adminwishlist"
              onClick={() => handleSetActive("wishlist")}
            >
              Wishlist
            </Link>
          </li>
          <li className={activeLink === "orders" ? "active" : ""}>
            <Link to="/adminorder" onClick={() => handleSetActive("orders")}>
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
