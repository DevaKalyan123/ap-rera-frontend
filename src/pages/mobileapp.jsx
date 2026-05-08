import React from "react";
import "../styles/mobileapp.css";
import WorkInProgress from "../assets/images/work-in-progress.jpg"

const MobileApp = () => {
  return (
    <div className="ma-container">

      {/* Breadcrumb */}
      <div className="ma-breadcrumb">
        <span>You are here :</span>
        <a href="/">Home</a>
        <span>/</span>
        <span className="ma-active">Work in Progress</span>
      </div>

      <div>
        {/* Main Content */}
        <div className="ma-box">
          <img src={WorkInProgress} alt="Construction" />
        </div>
      </div>

    </div>
  );
};

export default MobileApp;