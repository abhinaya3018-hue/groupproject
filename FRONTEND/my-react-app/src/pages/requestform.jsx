// src/pages/RequestForm.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "./requestform.css";

export default function RequestForm() {
  const { id } = useParams(); // donor ID from URL
  const navigate = useNavigate();
  const location = useLocation();
  const donor = location.state?.donor || {}; // donor object passed via Link

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
   
     const payload = {
        requester_name: formData.name,
        requester_phone: formData.phone,
        requester_email: formData.email,
        message: formData.message,
    };

    // Use 'id' from useParams() instead of undefined donorId
   const response = await axios.post(
  `http://127.0.0.1:8000/api/send_request/${id}/`,
  payload
);

    console.log(response.data);
    setSuccess(true);

    // Redirect to donors page after 2 seconds
    setTimeout(() => navigate("/donors"), 2000);
  } catch (err) {
    console.error("❌ Error sending request:", err);
    setError(
      err.response?.data?.detail || "Failed to send request. Please try again."
    );
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="request-form-container">
      <h3 className="text-danger text-center fw-bold mb-4">
        Blood Request Form
      </h3>

      {success && (
        <div className="alert alert-success text-center">
          Request sent successfully!
        </div>
      )}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="request-form shadow p-4 rounded">
        <div className="mb-3">
          <label>Donor Name</label>
          <input
            type="text"
            value={donor.name || ""}
            readOnly
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Blood Group</label>
          <input
            type="text"
            value={donor.blood_group || ""}
            readOnly
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Your Phone Number</label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Your Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Message</label>
          <textarea
            name="message"
            onChange={handleChange}
            className="form-control"
            placeholder="Enter reason or urgency..."
          />
        </div>

        <button
          type="submit"
          className="btn btn-danger w-100 fw-bold"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Request"}
        </button>
      </form>
    </div>
  );
}
