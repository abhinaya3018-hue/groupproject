import { Link } from "react-router-dom";
import "./footer.css";
import footerLogo from "../assets/blood_donation.png";


import {
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

import ReviewForm from "../pages/ReviewForm";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="fbox">

        {/* LOGO / ABOUT */}
        <div className="footer-top">
          <div className="footer-t">
            <img src={footerLogo} id="footerimg" alt="Blood Connect Logo" />
            <h3 className="footer-title">Blood Connect</h3>
          </div>

          <p className="footer-desc">
            We save lives through the power of blood donation.
            Connecting donors with those in need.
          </p>
          
          {/* FOLLOW US – ICON ONLY */}
        <div className="footer-menu">
          <ul className="follow-us">
            <li><a href="#"><FaFacebook /></a></li>
            <li><a href="#"><FaInstagram /></a></li>
            <li><a href="#"><FaTwitter /></a></li>
            <li><a href="#"><FaWhatsapp /></a></li>
          </ul>
        </div>
        </div>

        {/*about us */}
        <div className="footer-menu">
          <h5>About Us</h5>
          <ul><a href="#about">About Us</a></ul>
          <ul><a href="#about">Vission</a></ul>
          <ul><a href="#about">Mission</a></ul>
        </div>

        {/* CONNECT */}
        <div className="footer-menu">
          <h5>Contacts</h5>
          <ul>
            <li>
              <a href="tel:+919363242437">
                <FaPhoneAlt /> +91 93632 42437
              </a>
            </li>
            <li>
              <a href="mailto:support@bloodconnect.com">
                <MdEmail /> support@bloodconnect.com
              </a>
            </li>
            <li>
              <a href="#">
                <FaMapMarkerAlt /> Tamil Nadu, India
              </a>
            </li>
          </ul>
        </div>

        

        {/* FEEDBACK */}
        <ReviewForm />

      </div>

      <p id="year">© 2025 Blood Connect. All Rights Reserved.</p>
    </footer>
  );
}
