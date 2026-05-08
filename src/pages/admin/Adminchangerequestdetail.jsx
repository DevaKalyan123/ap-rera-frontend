import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPut, BASE_URL } from "../../api/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";
import "../../styles/admin/adminChangeRequest.css";

// ─── SECTION LABEL MAP ────────────────────────────────────────────────────────
const SECTION_LABELS = {
  project_details:     "Project Details",
  promoter_details:    "Promoter Details",
  development_details: "Development Details",
  associate_details:   "Associate Details",
  upload_documents:    "Upload Documents",
};

const SUBSECTION_LABELS = {
  project_registration:    "Project Details",
  project_material_facts:  "Project Material Facts",
  bank_account:            "Bank Account Details",
  promoter_personal:       "Promoter Personal Details",
  other_rera:              "Other State RERA Registration",
  past_projects:           "Projects Launched in Past 5 Years",
  litigations:             "Litigations",
  promoter2:               "Promoter 2 Details",
  external_development:    "External Development Work",
  other_external_works:    "Other External Development Works",
  project_agent:           "Project Agent",
  architects:              "Project Architects",
  structural_engineers:    "Structural Engineers",
  contractors:             "Project Contractors",
  chartered_accountant:    "Chartered Accountant",
  project_engineers:       "Project Engineers",
  documents:               "Upload Documents",
  consultancy_details:     "Consultancy Details",
};

const FIELD_LABELS = {
  mobileNumber:      "Mobile Number",
  emailId:           "Email ID",
  promoterName:      "Name",
  fatherName:        "Father's Name",
  aadhaarNumber:     "Aadhaar Number",
  gstNumber:         "GST Number",
  licenseNumber:     "License Number",
  licenseDate:       "License Date",
  websiteUrl:        "Website URL",
  bankState:         "Bank State",
  bankName:          "Bank Name",
  branchName:        "Branch Name",
  accountNo:         "Account Number",
  accountHolderName: "Account Holder Name",
  ifscCode:          "IFSC Code",
};

const getFieldLabel = (name) => FIELD_LABELS[name] || name;

// ─── DATA JSON DISPLAY ────────────────────────────────────────────────────────
// Converts camelCase field names → human-readable labels and shows as a
// neat key-value table instead of raw JSON / "ADDITIONAL DATA (JSON)" block.
const toLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();

const DataJsonDisplay = ({ json }) => {
  if (!json) return <span style={{ color: "#aaa" }}>—</span>;

  let parsed = json;
  if (typeof json === "string") {
    try { parsed = JSON.parse(json); } catch { return <span style={{ color: "#aaa" }}>—</span>; }
  }

  const entries = Object.entries(parsed).filter(
    ([key, val]) =>
      !key.startsWith("__") &&
      val !== null &&
      val !== undefined &&
      String(val).trim() !== ""
  );

  if (!entries.length) return <span style={{ color: "#aaa" }}>—</span>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {entries.map(([key, val]) => (
        <div key={key} style={{ display: "flex", alignItems: "baseline", gap: "6px", fontSize: "12.5px" }}>
          <span style={{
            fontWeight: "600",
            color: "#1e4d8f",
            whiteSpace: "nowrap",
            minWidth: "fit-content",
          }}>
            {toLabel(key)} :
          </span>
          <span style={{ color: "#2d3748" }}>
            {String(val)}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── REJECT REASON MODAL ──────────────────────────────────────────────────────
function RejectModal({ onConfirm, onCancel, loading }) {
  const [reason, setReason] = useState("");
  return (
    <div className="acr-modal-overlay">
      <div className="acr-modal">
        <div className="acr-modal-header">
          <span>⚠️ Reject Change Request</span>
          <button className="acr-modal-close" onClick={onCancel}>✕</button>
        </div>
        <div className="acr-modal-body">
          <p style={{ marginBottom: 12, color: "#444", fontSize: 13 }}>
            Please provide a reason for rejecting this change request. This will be visible to the applicant.
          </p>
          <label style={{ fontWeight: "700", fontSize: 13, display: "block", marginBottom: 6 }}>
            Rejection Reason <span style={{ color: "#c0200f" }}>*</span>
          </label>
          <textarea
            className="acr-modal-textarea"
            rows={5}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter detailed reason for rejection..."
          />
          {reason.trim().length > 0 && reason.trim().length < 10 && (
            <p style={{ color: "#c0200f", fontSize: 12, marginTop: 4 }}>
              Please enter at least 10 characters.
            </p>
          )}
        </div>
        <div className="acr-modal-footer">
          <button className="acr-modal-cancel-btn" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            className="acr-modal-reject-btn"
            onClick={() => onConfirm(reason)}
            disabled={loading || reason.trim().length < 10}
          >
            {loading ? "Rejecting..." : "Confirm Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── APPROVE CONFIRM MODAL ────────────────────────────────────────────────────
function ApproveModal({ onConfirm, onCancel, loading }) {
  const [remarks, setRemarks] = useState("");
  return (
    <div className="acr-modal-overlay">
      <div className="acr-modal">
        <div className="acr-modal-header" style={{ borderBottom: "3px solid #1a7a3c" }}>
          <span>✅ Approve Change Request</span>
          <button className="acr-modal-close" onClick={onCancel}>✕</button>
        </div>
        <div className="acr-modal-body">
          <p style={{ marginBottom: 12, color: "#444", fontSize: 13 }}>
            Are you sure you want to approve this change request? You may add optional remarks.
          </p>
          <label style={{ fontWeight: "700", fontSize: 13, display: "block", marginBottom: 6 }}>
            Remarks (Optional)
          </label>
          <textarea
            className="acr-modal-textarea"
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter any remarks (optional)..."
          />
        </div>
        <div className="acr-modal-footer">
          <button className="acr-modal-cancel-btn" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            className="acr-modal-approve-btn"
            onClick={() => onConfirm(remarks)}
            disabled={loading}
          >
            {loading ? "Approving..." : "✔ Confirm Approve"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN DETAIL COMPONENT ────────────────────────────────────────────────────
const AdminChangeRequestDetail = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [sidebarOpen,   setSidebarOpen]   = useState(true);
  const [data,          setData]          = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showReject,    setShowReject]    = useState(false);
  const [showApprove,   setShowApprove]   = useState(false);
  const [toast,         setToast]         = useState(null);

  useEffect(() => { loadDetail(); }, [id]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const res = await apiGet(`/api/change-request/${id}`);
      console.log("🔥 FULL API RESPONSE 👉", res);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleApprove = async () => {
    setActionLoading(true);
    try {
      const email = data?.request?.email;
      console.log("📧 EMAIL 👉", email);
      if (!email) {
        showToast("error", "Email not available for this request");
        setActionLoading(false);
        return;
      }
      console.log("📤 Calling APPROVE API...");
      await apiPut(`/api/change-request/approve/${id}`, { email });
      console.log("✅ Approved Successfully");
      showToast("success", "Change request approved & mail sent");
      loadDetail();
    } catch (err) {
      console.error("❌ Approve Error:", err);
      showToast("error", err.message || "Failed to approve");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (reason) => {
    setActionLoading(true);
    try {
      await apiPut(`/api/change-request/reject/${id}`, {
        email: request.email,
        remarks: reason,
      });
      setShowReject(false);
      showToast("error-soft", "Change request rejected.");
      loadDetail();
    } catch (err) {
      showToast("error", err.message || "Failed to reject.");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }) : "—";

  // Group changes by section > subsection
  const groupChanges = (changes = []) => {
    const grouped = {};
    changes.forEach((c) => {
      const secKey = c.section;
      const subKey = c.subsection;
      if (!grouped[secKey]) grouped[secKey] = {};
      if (!grouped[secKey][subKey]) grouped[secKey][subKey] = [];
      grouped[secKey][subKey].push(c);
    });
    return grouped;
  };

  const STATUS_STYLE = {
    SUBMITTED: { color: "#1e6bbf", bg: "#e8f0fb" },
    APPROVED:  { color: "#1a7a3c", bg: "#e6f6ec" },
    REJECTED:  { color: "#c0200f", bg: "#fdecea" },
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar sidebarOpen={sidebarOpen} />
        <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>
          <TopHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="admin-dashboard-content">
            <div className="acr-loading">Loading change request details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="admin-layout">
        <AdminSidebar sidebarOpen={sidebarOpen} />
        <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>
          <TopHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="admin-dashboard-content">
            <div className="acr-no-data">Change request not found.</div>
          </div>
        </div>
      </div>
    );
  }

  const { request, changes } = data;
  const grouped = groupChanges(changes);
  const statusStyle = STATUS_STYLE[request.status] || STATUS_STYLE.SUBMITTED;
  const isSubmitted = request.status === "SUBMITTED";

  return (
    <div className="admin-layout">
      <AdminSidebar sidebarOpen={sidebarOpen} />

      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>
        <TopHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="admin-dashboard-content">

          {/* ── TOAST ── */}
          {toast && (
            <div className={`acr-toast acr-toast-${toast.type}`}>
              {toast.type === "success" ? "✅" : "❌"} {toast.msg}
            </div>
          )}

          {/* ── BACK + TITLE ── */}
          <div className="acr-detail-topbar">
            <button className="acr-back-btn" onClick={() => navigate("/admin/change-requests")}>
              ← Back to List
            </button>
            <div>
              <h2 className="acr-page-title">Change Request Detail</h2>
              <span className="acr-ref-label">Ref: {request.reference_no}</span>
            </div>
            <span className="acr-status-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
              {request.status}
            </span>
          </div>

          {/* ══ REQUEST INFO CARD ══════════════════════════════════════════ */}
          <div className="acr-detail-card">
            <div className="acr-detail-card-header">📋 Request Information</div>
            <div className="acr-detail-grid">
              {[
                { label: "Reference No",       value: request.reference_no           },
                { label: "Application Number", value: request.application_number     },
                { label: "PAN Number",         value: request.pan_number             },
                { label: "Applicant Name",     value: request.applicant_name         },
                { label: "Project Name",       value: request.project_name           },
                { label: "Submitted On",       value: formatDate(request.created_at) },
                { label: "Amount",             value: `₹ ${request.amount?.toLocaleString("en-IN") || 5000}` },
                { label: "Payment Gateway",    value: request.payment_gateway        },
                { label: "Transaction ID",     value: request.payment_transaction_id },
                {
                  label: "Payment Status", value: request.payment_status, badge: true,
                  color: request.payment_status === "SUCCESS" ? "#1a7a3c" : "#b07800",
                  bg:    request.payment_status === "SUCCESS" ? "#e6f6ec" : "#fff8e1",
                },
                { label: "Email", value: request.email },
              ].map((item) => (
                <div className="acr-detail-item" key={item.label}>
                  <div className="acr-detail-label">{item.label}</div>
                  <div className="acr-detail-value">
                    {item.badge ? (
                      <span style={{
                        background: item.bg, color: item.color,
                        padding: "2px 12px", borderRadius: "20px",
                        fontWeight: "700", fontSize: "12px",
                      }}>
                        {item.value}
                      </span>
                    ) : (
                      item.value || "—"
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ CHANGES SECTION ═══════════════════════════════════════════ */}
          <div className="acr-detail-card">
            <div className="acr-detail-card-header">
              🔄 Requested Changes
              <span style={{
                marginLeft: "auto", fontSize: 12, fontWeight: "600",
                background: "#e8f0fb", color: "#1e6bbf",
                padding: "3px 12px", borderRadius: "20px",
              }}>
                {changes?.length || 0} change{changes?.length !== 1 ? "s" : ""}
              </span>
            </div>

            {Object.entries(grouped).map(([sectionKey, subsections]) => (
              <div key={sectionKey} className="acr-section-group">

                {/* Section Header */}
                <div className="acr-section-header">
                  {SECTION_LABELS[sectionKey] || sectionKey}
                </div>

                {Object.entries(subsections).map(([subKey, rows]) => {
                  // Split rows: rows WITH data_json vs rows WITHOUT
                  const normalRows = rows.filter((r) => !r.data_json ||
                    (typeof r.data_json === "object"
                      ? Object.keys(r.data_json).length === 0
                      : String(r.data_json).trim() === "{}" || String(r.data_json).trim() === ""));

                  const jsonRows = rows.filter((r) => r.data_json &&
                    (typeof r.data_json === "object"
                      ? Object.keys(r.data_json).length > 0
                      : String(r.data_json).trim() !== "{}" && String(r.data_json).trim() !== ""));

                  return (
                    <div key={subKey} className="acr-subsection-group">

                      {/* Subsection Label */}
                      <div className="acr-subsection-label">
                        {SUBSECTION_LABELS[subKey] || subKey}
                        <span className="acr-change-count">
                          {rows.length} change{rows.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* ── Normal rows table (old→new, no data_json) ── */}
                      {normalRows.length > 0 && (
                        <table className="acr-changes-table">
                          <thead>
                            <tr>
                              <th>Field</th>
                              <th>Old Value</th>
                              <th>New Value</th>
                              <th>Description</th>
                              <th>Mode</th>
                              <th>Documents</th>
                            </tr>
                          </thead>
                          <tbody>
                            {normalRows.map((c) => (
                              <tr key={c.id}>
                                <td className="acr-field-name">
                                  {getFieldLabel(c.field_name) || "—"}
                                </td>
                                <td className="acr-old-val">{c.old_value || "—"}</td>
                                <td className="acr-new-val">{c.new_value || "—"}</td>
                                <td style={{ color: "#555", fontSize: "12.5px" }}>{c.description || "—"}</td>
                                <td>
                                  <span className="acr-mode-badge">{c.change_mode}</span>
                                </td>
                                <td>
                                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                    {c.old_file_path && (
                                      <a href={`${BASE_URL}/${c.old_file_path}`} target="_blank"
                                        rel="noopener noreferrer" className="acr-doc-link old">
                                        📄 Old File
                                      </a>
                                    )}
                                    {c.new_file_path && (
                                      <a href={`${BASE_URL}/${c.new_file_path}`} target="_blank"
                                        rel="noopener noreferrer" className="acr-doc-link new">
                                        📄 New File
                                      </a>
                                    )}
                                    {c.proof_document_name && (
                                      <a href={`${BASE_URL}/${c.proof_document_name}`} target="_blank"
                                        rel="noopener noreferrer" className="acr-doc-link proof">
                                        📎 Proof
                                      </a>
                                    )}
                                    {!c.old_file_path && !c.new_file_path && !c.proof_document_name && (
                                      <span style={{ color: "#aaa", fontSize: 12 }}>—</span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}

                      {/* ── NEW mode rows with data_json → neat key-value table ── */}
                      {jsonRows.length > 0 && (
                        <table className="acr-changes-table" style={{ marginTop: normalRows.length > 0 ? "12px" : "0" }}>
                          <thead>
                            <tr>
                              <th>Field</th>
                              <th>Old Value</th>
                              <th>New Value / Data</th>
                              <th>Description</th>
                              <th>Mode</th>
                              <th>Documents</th>
                            </tr>
                          </thead>
                          <tbody>
                            {jsonRows.map((c) => (
                              <tr key={c.id}>
                                <td className="acr-field-name">
                                  {getFieldLabel(c.field_name) || "—"}
                                </td>
                                <td className="acr-old-val">{c.old_value || "—"}</td>

                                {/* ✅ DataJsonDisplay here — no raw JSON, no <pre> block */}
                                <td style={{ padding: "8px", verticalAlign: "top" }}>
                                  <DataJsonDisplay json={c.data_json} />
                                </td>

                                <td style={{ color: "#555", fontSize: "12.5px" }}>{c.description || "—"}</td>
                                <td>
                                  <span className="acr-mode-badge">{c.change_mode}</span>
                                </td>
                                <td>
                                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                    {c.old_file_path && (
                                      <a href={`${BASE_URL}/${c.old_file_path}`} target="_blank"
                                        rel="noopener noreferrer" className="acr-doc-link old">
                                        📄 Old File
                                      </a>
                                    )}
                                    {c.new_file_path && (
                                      <a href={`${BASE_URL}/${c.new_file_path}`} target="_blank"
                                        rel="noopener noreferrer" className="acr-doc-link new">
                                        📄 New File
                                      </a>
                                    )}
                                    {c.proof_document_name && (
                                      <a href={`${BASE_URL}/${c.proof_document_name}`} target="_blank"
                                        rel="noopener noreferrer" className="acr-doc-link proof">
                                        📎 Proof
                                      </a>
                                    )}
                                    {!c.old_file_path && !c.new_file_path && !c.proof_document_name && (
                                      <span style={{ color: "#aaa", fontSize: 12 }}>—</span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}

                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ══ ADMIN ACTION CARD (only if SUBMITTED) ═════════════════════ */}
          {isSubmitted && (
            <div className="acr-detail-card acr-action-card">
              <div className="acr-detail-card-header">⚖️ Admin Action</div>
              <div className="acr-action-body">
                <p className="acr-action-note">
                  Review all the changes above carefully before taking action.
                  This action will notify the applicant and cannot be undone.
                </p>
                <div className="acr-action-btns">
                  <button
                    className="acr-approve-btn"
                    onClick={handleApprove}
                    disabled={actionLoading}
                  >
                    ✔ Approve Request
                  </button>
                  <button
                    className="acr-reject-btn"
                    onClick={() => setShowReject(true)}
                    disabled={actionLoading}
                  >
                    ✕ Reject Request
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══ REMARKS CARD (if already processed) ═══════════════════════ */}
          {!isSubmitted && (
            <div className="acr-detail-card">
              <div className="acr-detail-card-header">
                {request.status === "APPROVED" ? "✅ Approval Remarks" : "❌ Rejection Reason"}
              </div>
              <div className="acr-remarks-display" style={{
                borderLeft: `4px solid ${statusStyle.color}`,
                background: statusStyle.bg,
              }}>
                {request.rejected_reason || request.remarks || "No remarks provided."}
              </div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                Updated: {formatDate(request.updated_at)}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── MODALS ── */}
      {showApprove && (
        <div className="acr-modal-overlay">
          <div className="acr-modal" style={{ textAlign: "center", padding: "30px" }}>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#1a7a3c", marginBottom: "10px" }}>
              ✅ Approved Successfully
            </div>
            <div style={{ fontSize: "13px", color: "#555", marginBottom: "20px" }}>
              The request has been approved successfully.
            </div>
            <button className="acr-approve-btn" onClick={() => setShowApprove(false)}>
              OK
            </button>
          </div>
        </div>
      )}

      {showReject && (
        <RejectModal
          onConfirm={handleReject}
          onCancel={() => setShowReject(false)}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default AdminChangeRequestDetail;