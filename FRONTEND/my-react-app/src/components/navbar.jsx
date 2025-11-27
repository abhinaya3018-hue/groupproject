import { Link } from "react-router-dom";
import "./navbar.css"; 
import { HashLink } from 'react-router-hash-link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg  fixed-top ">
      <div className="container">
        <Link className="navbar-brand fw-bold text-danger" to="/"><img id="nvimg" src="./src/assets/blood_donation.png" alt="" />RedConnect</Link>
        <button className="navbar-toggler"type="button"data-bs-toggle="collapse"data-bs-target="#navbarNavAltMarkup"aria-controls="navbarNavAltMarkup"aria-expanded="false"aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <HashLink className="nav-link" smooth to="/#aboutt">About Us</HashLink>
            <HashLink className="nav-link" smooth to="/#eligibility">Eligibility</HashLink>
            <Link className="nav-link" to="/bloodflow">Red Flow</Link>
            <Link className="nav-link" to="/login"><i className="fa fa-sign-in"></i> Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
