import { useState } from "react";
import axios from "axios";
import "./review.css";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");

  const handleRating = (value) => setRating(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/reviews/", {
  user_name: username,
  rating: rating,
  comment: comment
});
      alert("Review submitted successfully!");
      setRating(0);
      setComment("");
      setUsername("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="review-container">
      <h2>Leave a Review</h2>

      {/* Username */}
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="name-input"
      />

      {/* Rating */}
      <div className="stars">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={value <= rating ? "star filled" : "star"}
            onClick={() => handleRating(value)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <textarea
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
