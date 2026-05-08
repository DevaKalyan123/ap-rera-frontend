import React, { useState } from "react";
import StarRating from "../components/StarRating";
import "../styles/RateWebsite.css";

const RateWebsite = () => {
  const [ratings, setRatings] = useState({
    easy: 0,
    relevant: 0,
    satisfied: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ratings.easy || !ratings.relevant || !ratings.satisfied) {
      alert("Please rate all mandatory questions");
      return;
    }

    alert("Thank you for your feedback 😊");
  };

  const handleReset = () => {
    setRatings({ easy: 0, relevant: 0, satisfied: 0 });
  };

  return (
    <div className="rate-page">
      {/* HEADER */}
      <div className="rate-header">
        <h2>RATE OUR WEBSITE</h2>
        <p>(FOR BETTER CLIENT CARE OPERATION)</p>
      </div>

      {/* FORM */}
      <form className="rate-wrapper" onSubmit={handleSubmit}>
        <div className="rate-row">
          <StarRating
            label="Is the information easy to understand?"
            value={ratings.easy}
            onChange={(v) => setRatings({ ...ratings, easy: v })}
          />

          <StarRating
            label="Are the contents relevant to your needs?"
            value={ratings.relevant}
            onChange={(v) => setRatings({ ...ratings, relevant: v })}
          />
        </div>

        <div className="rate-row">
          <StarRating
            label="How satisfied are you with the information provided?"
            value={ratings.satisfied}
            onChange={(v) => setRatings({ ...ratings, satisfied: v })}
          />

          {/* COMMENTS SECTION */}
          <div className="comment-box">
            <p className="comment-title">
              Please give us your comments (Optional)
            </p>

            {/* ✅ THIS PART WAS MISSING */}
            <p className="comment-info">
              If you would like us to contact you regarding your comments,
              please include your contact details. (Optional)
            </p>

            <input type="text" placeholder="Name (Optional)" />
            <input type="text" placeholder="Mobile (Optional)" />
            <textarea placeholder="Your Comments (Optional)" />
          </div>
        </div>

        <div className="rate-buttons">
          <button type="submit" className="btn-submit">Submit</button>
          <button type="button" className="btn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default RateWebsite;