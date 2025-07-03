import React from "react";
import "./ArtCard.css";
import { ShoppingCart, Wallet } from "lucide-react";
import habout from "../images/habout.jpg"; // Replace with dynamic prop if needed

const ArtCard = ({ image, title, price, discountedPrice, isOnSale }) => {
  return (
    <section className="cards-section">
      <div className="enhanced-art-card">
        <div className="enhanced-img-container">
          <img src={habout} alt={title} className="enhanced-art-img" />
          {isOnSale && <span className="enhanced-sale-badge">SALE</span>}
          <div className="enhanced-overlay">
            <p>Click to view details</p>
          </div>
        </div>

        <div className="enhanced-details">
          <h3>{title || "Oil Painting"}</h3>
          <p className="enhanced-price">
            <span className="enhanced-old-price">₹{price || 500}</span>
            <span className="enhanced-new-price">
              ₹{discountedPrice || 300}
            </span>
          </p>

          <div className="enhanced-buttons">
            <button className="btn-purple">
              <ShoppingCart size={16} style={{ marginRight: "5px" }} />
              Add to Cart
            </button>
            <button className="btn-purple">
              <Wallet size={16} style={{ marginRight: "5px" }} />
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="enhanced-art-card">
        <div className="enhanced-img-container">
          <img src={habout} alt={title} className="enhanced-art-img" />
          {isOnSale && <span className="enhanced-sale-badge">SALE</span>}
          <div className="enhanced-overlay">
            <p>Click to view details</p>
          </div>
        </div>

        <div className="enhanced-details">
          <h3>{title || "Oil Painting"}</h3>
          <p className="enhanced-price">
            <span className="enhanced-old-price">₹{price || 500}</span>
            <span className="enhanced-new-price">
              ₹{discountedPrice || 300}
            </span>
          </p>

          <div className="enhanced-buttons">
            <button className="btn-purple">
              <ShoppingCart size={16} style={{ marginRight: "5px" }} />
              Add to Cart
            </button>
            <button className="btn-purple">
              <Wallet size={16} style={{ marginRight: "5px" }} />
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="enhanced-art-card">
        <div className="enhanced-img-container">
          <img src={habout} alt={title} className="enhanced-art-img" />
          {isOnSale && <span className="enhanced-sale-badge">SALE</span>}
          <div className="enhanced-overlay">
            <p>Click to view details</p>
          </div>
        </div>

        <div className="enhanced-details">
          <h3>{title || "Oil Painting"}</h3>
          <p className="enhanced-price">
            <span className="enhanced-old-price">₹{price || 500}</span>
            <span className="enhanced-new-price">
              ₹{discountedPrice || 300}
            </span>
          </p>

          <div className="enhanced-buttons">
            <button className="btn-purple">
              <ShoppingCart size={16} style={{ marginRight: "5px" }} />
              Add to Cart
            </button>
            <button className="btn-purple">
              <Wallet size={16} style={{ marginRight: "5px" }} />
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="enhanced-art-card">
        <div className="enhanced-img-container">
          <img src={habout} alt={title} className="enhanced-art-img" />
          {isOnSale && <span className="enhanced-sale-badge">SALE</span>}
          <div className="enhanced-overlay">
            <p>Click to view details</p>
          </div>
        </div>

        <div className="enhanced-details">
          <h3>{title || "Oil Painting"}</h3>
          <p className="enhanced-price">
            <span className="enhanced-old-price">₹{price || 500}</span>
            <span className="enhanced-new-price">
              ₹{discountedPrice || 300}
            </span>
          </p>

          <div className="enhanced-buttons">
            <button className="btn-purple">
              <ShoppingCart size={16} style={{ marginRight: "5px" }} />
              Add to Cart
            </button>
            <button className="btn-purple">
              <Wallet size={16} style={{ marginRight: "5px" }} />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtCard;
