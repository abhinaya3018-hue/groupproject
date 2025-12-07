import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import { FaStar } from "react-icons/fa"; 
import "react-multi-carousel/lib/styles.css";

export default function DashboardReviews() {
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
        <Carousel responsive={responsive} autoPlay infinite>
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
              {/* LEFT: Profile Picture */}
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
  );
}
