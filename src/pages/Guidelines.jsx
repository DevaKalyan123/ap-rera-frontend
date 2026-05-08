import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/guidelines.css";

export default function Guidelines() {
      const navigate = useNavigate();
  return (
    <div className="guidelines-container">

      <div className="guidelines-breadcrumb">
        You are here : <span>Home</span> / <span>Registration</span> / Guidelines for Registration
      </div>

      {/* STEP 1 */}
      <div className="guideline-card">
        <div className="guidelines-step-box guidelines-step1">STEP 1</div>

        <div className="guideline-content">
          <p>
            Download the forms for Project/Agent/Complaint Registration from the link given below.
          </p>

          <ul>
            <li>
              Application form for Project/Agent/Complaint Registration
                            <span
    className="guidelines-pr-link"
    onClick={() => navigate("/formsdownload")}
  > Click Here</span>
            </li>
          </ul>

          <p className="guidelines-note">
            <b>NOTE :</b> The documents and drawings must be self-attested and in PDF Format (70MB),
            Photo in JPEG Format (35mm x 45mm, 300DPI, straight view / light background)
          </p>
        </div>

        <div className="guidelines-icon-box guidelines-icon1">
          <i className="fa fa-download"></i>
        </div>
      </div>

      {/* STEP 2 */}
      <div className="guideline-card">
        <div className="guidelines-step-box guidelines-step2">STEP 2</div>

        <div className="guideline-content">
          Fill the required application form printable/digital, it would be more useful during the
          submission for online application.
        </div>

<div className="guidelines-icon-box guidelines-icon2">
  <i className="fa-regular fa-file-lines"></i>
</div>
      </div>

      {/* STEP 3 */}
      <div className="guideline-card">
        <div className="guidelines-step-box guidelines-step3">STEP 3</div>

        <div className="guideline-content">
          For better understanding of registration screens verify the below user manuals and videos tutorials.
          <ul>
            <li>
              User manuals for Project / Agent / Complaint Registration
                            <span
    className="guidelines-pr-link"
    onClick={() => navigate("/usermanual")}
  > Click Here</span>
            </li>
            <li>
              Video tutorials
                            <span
    className="guidelines-pr-link"
    onClick={() => navigate("/videoTutorial")}
  > Click Here</span>
            </li>
          </ul>
        </div>

<div className="guidelines-icon-box guidelines-icon3">
  <i className="fa-solid fa-bullhorn"></i>
</div>

      </div>

    </div>
  );
}
