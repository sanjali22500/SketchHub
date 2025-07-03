import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderHistory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import UserSidebar from "../../component/UserSidebar";
import { useNavigate } from "react-router-dom"; // added for redirection

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // initialize navigation

  useEffect(() => {
    const loggedInUserId = sessionStorage.getItem("user_id");

    if (!loggedInUserId) {
      setError("User not logged in.");
      navigate("/login"); // redirect if not logged in
      return;
    }

    setUserId(loggedInUserId);

    axios
      .get("http://localhost/project_6BCA/server/fetch_all_orders.php", {
        params: { user_id: loggedInUserId },
      })
      .then((res) => {
        if (res.data.status === "success") {
          setOrders(res.data.orders);
        } else {
          setError(res.data.message || "Error fetching orders");
        }
      })
      .catch((err) => {
        setError("An error occurred while fetching the data.");
        console.error("Error:", err.message);
      });
  }, [navigate]);

  const getTrackingInfo = (status) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return {
          location: "In Transit",
          animationClass: "moving-truck",
        };
      case "completed":
        return {
          location: "Arrived at Destination",
          animationClass: "stopped-truck",
        };
      case "pending":
      case "cancelled":
      default:
        return {
          location: "Not Shipped Yet",
          animationClass: "stopped-truck",
        };
    }
  };

  return (
    <>
      <UserSidebar />
      <div className="orderhistory">
        <h2>Your Order History</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="orderhistory__content">
          {orders.length > 0 ? (
            orders.map((order, index) => {
              const { location, animationClass } = getTrackingInfo(order.status);

              return (
                <div key={index} className="orderhistory__card">
                  <div className="orderhistory__image">
                    <img
                      src={`http://localhost/project_6BCA/server/${order.product_image}`}
                      alt="product"
                    />
                  </div>

                  <div className="orderhistory__info">
                    <p><strong>Product Name:</strong> {order.product_name}</p>
                    <p><strong>Price:</strong> ₹{order.total_amount}</p>
                    <p><strong>Payment Method:</strong> {order.payment_method}</p>
                    <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </p>
                    <p><strong>Transaction ID:</strong> {order.txn_id}</p>

                    {order.status.toLowerCase() === "shipped" && (
                      <>
                        <hr className="track-shipment-line" />
                        <div className={`tracking-container ${animationClass}`}>
                          <FontAwesomeIcon icon={faTruck} className="truck-icon" />
                          <p>{location}</p>
                        </div>
                      </>
                    )}

                    <div className="orderhistory__buttons">
                      {order.status.toLowerCase() === "shipped" && (
                        <button className="status-button shipped">Track Shipment</button>
                      )}
                      {order.status.toLowerCase() === "pending" && (
                        <button className="status-button pending">Pending</button>
                      )}
                      {order.status.toLowerCase() === "completed" && (
                        <button className="status-button completed">Completed</button>
                      )}
                      {order.status.toLowerCase() === "cancelled" && (
                        <button className="status-button cancelled">Cancelled</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
