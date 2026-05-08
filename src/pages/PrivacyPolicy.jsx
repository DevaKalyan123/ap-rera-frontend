import React from "react";
import "../styles/PrivacyPolicy.css";
import privaccy from "../../public/assets/images/privaccy.jpg";

const PrivacyPolicy = () => {
  return (
    <div className="privacypolicy-page">
      {/* Breadcrumb */}
      <div className="privacypolicy-breadcrumb">
        <span>You are here :</span>
        <a href="/"> Home</a>
        <span> / Privacy Policy</span>
      </div>

      {/* Main Content */}
      <div className="privacypolicy-container">
        <h1 className="privacypolicy-title">Privacy Policy</h1>
        <div className="privacypolicy-title-underline"></div>

        <div className="privacypolicy-content">
          {/* Text Section */}
          <div className="privacypolicy-text privacypolicy-fade-in-left">
            <p>
              We do not collect personal information for any purpose other than
              to respond to you (for example, to respond to your queries). If you
              choose to provide us with personal information like filling out a
              Contact Us form with an e-mail address or postal address, and
              submitting it to us through the website, we use that information
              to respond to your message and help you get the information you
              have requested.
            </p>

            <p>
              Our website never collects information or creates individual
              profiles for commercial marketing. While you must provide an
              e-mail address for a localized response to any incoming questions
              or comments, we recommend that you do <strong>NOT</strong> include
              any other personal information.
            </p>
          </div>

          {/* Image Section */}
          <div className="privacypolicy-image privacypolicy-fade-in-right">
            <img src={privaccy} alt="Privacy Policy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;