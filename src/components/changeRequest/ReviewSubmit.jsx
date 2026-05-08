import React from "react";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  table:  { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th:     { background: "#0f3460", color: "#fff", padding: "10px 12px", border: "1px solid #ccd4e0", textAlign: "left", fontWeight: "600" },
  td:     { padding: "9px 12px", border: "1px solid #e2e8f2", verticalAlign: "top" },
  oldVal: { color: "#6b7c93" },
  newVal: { color: "#1a7a3c", fontWeight: "600" },
  secHdr: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 16px",
    background: "linear-gradient(90deg,#eef3fb,#f5f7fc)",
    borderBottom: "1px solid #e2e8f2",
  },
  secName:  { fontSize: "13px", fontWeight: "700", color: "#0f3460", textTransform: "uppercase", letterSpacing: "0.03em" },
  secCount: { fontSize: "11px", background: "#0f3460", color: "#fff", padding: "2px 10px", borderRadius: "20px", fontWeight: "600" },
  group:    { border: "1px solid #e2e8f2", borderRadius: "8px", overflow: "hidden", marginBottom: "18px", boxShadow: "0 1px 4px rgba(15,52,96,0.07)" },
};

// ─── REVIEW & SUBMIT ─────────────────────────────────────────────────────────
export default function ReviewSubmit({ reviewRows, onBack, onSubmit }) {

  // Group rows by subLabel (subsection name)
  const grouped = reviewRows.reduce((acc, row) => {
    const key = row.subLabel || row.section;
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});

  return (
    <div className="cr-main-card">
      <div className="cr-main-card-header">
        <span>③</span> Review Changes &amp; Submit
      </div>
      <div className="cr-main-card-body">

        {/* ── SUMMARY ───────────────────────────────────────────────────── */}
        <div className="cr-section-divider">
          <span className="cr-section-divider-dot"></span>
          <span className="cr-section-divider-title">Summary of Changes</span>
          <span className="cr-section-divider-line"></span>
        </div>

        {reviewRows.length > 0 ? (
          <>
            <div style={{ marginBottom: 14, fontSize: 13, color: "var(--text-mid)" }}>
              <strong style={{ color: "var(--primary)" }}>{reviewRows.length}</strong> change{reviewRows.length > 1 ? "s" : ""} across{" "}
              <strong style={{ color: "var(--primary)" }}>{Object.keys(grouped).length}</strong> section{Object.keys(grouped).length > 1 ? "s" : ""}
            </div>

            {/* ── ONE GROUP PER SUBSECTION ── */}
            {Object.entries(grouped).map(([subName, rows]) => (
              <div key={subName} style={S.group}>

                {/* Heading = subsection name */}
                <div style={S.secHdr}>
                  <span style={S.secName}>{subName}</span>
                  <span style={S.secCount}>{rows.length} change{rows.length > 1 ? "s" : ""}</span>
                </div>

                {/* ── BANK ACCOUNT — label:value grid format ── */}
                {rows[0]?.type === "bank" ? (
                  <div style={{ padding: "16px 20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 32px" }}>
                      {rows.map((row, i) => (
                        <div key={i} style={{ fontSize: "13px", paddingBottom: "6px", borderBottom: "1px solid #f0f3f8" }}>
                          <span style={{ fontWeight: "700", color: "#1a2535" }}>{row.field}:</span>{" "}
                          <span style={{ color: "#333" }}>{row.newValue || "-"}</span>
                          {row.documentUrl && (
                            <span style={{ marginLeft: "8px" }}>
                              <a href={row.documentUrl} target="_blank" rel="noopener noreferrer"
                                style={{ color: "#0f3460", fontWeight: "600", fontSize: "12px" }}>View</a>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                ) : rows[0]?.type === "associate_new" ? (
                  /* ── ASSOCIATE NEW MODE — exact same table as form (all field columns) ── */
                  <table style={S.table}>
                    <thead>
                      <tr>
                        {/* Dynamic headers from fieldHeaders of first row */}
                        {(rows[0]?.fieldHeaders || []).map((fh) => (
                          <th key={fh.label} style={S.th}>{fh.label}</th>
                        ))}
                        <th style={S.th}>Description</th>
                        <th style={S.th}>Document</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafd" }}>
                          {(row.fieldHeaders || []).map((fh) => (
                            <td key={fh.label} style={S.td}>{fh.value}</td>
                          ))}
                          <td style={{ ...S.td, color: "#555", fontSize: "12.5px" }}>{row.description || "-"}</td>
                          <td style={S.td}>
                            {row.documentUrl
                              ? <a href={row.documentUrl} target="_blank" rel="noopener noreferrer"
                                  style={{ color: "#0f3460", fontWeight: "600" }}>{row.document}</a>
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                ) : rows[0]?.type === "associate_old" ? (
                  /* ── ASSOCIATE OLD MODE — Field | Old Value | New Value | Description | Document ── */
                  <table style={S.table}>
                    <thead>
                      <tr>
                        <th style={{ ...S.th, width: "20%" }}>Field</th>
                        <th style={{ ...S.th, width: "18%" }}>Old Value</th>
                        <th style={{ ...S.th, width: "18%" }}>New Value</th>
                        <th style={{ ...S.th, width: "22%" }}>Description</th>
                        <th style={S.th}>Document</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafd" }}>
                          <td style={{ ...S.td, fontWeight: "600", color: "#0f3460" }}>{row.field}</td>
                          <td style={{ ...S.td, ...S.oldVal }}>{row.oldValue || "-"}</td>
                          <td style={{ ...S.td, ...S.newVal }}>{row.newValue || "-"}</td>
                          <td style={{ ...S.td, color: "#555", fontSize: "12.5px" }}>{row.description || "-"}</td>
                          <td style={S.td}>
                            {row.documentUrl
                              ? <a href={row.documentUrl} target="_blank" rel="noopener noreferrer"
                                  style={{ color: "#0f3460", fontWeight: "600" }}>{row.document}</a>
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                ) : (
                  /* ── ALL OTHER SECTIONS — standard Field|Old|New|Description|Document table ── */
                  <table style={S.table}>
                    <thead>
                      <tr>
                        <th style={{ ...S.th, width: "20%" }}>Field</th>
                        <th style={{ ...S.th, width: "18%" }}>Old Value</th>
                        <th style={{ ...S.th, width: "18%" }}>New Value</th>
                        <th style={{ ...S.th, width: "22%" }}>Description</th>
                        <th style={S.th}>Document</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafd" }}>
                          <td style={{ ...S.td, fontWeight: "600", color: "#0f3460" }}>{row.field}</td>
                          <td style={{ ...S.td, ...S.oldVal }}>{row.oldValue || "-"}</td>
                          <td style={{ ...S.td, ...S.newVal }}>{row.newValue}</td>
                          <td style={{ ...S.td, color: "#555", fontSize: "12.5px" }}>{row.description || "-"}</td>
                         <td style={S.td}>
  {row.documentUrl
    ? <a href={row.documentUrl} target="_blank" rel="noopener noreferrer"
        style={{ color: "#0f3460", fontWeight: "600" }}>📎 {row.document}</a>
    : row.document && row.document !== "-"
      ? <span style={{ color: "#1a7a3c" }}>📎 {row.document}</span>
      : "-"}
</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="cr-note" style={{ marginBottom: 20 }}>
            <span className="cr-note-icon">⚠️</span>
            <span>No changes entered. Please go back and fill at least one field.</span>
          </div>
        )}

        <div className="cr-btn-row">
          <button className="cr-btn-secondary" onClick={onBack}>← Back</button>
          <button className="cr-btn-primary accent"
            disabled={reviewRows.length === 0} onClick={onSubmit}>
            ✔ Submit Change Request
          </button>
        </div>

      </div>
    </div>
  );
}