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

import ReviewForm from "./ReviewForm";

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
        </div>

        {/* CONNECT */}
        <div className="footer-menu">
          <h5>Connect</h5>
          <ul>
            <li>
              <a href="tel:+919876543210">
                <FaPhoneAlt /> +91 98765 43210
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

        {/* FOLLOW US – ICON ONLY */}
        <div className="footer-menu">
          <h5>Follow Us</h5>
          <ul className="follow-us">
            <li><a href="#"><FaFacebook /></a></li>
            <li><a href="#"><FaInstagram /></a></li>
            <li><a href="#"><FaTwitter /></a></li>
            <li><a href="#"><FaWhatsapp /></a></li>
          </ul>
        </div>

        {/* FEEDBACK */}
        <ReviewForm />

      </div>

      <p id="year">© 2025 Blood Connect. All Rights Reserved.</p>
    </footer>
  );
}
