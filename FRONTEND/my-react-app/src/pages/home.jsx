import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Handle authentication
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/home", { replace: true }); // redirect to login if not logged in
    }
  }, [navigate]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/home", { replace: true }); // redirect to login after logout
  };

  // ✅ Blood cell animation
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
    <div className="home-container">
      {/* === Hero Section === */}
      <section className="blood-animation-container">
        <canvas ref={canvasRef} id="bloodCanvas"></canvas>
        <div className="title">
          <h1>RED CONNECT</h1>
          <h3>
            “Supplying vital blood components for patients with illness, trauma,
            surgery, or cancer care.”
          </h3>
        </div>
      </section>

       { /*page2*/}
      <div id="page2">
  <div>
    <img id="giftimg" src="./src/assets/OI.webp" alt="" />
  </div>
  <div>
    <div id="registerbox" className="register-box">
      <div id="donorbox" className="donor-box">
        <Link to="/register" className="link-btn">Register as Donor</Link>
      </div>
      <div>
      <div id="donorlistbox">
        <Link to="/donors" className="link-btn"> Donors   list </Link>
      </div>
      </div>
    </div>
  </div>
</div>


      {/* === Image Slider === */}
      <div className="slider d-flex justify-content-center align-items-center mt-5">
        <div className="slider_row d-flex">
          <div className="slider_column"><img src="./src/assets/blood1.webp" alt="1" className="img-fluid find" /></div>
          <div className="slider_column"><img src="./src/assets/blood2.webp" alt="2" className="img-fluid find" /></div>
          <div className="slider_column"><img src="./src/assets/blood3.webp" alt="3" className="img-fluid find" /></div>
          <div className="slider_column"><img src="./src/assets/blood4.jpg" alt="4" className="img-fluid find" /></div>
          <div className="slider_column"><img src="./src/assets/blood5.webp" alt="5" className="img-fluid find" /></div>
          <div className="slider_column"><img src="./src/assets/blood6.jpg" alt="6" className="img-fluid find" /></div>
          <div className="slider_column"><img src="./src/assets/blood7.webp" alt="7" className="img-fluid find" /></div>
          <div className="slider_column"><img src="./src/assets/blood8.png" alt="8" className="img-fluid find" /></div>
          <div className="slider_column"><img src="./src/assets/blood9.webp" alt="9" className="img-fluid find" /></div>
          <div className="slider_column"><img src="./src/assets/blood10.jpg" alt="10" className="img-fluid find" /></div>
        </div>
      </div>

      {/* === About Section === */}
      <section id="about">
        <div>
          <h1>About Us</h1>
          <p>
            Blood 4 India is a non-profit online platform dedicated to
            connecting voluntary blood donors with patients in urgent need
            across India. Our mission is to bridge the gap between donors and
            recipients, ensuring timely and life-saving blood donations. Join us
            in saving lives—one donation at a time!
          </p>
        </div>
        <div>
          <img src="./src/assets/mn-donor.jpg" alt="donor" />
        </div>
      </section>

      {/* === Why Donate Section === */}
      <section id="why-donate">
        <div>
          <img src="./src/assets/OIP.webp" alt="donor" />
        </div>
        <div>
          <h1>Why Donate Blood</h1>
          <h4>Saves Lives & Supports Emergencies</h4>
          <p>
            Every blood donation can save up to three lives. Blood is essential
            for accident victims, surgeries, cancer treatments, and patients
            with blood disorders like thalassemia.
          </p>
          <h4>Promotes Your Own Health</h4>
          <p>
            Donating blood helps maintain healthy iron levels, reduces the risk
            of heart disease, and stimulates the production of new blood cells.
          </p>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="footer">
        <div id="fimg">
        <img id="footerimg" src="./src/assets/blood_donation.png" alt="" />
        <h3 id="he1">RED CONNECT</h3>
        <p id="pg1">The Red Connect is a voluntary organization with over 1200 branches</p>
        </div>
        <div></div>
        <p>© 2025 Red Connect | All Rights Reserved</p>
        <p>
          Made with  to support life-saving blood donations.
        </p>
        <div className="footer-links">
          <Link to="/donors">View Donors</Link>
          <span> | </span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
