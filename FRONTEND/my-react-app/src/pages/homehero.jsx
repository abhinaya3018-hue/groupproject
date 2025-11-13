import React, { useEffect, useRef } from "react";
import "./homehero.css";
import { Link } from "react-router-dom"; // ✅ import Link if you use it in footer


const Homehero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class BloodCell {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 8 + 3;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = (Math.random() - 0.5) * 1.2;
        this.color = `rgba(${180 + Math.random() * 75}, 0, 0, ${
          0.5 + Math.random() * 0.5
        })`;
      }

      move() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        ) {
          this.reset();
        }
      }

      draw() {
        const grad = ctx.createRadialGradient(
          this.x,
          this.y,
          this.radius * 0.2,
          this.x,
          this.y,
          this.radius
        );
        grad.addColorStop(0, "red");
        grad.addColorStop(1, this.color);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(
          this.x,
          this.y,
          this.radius * 1.2,
          this.radius * 0.9,
          Math.random() * Math.PI,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }

    const cells = Array.from({ length: 120 }, () => new BloodCell());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.9;
      cells.forEach((cell) => {
        cell.move();
        cell.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <>
      {/* === Hero Section === */}
      <div className="blood-animation-container">
        <canvas ref={canvasRef} id="bloodCanvas"></canvas>
        <div  className="title1">
          <h1>RED CONNECT</h1>
          <h3>
            Every donor is a hero without a cape
          </h3>
        </div>
      </div>

      {/* === Image Slider === */}
      <div className="slider d-flex justify-content-center align-items-center mt-5">
        <div className="slider_row d-flex">
          <div className="slider_column">
            <img src="./src/assets/blood1.webp" alt="1" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src="./src/assets/blood2.webp" alt="2" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src="./src/assets/blood3.webp" alt="3" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src="./src/assets/blood4.jpg" alt="4" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src="./src/assets/blood5.webp" alt="5" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src="./src/assets/blood6.jpg" alt="6" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src="./src/assets/blood7.webp" alt="7" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src="./src/assets/blood8.png" alt="8" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src="./src/assets/blood9.webp" alt="9" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src="./src/assets/blood10.jpg" alt="10" className="img-fluid find" />
          </div>
        </div>
      </div>

      {/* === About Section === */}
      <div id="id">
        <div id="aboutt">
         <h4>About Us</h4>
          
          <p>We save lives through the power of blood donation.
          Connecting donors with those in need, every drop counts.
          Together, we build a healthier, caring community.
          Because giving blood means giving life.</p>
      
          <div id="abouticon">
            <i className="fa-solid fa-users"></i>
          </div>
        </div>

        <div id="vission">
         <h4>Vission</h4>
           
          <p>Our vision is to create a world where no life is lost due to lack of blood.
          We strive to inspire voluntary blood donation as a social responsibility.
          By connecting hearts, we build a culture of compassion and care.
          </p>
          <div id="vissionicon">
           <i className="fa-solid fa-eye"></i>
          </div>
        </div>
        <div id="mission">
          <h4>Mission</h4>
             
          <p>Our mission is to promote safe and regular blood donation for all in need.
          We aim to bridge the gap between donors and recipients with trust and care.
          Through awareness and action, we empower communities to save lives.</p>
          <div id="missionicon">
           <i className="fa-solid fa-bullseye"></i>
          </div>

        </div>
      </div>

      {/* === Why Donate Section === */}
      <div id="id1">
        <div>
          <img src="./src/assets/OIP.webp" alt="donor" />
        </div>
        <div>
          <h1>Why Donate Blood</h1>
          <h4>Saves Lives & Supports Emergencies</h4>
          <p>
            Every blood donation can save up to three lives. Blood is essential
            for accident victims, surgeries, cancer treatments, and patients with
            blood disorders like thalassemia. By donating, you become a lifesaver
            for someone in critical need.
          </p>
          <h4>Promotes Your Own Health</h4>
          <p>
            Donating blood helps maintain healthy iron levels, reduces the risk of
            heart disease, and stimulates the production of new blood cells. It’s
            also a simple way to undergo a mini-health check-up, as your hemoglobin
            and blood pressure are tested before donation.
          </p>
        </div>
      </div>

      {/* === Footer === */}
      <footer className="footer">

         <div id="fimg">
        <img id="footerimg" src="./src/assets/blood_donation.png" alt="" />
        <h3 id="he1">RED CONNECT</h3>
        <p id="pg1">The Indian Red Cross is a voluntary organization with over 1200 branches</p>
        </div>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Vission</a></li>
          <li><a href="#">Mission</a></li>
        </ul>
        
        <p>© 2025 Red Connect | All Rights Reserved</p>
        <p>Made with ❤️ to support life-saving blood donations.</p>
        <div className="footer-links">
          <Link to="/register">Become a Donor</Link>
          <span> | </span>
          <Link to="/donors">View Donors</Link>
        </div>
      </footer>
    </>
  );
};

export default Homehero;
