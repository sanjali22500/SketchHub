import React, { useEffect, useState } from "react";
import "./Login.css";
import logoblack from "../../images/black_logo.png";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // On page load, check if user is logged in
    const userId = sessionStorage.getItem("user_id");
    const role = sessionStorage.getItem("role");

    // Redirect only if logged-in user is NOT admin
    if (userId && role !== "admin") {
      navigate("/userdashboard"); // Redirect to user dashboard only
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await fetch(
        "http://localhost/project_6BCA/server/login.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await res.text();
      console.log("Raw Response:", text);

      try {
        const data = JSON.parse(text);

        if (data.status === "success" && data.user && data.role !== "admin") {
          sessionStorage.setItem("user_id", data.user.id);
          sessionStorage.setItem("profile_pic", data.user.profile_pic);
          sessionStorage.setItem("role", data.role);
          sessionStorage.setItem("name", data.user.name);
          sessionStorage.setItem("user", JSON.stringify(data.user));

          alert("Login Successful!");
          navigate(data.redirect);

          setEmail("");
          setPassword("");
        } else if (data.role === "admin") {
          alert("Admin users must login from the admin login page.");
        } else {
          alert(data.message || "Invalid credentials.");
        }
      } catch (jsonError) {
        console.error("Response is not valid JSON:", text);
        alert("Unexpected server response! Check console for details.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to connect to server.");
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <button className="back-btn" onClick={handleBackClick}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>

      <img className="blacklogo" src={logoblack} alt="SketchHub Logo" />
      <h2 className="Login-title">Log into SketchHub</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input_box">
          <label>EMAIL ADDRESS</label>
          <br />
          <input
            className="login-input"
            type="text"
            name="email"
            placeholder="name@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="input_box">
          <label>PASSWORD</label>
          <br />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" className="login new-account">
          LOG IN
        </button>
      </form>
    </div>
  );
};
