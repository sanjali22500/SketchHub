import React, { useState, useEffect } from "react";
import { faTrash, faEdit, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
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

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleSave = () => {
    console.log("Data to save:", editProduct); // Log the data to see what is being sent

    // Check if the necessary fields are present
    if (!editProduct.id || !editProduct.name || !editProduct.price || !editProduct.disc_price) {
        alert("Please fill in all the required fields.");
        return;
    }

    // Prepare the form data for the API request
    const formData = new FormData();
    formData.append('id', editProduct.id);
    formData.append('name', editProduct.name);
    formData.append('price', editProduct.price);
    formData.append('disc_price', editProduct.disc_price);

    // If an image is provided, append it to the form data
    if (editProduct.image) {
        formData.append('image', editProduct.image);
    }

    // Post the data to the server
    axios.post("http://localhost/project_6BCA/server/edit_product.php", formData)
        .then((res) => {
            console.log(res.data);  // Log the response data to see what is being returned
            if (res.data.status === "success") {
                alert("Product updated successfully");
                fetchProductData();
                setEditProduct(null);  // Close the edit form after successful update
            } else {
                alert("Failed to update: " + (res.data.message || 'Unknown error'));
            }
        })
        .catch((err) => {
            console.error("Update error:", err);
            alert("Error updating the product");
        });
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
                        <button className="edit-btn adminusers-btn" onClick={() => handleEdit(product)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
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

          {editProduct && (
            <div className="edit-form2">
              <h3>Edit Product</h3>
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                placeholder="Product Name"
              />
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                placeholder="Price"
              />
              <input
                type="number"
                value={editProduct.disc_price}
                onChange={(e) => setEditProduct({ ...editProduct, disc_price: e.target.value })}
                placeholder="Discount Price"
              />
              <input
                type="file"
                onChange={(e) => setEditProduct({ ...editProduct, image: e.target.files[0] })}
                accept="image/*"
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditProduct(null)}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
