import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./fetch_images.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object to read URL params

  // Fetch images from API
  useEffect(() => {
    axios
      .get("http://localhost/project_6BCA/server/fetch_images.php")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setImages(response.data);
          setFilteredImages(response.data); // Initially show all images
          const initialQuantities = {};
          response.data.forEach((img) => {
            initialQuantities[img.id] = 1;
          });
          setQuantities(initialQuantities);
        } else {
          console.error("Data is not an array", response.data);
          setImages([]);
        }
      })
      .catch((error) => console.error("API Error:", error));
  }, []);

  // Filter images based on search query in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q") || ""; // Get query parameter `q` from the URL
    if (query.trim()) {
      // Filter images based on the query
      const filtered = images.filter((img) =>
        img.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredImages(filtered);
    } else {
      setFilteredImages(images); // If no query, show all images
    }
  }, [location.search, images]); // Re-run when search query changes or images change

  // Handle adding to cart
  const handleAddToCart = (img) => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      alert("Please log in to add items to the cart.");
      return;
    }

    const cartData = {
      user_id: user_id,
      product_id: img.id,
      quantity: quantities[img.id] || 1,
    };

    axios
      .post("http://localhost/project_6BCA/server/add_to_cart.php", cartData)
      .then((response) => {
        if (response.data.success) {
          setCart((prevCart) => [...prevCart, img]);
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

  // Handle adding to wishlist
  const handleAddToWishlist = (img) => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      alert("Please log in to add items to the wishlist.");
      return;
    }

    const wishlistData = {
      user_id: user_id,
      product_id: img.id,
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
          console.error("Failed to add item to wishlist:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding to wishlist:", error);
        alert("There was an error adding the item to your wishlist.");
      });
  };

  // Quantity increase
  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // Quantity decrease
  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  // Buy Now functionality
  const handleBuyNow = (img) => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      alert("Please log in to buy this item.");
      return;
    }
  
    const quantity = quantities[img.id] || 1;
    const totalAmount = img.disc_price * quantity; // Calculate total price
  
    // Redirect to the Order page with product details
    navigate("/order", {
      state: {
        product: img,
        quantity: quantity,
        totalAmount: totalAmount,
      },
    });
  };

  return (
    <div className="cards-section">
      {filteredImages.map((img, index) => (
        <div
          key={img.id}
          className="enhanced-art-card"
          style={{ "--i": index }}
        >
          <div className="enhanced-img-container">
            <img
              src={`http://localhost/project_6BCA/server/${img.path}`}
              alt={img.name}
              className="enhanced-art-img"
            />
          </div>

          <div className="enhanced-details">
            <h3>{img.name || "Image Title"}</h3>
            <p className="enhanced-price">
              <span className="enhanced-old-price">₹{img.price || 500}</span>
              <span className="enhanced-new-price">
                ₹{img.disc_price || 300}
              </span>
            </p>

            {/* Quantity Controls */}
            <div className="quantity-controls">
              <button className="qty-btn" onClick={() => decreaseQty(img.id)}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className="qty-number">{quantities[img.id] || 1}</span>
              <button className="qty-btn" onClick={() => increaseQty(img.id)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="enhanced-buttons">
              <button
                className="btn-purple icon"
                onClick={() => handleAddToCart(img)}
              >
                <FontAwesomeIcon className="cart-icon" icon={faCartPlus} />
              </button>
              <button
                className="btn-purple icon"
                onClick={() => handleAddToWishlist(img)}
              >
                <FontAwesomeIcon className="wishlist-icon" icon={faHeart} />
              </button>
              <button className="btn-purple" onClick={() => handleBuyNow(img)}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
