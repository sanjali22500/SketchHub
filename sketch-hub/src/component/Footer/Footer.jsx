import React from 'react'
import "./Footer.css"

function Footer() {
  return (
    <>
     <footer className="sketchhub-footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-about">
          <h2>SketchHub</h2>
          <p>
            Your creative space to showcase, sell, and explore stunning sketches from artists all over the world. Where passion meets pixels.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/explore">Gallery</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@sketchhub.com</p>
          <p>Phone: +91-9876543210</p>
          <p>Address: Lucknow, Uttar Pradesh, India</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 SketchHub. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default Footer
