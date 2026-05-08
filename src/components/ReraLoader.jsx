import React from "react";
import "../styles/ReraLoader.css";
import reraLogo from "../../public/assets/images/aprera-logo.png"; // ✅ correct

const ReraLoader = () => {
  return (
    <div className="ap-rera-overlay">
      <div className="ap-rera-loader">
        {/* Rotating outer ring */}
        <div className="ap-rera-spinner"></div>

        {/* Inner white circle */}
        <div className="ap-rera-center">
          <img src={reraLogo} alt="AP RERA" />
        </div>
      </div>
    </div>
  );
};

export default ReraLoader;