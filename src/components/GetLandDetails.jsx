import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

import { Link, useNavigate } from 'react-router-dom'
const GetLandDetails = () => {
  const navigate = useNavigate()
  const [lands, setLands] = useState([]);
  const [filteredLands, setFilteredLands] = useState([]); // Filtered data
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await axios.get(
          "https://modcom2.pythonanywhere.com/api/get_product_details"
        );
        setLands(response.data.reverse());
        setFilteredLands(response.data.reverse()); // Initialize with all data
      } catch (error) {
        console.error("Error fetching land details:", error);
      } finally {
        setIsLoading(false); // Stop loading after data fetch
      }
    };

    fetchLandDetails();
  }, []);

  // Search filter logic
  useEffect(() => {
    const filtered = lands.filter((land) =>
      land.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      land.product_description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLands(filtered);
  }, [searchQuery, lands]);

  return (
    <div className="container mt-4">
      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control shadow-sm p-2"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="text-center my-5">
          <FaSpinner className="text-primary" size={50} style={{ animation: "spin 1s linear infinite" }} />
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="row">
          {filteredLands.length > 0 ? (
            filteredLands.map((land) => (
              <div key={land.product_id} className="col-md-3 mb-4">
                <div className="card shadow-lg h-100">
                  <img
                    src={`https://modcom2.pythonanywhere.com/static/images/${land?.product_photo}`}
                    className="card-img-top"
                    alt={land.product_description}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{land?.product_name}</h5>
                    <p className="card-text small flex-grow-1">
                      {land.product_description.length > 50
                        ? `${land.product_description.slice(0, 50)}...`
                        : land.product_description}
                    </p>
                    <span className="text-success fw-bold">
                        Ksh {land.product_cost.toLocaleString()}
                      </span>
                      
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                    
                      <button className='btn btn-dark mt-2 w-100' 
              
              onClick={()=>navigate('/makepayment',{state:{land}})}
              >Purchase Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">
              No products found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetLandDetails;
