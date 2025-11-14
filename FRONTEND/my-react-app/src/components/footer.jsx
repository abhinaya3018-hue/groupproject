import { Link } from "react-router-dom";
import "./footer.css";
import footerLogo from "../assets/blood_donation.png"; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img id="footerimg" src={footerLogo} alt="Blood Donation" />

        <h3 className="footer-title">RED CONNECT</h3>
        <p className="footer-desc">
          The Indian Red Cross is a voluntary organization with over 1200 branches.
        </p>
      </div>

      <ul className="footer-menu">
       <h5>About Us</h5>
        <li><a href="#aboutt">About Us</a></li>
        <li><a href="#vission">Vision</a></li> 
        <li><a href="#mission">Mission</a></li>
      </ul>

      <p id="year">© 2025 Red Connect | All Rights Reserved</p>
    </footer>
  );
}
