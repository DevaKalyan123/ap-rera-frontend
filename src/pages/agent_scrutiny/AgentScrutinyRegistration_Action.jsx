import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../../api/api";
import AgentWizard from "../../components/scrutiny/AgentWizard";
import ScrutinyLayout from "../../components/scrutiny/ScrutinyLayout";
import "../../styles/scrutiny/scrutiny_projectregistation_1.css";
import { useAdmin } from "../../context/AdminContext";

const displayText = (value, fallback = "N/A") => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  return String(value);
};

const formatDateTime = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? displayText(value)
    : date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
};

const getDaysFromDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
};

function DataTable({ className = "", columns, rows, emptyText = "No data available." }) {
  return (
    <div className="spr-table-wrap">
      <table className={`spr-table ${className}`.trim()}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render ? column.render(row, rowIndex) : displayText(row[column.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="spr-empty-cell">
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AgentScrutinyRegistration_Action() {
  const navigate = useNavigate();
  const { admin } = useAdmin();
  const dept = admin?.department?.toLowerCase();

  const location = useLocation();
  const applicationNumber = location.state?.applicationNumber || sessionStorage.getItem("agentApplicationNumber") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (!applicationNumber) {
      setError("Application number is missing.");
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const resp = await apiGet(`/api/agent-scrutiny/registrations/details?application_no=${applicationNumber}`);
        if (resp && !resp.error) {
          setSummary(resp);
        } else {
          setError(resp?.error || "Agent not found");
        }
      } catch (loadError) {
        console.error(loadError);
        setError(loadError.message || "Unable to load agent details.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [applicationNumber]);

  const summaryData = useMemo(() => {
    if (!summary) return {};

    return {
      agentName: displayText(summary.applicant_name),
      agentType: displayText(summary.promoter_display),
      district: displayText(summary.district),
      mobile: displayText(summary.mobile),
      email: displayText(summary.email),
      firstTransactionDate: formatDateTime(summary.created_at),
      noOfDays: displayText(getDaysFromDate(summary.created_at)),
      scrutinyCount: displayText(summary.scrutiny_label),
    };
  }, [summary]);

  const submitFinalRemarks = async () => {
    try {
       await apiPost("/api/agent-scrutiny/final-submit", {
         application_no: applicationNumber,
         is_shortfall: "no",
         department: dept,
         remarks: remarks
       });
       alert("Remarks submitted successfully!");
       navigate("/agent-scrutiny/registrations");
     } catch (err) {
       console.error(err);
       alert("Error submitting remarks");
     }
  };

  return (
    <ScrutinyLayout>
      <div className="spr-page">
        <div className="spr-shell">
          <div className="spr-topbar">
            <div className="spr-breadcrumb">
              <span>You are here :</span>
              <span>DashBoard</span>
              <span>/</span>
              <span>Agent Registration</span>
              <span>/</span>
              <span>Scrutiny Engineer Requests</span>
              <span>/</span>
              <span>Action</span>
            </div>
            <div className="spr-brand">
              <span>RERA-SE</span>
              <button type="button" className="spr-icon-btn" onClick={() => window.print()} title="Print">
                <i className="fa-solid fa-print" />
              </button>
            </div>
          </div>

          <div className="spr-body">
            <div className="spr-header-row">
              <div>
                <h1 className="spr-title">Action</h1>
                <p className="spr-subtitle">Submit scrutiny review for application {displayText(applicationNumber)}.</p>
              </div>
              <button type="button" className="spr-secondary-btn" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>

            <AgentWizard currentStep={3} />

            {loading ? (
              <div className="spr-state-card">Loading agent details...</div>
            ) : error ? (
              <div className="spr-state-card spr-error">{error}</div>
            ) : (
              <>
                <div className="spr-card">
                  <DataTable
                    columns={[
                      { key: "agentName", label: "Agent Name" },
                      { key: "agentType", label: "Agent Type" },
                      { key: "district", label: "District" },
                      { key: "firstTransactionDate", label: "Registration Date" },
                      { key: "noOfDays", label: "No.of Days" },
                      { key: "scrutinyCount", label: "Scrutiny Count" },
                    ]}
                    rows={[summaryData]}
                  />
                </div>

                {dept === "verification" ? (
                  <div className="spr-remarks-card">
                    <div className="spr-remarks-head">
                      <h3>Enter Remarks (Data Shortfall Remarks if any)<span>*</span></h3>
                      <span>{5000 - remarks.length}</span>
                    </div>
                    <textarea
                      className="spr-remarks-box"
                      maxLength={5000}
                      value={remarks}
                      onChange={(event) => setRemarks(event.target.value)}
                      placeholder="Maximum of 5000 Characters"
                    />
                    <div style={{ marginTop: "10px", textAlign: "right" }}>
                      <button className="spr-btn" onClick={submitFinalRemarks}>Submit Review</button>
                    </div>
                  </div>
                ) : (
                  <div className="spr-state-card spr-error">
                    You do not have permission to submit remarks.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ScrutinyLayout>
  );
}
