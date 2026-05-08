import React from "react";
import "../styles/Disclaimer.css";
import disclaimerImg from "../../public/assets/images/Disclaimer.jpg";

const Disclaimer = () => {
  return (
    <div className="disclaimer-page">

      {/* Full width breadcrumb */}
      <div className="disclaimer-breadcrumb">
        <span>You are here :</span>
        <a href="/"> Home</a>
        <span> / Disclaimer</span>
      </div>

      {/* Main content */}
      <div className="disclaimer-wrapper">
        <h2 className="disclaimer-title">Disclaimer</h2>
        <div className="disclaimer-underline"></div>

        <div className="disclaimer-row">
          {/* Left text */}
          <div className="disclaimer-text">
            <p>
              This website of the APRERA is being maintained for information and
              online registrations and dispute redressal for real estate
              stakeholders as well as to promote real estate sector purposes
              only. Even though every effort is taken to provide accurate and up
              to date information, officers making use of the circulars posted on
              the website are advised to get in touch with APRERA whenever there
              is any doubt regarding the correctness of the information
              contained therein.
            </p>

            <p>
              In the event of any conflict between the contents of the circulars
              on the website and the hard copy of the circulars issued by
              APRERA, the information in the hard copy should be relied upon and
              the matter shall be brought to the notice of the APRERA.
            </p>

            <p>
              APRERA shall not be liable for any loss or damage whatsoever,
              including incidental or consequential loss or damage, arising out
              of, or in connection with, any use of or reliance on the
              information from this website. In case of doubt or query, users
              are requested to refer to the original documents by contacting
              the issuing authority.
            </p>

            <p className="disclaimer-warning">
              "The emblem/logo displayed in the website is not yet specified by
              Government, under rule 24(3) of the AP rules 2017. This is only a
              tentative representation for a while"
            </p>
          </div>

          {/* Right image */}
          <div className="disclaimer-image">
            <img src={disclaimerImg} alt="Disclaimer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;