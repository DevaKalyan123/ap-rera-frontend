import React from "react";
// import "./aprera.css";
import "../styles/aprera.css";

export default function Aprea() {
  return (
    <div className="aprer-wrapper">
      <div className="aprer-page">
        <div className="aprer-breadcrumb">
          You are here : <span>Home</span> / <span>About Us</span> /{" "}
          <span>What is APRERA</span>
        </div>

        <div className="aprer-layout">
          {/* LEFT CONTENT */}
          <div>
            <h2>About Andhra Pradesh RERA</h2>
            <div className="aprer-line"></div>

            <p>
              Welcome to Andhra Pradesh Real Estate Regulatory Authority. This portal has been developed under section 4.3 of the Real Estate (Regulation & Development) Act, 2016. The department of Municipal Administration & Urban Development, Government of Andhra Pradesh is the nodal department for the implementation of RERA Act in the state of Andhra Pradesh.
            </p>

            <p>
              All sections of the Real Estate (Regulation & Development) Act, 2016 came into force with effect from 1st May, 2017. The Andhra Pradesh Real Estate (Regulation & Development) Rules, 2017 was approved by Government of Andhra Pradesh and notified on March 27, 2017.
            </p>

            <h3>About The Real Estate (Regulation & Development) Act, 2016</h3>
            <div className="aprer-line"></div>

            <p>
              The Real Estate (Regulation & Development) Act, 2016 is considered as one of the landmark legislations passed by the Government of India. Its objective is to reform the real estate sector in India, encouraging greater transparency, citizen centricity, accountability and financial discipline. This is in line with the vast and growing economy of India as in future many people will be investing in real estate sector
            </p>

            <h4>The key objectives of the Act are</h4>
            <ul>
              <li>Ensuring Transparency & Efficiency in real estate sector in regards to sale of plot, apartment, building or real estate project.</li>
              <li>Protecting the interest of consumers in real estate sector</li>
              <li>
                Establishing adjudicating mechanism for speedy dispute redressal
              </li>
              <li>
                Establishing Appellate Tribunal to hear appeals from the decisions, directions or orders of the Real Estate Regulatory Authority
              </li>
            </ul>

            <h4>The Salient Features of this Act are</h4>
            <div className="aprer-grid">
            <ul>
              <li>
                It establishes the State Real Estate Regulatory Authority as the government body to be approached for redressal of grievances against any builder.
              </li>
              <li>
                This law vests authority on the real estate regulator to govern both residential and commercial real estate transactions
              </li>
              <li>
                This law makes it mandatory for developers to post all information on issues such as project plan, layout, government approvals, land title status, sub-contractors to the project, schedule for completion with the AP Real Estate Regulatory Authority (APRERA) and then in effect pass this information on to the consumers
              </li>
              <li>
                The maximum imprisonment term for a developer who violates the order of the appellate tribunal of the RERA is three years with or without a fine
              </li>
              <li>
               Currently, if a project is delayed, then the developer does not suffer in any way. Now, the law ensures that any delay in project completion will make the developer liable to pay the same interest as the EMI being paid by the consumer to the bank back to the consumer
              </li>
              <li>
                The developer can not make any changes to the plan that had been sold without the written consent of the buyer
              </li>
              <li>
                Every project measuring more than 500 square meters of site area or more than eight apartments will have to be registered with the RERA
              </li>
            </ul>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="aprer-images">
            <img src="../../public/assets/images/building1.jpg"/>
            <img src="../../public/assets/images/building.png" />
          </div>
        </div>
      </div>
    </div>
  );
}