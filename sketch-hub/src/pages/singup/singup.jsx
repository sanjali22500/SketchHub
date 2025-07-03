import React, { useState } from "react";
import logoblack from "../../images/black_logo.png";
import "./singup.css"; // Ensure styles are applied
import { useNavigate } from "react-router-dom"; // ✅ Redirect ke liye
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icons
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Arrow Left icon

export default function Singup() {
  const [user, setUser] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const navigate = useNavigate(); // ✅ Hook for redirect

  const handleSignup = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost/project_6BCA/server/singup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(user),
      });

      const text = await res.text(); // 🟡 JSON se pehle text lo
      try {
        const data = JSON.parse(text); // ✅ Safe parsing
        if (data.status === "success") {
          alert("Signup Successful!");
          navigate("/login"); // ✅ Redirect to login page
        } else {
          alert("Signup Failed: " + data.message);
        }
      } catch (jsonError) {
        console.error("Not valid JSON:", text); // 💥 Invalid JSON text print hoga
        alert("Server error, check console");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong!");
    }
  };

  // Function to handle the back button click
  const handleBackClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="singup-container">
      {/* Back Button */}
      <button className="back-btn" onClick={handleBackClick}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>

      <img className="blacklogo" src={logoblack} alt="" />
      <h2 className="singup-title">Sign up to SketchHub</h2>
      <form className="form2" method="post" onSubmit={handleSignup}>
        <div className="input_box">
          <div className="input-field">
            <label htmlFor="">USER NAME</label>
            <input className="login-input" type="text" placeholder="Username" 
              onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))} required />
          </div>
          <div className="input-field">
            <label htmlFor="">Email</label>
            <input className="login-input" type="email" placeholder="email@example.com" 
              onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} required />
          </div>
        </div>

        <div className="input_box">
          <div className="input-field">
            <label htmlFor="">Phone No.</label>
            <input className="login-input" type="tel" placeholder="+91" 
              onChange={(e) => setUser((prev) => ({ ...prev, phone: e.target.value }))} required />
          </div>
          <div className="input-field">
            <label htmlFor="">Password</label>
            <input className="login-input" type="password" placeholder="Password" 
              onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} required />
          </div>
        </div>

        <div className="input_box">
          <div className="input-field">
            <label htmlFor="">Confirm Password</label>
            <input className="login-input" type="password" placeholder="Confirm Password" 
              onChange={(e) => setUser((prev) => ({ ...prev, confirmPassword: e.target.value }))} required />
          </div>
          <div className="sbtn">
            <div className="input-field">
              <button className="singup" type="submit">SIGN UP</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
