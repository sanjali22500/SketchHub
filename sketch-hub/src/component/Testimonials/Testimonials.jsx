import React from "react";
import "./Testimonials.css";
export default function Testimonials() {
  const testimonials = [
    {
      name: "Aarav Kapoor",
      role: "Sketch Artist",
      quote:
        "SketchHub helped me showcase my art and gain real clients for commissions. The exposure has been amazing!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Meera Joshi",
      role: "Digital Illustrator",
      quote:
        "I love the platform! Uploading and selling sketches is super easy, and the community is very supportive.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rohan Mehta",
      role: "Freelance Artist",
      quote:
        "Their tools for building an online portfolio saved me a lot of time. It's a great place to grow as an artist.",
      img: "https://randomuser.me/api/portraits/men/54.jpg",
    },
  ];

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">
        What <span>Artists Say</span> About SketchHub
      </h2>
      <div className="testimonials-container">
        {testimonials.map((item, index) => (
          <div className="testimonial-card fade-in" key={index}>
            <img src={item.img} alt={item.name} className="testimonial-img" />
            <h3>{item.name}</h3>
            <p className="role">{item.role}</p>
            <p className="quote">"{item.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
