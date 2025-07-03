import React from "react";
import "./About.css";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import habout from "../../images/habout.jpg";
import FeaturedSketches from "../featured/FeaturedSketches";

const About = () => {
  return (
    <>
      <Navbar />
      {/* HEADER */}
      <div className="about_container">
        <div className="about-title">
          <div className="about-box">
            <h1 className="au-title">About Us</h1>
            <p className="au-paira">
              Welcome to <span className="highlight">SketchHub</span>, where creativity meets community. Discover breathtaking sketches, connect with artists, and be inspired.
            </p>
          </div>
        </div>
      </div>
      

      {/* TESTIMONIALS */}
      <section className="sec-box">
        <div className="about-left">
          <h3>Testimonial</h3>
          <h1>What Our Awesome Customers Think</h1>
          <p>
            “SketchHub gave me the confidence to finally share my work with the
            world. The platform is super easy to use, and I made my first sale
            within a week!” — Aanya Mehra, Freelance Illustrator.
          </p>
        </div>

        <div className="testy">
          <h1>
            “Semper feugiat nibh sed pulvinar proin gravida. Non quam lacus
            suspendisse faucibus interdum.”
          </h1>
          <div className="testimonial-card">
            <img
              src={habout}
              alt="Norman Weaver"
              className="testimonial-card__image"
            />
            <div className="testimonial-card__info">
              <h3 className="testimonial-card__name">Norman Weaver</h3>
              <p className="testimonial-card__location">Syracuse, NY</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="create-section">
        <div className="create1">
          <h1>Your Imagination, Our Canvas</h1>
          <p>
            At SketchHub, every line tells a story. We are passionate about
            helping artists grow and empowering buyers to discover exclusive,
            heart-crafted art pieces that speak to them.
          </p>
        </div>

        <div className="create2">
          <h1>Why Choose Us?</h1>
          <ul>
            <li>🎨 Curated collection of hand-drawn art</li>
            <li>💼 Easy-to-use platform for creators & collectors</li>
            <li>🧾 Secure transactions & fast delivery</li>
            <li>🌍 Community-driven & artist-focused</li>
          </ul>
        </div>
      </section>
      

      <Footer />
    </>
  );
};

export default About;
