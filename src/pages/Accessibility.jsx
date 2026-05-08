import React from "react";
import "../styles/Accessibility.css";
import accessibilityImg from "../../public/assets/images/Accessibility.jpg";

const Accessibility = () => {
  return (
    <div className="accessibility-page">

      {/* Full width breadcrumb */}
      {/* Full widthhaiu*/}
      <div className="accessibility-breadcrumb">
        <span>You are here :</span>
        <a href="/"> Home</a>
        <span> / Accessibility</span>
      </div>

      {/* Main content */}
      <div className="accessibility-wrapper">
        <h2 className="accessibility-title">Accessibility Statement</h2>
        <div className="accessibility-underline"></div>

        <div className="accessibility-row">
          {/* Left text */}
          <div className="accessibility-text">
            <p>
              We are committed to ensure that the Mobile Seva portal is accessible
              to all users irrespective of device in use, technology or ability.
              It has been built, with an aim, to provide maximum accessibility
              and usability to its visitors. As a result this portal can be
              viewed from a variety of devices such as Desktop / Laptop
              computers, web-enabled mobile devices, etc.
            </p>

            <p>
              We have put in our best efforts to ensure that all information on
              this portal is accessible to people with disabilities. For
              example, a user with visual disability can access this portal
              using assistive technologies, such as screen readers and screen
              magnifiers.
            </p>

            <p>
              We also aim to be standards compliant and follow principles of
              usability and universal design, which should help all visitors
              of this portal.
            </p>

            <p>
              This portal is designed using Transitional to meet Guidelines
              for Indian Government Websites and also adheres to level A of
              the Web Content Accessibility Guidelines (WCAG) 2.0 laid down
              by the World Wide Web Consortium (W3C). Part of the information
              in the portal is also made available through links to external
              Websites. External Websites are maintained by the respective
              departments who are responsible for making these sites
              accessible.
            </p>
          </div>

          {/* Right image */}
          <div className="accessibility-image">
            <img src={accessibilityImg} alt="Accessibility" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;