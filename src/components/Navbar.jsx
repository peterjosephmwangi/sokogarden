import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    // Get the user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    setUser(null); // Clear user state
    navigate("/"); // Redirect to the login page
  };

  return (
    <section className="container row">
      <div className="col-md-12">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <a href="/land-details" className="navbar-brand">
            <b>Uza Lands</b>
          </a>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarcollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarcollapse">
            <div className="navbar-nav">
              {/* Links to Get Lands and Add Lands */}
              <Link to="/land-details" className="nav-link">
                Get Lands
              </Link>
              <Link to="/add-land" className="nav-link">
                Add Lands
              </Link>
            </div>
            <div className="ms-auto">
              {/* Display logged-in user's name/email and Logout button */}
              {user ? (
                <div className="navbar-nav ml-auto">
                  <span className="navbar-text me-3">
                    Logged in as: {user.username || user.email}
                  </span>
                  <button
                    className="btn btn-outline-primary ml-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
