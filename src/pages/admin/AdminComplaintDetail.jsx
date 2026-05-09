import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import "../../styles/admin/AdminComplaintDetail.css";
const DOC_BASE_URL = "http://localhost:8080/api/complint/document/";

const Field = ({ label, value, mono }) => (
  <div className="AdminComplaintDetail-row">
    <span className="AdminComplaintDetail-label">{label}</span>
    <span className={`AdminComplaintDetail-value${mono ? " mono" : ""}`}>{value || "—"}</span>
  </div>
);

const addrStr = (a) =>
  a ? [a.line1, a.line2, a.district, a.state, a.pincode].filter(Boolean).join(", ") : "—";

const fmtDate = () =>
  new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

const fmtHearingDate = (isoStr) => {
  if (!isoStr) return "—";
  return new Date(isoStr).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

/* ─────────────────────────────────────────────
   FIX: Backend sends "DD-MM-YYYY HH:MM:SS"
   JS new Date() needs ISO → parse manually
───────────────────────────────────────────── */
const parseBackendDate = (str) => {
  if (!str) return null;
  // Already ISO format  e.g. "2026-04-10T10:00:00"
  if (str.includes("T") || str.match(/^\d{4}-/)) return new Date(str);
  // Backend format: "10-04-2026 10:00:00"
  const [datePart, timePart] = str.split(" ");
  const [dd, mm, yyyy] = datePart.split("-");
  return new Date(`${yyyy}-${mm}-${dd}T${timePart || "00:00:00"}`);
};

const fmtBackendDate = (str) => {
  const d = parseBackendDate(str);
  if (!d || isNaN(d)) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

/* ─────────────────────────────────────────────
   DOCUMENT VIEWER MODAL
───────────────────────────────────────────── */
const DocViewerModal = ({ filename, label, onClose }) => {
  const url = `${DOC_BASE_URL}${filename}`;
  const isPdf = filename?.toLowerCase().endsWith(".pdf");
  const isImage = /\.(png|jpe?g|gif|webp|bmp)$/i.test(filename || "");

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.target = "_blank";
    a.click();
  };

  return (
    <div className="AdminComplaintDetail-docviewer-backdrop" onClick={onClose}>
      <div style={{ width: "100%", maxWidth: 960 }} onClick={(e) => e.stopPropagation()}>
        <div className="AdminComplaintDetail-docviewer-bar">
          <span className="AdminComplaintDetail-docviewer-name">📄 {label || filename}</span>
          <div className="AdminComplaintDetail-docviewer-actions">
            <button className="AdminComplaintDetail-docviewer-btn" onClick={handleDownload}>
              ⬇ Download
            </button>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="AdminComplaintDetail-docviewer-btn"
              style={{ textDecoration: "none" }}
            >
              ↗ Open Tab
            </a>
            <button className="AdminComplaintDetail-docviewer-close" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="AdminComplaintDetail-docviewer-frame">
          {isPdf ? (
            <iframe src={`${url}#toolbar=1`} title={label} />
          ) : isImage ? (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0" }}>
              <img src={url} alt={label} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </div>
          ) : (
            <div className="AdminComplaintDetail-docviewer-nopreview">
              <span className="AdminComplaintDetail-docviewer-nopreview-icon">📎</span>
              <p>Preview not available for this file type. Use Download or Open Tab to view.</p>
              <button className="AdminComplaintDetail-btn-primary" onClick={handleDownload}>⬇ Download File</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   REJECT MODAL
───────────────────────────────────────────── */
const RejectModal = ({ data, onClose, onSuccess }) => {
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!remark.trim()) return;
    setLoading(true);
    try {
      await fetch("http://localhost:8080/api/complint/send-rejection-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          complaint_id: data.complaint?.complaint_id,
          email: data.complainant?.email,
          name: data.complainant?.name,
          subject: data.complaint?.subject || data.complaint?.complaint_regarding,
          description: data.complaint?.description,
          admin_remark: remark,
        }),
      });
      onSuccess("Rejection mail sent successfully.");
    } catch {
      onSuccess("Request submitted (server may be offline).", "error");
    } finally { setLoading(false); }
  };

  return (
    <div className="AdminComplaintDetail-modal-backdrop">
      <div className="AdminComplaintDetail-modal">
        <div className="AdminComplaintDetail-modal-head">
          <div className="AdminComplaintDetail-modal-head-left">
            <span className="AdminComplaintDetail-modal-head-icon">🚫</span>
            <div className="AdminComplaintDetail-modal-head-text">
              <div className="AdminComplaintDetail-modal-title">Reject Complaint</div>
              <div className="AdminComplaintDetail-modal-sub">Your reason will be emailed to the complainant.</div>
            </div>
          </div>
          <button className="AdminComplaintDetail-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="AdminComplaintDetail-modal-body">
          <div className="AdminComplaintDetail-field">
            <label className="AdminComplaintDetail-field-label">Rejection Reason *</label>
            <textarea
              className="AdminComplaintDetail-textarea"
              placeholder="e.g. Insufficient documents provided, complaint does not fall under RERA jurisdiction..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 7, padding: "10px 14px", fontSize: 12, color: "#991b1b", lineHeight: 1.6 }}>
            ⚠️ An email will be sent to <strong>{data.complainant?.email}</strong> with your rejection reason. This action cannot be undone.
          </div>
        </div>
        <div className="AdminComplaintDetail-modal-footer">
          <button className="AdminComplaintDetail-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="AdminComplaintDetail-btn-danger" onClick={submit} disabled={loading || !remark.trim()}>
            {loading ? "Sending…" : "✕ Reject & Send Mail"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   APPROVE MODAL  — Legal Notice Document
───────────────────────────────────────────── */
const ApproveModal = ({ data, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [adminRemark, setAdminRemark] = useState("");
  const [hearingDate, setHearingDate] = useState("");
  const [hearingPlace, setHearingPlace] = useState("");
  const [stampImg, setStampImg] = useState(null);
  const [signImg, setSignImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const noticeRef = useRef(null);

  const step1Valid = adminRemark.trim() && hearingDate && hearingPlace.trim();

  const rawR = data.respondent || {};
  const respondent = {
    name: rawR.name || "",
    email: rawR.email || "",
    mobile: rawR.mobile || rawR.phone || "",
    type: rawR.type || rawR.respondent_type || "",
    registration_id: rawR.registration_id || "",
    is_rera_registered: rawR.is_rera_registered ?? false,
    project_name: rawR.project_name || "",
    address: rawR.address || {},
  };

  const { complaint, complainant } = data;

  const pickImg = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => setter(ev.target.result);
    r.readAsDataURL(file);
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      let pdfBlob = null;
      try {
        const html2pdf = (await import("html2pdf.js")).default;
        pdfBlob = await html2pdf()
          .set({
            margin: 10,
            filename: `notice_${complaint?.complaint_id}.pdf`,
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .from(noticeRef.current)
          .outputPdf("blob");
      } catch {
        const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head><body>${noticeRef.current?.innerHTML || ""}</body></html>`;
        pdfBlob = new Blob([html], { type: "text/html" });
      }

      const fd = new FormData();
      fd.append("complainant_email", complainant?.email || "");
      fd.append("complainant_name", complainant?.name || "");
      fd.append("respondent_email", respondent.email || "");
      fd.append("respondent_name", respondent.name || "");
      fd.append("subject", complaint?.subject || complaint?.complaint_regarding || "");
      fd.append("description", complaint?.description || "");
      fd.append("admin_remark", adminRemark);
      fd.append("complaint_id", complaint?.complaint_id || "");
      fd.append("hearing_date", hearingDate);
      fd.append("hearing_place", hearingPlace);
      fd.append("status", "Scheduled");
      if (pdfBlob) fd.append("notice_pdf", pdfBlob, `notice_${complaint?.complaint_id}.pdf`);

      await fetch("http://localhost:8080/api/complint/approve-mail", {
        method: "POST",
        body: fd,
      });
      onSuccess("Complaint approved & legal notice sent successfully.");
    } catch {
      onSuccess("Request submitted (server may be offline).", "error");
    } finally { setLoading(false); }
  };

  return (
    <div className="AdminComplaintDetail-modal-backdrop">
      <div className="AdminComplaintDetail-modal AdminComplaintDetail-modal-wide">
        <div className="AdminComplaintDetail-modal-head">
          <div className="AdminComplaintDetail-modal-head-left">
            <span className="AdminComplaintDetail-modal-head-icon">{step === 1 ? "📝" : "📄"}</span>
            <div className="AdminComplaintDetail-modal-head-text">
              <div className="AdminComplaintDetail-modal-title">
                {step === 1 ? "Approve — Enter Hearing Details" : "Legal Notice Preview"}
              </div>
              <div className="AdminComplaintDetail-modal-sub">
                {step === 1
                  ? "Fill in the directive, hearing date and venue — all will appear in the official notice."
                  : "Upload official stamp & signature, then send the notice."}
              </div>
            </div>
          </div>
          <button className="AdminComplaintDetail-modal-close" onClick={onClose}>✕</button>
        </div>

        {step === 1 && (
          <>
            <div className="AdminComplaintDetail-modal-body">
              <div className="AdminComplaintDetail-field">
                <label className="AdminComplaintDetail-field-label">Admin Directive / Instructions *</label>
                <textarea
                  className="AdminComplaintDetail-textarea"
                  style={{ minHeight: 110 }}
                  placeholder="e.g. Your complaint has been accepted and registered..."
                  value={adminRemark}
                  onChange={(e) => setAdminRemark(e.target.value)}
                />
              </div>
              <div className="AdminComplaintDetail-field-row">
                <div className="AdminComplaintDetail-field">
                  <label className="AdminComplaintDetail-field-label">Hearing Date &amp; Time *</label>
                  <input
                    type="datetime-local"
                    className="AdminComplaintDetail-input"
                    value={hearingDate}
                    onChange={(e) => setHearingDate(e.target.value)}
                  />
                </div>
                <div className="AdminComplaintDetail-field">
                  <label className="AdminComplaintDetail-field-label">Hearing Venue / Address *</label>
                  <input
                    type="text"
                    className="AdminComplaintDetail-input"
                    placeholder="e.g. AP RERA Office, Vijayawada"
                    value={hearingPlace}
                    onChange={(e) => setHearingPlace(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #a7f3d0", borderRadius: 7, padding: "10px 14px", fontSize: 12, color: "#065f46", lineHeight: 1.6 }}>
                ✅ A formal Legal Notice (AP RERA format) will be generated and emailed to{" "}
                <strong>{complainant?.email}</strong> and <strong>{respondent.email}</strong>.
              </div>
            </div>
            <div className="AdminComplaintDetail-modal-footer">
              <button className="AdminComplaintDetail-btn-ghost" onClick={onClose}>Cancel</button>
              <button className="AdminComplaintDetail-btn-primary" onClick={() => setStep(2)} disabled={!step1Valid}>
                Preview Notice →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ padding: "16px 22px" }}>
              <div className="AdminComplaintDetail-ln-outer">
                <div className="AdminComplaintDetail-ln-paper" ref={noticeRef}>
                  <div className="AdminComplaintDetail-ln-hdr">
                    <div className="AdminComplaintDetail-ln-hdr-title">Advocate Office</div>
                    <div className="AdminComplaintDetail-ln-hdr-sub">High Court of Andhra Pradesh — Real Estate Regulatory Division</div>
                    <div className="AdminComplaintDetail-ln-hdr-sub">Email: legal@aprera.gov.in &nbsp;|&nbsp; Phone: +91-9876543210</div>
                  </div>
                  <div className="AdminComplaintDetail-ln-doc-title">Legal Notice</div>
                  <div className="AdminComplaintDetail-ln-prejudice">(Without Prejudice)</div>
                  <div className="AdminComplaintDetail-ln-date-line"><b>Date:</b> {fmtDate()}</div>
                  <div className="AdminComplaintDetail-ln-to-block">
                    <p><b>To,</b></p>
                    <p><b>{respondent.name || "Respondent"}</b></p>
                    {respondent.address?.line1 && (
                      <p>{respondent.address.line1}{respondent.address.line2 ? ", " + respondent.address.line2 : ""}</p>
                    )}
                    {(respondent.address?.district || respondent.address?.state) && (
                      <p>{[respondent.address.district, respondent.address.state, respondent.address.pincode].filter(Boolean).join(", ")}</p>
                    )}
                    <p>Email: {respondent.email || "—"} &nbsp;|&nbsp; Mobile: {respondent.mobile || "—"}</p>
                  </div>
                  <p className="AdminComplaintDetail-ln-subject-line">
                    SUB: Complaint No. {complaint?.complaint_id} under AP RERA Act regarding{" "}
                    {complaint?.subject || complaint?.complaint_regarding || "real estate violation"}
                  </p>
                  <p className="AdminComplaintDetail-ln-para">
                    This legal notice is being issued to you under the provisions of the Andhra Pradesh
                    Real Estate Regulatory Authority (AP RERA) Act, 2016, on behalf of our client{" "}
                    <b>{complainant?.name}</b> ({complainant?.type || "Complainant"}), residing at{" "}
                    {addrStr(complainant?.address)}, bearing Mobile No. {complainant?.mobile}, Email: {complainant?.email}.
                  </p>
                  <p className="AdminComplaintDetail-ln-para">
                    A formal complaint bearing Complaint ID <b>{complaint?.complaint_id}</b> (Application
                    Type: {complaint?.application_type}) has been duly registered against you with the AP RERA Authority.
                    The complaint pertains to:{" "}
                    <b>{complaint?.complaint_regarding || complaint?.subject || "violation of real estate regulations"}</b>.
                  </p>
                  {complaint?.description && (
                    <p className="AdminComplaintDetail-ln-para">
                      <b>Statement of Facts:</b> {complaint.description}
                    </p>
                  )}
                  <p className="AdminComplaintDetail-ln-para">
                    The complainant has raised serious concerns regarding violations related to real estate regulations,
                    including failure to comply with agreed terms and statutory obligations under AP RERA Act, 2016.
                  </p>
                  {complaint?.relief_sought ? (
                    <p className="AdminComplaintDetail-ln-para"><b>Relief Sought:</b> {complaint.relief_sought}</p>
                  ) : (
                    <p className="AdminComplaintDetail-ln-para">
                      Despite multiple communications, you have failed to address the grievances of the complainant.
                      Hence, this notice serves as a final opportunity to resolve the matter amicably.
                    </p>
                  )}
                  <ol className="AdminComplaintDetail-ln-list">
                    <li>You are hereby instructed to respond to this notice in writing within <b>15 days</b> from the date of receipt.</li>
                    <li>You must take immediate corrective actions as per AP RERA Act and provide a written explanation of your conduct.</li>
                    <li>Failure to comply will result in legal proceedings under AP RERA Act, 2016, before the competent Authority.</li>
                    <li>You may also be liable for penalties, compensation, interest, and all legal costs arising out of this matter.</li>
                  </ol>
                  <p className="AdminComplaintDetail-ln-para"><b>Authority Directive:</b> {adminRemark}</p>
                  <div className="AdminComplaintDetail-ln-hearing-box">
                    <div className="AdminComplaintDetail-ln-hearing-title">📅 Hearing Schedule</div>
                    <div className="AdminComplaintDetail-ln-hearing-row">
                      <span className="AdminComplaintDetail-ln-hearing-lbl">Date &amp; Time</span>
                      <span className="AdminComplaintDetail-ln-hearing-val">{fmtHearingDate(hearingDate)}</span>
                    </div>
                    <div className="AdminComplaintDetail-ln-hearing-row">
                      <span className="AdminComplaintDetail-ln-hearing-lbl">Venue</span>
                      <span className="AdminComplaintDetail-ln-hearing-val">{hearingPlace}</span>
                    </div>
                    <div className="AdminComplaintDetail-ln-hearing-row">
                      <span className="AdminComplaintDetail-ln-hearing-lbl">Status</span>
                      <span className="AdminComplaintDetail-ln-hearing-val">Scheduled</span>
                    </div>
                  </div>
                  <p className="AdminComplaintDetail-ln-para">
                    This notice is issued without prejudice to all other legal rights and remedies
                    available to the complainant under AP RERA Act and other applicable laws.
                  </p>
                  <div className="AdminComplaintDetail-ln-sig-row">
                    <div className="AdminComplaintDetail-ln-stamp-wrap">
                      <label className="AdminComplaintDetail-ln-stamp-circle">
                        {stampImg ? <img src={stampImg} alt="stamp" /> : <span className="AdminComplaintDetail-ln-stamp-hint">Upload<br />Stamp</span>}
                        <input type="file" accept="image/*" onChange={(e) => pickImg(e, setStampImg)} />
                      </label>
                      <span className="AdminComplaintDetail-ln-stamp-lbl">Official Stamp</span>
                    </div>
                    <div className="AdminComplaintDetail-ln-sign-wrap">
                      <label className="AdminComplaintDetail-ln-sign-box">
                        {signImg ? <img src={signImg} alt="signature" /> : <span className="AdminComplaintDetail-ln-sign-hint">Upload Signature</span>}
                        <input type="file" accept="image/*" onChange={(e) => pickImg(e, setSignImg)} />
                      </label>
                      <div className="AdminComplaintDetail-ln-sign-name">
                        Authorized Signatory<br />AP RERA Legal Authority
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="AdminComplaintDetail-modal-footer" style={{ justifyContent: "space-between" }}>
              <button className="AdminComplaintDetail-btn-ghost" onClick={() => setStep(1)}>← Edit Details</button>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="AdminComplaintDetail-btn-ghost" onClick={onClose}>Cancel</button>
                <button className="AdminComplaintDetail-btn-success" onClick={handleSend} disabled={loading}>
                  {loading ? "Generating & Sending…" : "✅ Approve & Send Notice"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STATUS UPDATE MODAL
───────────────────────────────────────────── */
const StatusUpdateModal = ({ data, onClose, onSuccess }) => {
  const [hearingDate, setHearingDate] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [hearingPlace, setHearingPlace] = useState("");
  const { complaint } = data;
  const [showDocs, setShowDocs] = useState(false);
  const [docDesc, setDocDesc] = useState("");
  const [docFile, setDocFile] = useState(null);
  const [docList, setDocList] = useState([]);
  const fileRef = useRef();

  const isValid = hearingDate && status && hearingPlace;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("complaint_id", complaint?.complaint_id || "");
      fd.append("status", status);
      fd.append("hearing_place", hearingPlace);
      fd.append("next_hearing_date", hearingDate);
      docList.forEach((d) => {
        fd.append("documents", d.file);
        fd.append("descriptions", d.description);
      });
      await fetch("http://localhost:8080/api/complint/add-hearing", {
        method: "POST",
        body: fd,
      });
      onSuccess("Status updated successfully.");
    } catch {
      onSuccess("Request submitted (server may be offline).", "error");
    } finally { setLoading(false); }
  };

  return (
    <div className="AdminComplaintDetail-modal-backdrop">
      <div className="AdminComplaintDetail-modal AdminComplaintDetail-modal-wide">
        <div className="AdminComplaintDetail-modal-head">
          <div className="AdminComplaintDetail-modal-head-left">
            <span className="AdminComplaintDetail-modal-head-icon">🔄</span>
            <div className="AdminComplaintDetail-modal-head-text">
              <div className="AdminComplaintDetail-modal-title">Update Complaint Status</div>
              <div className="AdminComplaintDetail-modal-sub">
                Set the next hearing date, upload documents, and update the status.
              </div>
            </div>
          </div>
          <button className="AdminComplaintDetail-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="AdminComplaintDetail-modal-body">
          <div className="AdminComplaintDetail-field">
            <label className="AdminComplaintDetail-field-label">
              Next Hearing Date &amp; Time <span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <input
              type="datetime-local"
              className="AdminComplaintDetail-input"
              value={hearingDate}
              onChange={(e) => setHearingDate(e.target.value)}
            />
          </div>
          <div className="AdminComplaintDetail-field">
            <label className="AdminComplaintDetail-field-label">
              Hearing Place / Address <span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <input
              type="text"
              className="AdminComplaintDetail-input"
              placeholder="Enter hearing location (e.g. AP RERA Office Vijayawada)"
              value={hearingPlace}
              onChange={(e) => setHearingPlace(e.target.value)}
            />
          </div>

          {/* SUBMISSION DOCUMENTS */}
          <div className="AdminComplaintDetail-field">
            <div className="AdminComplaintDetail-doc-heading" onClick={() => setShowDocs(!showDocs)}>
              📎 Submission Documents (optional)
            </div>
            {showDocs && (
              <div className="AdminComplaintDetail-doc-form">
                <input
                  type="text"
                  placeholder="Enter description"
                  className="AdminComplaintDetail-input AdminComplaintDetail-doc-input"
                  value={docDesc}
                  onChange={(e) => setDocDesc(e.target.value)}
                />
                <input
                  type="file"
                  ref={fileRef}
                  className="AdminComplaintDetail-doc-file"
                  onChange={(e) => setDocFile(e.target.files[0])}
                />
                <button
                  className="AdminComplaintDetail-btn-primary AdminComplaintDetail-doc-add-btn"
                  onClick={() => {
                    if (!docDesc || !docFile) return;
                    setDocList((prev) => [...prev, { description: docDesc, file: docFile }]);
                    setDocDesc("");
                    setDocFile(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                >
                  ➕ Add
                </button>
              </div>
            )}
            {docList.length > 0 && (
              <table className="AdminComplaintDetail-doc-table">
                <thead>
                  <tr><th>Description</th><th>File</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {docList.map((d, i) => (
                    <tr key={i}>
                      <td>{d.description}</td>
                      <td>
                        <span className="AdminComplaintDetail-doc-link" onClick={() => window.open(URL.createObjectURL(d.file))}>
                          📄 {d.file.name}
                        </span>
                      </td>
                      <td>
                        <button className="AdminComplaintDetail-doc-delete" onClick={() => setDocList(docList.filter((_, idx) => idx !== i))}>
                          ❌ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="AdminComplaintDetail-field">
            <label className="AdminComplaintDetail-field-label">
              Update Status <span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <input
              type="text"
              className="AdminComplaintDetail-input"
              placeholder="Enter status (e.g. Scheduled, Completed, Closed)"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <div style={{ background: "#ebf8ff", border: "1px solid #bee3f8", borderRadius: 7, padding: "10px 14px", fontSize: 12, color: "#2c5282", lineHeight: 1.6 }}>
            ℹ️ Complaint <strong>{complaint?.complaint_id}</strong> — the status and documents will be saved
            and the hearing date will be recorded for tracking purposes.
          </div>
        </div>
        <div className="AdminComplaintDetail-modal-footer">
          <button className="AdminComplaintDetail-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="AdminComplaintDetail-btn-primary" onClick={handleSubmit} disabled={loading || !isValid}>
            {loading ? "Submitting…" : "🔄 Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
};


const HearingsSection = ({ hearings = [], onViewDoc }) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="AdminComplaintDetail-card AdminComplaintDetail-card-wide">


      <div
        className="AdminComplaintDetail-card-head AdminComplaintDetail-hearing-master-head"
        onClick={() => setOpen((p) => !p)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        <div className="AdminComplaintDetail-card-icon AdminComplaintDetail-ci-blue">📅</div>
        <span className="AdminComplaintDetail-card-htitle">Hearing History</span>
        <span className="AdminComplaintDetail-card-hbadge">{hearings.length} hearings</span>
        <span className="AdminComplaintDetail-hearing-master-chevron">{open ? "▲" : "▼"}</span>
      </div>


      {open && (
        <div className="AdminComplaintDetail-hearing-timeline">

          {hearings.length === 0 && (
            <div className="AdminComplaintDetail-hearing-empty">No hearings scheduled yet.</div>
          )}

          {hearings.map((h, idx) => {
            const isCardOpen = expanded === idx;
            const hasDocs = h.documents?.length > 0;

            return (
              <div
                key={h.hearing_id ?? idx}
                className={`AdminComplaintDetail-hearing-row${isCardOpen ? " AdminComplaintDetail-hearing-row--open" : ""}`}
              >

                <div className="AdminComplaintDetail-hearing-track">
                  <div className="AdminComplaintDetail-hearing-bubble">{h.hearing_no ?? idx + 1}</div>
                  {idx < hearings.length - 1 && <div className="AdminComplaintDetail-hearing-line" />}
                </div>

                {/* Right — card */}
                <div className="AdminComplaintDetail-hearing-card">

                  {/* Card header row (always visible) */}
                  <div
                    className="AdminComplaintDetail-hearing-card-head"
                    onClick={() => setExpanded(isCardOpen ? null : idx)}
                  >
                    <div className="AdminComplaintDetail-hearing-meta">
                      <span className="AdminComplaintDetail-hearing-no">
                        Hearing #{h.hearing_no ?? idx + 1}
                      </span>
                      {/* ✅ FIX: use fmtBackendDate instead of new Date() */}
                      <span className="AdminComplaintDetail-hearing-date">
                        📆 {fmtBackendDate(h.hearing_date)}
                      </span>
                      <span className="AdminComplaintDetail-hearing-place">
                        📍 {h.hearing_place || "—"}
                      </span>
                    </div>
                    <div className="AdminComplaintDetail-hearing-right">
                      {hasDocs && (
                        <span className="AdminComplaintDetail-hearing-doc-badge">
                          📎 {h.documents.length} doc{h.documents.length > 1 ? "s" : ""}
                        </span>
                      )}

                      <span className="AdminComplaintDetail-hearing-chevron">{isCardOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  {/* Expanded details body */}
                  {isCardOpen && (
                    <div className="AdminComplaintDetail-hearing-card-body">

                      {/* 2-column date boxes */}
                      <div className="AdminComplaintDetail-hearing-dates-row">
                        <div className="AdminComplaintDetail-hearing-date-box AdminComplaintDetail-hearing-date-box--current">
                          <span className="AdminComplaintDetail-hearing-date-box-lbl">📅 Hearing Date</span>
                          <span className="AdminComplaintDetail-hearing-date-box-val">
                            {fmtBackendDate(h.hearing_date)}
                          </span>
                        </div>
                        <div className="AdminComplaintDetail-hearing-date-box AdminComplaintDetail-hearing-date-box--next">
                          <span className="AdminComplaintDetail-hearing-date-box-lbl">⏭ Next Hearing Date</span>
                          <span className="AdminComplaintDetail-hearing-date-box-val">
                            {fmtBackendDate(h.next_hearing_date)}
                          </span>
                        </div>
                      </div>

                      {/* Venue + Status + Remarks */}
                      <div className="AdminComplaintDetail-hearing-detail-grid">
                        <div className="AdminComplaintDetail-hearing-detail-item">
                          <span className="AdminComplaintDetail-hearing-detail-lbl">Venue</span>
                          <span className="AdminComplaintDetail-hearing-detail-val">{h.hearing_place || "—"}</span>
                        </div>
                        <div className="AdminComplaintDetail-hearing-detail-item">
                          <span className="AdminComplaintDetail-hearing-detail-lbl">Status</span>
                          <span className="AdminComplaintDetail-hearing-detail-val">{h.status || "—"}</span>
                        </div>
                        {h.remarks && (
                          <div className="AdminComplaintDetail-hearing-detail-item AdminComplaintDetail-hearing-detail-item--full">
                            <span className="AdminComplaintDetail-hearing-detail-lbl">Remarks</span>
                            <span className="AdminComplaintDetail-hearing-detail-val">{h.remarks}</span>
                          </div>
                        )}
                      </div>

                      {/* Documents table — ✅ FIX: uses doc.name (backend field) */}
                      {hasDocs && (
                        <div className="AdminComplaintDetail-hearing-docs">
                          <div className="AdminComplaintDetail-hearing-docs-title">📎 Submited Documents</div>
                          <table className="AdminComplaintDetail-hearing-docs-table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Description</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {h.documents.map((doc, di) => (
                                <tr key={di}>
                                  <td>{di + 1}</td>
                                  <td>{doc.description || "—"}</td>
                                  <td>
                                    {/* doc.name is the saved filename from backend */}
                                    <span
                                      className="AdminComplaintDetail-hearing-doc-link"
                                      onClick={() =>
                                        onViewDoc &&
                                        onViewDoc({
                                          filename: doc.name || doc.document,
                                          label: doc.description || `Doc ${di + 1}`,
                                        })
                                      }
                                    >
                                      View →
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const AdminComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role;
  const complaintType = location.state?.complaintType;

  // 🔥 Console check
  console.log("NAVIGATION STATE 👉", location.state);
  console.log("ROLE 👉", role);
  console.log("TYPE 👉", complaintType);
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [viewDoc, setViewDoc] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/complint/${id}`)
      .then((r) => r.json())
      .then((res) => {
        console.log("API FULL RESPONSE 👉", res);
        console.log("Complaint 👉", res.complaint);
        console.log("Complainant 👉", res.complainant);
        console.log("Respondent 👉", res.respondent);
        setData(res);
      })
      .catch(console.error);
  }, [id]);

  const showToast = (msg, type = "success") => {
    setModal(null);
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  if (!data)
    return (
      <div className="AdminComplaintDetail-loading">
        <div className="AdminComplaintDetail-spinner" />
        <div className="AdminComplaintDetail-loading-text">Loading complaint details…</div>
      </div>
    );

  const { complaint, complainant } = data;
  const status = complaint?.status?.toLowerCase();
  const showHearings = status !== "open" && status !== "reject";
  const isPending = complaint?.status?.toLowerCase() === "pending";
  const isClosed = complaint?.status?.toLowerCase() === "closed";
  const isRejected = complaint?.status?.toLowerCase() === "reject";

  const rawR = data.respondent || {};
  const respondent = {
    name: rawR.name || "",
    email: rawR.email || "",
    mobile: rawR.mobile || rawR.phone || "",
    type: rawR.type || rawR.respondent_type || "",
    registration_id: rawR.registration_id || "",
    is_rera_registered: rawR.is_rera_registered ?? false,
    project_name: rawR.project_name || "",
    address: rawR.address || {},
  };

  return (
    <>
      <div className="AdminComplaintDetail-body">

        {/* TOP BAR */}
        <div className="AdminComplaintDetail-topbar">
          <div className="AdminComplaintDetail-breadcrumb">
            <h1 className="AdminComplaintDetail-page-title">Complaint Detail</h1>
          </div>
        </div>

        {/* STATUS STRIP */}
        <div className="AdminComplaintDetail-status-item">
          <span className="AdminComplaintDetail-status-key">Complaint Filed On</span>
          <span className="AdminComplaintDetail-status-val">{complaint?.created_at || "—"}</span>
        </div>
        <div className="AdminComplaintDetail-status-item">
          <span className="AdminComplaintDetail-status-key">Project Registered in aprera</span>
          <span className="AdminComplaintDetail-status-val">{complaint?.project_details?.is_registered ? "Yes" : "No"}</span>
        </div>

        {/* CARDS GRID */}
        <div className="AdminComplaintDetail-grid">

          {/* Complainant */}
          <div className="AdminComplaintDetail-card">
            <div className="AdminComplaintDetail-card-head">
              <div className="AdminComplaintDetail-card-icon AdminComplaintDetail-ci-green">👤</div>
              <span className="AdminComplaintDetail-card-htitle">Complainant</span>
              <span className="AdminComplaintDetail-card-hbadge">{complainant?.type || "—"}</span>
            </div>
            <div className="AdminComplaintDetail-card-body">
              <Field label="Type" value={complainant.type} />
              {complainant?.registration_id ? (
                <Field label="Registration ID" value={complainant.registration_id} mono />
              ) : (
                <div className="AdminComplaintDetail-row">
                  <span className="AdminComplaintDetail-label">RERA Reg.</span>
                  <span className="AdminComplaintDetail-badge-no">✗ Not Registered</span>
                </div>
              )}
              <Field label="Name" value={complainant?.name} />
              <Field label="Email" value={complainant?.email} />
              <Field label="Mobile" value={complainant?.mobile} mono />
              <Field label="Address" value={addrStr(complainant?.address)} />
            </div>
          </div>

          {/* Respondent */}
          <div className="AdminComplaintDetail-card">
            <div className="AdminComplaintDetail-card-head">
              <div className="AdminComplaintDetail-card-icon AdminComplaintDetail-ci-amber">🏢</div>
              <span className="AdminComplaintDetail-card-htitle">Respondent</span>
              <span className="AdminComplaintDetail-card-hbadge">{respondent.type || "—"}</span>
            </div>
            <div className="AdminComplaintDetail-card-body">
              <Field label="Type" value={respondent.type} />
              {respondent?.registration_id ? (
                <Field label="Registration ID" value={respondent.registration_id} mono />
              ) : (
                <div className="AdminComplaintDetail-row">
                  <span className="AdminComplaintDetail-label">RERA Reg.</span>
                  <span className="AdminComplaintDetail-badge-no">✗ Not Registered</span>
                </div>
              )}
              <Field label="Name" value={respondent.name} />
              <Field label="Email" value={respondent.email} />
              <Field label="Mobile" value={respondent.mobile} mono />
              <Field label="Project Name" value={respondent.project_name} />
              <Field label="Address" value={addrStr(respondent.address)} />
            </div>
          </div>

          {/* Complaint Info */}
          <div className="AdminComplaintDetail-card">
            <div className="AdminComplaintDetail-card-head">
              <div className="AdminComplaintDetail-card-icon AdminComplaintDetail-ci-blue">📄</div>
              <span className="AdminComplaintDetail-card-htitle">Complaint Info</span>
              <span className="AdminComplaintDetail-card-hbadge">FORM</span>
            </div>
            <div className="AdminComplaintDetail-card-body">
              <Field label="Complaint ID" value={complaint?.complaint_id} mono />
              <Field label="App. Type" value={complaint?.application_type} />
              <Field label="Subject" value={complaint?.subject} />
              <Field label="Regarding" value={complaint?.complaint_regarding} />
              <Field label="Description" value={complaint?.description} />
              <Field label="Relief Sought" value={complaint?.relief_sought} />
              <Field label="Filed On" value={complaint?.created_at} />
              {complaint?.project_details?.registration_number == null ? (
                <Field label="LP Number" value={complaint?.project_details?.lp_number} mono />
              ) : (
                <Field label="Project Reg. Number" value={complaint?.project_details?.registration_number} mono />
              )}
            </div>
          </div>

          {/* Attached Documents */}
          <div className="AdminComplaintDetail-card AdminComplaintDetail-card-wide">
            <div className="AdminComplaintDetail-card-head">
              <div className="AdminComplaintDetail-card-icon AdminComplaintDetail-ci-blue">📎</div>
              <span className="AdminComplaintDetail-card-htitle">Attached Documents</span>
              <span className="AdminComplaintDetail-card-hbadge">
                {(complaint?.supporting_documents?.length || 0) +
                  (complaint?.complaint_documents ? Object.keys(complaint.complaint_documents).length : 0)} files
              </span>
            </div>
            <div className="AdminComplaintDetail-docs-grid">
              {complaint?.complaint_documents &&
                Object.entries(complaint.complaint_documents).map(([type, filename]) => (
                  <div
                    className="AdminComplaintDetail-doc-item"
                    key={type}
                    onClick={() => setViewDoc({ filename, label: type.replace(/_/g, " ") })}
                  >
                    <div className="AdminComplaintDetail-doc-icon-wrap">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="AdminComplaintDetail-doc-info">
                      <span className="AdminComplaintDetail-doc-type">{type.replace(/_/g, " ")}</span>
                      <span className="AdminComplaintDetail-doc-name" title={filename}>{filename}</span>
                    </div>
                    <span className="AdminComplaintDetail-doc-open-hint">View →</span>
                  </div>
                ))}

              {complaint?.supporting_documents?.length > 0 && (
                <div className="AdminComplaintDetail-doc-table">
                  <div className="doc-table-header">
                    <span>Supporting</span>
                    <span>Document</span>
                  </div>
                  {complaint.supporting_documents.map((doc, i) => (
                    <div className="doc-table-row" key={i}>
                      <span className="doc-desc">{doc.description || "—"}</span>
                      <span
                        className="doc-link"
                        onClick={() => setViewDoc({ filename: doc.document, label: doc.description || `Supporting Doc ${i + 1}` })}
                      >
                        View Document →
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {(!complaint?.complaint_documents && !complaint?.supporting_documents?.length) && (
                <div style={{ padding: "20px 4px", color: "#a0aec0", fontSize: 13, gridColumn: "1/-1" }}>
                  No documents attached.
                </div>
              )}
            </div>
          </div>
          {isRejected && (
            <div className="AdminComplaintDetail-card AdminComplaintDetail-card-wide">
              <div className="AdminComplaintDetail-card-head">
                <div className="AdminComplaintDetail-card-icon AdminComplaintDetail-ci-red">❌</div>
                <span className="AdminComplaintDetail-card-htitle">Rejection Reason</span>
              </div>

              <div className="AdminComplaintDetail-card-body">
                <div className="AdminComplaintDetail-row">
                  <span
                    className="AdminComplaintDetail-value"
                    style={{ color: "#b91c1c", fontWeight: "600" }}
                  >
                    {complaint?.reject_reson || "No reason provided"}
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* ── HEARINGS SECTION — always shown when status is pending ── */}
          {showHearings && (
            <HearingsSection
              hearings={data.hearings || []}
              onViewDoc={setViewDoc}
            />
          )}

          {/* ── BACK BUTTON ── */}
          {/* ── BOTTOM BAR: back button left, action buttons right ── */}
          <div className="AdminComplaintDetail-bottom-bar">
            <button
              className="AdminComplaintDetail-back-btn1"
              onClick={() => navigate(-1)}
            >
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>

              {/* 🔥 CONDITION HERE */}
              {role === "complaint" ? "Back" : "Back to List"}
            </button>

            {/* ── ACTION BUTTONS — conditional on status ── */}
            {/* 🔥 HIDE ALL ACTION BUTTONS FOR COMPLAINT ROLE */}
            {role !== "complaint" && (
              <div className="AdminComplaintDetail-action-group">
                {!isRejected && (
                  <>
                    {isClosed ? (
                      <button
                        className="AdminComplaintDetail-btn-reopen"
                        onClick={() => setModal("reopen")}
                      >
                        🔓 Reopen Complaint
                      </button>
                    ) : isPending ? (
                      <>
                        <button
                          className="AdminComplaintDetail-btn-ghost"
                          onClick={async () => {

                            // 🔥 CONFIRM ALERT
                            const confirmClose = window.confirm(
                              "Are you sure you want to close this complaint?"
                            );

                            // ❌ If user clicks Cancel → stop
                            if (!confirmClose) return;

                            try {
                              const fd = new FormData();

                              fd.append("complainant_email", complainant?.email || "");
                              fd.append("complainant_name", complainant?.name || "");

                              fd.append("respondent_email", respondent.email || "");
                              fd.append("respondent_name", respondent.name || "");

                              fd.append("subject", complaint?.subject || "");
                              fd.append("description", complaint?.description || "");
                              fd.append("admin_remark", "Case closed by authority");

                              fd.append("complaint_id", complaint?.complaint_id || "");
                              fd.append("status", "closed");

                              await fetch("http://localhost:8080/api/complint/approve-mail", {
                                method: "POST",
                                body: fd,
                              });

                              showToast("Complaint closed & mails sent successfully");

                              // 🔥 reload UI
                              window.location.reload();

                            } catch (err) {
                              showToast("Error closing complaint", "error");
                            }
                          }}
                        >
                          ✕ Close
                        </button>

                        <button
                          className="AdminComplaintDetail-btn-primary"
                          onClick={() => setModal("statusUpdate")}
                        >
                          🔄 Status Update
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="AdminComplaintDetail-btn-reject"
                          onClick={() => setModal("reject")}
                        >
                          Reject
                        </button>

                        <button
                          className="AdminComplaintDetail-btn-approve"
                          onClick={() => setModal("approve")}
                        >
                          Approve
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      {modal === "reject" && <RejectModal data={data} onClose={() => setModal(null)} onSuccess={showToast} />}
      {modal === "approve" && <ApproveModal data={data} onClose={() => setModal(null)} onSuccess={showToast} />}
      {modal === "statusUpdate" && <StatusUpdateModal data={data} onClose={() => setModal(null)} onSuccess={showToast} />}

      {modal === "reopen" && (
        <div className="AdminComplaintDetail-modal-backdrop">
          <div className="AdminComplaintDetail-modal">
            <div className="AdminComplaintDetail-modal-head">
              <div className="AdminComplaintDetail-modal-head-left">
                <span className="AdminComplaintDetail-modal-head-icon">🔓</span>
                <div className="AdminComplaintDetail-modal-head-text">
                  <div className="AdminComplaintDetail-modal-title">Reopen Complaint</div>
                  <div className="AdminComplaintDetail-modal-sub">This will reopen the complaint for further review.</div>
                </div>
              </div>
              <button className="AdminComplaintDetail-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="AdminComplaintDetail-modal-body">
              <div style={{ background: "#fef9ec", border: "1px solid #fcd34d", borderRadius: 7, padding: "12px 14px", fontSize: 13, color: "#92400e", lineHeight: 1.6 }}>
                ⚠️ Are you sure you want to reopen complaint <strong>{complaint?.complaint_id}</strong>? Its status will be set back to <strong>Pending</strong>.
              </div>
            </div>
            <div className="AdminComplaintDetail-modal-footer">
              <button className="AdminComplaintDetail-btn-ghost" onClick={() => setModal(null)}>Cancel</button>
              <button
                className="AdminComplaintDetail-btn-reopen"
                onClick={async () => {
                  try {
                    await fetch(`http://localhost:8080/api/complint/${complaint?.complaint_id}/reopen`, { method: "POST" });
                    showToast("Complaint reopened successfully.");
                  } catch {
                    showToast("Request submitted (server may be offline).", "error");
                  }
                }}
              >
                🔓 Yes, Reopen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT VIEWER */}
      {viewDoc && (
        <DocViewerModal
          filename={viewDoc.filename}
          label={viewDoc.label}
          onClose={() => setViewDoc(null)}
        />
      )}

      {/* TOAST */}
      {toast && (
        <div className={`AdminComplaintDetail-toast ${toast.type}`}>
          {toast.type === "success" ? "✅" : "❌"} {toast.msg}
        </div>
      )}
    </>
  );
};

export default AdminComplaintDetail;