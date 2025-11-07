import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./home.css"; // updated single CSS import

const Home = () => {
  const [username, setUsername] = useState("");
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Handle authentication
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/home");
  };

  // Handle blood cell animation
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
      {/* Navbar */}
      <nav className="hero-nav" id="id10">
        <h2>Welcome, {username} </h2>
        <div>
          <Link to="/donors" className="nav-link" id="don">
            Donors
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="blood-animation-container">
        <canvas ref={canvasRef} id="bloodCanvas"></canvas>
        <div className="title">
          <h1>RED CONNECTS</h1>
          <h3>
            “Supplying vital blood components for patients with illness, trauma,
            surgery, or cancer care.”
          </h3>
        </div>

        <div id="registerbox" className="register-box">
          <div id="donorbox" className="donor-box">
            <Link to="/register" className="link-btn">
              Register as Donor
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
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

      {/* Why Donate Section */}
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
    </div>
  );
};

export default Home;
