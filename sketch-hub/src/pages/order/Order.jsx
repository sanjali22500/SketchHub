import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import myqr from "../../images/myqr.jpg";

const Order = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [txnId, setTxnId] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { state } = useLocation();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("user_id");
    if (storedUserId) setUserId(parseInt(storedUserId));
    else console.error("User ID not found in sessionStorage");

    if (state?.product && state?.totalAmount) {
      // Store product_id and total in state variables
      setProduct(state.product);
      setProductId(state.product.id);
      setTotalAmount(state.totalAmount);
      setQuantity(state.quantity || 1);
    } else {
      console.error("Product or amount missing from location state");
    }
  }, [state]);

  useEffect(() => {
    if (paymentMethod === "COD") {
      setTxnId("N/A");
    } else {
      setTxnId("");
    }
  }, [paymentMethod]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId || !productId || !totalAmount || !paymentMethod || !txnId) {
      alert("❌ One or more required fields are empty.");
      return;
    }

    if (paymentMethod === "UPI" && txnId.trim() === "") {
      alert("❌ Please enter a valid transaction ID for UPI.");
      return;
    }

    if (paymentMethod === "COD" && txnId.toLowerCase() !== "n/a") {
      alert("❌ Please enter 'N/A' for COD.");
      return;
    }

    setIsLoading(true);

    axios
      .post("http://localhost/project_6BCA/server/place_order.php", {
        user_id: userId,
        product_id: productId,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        txn_id: txnId,
      })
      .then((res) => {
        if (res.data.success) {
          setSuccessMsg("✅ Order placed successfully!");
          setTxnId("");
          setTimeout(() => {
            navigate("/orderhistory"); // Redirect after a short delay
          }, 1500); // Optional delay to show success message briefly
        } else {
          setSuccessMsg("❌ Failed to place order.");
        }
        
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setSuccessMsg("❌ An error occurred while placing the order.");
        setIsLoading(false);
      });
  };

  return (
    <div className="order-form-container">
      <h2>Place Your Order 🛒</h2>

      {product ? (
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-item">
            <img
              src={`http://localhost/project_6BCA/server/${product.path}`}
              alt={product.name}
              className="order-item-img"
            />
            <div className="order-item-details">
              <h4>{product.name}</h4>
              <p>Price: ₹{product.disc_price}</p>
              <p>Quantity: {quantity}</p>
              <p>Total: ₹{totalAmount}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No item selected.</p>
      )}

      <form className="order-form" onSubmit={handleSubmit}>
        {/* Total Amount */}
        <label>Total Amount</label>
        <input
          type="text"
          value={totalAmount !== null ? `₹${totalAmount}` : "Loading..."}
          disabled
        />

        {/* Payment Method */}
        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="UPI">Scan the QR (UPI)</option>
          <option value="COD">Cash on Delivery</option>
        </select>

        {/* QR Image */}
        {paymentMethod === "UPI" && (
          <div className="qr-section">
            <label>Scan & Pay</label>
            <img src={myqr} alt="Payment QR" className="qr-image" />
          </div>
        )}

        {/* Transaction ID */}
        <label>Transaction ID</label>
        <input
          type="text"
          placeholder="Enter txn ID or N/A for COD"
          value={txnId}
          onChange={(e) => setTxnId(e.target.value)}
        />

        {/* Submit Button */}
        <button type="submit" className="order-btn" disabled={isLoading}>
          {isLoading ? "Placing Order..." : "Place Order"}
        </button>

        {successMsg && <p className="order-message">{successMsg}</p>}
      </form>
    </div>
  );
};

export default Order;
