import React from "react";
import "../styles/HyperlinkingPolicy.css";
import hyperlinkImg from "../../public/assets/images/hyperlink.jpg";

const HyperlinkingPolicy = () => {
  return (
    <div className="hyperlink-page">
      {/* Breadcrumb */}
      <div className="hyperlink-breadcrumb">
        <span>You are here :</span>
        <a href="/"> Home</a>
        <span> / Hyperlinking Policy</span>
      </div>

      {/* Content Card */}
      <div className="hyperlink-container">
        <h1 className="hyperlink-title">Hyperlinking Policy</h1>
        <div className="hyperlink-underline"></div>

        <div className="hyperlink-content">
          {/* Text */}
          <div className="hyperlink-text hyperlink-slide-left">
            <p>
              We do not object to you linking directly to the information that is
              hosted on our site and no prior permission is required for the
              same. However, we would like you to inform us about any links
              provided to our site so that you can be informed of any changes or
              updations therein.
            </p>

            <p>
              Also, we do not permit our pages to be loaded into frames on your
              site. Our website&apos;s pages must load into a newly opened
              browser window of the user.
            </p>
          </div>

          {/* Image */}
          <div className="hyperlink-image hyperlink-slide-right">
            <img src={hyperlinkImg} alt="Hyperlinking Policy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HyperlinkingPolicy;