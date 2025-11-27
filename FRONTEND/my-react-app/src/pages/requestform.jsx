// src/pages/RequestForm.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./requestform.css";

export default function RequestForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const donor = location.state?.donor || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      };

      await axios.post(`http://127.0.0.1:8000/api/send_request/${id}/`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess(true);
      setTimeout(() => navigate("/donors"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Failed to send request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-section1">
      <Link id="backbut3" to="/donors">
        <i className="fa-solid fa-angles-left"></i>
      </Link>
      <h2>Blood Request Form</h2>

      {success && (
        <div className="form-msg1" style={{ color: "green" }}>
          ✅ Request sent successfully!
        </div>
      )}
      {error && (
        <div className="form-msg1" style={{ color: "red" }}>
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid-form1">
        <div className="form-item1">
          <label>Donor Name</label>
          <input
            type="text"
            value={donor.name || ""}
            readOnly
            placeholder="Donor name"
          />
        </div>

        <div className="form-item1">
          <label>Blood Group</label>
          <input
            type="text"
            value={donor.blood_group || ""}
            readOnly
            placeholder="Blood group"
          />
        </div>

        <div className="form-item1">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-item1">
          <label>Your Phone Number</label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            placeholder="Enter your phone"
            required
          />
        </div>

        <div className="form-item1">
          <label>Your Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-item1">
          <label>Message</label>
          <textarea
            name="message"
            onChange={handleChange}
            placeholder="Enter reason or urgency..."
            rows="3"
          ></textarea>
        </div>

        <div className="form-btn1">
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
