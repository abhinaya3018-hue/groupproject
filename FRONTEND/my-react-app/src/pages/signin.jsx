import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", formData);
      console.log(response.data);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Signup failed. Try again.");
      } else {
        setError("Network error. Please check your backend connection.");
      }
    }
  };

  return (
    <div id="signup-bg" className="d-flex justify-content-center align-items-center vh-100">
      <div className="card signup-card p-4 shadow-lg" id="sing">
        <h3 className="text-center mb-1 text-danger fw-bold sing"  >Create an Account</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-2 fire">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-2 fire">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-2 fire-box">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <p className="text-danger text-center fw-semibold">{error}</p>}

          <button type="submit" className="btn btn-danger w-100 mt-2">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
