import { Link } from "react-router-dom";
import "./footer.css";
import footerLogo from "../assets/blood_donation.png"; 

export default function Footer() {
  return (
    <footer className="footer">
     <div className="fbox">
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
       
       <div>
      <ul className="footer-menu">
       <h5>About Us</h5>
        <li><a href="#aboutt">About Us</a></li>
        <li><a href="#vission">Vision</a></li> 
        <li><a href="#mission">Mission</a></li>
      </ul>
      </div>
      </div>

      <p id="year" style={{ textAlign: "center" }}>© 2025 Red Connect | All Rights Reserved</p>
    </footer>
  );
}
