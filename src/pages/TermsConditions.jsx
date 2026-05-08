import React from "react";
import "../styles/TermsConditions.css";
import termsImg from "../../public/assets/images/termes_conditions.jpg";

const TermsConditions = () => {
  return (
    <div className="terms-page">

      {/* Breadcrumb */}
      <div className="terms-breadcrumb">
        <span>You are here :</span>
        <a href="/"> Home</a>
        <span> / Terms and Conditions</span>
      </div>

      {/* Body Wrapper */}
      <div className="terms-body">

        <h2 className="terms-title animate-title">
          Terms And Conditions
        </h2>

        <div className="terms-underline animated-line"></div>

        <div className="terms-content-row">

          {/* LEFT CONTENT */}
          <div className="terms-text fade-left">
            <p>
              This website is designed, developed and maintained by Andhra
              Pradesh Real Estate Regulatory Authority. The content for the
              website is provided by Andhra Pradesh Real Estate Regulatory
              Authority and by accessing this website, you unconditionally
              accept to be legally bound by the terms and conditions. If you do
              not agree to the mentioned terms and conditions, please do not
              access the website.
            </p>

            <p>
              Efforts have been made to ensure the accuracy and currency of the
              content on this website; however, the same should not be
              interpreted as a statement of law or used for any legal purposes.
              In case of any ambiguity or doubts, users are advised to verify /
              check with the concerned Department(s).
            </p>

            <p>
              Under no circumstances Andhra Pradesh Real Estate Regulatory
              Authority will be liable for any expense, loss or damage including,
              without limitation, indirect or consequential loss arising out of
              the use of this website.
            </p>

            <p>
              These terms shall be governed by Indian Laws and disputes shall be
              subject to the jurisdiction of courts of India.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="terms-image fade-right">
            <img src={termsImg} alt="Terms and Conditions" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsConditions;