import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // For redirection

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/signin",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setLoading(false);

      if (response.data.user) {
        // Store user details in localStorage or context if needed
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to /land-details
        navigate("/land-details");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow p-4">
          <div className="card-body text-center">
            <h2 className="mb-4">Sign In</h2>

            {loading && <div className="alert alert-info">Signing in...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={submit}>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>
            </form>

            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
