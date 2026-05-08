import React from "react";
import "../styles/CopyrightPolicy.css";
import copyrightImg from "../../public/assets/images/copyright.jpg";

const CopyrightPolicy = () => {
  return (
    <div className="copyright-page">
      {/* Breadcrumb */}
      <div className="copyright-breadcrumb-wrapper">
        <div className="copyright-breadcrumb">
          <span>You are here :</span>
          <a href="/"> Home</a>
          <span> / Copyright Policy</span>
        </div>
      </div>

      {/* Content */}
      <div className="copyright-container">
        <h1 className="copyright-title">Copyright Policy</h1>
        <div className="copyright-underline"></div>

        <div className="copyright-content">
          <div className="copyright-text copyright-slide-left">
            <p>
              Contents of this website may not be reproduced partially or fully,
              without due permission from NIC. If referred to as a part of another
              website, the source must be appropriately acknowledged.
            </p>

            <p>
              The contents of this website cannot be used in any misleading or
              objectionable context.
            </p>
          </div>

          <div className="copyright-image copyright-slide-right">
            <img src={copyrightImg} alt="Copyright Policy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightPolicy;