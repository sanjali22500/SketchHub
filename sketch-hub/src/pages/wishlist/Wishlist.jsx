import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Wishlist.css";
import Navbar from "../../component/Navbar";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const user_id = sessionStorage.getItem("user_id");

  useEffect(() => {
    if (!user_id) {
      alert("Please log in first");
      return;
    }
    fetchWishlistItems();
  }, [user_id]);

  const fetchWishlistItems = () => {
    axios
      .get(`http://localhost/project_6BCA/server/get_wishlist_items.php?user_id=${user_id}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setWishlistItems(response.data);
        } else {
          console.error("Invalid wishlist data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching wishlist items", error);
      });
  };

  const handleRemoveFromWishlist = (productId) => {
    const user_id = sessionStorage.getItem("user_id"); // Ensure user_id is being fetched correctly from sessionStorage
    
    // Send the DELETE request to remove the item
    axios
      .post(
        "http://localhost/project_6BCA/server/remove_from_wishlist.php",
        {
          product_id: productId,  // Send product_id
          user_id: user_id        // Send user_id
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((response) => {
        if (response.data.success) {
          alert("Item removed from wishlist.");
          setWishlistItems(wishlistItems.filter((item) => item.product_id !== productId));  // Remove from UI as well
        } else {
          alert("Failed to remove item from wishlist.");
        }
      })
      .catch((error) => {
        console.error("Error removing item from wishlist", error);
        alert("An error occurred while removing the item.");
      });
  };
  

  const handleBuyNow = (item) => {
    // Here, you can handle the "Buy Now" logic. It can navigate to a purchase page or directly add to cart.
    // Example: Just adding to cart and redirecting to cart page.
    const cartData = {
      user_id: user_id,
      product_id: item.product_id,
      quantity: 1,
    };

    axios
      .post("http://localhost/project_6BCA/server/add_to_cart.php", cartData)
      .then((response) => {
        if (response.data.success) {
          alert("Item added to cart, redirecting to cart.");
          // Redirect to the cart page
          window.location.href = "/cart";
        } else {
          alert("Failed to add item to cart.");
        }
      })
      .catch((error) => {
        console.error("Error adding item to cart", error);
        alert("There was an error adding the item to your cart.");
      });
  };

  return (
    <>
    <Navbar/>
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item, index) => (
            <div className="wishlist-card" key={index}>
              <img
                src={`http://localhost/project_6BCA/server/${item.image_path}`}
                alt={item.image_name || "Image"}
                className="wishlist-item-img"
              />
              <div className="wishlist-info">
                <h4>{item.image_name || "Unnamed Image"}</h4>
                <p>Price: ₹{item.price}</p>
                <p>Discounted Price: ₹{item.disc_price}</p>
                <button
                  className="remove-wishlist-btn"
                  onClick={() => handleRemoveFromWishlist(item.product_id)}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button
                  className="buy-now-btn"
                  onClick={() => handleBuyNow(item)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in wishlist.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Wishlist;
