import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../AdminSidebar";
import "./AdminWishlist.css"; // Ensure this CSS is properly styled

const AdminWishlistTable = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(""); // For displaying errors

  useEffect(() => {
    axios
      .get("http://localhost/project_6BCA/server/fetch_all_wishlist_items.php")
      .then((res) => {
        if (res.data.status === "success") {
          console.log("Wishlist items fetched:", res.data.items);  // Log the fetched data
          setWishlistItems(res.data.items);
        } else {
          const errorMessage = res.data.message || "Error fetching wishlist items";
          setError(errorMessage);
          console.error("Error fetching wishlist items:", errorMessage);
        }
      })
      .catch((err) => {
        setError("An error occurred while fetching the data.");
        console.error("Error:", err.message);
      });
  }, []);

  const filteredWishlist = wishlistItems.filter(
    (item) =>
      item.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = (id) => {
    // Implement update functionality (redirect or modal for updating)
    console.log("Update item with ID:", id);
  };

  return (
    <>
      <AdminSidebar />
      <div className="admin-wishlist-container">
        <h2>❤️ Admin: Wishlist Items</h2>

        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}

        <div className="admin-search-container">
          <input
            type="text"
            placeholder="Search by user or product name..."
            className="admin-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              {filteredWishlist.length > 0 ? (
                filteredWishlist.map((item, i) => (
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminWishlistTable;
