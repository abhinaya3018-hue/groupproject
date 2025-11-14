import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/reviews/")
      .then(res => setReviews(res.data))
      .catch(err => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <div style={{ padding: "20px",marginTop:"10%" }}>
      <h2> User Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((r) => (
            <li key={r.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "8px", paddingBottom: "5px" }}>
              <strong>{r.user_name}</strong> — {r.rating}⭐  
              <p>{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
