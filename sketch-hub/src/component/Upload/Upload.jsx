import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./Upload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserSidebar from "../UserSidebar";

const Upload = () => {
  const [user_Id, setUserID] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [disc_price, setDisc_price] = useState("");
  const [message, setMessage] = useState("");
  const [productList, setProductList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // To handle editing
  const [stock, setStock] = useState(""); // Added state for stock quantity
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDiscPriceChange = (e) => {
    setDisc_price(e.target.value);
  };

  const handleStockChange = (e) => {
    // Handler for stock input change
    setStock(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !name || !price || !disc_price || !stock) {
      setMessage("Please fill in all fields before uploading.");
      return;
    }

    const user_id = sessionStorage.getItem("user_id");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("disc_price", disc_price);
    formData.append("stock", stock); // This line sends stock value to backend
    formData.append("user_id", user_id);

    try {
      const response = await axios.post(
        "http://localhost/project_6BCA/server/handle_products.php",
        {
          action: editingProduct ? "edit" : "upload",
          id: editingProduct ? editingProduct.id : null,
          name,
          price,
          disc_price,
          image: file, // Include image for edit if applicable
          user_id: user_id,
          stock,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.status === "success") {
        alert(response.data.message);
        setMessage(response.data.message);

        // Clear form fields after upload or edit
        setFile(null);
        setName("");
        setPrice("");
        setDisc_price("");
        setStock(""); // Clear stock field
        setEditingProduct(null);

        // Clear the file input field manually using ref
        fileInputRef.current.value = "";

        // Fetch the updated product list after uploading or editing
        fetchProductList();
      } else {
        setMessage("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error response: ", error.response);
      setMessage("Error uploading file.");
    }
  };

  const fetchProductList = async () => {
    try {
      const response = await axios.get(
        "http://localhost/project_6BCA/server/fetch_images.php"
      );

      if (response.data && Array.isArray(response.data)) {
        setProductList(response.data);
      } else {
        console.error("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductList();
    setUserID(sessionStorage.getItem("user_id"));
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDisc_price(product.disc_price);
    setStock(product.stock); // Pre-fill stock value for editing
  };

  const handleDelete = async (productId) => {
    console.log("Deleting product with ID:", productId); // Debugging line
    try {
      const response = await axios.post(
        "http://localhost/project_6BCA/server/handle_products.php",
        new URLSearchParams({
          action: "delete", // Send action as part of URLSearchParams
          id: productId,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Ensure correct content type
          },
        }
      );

      console.log("Response data:", response.data); // Debugging line
      if (response.data.status === "success") {
        alert(response.data.message);
        fetchProductList(); // Refresh the product list after deletion
      } else {
        alert("Error deleting product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Navbar />
      <UserSidebar/>
      <div className="Home-container">
        <section className="upload-container">
          {/* Left Column: Upload Form */}
          <div className="upload-col">
            <h2>
              {editingProduct ? "Edit Product" : "Upload New Painting/Drawing"}
            </h2>
            <div className="upload-form">
              <input
                type="file"
                ref={fileInputRef} // Set ref for file input
                onChange={handleFileChange}
                className="upload-input"
              />
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={handleNameChange}
                className="upload-input"
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={handlePriceChange}
                className="upload-input"
              />
              <input
                type="number"
                placeholder="Discount Price"
                value={disc_price}
                onChange={handleDiscPriceChange}
                className="upload-input"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={stock}
                onChange={handleStockChange} // Handle stock input
                className="upload-input"
              />
              <button onClick={handleUpload} className="upload-button">
                {editingProduct ? "Update Product" : "Upload"}
              </button>
              {message && <p className="upload-message">{message}</p>}
            </div>
          </div>
          {/* Right Column: Product List */}
          <div className="upload-col">
            <h2>Uploaded Data</h2>
            {productList.length === 0 ? (
              <p>No products uploaded yet.</p>
            ) : (
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Disc. Price</th>
                    <th>Stock</th> {/* Added Stock column */}
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productList
                    .filter((product) => product.add_by == user_Id)
                    .map((product, index) => (
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>₹{product.price}</td>
                        <td>₹{product.disc_price}</td>
                        <td>{product.stock}</td> {/* Display stock */}
                        <td>
                          <img
                            src={`http://localhost/project_6BCA/server/${product.path}`}
                            alt={product.name}
                            className="product-image"
                            // style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </td>
                        <td>
                          <button
                            className="edit-btn adminusers-btn"
                            onClick={() => handleEdit(product)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="delete-btn adminusers-btn"
                            onClick={() => handleDelete(product.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Upload;
