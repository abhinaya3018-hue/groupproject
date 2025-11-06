import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <h2>RedConnects</h2>
          <p>Saving lives, one drop at a time.</p>
        </div>

        {/* Middle Section */}
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/donate">Donate</a>
          <a href="/contact">Contact</a>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <p>© {new Date().getFullYear()} RedConnects. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
