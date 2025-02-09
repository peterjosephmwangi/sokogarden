import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const AddLand = () => {
  const [landDescription, setLandDescription] = useState("");
  const [landLocation, setLandLocation] = useState("");
  const [landSize, setLandSize] = useState("");
  const [landOwner, setLandOwner] = useState("");
  const [plotNo, setPlotNo] = useState("");
  const [landCost, setLandCost] = useState("");
  const [landPhoto, setLandPhoto] = useState(null);
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
    formData.append("land_description", landDescription);
    formData.append("land_location", landLocation);
    formData.append("land_size", landSize);
    formData.append("land_owner", landOwner);
    formData.append("plot_no", plotNo);
    formData.append("land_cost", landCost);
    formData.append("land_photo", landPhoto);

    try {
      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/add_land",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Land added successfully!");
      setLandDescription("");
      setLandLocation("");
      setLandSize("");
      setLandOwner("");
      setPlotNo("");
      setLandCost("");
      setLandPhoto(null);

      navigate("/land-details");

    } catch (err) {
      setError("Failed to add land. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Land</h2>

      {/* Display Success or Error Messages */}
      {loading && <div className="alert alert-info">Adding land...</div>}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Land Description</label>
            <input
              type="text"
              className="form-control"
              value={landDescription}
              onChange={(e) => setLandDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={landLocation}
              onChange={(e) => setLandLocation(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Land Size</label>
            <input
              type="text"
              className="form-control"
              value={landSize}
              onChange={(e) => setLandSize(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Owner</label>
            <input
              type="text"
              className="form-control"
              value={landOwner}
              onChange={(e) => setLandOwner(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Plot Number</label>
            <input
              type="text"
              className="form-control"
              value={plotNo}
              onChange={(e) => setPlotNo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cost (Ksh)</label>
            <input
              type="number"
              className="form-control"
              value={landCost}
              onChange={(e) => setLandCost(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Land Photo</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setLandPhoto(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Submitting..." : "Add Land"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLand;
