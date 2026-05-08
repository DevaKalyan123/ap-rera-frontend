import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../api/api";
import "../../styles/scrutiny/ScrutinyCreateFile.css";
import ScrutinyLayout from "../../components/scrutiny/ScrutinyLayout";

const TYPE_OPTIONS = [
  "Memo",
  "Letter",
  "File",
  "Application",
];

const LOCATION_OPTIONS = [
  "Scrutiny Section",
  "Engineering Section",
  "Legal Section",
  "Planning Section",
  "Audit Section",
  "Director Office",
];

const ASSIGN_TO_OPTIONS = [
  "Scrutiny Engineer",
  "Planning Officer",
  "Legal Officer",
  "Audit Officer",
  "Director",
];

const initialFormState = {
  fileNumber: "",
  inwardNo: "",
  memoNumber: "",
  fileDate: "",
  type: "",
  fromWhere: "",
  toWhom: "",
  assignTo: "",
  description: "",
  remarks: "",
  documentDesc: "",
  file: null,
};

const requiredFieldLabels = {
  fileNumber: "File Number",
  inwardNo: "Inward No",
  fileDate: "File Date",
  type: "Type",
  fromWhere: "From Where",
  toWhom: "To Whom",
  assignTo: "Assign To",
  description: "File Description",
};

const ScrutinyCreateFile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState({ type: "", text: "" });
  const [documentReady, setDocumentReady] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  const missingFields = useMemo(
    () =>
      Object.entries(requiredFieldLabels)
        .filter(([key]) => !String(formData[key] || "").trim())
        .map(([, label]) => label),
    [formData]
  );

 const handleChange = (event) => {
  const { name, value } = event.target;

  // Only numbers allow for fileNumber, inwardNo & memoNumber
  if (
    name === "fileNumber" ||
    name === "inwardNo" ||
    name === "memoNumber"
  ) {
    const numericValue = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, [name]: numericValue }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  setBanner({ type: "", text: "" });
};
  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
    setDocumentReady(false);
    setBanner({ type: "", text: "" });
  };

  const handleAddDocument = (event) => {
    event.preventDefault();

    if (!formData.documentDesc.trim()) {
      setBanner({ type: "error", text: "Enter document description before adding the document." });
      return;
    }

    if (!formData.file) {
      setBanner({ type: "error", text: "Choose a document file before adding." });
      return;
    }

    setDocumentReady(true);
    setBanner({ type: "success", text: "Document added and ready to save." });
  };

  const resetForm = ({ keepBanner = false } = {}) => {
    setFormData(initialFormState);
    setDocumentReady(false);
    setFileInputKey((prev) => prev + 1);
    if (!keepBanner) {
      setBanner({ type: "", text: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (missingFields.length > 0) {
      setBanner({
        type: "error",
        text: `Please fill: ${missingFields.join(", ")}`,
      });
      return;
    }

    if ((formData.documentDesc.trim() && !formData.file) || (!formData.documentDesc.trim() && formData.file)) {
      setBanner({
        type: "error",
        text: "Document description and upload document must be provided together.",
      });
      return;
    }

    const payload = new FormData();
    payload.append("file_number", formData.fileNumber.trim());
    payload.append("inward_no", formData.inwardNo.trim());
    payload.append("memo_number", formData.memoNumber.trim());
    payload.append("file_date", formData.fileDate);
    payload.append("type", formData.type);
    payload.append("from_where", formData.fromWhere);
    payload.append("to_whom", formData.toWhom);
    payload.append("assign_to", formData.assignTo);
    payload.append("description", formData.description.trim());
    payload.append("remarks", formData.remarks.trim());
    payload.append("document_desc", formData.documentDesc.trim());

    if (formData.file) {
      payload.append("file", formData.file);
    }

    try {
      setSubmitting(true);
      setBanner({ type: "", text: "" });

      const response = await apiPost("/api/scrutiny/create-file", payload);
      const createdId = response?.data?.id;

      setBanner({
        type: "success",
        text: createdId
          ? `File created successfully. Record ID: ${createdId}`
          : "File created successfully.",
      });

      resetForm({ keepBanner: true });
    } catch (error) {
      setBanner({
        type: "error",
        text: error.message || "Unable to create file.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrutinyLayout>
<div className="scf-scf-main">
      <div className="scf-scf-body">
        <div className="scf-scf-content">
          <p className="scf-breadcrumb">
            You are here : <span>DashBoard</span> / Create File
          </p>

          <div className="scf-form-box">
            <h3>File Creation</h3>

            {banner.text && (
              <div
                className={`alert ${banner.type === "error" ? "alert-danger" : "alert-success"}`}
                style={{ marginBottom: "16px" }}
              >
                {banner.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="scf-form-grid">
                <div>
                  <label>File Number <span className="req">*</span></label>
                  <input
  type="text"
  name="fileNumber"
  value={formData.fileNumber}
  onChange={handleChange}
  placeholder="File Number"
  inputMode="numeric"
  pattern="[0-9]*"
/>
                </div>

                <div>
                  <label>Inward No <span className="req">*</span></label>
               <input
  type="text"
  name="inwardNo"
  value={formData.inwardNo}
  onChange={handleChange}
  placeholder="Inward No"
  inputMode="numeric"
  pattern="[0-9]*"
/>
                </div>

                <div>
                  <label>Memo Number</label>
                  <input
  type="text"
  name="memoNumber"
  value={formData.memoNumber}
  onChange={handleChange}
  placeholder="Memo Number"
  inputMode="numeric"
/>
                </div>

                <div>
                  <label>File Date <span className="req">*</span></label>
                  <input
                    type="date"
                    name="fileDate"
                    value={formData.fileDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Type <span className="req">*</span></label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="">Select</option>
                    {TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>From Where <span className="req">*</span></label>
                  <select name="fromWhere" value={formData.fromWhere} onChange={handleChange}>
                    <option value="">Select</option>
                    {LOCATION_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>To Whom <span className="req">*</span></label>
                  <select name="toWhom" value={formData.toWhom} onChange={handleChange}>
                    <option value="">Select</option>
                    {LOCATION_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Assign To <span className="req">*</span></label>
                  <select name="assignTo" value={formData.assignTo} onChange={handleChange}>
                    <option value="">Select</option>
                    {ASSIGN_TO_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="scf-form-row">
                <div>
                  <label>
                    File Description<span className="req">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter Description"
                  />
                </div>

                <div>
                  <label>Remarks</label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Remarks"
                  />
                </div>
              </div>

              <h4>Upload Documents:</h4>

              <div className="scf-upload-container">
                <div className="scf-upload-field">
                  <label>
                    Document Description / Name
                  </label>
                  <input
                    name="documentDesc"
                    value={formData.documentDesc}
                    onChange={handleChange}
                    placeholder="Document Description"
                  />
                </div>

                <div className="scf-upload-field">
                  <label>
                    Upload Document
                  </label>
                  <input
                    key={fileInputKey}
                    type="file"
                    className="file-input"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="scf-upload-btn">
                  <button type="button" className="scf-add-btn" onClick={handleAddDocument}>
                    Add
                  </button>
                </div>
              </div>

              {(documentReady || formData.file) && (
                <p style={{ marginTop: "8px", color: "#0f3556" }}>
                  {formData.file
                    ? `Selected document: ${formData.file.name}`
                    : "Document ready to save."}
                </p>
              )}

              <div className="scf-btns">
                <button type="submit" className="scf-save" disabled={submitting}>
                  {submitting ? "Saving..." : "Save"}
                </button>
                <button type="button" className="scf-clear" onClick={resetForm}>
                  Clear
                </button>
                <button
                  type="button"
                  className="scf-clear"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </ScrutinyLayout>
    
  );
};

export default ScrutinyCreateFile;