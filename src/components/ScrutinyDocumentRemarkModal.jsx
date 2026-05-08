import React, { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost, BASE_URL } from "../api/api";
import { useAdmin } from "../context/AdminContext";
import "../styles/ScrutinyDocumentRemarkModal.css";

/* =========================
   FILE TYPE CONFIG
========================= */
const officeViewerExtensions = new Set([
  "csv",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
]);

const imageExtensions = new Set([
  "avif",
  "bmp",
  "gif",
  "jpeg",
  "jpg",
  "png",
  "svg",
  "webp",
]);

/* =========================
   HELPERS
========================= */
const getFileExtension = (value) => {
  const normalizedValue = String(value || "")
    .trim()
    .split("?")[0]
    .split("#")[0];

  if (!normalizedValue.includes(".")) return "";
  return normalizedValue.split(".").pop().toLowerCase();
};

/* =========================
   MAIN URL FIX
========================= */
const normalizeFileUrl = (rawPath) => {
  if (!rawPath) return "";

  let parsed = rawPath;

  try {
    parsed = typeof rawPath === "string" ? JSON.parse(rawPath) : rawPath;
  } catch {
    parsed = rawPath;
  }

  // object case
  if (typeof parsed === "object" && parsed !== null) {
    parsed = parsed.path || parsed.file || "";
  }

  if (!parsed) return "";

  // already full URL
  if (String(parsed).startsWith("http")) {
    return String(parsed).replace("uploads/uploads", "uploads");
  }

  // clean path
  let cleanPath = String(parsed)
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/^uploads\/+/i, "");

  return `${BASE_URL}/uploads/${cleanPath}`;
};

const getViewerSrc = (url, fileName) => {
  const ext = getFileExtension(fileName || url);

  return officeViewerExtensions.has(ext)
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        url
      )}`
    : url;
};

const normalizeDepartment = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ");

const getRemarkAuthority = (admin) => {
  const department = normalizeDepartment(admin?.department);
  const role = normalizeDepartment(admin?.role);
  const loginKey = `${department} ${role}`;

  if (loginKey.includes("planning")) {
    return {
      verificationTeam: "planning",
      authorityLabel: "Planning Office",
    };
  }

  if (loginKey.includes("legal")) {
    return {
      verificationTeam: "legal",
      authorityLabel: "Legal Office",
    };
  }

  if (loginKey.includes("audit")) {
    return {
      verificationTeam: "audit",
      authorityLabel: "Audit Office",
    };
  }

  if (loginKey.includes("engineer")) {
    return {
      verificationTeam: "engineer",
      authorityLabel: "Engineer Office",
    };
  }

  if (loginKey.includes("ad")) {
    return {
      verificationTeam: "ad",
      authorityLabel: "Assistant Director",
    };
  }

  if (loginKey.includes("dd")) {
    return {
      verificationTeam: "dd",
      authorityLabel: "Deputy Director",
    };
  }

  return {
    verificationTeam: "verification",
    authorityLabel: "Verification Team",
  };
};

/* =========================
   COMPONENT
========================= */
export default function ScrutinyDocumentRemarkModal({
  isOpen,
  documentItem,
  onClose,
  applicationNo,
  verificationTeam,
  authorityLabel,
  apiPrefix = "/api/scrutiny",
}) {
  const { admin } = useAdmin();

  const [shortfall, setShortfall] = useState("");
  const [remarkText, setRemarkText] = useState("");
  const [feedback, setFeedback] = useState({
    type: "",
    text: "",
  });
  const [history, setHistory] = useState([]);
const [submitting, setSubmitting] = useState(false);

// 🔥 LOAD HISTORY
const loadHistory = async () => {
  try {
    const res = await apiGet(
      `${apiPrefix}/verification-remarks?application_no=${applicationNo}&document_name=${encodeURIComponent(
        documentItem?.title || documentItem?.fileName
      )}`
    );

    if (Array.isArray(res?.rows)) {
      setHistory(res.rows);
    } else {
      setHistory([]);
    }
  } catch {
    setHistory([]);
  }
};

// 🔥 SUBMIT
const handleSubmit = async () => {
  const trimmed = remarkText.trim();

  if (!applicationNo) {
    setFeedback({ type: "error", text: "Application number missing" });
    return;
  }

  if (!shortfall) {
    setFeedback({ type: "error", text: "Select shortfall" });
    return;
  }

  if (!trimmed) {
    setFeedback({ type: "error", text: "Enter remarks" });
    return;
  }

  try {
  setSubmitting(true);

  await apiPost(`${apiPrefix}/verification-remarks`, {
    application_no: applicationNo,
    document_name: documentItem?.title || documentItem?.fileName,
    verification_team: activeVerificationTeam,
    is_shortfall: shortfall === "yes",
    status: "pending",
    remarks: trimmed,
    document_path: safeDocumentUrl,
    verified_by: activeAuthorityLabel,
  });

  setFeedback({
    type: "success",
    text: "Remark submitted successfully",
  });

  // 🔥 AUTO HIDE
  setTimeout(() => {
    setFeedback({ type: "", text: "" });
  }, 3000);

  setRemarkText("");
  setShortfall("");

  loadHistory();

} catch (err) {
  setFeedback({
    type: "error",
    text: err.message || "Failed",
  });
} finally {
  setSubmitting(false);
}
};
useEffect(() => {
  if (isOpen && documentItem) {
    loadHistory();
  }
}, [isOpen, documentItem]);

  const loginRemarkAuthority = useMemo(
    () => getRemarkAuthority(admin),
    [admin]
  );

  const activeVerificationTeam =
    verificationTeam || loginRemarkAuthority.verificationTeam;

  const activeAuthorityLabel =
    authorityLabel || loginRemarkAuthority.authorityLabel;

  const documentKey = useMemo(
    () =>
      String(
        documentItem?.storageId ||
          documentItem?.id ||
          documentItem?.fileName ||
          documentItem?.title ||
          "document"
      ),
    [documentItem]
  );

  /* =========================
     SAFE URL
  ========================= */
  const safeDocumentUrl = useMemo(() => {
    const finalUrl = normalizeFileUrl(documentItem?.url);
    console.log("FINAL IMAGE URL:", finalUrl);
    return finalUrl;
  }, [documentItem]);

  const viewerSrc = useMemo(() => {
    return safeDocumentUrl
      ? getViewerSrc(
          safeDocumentUrl,
          documentItem?.fileName || documentItem?.title
        )
      : "";
  }, [safeDocumentUrl, documentItem]);

  const isImageDocument = useMemo(() => {
    const ext = getFileExtension(
      documentItem?.fileName || safeDocumentUrl
    );
    return imageExtensions.has(ext);
  }, [documentItem, safeDocumentUrl]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !documentItem) {
    return null;
  }

  /* =========================
     SUBMIT
  ========================= */
  // const handleSubmit = async () => {
  //   if (!applicationNo) {
  //     setFeedback({
  //       type: "error",
  //       text: "Application number missing",
  //     });
  //     return;
  //   }

  //   if (!shortfall) {
  //     setFeedback({
  //       type: "error",
  //       text: "Please select shortfall",
  //     });
  //     return;
  //   }

  //   if (!remarkText.trim()) {
  //     setFeedback({
  //       type: "error",
  //       text: "Please enter remarks",
  //     });
  //     return;
  //   }

  //   try {
  //     await apiPost(`${apiPrefix}/verification-remarks`, {
  //       application_no: applicationNo,
  //       document_name:
  //         documentItem?.title ||
  //         documentItem?.fileName ||
  //         "Document",
  //       verification_team: activeVerificationTeam,
  //       is_shortfall: shortfall === "yes",
  //       status: "pending",
  //       remarks: remarkText,
  //       document_path: safeDocumentUrl,
  //       verified_by: activeAuthorityLabel,
  //     });

  //     setFeedback({
  //       type: "success",
  //       text: "Remark submitted successfully",
  //     });

  //     setRemarkText("");
  //     setShortfall("");
  //   } catch (error) {
  //     setFeedback({
  //       type: "error",
  //       text: error.message || "Submit failed",
  //     });
  //   }
  // };

  return (
    <div
      className="sdrm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="sdrm-modal">
        {/* HEADER */}
        <div className="sdrm-header">
          <div>
            <h2>ACTION TO BE TAKEN</h2>
            <p className="sdrm-subtitle">
              {documentItem.title ||
                documentItem.fileName ||
                "Document"}
            </p>
          </div>

          <button
            type="button"
            className="sdrm-close-icon"
            onClick={onClose}
          >
            x
          </button>
        </div>

        {/* VIEWER */}
        <div className="sdrm-viewer-wrap">
          {safeDocumentUrl ? (
            <>
              <div className="sdrm-viewer-toolbar">
                <span>
                  {documentItem.fileName ||
                    documentItem.title ||
                    "Preview"}
                </span>

                <a
                  href={safeDocumentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sdrm-open-tab"
                >
                  Open in new tab
                </a>
              </div>

              {isImageDocument ? (
                <div className="sdrm-image-stage">
                  <img
                    src={safeDocumentUrl}
                    alt={documentItem.title || "Preview"}
                    className="sdrm-image-preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "550px",
                      objectFit: "contain",
                      display: "block",
                      margin: "0 auto",
                    }}
                    onError={(e) => {
                      console.log(
                        "FAILED IMAGE URL:",
                        safeDocumentUrl
                      );

                      e.target.style.display = "none";

                      if (
                        !e.target.parentNode.querySelector(
                          ".custom-error"
                        )
                      ) {
                        const msg =
                          document.createElement("div");

                        msg.className = "custom-error";

                        msg.innerHTML = `
                          <div style="padding:20px;text-align:center;color:red;">
                            File not found<br/>
                            <small>${safeDocumentUrl}</small>
                          </div>
                        `;

                        e.target.parentNode.appendChild(msg);
                      }
                    }}
                  />
                </div>
              ) : getFileExtension(safeDocumentUrl) ===
                "pdf" ? (
                <iframe
                  title="PDF Preview"
                  src={safeDocumentUrl}
                  className="sdrm-viewer"
                  style={{
                    width: "100%",
                    height: "550px",
                    border: "none",
                  }}
                />
              ) : (
                <iframe
                  title="Document Preview"
                  src={viewerSrc}
                  className="sdrm-viewer"
                  style={{
                    width: "100%",
                    height: "550px",
                    border: "none",
                  }}
                />
              )}
            </>
          ) : (
            <div className="sdrm-empty-viewer">
              Document preview is not available
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="sdrm-body">
          <div className="sdrm-question">
            <span>Does the document have shortfall?</span>

            <div className="sdrm-radio-group">
              <label>
                <input
                  type="radio"
                  name={`shortfall-${documentKey}`}
                  value="yes"
                  checked={shortfall === "yes"}
                  onChange={(e) =>
                    setShortfall(e.target.value)
                  }
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name={`shortfall-${documentKey}`}
                  value="no"
                  checked={shortfall === "no"}
                  onChange={(e) =>
                    setShortfall(e.target.value)
                  }
                />
                No
              </label>
            </div>
          </div>

          <div className="sdrm-form-section">
  <textarea
    className="sdrm-remarks-box"
    maxLength={3000}
    value={remarkText}
    onChange={(e) => setRemarkText(e.target.value)}
    placeholder="Remarks (Maximum of 3000 Characters)"
  />

  <div className="sdrm-actions">
    {feedback.text && (
      <span className={`sdrm-feedback sdrm-feedback-${feedback.type}`}>
        {feedback.text}
      </span>
    )}

    <button
      className="sdrm-submit-btn"
      onClick={handleSubmit}
      disabled={submitting}
    >
      {submitting ? "Submitting..." : "Submit"}
    </button>
  </div>
</div>
          <div className="sdrm-history">
  <h3>UPDATED REMARKS</h3>

  <table className="sdrm-history-table">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Authority</th>
        <th>Is Shortfall</th>
        <th>Remarks</th>
        <th>Remarks Date</th>
        <th>Document</th>
      </tr>
    </thead>

    <tbody>
      {history.length ? (
        history.map((row, index) => (
          <tr key={row.id}>
            <td>{index + 1}</td>
            <td>{row.verified_by}</td>
            <td>{row.is_shortfall ? "Yes" : "No"}</td>
            <td>{row.remarks}</td>
            <td>{row.created_at}</td>
            <td>
              {row.document_path ? (
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => window.open(row.document_path, "_blank")}
                >
                  View
                </span>
              ) : (
                "NA"
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6">No remarks yet</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

          <div className="sdrm-actions">
            {feedback.text ? (
              <span
                className={`sdrm-feedback sdrm-feedback-${feedback.type}`}
              >
                {feedback.text}
              </span>
            ) : null}

            {/* <button
  className="sdrm-submit-btn"
  onClick={handleSubmit}
  disabled={submitting}
>
  {submitting ? "Submitting..." : "Submit"}
</button> */}
          </div>
        </div>

        {/* FOOTER */}
        <div className="sdrm-footer">
          <button
            type="button"
            className="sdrm-close-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}