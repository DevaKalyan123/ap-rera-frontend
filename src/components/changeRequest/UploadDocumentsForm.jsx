import React, { useState } from "react";

// ─── SUB-SECTION CONFIGS ──────────────────────────────────────────────────────
export const UPLOAD_DOCUMENTS_SUBSECTIONS = [
  {
    id: "documents",
    label: "Upload Documents",
    isDocumentSection: false,
    fields: [],
  },
  {
    id: "consultancy_details",
    label: "Consultancy Details",
    isDocumentSection: false,
    fields: [],
  },
];

const DOCUMENT_DROPDOWN = [
  "Copies of Registered Ownership Documents / Pattadhaar Pass Books",
  "Combined Field Sketches showing Survey Number boundaries",
  "Detailed Site Plan with Geo-Coordinates at end points",
  "Registered Development Agreement / Authorization Letter from Land Owner",
  "Land Title Search Report from Advocate (min. 10 years experience)",
  "Latest Encumbrance Certificate (within 30 days)",
  "Copy of Plan & Proceedings from Competent Authority",
  "Approved Plan / List of Amenities proposed in the site",
  "NOC's from Airport Authority, Fire Dept, Environmental Clearance",
  "Detailed Technical Specifications of Construction",
  "Topo Plan drawn to scale with nearby landmarks",
  "Structural Stability Certificate from Certified Structural Consultant",
  "Proforma of Allotment Letter proposed to be signed with Allottee",
  "Proforma of Agreement for Sale proposed to be signed with Allottee",
];

const CONSULTANCY_FIELDS = [
  "Name of Consultancy/Agency/Association/Individual",
  "Name",
  "Mobile Number",
  "Email Id",
  "Full Address for communication",
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  wrap:    { padding: "20px" },
  label:   { display: "block", fontWeight: "600", marginBottom: "5px", fontSize: "13px", color: "#1a2535" },
  input:   { width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" },
  select:  { width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box", background: "#fff" },
  textarea:{ width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box", resize: "vertical" },
  btn:     { padding: "10px 24px", background: "#0f3460", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "13px" },
  btnDel:  { background: "#c0200f", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" },
  grid2:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" },
  table:   { width: "100%", borderCollapse: "collapse", marginTop: "20px", fontSize: "13px" },
  th:      { background: "#1e4d8f", color: "#fff", padding: "10px 12px", border: "1px solid #ccd4e0", textAlign: "left", fontWeight: "600" },
  td:      { padding: "9px 12px", border: "1px solid #e2e8f2", verticalAlign: "top" },
};

function FW({ label, children, style }) {
  return (
    <div style={style}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

// ─── UPLOAD DOCUMENTS SECTION ─────────────────────────────────────────────────
function UploadDocSection({ onChange, tableData, setTableData }) {
  const [docType,     setDocType]     = useState("");
  const [oldFile,     setOldFile]     = useState(null);
  const [newFile,     setNewFile]     = useState(null);
  const [description, setDescription] = useState("");
  const [oldFileError, setOldFileError] = useState("");   // ← NEW
  const [newFileError, setNewFileError] = useState("");   // ← NEW

  // PDF Validation
  const isValidPDF = (file) => {
    if (!file) return false;
    return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  };

  const notifyParent = (rows) => {
    onChange({
      target: {
        name:  "__upload_doc_rows",
        value: rows.length ? JSON.stringify(rows) : "",
      },
    });
  };

  const handleOldFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setOldFileError("");
    if (selectedFile) {
      if (isValidPDF(selectedFile)) {
        setOldFile(selectedFile);
      } else {
        setOldFile(null);
        setOldFileError("This file should be in PDF format only");
        e.target.value = "";
      }
    }
  };

  const handleNewFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setNewFileError("");
    if (selectedFile) {
      if (isValidPDF(selectedFile)) {
        setNewFile(selectedFile);
      } else {
        setNewFile(null);
        setNewFileError("This file should be in PDF format only");
        e.target.value = "";
      }
    }
  };

  const handleAdd = () => {
    if (!docType) { alert("Please select a document type."); return; }
    if (!oldFile && !newFile) { alert("Please upload at least one file (Old or New)."); return; }

    // Extra safety check
    if ((oldFile && !isValidPDF(oldFile)) || (newFile && !isValidPDF(newFile))) {
      alert("Only PDF files are allowed");
      return;
    }

    const newRow = {
      docType,
      oldFileName: oldFile?.name    || "-",
      oldFileUrl:  oldFile ? URL.createObjectURL(oldFile) : "",
      newFileName: newFile?.name    || "-",
      newFileUrl:  newFile ? URL.createObjectURL(newFile) : "",
      description: description || "-",
    };

    const updated = [...tableData, newRow];
    setTableData(updated);
    notifyParent(updated);

    setDocType(""); 
    setOldFile(null); 
    setNewFile(null); 
    setDescription("");
    setOldFileError("");
    setNewFileError("");
  };

  const handleDelete = (idx) => {
    const updated = tableData.filter((_, i) => i !== idx);
    setTableData(updated);
    notifyParent(updated);
  };

  return (
    <div style={S.wrap}>
      {/* Document Type */}
      <div style={{ marginBottom: "16px" }}>
        <FW label="Select Document Type">
          <select style={S.select} value={docType} onChange={(e) => setDocType(e.target.value)}>
            <option value="">-- Select --</option>
            {DOCUMENT_DROPDOWN.map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
        </FW>
      </div>

      {/* Old + New Files */}
      <div style={S.grid2}>
        <FW label="EXISTING Document">
          <input style={S.input} type="file" onChange={handleOldFileChange} />
          {oldFile && <div style={{ fontSize: "12px", marginTop: "4px", color: "#1a7a3c" }}>📄 {oldFile.name}</div>}
          {oldFileError && (
            <div style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px", fontWeight: "500" }}>
              {oldFileError}
            </div>
          )}
        </FW>

        <FW label="NEW Document">
          <input style={S.input} type="file" onChange={handleNewFileChange} />
          {newFile && <div style={{ fontSize: "12px", marginTop: "4px", color: "#1a7a3c" }}>📄 {newFile.name}</div>}
          {newFileError && (
            <div style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px", fontWeight: "500" }}>
              {newFileError}
            </div>
          )}
        </FW>
      </div>

      {/* Description + Add */}
      <div style={{ marginBottom: "16px" }}>
        <FW label="Description">
          <textarea style={S.textarea} rows={2} value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description..." />
        </FW>
      </div>

      <button style={S.btn} onClick={handleAdd}>+ Add</button>

      {/* TABLE */}
      {tableData.length > 0 && (
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Document Type</th>
              <th style={S.th}>Old File</th>
              <th style={S.th}>New File</th>
              <th style={S.th}>Description</th>
              <th style={{ ...S.th, width: "60px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafd" }}>
                <td style={{ ...S.td, fontWeight: "600", color: "#0f3460" }}>{r.docType}</td>
                <td style={S.td}>
                  {r.oldFileUrl
                    ? <a href={r.oldFileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#0f3460", fontWeight: "600" }}>{r.oldFileName}</a>
                    : "-"}
                </td>
                <td style={S.td}>
                  {r.newFileUrl
                    ? <a href={r.newFileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#1a7a3c", fontWeight: "600" }}>{r.newFileName}</a>
                    : "-"}
                </td>
                <td style={S.td}>{r.description}</td>
                <td style={{ ...S.td, textAlign: "center" }}>
                  <button style={S.btnDel} onClick={() => handleDelete(i)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── CONSULTANCY DETAILS SECTION ──────────────────────────────────────────────
function ConsultancySection({ onChange, tableData, setTableData }) {
  const [selectedField, setSelectedField] = useState("");
  const [oldValue,      setOldValue]      = useState("");
  const [newValue,      setNewValue]      = useState("");
  const [description,   setDescription]   = useState("");
  const [file,          setFile]          = useState(null);
  const [fileError,     setFileError]     = useState("");     // ← NEW

  // PDF Validation
  const isValidPDF = (file) => {
    if (!file) return false;
    return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  };

  const notifyParent = (rows) => {
    onChange({
      target: {
        name:  "__consultancy_rows",
        value: rows.length ? JSON.stringify(rows) : "",
      },
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileError("");
    if (selectedFile) {
      if (isValidPDF(selectedFile)) {
        setFile(selectedFile);
      } else {
        setFile(null);
        setFileError("This file should be in PDF format only");
        e.target.value = "";
      }
    }
  };

  const handleAdd = () => {
    if (!selectedField) { alert("Please select a field."); return; }
    if (!newValue.trim()) { alert("Please enter the new value."); return; }

    if (file && !isValidPDF(file)) {
      setFileError("This file should be in PDF format only");
      return;
    }

    const newRow = {
      field:       selectedField,
      oldValue:    oldValue.trim()  || "-",
      newValue:    newValue.trim(),
      description: description.trim() || "-",
      fileName:    file?.name    || "-",
      fileUrl:     file ? URL.createObjectURL(file) : "",
    };

    const updated = [...tableData, newRow];
    setTableData(updated);
    notifyParent(updated);

    setSelectedField(""); 
    setOldValue(""); 
    setNewValue("");
    setDescription(""); 
    setFile(null);
    setFileError("");
  };

  const handleDelete = (idx) => {
    const updated = tableData.filter((_, i) => i !== idx);
    setTableData(updated);
    notifyParent(updated);
  };

  return (
    <div style={S.wrap}>
      {/* Select Field */}
      <div style={{ marginBottom: "16px" }}>
        <FW label="Select Consultancy Field">
          <select style={S.select} value={selectedField}
            onChange={(e) => { setSelectedField(e.target.value); setOldValue(""); setNewValue(""); }}>
            <option value="">-- Select --</option>
            {CONSULTANCY_FIELDS.map((f, i) => <option key={i} value={f}>{f}</option>)}
          </select>
        </FW>
      </div>

      {selectedField && (
        <>
          {/* Old + New */}
          <div style={S.grid2}>
            <FW label={`Existing ${selectedField}`}>
              <input style={S.input} type="text" value={oldValue}
                onChange={(e) => setOldValue(e.target.value)}
                placeholder={`Enter current ${selectedField}`} />
            </FW>
            <FW label={`New ${selectedField}`}>
              <input style={S.input} type="text" value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={`Enter new ${selectedField}`} />
            </FW>
          </div>

          {/* Description + Upload */}
          <div style={S.grid2}>
            <FW label="Description">
              <textarea style={S.textarea} rows={2} value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter reason for this change..." />
            </FW>
            <FW label="Upload Document">
              <input style={S.input} type="file" onChange={handleFileChange} />
              {file && <div style={{ fontSize: "12px", marginTop: "4px", color: "#1a7a3c" }}>📄 {file.name}</div>}
              {fileError && (
                <div style={{ 
                  color: "#e74c3c", 
                  fontSize: "12px", 
                  marginTop: "4px", 
                  fontWeight: "500" 
                }}>
                  {fileError}
                </div>
              )}
            </FW>
          </div>
        </>
      )}

      <button style={S.btn} onClick={handleAdd}>+ Add</button>

      {/* TABLE */}
     {tableData.length > 0 && (
  <div style={{ maxHeight: "250px", overflowY: "auto" }}>
    <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>Field</th>
              <th style={S.th}>Old Value</th>
              <th style={S.th}>New Value</th>
              <th style={S.th}>Description</th>
              <th style={S.th}>Document</th>
              <th style={{ ...S.th, width: "60px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafd" }}>
                <td style={{ ...S.td, fontWeight: "600", color: "#0f3460" }}>{r.field}</td>
                <td style={{ ...S.td, color: "#6b7c93" }}>{r.oldValue}</td>
                <td style={{ ...S.td, color: "#1a7a3c", fontWeight: "600" }}>{r.newValue}</td>
                <td style={S.td}>{r.description}</td>
                <td style={S.td}>
                  {r.fileUrl
                    ? <a href={r.fileUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#0f3460", fontWeight: "600" }}>{r.fileName}</a>
                    : "-"}
                </td>
                <td style={{ ...S.td, textAlign: "center" }}>
                  <button style={S.btnDel} onClick={() => handleDelete(i)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function UploadDocumentsForm({
  subSectionId,
  onChange      = () => {},
  tableStore    = {},
  setTableStore = () => {},
}) {
  const tableData    = tableStore[subSectionId] || [];
  const setTableData = (rows) => setTableStore((prev) => ({ ...prev, [subSectionId]: rows }));

  if (subSectionId === "consultancy_details") {
    return (
      <ConsultancySection
        onChange={onChange}
        tableData={tableData}
        setTableData={setTableData}
      />
    );
  }

  // default: "documents"
  return (
    <UploadDocSection
      onChange={onChange}
      tableData={tableData}
      setTableData={setTableData}
    />
  );
}