import React, { useEffect } from "react";
import "./loder.css";
import logo from "../assets/blood_donation.png";

const Loader = () => {

  useEffect(() => {

    const footer = document.querySelector(".footer");
    if (footer) footer.style.display = "none";

 
    return () => {
      if (footer) footer.style.display = "block";
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="circle"></div>
      <img src={logo} alt="" className="logo" />
    </div>
  );
};

export default Loader;
