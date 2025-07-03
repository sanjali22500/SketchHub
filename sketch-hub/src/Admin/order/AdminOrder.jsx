import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrder.css";
import AdminSidebar from "../AdminSidebar";
import { FaTrash } from "react-icons/fa";

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(""); // For displaying errors
  const [statusFilter, setStatusFilter] = useState(""); // For order status filter

  useEffect(() => {
    axios
      .get("http://localhost/project_6BCA/server/fetch_all_orders.php")
      .then((res) => {
        if (res.data.status === "success") {
          console.log("Orders fetched:", res.data.orders); // Log the fetched data
          setOrders(res.data.orders);
        } else {
          const errorMessage = res.data.message || "Error fetching orders";
          setError(errorMessage);
          console.error("Error fetching orders:", errorMessage);
        }
      })
      .catch((err) => {
        setError("An error occurred while fetching the data.");
        console.error("Error:", err.message);
      });
  }, []);

  const filteredOrders = orders
    .filter(
      (order) =>
        order.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.txn_id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((order) =>
      statusFilter
        ? order.status.toLowerCase() === statusFilter.toLowerCase()
        : true
    );

  const handleDelete = (id) => {
    axios
      .post("http://localhost/project_6BCA/server/delete_order.php", { id })
      .then((res) => {
        if (res.data.success) {
          setOrders(orders.filter((order) => order.order_id !== id));
        } else {
          console.error("Failed to delete order.");
        }
      })
      .catch((err) => console.error("Error deleting order:", err.message));
  };

  return (
    <>
      <AdminSidebar />
      <div className="admin-orders-container">
        <h2>📦 Admin: Orders</h2>

        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}

        <div className="admin-search-container">
          <input
            type="text"
            placeholder="Search by user, product, or txn ID..."
            className="admin-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-filter-container">
          <select
            className="admin-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Transaction ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, i) => (
                  <tr key={i}>
                    <td>{order.user_name}</td>
                    <td>{order.product_name}</td>
                    <td>
                      <img
                        src={`http://localhost/project_6BCA/server/${order.product_image}`}
                        alt="product"
                        width="50"
                      />
                    </td>
                    <td>₹{order.total_amount}</td>
                    <td>{order.payment_method}</td>
                    <td>{order.order_date}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateStatus(order.order_id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{order.txn_id}</td>
                    <td>
                      <button
                        className="admin-btn delete-icon"
                        onClick={() => handleDelete(order.order_id)}
                        title="Delete Order"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminOrdersTable;
