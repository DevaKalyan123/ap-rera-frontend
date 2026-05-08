import React from "react";
import "../styles/InformProject.css";

// Uncomment and fix your file path when ready
// import certificatePdf from "/assets/pdfs/Jupudy_extension_draft_certificate.docx";

const InformProject = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check ALL file uploads
    const fileInputs = document.querySelectorAll('input[type="file"]');
    let allFilesUploaded = true;

    fileInputs.forEach((input) => {
      if (!input.files || input.files.length === 0) {
        allFilesUploaded = false;
      }
    });

    // If any document is missing → warning
    if (!allFilesUploaded) {
      alert("Please upload all the required supporting documents before submitting.");
      return;
    }

    // Confirmation popup
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the application?"
    );

    if (confirmSubmit) {
      alert("Application submitted successfully.");

      // Open / Download document (uncomment when you have the correct path)
      // const link = document.createElement("a");
      // link.href = certificatePdf;
      // link.target = "_blank";
      // link.click();
    }
  };

  return (
    <div className="inform-form-container">
      <h2 className="inform-form-titles">Application Form</h2>

      <form className="inform-application-form" onSubmit={handleSubmit}>
        
        <div className="inform-form-row">
          <label>Project Name</label>
          <input type="text" placeholder="Enter Project Name" />
        </div>

        <div className="inform-form-row">
          <label>Promotor Name</label>
          <input type="text" placeholder="Enter Promotor Name" />
        </div>

        <div className="inform-form-row">
          <label>Address with Pincode</label>
          <input type="text" placeholder="Enter Address with Pincode" />
        </div>

        <div className="inform-form-row">
          <label>BA.no / LP.no</label>
          <input type="text" placeholder="Enter BA/LP Number" />
        </div>

        <div className="inform-form-row">
          <label>Applied Date</label>
          <input type="date" />
        </div>

        <div className="inform-form-row">
          <label>Please upload brochure / advertisement</label>
          <input type="file" required />
        </div>

        <div className="inform-button-row">
          <button type="submit" className="inform-btn inform-submit">
            Submit Application
          </button>
        </div>

      </form>
    </div>
  );
};

export default InformProject;