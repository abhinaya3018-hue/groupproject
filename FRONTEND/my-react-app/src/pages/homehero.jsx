import React, { useEffect, useRef } from "react";
import "./homehero.css";

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

    const cells = [];
    for (let i = 0; i < 120; i++) {
      cells.push(new BloodCell());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.9;
      for (let cell of cells) {
        cell.move();
        cell.draw();
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
    <div className="blood-animation-container">
      <canvas ref={canvasRef} id="bloodCanvas"></canvas>
      <div className="title">
        <h1>RED CONNECT</h1>
        <h3>“Supplying vital blood components for patients with illness, trauma, surgery, or cancer care.”</h3>
      </div>

      
    </div>
    <div id="id">
      <div>
        <h1>About Us</h1>
        <p>Blood 4 India is a non-profit online platform dedicated to connecting voluntary blood donors with patients in urgent need across India. Our mission is to bridge the gap between donors and recipients, ensuring timely and life-saving blood donations. With a strong commitment to compassion and community service, we strive to make blood availability seamless and accessible. Join us in saving lives—one donation at a time!</p>
      </div>
      <div>
        <img src="./src/assets/mn-donor.jpg" alt="donor" />
      </div>
    </div>

    <div id="id1">
      <div>
        <img src="./src/assets/OIP.webp" alt="donor" />
      </div>
      <div>
        <h1>why Donate Blood</h1>
        <h4>Saves Lives & Supports Emergencies</h4>
        <p>Every blood donation can save up to three lives. Blood is essential for accident victims, surgeries, cancer treatments, and patients with blood disorders like thalassemia. By donating, you become a lifesaver for someone in critical need.
        </p>

        <h4>Promotes Your Own Health</h4>
        <p>Donating blood helps maintain healthy iron levels, reduces the risk of heart disease, and stimulates the production of new blood cells. It’s also a simple way to undergo a mini-health check-up, as your hemoglobin and blood pressure are tested before donation.</p>
      </div>
      
    </div>

    
   <div className="slider d-flex justify-content-center align-items-center mt-5">
  <div className="slider_row d-flex">
    {/* Original 5 images */}
    <div className="slider_column"><img src="./src/assets/OIP.webp" alt="1" className="img-fluid find" /></div>
    <div className="slider_column"><img src="./src/assets/OIP.webp" alt="2" className="img-fluid find" /></div>
    <div className="slider_column"><img src="./src/assets/OIP.webp" alt="3" className="img-fluid find" /></div>
    <div className="slider_column"><img src="./src/assets/OIP.webp" alt="4" className="img-fluid find" /></div>
    <div className="slider_column"><img src="./src/assets/OIP.webp" alt="5" className="img-fluid find" /></div>

    {/* Duplicate them once more for seamless looping */}
    <div className="slider_column"><img src="./src/assets/OIP.webp" alt="6" className="img-fluid find" /></div>
    <div className="slider_column"><img src="./src/assets/OIP.webp" alt="7" className="img-fluid find" /></div>
    <div className="slider_column"><img src="./src/assets/OIP.webp" alt="8" className="img-fluid find" /></div>
    <div className="slider_column"><img src="./src/assets/OIP.webp" alt="9" className="img-fluid find" /></div>
    <div className="slider_column"><img src="./src/assets/OIP.webp" alt="10" className="img-fluid find" /></div>
  </div>
</div>


    </>
    
  );
};

export default Homehero;
