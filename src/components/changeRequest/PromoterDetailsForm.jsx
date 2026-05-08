import React, { useState } from "react";

// VALIDATIONS
const onlyText = (v) => v.replace(/[^A-Za-z\s]/g, "");
const onlyDigits = (v) => v.replace(/\D/g, "");
const alphaNumeric = (v) => v.replace(/[^A-Za-z0-9]/g, "");

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidIFSC = (v) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v);
const isValidGST = (v) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/.test(v);
const isValidPAN = (v) =>
  /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
const isValidLicenseNumber = (v) =>
  /^[A-Z0-9]{6,20}$/.test(v); // ❌ no small letters
// min 6, max 20, only alphanumeric

const isValidWebsite = (v) =>
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(v);

const isValidPastDate = (v) => {
  if (!v) return false;
  const selected = new Date(v);
  const today = new Date();
  return selected <= today; // should not be future date
};
const isValidMobile = (v) => v.length === 10;
const isValidAadhaar = (v) => v.length === 12;



const handleValidatedChange = (e, onChange) => {
  let { name, value } = e.target;


  if (name === "emailId") {
    value = value
      .replace(/[^a-zA-Z0-9@._-]/g, "") // allow only valid chars
      .replace(/@{2,}/g, "@")           // only one @ continuously
      .toLowerCase();
  }
  if (name === "websiteUrl") {
    value = value.replace(/[^a-zA-Z0-9.:/?=&-]/g, "");
  }

  // TEXT ONLY
  // TEXT ONLY
  if (
    name === "promoterName" ||
    name === "fatherName" ||
    name === "accountHolderName" ||
    name === "bankState" ||        // ✅ ADD THIS
    name === "bankName" ||         // ✅ ADD THIS
    name === "branchName"          // ✅ ADD THIS
  ) {
    value = onlyText(value);
  }

  // DIGITS ONLY
  if (
    name === "mobileNumber" ||
    name === "aadhaarNumber" ||
    name === "accountNo"
  ) {
    value = onlyDigits(value);
  }

  // LENGTH LIMITS
  if (name === "accountNo") {
    value = onlyDigits(value).slice(0, 18); // you can change 18 → any limit
  }
  if (name === "mobileNumber") value = value.slice(0, 10);
  if (name === "aadhaarNumber") value = value.slice(0, 12);


  // UPPERCASE
  if (name === "ifscCode") {
    value = value
      .replace(/[^A-Za-z0-9]/g, "") // ❌ remove special chars
      .toUpperCase()
      .slice(0, 11); // ✅ IFSC max length = 11
  }
  if (name === "gstNumber") {
    value = value.replace(/[^A-Za-z0-9]/g, "") // ❌ remove special chars
      .toUpperCase()
      .slice(0, 15);
  } 

  // ALPHANUMERIC
  if (name === "licenseNumber") value = alphaNumeric(value);

  onChange({
    target: { name, value },
  });
};

// ─── SUB-SECTION CONFIGS ─────────────────────────────────────────────────────
export const PROMOTER_DETAILS_SUBSECTIONS = [
  {
    id: "bank_account",
    label: "Bank Account Details",
    fields: [
      { name: "bankState", label: "Bank State", type: "text" },
      { name: "bankName", label: "Bank Name", type: "text" },
      { name: "branchName", label: "Branch Name", type: "text" },
      { name: "accountNo", label: "Account Number", type: "text" },
      { name: "accountHolderName", label: "Account Holder Name", type: "text" },
      { name: "ifscCode", label: "IFSC Code", type: "text" },
    ],
  },
  {
    id: "promoter_personal",
    label: "Promoter Personal Details",
    fields: [
  { name: "promoterName", label: "Name", type: "text" },
  { name: "fatherName", label: "Father's Name", type: "text" },
  { name: "mobileNumber", label: "Mobile Number", type: "text" },
  { name: "emailId", label: "Email ID", type: "email" },
  { name: "aadhaarNumber", label: "Aadhaar Number", type: "text" },
  { name: "gstNumber", label: "GST Number", type: "text" },
  { name: "licenseNumber", label: "License Number", type: "text" },
  { name: "licenseDate", label: "License Date", type: "date" },
  { name: "websiteUrl", label: "Website URL", type: "text" },
  { name: "panNumber", label: "PAN Card Number", type: "text" },
  { name: "landlineNumber", label: "Landline Number", type: "text" }
]
  },

];

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const S = {
  wrap: { padding: "20px" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" },
  label: { display: "block", fontWeight: "600", marginBottom: "5px", fontSize: "13px", color: "#1a2535" },
  input: { width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box", resize: "vertical" },
  select: { padding: "9px 12px", border: "1px solid #ccd4e0", borderRadius: "6px", fontSize: "13px", width: "320px" },
  btn: { padding: "10px 24px", background: "#0f3460", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "13px" },
  btnDel: { background: "#c0200f", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px", fontSize: "13px" },
  th: { background: "#0f3460", color: "#fff", padding: "10px 12px", border: "1px solid #ccd4e0", textAlign: "left", fontWeight: "600" },
  td: { padding: "9px 12px", border: "1px solid #e2e8f2", verticalAlign: "top" },
};

function FieldWrap({ label, children }) {
  return (
    <div>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

// ─── BANK ACCOUNT SECTION ─────────────────────────────────────────────────────
// Simple grid inputs — review page shows label:value text format (not table)
function BankAccountSection({ fields, formValues, onChange }) {
  return (
    <div style={S.wrap}>
      <div style={S.grid2}>
        {fields.map((f) => (
          <FieldWrap key={f.name} label={f.label}>
            <input style={S.input} type={f.type} name={f.name}
              value={formValues[f.name] || ""} onChange={(e) => handleValidatedChange(e, onChange)}
              placeholder={`Enter ${f.label}`} />
          </FieldWrap>
        ))}
        <FieldWrap label="Upload Document">
          <input
            style={S.input}
            type="file"
            name="bankDocument"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file && file.type !== "application/pdf") {
                alert("Only PDF files are allowed");
                e.target.value = ""; // reset
                return;
              }

              onChange(e);
            }}
          />
        </FieldWrap>
      </div>
    </div>
  );
}

// ─── PROMOTER PERSONAL SECTION ────────────────────────────────────────────────
// ✅ Old Value = normal editable input (no hardcode)
// ✅ Description field added in form and table
function PromoterPersonalSection({ fields, onChange, tableData, setTableData, previewData }) {
  const [selectedField, setSelectedField] = useState("");
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [description, setDescription] = useState("");
  const [documentFile, setDocumentFile] = useState(null);

  const selectedFieldData = fields.find((f) => f.name === selectedField);

  const resetForm = () => {
    setSelectedField(""); setOldValue(""); setNewValue("");
    setDescription(""); setDocumentFile(null);
  };

  const handleAdd = () => {
    if (!selectedField) {
      alert("Please select a field.");
      return;
    }
    if (!newValue.trim()) {
      alert("Please enter the new value.");
      return;
    }

    // ✅ ADD HERE

    if (selectedField === "ifscCode") {
      if (newValue.length !== 11) {
        alert("IFSC Code must be exactly 11 characters");
        return;
      }

      if (!isValidIFSC(newValue)) {
        alert("Invalid IFSC format (e.g., SBIN0001234)");
        return;
      }
    }

    if (selectedField === "gstNumber") {
      if (newValue.length !== 15) {
        alert("GST Number must be 15 characters");
        return;
      }

      if (!isValidGST(newValue)) {
        alert("Invalid GST format");
        return;
      }
    }

    if (selectedField === "emailId") {
      if (!isValidEmail(newValue)) {
        alert("Enter a valid Email ID (must include @ and .)");
        return;
      }
    }

   if (selectedField === "mobileNumber") {
  if (newValue.length !== 10) {
    alert("Mobile Number must be exactly 10 digits");
    return;
  }

  if (!/^[0-9]{10}$/.test(newValue)) {
    alert("Mobile Number must contain only digits");
    return;
  }
}

if (selectedField === "aadhaarNumber") {
  if (newValue.length !== 12) {
    alert("Aadhaar Number must be exactly 12 digits");
    return;
  }

  if (!/^[0-9]{12}$/.test(newValue)) {
    alert("Aadhaar Number must contain only digits");
    return;
  }
}

if (selectedField === "landlineNumber") {
  if (newValue.length !== 11) {
    alert("Landline Number must be exactly 11 digits");
    return;
  }

  if (!/^[0-9]{11}$/.test(newValue)) {
    alert("Landline Number must contain only digits");
    return;
  }
}

    
    if (selectedField === "licenseNumber") {
      if (!isValidLicenseNumber(newValue)) {
        alert("License Number must be 6-20 characters (only letters & numbers)");
        return;
      }
    }
    if (selectedField === "licenseDate") {
      if (!isValidPastDate(newValue)) {
        alert("License Date cannot be future date");
        return;
      }
    }
   
if (selectedField === "panNumber") {
  if (newValue.length !== 10) {
    alert("PAN must be exactly 10 characters");
    return;
  }

  if (!isValidPAN(newValue)) {
    alert("Invalid PAN format (e.g., ABCDE1234F)");
    return;
  }
}
    if (selectedField === "websiteUrl") {
      if (!isValidWebsite(newValue)) {
        alert("Enter a valid Website URL (e.g., https://example.com)");
        return;
      }
    }

    const newRow = {
      field: selectedFieldData.label,
      fieldName: selectedField,
      oldValue: oldValue.trim() || "-",
      newValue: newValue.trim(),
      description: description.trim() || "-",
      document: documentFile?.name || "-",
      documentUrl: documentFile ? URL.createObjectURL(documentFile) : "",
    };

    const updated = [...tableData, newRow];
    setTableData(updated);

    // notify parent so canGoStep3 enables & review page gets data
    onChange({
      target: {
        name: "__promoter_personal_rows",
        value: JSON.stringify(updated),
      },
    });

    resetForm();
  };

  const handleDelete = (idx) => {
    const updated = tableData.filter((_, i) => i !== idx);
    setTableData(updated);
    onChange({
      target: {
        name: "__promoter_personal_rows",
        value: updated.length ? JSON.stringify(updated) : "",
      },
    });
  };

  return (
    <div style={S.wrap}>

      {/* ── SELECT FIELD ── */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <label style={S.label}>Select Field To Edit</label>
        <select
          style={S.select}
          value={selectedField}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedField(val);

            let currentOld = "";
            if (previewData && previewData.promoter_details) {
              const p = previewData.promoter_details;
              if (val === "promoterName") currentOld = p["Promoter Name"] || "";
              else if (val === "fatherName") currentOld = p["Father Name"] || "";
              else if (val === "mobileNumber") currentOld = p["Mobile Number"] || "";
              else if (val === "emailId") currentOld = p["Email"] || "";
              else if (val === "aadhaarNumber") currentOld = p["Aadhaar"] || "";
              else if (val === "gstNumber") currentOld = p["GST Number"] || "";
              else if (val === "licenseNumber") currentOld = p["License Number"] || "";
              else if (val === "licenseDate") {
                currentOld = p["License Issued Date"] || "";
                if (currentOld) currentOld = currentOld.split("T")[0];
              }
              else if (val === "websiteUrl") currentOld = p["Promoter Website"] || "";
              else if (val === "panNumber") currentOld = p["PAN"] || "";
              else if (val === "landlineNumber") currentOld = p["Landline"] || "";
              
            }
            setOldValue(currentOld); setNewValue("");
          }}
        >
          <option value="">-- Select Field --</option>
          {fields.map((f) => (
            <option key={f.name} value={f.name}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* ── OLD / NEW / DESCRIPTION / UPLOAD ── */}
      {selectedFieldData && (
        <>
          {/* Row 1: Old + New */}
          <div style={{ ...S.grid2, marginBottom: "16px" }}>
            <FieldWrap label={`Old ${selectedFieldData.label}`}>
              <input
                style={{ ...S.input, backgroundColor: "#f0f0f0" }}
                type={selectedFieldData.type}
                value={oldValue}
                readOnly
                placeholder={`Current ${selectedFieldData.label} unavailable`}
              />
            </FieldWrap>
            <FieldWrap label={`New ${selectedFieldData.label}`}>
              <input
                style={S.input}
                type={selectedFieldData.type}
                value={newValue}
                onChange={(e) => {
                  let value = e.target.value;

                  if (selectedField === "promoterName" || selectedField === "fatherName")
                    value = onlyText(value);

                  if (selectedField === "mobileNumber")
                    value = onlyDigits(value).slice(0, 10);
                  if (selectedField === "landlineNumber") {
  value = onlyDigits(value).slice(0, 11); // you can change length (10–11)
}


                  if (selectedField === "aadhaarNumber")
                    value = onlyDigits(value).slice(0, 12);
if (selectedField === "gstNumber") {
  value = value
    .replace(/[^A-Za-z0-9]/g, "") // remove special chars
    .toUpperCase()
    .slice(0, 15); // limit to 15 chars
}

                  if (selectedField === "emailId") {
                    value = value
                      .replace(/[^a-zA-Z0-9@._-]/g, "")
                      .replace(/@{2,}/g, "@")
                      .toLowerCase();
                  }
      if (selectedField === "licenseNumber") {
  value = value
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, 20);
}
if (selectedField === "panNumber") {
  value = value
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, 10);
}
                  if (selectedField === "websiteUrl")
                    value = value.replace(/[^a-zA-Z0-9.:/?=&-]/g, "");

                  setNewValue(value);
                }}
                placeholder={`Enter new ${selectedFieldData.label}`}
              />
            </FieldWrap>
          </div>

          {/* Row 2: Description + Upload */}
          <div style={{ ...S.grid2, marginBottom: "16px" }}>
            <FieldWrap label="Description">
              <textarea
                style={{ ...S.textarea }}
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter reason for this change..."
              />
            </FieldWrap>
            <FieldWrap label="Upload Supporting Document">
              <input
                style={S.input}
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file && file.type !== "application/pdf") {
                    alert("Only PDF files are allowed");
                    e.target.value = ""; // reset
                    return;
                  }

                  setDocumentFile(file);
                }}
              />
              {documentFile && (
                <div style={{ fontSize: "12px", marginTop: "4px", color: "#1a7a3c" }}>
                  📄 {documentFile.name}
                </div>
              )}
            </FieldWrap>
          </div>
        </>
      )}

      {/* ── ADD BUTTON ── */}
      <div style={{ marginBottom: "8px" }}>
        <button style={S.btn} onClick={handleAdd}>+ Add</button>
      </div>

      {/* ── TABLE ── */}
      {tableData.length > 0 && (
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
            {tableData.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafd" }}>
                <td style={{ ...S.td, fontWeight: "600", color: "#0f3460" }}>{row.field}</td>
                <td style={{ ...S.td, color: "#6b7c93" }}>{row.oldValue}</td>
                <td style={{ ...S.td, color: "#1a7a3c", fontWeight: "600" }}>{row.newValue}</td>
                <td style={S.td}>{row.description}</td>
                <td style={S.td}>
                  {row.documentUrl
                    ? <a href={row.documentUrl} target="_blank" rel="noopener noreferrer"
                      style={{ color: "#0f3460", fontWeight: "600" }}>{row.document}</a>
                    : "-"}
                </td>
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

// ─── SIMPLE TEXTAREA SECTION ──────────────────────────────────────────────────
function SimpleSection({ fields, formValues, onChange }) {
  return (
    <div style={S.wrap}>
      {fields.map((f) => (
        <FieldWrap key={f.name} label={f.label}>
          <textarea
            style={{ ...S.textarea, marginBottom: "12px" }}
            rows={4}
            name={f.name}
            value={formValues[f.name] || ""}
            onChange={onChange}
            placeholder={`Enter ${f.label.toLowerCase()}...`}
          />
        </FieldWrap>
      ))}
    </div>
  );
}

// ─── PROMOTER 2 SECTION ───────────────────────────────────────────────────────
function Promoter2Section({ fields, formValues, onChange }) {
  return (
    <div style={S.wrap}>
      <div style={S.grid2}>
        {fields.map((f) => (
          <FieldWrap key={f.name} label={f.label}>
            <input
              style={S.input}
              type={f.type}
              name={f.name}
              value={formValues[f.name] || ""}
              onChange={onChange}
              placeholder={`Enter ${f.label}`}
            />
          </FieldWrap>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function PromoterDetailsForm({
  subSectionId,
  formValues = {},
  onChange = () => { },
  tableStore = {},
  setTableStore = () => { },
  previewData
}) {
  const subSection = PROMOTER_DETAILS_SUBSECTIONS.find((s) => s.id === subSectionId);
  if (!subSection) return null;

  const tableData = tableStore[subSectionId] || [];
  const setTableData = (rows) => setTableStore((prev) => ({ ...prev, [subSectionId]: rows }));

  switch (subSectionId) {
    case "bank_account":
      return <BankAccountSection fields={subSection.fields} formValues={formValues} onChange={onChange} />;
    case "promoter_personal":
      return (
        <PromoterPersonalSection
          fields={subSection.fields}
          onChange={onChange}
          tableData={tableData}
          setTableData={setTableData}
          previewData={previewData}
        />
      );

    default:
      return null;
  }
}