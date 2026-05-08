import React, { useState } from "react";

// ─── SUB-SECTION CONFIGS ─────────────────────────────────────────────────────
export const ASSOCIATE_DETAILS_SUBSECTIONS = [
  {
    id: "project_agent",
    label: "Project Agent",
    fields: [
      { name: "agentName", label: "Agent Name", type: "text" },
      { name: "agentMobile", label: "Agent Mobile", type: "text" },
      { name: "agentEmail", label: "Agent Email", type: "email" },
      { name: "agentReraRegNo", label: "Agent RERA Reg No", type: "text" },
      { name: "agentAddress", label: "Agent Address", type: "textarea" },
    ],
  },
  {
    id: "architects",
    label: "Project Architects",
    fields: [
      { name: "architectName", label: "Architect Name", type: "text" },
      { name: "architectMobile", label: "Architect Mobile", type: "text" },
      { name: "architectEmail", label: "Architect Email", type: "email" },
      { name: "architectLicense", label: "Architect License No", type: "text" },
      { name: "architectAddress", label: "Address Line 1", type: "textarea" },
      { name: "architectAddress2", label: "Address Line 2", type: "textarea" },
      { name: "architectState", label: "State", type: "text" },
      { name: "architectDistrict", label: "District", type: "text" },
      { name: "architectPincode", label: "Pincode", type: "text" },
      { name: "architectYearOfEstablishment", label: "Year of Establishment", type: "text" },
      { name: "architectKeyProjects", label: "Key Projects", type: "text" },
    ],
  },
  {
    id: "structural_engineers",
    label: "Structural Engineers",
    fields: [
      { name: "structEngineerName", label: "Engineer Name", type: "text" },
      { name: "structEngineerMobile", label: "Engineer Mobile", type: "text" },
      { name: "structEngineerEmail", label: "Engineer Email", type: "email" },
      { name: "structEngineerLicense", label: "Engineer License No", type: "text" },
      { name: "structEngineerAddress", label: "Engineer Address", type: "textarea" },
      { name: "structEngineerState", label: "State/UT", type: "text" },
      { name: "structEngineerDistrict", label: "District", type: "text" },
      { name: "structEngineerPincode", label: "PIN Code", type: "text" },
      { name: "structEngineerKeyProjects", label: "No. of Key Projects", type: "text" },
    ],
  },
  {
    id: "contractors",
    label: "Project Contractors",
    fields: [
      { name: "contractorName", label: "Contractor Name", type: "text" },
      { name: "contractorMobile", label: "Contractor Mobile", type: "text" },
      { name: "contractorEmail", label: "Contractor Email", type: "email" },
      { name: "contractorLicense", label: "Contractor License No", type: "text" },
      { name: "contractorAddress", label: "Contractor Address", type: "textarea" },
      { name: "contractorState", label: "State/UT", type: "text" },
      { name: "contractorDistrict", label: "District", type: "text" },
      { name: "contractorPincode", label: "PIN Code", type: "text" },
      { name: "contractorYearOfEstablishment", label: "Year of Establishment", type: "text" },
      { name: "contractorKeyProjects", label: "No. of Key Projects", type: "text" },
    ],
  },
  {
    id: "chartered_accountant",
    label: "Chartered Accountant",
    fields: [
      { name: "caName", label: "CA Name", type: "text" },
      { name: "caMobile", label: "CA Mobile", type: "text" },
      { name: "caEmail", label: "CA Email", type: "email" },
      { name: "caMembership", label: "CA Membership No", type: "text" },
      { name: "caAddress", label: "CA Address", type: "textarea" },
      { name: "caState", label: "State/UT", type: "text" },
      { name: "caDistrict", label: "District", type: "text" },
    ],
  },
  {
    id: "project_engineers",
    label: "Project Engineers",
    fields: [
      { name: "projEngineerName", label: "Engineer Name", type: "text" },
      { name: "projEngineerMobile", label: "Engineer Mobile", type: "text" },
      { name: "projEngineerEmail", label: "Engineer Email", type: "email" },
      { name: "projEngineerLicense", label: "Engineer License No", type: "text" },
      { name: "projEngineerAddress", label: "Engineer Address", type: "textarea" },
      { name: "projEngineerState", label: "State/UT", type: "text" },
      { name: "projEngineerDistrict", label: "District", type: "text" },
      { name: "projEngineerPincode", label: "PIN Code", type: "text" },
      { name: "projEngineerKeyProjects", label: "No. of Key Projects", type: "text" },
    ],
  },
];

// ─── FIELD RENDERER with Inline Error ───────────────────────────────────────
function FormField({ field, value, onChange, error }) {
  const isFullWidth = field.type === "textarea";

  return (
    <div style={{ width: isFullWidth ? "100%" : "48%", marginBottom: "15px" }}>
      <label style={{ display: "block", fontWeight: "600", marginBottom: "6px" }}>
        {field.label}
      </label>

      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          value={value || ""}
          onChange={onChange}
          rows={3}
          placeholder={`Enter ${field.label.toLowerCase()}...`}
          style={{
            width: "100%",
            padding: "8px",
            border: error ? "1px solid #e74c3c" : "1px solid #ccc",
            borderRadius: "6px",
            boxSizing: "border-box"
          }}
        />
      ) : (
        <input
          type={field.type}
          name={field.name}
          value={value || ""}
          onChange={onChange}
          placeholder={`Enter ${field.label.toLowerCase()}...`}
          style={{
            width: "100%",
            padding: "8px",
            border: error ? "1px solid #e74c3c" : "1px solid #ccc",
            borderRadius: "6px",
            boxSizing: "border-box"
          }}
        />
      )}

      {error && (
        <div style={{
          color: "#e74c3c",
          fontSize: "12px",
          marginTop: "4px",
          fontWeight: "500"
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

// ─── TABLE STYLES ────────────────────────────────────────────────────────────
const thStyle = { padding: "10px", border: "1px solid #ccc", textAlign: "left" };
const tdStyle = { padding: "8px", border: "1px solid #ccc" };

// ─── NEW ROWS TABLE ──────────────────────────────────────────────────────────
function NewRowsTable({ rows, subSection, onDelete }) {
  if (!rows.length) return null;
  return (
    <div style={{ marginTop: "30px" }}>
      {/* Section label */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        background: "#e8f5e9", color: "#1a7a3c", fontWeight: "700",
        fontSize: "13px", padding: "4px 12px", borderRadius: "20px",
        marginBottom: "8px", border: "1px solid #a5d6a7"
      }}>
        <span>🆕</span> New Entries
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#1e4d8f", color: "#fff" }}>
              {subSection.fields.map((field) => (
                <th key={field.name} style={thStyle}>{field.label}</th>
              ))}
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Document</th>
              <th style={{ ...thStyle, width: "60px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ row, originalIndex }) => (
              <tr key={originalIndex} style={{ background: originalIndex % 2 === 0 ? "#fff" : "#f8fafd" }}>
                {subSection.fields.map((field) => (
                  <td key={field.name} style={tdStyle}>{row[field.name] || "-"}</td>
                ))}
                <td style={tdStyle}>{row.description || "-"}</td>
                <td style={tdStyle}>
                  {row.fileURL
                    ? <a href={row.fileURL} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#1e4d8f", fontWeight: "600" }}>{row.fileName}</a>
                    : "-"}
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <button
                    onClick={() => onDelete(originalIndex)}
                    style={{ background: "#c0200f", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}
                  >✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── EXISTING ROWS TABLE ─────────────────────────────────────────────────────
function ExistingRowsTable({ rows, subSection, onDelete }) {
  if (!rows.length) return null;
  return (
    <div style={{ marginTop: "30px" }}>
      {/* Section label */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        background: "#e3f2fd", color: "#1565c0", fontWeight: "700",
        fontSize: "13px", padding: "4px 12px", borderRadius: "20px",
        marginBottom: "8px", border: "1px solid #90caf9"
      }}>
        <span>✏️</span> Existing Changes
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#1e4d8f", color: "#fff" }}>
              <th style={thStyle}>Field Changed</th>
              <th style={thStyle}>Old Value</th>
              <th style={thStyle}>New Value</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Document</th>
              <th style={{ ...thStyle, width: "60px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ row, originalIndex }) => (
              <tr key={originalIndex} style={{ background: originalIndex % 2 === 0 ? "#fff" : "#f8fafd" }}>
                <td style={{ ...tdStyle, fontWeight: "600", color: "#0f3460" }}>
                  {subSection.fields.find(f => f.name === row.__selField)?.label || row.__selField}
                </td>
                <td style={{ ...tdStyle, color: "#6b7c93" }}>
                  {row[`old_${row.__selField}`] || "-"}
                </td>
                <td style={{ ...tdStyle, color: "#1a7a3c", fontWeight: "600" }}>
                  {row[row.__selField] || "-"}
                </td>
                <td style={tdStyle}>{row.description || "-"}</td>
                <td style={tdStyle}>
                  {row.fileURL
                    ? <a href={row.fileURL} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#1e4d8f", fontWeight: "600" }}>{row.fileName}</a>
                    : "-"}
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <button
                    onClick={() => onDelete(originalIndex)}
                    style={{ background: "#c0200f", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}
                  >✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── INNER COMPONENT ────────────────────────────────────────────────────────
function AssociateSectionInner({ subSection, onChange, tableData, setTableData, previewData }) {
  const [mainMode, setMainMode] = useState("");
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});           // ← NEW: for inline errors
  const [selectedField, setSelectedField] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const getOldValuesList = (fieldName) => {
    if (!previewData || !previewData.associate_details) return [];
    const ad = previewData.associate_details;
    let list = [];
    if (subSection.id === "project_agent" && ad.agents) {
      if (fieldName.includes("Name")) list = ad.agents.map(x => x.name);
      else if (fieldName.includes("Mobile")) list = ad.agents.map(x => x.mobile);
      else if (fieldName.includes("Email")) list = ad.agents.map(x => x.email);
      else if (fieldName.includes("RegNo")) list = ad.agents.map(x => x.registration_number);
    } else if (subSection.id === "architects" && ad.architects) {
      if (fieldName.includes("Name")) list = ad.architects.map(x => x.name);
      else if (fieldName.includes("Mobile")) list = ad.architects.map(x => x.mobile);
      else if (fieldName.includes("Email")) list = ad.architects.map(x => x.email);
      else if (fieldName.includes("License") || fieldName.includes("Reg")) list = ad.architects.map(x => x.reg_number);
      else if (fieldName.includes("Address")) list = ad.architects.map(x => x.address);
    } else if (subSection.id === "structural_engineers" && ad.engineers) {
      if (fieldName.includes("Name")) list = ad.engineers.map(x => x.name);
      else if (fieldName.includes("Mobile")) list = ad.engineers.map(x => x.mobile);
      else if (fieldName.includes("Email")) list = ad.engineers.map(x => x.email);
      else if (fieldName.includes("License")) list = ad.engineers.map(x => x.licence_number);
      else if (fieldName.includes("Address")) list = ad.engineers.map(x => x.address);
    } else if (subSection.id === "contractors" && ad.contractors) {
      if (fieldName.includes("Name")) list = ad.contractors.map(x => x.contractor_name);
      else if (fieldName.includes("Mobile")) list = ad.contractors.map(x => x.mobile_number);
      else if (fieldName.includes("Email")) list = ad.contractors.map(x => x.email_id);
      else if (fieldName.includes("License") || fieldName.includes("Reg")) list = ad.contractors.map(x => x.reg_number);
      else if (fieldName.includes("Address")) list = ad.contractors.map(x => x.address_line1);
    } else if (subSection.id === "chartered_accountant" && ad.accountants) {
      if (fieldName.includes("Name")) list = ad.accountants.map(x => x.name);
      else if (fieldName.includes("Mobile")) list = ad.accountants.map(x => x.mobile);
      else if (fieldName.includes("Email")) list = ad.accountants.map(x => x.email);
      else if (fieldName.includes("Membership")) list = ad.accountants.map(x => x.icai_member_id);
      else if (fieldName.includes("Address")) list = ad.accountants.map(x => x.address);
    } else if (subSection.id === "project_engineers" && ad.project_engineers) {
      if (fieldName.includes("Name")) list = ad.project_engineers.map(x => x.engineer_name);
      else if (fieldName.includes("Mobile")) list = ad.project_engineers.map(x => x.mobile_number);
      else if (fieldName.includes("Email")) list = ad.project_engineers.map(x => x.email_id);
      else if (fieldName.includes("License")) list = ad.project_engineers.map(x => x.reg_number);
      else if (fieldName.includes("Address")) list = ad.project_engineers.map(x => x.address_line1);
    }
    return list.filter(Boolean);
  };

  const selectedFieldLabel =
    subSection.fields.find((f) => f.name === selectedField)?.label || "";

  // Validation Function
  const validateField = (name, value) => {
    let error = "";

    // NAME VALIDATION
    if (name.toLowerCase().includes("name")) {
      const nameRegex = /^[A-Za-z\s]*$/;
      if (value && !nameRegex.test(value)) {
        error = "Only alphabets and spaces allowed";
      }
    }
// MOBILE VALIDATION
if (name.toLowerCase().includes("mobile")) {
  const mobileRegex = /^[0-9]*$/;

  if (value && !mobileRegex.test(value)) {
    error = "Mobile number must contain only numbers";
  } 
  else if (value && value.length > 10) {
    error = "Mobile number must be maximum 10 digits";
  } 
  else if (value && value.length < 10) {
    error = "Mobile number must be exactly 10 digits";
  }
}
    // EMAIL VALIDATION
    if (name.toLowerCase().includes("email")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        error = "Please enter a valid email address";
      }
    }

    // LICENSE / MEMBERSHIP / REG NO VALIDATION
    if (
      name.toLowerCase().includes("license") ||
      name.toLowerCase().includes("membership") ||
      name.toLowerCase().includes("reg") ||
      name.toLowerCase().includes("rera")
    ) {
      const alphaNumRegex = /^[A-Za-z0-9]*$/;
      if (value && !alphaNumRegex.test(value)) {
        error = "Only letters and numbers allowed";
      }
    }

    // STATE VALIDATION
if (name.toLowerCase().includes("state")) {
  const stateRegex = /^[A-Za-z\s]*$/;

  if (value && !stateRegex.test(value)) {
    error = "State should contain only alphabets";
  }
}

// DISTRICT VALIDATION
if (name.toLowerCase().includes("district")) {
  const districtRegex = /^[A-Za-z\s]*$/;

  if (value && !districtRegex.test(value)) {
    error = "District should contain only alphabets";
  }
}

// PINCODE VALIDATION
if (name.toLowerCase().includes("pincode")) {
  const pinRegex = /^[0-9]*$/;

  if (value && !pinRegex.test(value)) {
    error = "Pincode must contain only numbers";
  } 
  else if (value && value.length !== 6) {
    error = "Pincode must be exactly 6 digits";
  }
}

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Real-time validation
    const fieldError = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // notify parent
  const notifyParent = (rows) => {
    onChange({
      target: {
        name: `__associate_rows_${subSection.id}`,
        value: rows.length ? JSON.stringify(rows) : "",
      },
    });
  };

  const handleAdd = () => {

  // ✅ NEW ADDITION (PDF validation block)
  if (errors.file) {
    alert("Please upload only PDF document");
    return;
  }

  // Check for validation errors before adding
  let hasError = false;
  const newErrors = {};

  Object.keys(formValues).forEach((key) => {
    const error = validateField(key, formValues[key]);
    if (error) {
      newErrors[key] = error;
      hasError = true;
    }
  });

  if (hasError) {
    setErrors(newErrors);
    return;
  }

  let newEntry = {};
  let hasValue = false;

  subSection.fields.forEach((field) => {
    if (formValues[field.name] && formValues[field.name].trim() !== "") {
      newEntry[field.name] = formValues[field.name];
      hasValue = true;
    }
  });

  // OLD mode
  if (mainMode === "old" && selectedField) {
    const oldKey = `old_${selectedField}`;
    if (formValues[oldKey]) {
      newEntry[oldKey] = formValues[oldKey];
      hasValue = true;
    }
    newEntry.__mode = "old";
    newEntry.__selField = selectedField;
  } else {
    newEntry.__mode = "new";
  }

  if (description && description.trim() !== "") {
    newEntry.description = description;
    hasValue = true;
  }

  // ✅ OPTIONAL EXTRA SAFETY (recommended)
  if (file && file.type !== "application/pdf") {
    alert("Only PDF files are allowed");
    return;
  }

  if (file) {
    newEntry.fileName = file.name;
    newEntry.fileURL = URL.createObjectURL(file);
    hasValue = true;
  }

  if (!hasValue) {
    alert("Please enter at least one field");
    return;
  }

  const updated = [...tableData, newEntry];
  setTableData(updated);
  notifyParent(updated);

  // Reset form
  setFormValues({});
  setDescription("");
  setFile(null);
  setErrors({});
  setSelectedField("");
};

  const handleDelete = (idx) => {
    const updated = tableData.filter((_, i) => i !== idx);
    setTableData(updated);
    notifyParent(updated);
  };

  // ── Split rows by mode ──────────────────────────────────────────────────
  const newRows = tableData
    .map((row, originalIndex) => ({ row, originalIndex }))
    .filter(({ row }) => row.__mode === "new");

  const existingRows = tableData
    .map((row, originalIndex) => ({ row, originalIndex }))
    .filter(({ row }) => row.__mode === "old");

  return (

    <div style={{ padding: "20px" }}>
      {/* NEW / OLD RADIO */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "30px" }}>
        <label style={{ fontWeight: "600", cursor: "pointer" }}>
          <input
            type="radio"
            value="new"
            checked={mainMode === "new"}
            onChange={(e) => {
              setMainMode(e.target.value);
              setSelectedField("");
              setFormValues({});
              setDescription("");
              setFile(null);
              setErrors({});
            }}
            style={{ marginRight: "6px" }}
          />
          New
        </label>
        <label style={{ fontWeight: "600", cursor: "pointer" }}>
          <input
            type="radio"
            value="old"
            checked={mainMode === "old"}
            onChange={(e) => {
              setMainMode(e.target.value);
              setSelectedField("");
              setFormValues({});
              setDescription("");
              setFile(null);
              setErrors({});
            }}
            style={{ marginRight: "6px" }}
          />
          Existing
        </label>
      </div>

      {/* ── NEW MODE ── */}
      {mainMode === "new" && (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            {subSection.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={formValues[field.name]}
                onChange={handleChange}
                error={errors[field.name]}
              />
            ))}
          </div>

          {/* Description + Upload */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: "600" }}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: "600" }}>Upload Document</label>
              <input
  key={file ? file.name : "empty"}
  type="file"
  onChange={(e) => {
  const selectedFile = e.target.files[0];

  if (selectedFile) {
    if (selectedFile.type !== "application/pdf") {
      setErrors((prev) => ({
        ...prev,
        file: "Document should be in PDF format"
      }));
      setFile(null);
      return;
    }

    // valid PDF
    setErrors((prev) => ({
      ...prev,
      file: ""
    }));

    setFile(selectedFile);
  }
}} />

{errors.file && (
  <div style={{
    color: "#e74c3c",
    fontSize: "12px",
    marginTop: "4px",
    fontWeight: "500"
  }}>
    {errors.file}
  </div>
)}
              {file && <div style={{ fontSize: "12px", marginTop: "4px", color: "#1a7a3c" }}>📄 {file.name}</div>}
            </div>
          </div>

          <button
            onClick={handleAdd}
            style={{ padding: "8px 18px", background: "#1e4d8f", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
          >
            Add
          </button>
        </>
      )}

      {/* ── OLD MODE ── */}
      {mainMode === "old" && (
        <>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "600" }}>Select Existing</label>
            <select
              value={selectedField}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedField(val);
                const opts = getOldValuesList(val);
                if (opts.length === 1) {
                  setFormValues(prev => ({ ...prev, [`old_${val}`]: opts[0] }));
                } else if (opts.length === 0 || opts.length > 1) {
                  setFormValues(prev => ({ ...prev, [`old_${val}`]: "" }));
                }
              }}
              style={{ width: "250px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginLeft: "12px" }}
            >
              <option value="">Select</option>
              {subSection.fields.map((field) => (
                <option key={field.name} value={field.name}>{field.label}</option>
              ))}
            </select>
          </div>

          {selectedField && (
            <>
              <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: "600" }}>OLD {selectedFieldLabel}</label>
                  {getOldValuesList(selectedField).length > 0 ? (
                    <select
                      name={`old_${selectedField}`}
                      value={formValues[`old_${selectedField}`] || ""}
                      onChange={handleChange}
                      style={{
                        display: "block",
                        padding: "8px",
                        borderRadius: "6px",
                        border: errors[`old_${selectedField}`] ? "1px solid #e74c3c" : "1px solid #ccc",
                        width: "100%",
                        marginTop: "4px",
                        backgroundColor: "#fff"
                      }}
                    >
                      <option value="">-- Select Existing --</option>
                      {getOldValuesList(selectedField).map((val, idx) => (
                        <option key={idx} value={val}>{val}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={`old_${selectedField}`}
                      value={formValues[`old_${selectedField}`] || ""}
                      readOnly
                      placeholder="No existing data found"
                      style={{
                        display: "block",
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        width: "100%",
                        marginTop: "4px",
                        backgroundColor: "#f0f0f0"
                      }}
                    />
                  )}
                  {errors[`old_${selectedField}`] && (
                    <div style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px" }}>
                      {errors[`old_${selectedField}`]}
                    </div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: "600" }}>NEW {selectedFieldLabel}</label>
                  <input
                    type="text"
                    name={selectedField}
                    value={formValues[selectedField] || ""}
                    onChange={handleChange}
                    style={{
                      display: "block",
                      padding: "8px",
                      borderRadius: "6px",
                      border: errors[selectedField] ? "1px solid #e74c3c" : "1px solid #ccc",
                      width: "100%",
                      marginTop: "4px"
                    }}
                  />
                  {errors[selectedField] && (
                    <div style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px" }}>
                      {errors[selectedField]}
                    </div>
                  )}
                </div>
              </div>

              {/* Description + Upload */}
              <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: "600" }}>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: "600" }}>Upload Document</label>
                  <input type="file" onChange={(e) => {
  const selectedFile = e.target.files[0];

  if (selectedFile) {
    if (selectedFile.type !== "application/pdf") {
      setErrors((prev) => ({
        ...prev,
        file: "Document should be in PDF format"
      }));
      setFile(null);
      return;
    }

    // valid PDF
    setErrors((prev) => ({
      ...prev,
      file: ""
    }));

    setFile(selectedFile);
  }
}} />
{errors.file && (
  <div style={{
    color: "#e74c3c",
    fontSize: "12px",
    marginTop: "4px",
    fontWeight: "500"
  }}>
    {errors.file}
  </div>
)}
                  {file && <div style={{ fontSize: "12px", marginTop: "4px", color: "#1a7a3c" }}>📄 {file.name}</div>}
                </div>
              </div>

              <button
                onClick={handleAdd}
                style={{ padding: "8px 18px", background: "#1e4d8f", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
              >
                Add
              </button>
            </>
          )}
        </>
      )}

      {/* ── SEPARATE TABLES ── */}
      {/* NEW entries table — always full-field columns */}
      <NewRowsTable
        rows={newRows}
        subSection={subSection}
        onDelete={handleDelete}
      />

      {/* EXISTING changes table — always Field/Old/New/Description/Document/Action */}
      <ExistingRowsTable
        rows={existingRows}
        subSection={subSection}
        onDelete={handleDelete}
      />
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function AssociateDetailsForm({
  subSectionId,
  onChange = () => { },
  tableStore = {},
  setTableStore = () => { },
  previewData
}) {
  const subSection = ASSOCIATE_DETAILS_SUBSECTIONS.find((s) => s.id === subSectionId);
  if (!subSection) return null;

  const tableData = tableStore[subSectionId] || [];
  const setTableData = (rows) => setTableStore((prev) => ({ ...prev, [subSectionId]: rows }));

  return (
    <AssociateSectionInner
      subSection={subSection}
      onChange={onChange}
      tableData={tableData}
      setTableData={setTableData}
      previewData={previewData}
    />
  );
}