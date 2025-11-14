import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      const rotateX = (y - 0.5) * 10;
      const rotateY = (x - 0.5) * -10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const resetTilt = () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", resetTilt);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", resetTilt);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", formData.username);
      }
      navigate("/home");
    } catch (err) {
      const message = err.response?.data?.detail || "Invalid username or password.";
      setError(message);
    }
  };

  return (
    <div className="login-page">
      <a id="backbut" href="/homehero">
        <i className="fa-solid fa-angles-left" id="back"></i>
      </a>
      <div className="background-blur" />

      <div className="login-card" ref={cardRef}>
        <h2 className="titlelog" style={{ color: "black" }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label>Username</label>
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          <div className="options">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#" className="forgot">Forgot password?</a>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-login">Login</button>

          <p className="signup">
            Don’t have an account?{" "}
            <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
