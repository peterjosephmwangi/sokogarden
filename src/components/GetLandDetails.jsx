import React, { useEffect, useState } from "react";
import axios from "axios";

const GetLandDetails = () => {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await axios.get(
          "https://modcom2.pythonanywhere.com/api/get_land_details"
        );
        // Reverse the order of the lands to display the most recently added land first
        setLands(response.data.reverse());
      } catch (error) {
        console.error("Error fetching land details:", error);
      }
    };

    fetchLandDetails();
  }, []);

  return (
    <div className="container mt-4">
      {/* 🏞️ Banner Image */}
      <div className="text-center mb-4">
        <img
          src="/banner2.jpg"
          alt="Land Banner"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "350px", width: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="row">
        {lands.map((land) => (
          <div key={land.land_id} className="col-md-4 mb-4">
            <div className="card shadow-lg">
              <img
                src={`https://modcom2.pythonanywhere.com/static/images/${land.land_photo}`}
                className="card-img-top"
                alt={land.land_description}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{land.land_description}</h5>
                <p className="card-text">
                  <strong>Location:</strong> {land.land_location}
                  <br />
                  <strong>Size:</strong> {land.land_size}
                  <br />
                  <strong>Owner:</strong> {land.land_owner}
                  <br />
                  <strong>Plot No:</strong> {land.plot_no}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-success fw-bold">
                    Ksh {land.land_cost.toLocaleString()}
                  </span>
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetLandDetails;
