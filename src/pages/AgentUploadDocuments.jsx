import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "../styles/Upload.css";
import { apiPost, apiGet } from "../api/api";

const AgentUploadDocuments = () => {
  const navigate = useNavigate();

   /* ================= STEP HANDLING ================= */
 const completedStep = Number(localStorage.getItem("completedStep") || 0);


  const steps = [
  { name: "Agent Detail", path: "/applicant-details" },
  { name: "Upload Documents", path: "/agent-upload-documents" },
  { name: "Preview", path: "/agent-preview" },
  { name: "Payment", path: "/agent-payment" },
  { name: "Acknowledgement", path: "/agent-acknowledgement" },
];

//const currentStep = 2; // Upload Documents page index
useEffect(() => {
  const prev = Number(localStorage.getItem("completedStep") || 0);

  // Upload page = step 2
  if (prev < 2) {
    localStorage.setItem("completedStep", "2");
  }
}, []);


useEffect(() => {
  const agentId = localStorage.getItem("agentId");
  if (!agentId) return;

  apiGet(`/api/agent/preview/${agentId}`).then((res) => {
    if (res.success && res.data) {
      setFiles({
        itrYear1: res.data.itr_year1 || null,
        itrYear2: res.data.itr_year2 || null,
        itrYear3: res.data.itr_year3 || null,
      });
    }
  });
}, []);

  const [files, setFiles] = useState({
    itrYear1: null,
    itrYear2: null,
    itrYear3: null,
  });

  const [agree, setAgree] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [navigateAfterPopup, setNavigateAfterPopup] = useState(false);

  /* ---------- HANDLERS ---------- */
  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const closePopup = () => {
    setPopup({ show: false, message: "" });

    if (navigateAfterPopup) {
      navigate("/agent-preview");
    }
  };

  /* ---------- SAVE & CONTINUE ---------- */
  const handleSaveAndContinue = async () => {
    if (!files.itrYear1)
      return setPopup({ show: true, message: "Please upload ITR Year 1" });

    if (!files.itrYear2)
      return setPopup({ show: true, message: "Please upload ITR Year 2" });

    if (!files.itrYear3)
      return setPopup({ show: true, message: "Please upload ITR Year 3" });

    if (!agree)
      return setPopup({
        show: true,
        message: "Please accept the declaration",
      });

    const agentId = localStorage.getItem("agentId");
    if (!agentId) {
      return setPopup({
        show: true,
        message: "Agent ID missing. Please complete Step 1 again.",
      });
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("agent_id", agentId);
      formData.append("itrYear1", files.itrYear1);
      formData.append("itrYear2", files.itrYear2);
      formData.append("itrYear3", files.itrYear3);

      const response = await apiPost(
        "/api/agent/register-step2",
        formData
      );

      if (response.success) {
        setPopup({
          show: true,
          message: "Documents Uploaded Successfully",
        });
        setNavigateAfterPopup(true);
      } else {
        setPopup({
          show: true,
          message: response.message || "Failed to upload documents",
        });
      }
    } catch (error) {
      console.error(error);
      setPopup({
        show: true,
        message: "Error while uploading documents",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="ud-wrapper">
      <div className="ud-main">
        {/* ===== BREADCRUMB ===== */}
        <div className="ud-breadcrumb">
          You are here :
       <a href="/"> <span className="ud-link"> Home </span> </a>/
        <span> Registration </span> / 
          <span className="ud-current"> Real Estate Agent Registration</span>
        </div>

        <div className="ud-content">
          <h2 className="ud-title">Real Estate Agent Registration</h2>


<div className="applicantdetails-stepper">
  {[
    { label: "Agent Detail", step: 1, path: "/applicant-details" },
    { label: "Upload Documents", step: 2, path: "/agent-upload-documents" },
    { label: "Preview", step: 3, path: "/agent-preview" },
    { label: "Payment", step: 4, path: "/agent-payment" },
    { label: "Acknowledgement", step: 5, path: "/agent-acknowledgement" },
  ].map((item) => {
    const isClickable =
      item.step <= completedStep && item.step !== 4;

    return (
      <div
        key={item.step}
        className="applicantdetails-step"
        style={{
          cursor: isClickable ? "pointer" : "not-allowed",
          opacity: isClickable ? 1 : 0.4,
        }}
        onClick={() => {
          if (!isClickable) return;
          navigate(item.path);
        }}
      >
        <div
          className={`applicantdetails-circle ${
            item.step <= completedStep ? "active" : ""
          }`}
        >
          {item.step}
        </div>
        <span>{item.label}</span>
      </div>
    );
  })}
</div>


          {/* ===== TABLE ===== */}
          <table className="ud-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Upload Document</th>
                <th>Uploaded Document</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Income Tax Return – Year 1 <span style={{ color: "red" }}>*</span></td>
                <td>
                  <input
                    type="file"
                    name="itrYear1"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </td>
                <td>{files.itrYear1?.name || files.itrYear1}</td>
              </tr>

              <tr>
                <td>Income Tax Return – Year 2 <span style={{ color: "red" }}>*</span></td>
                <td>
                  <input
                    type="file"
                    name="itrYear2"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </td>
                <td>{files.itrYear2?.name || files.itrYear2}</td>
              </tr>

              <tr>
                <td>Income Tax Return – Year 3 <span style={{ color: "red" }}>*</span></td>
                <td>
                  <input
                    type="file"
                    name="itrYear3"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </td>
                <td>{files.itrYear3?.name || files.itrYear3}</td>
              </tr>
            </tbody>
          </table>

          {/* ===== DECLARATION ===== */}
          <label className="ud-declaration">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            &nbsp; I / We solemnly affirm that the above information is correct
          </label>

          <div className="form-footer-row">
  <button
    type="button"
    className="applicant-back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>

          {/* ===== BUTTON ===== */}
          <div className="ud-btn-row">
            <button
              className="ud-btn"
              onClick={handleSaveAndContinue}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Save And Continue"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== POPUP ===== */}
      {popup.show && (
        <div className="ud-modal-overlay">
          <div className="ud-modal">
            <button className="ud-modal-close" onClick={closePopup}>
              ×
            </button>
            <p>{popup.message}</p>
            <button className="ud-modal-ok" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AgentUploadDocuments;