import React, { useState } from "react";
import API from "../api";
import "./register.css";
import { Link } from "react-router-dom";

export default function RegisterDonor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    blood_group: "O+",
    city: "",
    age: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("donors/", form)
      .then(() => {
        setMsg("✅ Donor registered successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          blood_group: "O+",
          city: "",
          age: "",
        });
      })
      .catch(() => setMsg("❌ Error registering donor."));
  };

  return (
    <div className="register-section">
       <Link id="backbut1" to="/home">
      <i className="fa-solid fa-angles-left"></i></Link>
      <h2>Register as Donor</h2>

      <form onSubmit={handleSubmit} className="grid-form">
        <div className="form-item">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-item">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-item">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-item">
          <label>Blood Group</label>
          <select
            name="blood_group"
            value={form.blood_group}
            onChange={handleChange}
          >
            {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        <div className="form-item">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Enter age"
            required
          />
        </div>

        <div className="form-item">
          <label>Address</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="form-btn">
          <button type="submit">Register</button>
        </div>
      </form>

      {msg && <p className="form-msg">{msg}</p>}
    </div>
  );
}
