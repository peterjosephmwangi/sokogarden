import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [failure, setFailure] = useState(null);

    const navigate = useNavigate(); // For redirection
  

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setFailure(null);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);

      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/signup",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setLoading(false);
      setSuccess(response.data.success);


      // Clear form fields
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      navigate("/");

    } catch (error) {
      setLoading(false);
      setFailure(error.message);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow p-4">
          <div className="card-body">
            <h2 className="text-center mb-4">Sign Up</h2>

            {loading && <div className="alert alert-info">Please Wait...</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {failure && <div className="alert alert-danger">{failure}</div>}

            <form onSubmit={submit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account? <Link to="/">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
