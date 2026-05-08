import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/agentDetail.css";
import { apiPost } from "../api/api"; // ✅ ADD THIS

const steps = [
  "Agent Detail",
  "Upload Documents",
  "Preview",
  "Payment",
  "Acknowledgement",
];

const AgentDetail = () => {
  const navigate = useNavigate();

  const [agentType, setAgentType] = useState("");
  const [pan, setPan] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // ✅ ADD THIS
  const [panError, setPanError] = useState("");
  /* ================= GET DETAILS ================= */
  const handleGetDetails = async () => {
    // Agent type validation
    if (!agentType) {
      setPopupMessage("Please select Agent Type");
      setShowPopup(true);
      return;
    }

    // PAN validation
   // PAN format validation
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

if (!panRegex.test(pan)) {
  setPopupMessage("Please enter valid PAN (Format: ABCDE1234F)");
  setShowPopup(true);
  return;
}

    try {
      // ✅ CALL PAN CHECK API
      const response = await apiPost("/api/agent/check-pan", { pan });

      // ❌ PAN EXISTS → BLOCK NAVIGATION
      if (response.success && response.exists) {
        setPopupMessage(
          "An application already exists for this PAN number. You cannot create a new application."
        );
        setShowPopup(true);
        return; // ⛔ STOP HERE
      }

      // ✅ PAN DOES NOT EXIST → ALLOW NAVIGATION
      // navigate("/applicant-details", { state: { agentType, pan } });
      // ✅ PAN DOES NOT EXIST → NAVIGATE BASED ON AGENT TYPE
if (agentType === "Individual") {
  navigate("/applicant-details", { state: { agentType, pan } });
} else if (agentType === "Other") {
  navigate("/AgentDetails", { state: { agentType, pan } });
}


    } catch (error) {
      setPopupMessage("Error while checking PAN. Please try again.");
      setShowPopup(true);
    }
  };

  return (
    <div className="agent-new-page">
       <div className="agent-new-container">
      <div className="agent-new-outer-box">
        <div className="agent-new-breadcrumb-box">
           You are here :
        <a href="/"> <span className="agent-new-crumb-link"> Home </span> </a>/
        <span> Registration </span> /
          <span> Real Estate Agent Registration</span>
        </div>

        <h2 className="agent-new-page-title">Real Estate Agent Registration</h2>

        <div className="agent-new-stepper-box">
          <div className="agent-new-stepper-line"></div>
          {steps.map((step, index) => (
            <div className="agent-new-stepper-item" key={index}>
              <div className={`agent-new-stepper-circle ${index === 0 ? "active" : ""}`}>
                {index + 1}
              </div>
              <div className="agent-new-stepper-text">{step}</div>
            </div>
          ))}
        </div>

        <div className="agent-new-form-box">
          <h3 className="agent-new-section-title">Agent Type</h3>

          <div className="agent-new-type-row">
            <label>
              <input
                type="radio"
                name="agentType"
                value="Individual"
                checked={agentType === "Individual"}
                onChange={() => setAgentType("Individual")}
              />
              &nbsp;Individual
            </label>

            <label>
              <input
                type="radio"
                name="agentType"
                value="Other"
                checked={agentType === "Other"}
                onChange={() => setAgentType("Other")}
              />
              &nbsp;Other than individual
            </label>
          </div>

          <div className="agent-new-pan-wrapper">
            <div className="agent-new-pan-input-group">
  <label>
    PAN Card Number <span className="agent-new-required">*</span>
  </label>

  <input
    type="text"
    value={pan}
    maxLength={10}
   onChange={(e) => {
  const value = e.target.value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, ""); // prevents special characters

  setPan(value);

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (value.length === 10) {
    if (!panRegex.test(value)) {
      setPanError("PAN format must be ABCDE1234F");
    } else {
      setPanError("");
    }
  } else {
    setPanError("");
  }
}}
    placeholder="ABCDE1234F"
  />

  {panError && (
    <small className="agent-new-text-danger">{panError}</small>
  )}
</div>

            <button className="agent-new-btn-primary" onClick={handleGetDetails}>
              Get Details
            </button>
          </div>
        </div>
      </div>

      {/* ===== POPUP ===== */}
      {showPopup && (
        <div className="agent-new-modal-overlay">
          <div className="agent-new-modal-box">
            <span
              className="agent-new-modal-close"
              onClick={() => setShowPopup(false)}
            >
              ×
            </span>

            <p>{popupMessage}</p>

            <button
              className="agent-new-btn-primary"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AgentDetail;