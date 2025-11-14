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
    <div className="login-page1">
       <a id="backbut1" href="/login">
      <i className="fa-solid fa-angles-left" id="base"></i></a>
      <div className="sign1">
        <h2 className="titlelog2">
          <i id="sign" className="fa fa-user-plus"></i> Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label>Username</label>
          </div>

          <div className="form-group1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>

          <div className="form-group1">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-signin">Sign Up</button>

          <p className="signup">
            Already have an account?
            <a href="/login"><i className="fa fa-sign-in"></i> Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
