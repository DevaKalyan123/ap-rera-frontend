import React from "react";
import "../styles/Testimonials.css";
import workInProgress from "../../public/assets/images/work-in-progress.jpg";

const Testimonials = () => {
  return (
    <div className="outer-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        You are here : <span>Home</span> / <span className="active">Work in Progress</span>
      </div>

      {/* Inner Box */}
      <div className="inner-container">
        <img
          src={workInProgress}
          alt="Work In Progress"
          className="work-image"
        />
      </div>
    </div>
  );
};

export default Testimonials;