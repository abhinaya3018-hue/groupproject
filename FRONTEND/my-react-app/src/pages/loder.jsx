import React from "react";
import "./loder.css";
import logo from "../assets/blood_donation.png";

const Loader = () => {
  return (
    
    <div className="loader-container">
      <div className="circle"></div>
    
      <img src={logo} alt="Blood 4 India Logo" className="logo" />
    </div>
  );
};

export default Loader;