import "../styles/AgentRegistration.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const steps = [
  "Agent Detail",
  "Upload Documents",
  "Preview",
  "Payment",
  "Acknowledgement",
];

const AgentRegistration = () => {
  const navigate = useNavigate();

  const [applicationType, setApplicationType] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    if (!applicationType) {
      setShowPopup(true);
      return;
    }

    if (applicationType === "New") {
      navigate("/agent-detail-new");
    } else {
      navigate("/agent-detail-existing");
    }
  };

  return (
    <div className="agent-reg-wrapper">
      {/* NEW BORDER WRAPPER */}
  <div className="agent-reg-border-box">
      {/* BREADCRUMB */}
      <div className="agent-reg-breadcrumb-box">
        You are here :
       <a href="/"> <span className="agent-reg-link"> Home </span> </a>/
        <span> Registration </span> /
        <span> Real Estate Agent Registration</span>
      </div>

      {/* MAIN BOX */}
      <div className="agent-reg-main-container">
        <h2 className="agent-reg-page-title">Real Estate Agent Registration</h2>

        {/* STEPPER */}
        <div className="agent-reg-step-box">
          <div className="agent-reg-step-line"></div>
          {steps.map((step, index) => (
            <div className="agent-reg-step-item" key={index}>
              <div
                className={`agent-reg-step-circle ${
                  index === 0 ? "agent-reg-active" : ""
                }`}
              >
                {index + 1}
              </div>
              <p>{step}</p>
            </div>
          ))}
        </div>

        {/* INSTRUCTIONS */}
        <div className="agent-reg-instructions">
         <h3>General Instructions :</h3>
<ol>
  <li>
    This is not a mobile App (however can be viewed on mobile screen) so kindly
    use laptop/desktop for use of this site.
  </li>

  <li>Clear the cookies before filling the online form.</li>

  <li>Remove pop-up block from your browser.</li>

  <li>
    Photograph – Passport size (35mm × 45mm, 300 DPI, Straight view/Light
    background) and in JPEG format.
  </li>

  <li>
    All the documents that are to be uploaded in the application should be in
    PDF format and should not be password protected, Drawings in DWG format and
    self-attested (every page of every document).
  </li>

  <li>
    Site best viewed in "Google Chrome (Version 62.0.3202.94)".
  </li>

  <li>Fields marked with * are mandatory.</li>
</ol>

<h3>Guide to fill online registration form :</h3>
<ol>
  <li>
    For step by step understanding of filing online application, kindly refer{" "}
    <Link to="/guidelines" className="agent-reg-guideline-link">
      Guidelines for Registration
    </Link>{" "}
    page.
  </li>

  <li>
    Select "New" as application type, if you are a new applicant.
  </li>

  <li>
    Select "Existing" as application type, if application was incomplete /
    Shortfall / Withdraw / Change Request.
  </li>

  <li>
    The entire form is divided to various parts with "Save and Continue"
    facilities for each part.
  </li>

  <li>
    <span className="agent-reg-red-text">List of Address Proof:</span>{" "}
    Aadhaar / Ration Card / Bank Book / Driving License / Voter Id /
    Gas / Phone Bill / Passport (Any one)
  </li>
</ol>

        </div>

        {/* APPLICATION TYPE */}
        <div className="agent-reg-application-row">
          <div className="agent-reg-application-type">
            <b>Application Type *</b>

            <label>
              <input
                type="radio"
                name="applicationType"
                checked={applicationType === "New"}
                onChange={() => setApplicationType("New")}
              />
              New
            </label>

            <label>
              <input
                type="radio"
                name="applicationType"
                checked={applicationType === "Existing"}
                onChange={() => setApplicationType("Existing")}
              />
              Existing
            </label>
          </div>

          <button
            type="button"
            className="agent-reg-submit-btn"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        </div>
      </div>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="agent-reg-modal-overlay">
          <div className="agent-reg-modal-box">
            <span
              className="agent-reg-modal-close"
              onClick={() => setShowPopup(false)}
            >
              ×
            </span>
            Select Application Type
          </div>
          
        </div>
      )}
    </div>
  );
};

export default AgentRegistration;