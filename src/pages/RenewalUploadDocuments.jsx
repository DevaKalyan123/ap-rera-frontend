import { useState } from "react";
import { uploadDocument } from "../api/renewalApi";
import { useParams, useNavigate } from "react-router-dom";
import RenewalStepper from "../components/RenewalStepper";
import "../styles/renewalUpload.css";

function RenewalUploadDocuments() {

  const { renewalId } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState({
    request_letter: null,
    form_e: null
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    // file size validation
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    // file type validation
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF / PNG / JPG allowed");
      return;
    }

    setDocuments({
      ...documents,
      [e.target.name]: file
    });

  };

  const handleUpload = async () => {

    const formData = new FormData();

    // add renewal id
    formData.append("renewal_id", renewalId);

    // add all selected documents
    Object.keys(documents).forEach((key) => {
      if (documents[key]) {
        formData.append(key, documents[key]);
      }
    });

    try {

      setLoading(true);

      await uploadDocument(formData);

      alert("Documents uploaded successfully");

      navigate(`/renewal/payment/${renewalId}`);

    } catch (err) {

      console.error(err);
      alert("Upload failed");

    } finally {

      setLoading(false);

    }
  };
  const requiredDocsUploaded =
    documents.request_letter &&
    documents.form_e;

  return (


    <div className="renewal-page-wrapper">

      <div className="agentupload-breadcrumb-bar">
        You are here :
        <a href="/" className="agentupload-breadcrumb-link">Home</a> /
        <span> Registration</span> /
        <span> Agent Renewal</span>
      </div>

      {/* Stepper Section */}
      <div className="stepper-wrapper">
        <RenewalStepper step={1} />
      </div>

      {/* Upload Section */}
      <div className="upload-container">

        <h2 className="upload-title">Upload Renewal Documents</h2>

        <p className="upload-note">
          Supported formats: PDF / JPG / PNG (Max 5MB)
        </p>

        <div className="upload-grid">

          {/* Request letter */}
          <div className="upload-card">
            <h4>Request Letter *</h4>
            <input type="file" name="request_letter" onChange={handleChange} />
            {documents.request_letter && <p>✔ {documents.request_letter.name}</p>}
          </div>

          {/* form E */}
          <div className="upload-card">
            <h4>Form E *</h4>
            <input type="file" name="form_e" onChange={handleChange} />
            {documents.form_e && <p>✔ {documents.form_e.name}</p>}
          </div>


          {/* <div className="upload-card">
          <h4>Registration Certificate *</h4>
          <input type="file" name="certificate" onChange={handleChange} />
          {documents.certificate && <p>✔ {documents.certificate.name}</p>}
        </div> */}

          {/* Address Proof */}
          {/* <div className="upload-card">
          <h4>Address Proof</h4>
          <input type="file" name="address_proof" onChange={handleChange} />
          {documents.address_proof && <p>✔ {documents.address_proof.name}</p>}
        </div> */}

          {/* Affidavit */}
          {/* <div className="upload-card">
          <h4>Self Declaration Affidavit</h4>
          <input type="file" name="affidavit" onChange={handleChange} />
          {documents.affidavit && <p>✔ {documents.affidavit.name}</p>}
        </div> */}

          {/* Photo */}
          {/* <div className="upload-card">
          <h4>Recent Photograph</h4>
          <input type="file" name="photo" onChange={handleChange} />
          {documents.photo && <p>✔ {documents.photo.name}</p>}
        </div> */}

        </div>

        <div className="btn-container">

          {/* LEFT SIDE */}
          <button
            className="upload-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          {/* RIGHT SIDE */}
          <button
            className="upload-btn"
            disabled={!requiredDocsUploaded || loading}
            onClick={handleUpload}
          >
            {loading ? "Uploading..." : "Submit Documents"}
          </button>

        </div>
      </div>

    </div>
  );

}

export default RenewalUploadDocuments;