import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        formData
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", formData.username); // ✅ store username
      }

      navigate("/home"); // ✅ remove extra space
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        "Invalid username or password.";
      setError(message);
    }
  };

  return (
    <div id="login-bg" className="d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" id="card">
        <h3 className="text-center mb-4 text-danger log">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-box">
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

          <div className="mb-3 input-box">
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

          {error && (
            <div className="alert alert-danger py-2 text-center">{error}</div>
          )}

          <button type="submit" className="btn btn-danger w-100 fw-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
