import React, { useState } from "react";
import "./Contact.css";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    subject: "",
    review: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/project_6BCA/server/mail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response from PHP:", data);
        if (data.status === "success") {
          alert("Message sent successfully!");
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            number: "",
            subject: "",
            review: "",
          });
        } else {
          alert("Failed to send message. Error: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="contact_main">
        
        <div className="contact_container">
          <div className="contact-header">
          </div>
          <div className="form-text">
  {/* New Heading */}
  <h2 className="form-main-heading">Contact Us</h2> 

  <form onSubmit={handleSubmit}>
    {/* First Name and Last Name in one row */}
    <div className="input-row">
      <div className="input-group">
        <label className="contact-label">FIRST NAME</label>
        <input
          placeholder="First name"
          type="text"
          name="first_name"
          value={formData.first_name}
          required
          onChange={handleChange}
          className="contact-input"
        />
      </div>

      <div className="input-group">
        <label className="contact-label">LAST NAME</label>
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          className="contact-input"
          value={formData.last_name}
          required
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Email and Number in one row */}
    <div className="input-row">
      <div className="input-group">
        <label className="contact-label">EMAIL</label>
        <input
          className="contact-input"
          type="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
          placeholder="your@email.com"
        />
      </div>

      <div className="input-group">
        <label className="contact-label">NUMBER</label>
        <input
          className="contact-input"
          type="tel"
          name="number"
          value={formData.number}
          required
          onChange={handleChange}
          placeholder="Contact number"
        />
      </div>
    </div>

    {/* Subject */}
    <div className="single-input">
      <label className="contact-label">SUBJECT</label>
      <input
        className="contact-input"
        type="text"
        name="subject"
        value={formData.subject}
        required
        onChange={handleChange}
        placeholder="Subject"
      />
    </div>

    {/* Message */}
    <div className="single-input">
      <label className="contact-label">MESSAGE</label>
      <textarea
        name="review"
        className="review-input"
        value={formData.review}
        onChange={handleChange}
        placeholder="Write your message"
      ></textarea>
    </div>

    {/* Buttons */}
    <div className="contact-btn">
      <button className="btns" type="reset">BACK</button>
      <button className="btns" type="submit">SUBMIT</button>
      <button
        className="btns"
        type="button"
        onClick={() =>
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            number: "",
            subject: "",
            review: "",
          })
        }
      >
        RESET
      </button>
    </div>
  </form>
</div>

        </div>
      </div>
      <Footer/>
    </>
  );
}