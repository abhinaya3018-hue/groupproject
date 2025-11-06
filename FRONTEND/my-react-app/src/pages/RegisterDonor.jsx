import React, { useState } from "react";
import API from "../api";
import "./register.css";

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
    <div className="container my-5" id="reg">
      <div className="card shadow-lg p-4 mx-auto">
        <div className="row g-0 align-items-center">
          {/* Left side — Form */}
          <div className="col-md-6 p-4">
            <h3 className="text-center text-danger mb-4">Register as Donor</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Name</label>
                <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" required/> </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Phone Number</label>
                <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number"required/> </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Blood Group</label>
                <select className="form-select" name="blood_group" value={form.blood_group} onChange={handleChange}>
                  {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
                    (bg) => (
                      <option key={bg} value={bg}>
                        {bg}</option>
                       ) )}</select> </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Age</label>
                <input type="number" className="form-control" name="age" value={form.age} onChange={handleChange} placeholder="Enter age" required/></div>

              <div className="mb-3">
                <label className="form-label fw-bold">Address</label>
                <input type="text" className="form-control" name="city" value={form.city} onChange={handleChange} placeholder="Enter address" required /> </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-danger"> Register</button>
              </div>
            </form>

            {msg && (<div className="alert mt-3 text-center fw-semibold alert-info">{msg}</div>)}
          </div>
          <div className="col-md-6 p-3" id="img-card">
            <div id="donorCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner rounded-4 shadow-sm">
                <div className="carousel-item active">
                  <img src="/images/img 1.jpg" className="d-block " alt="Donate Blood"/></div>
                <div className="carousel-item">
                  <img src="/images/img 2.jpg" className="d-block "alt="Save Lives"/></div>
                <div className="carousel-item">
                  <img src="/images/img 3.jpg" className="d-block"alt="Blood Donation Camp"/></div>
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#donorCarousel" data-bs-slide="prev"><span className="carousel-control-prev-icon bg-dark" ></span></button>
              <button className="carousel-control-next"type="button"data-bs-target="#donorCarousel" data-bs-slide="next"><span className="carousel-control-next-icon bg-dark"></span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
