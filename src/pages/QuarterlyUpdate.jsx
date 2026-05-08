import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuarterlyStepper from "../components/QuarterlyStepper";
import "../styles/QuarterlyUpdate.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/api";

const QuarterlyUpdate = () => {
  const [occupancy, setOccupancy] = useState("YES");
  const [documents, setDocuments] = useState({});
  const [additionalDoc, setAdditionalDoc] = useState({
    description: "",
    file: null,
  });
  const [additionalList, setAdditionalList] = useState([]);
  const [quarterId, setQuarterId] = useState("");

  const handleFileChange = (e, name) => {
    setDocuments({
      ...documents,
      [name]: e.target.files[0],
    });
  };

  const handleAddAdditional = () => {
    if (additionalDoc.description && additionalDoc.file) {
      setAdditionalList([...additionalList, additionalDoc]);
      setAdditionalDoc({ description: "", file: null });
    } else {
      alert("Please enter description and upload file");
    }
  };

const navigate = useNavigate(); // make sure this is at top

const handleSave = async () => {
  try {
    const formData = new FormData();

    const panNumber = sessionStorage.getItem("panNumber");

    if (!panNumber) {
      alert("Session expired. Please login again.");
      return;
    }

    formData.append("panNumber", panNumber);
    formData.append("occupancy", occupancy);

    Object.keys(documents).forEach((key) => {
      if (documents[key]) {
        formData.append(key, documents[key]);
      }
    });

    additionalList.forEach((doc, index) => {
      formData.append(`additional_${index}`, doc.file);
    });

    const response = await fetch(
  `${BASE_URL}/api/quarterly-update`,
  {
    method: "POST",
    body: formData,
  }
);

    const data = await response.json();

    if (response.ok) {

  // ✅ Store Step 1 as completed
  const completed =
    JSON.parse(localStorage.getItem("quarterlyCompletedSteps")) || [];

  if (!completed.includes(1)) {
    completed.push(1);
    localStorage.setItem(
      "quarterlyCompletedSteps",
      JSON.stringify(completed)
    );
  }

  const confirmNavigate = window.confirm("Details Saved Successfully");

  if (confirmNavigate) {
    navigate("/project-blockvilla-details");
  }
} else {
      alert(data.error);
    }

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
useEffect(() => {
  const fetchQuarter = async () => {
    try {
      const panNumber = sessionStorage.getItem("panNumber");

      const response = await fetch(
        `${BASE_URL}/api/current-quarter?panNumber=${panNumber}`
      );

      const data = await response.json();

      if (response.ok) {
        setQuarterId(data.quarter_id);
      } else {
        alert(data.error);
      }

    } catch (error) {
      console.error(error);
    }
  };

  fetchQuarter();
}, []);

  const handleFinalSubmit = () => {
    alert("Final Submitted Successfully");
  };

  return (
    <div className="quartdocup-page-bg">
      <div className="quartdocup-outer-frame">

        {/* ================= BREADCRUMB ================= */}
        <div className="quartdocup-breadcrumb">
          You are here :
          <span> Project Registration </span> /
          <span> Existing Project </span> /
          Quarterly Updates
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="quartdocup-main-card">

          {/* HEADER */}
          <div className="quartdocup-header">
            <div>
              <h3 className="quartdocup-title">Quarterly Updates</h3>
              <div className="quartdocup-title-line"></div>
            </div>

            <button className="quartdocup-back-btn">
              Back to Dashboard
            </button>
          </div>

          {/* STEPPER */}
          <QuarterlyStepper currentStep={1} />

          {/* QUARTER ID */}
          <div className="quartdocup-quarter-id">
            <strong>Quarter ID</strong>
            <span>{quarterId}</span>
          </div>

          {/* ================= FINANCIAL DOCUMENTS ================= */}
          <h5 className="quartdocup-section-title">
            Financial Documents
          </h5>

          <div className="quartdocup-section-underline"></div>

          <p className="quartdocup-warning">
            If Form-5 is not available please submit the Declaration.
          </p>

         <div className="quartdocup-occupancy-section">

  <div className="quartdocup-occupancy-row">
    <label className="quartdocup-label">
      Do you have Occupancy Certificate:
      <span className="quartdocup-required-star">*</span>
    </label>

    <div className="quartdocup-radio-group">
      <label>
        <input
          type="radio"
          value="YES"
          checked={occupancy === "YES"}
          onChange={(e) => setOccupancy(e.target.value)}
        /> YES
      </label>

      <label>
        <input
          type="radio"
          value="NO"
          checked={occupancy === "NO"}
          onChange={(e) => setOccupancy(e.target.value)}
        /> NO
      </label>
    </div>
  </div>

  {occupancy === "YES" && (
    <div className="quartdocup-upload-row">
      <label className="quartdocup-label">
        Upload Occupancy Certificate:
        <span className="quartdocup-required-star">*</span>
      </label>

      <input
        type="file"
        className="quartdocup-file-input"
      />
    </div>
  )}

</div>
          <table className="quartdocup-table">
  <thead>
    <tr>
      <th>Document Type</th>
      <th>Upload (Max size 2 MB for each document)</th>
      <th>Uploaded Document</th>
    </tr>
  </thead>

  <tbody>
  {[
    "Form F1",
    "Form F2",
    "Form F3",
    "Form F4",
    "Form F5",
    "Brochure of Current Project",
    "Orders of competent authority Mortgagee Area/Final Layout Area",
  ].map((doc, index) => {

    const isRequired =
      doc === "Form F1" ||
      doc === "Form F2" ||
      doc === "Form F3" ||
      doc === "Brochure of Current Project";

    return (
      <tr key={index}>
        <td>
          {index + 1}. {doc}
          {isRequired && (
            <span className="quartdocup-required-star">*</span>
          )}
        </td>

        <td>
          <input
            type="file"
            className="quartdocup-file-input"
            onChange={(e) => handleFileChange(e, doc)}
          />
        </td>

        <td className="quartdocup-uploaded-cell">
          {documents[doc]?.name || ""}
        </td>
      </tr>
    );
  })}
</tbody>
</table>

          {/* ================= ADDITIONAL DOCUMENTS ================= */}
          {/* ================= ADDITIONAL DOCUMENTS ================= */}

<div className="quartdocup-additional-section">

  <h5 className="quartdocup-section-title">
    Additional Documents
  </h5>

  <div className="quartdocup-section-underline"></div>

  <div className="quartdocup-additional-row">

    {/* Document Description */}
    <div className="quartdocup-field">
      <label>
        Document Description
        <span className="quartdocup-required-star">*</span>
      </label>

      <input
        type="text"
        className="quartdocup-input"
        placeholder="Document Description"
        value={additionalDoc.description}
        onChange={(e) =>
          setAdditionalDoc({
            ...additionalDoc,
            description: e.target.value,
          })
        }
      />
    </div>

    {/* Upload */}
    <div className="quartdocup-field">
      <label>
        Upload Document
        <span className="quartdocup-required-star">*</span>
      </label>

      <input
        type="file"
        className="quartdocup-input"
        onChange={(e) =>
          setAdditionalDoc({
            ...additionalDoc,
            file: e.target.files[0],
          })
        }
      />
    </div>

    {/* Add Button */}
    <div className="quartdocup-add-btn-wrapper">
      <button
        className="quartdocup-primary-btn"
        onClick={handleAddAdditional}
      >
        Add
      </button>
    </div>

  </div>

</div>

          {/* BUTTONS */}
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-secondary me-3" onClick={handleSave}>
              Save
            </button>
            {/* <button className="btn btn-primary" onClick={handleFinalSubmit}>
              Final Submit
            </button> */}
          </div>
          </div>
        </div>
     
    </div>
  );
};

export default QuarterlyUpdate;