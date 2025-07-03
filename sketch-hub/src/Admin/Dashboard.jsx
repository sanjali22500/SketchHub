import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import AdminSidebar from "./AdminSidebar";
import { FaUsers, FaHeart, FaShoppingCart, FaImage, FaClipboardList, FaMoneyCheckAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    users: 0,
    products: 0,
    wishlist: 0,
    cart: 0,
    orders: 0,
    purchases: 0
  });

  useEffect(() => {
    fetch("http://localhost/project_6BCA/server/admin_summery.php")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Log the raw data for debugging
        setSummary({
          users: data.total_users || 0,
          products: data.total_sketches || 0, // Adjusted based on your PHP response
          wishlist: data.atotal_wishlist_items || 0, // Adjusted based on your PHP response
          cart: data.total_cart_items || 0, // Adjusted based on your PHP response
          orders: data.total_orders || 0,
          purchases: data.total_purchases || 0
        });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);  // Empty dependency array ensures the effect runs once on component mount

  const renderCard = (title, value, icon, color) => (
    <div className={`card ${color}`}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );

  return (
    <div className="dash-container">
      <AdminSidebar />
      <div className="content">
        <div className="dash-title">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="card-container">
          {/* Render each card with the appropriate data */}
          {renderCard("Total Users", summary.users, <FaUsers />)}
          {renderCard("Total Products", summary.products, <FaImage /> )}
          {renderCard("Wishlist Items", summary.wishlist, <FaHeart /> )}
          {renderCard("Cart Items", summary.cart, <FaShoppingCart />)}
          {renderCard("Total Orders", summary.orders, <FaClipboardList />)}
          {renderCard("Total Purchases", summary.purchases, <FaMoneyCheckAlt />)}
         
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
