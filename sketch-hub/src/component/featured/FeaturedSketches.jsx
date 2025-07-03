import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeaturedSketches.css";
import {
  faCartPlus,
  faHeart,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const FeaturedSketches = () => {
  const [sketches, setSketches] = useState([]);
  const [quantities, setQuantities] = useState({}); // Track quantity for each sketch
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          "http://localhost/project_6BCA/server/get_featured_sketches.php"
        );
        if (Array.isArray(res.data)) {
          setSketches(res.data);
          const initialQuantities = {};
          res.data.forEach((sketch) => {
            initialQuantities[sketch.id] = 1;
          });
          setQuantities(initialQuantities); // Initialize quantities to 1
        } else {
          console.error("No featured sketches found.");
        }
      } catch (err) {
        console.error("Error fetching featured sketches:", err);
      }
    };

    fetchFeatured();
  }, []);

  // Add to Cart function
  const handleAddToCart = (sketch) => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      alert("Please log in to add items to the cart.");
      return;
    }

    const cartData = {
      user_id: user_id,
      product_id: sketch.id,
      quantity: quantities[sketch.id] || 1,
    };

    axios
      .post("http://localhost/project_6BCA/server/add_to_cart.php", cartData)
      .then((response) => {
        if (response.data.success) {
          alert("Item added to cart!");
          navigate("/cart");
        } else {
          console.error("Failed to add item to cart:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("There was an error adding the item to your cart.");
      });
  };

  // Add to Wishlist function
  const handleAddToWishlist = (sketch) => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      alert("Please log in to add items to the wishlist.");
      return;
    }

    const wishlistData = {
      user_id: user_id,
      product_id: sketch.id,
    };

    axios
      .post(
        "http://localhost/project_6BCA/server/add_to_wishlist.php",
        wishlistData
      )
      .then((response) => {
        if (response.data.success) {
          alert("Item added to wishlist!");
        } else {
          console.error(
            "Failed to add item to wishlist:",
            response.data.message
          );
        }
      })
      .catch((error) => {
        console.error("Error adding to wishlist:", error);
        alert("There was an error adding the item to your wishlist.");
      });
  };

  // Quantity increase function
  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // Quantity decrease function
  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  // Buy Now function
  const handleBuyNow = (sketch) => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      alert("Please log in to buy this item.");
      return;
    }

    const quantity = quantities[sketch.id] || 1;
    const totalAmount = sketch.disc_price * quantity;

    // Redirect to the Order page with product details
    navigate("/order", {
      state: {
        product: sketch,
        quantity: quantity,
        totalAmount: totalAmount,
      },
    });
  };

  return (
    <div className="featured-container">
      <h2 className="featured-title">🌟 Featured Sketches 🌟</h2>
      <div className="featured-grid">
        {sketches.length === 0 ? (
          <p className="no-featured">No featured sketches available.</p>
        ) : (
          sketches.map((sketch) => (
            <div className="featured-card" key={sketch.id}>
              <img
                src={`http://localhost/project_6BCA/server/${sketch.path}`}
                alt={sketch.name}
                className="featured-image"
              />
              <div className="sketch-details">
                <h3>{sketch.name}</h3>
                <p>
                  By: <strong>{sketch.uploader_name}</strong>
                </p>
                <p className="relprice">Price: ₹{sketch.price}</p>
                <p className="discounted">Discount: ₹{sketch.disc_price}</p>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQty(sketch.id)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="qty-number">
                    {quantities[sketch.id] || 1}
                  </span>
                  <button
                    className="qty-btn"
                    onClick={() => increaseQty(sketch.id)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button
                    className="btn-purple icon"
                    onClick={() => handleAddToCart(sketch)}
                  >
                    <FontAwesomeIcon className="cart-icon" icon={faCartPlus} />
                  </button>
                  <button
                    className="btn-purple icon"
                    onClick={() => handleAddToWishlist(sketch)}
                  >
                    <FontAwesomeIcon className="wishlist-icon" icon={faHeart} />
                  </button>
                  <button
                    className="btn-purple"
                    onClick={() => handleBuyNow(sketch)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedSketches;
