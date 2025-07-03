import React, { useEffect } from "react";
import "./services.css";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer/Footer";

export default function Services() {
  useEffect(() => {
    // Trigger animations
    const elements = document.querySelectorAll(".fade-in-up");
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add("visible");
    });
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {/* Hero Section */}
        <section className="services-hero fade-in-up">
          <h1>Explore Our Services</h1>
          <p>
            Empowering artists to showcase, sell, and thrive with their art.
          </p>
          <a href="/explore" className="cta-button">
            Get Started
          </a>
        </section>

        {/* Services Overview Section with Cards */}
        <section className="services-overview fade-in-up">
          <h2 className="services-h2">What We Offer</h2>
          <div className="services-cards-container">
            {[
              {
                title: "Upload & Showcase",
                desc: "Upload and display your sketches to a global audience with ease.",
              },
              {
                title: "Sell Your Art",
                desc: "List your artwork for sale and earn through secure payments.",
              },
              {
                title: "Commission Requests",
                desc: "Collaborate with customers and accept custom artwork commissions.",
              },
              {
                title: "Artist Portfolio",
                desc: "Create your personal artist profile and build a unique brand online.",
              },
              {
                title: "Community Support",
                desc: "Join an active artist community and receive feedback and support.",
              },
            ].map((item, i) => (
              <div className="service-card fade-in-up" key={i}>
                <h3 className="services-h3">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us fade-in-up">
          <h2 className="services-h2">Why Choose SketchHub?</h2>
          <ul>
            <li>Zero Commission on First Sale</li>
            <li>Secure and Easy Transactions</li>
            <li>Global Reach for Your Art</li>
            <li>Dedicated Artist Support</li>
            <li>Portfolio and Analytics Tools</li>
          </ul>
        </section>

        {/* FAQs Section */}
        <section className="faqs fade-in-up">
          <h2>Frequently Asked Questions</h2>
          <details>
            <summary>How do I upload my sketches?</summary>
            <p>Sign in and use the "Upload Art" button on your dashboard.</p>
          </details>
          <details>
            <summary>How do I get paid for my sales?</summary>
            <p>
              We use a secure payment gateway. Payments are sent to your linked
              account.
            </p>
          </details>
          <details>
            <summary>Can I update my portfolio?</summary>
            <p>
              Yes, go to your profile and easily add or remove artworks anytime.
            </p>
          </details>
        </section>
      </div>
      <Footer />
    </>
  );
}
