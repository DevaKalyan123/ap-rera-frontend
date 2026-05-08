import React, { useState, useEffect } from "react";

// ─── SUB-SECTION CONFIGS ──────────────────────────────────────────────────────
export const DEVELOPMENT_DETAILS_SUBSECTIONS = [
  {
    id: "external_development",
    label: "External Development Work",
    fields: [],
  },
  // {
  //   id: "other_external_works",
  //   label: "Other External Development Works",
  //   fields: [
  //     { name: "otherWorkDescription", label: "Work Description", type: "text" },
  //     {
  //       name: "otherWorkType", label: "Work Type", type: "select",
  //       options: ["Local Authority", "Self Development", "Not Applicable"]
  //     },
  //   ],
  // },
];

const WORK_TYPE_KEY_MAP = {
  "Use of Renewable Energy": "Use_of_Renewable_Energy",
  "External Development Work Type": "External_Development_Work_Type",

  "Roads": "Roads",
  "Water Supply": "Water_Supply",
  "Sewage and Drainage System": "Sewage_and_Drainage_System",

  "Electricity Supply Transformation Station": "Electricity_Supply_Transformation_Station",
  "Drinking Water Facility": "Drinking_Water_Facility",
  "Fire Fighting Facility": "Fire_Fighting_Facility",
  "Emergency Evacuation Service": "Emergency_Evacuation_Service",
  "Solid Waste Management And Disposal": "Solid_Waste_Management_And_Disposal",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  wrap: { padding: "20px" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" },
  label: { display: "block", fontWeight: "600", marginBottom: "5px", fontSize: "13px", color: "#1a2535" },
  input: { width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" },
  inputRO: { width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box", backgroundColor: "#f0f4f8", color: "#555", cursor: "not-allowed" },
  select: { width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box", background: "#fff" },
  textarea: { width: "100%", padding: "9px 12px", border: "1px solid #ccd4e0", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box", resize: "vertical" },
  btn: { padding: "10px 24px", background: "#1f4e79", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "13px" },
  btnDel: { background: "#c0200f", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px", fontSize: "13px" },
  th: { background: "#1f4e79", color: "#fff", padding: "10px 12px", border: "1px solid #ccd4e0", textAlign: "left", fontWeight: "600" },
  td: { padding: "9px 12px", border: "1px solid #e2e8f2", verticalAlign: "top" },
  loader: { padding: "10px 14px", fontSize: "13px", color: "#1f4e79", fontStyle: "italic" },
  errorBox: { padding: "10px 14px", fontSize: "13px", color: "#c0200f", background: "#fff0f0", borderRadius: "6px", marginBottom: "12px" },
};

function FW({ label, children }) {
  return (
    <div>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

// ─── EXTERNAL DEVELOPMENT WORK ────────────────────────────────────────────────
const WORK_OPTIONS = Object.keys(WORK_TYPE_KEY_MAP);

function ExternalDevelopmentSection({
  onChange,
  tableData,
  setTableData,
  applicationNumber,
  panNumber,
}) {
  const [workType, setWorkType] = useState("");
  const [previousPercent, setPreviousPercent] = useState("");
  const [changePercent, setChangePercent] = useState("");
  const [description, setDescription] = useState("");
  const [docFile, setDocFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0); // ← used to reset file input

  // API data state
  const [apiData, setApiData] = useState(null);   // raw object from backend
  const [loadingApi, setLoadingApi] = useState(false);
  const [apiError, setApiError] = useState("");

  // ── Fetch development details once we have both IDs ──────────────────────
  useEffect(() => {
    if (!applicationNumber || !panNumber) return;

    const fetchData = async () => {
      setLoadingApi(true);
      setApiError("");
      try {
        const url =
          `http://localhost:8080/api/development-details` +
          `?application_number=${encodeURIComponent(applicationNumber)}` +
          `&pan_number=${encodeURIComponent(panNumber)}`;


        const res = await fetch(url);
        const json = await res.json();
        console.log("📦 Full API Response:", json);
        if (json.status === "success") {
          // Flatten: data may be nested under external_development_work or at root
          const raw = json.data?.external_development_work ?? json.data ?? {};
          setApiData(raw);
        } else {
          setApiError(json.message || "Failed to load development details.");
        }
      } catch (err) {
        console.error("development-details API error:", err);
        setApiError("Could not reach the server. Previous % will be unavailable.");
      } finally {
        setLoadingApi(false);
      }
    };

    fetchData();
  }, [applicationNumber, panNumber]);

  // ── When work type changes, look up its previous % from API data ──────────
  const handleWorkTypeChange = (val) => {
    setWorkType(val);
    setPreviousPercent("");   // reset first

    if (!val || !apiData) return;

    const apiKey = WORK_TYPE_KEY_MAP[val];
    if (!apiKey) return;

    // Direct key lookup (most reliable)
    if (apiData[apiKey] !== undefined && apiData[apiKey] !== null) {
      setPreviousPercent(String(apiData[apiKey]));
      return;
    }

    // Fallback: case-insensitive search across all keys
    const normalised = apiKey.replace(/_/g, "").toLowerCase();
    for (const k of Object.keys(apiData)) {
      if (k.replace(/_/g, "").toLowerCase() === normalised) {
        setPreviousPercent(String(apiData[k]));
        return;
      }
    }
  };

  // ── Notify parent so Next button enablement works ─────────────────────────
  const notifyParent = (rows) => {
    onChange({
      target: {
        name: "__development_rows",
        value: rows.length ? JSON.stringify(rows) : "",
      },
    });
  };

  const handleAdd = () => {
    if (!workType) { alert("Please select a work type."); return; }
    if (!changePercent || changePercent === "") { alert("Please enter Change Completion %."); return; }
    if (Number(changePercent) < 0 || Number(changePercent) > 100) { alert("Change Completion % must be between 0 and 100."); return; }
    const newRow = {
      workType,
      previousPercent: previousPercent || "-",
      changePercent: changePercent || "-",
      description: description || "-",
      documentName: docFile ? docFile.name : "-",
      _docFile: docFile || null,          // ← save actual File object
    };

    const updated = [...tableData, newRow];
    setTableData(updated);
    notifyParent(updated);

    setWorkType(""); setPreviousPercent(""); setChangePercent(""); setDescription(""); setDocFile(null);
    setFileInputKey((k) => k + 1); // ← reset file input field
  };

  const handleDelete = (idx) => {
    const updated = tableData.filter((_, i) => i !== idx);
    setTableData(updated);
    notifyParent(updated);
  };

  return (
    <div style={S.wrap}>

      {/* Loading / error banners */}
      {loadingApi && (
        <div style={S.loader}>⏳ Loading previous development details…</div>
      )}
      {!loadingApi && apiError && (
        <div style={S.errorBox}>⚠️ {apiError}</div>
      )}

      {/* Row 1: Work Type + Previous % */}
      <div style={S.grid2}>
        <FW label="Work Type">
          <select
            style={S.select}
            value={workType}
            onChange={(e) => handleWorkTypeChange(e.target.value)}
          >
            <option value="">-- Select Work --</option>
            {WORK_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </FW>

        <FW label="Previous Completion %">
          <input
            style={S.inputRO}
            type="text"
            value={
              loadingApi
                ? "Loading…"
                : previousPercent !== ""
                  ? previousPercent
                  : workType
                    ? "No data available"
                    : ""
            }
            readOnly
            placeholder="Select a work type first"
          />
        </FW>
      </div>

      {/* Row 2: Change % + Description */}
      <div style={S.grid2}>
        <FW label="Change Completion %">
          <input
            style={S.input}
            type="number"
            min="0"
            max="100"
            value={changePercent}
            onChange={(e) => setChangePercent(e.target.value)}
            placeholder="Enter change %"
          />
        </FW>
        <FW label="Description">
          <textarea
            style={{ ...S.textarea, minHeight: "42px", overflow: "hidden" }}
            rows={1}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            placeholder="Enter description…"
          />
        </FW>
      </div>

      {/* ADD BUTTON */}
      {/* Row 3: Document Upload */}
      <div style={{ marginBottom: "16px" }}>
        <FW label="Upload Document">
          <input
            key={fileInputKey}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            style={{ ...S.input, padding: "6px 12px", cursor: "pointer" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              // ── Blocked extensions ──
              const blockedExtensions = [".zip", ".rar", ".7z", ".tar", ".gz", ".xls", ".xlsx", ".csv", ".exe", ".xml"];
              const fileName = file.name.toLowerCase();
              const isBlocked = blockedExtensions.some((ext) => fileName.endsWith(ext));
              if (isBlocked) {
                alert("❌ This file type is not allowed.\nAllowed types: PDF, JPG, PNG, DOC, DOCX only.");
                e.target.value = "";
                return;
              }

              // ── Max size: 5MB ──
              const maxSizeMB = 5;
              if (file.size > maxSizeMB * 1024 * 1024) {
                alert(`❌ File size exceeds ${maxSizeMB}MB limit.\nPlease upload a smaller file.`);
                e.target.value = "";
                return;
              }

              setDocFile(file);
            }}
          />
          {docFile && (
            <div style={{ fontSize: "12px", color: "#1a7a3c", marginTop: "4px" }}>
              ✅ {docFile.name}
            </div>
          )}
        </FW>
      </div>

      {/* ADD BUTTON */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
        <button style={S.btn} onClick={handleAdd}>+ Add</button>
      </div>

      {/* TABLE — persists across Back navigation */}
      {tableData.length > 0 && (
        <div style={{ overflowX: "auto", width: "100%", marginTop: "20px" }}>
          <table style={{ ...S.table, marginTop: 0, minWidth: "700px" }}>
            <thead>
              <tr>
                <th style={S.th}>Work Type</th>
                <th style={S.th}>Previous %</th>
                <th style={S.th}>Change %</th>
                <th style={{ ...S.th, minWidth: "200px" }}>Description</th>
                <th style={S.th}>Document</th>
                <th style={{ ...S.th, width: "60px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafd" }}>
                  <td style={{ ...S.td, fontWeight: "600", color: "#0f3460" }}>{row.workType}</td>
                  <td style={{ ...S.td, color: "#6b7c93" }}>{row.previousPercent}</td>
                  <td style={{ ...S.td, color: "#1a7a3c", fontWeight: "600" }}>{row.changePercent}</td>
                  <td style={{ ...S.td, whiteSpace: "pre-wrap", wordBreak: "break-word", maxWidth: "260px" }}>{row.description}</td>
                  <td style={{ ...S.td, color: row.documentName !== "-" ? "#1a7a3c" : "#999" }}>
                    {row.documentName !== "-" ? `📎 ${row.documentName}` : "-"}
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

// ─── OTHER EXTERNAL WORKS ─────────────────────────────────────────────────────
function OtherExternalWorksSection({ fields, formValues, onChange }) {
  return (
    <div style={S.wrap}>
      <div style={S.grid2}>
        {fields.map((f) => (
          <FW key={f.name} label={f.label}>
            {f.type === "select" ? (
              <select
                style={S.select}
                name={f.name}
                value={formValues[f.name] || ""}
                onChange={onChange}
              >
                <option value="">-- Select --</option>
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                style={S.input}
                type={f.type}
                name={f.name}
                value={formValues[f.name] || ""}
                onChange={onChange}
                placeholder={`Enter ${f.label}`}
              />
            )}
          </FW>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function DevelopmentDetailsForm({
  subSectionId,
  formValues = {},
  onChange = () => { },
  tableStore = {},
  setTableStore = () => { },
  // applicationNumber & panNumber passed down from ChangeRequest
  applicationNumber,
  panNumber,
  // previewData kept for backward-compat but no longer needed for % lookup
  previewData,
}) {
  const subSection = DEVELOPMENT_DETAILS_SUBSECTIONS.find((s) => s.id === subSectionId);
  if (!subSection) return null;

  const tableData = tableStore[subSectionId] || [];
  const setTableData = (rows) =>
    setTableStore((prev) => ({ ...prev, [subSectionId]: rows }));

  if (subSectionId === "external_development") {
    return (
      <ExternalDevelopmentSection
        onChange={onChange}
        tableData={tableData}
        setTableData={setTableData}
        applicationNumber={applicationNumber}
        panNumber={panNumber}
      />
    );
  }

  if (subSectionId === "other_external_works") {
    return (
      <OtherExternalWorksSection
        fields={subSection.fields}
        formValues={formValues}
        onChange={onChange}
      />
    );
  }

  return null;
}