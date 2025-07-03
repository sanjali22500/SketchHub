import React, { useState, useEffect } from "react";
import { faTrash, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import "./AdminProduct.css";
import AdminSidebar from "../AdminSidebar";

const AdminProduct = () => {
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editProduct, setEditProduct] = useState(null); // ✅ state for editing

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost/project_6BCA/server/fetch_images.php");
      if (response.data && Array.isArray(response.data)) {
        setProductList(response.data);
      } else {
        console.error("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleFeatureToggle = async (id, isFeatured) => {
    try {
      const response = await axios.post(
        "http://localhost/project_6BCA/server/toggle_feature.php",
        { id, is_featured: !isFeatured },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if (response.data.success) {
        fetchProductData();
      } else {
        console.error("Failed to update feature status.");
      }
    } catch (error) {
      console.error("Error updating feature status:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const formData = new FormData();
      formData.append("id", id);
  
      axios.post("http://localhost/project_6BCA/server/delete_product.php", formData)
        .then((res) => {
          if (res.data.status === "success") {
            alert("Product deleted successfully.");
            fetchProductData();
          } else {
            alert("Delete failed: " + res.data.message);
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Server error during deletion.");
        });
    }
  };
  

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.uploader_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminSidebar />
      <div className="item-table">
        <div className="admin-product-table">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name or uploader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="table-wrapper">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Disc. Price</th>
                    <th>Uploader</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td>₹{product.disc_price}</td>
                      <td>{product.uploader_name || "N/A"}</td>
                      <td>
                        <img
                          src={`http://localhost/project_6BCA/server/${product.path}`}
                          alt={product.name}
                          className="product-image"
                        />
                      </td>
                      <td>
                        <button className="delete-btn adminusers-btn" onClick={() => handleDelete(product.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          className={`feature-btn adminusers-btn ${product.is_featured ? "featured" : ""}`}
                          title={product.is_featured ? "Unfeature" : "Feature"}
                          onClick={() => handleFeatureToggle(product.id, product.is_featured)}
                        >
                          <FontAwesomeIcon icon={product.is_featured ? solidStar : regularStar} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default AdminProduct;
