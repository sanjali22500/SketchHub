import React, { useState, useEffect } from "react";
import "./CartOrder.css";
import myqr from "../../images/myqr.jpg"; // Assuming the QR image path
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios to send HTTP requests

const OrderPayment = () => {
  const location = useLocation();
  const { total, productId } = location.state || {}; // Get total and productId from state
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [txnId, setTxnId] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // For navigation to order history page

  // Update the txnId when the payment method is changed
  useEffect(() => {
    if (paymentMethod === "COD") {
      setTxnId("N/A"); // Set default txnId to "N/A" for COD
    } else {
      setTxnId(""); // Clear txnId for other payment methods
    }
  }, [paymentMethod]);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentMethod || !txnId) {
      alert("❌ Please provide the necessary information.");
      return;
    }

    // Show loading state while the request is being processed
    setIsLoading(true);

    const userId = sessionStorage.getItem("user_id");

    // Send the order details to the backend to store in the database
    axios
      .post("http://localhost/project_6BCA/server/place_order.php", {
        total_amount: total,
        payment_method: paymentMethod,
        txn_id: txnId,
        user_id: userId,
        product_id: productId, // Add product ID
      })
      .then((response) => {
        if (response.data.success) {
          setSuccessMsg("✅ Order placed successfully!");
          setErrorMsg("");
          
          // Reset form after successful order
          setPaymentMethod("UPI");
          setTxnId("");
          
          // Redirect to Order History page after successful order
          setTimeout(() => {
            navigate("/orderhistory");
          }, 1500); // Redirect after 1.5 seconds to allow the success message to be visible
        } else {
          setErrorMsg("❌ Failed to place order. Please try again.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setErrorMsg("❌ An error occurred while placing the order.");
        setIsLoading(false);
      });
  };

  return (
    <div className="order-payment-container">
      <h2>Place Your Order 🛒</h2>
      <form className="order-payment-form" onSubmit={handleSubmit}>
        <label htmlFor="totalAmount">Total Amount</label>
        <input
          type="text"
          id="totalAmount" // Ensure this id matches the label's 'for' attribute
          name="totalAmount"
          value={`₹${total}`}
          disabled
        />

        <label htmlFor="paymentMethod">Payment Method</label>
        <select
          id="paymentMethod" // Ensure this id matches the label's 'for' attribute
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="UPI">Scan the QR (UPI)</option>
          <option value="COD">Cash on Delivery</option>
        </select>

        {paymentMethod === "UPI" && (
          <div className="qr-section">
            <label htmlFor="qrImage">Scan & Pay</label>
            <img src={myqr} alt="Payment QR" className="qr-image" />
          </div>
        )}

        <label htmlFor="txnId">Transaction ID</label>
        <input
          type="text"
          id="txnId" // Ensure this id matches the label's 'for' attribute
          name="txnId"
          placeholder="Enter txn ID or N/A for COD"
          value={txnId}
          onChange={(e) => setTxnId(e.target.value)}
        />

        <button type="submit" className="order-payment-btn" disabled={isLoading}>
          {isLoading ? "Placing Order..." : "Place Order"}
        </button>

        {successMsg && <p className="order-payment-message success">{successMsg}</p>}
        {errorMsg && <p className="order-payment-message error">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default OrderPayment;
