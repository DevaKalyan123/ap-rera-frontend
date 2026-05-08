import React, { useMemo } from "react";
import { BASE_URL } from "../../api/api";

const scrutiny_ExistingProjectConstructionStatus = ({ formData }) => {

  const normalizeBoolean = (value) => ["true", "1", "yes", "y"].includes(String(value || "").trim().toLowerCase());

  /* ================= MAP DATA ================= */
  const mappedData = useMemo(() => {

    if (!formData) return {};

    return {
      developmentCompleted:
        formData.developmentCompleted ??
        formData.development_completed ??
        "",

      developmentPending:
        formData.developmentPending ??
        formData.development_pending ??
        "",

      amountCollected:
        formData.amountCollected ??
        formData.amount_collected ??
        "",

      amountSpent:
        formData.amountSpent ??
        formData.amount_spent ??
        "",

      balanceAmount:
        formData.balanceAmount ??
        formData.balance_amount ??
        "",

      planModified: normalizeBoolean(formData.planModified),

      projectDelayed: normalizeBoolean(formData.projectDelayed),

      architectPath:
        formData.architectCertificate ||
        formData.architect_certificate_path ||
        "",

      engineerPath:
        formData.engineerCertificate ||
        formData.engineer_certificate_path ||
        "",

      caPath:
        formData.caCertificate ||
        formData.ca_certificate_path ||
        "",
    };

  }, [formData]);

  /* ================= HELPERS ================= */

  const safe = (v) =>
    v !== null && v !== undefined && v !== "" ? v : "NA";

  const getFileUrl = (path) => {
    if (!path) return "";
    if (path instanceof File) return URL.createObjectURL(path);

    const normalizedPath = String(path).trim().replace(/\\/g, "/");
    if (!normalizedPath) return "";
    if (/^https?:\/\//i.test(normalizedPath)) return encodeURI(normalizedPath);

    const uploadsIndex = normalizedPath.toLowerCase().indexOf("/uploads/");
    const relativeUploadsPath =
      uploadsIndex >= 0
        ? normalizedPath.slice(uploadsIndex + 1)
        : normalizedPath.toLowerCase().startsWith("uploads/")
          ? normalizedPath
          : normalizedPath.replace(/^\/+/, "");

    return encodeURI(`${BASE_URL}/${relativeUploadsPath}`);
  };

  const getFileName = (path) => {
    if (!path) return "NA";
    if (path instanceof File) return path.name;
    return String(path).replace(/\\/g, "/").split("/").pop() || "NA";
  };

  /* ================= RENDER ================= */

  return (
    <div className="form-section">

      <h3 className="subheading">Present Construction Status</h3>

      {/* ===== DEVELOPMENT ===== */}
      <div className="row innerdivrow">

        <div className="col-sm-6">
          <div className="display-group">
            <span className="display-label">Development Completed</span>
            <span className="display-field">
              {safe(mappedData.developmentCompleted)}
            </span>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="display-group">
            <span className="display-label">Development Pending</span>
            <span className="display-field">
              {safe(mappedData.developmentPending)}
            </span>
          </div>
        </div>

      </div>

      {/* ===== MONEY ===== */}
      <div className="row innerdivrow">

        <div className="col-sm-6">
          <div className="display-group">
            <span className="display-label">Amount Collected</span>
            <span className="display-field">
              {safe(mappedData.amountCollected)}
            </span>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="display-group">
            <span className="display-label">Amount Spent</span>
            <span className="display-field">
              {safe(mappedData.amountSpent)}
            </span>
          </div>
        </div>

      </div>

      {/* ===== BALANCE + PLAN ===== */}
      <div className="row innerdivrow">

        <div className="col-sm-6">
          <div className="display-group">
            <span className="display-label">Balance Amount</span>
            <span className="display-field">
              {safe(mappedData.balanceAmount)}
            </span>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="display-group">
            <span className="display-label">Plan Modified</span>
            <span className="display-field">
              {mappedData.planModified ? "Yes" : "No"}
            </span>
          </div>
        </div>

      </div>

      {/* ===== CERTIFICATES ===== */}
      <h3 className="subheading">Uploaded Certificates</h3>

      <div className="row innerdivrow">

        <div className="col-sm-4">
          <div className="display-group">
            <span className="display-label">Architect Certificate</span>
            {getFileUrl(mappedData.architectPath) ? (
              <a
                className="display-field"
                href={getFileUrl(mappedData.architectPath)}
                target="_blank"
                rel="noreferrer"
              >
                {getFileName(mappedData.architectPath)}
              </a>
            ) : (
              <span className="display-field">NA</span>
            )}
          </div>
        </div>

        <div className="col-sm-4">
          <div className="display-group">
            <span className="display-label">Engineer Certificate</span>
            {getFileUrl(mappedData.engineerPath) ? (
              <a
                className="display-field"
                href={getFileUrl(mappedData.engineerPath)}
                target="_blank"
                rel="noreferrer"
              >
                {getFileName(mappedData.engineerPath)}
              </a>
            ) : (
              <span className="display-field">NA</span>
            )}
          </div>
        </div>

        <div className="col-sm-4">
          <div className="display-group">
            <span className="display-label">CA Certificate</span>
            {getFileUrl(mappedData.caPath) ? (
              <a
                className="display-field"
                href={getFileUrl(mappedData.caPath)}
                target="_blank"
                rel="noreferrer"
              >
                {getFileName(mappedData.caPath)}
              </a>
            ) : (
              <span className="display-field">NA</span>
            )}
          </div>
        </div>

      </div>

      {/* ===== DELAY ===== */}
      <div className="row innerdivrow">

        <div className="col-sm-12">
          <div className="display-group">
            <span className="display-label">Project Delayed</span>
            <span className="display-field">
              {mappedData.projectDelayed ? "Yes" : "No"}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default scrutiny_ExistingProjectConstructionStatus;