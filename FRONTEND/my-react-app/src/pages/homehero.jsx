import React, { useEffect, useRef, useState } from "react"; 
import "./homehero.css";
import { Link } from "react-router-dom"; 
import axios from "axios";
import Carousel from "react-multi-carousel";
import { FaStar } from "react-icons/fa"; 
import "react-multi-carousel/lib/styles.css";
import { color } from "framer-motion";
import DonateImg from "../assets/OIP.webp";
import  Blood1 from "../assets/blood1.webp";
import  Blood2 from "../assets/blood2.webp";
import  Blood3 from "../assets/blood3.webp";
import  Blood4 from "../assets/blood4.jpg";
import  Blood5 from "../assets/blood5.webp";
import  Blood6 from "../assets/blood6.jpg";
import  Blood7 from "../assets/blood7.webp";
import  Blood8 from "../assets/blood8.png";
import  Blood9 from "../assets/blood9.webp";
import  Blood10 from "../assets/blood10.jpg";



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


  const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      axios
        .get("http://127.0.0.1:8000/api/reviews/")
        .then((res) => setReviews(res.data))
        .catch((err) => console.error("Error fetching reviews:", err));
    }, []);
  
    const responsive = {
      desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
      tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
      mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };
  

  return (
    <>
      {/* === Hero Section === */}
      <div className="blood-animation-container">
        <canvas ref={canvasRef} id="bloodCanvas"></canvas>
        <div  id="title1">
          <h1>RED CONNECT</h1>
          <h3>
            Every donor is a hero without a cape
          </h3>
        </div>
      </div>

      {/* === About Section === */}
      <div id="id">
      <section className="aboutt">

        <div id="aboutt">
         <h4><i className="fa-solid fa-users"></i> About Us</h4>
          
          <p>We save lives through the power of blood donation.
          Connecting donors with those in need, every drop counts.
          Together, we build a healthier, caring community.
          Because giving blood means giving life.</p>
      
        </div>
        </section>

        <section id="aboutt">
        <div id="vission">
         <h4> <i className="fa-solid fa-eye"></i> Vission</h4>
           
          <p>Our vision is to create a world where no life is lost due to lack of blood.
          We strive to inspire voluntary blood donation as a social responsibility.
          By connecting hearts, we build a culture of compassion and care.
          </p>
        </div>
        </section>
        <section id="aboutt">
        <div id="mission">
          <h4><i className="fa-solid fa-bullseye"></i> Mission</h4>
             
          <p>Our mission is to promote safe and regular blood donation for all in need.
          We aim to bridge the gap between donors and recipients with trust and care.
          Through awareness and action, we empower communities to save lives.</p>
        </div>
        </section>

      </div>

      {/* === Why Donate Section === */}
      <div id="id1">
        <div>
          <img src={DonateImg} alt="donor" />
        </div>
        <div>
          <h1>Why Donate Blood ?</h1>
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

      {/* === Eligibility Section === */}
      <section id="eligibility">
      <div id="eligibility">
        <h3>Donors Eligibility</h3>
        <p>You should not be suffering from any of the following diseases or taking medicines for them</p>
        <ul>
          <li>Age: 18-65 years</li>
          <li>Weight: Minimum 50 kg</li>
          <li>Health: Generally healthy and free from infections</li>
          <li>Hemoglobin: At least 12.5 g/dL</li>
          <li>Interval: At least 8 weeks between donations</li>
          <li>Hepatitis B, C</li>
          <li>AIDS # Diabetes (are you under medication currently?)</li>
          <li>Fits/ Convulsions (are you under medication currently?)</li>
          <li>Cancer # Leprosy or any other infectious diseases</li>
          <li>Any allergies (Only if you are suffering from severe symptoms)</li>
          <li>Hemophilia/ Bleeding problems</li>
          <li>Small Pox Vaccination (within the last 3weeks)</li>
          <li>Hemoglobin deficiency / Anemia (recently)</li>
          <li>Blood Transfusion (within the last 6 months)</li>
          <li>Chicken Pox (within 1 year)</li>
        </ul>
      </div>
      </section>

       {/* === Image Slider === */}
       <h3 style={{ color: '#a30000',textAlign:'center',  fontSize: '2em'}}>OUR SERVICE</h3>
      <div className="slider d-flex justify-content-center align-items-center mt-4">
        <div className="slider_row d-flex">
          <div className="slider_column">
            <img src={Blood1} alt="1" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src={Blood2} alt="2" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src={Blood3} alt="3" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src={Blood4} alt="4" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src={Blood5} alt="5" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src={Blood6} alt="6" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src={Blood7} alt="7" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src={Blood8} alt="8" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src={Blood9} alt="9" className="img-fluid find" />
          </div>
          <div className="slider_column">
            <img src={Blood10} alt="10" className="img-fluid find" />
          </div>
        </div>
      </div>

      {/* === Reviews Section === */}
      <div style={{ padding: "10px", marginTop: "5%" }}>          
          <h2
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "28px",
              fontWeight: "700",
              color: "#440000",
            }}
          >
            Reviews
          </h2>
    
          {reviews.length === 0 ? (
            <p style={{ textAlign: "center", color: "#555" }}>No reviews yet.</p>
          ) : (
          <Carousel
          responsive={responsive}
          autoPlay
          infinite
          arrows={false}              
          showDots={false}           
          autoPlaySpeed={2000}        
          pauseOnHover={false}        
          customTransition="transform 1s ease-in-out"
          transitionDuration={2000}
          containerClass="carousel-container"
          >
           {reviews.map((r) => (
                <div
                  key={r.id}
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #f8eaea)",
                    padding: "5px",
                    margin: "12px",
                    borderRadius: "16px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    transition: "transform 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/*  Profile Picture */}
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      r.user_name
                    )}&background=random&color=fff&size=128`}
                    alt="profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px",
                      position: "relative",
                      bottom: "23px",
                      left: "10px",
                    }}
                  />
    
                  {/* RIGHT CONTENT */}
                  <div style={{ textAlign: "left", flex: 1 }}>
                    {/* Username */}
                    <h3
                      style={{
                        marginBottom: "6px",
                        color: "#b30000",
                        fontWeight: "700",
                        fontSize: "20px",
                      }}
                    >
                      {r.user_name}
                    </h3>
    
                    {/* Star Rating */}
                    <div style={{ display: "flex", marginBottom: "5px" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={18}
                          color={star <= r.rating ? "#FFD700" : "#ccc"}
                        />
                      ))}
                    </div>
    
                    {/* Comment */}
                    <p
                      style={{
                        opacity: 0.8,
                        maxWidth: "250px",
                        lineHeight: "1.4",
                        fontSize: "14px",
                        fontStyle: "italic",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      “{r.comment}”
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>  
    </>
  );
};

export default Homehero;
