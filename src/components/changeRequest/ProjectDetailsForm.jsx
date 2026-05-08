import React, { useState, useEffect, useRef } from "react";
import { apiGet } from "../../api/api";

// ─── SUB-SECTION CONFIGS ─────────────────────────────────────────────────────
export const PROJECT_DETAILS_SUBSECTIONS = [
  {
    id: "project_registration",
    label: "Project Details",
    fields: [
      {
        name: "projectType",
        label: "CHANGE TYPE",
        type: "select",
        options: [
          "Project Name",
          "Project Description",
          "Project Type",
          "Project Status",
          "Building Plan No",
          "Building Permission Validity From",
          "Building Permission Validity Upto",
          "Date of Commencement of the Project",
          "Proposed Date of Completion of the Project",
          "Total Area Of Land (Sq.m)",
          "Total Plinth Area (Sq.m)",
          "Total Open Area (Sq.m)",
          "Total Built-up Area (Sq.m)",
        ],
      },
    ],
  },
 {
  id: "project_material_facts",
  label: "Project Material Facts",
  fields: [
    {
      name: "materialFactType",
      label: "CHANGE TYPE",
      type: "select",
      options: [
        "No of Units in the projects",
        "No of Units advances taken",
        "No of units where agreement for sale entered",
        "No of units sold in the project",
      ],
    },
  ],
},
];

const PROJECT_TYPE_OPTIONS = [
  "Residential",
  "Commercial",
  "Mixed Development",
  "Layout for Plots",
  "Layouts for Plots & Buildings",
];

// ─── MAP: Change Type Label → API response field key ─────────────────────────
const CHANGE_TYPE_TO_API_KEY = {
  "Project Name":                               "project_name",
  "Project Description":                        "project_description",
  "Project Type":                               "project_type",
  "Project Status":                             "project_status",
  "Building Plan No":                           "building_plan_no",
  "Building Permission Validity From":          "building_permission_from",
  "Building Permission Validity Upto":          "building_permission_upto",
  "Date of Commencement of the Project":        "date_of_commencement",
  "Proposed Date of Completion of the Project": "proposed_completion_date",
  "Total Area Of Land (Sq.m)":                  "total_area_of_land",
  "Total Plinth Area (Sq.m)":                   "total_plinth_area",
  "Total Open Area (Sq.m)":                     "total_open_area",
  "Total Built-up Area (Sq.m)":                 "total_built_up_area",
};

// ─── ID → Label maps (API returns numeric IDs for these) ─────────────────────
const PROJECT_TYPE_ID_MAP = {
  1: "Residential",
  2: "Commercial",
  3: "Mixed Development",
  4: "Layout for Plots",
  5: "Layouts for Plots & Buildings",
};

const PROJECT_STATUS_ID_MAP = {
  1: "New",
  2: "Ongoing",
  3: "Completed",
  4: "Stalled",
};

// ─── VALIDATION CONFIG ────────────────────────────────────────────────────────
const FIELD_VALIDATIONS = {
  "Project Name":                               { type: "text",         maxLen: 100, msg: "Project Name should contain only letters and spaces." },
  "Project Description":                        { type: "textarea",     maxLen: 500, msg: "Description should not exceed 500 characters." },
  "Project Status":                             { type: "text",         maxLen: 100, msg: "Project Status should contain only letters." },
  "Building Plan No":                           { type: "alphanumeric", maxLen: 50,  msg: "Building Plan No should contain only letters and numbers." },
  "Building Permission Validity From":          { type: "date",         msg: "Please enter a valid date." },
  "Building Permission Validity Upto":          { type: "date",         msg: "Please enter a valid date." },
  "Date of Commencement of the Project":        { type: "date",         msg: "Please enter a valid date." },
  "Proposed Date of Completion of the Project": { type: "date",         msg: "Please enter a valid date." },
  "Total Area Of Land (Sq.m)":                  { type: "decimal",      msg: "Area must be a positive number (e.g. 1200.50)." },
  "Total Plinth Area (Sq.m)":                   { type: "decimal",      msg: "Area must be a positive number (e.g. 1200.50)." },
  "Total Open Area (Sq.m)":                     { type: "decimal",      msg: "Area must be a positive number (e.g. 1200.50)." },
  "Total Built-up Area (Sq.m)":                 { type: "decimal",      msg: "Area must be a positive number (e.g. 1200.50)." },
  "Project Type":                               { type: "select",       msg: "" },
};

// ─── Prevent invalid typing ───────────────────────────────────────────────────
function filterInputValue(type, value) {
  switch (type) {
    case "text":         return value.replace(/[^a-zA-Z\s]/g, "");
    case "alphanumeric": return value.replace(/[^a-zA-Z0-9\s\-\/]/g, "");
    case "decimal":      return value.replace(/[^0-9.]/g, "");
    default:             return value;
  }
}

// ─── Validate field value ─────────────────────────────────────────────────────
function validateFieldValue(fieldName, value) {
  if (!value || value.trim() === "") return "";
  const rule = FIELD_VALIDATIONS[fieldName];
  if (!rule) return "";
  switch (rule.type) {
    case "text":
      if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters are allowed.";
      break;
    case "alphanumeric":
      if (!/^[a-zA-Z0-9\s\-\/]+$/.test(value)) return "Only letters and numbers allowed.";
      break;
    case "decimal":
      if (!/^\d+(\.\d{1,2})?$/.test(value) || parseFloat(value) <= 0)
        return "Only numeric values allowed (e.g. 1200.50)";
      break;
    case "date":
      if (!value) return "Please select a valid date.";
      break;
    case "textarea":
      if (value.length > 500) return `Max 500 characters allowed (${value.length}/500)`;
      break;
    default:
      break;
  }
  if (rule.maxLen && value.length > rule.maxLen)
    return `Maximum ${rule.maxLen} characters allowed.`;
  return "";
}

// ─── Parse API date string → "YYYY-MM-DD" for <input type="date"> ────────────
function parseApiDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm   = String(d.getMonth() + 1).padStart(2, "0");
    const dd   = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return "";
  }
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const selectStyle = {
  width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0",
  borderRadius: "6px", fontSize: "13px", boxSizing: "border-box",
  background: "#fff", cursor: "pointer",
};
const inputStyle = {
  width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0",
  borderRadius: "6px", fontSize: "13px", boxSizing: "border-box",
};
const inputROStyle = {
  width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0",
  borderRadius: "6px", fontSize: "13px", boxSizing: "border-box",
  backgroundColor: "#f0f4f8", color: "#555", cursor: "not-allowed",
};
const labelStyle = {
  display: "block", fontWeight: "600", marginBottom: "5px",
  fontSize: "13px", color: "#1a2535",
};
const thStyle = {
  padding: "10px 12px", border: "1px solid #ccd4e0",
  background: "#2f5d9f", color: "#fff", textAlign: "left",
  fontWeight: "600", whiteSpace: "nowrap",
};
const tdStyle = {
  padding: "9px 12px", border: "1px solid #e2e8f2",
  verticalAlign: "top", fontSize: "13px",
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ProjectDetailsForm({
  subSectionId,
  formValues      = {},
  onChange        = () => {},
  tableStore      = {},
  setTableStore   = () => {},
  applicationNumber,
  panNumber,
}) {
  // ── All hooks before early return ──
  const [changeSelected, setChangeSelected] = useState(false);
  const [selectedField,  setSelectedField]  = useState("");
  const [oldValue,       setOldValue]       = useState("");
  const [newValue,       setNewValue]       = useState("");
  const [description,    setDescription]    = useState("");
  const [documentFile,   setDocumentFile]   = useState(null);
  const [totalUnits,     setTotalUnits]     = useState("");
  const [unitFile,       setUnitFile]       = useState(null);
  const [hideFields,     setHideFields]     = useState(false);
  const [oldValueError,  setOldValueError]  = useState("");
  const [newValueError,  setNewValueError]  = useState("");
  const [descError,      setDescError]      = useState("");
  const [totalUnitsErr,  setTotalUnitsErr]  = useState("");

  // ── API state ──
  const [apiData,    setApiData]    = useState(null);
  const [loadingApi, setLoadingApi] = useState(false);
  const [apiError,   setApiError]   = useState("");

  const fileInputRef     = useRef(null);
  const unitFileInputRef = useRef(null);

  // ── Fetch project registration details ───────────────────────────────────
  useEffect(() => {
    if (!applicationNumber || !panNumber) {
      console.warn("⚠️ [ProjectDetailsForm] applicationNumber or panNumber is missing →", { applicationNumber, panNumber });
      return;
    }

    const fetchData = async () => {
      setLoadingApi(true);
      setApiError("");
      try {
        const json = await apiGet(
  `/api/project-registration/details?applicationNumber=${encodeURIComponent(applicationNumber)}&panNumber=${encodeURIComponent(panNumber)}`
);

console.log("📦 API Response →", json);

        

        if (json.success && json.data) {
          setApiData(json.data);
          console.log("✅ [ProjectDetailsForm] API data loaded. Field-by-field:");
          console.table(
            Object.entries(CHANGE_TYPE_TO_API_KEY).map(([label, key]) => ({
              "Change Type":  label,
              "API Key":      key,
              "Value":        json.data[key] ?? "(null/undefined)",
            }))
          );
        } else {
          console.error("❌ [ProjectDetailsForm] API returned no data →", json);
          setApiError(json.message || "Failed to load project details.");
        }
      } catch (err) {
        console.error("❌ [ProjectDetailsForm] Fetch error →", err);
        setApiError("Could not reach the server. Existing values will be unavailable.");
      } finally {
        setLoadingApi(false);
      }
    };

    fetchData();
  }, [applicationNumber, panNumber]);

  // ── Resolve existing display value from apiData for a given change type ──
  const resolveExistingValue = (fieldLabel) => {
    if (!apiData) {
      console.warn(`⚠️ [resolveExistingValue] apiData not loaded yet for "${fieldLabel}"`);
      return "";
    }

    const apiKey = CHANGE_TYPE_TO_API_KEY[fieldLabel];
    if (!apiKey) {
      console.warn(`⚠️ [resolveExistingValue] No API key mapped for "${fieldLabel}"`);
      return "";
    }

    const raw = apiData[apiKey];
    console.log(`🔍 [resolveExistingValue] "${fieldLabel}" → apiKey="${apiKey}" → raw value =`, raw);

    if (raw === null || raw === undefined || raw === "") {
      console.log(`   ℹ️ No data in API for "${apiKey}"`);
      return "No data available";
    }

    // Date fields → parse to YYYY-MM-DD
    if (FIELD_VALIDATIONS[fieldLabel]?.type === "date") {
      const parsed = parseApiDate(String(raw));
      console.log(`   📅 Date parsed: "${raw}" → "${parsed}"`);
      return parsed;
    }

    // Project Type → numeric id to readable label
    if (fieldLabel === "Project Type") {
      const label = PROJECT_TYPE_ID_MAP[Number(raw)] || String(raw);
      console.log(`   🏷️ Project Type: id=${raw} → "${label}"`);
      return label;
    }

    // Project Status → numeric id to readable label
    if (fieldLabel === "Project Status") {
      const label = PROJECT_STATUS_ID_MAP[Number(raw)] || String(raw);
      console.log(`   🏷️ Project Status: id=${raw} → "${label}"`);
      return label;
    }

    return String(raw);
  };

  const subSection = PROJECT_DETAILS_SUBSECTIONS.find((s) => s.id === subSectionId);
  if (!subSection) return null;

  const tableData    = tableStore[subSectionId] || [];
  const setTableData = (rows) => setTableStore((prev) => ({ ...prev, [subSectionId]: rows }));
  const hasExtraColumns = tableData.some((r) => r.totalUnits || r.unitFileName);

  const notifyParent = (rows) => {
    onChange({
      target: {
        name:  `__project_rows_${subSectionId}`,
        value: rows.length ? JSON.stringify(rows) : "",
      },
    });
  };

  const handleChangeType = (e) => {
    const val = e.target.value;
    onChange(e);
    setSelectedField(val);
    setChangeSelected(val !== "");
    setHideFields(false);
    setNewValue(""); setDescription("");
    setDocumentFile(null); setTotalUnits(""); setUnitFile(null);
    setOldValueError(""); setNewValueError(""); setDescError(""); setTotalUnitsErr("");
    if (fileInputRef.current)     fileInputRef.current.value = "";
    if (unitFileInputRef.current) unitFileInputRef.current.value = "";

    if (val) {
      const existing = resolveExistingValue(val);
      console.log(`📌 [handleChangeType] selected="${val}" → existingValue="${existing}"`);
      setOldValue(existing);
    } else {
      setOldValue("");
    }
  };

  const handleAdd = () => {
    if (!selectedField)   { alert("Please select a change type."); return; }
    if (!newValue.trim()) { alert("Please enter the new value."); return; }

    const newErr = validateFieldValue(selectedField, newValue);
    let unitErr = "";
    if (selectedField === "Project Type" && newValue && totalUnits) {
      if (!/^\d+$/.test(totalUnits.trim()) || parseInt(totalUnits) <= 0)
        unitErr = "Total units must be a positive whole number.";
    }

    setNewValueError(newErr);
    setTotalUnitsErr(unitErr);
    if (newErr || unitErr || descError) return;

    const newRow = {
      field:        selectedField,
      oldValue:     oldValue     || "-",
      newValue:     newValue,
      description:  description  || "-",
      document:     documentFile?.name || "-",
      documentUrl:  documentFile ? URL.createObjectURL(documentFile) : "",
      totalUnits:   selectedField === "Project Type" ? (totalUnits    || "-") : "",
      unitFileName: selectedField === "Project Type" ? (unitFile?.name || "-") : "",
      unitFileUrl:  selectedField === "Project Type" && unitFile ? URL.createObjectURL(unitFile) : "",
    };

    console.log("➕ [ProjectDetailsForm] Adding row to table →", newRow);

    const updated = [...tableData, newRow];
    setTableData(updated);
    notifyParent(updated);

    setOldValue(""); setNewValue(""); setDescription("");
    setDocumentFile(null); setTotalUnits(""); setUnitFile(null);
    setOldValueError(""); setNewValueError(""); setDescError(""); setTotalUnitsErr("");
    if (fileInputRef.current)     fileInputRef.current.value = "";
    if (unitFileInputRef.current) unitFileInputRef.current.value = "";
    setHideFields(true);
  };

  const handleDelete = (idx) => {
    const updated = tableData.filter((_, i) => i !== idx);
    setTableData(updated);
    notifyParent(updated);
  };

  const isProjectTypeSelected   = selectedField === "Project Type";
  const isProjectStatusSelected = selectedField === "Project Status";
  const isDateField             = FIELD_VALIDATIONS[selectedField]?.type === "date";

  return (
    <div style={{ padding: "20px" }}>

      {/* ── API loading / error banners ── */}
      {loadingApi && (
        <div style={{ padding: "10px 14px", fontSize: "13px", color: "#1f4e79", fontStyle: "italic", marginBottom: "12px" }}>
          ⏳ Loading existing project details…
        </div>
      )}
      {!loadingApi && apiError && (
        <div style={{ padding: "10px 14px", fontSize: "13px", color: "#c0200f", background: "#fff0f0", borderRadius: "6px", marginBottom: "12px" }}>
          ⚠️ {apiError}
        </div>
      )}

      {/* ── CHANGE TYPE DROPDOWN ── */}
      <div style={{ marginBottom: "20px", maxWidth: "400px" }}>
        <label style={labelStyle}>CHANGE TYPE</label>
        <select
          style={selectStyle}
          name={subSection.fields[0].name}
value={formValues[subSection.fields[0].name] || ""}
          onChange={handleChangeType}
        >
          <option value="">-- Select --</option>
          {subSection.fields[0].options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* ── FORM FIELDS ── */}
      {changeSelected && !hideFields && (
        <div>

          {/* OLD + NEW VALUE ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

            {/* EXISTING VALUE — read-only, auto-filled from API */}
            <div>
              <label style={labelStyle}>
                EXISTING {selectedField}
                {loadingApi && (
                  <span style={{ fontWeight: 400, color: "#888", marginLeft: "6px", fontSize: "11px" }}>
                    (loading…)
                  </span>
                )}
              </label>

              {isProjectTypeSelected ? (
                <select
                  style={{ ...selectStyle, backgroundColor: "#f0f4f8", cursor: "not-allowed" }}
                  value={oldValue}
                  disabled
                >
                  <option value="">-- Select --</option>
                  {PROJECT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : isProjectStatusSelected ? (
                <select
                  style={{ ...selectStyle, backgroundColor: "#f0f4f8", cursor: "not-allowed" }}
                  value={oldValue}
                  disabled
                >
                  <option value="">-- Select --</option>
                  {Object.values(PROJECT_STATUS_ID_MAP).map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : isDateField ? (
                <input
                  style={inputROStyle}
                  type="date"
                  value={oldValue}
                  readOnly
                />
              ) : (
                <input
                  style={inputROStyle}
                  value={loadingApi ? "Loading…" : oldValue}
                  readOnly
                  placeholder="Auto-filled from project data"
                />
              )}
            </div>

            {/* NEW VALUE — user editable */}
            <div>
              <label style={labelStyle}>NEW {selectedField}</label>

              {isProjectTypeSelected ? (
                <select
                  style={selectStyle}
                  value={newValue}
                  onChange={(e) => { setNewValue(e.target.value); setNewValueError(""); }}
                >
                  <option value="">-- Select --</option>
                  {PROJECT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : isProjectStatusSelected ? (
                <select
                  style={selectStyle}
                  value={newValue}
                  onChange={(e) => { setNewValue(e.target.value); setNewValueError(""); }}
                >
                  <option value="">-- Select --</option>
                  {Object.values(PROJECT_STATUS_ID_MAP).map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : isDateField ? (
                <input
                  style={{ ...inputStyle, borderColor: newValueError ? "#c0200f" : "#ccd4e0" }}
                  type="date"
                  value={newValue}
                  onChange={(e) => { setNewValue(e.target.value); setNewValueError(""); }}
                />
              ) : (
                <input
                  style={{ ...inputStyle, borderColor: newValueError ? "#c0200f" : "#ccd4e0" }}
                  value={newValue}
                  onChange={(e) => {
                    const raw      = e.target.value;
                    const type     = FIELD_VALIDATIONS[selectedField]?.type;
                    const filtered = filterInputValue(type, raw);
                    setNewValue(filtered);
                    setNewValueError(validateFieldValue(selectedField, filtered));
                  }}
                  placeholder={`Enter new ${selectedField}`}
                />
              )}
              {newValueError && (
                <div style={{ color: "#c0200f", fontSize: "11px", marginTop: "4px" }}>⚠ {newValueError}</div>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", borderColor: descError ? "#c0200f" : "#ccd4e0" }}
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescError(
                  e.target.value.length > 500
                    ? `Description must be under 500 characters. (${e.target.value.length}/500)`
                    : ""
                );
              }}
              placeholder="Enter reason for this change..."
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
              {descError
                ? <span style={{ color: "#c0200f", fontSize: "11px" }}>⚠ {descError}</span>
                : <span />}
              <span style={{ fontSize: "11px", color: description.length > 450 ? "#c0200f" : "#999" }}>
                {description.length}/500
              </span>
            </div>
          </div>

          {/* UPLOAD DOCUMENT */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Upload Document</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              style={inputStyle}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                if (file.type !== "application/pdf") {
                  alert("Only PDF files are allowed.");
                  e.target.value = "";
                  setDocumentFile(null);
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
          </div>

          {/* EXTRA FIELDS — only when "Project Type" is selected AND new value picked */}
          {isProjectTypeSelected && newValue && (
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px",
              marginBottom: "16px", padding: "14px",
              background: "#f5f7fc", borderRadius: "6px", border: "1px solid #e2e8f2",
            }}>
              <div>
                <label style={labelStyle}>
                  {newValue === "Layout for Plots" ? "Total No of Plots" : "Total No of Villas"}
                </label>
                <input
                  style={{ ...inputStyle, borderColor: totalUnitsErr ? "#c0200f" : "#ccd4e0" }}
                  value={totalUnits}
                  inputMode="numeric"
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setTotalUnits(val);
                    setTotalUnitsErr(val && parseInt(val) <= 0 ? "Must be greater than 0." : "");
                  }}
                  placeholder="Enter count (numbers only)"
                />
                {totalUnitsErr && (
                  <div style={{ color: "#c0200f", fontSize: "11px", marginTop: "4px" }}>⚠ {totalUnitsErr}</div>
                )}
              </div>
              <div>
                <label style={labelStyle}>
                  {newValue === "Layout for Plots" ? "Upload Plot Details (.pdf)" : "Upload Villa Details (.pdf)"}
                </label>
                <input
                  ref={unitFileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  style={inputStyle}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.type !== "application/pdf") {
                      alert("Only PDF files are allowed.");
                      e.target.value = "";
                      setUnitFile(null);
                      return;
                    }
                    setUnitFile(file);
                  }}
                />
                {unitFile && (
                  <div style={{ fontSize: "12px", marginTop: "4px", color: "#1a7a3c" }}>
                    📄 {unitFile.name}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADD BUTTON */}
          <button
            style={{
              padding: "10px 24px", background: "#0f3460", color: "#fff",
              border: "none", borderRadius: "6px", cursor: "pointer",
              fontWeight: "600", fontSize: "13px", marginTop: "4px",
            }}
            onClick={handleAdd}
          >
            + Add
          </button>
        </div>
      )}

      {/* ADD ANOTHER button */}
      {changeSelected && hideFields && (
        <button
          style={{
            padding: "8px 20px", background: "#eef3fb", color: "#0f3460",
            border: "1px solid #ccd4e0", borderRadius: "6px", cursor: "pointer",
            fontWeight: "600", fontSize: "13px", marginBottom: "12px",
          }}
          onClick={() => {
            setHideFields(false);
            setNewValue(""); setDescription("");
            setDocumentFile(null); setTotalUnits(""); setUnitFile(null);
            setOldValueError(""); setNewValueError(""); setDescError(""); setTotalUnitsErr("");
            if (fileInputRef.current)     fileInputRef.current.value = "";
            if (unitFileInputRef.current) unitFileInputRef.current.value = "";
            // Re-resolve existing value when coming back
            if (selectedField) {
              const existing = resolveExistingValue(selectedField);
              setOldValue(existing);
            }
          }}
        >
          + Add Another Change
        </button>
      )}

      {/* ── TABLE ── */}
      {tableData.length > 0 && (
        <div style={{ overflowX: "auto", marginTop: "20px" }}>
          <table style={{ minWidth: "800px", width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr>
                <th style={thStyle}>Field</th>
                <th style={thStyle}>Old Value</th>
                <th style={thStyle}>New Value</th>
                <th style={{ ...thStyle, minWidth: "200px" }}>Description</th>
                <th style={thStyle}>Document</th>
                {hasExtraColumns && (
                  <>
                    <th style={thStyle}>Total Units</th>
                    <th style={thStyle}>Unit File</th>
                  </>
                )}
                <th style={{ ...thStyle, width: "70px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafd" }}>
                  <td style={{ ...tdStyle, fontWeight: "600", color: "#0f3460" }}>{row.field}</td>
                  <td style={{ ...tdStyle, color: "#6b7c93" }}>{row.oldValue}</td>
                  <td style={{ ...tdStyle, color: "#1a7a3c", fontWeight: "600" }}>{row.newValue}</td>
                  <td style={{ ...tdStyle, maxWidth: "260px" }}>
                    <div style={{ wordBreak: "break-word", overflowWrap: "break-word", whiteSpace: "pre-wrap", maxHeight: "80px", overflowY: "auto" }}>
                      {row.description}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    {row.documentUrl
                      ? <a href={row.documentUrl} target="_blank" rel="noopener noreferrer"
                          style={{ color: "#0f3460", fontWeight: "600" }}>{row.document}</a>
                      : "-"}
                  </td>
                  {hasExtraColumns && (
                    <>
                      <td style={tdStyle}>{row.totalUnits || "-"}</td>
                      <td style={tdStyle}>
                        {row.unitFileUrl
                          ? <a href={row.unitFileUrl} target="_blank" rel="noopener noreferrer"
                              style={{ color: "#0f3460", fontWeight: "600" }}>{row.unitFileName}</a>
                          : "-"}
                      </td>
                    </>
                  )}
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <button
                      onClick={() => handleDelete(i)}
                      style={{
                        background: "#c0200f", color: "#fff", border: "none",
                        borderRadius: "4px", padding: "4px 10px",
                        cursor: "pointer", fontSize: "12px",
                      }}
                    >✕</button>
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