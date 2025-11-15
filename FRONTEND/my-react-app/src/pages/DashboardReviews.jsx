import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function DashboardReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/reviews/")
      .then(res => setReviews(res.data))
      .catch(err => console.error("Error fetching reviews:", err));
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  return (
    <div style={{ padding: "40px", marginTop: "5%" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <Carousel responsive={responsive} autoPlay infinite>
          {reviews.map((r) => (
            <div 
              key={r.id} 
              style={{
                background: "#fff",
                padding: "20px",
                margin: "10px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                textAlign: "center"
              }}
            >
              <h3 style={{ marginBottom: "5px", color: "#ff4b4b" }}>{r.user_name}</h3>
              <p style={{ fontSize: "20px" }}>{r.rating} ⭐</p>
              <p style={{ opacity: 0.8 }}>{r.comment}</p>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
