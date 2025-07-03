import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Navbar from "../../component/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const user_id = sessionStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_id) {
      alert("Please log in first");
      return;
    }
    fetchCartItems();
  }, [user_id]);

  const fetchCartItems = () => {
    axios
      .get(
        `http://localhost/project_6BCA/server/get_cart_items.php?user_id=${user_id}`
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCartItems(response.data);
          calculateTotal(response.data);
        } else {
          console.error("Invalid cart data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items", error);
      });
  };

  const handleIncreaseQuantity = (cartId, currentQuantity, stock) => {
    if (currentQuantity < stock) {
      const newQuantity = currentQuantity + 1;
      updateQuantity(cartId, newQuantity);
    }
  };
  
  const handleDecreaseQuantity = (cartId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(cartId, newQuantity);
    }
  };
  
  const updateQuantity = (cartId, newQuantity) => {
    axios
      .post("http://localhost/project_6BCA/server/update_cart_quantity.php", {
        cart_id: cartId,
        quantity: newQuantity,
      })
      .then((response) => {
        if (response.data.success) {
          const updatedItems = cartItems.map((item) =>
            item.cart_id === cartId ? { ...item, quantity: newQuantity } : item
          );
          setCartItems(updatedItems);
          calculateTotal(updatedItems);
        } else {
          alert("Failed to update quantity.");
        }
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
        alert("An error occurred. Please try again.");
      });
  };
  

  const calculateTotal = (items) => {
    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    setTotal(totalAmount);
  };

  const handleRemove = (cartId) => {
    axios
      .post("http://localhost/project_6BCA/server/remove_cart_item.php", {
        cart_id: cartId,
      })
      .then((response) => {
        if (response.data.success) {
          alert("Item removed from cart!");
          const updatedItems = cartItems.filter(
            (item) => item.cart_id !== cartId
          );
          setCartItems(updatedItems);
          calculateTotal(updatedItems);
        } else {
          alert("Failed to remove item.");
        }
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const handleContinueOrder = () => {
    navigate("/orderpayment", { state: { total } });
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div className="cart-card" key={index}>
                <img
                  src={`http://localhost/project_6BCA/server/${item.image_path}`}
                  alt={item.image_name || "Image"}
                  className="cart-item-img"
                />
                <div className="cart-info">
                  <h4>{item.image_name || "Unnamed Image"}</h4>
                  <p>Price: ₹{item.price}</p>
                  <p className="discount-price">Discounted: ₹{item.disc_price}</p>
                  <div className="quantity-control">
                    <button
                      className={`quantity-btn ${
                        item.quantity <= 1 ? "disabled" : ""
                      }`}
                      onClick={() =>
                        handleDecreaseQuantity(item.cart_id, item.quantity)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className={`quantity-btn ${
                        item.quantity >= item.stock ? "disabled" : ""
                      }`}
                      onClick={() =>
                        handleIncreaseQuantity(
                          item.cart_id,
                          item.quantity,
                          item.stock
                        )
                      }
                      disabled={item.quantity >= item.stock}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  <button
                    className="remove-cart-btn"
                    onClick={() => handleRemove(item.cart_id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Remove from Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
        </div>

        <div className="cart-total-card">
          <div className="cart-total-info">
            <h3>Cart Total</h3>
            <div className="cart-total-details">
              <p>Subtotal: ₹{total}</p>
              <p>You save: ₹{total * 0.2}</p>
              <p>Offer: ₹0</p>
              <p>Total (Incl. taxes): ₹{total}</p>
            </div>
          </div>
          <button className="order-payment-btn" onClick={handleContinueOrder}>
            Continue Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
