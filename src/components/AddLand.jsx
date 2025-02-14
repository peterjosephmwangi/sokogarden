import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_description", productDescription);
    formData.append("product_cost", productCost);
    formData.append("product_photo", productPhoto);

    try {
      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/add_product",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Product added successfully!");
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto(null);

      navigate("/");
    } catch (err) {
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Product</h2>

      {/* Display Success or Error Messages */}
      {loading && <div className="alert alert-info">Adding product...</div>}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Cost (Ksh)</label>
            <input
              type="number"
              className="form-control"
              value={productCost}
              onChange={(e) => setProductCost(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Photo</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setProductPhoto(e.target.files[0])}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
