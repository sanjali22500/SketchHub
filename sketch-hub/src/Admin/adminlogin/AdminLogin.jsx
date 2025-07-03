import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If admin already logged in, redirect to dashboard
    const adminToken = sessionStorage.getItem("adminToken");
    if (adminToken === "true") {
      navigate("/admindashboard");
    }
  }, [navigate]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await fetch(
        "http://localhost/project_6BCA/server/login.php", // <-- changed to unified login.php
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await res.text();
      console.log("Raw admin login response:", text); // For debugging

      try {
        const data = JSON.parse(text);

        if (data.status === "success" && data.role === "admin") {
          sessionStorage.setItem("adminToken", "true");
          sessionStorage.setItem("user_id", data.user.id);
          sessionStorage.setItem("name", data.user.name);
          alert("Admin login successful!");
          navigate("/admindashboard");

          // Clear inputs
          setEmail("");
          setPassword("");
        } else {
          alert(data.message || "Invalid admin credentials or not an admin.");
        }
      } catch (jsonError) {
        console.error("Admin login response is not valid JSON:", text);
        alert("Unexpected server response! Check console.");
      }
    } catch (error) {
      console.error("Network error during admin login:", error);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="adminlogin-container">
      <div className="adminlogin-box">
        <h2 className="adminlogin-title">Admin Login</h2>
        <form className="adminlogin-form" onSubmit={handleAdminLogin}>
          <input
            className="adminlogin-input"
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="adminlogin-input"
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="adminlogin-btn" type="submit">
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
