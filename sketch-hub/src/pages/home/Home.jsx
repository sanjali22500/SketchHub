import React from "react";
import "./Home.css";
import Navbar from "../../component/Navbar";
import { Link, NavLink } from "react-router";
import Footer from "../../component/Footer/Footer";
import habout from "../../images/habout copy.jpg"
import Testimonials from "../../component/Testimonials/Testimonials";
import FeaturedSketches from "../../component/featured/FeaturedSketches";


export function Home() {
  return (
    <>
      <Navbar />

      {/* This is a hero section of the home page */}
      <div className="Home-container">
        <video className="login-vdo" muted autoPlay loop>
          <source src="gif-2.mp4" type="video/mp4" />
        </video>
        <div className="h-text">
          <p className="hero">
            SketchHub <br />
            Where Creativity Meets Opportunity!
          </p>
          <p>
            Join thousands of artists & start selling your artwork effortlessly.
            Upload, showcase, and monetize your sketches in just a few clicks!
          </p>

          {/* This is a CTA buttons */}
          <div className="cta-buttons">
            <NavLink to="/contact" className="btn btn-primary">
             Contact Us
            </NavLink>
            <NavLink to="/explore" className="btn btn-secondary">
              Art Gallery
            </NavLink>
          </div>
        </div>
      </div>
      {/* ABOUT of Home Page  */}
      <section className="sec-box">
        <div className="about_content">
          <div className="hleft">
            <img src={habout} alt="image" />
          </div>
          <div className="hright">
            <h1>About SketchHub</h1>
            <p>
              SketchHub is a creative digital platform designed to empower
              artists by providing a space to share, showcase, and sell their
              original sketches. Whether you're a budding artist or a seasoned
              illustrator, SketchHub connects your passion with an audience that
              truly values handcrafted art. Founded with a mission to support
              authentic expression and artistic entrepreneurship, SketchHub is
              more than just a marketplace—it's a community for sketch lovers,
              where creativity thrives and talent finds its spotlight.
            </p>
            <div className="cta-buttons about_btn">
              <NavLink to="/about" className="btn btn-primary">
                READ MORE
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="art-work-sec">
          <h1>Featured Products</h1>
          <p>
            Explore a handpicked collection of stunning sketches, each crafted
            with precision and passion by <br /> our community of talented artists.
            From intricate pencil work to expressive ink illustrations, every
            piece on <br /> SketchHub reflects unique creativity and artistic
            excellence. 
          </p>
        </div>
      </section>
      <FeaturedSketches/>
      <Testimonials/>
      <Footer/>
    </>
  );
}
