import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RenewalStepper from "../components/RenewalStepper";
import "../styles/RenewalNewCertificate.css";

function RenewalNewCertificate() {

  const { renewalId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Please upload certificate PDF");
      return;
    }

    // TODO: API call here
    console.log("Uploaded File:", file);

    alert("Certificate uploaded successfully");

    navigate("/"); // or next page
  };

  return (

    <div className="renewal-page-wrapper">

      {/* Breadcrumb */}
      <div className="renewalcertificate-breadcrumb-bar">
        You are here :
        <a href="/" className="renewalcertificate-breadcrumb-link">Home</a> /
        <span> Registration</span> /
        <span> New Certificate</span>
      </div>

      {/* Stepper */}
      <div className="stepper-wrapper">
        <RenewalStepper step={4} />
      </div>

      <div className="certificate-container">

        <h2 className="certificate-title">Upload New Certificate</h2>

        <div className="certificate-card">

          <label className="file-label">
            Choose Certificate (PDF only)
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />

          {file && (
            <p className="file-name">
              Selected: {file.name}
            </p>
          )}

          <button
            className="upload-btn"
            onClick={handleSubmit}
          >
            Upload Certificate
          </button>

        </div>

        <div className="back-btn-wrapper">
          <button
            className="upload-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

      </div>

    </div>

  );

}

export default RenewalNewCertificate;