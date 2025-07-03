import React from "react";
import "./Explore.css";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import ImageGallery from "../fetch_images";

export default function Explore() {
  return (

    <> <Navbar/>
    <div className="explore-container">
      <div className="explore-title">
        <h1>Our Gallery</h1>
      </div>
    </div>
    <ImageGallery/>
    <Footer/>
    </>
  );
}
