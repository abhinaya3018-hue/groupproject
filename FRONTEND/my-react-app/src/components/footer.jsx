import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./footer.css"; 
import footerLogo from "../assets/blood_donation.png"; 
import { FaInstagram, FaTwitter, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="fbox">

        {/* Left Section */}
        <div className="footer-top">
          <div className="footer-t">
            <div>
              <img id="footerimg" src={footerLogo} alt="Blood Donation" />
            </div>
            <div>
              <h3 className="footer-title">RED CONNECT</h3>
            </div>
          </div>

          <p className="footer-desc">
            The Indian Red Cross is a voluntary organization with over 1200 branches.
          </p>
        </div>

        {/* About Us Section */}
        <div>
          <ul className="footer-menu">
            <h5>About Us</h5>
            <li><a href="#aboutt">About Us</a></li>
            <li><a href="#vission">Vision</a></li>
            <li><a href="#mission">Mission</a></li>
          </ul>
        </div>

        {/* Social Icons Section */}
<div>
  <ul className="footer-menu">
    <h5>Follow Us</h5>

    <li>
      <a href="#">
        <FaInstagram size={22} /> Instagram
      </a>
    </li>

    <li>
      <a href="#">
        <FaTwitter size={22} /> Twitter
      </a>
    </li>

    <li>
      <a href="#">
        <FaWhatsapp size={22} /> WhatsApp
      </a>
    </li>

    <li>
      <a href="mailto:rredconnect@gmail.com">
        <MdEmail size={22} /> Email
      </a>
    </li>

    <li>
      <a href="#">
        <FaFacebook size={22} /> Facebook
      </a>
    </li>

  </ul>
</div>

        {/* Review Form */}
        <ReviewForm />
      </div>

      <p id="year" style={{ textAlign: "center" }}>
        © 2025 Red Connect | All Rights Reserved
      </p>
    </footer>
  );
}

/* ------------------------ REVIEW FORM ------------------------ */

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/reviews/", {
        user_name: username,
        rating: rating,
        comment: comment,
      });

      alert("Review submitted successfully!");
      setRating(0);
      setComment("");
      setUsername("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="review-container">
      <h2>Feedback</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="name-input"
      />

      <div className="stars">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={value <= rating ? "star filled" : "star"}
            onClick={() => setRating(value)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        id="comment-box"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button id="subm-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
