import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCart.css";
import AdminSidebar from "../AdminSidebar";

const AdminCartTable = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/project_6BCA/server/fetch_all_cart_items.php")
      .then((res) => {
        if (res.data.status === "success") {
          setCartItems(res.data.items);
        } else {
          console.error(
            "Error fetching cart items:",
            res.data.message || "Unexpected response"
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching cart items:", err.message || err);
      });
  }, []);

  const filteredCart = cartItems.filter((item) => {
    const userName = item.user_name || "";
    const productName = item.product_name || "";
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <AdminSidebar />
      <div className="admin-table-container">
        <h2>🛒 Admin: Cart Items</h2>
        <input
          type="text"
          placeholder="Search by user or product name..."
          className="admin-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filteredCart.map((item, i) => (
                <tr key={i}>
                  <td>{item.user_name}</td>
                  <td>{item.product_name}</td>
                  <td>
                    <img
                      src={`http://localhost/project_6BCA/server/${item.image_path}`}
                      alt="product"
                      width="50"
                    />
                  </td>
                  <td>₹{item.price}</td>
                  <td>₹{item.disc_price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
};

export default AdminCartTable;
