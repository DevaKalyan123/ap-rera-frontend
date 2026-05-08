import React, { useState } from "react";
import "../styles/StarRating.css";

const emojiMap = {
  1: "😭",
  2: "😞",
  3: "😐",
  4: "😊",
  5: "😄",
};

const StarRating = ({ label, value, onChange }) => {
  const [hover, setHover] = useState(0);
  const activeRating = hover || value;

  return (
    <div className="rating-box">
      <p className="rating-question">
        {label} <span>*</span>
      </p>

      <p className="rating-note">(1 = Not easy; 5 = Very easy)</p>

      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`bi ${
              star <= activeRating ? "bi-star-fill active" : "bi-star"
            }`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>

      {value > 0 && (
        <div className="rating-emoji">{emojiMap[value]}</div>
      )}
    </div>
  );
};

export default StarRating;