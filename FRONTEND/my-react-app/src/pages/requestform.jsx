import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "../api"; // ✅ your axios instance
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Using your API instance (automatically adds baseURL)
      await API.post(`send_request/${id}/`, formData);

      // OR if you prefer full axios syntax, uncomment below:
      // await axios.post(`http://127.0.0.1:8000/api/send_request/${id}/`, formData);

      setSuccess(true);
      setTimeout(() => navigate("/donors"), 2000);
    } catch (err) {
      console.error("❌ Error sending request:", err);
      setError("Failed to send request. Please try again.");
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

        <button type="submit" className="btn btn-danger w-100 fw-bold">
          Send Request
        </button>
      </form>
    </div>
  );
}
