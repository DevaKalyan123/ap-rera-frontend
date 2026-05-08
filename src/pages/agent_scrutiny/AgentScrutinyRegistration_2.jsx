import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet, BASE_URL } from "../../api/api";
import AgentWizard from "../../components/scrutiny/AgentWizard";
import ScrutinyLayout from "../../components/scrutiny/ScrutinyLayout";
import "../../styles/scrutiny/scrutiny_projectregistation_1.css";
import ScrutinyDocumentRemarkModal from "../../components/ScrutinyDocumentRemarkModal";

/**
 * FIX:
 * Your backend serves files from:
 * http://localhost:5000/uploads/<file_path>
 *
 * DB may store:
 * uploads/agent_registration/abc.pdf
 * /uploads/agent_registration/abc.pdf
 * agent_registration/abc.pdf
 *
 * So normalize all cases properly.
 */
const getFileUrl = (value) => {
  if (!value) return "";

  let parsed = value;

  try {
    parsed = JSON.parse(value);
  } catch (e) {
    // plain string path
  }

  // Handle object paths
  if (typeof parsed === "object" && parsed !== null) {
    const rawPath = parsed.path || parsed.file || parsed.url || "";

    if (!rawPath) return "";

    const normalizedPath = rawPath
      .replace(/\\/g, "/")      // windows path fix
      .replace(/^\/+/, "")      // remove starting slash
      .replace(/^uploads\//, ""); // remove duplicate uploads

    return `${BASE_URL}/uploads/${normalizedPath}`;
  }

  // Handle string paths
  if (typeof parsed === "string") {
    if (parsed.startsWith("http")) return parsed;

    const normalizedPath = parsed
      .replace(/\\/g, "/")
      .replace(/^\/+/, "")
      .replace(/^uploads\//, "");

    return `${BASE_URL}/uploads/${normalizedPath}`;
  }

  return "";
};

function DocumentCell({ path, title, openModal, label = "View Document" }) {
  const href = getFileUrl(path);

  console.log("Original Path:", path);
  console.log("Generated URL:", href);

  if (!href) {
    return <span className="spr-display-field">N/A</span>;
  }

  return (
    <button
      type="button"
      className="spr-file-link"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
      onClick={() => openModal(href, title)}
    >
      {label}
    </button>
  );
}

export default function AgentScrutinyRegistration_2() {
  const navigate = useNavigate();
  const location = useLocation();

  const applicationNumber =
    location.state?.applicationNumber ||
    sessionStorage.getItem("agentApplicationNumber") ||
    "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const openModal = (url, title) => {
    if (!url) return;

    setSelectedDoc({
      url,
      title,
    });

    setModalOpen(true);
  };

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
        const resp = await apiGet(
          `/api/agent-scrutiny/registrations/details?application_no=${applicationNumber}`
        );

        console.log("Full API Response:", resp);

        if (resp && !resp.error) {
          setSummary(resp);
        } else {
          setError(resp?.error || "Agent not found");
        }
      } catch (loadError) {
        console.error("Load Error:", loadError);
        setError(loadError.message || "Unable to load agent details.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [applicationNumber]);

  const fullData = summary?.full_data || {};
  const agentDetails = fullData.agent_details || {};

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
              <span>Upload Documents</span>
            </div>

            <div className="spr-brand">
              <span>RERA-SE</span>

              <button
                type="button"
                className="spr-icon-btn"
                onClick={() => window.print()}
                title="Print"
              >
                <i className="fa-solid fa-print" />
              </button>
            </div>
          </div>

          <div className="spr-body">
            <div className="spr-header-row">
              <div>
                <h1 className="spr-title">Upload Documents</h1>

                <p className="spr-subtitle">
                  Read-only view for application{" "}
                  {applicationNumber || "N/A"}.
                </p>
              </div>

              <button
                type="button"
                className="spr-secondary-btn"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>

            <AgentWizard currentStep={2} />

            {loading ? (
              <div className="spr-state-card">
                Loading documents...
              </div>
            ) : error ? (
              <div className="spr-state-card spr-error">
                {error}
              </div>
            ) : (
              <div className="spr-card">
                <div className="spr-table-wrap">
                  <table className="spr-table">
                    <thead>
                      <tr>
                        <th>Document Name</th>
                        <th>Uploaded Document</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Income Tax Return - Year 1</td>
                        <td>
                          <DocumentCell
                            path={agentDetails.itr_year1}
                            title="Income Tax Return - Year 1"
                            openModal={openModal}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Income Tax Return - Year 2</td>
                        <td>
                          <DocumentCell
                            path={agentDetails.itr_year2}
                            title="Income Tax Return - Year 2"
                            openModal={openModal}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Income Tax Return - Year 3</td>
                        <td>
                          <DocumentCell
                            path={agentDetails.itr_year3}
                            title="Income Tax Return - Year 3"
                            openModal={openModal}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    style={{ cursor: "default" }}
                  />

                  <span>
                    I / We solemnly affirm that the above
                    information is correct
                  </span>
                </div>

                <div
                  style={{
                    marginTop: "30px",
                    textAlign: "right",
                  }}
                >
                  <button
                    className="spr-btn"
                    onClick={() =>
                      navigate(
                        "/agent-scrutiny/registration_action",
                        {
                          state: {
                            applicationNumber,
                            agentType:
                              location.state?.agentType,
                          },
                        }
                      )
                    }
                  >
                    Save And Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ScrutinyDocumentRemarkModal
        isOpen={modalOpen}
        documentItem={selectedDoc}
        onClose={() => setModalOpen(false)}
        applicationNo={applicationNumber}
        apiPrefix="/api/agent-scrutiny"
      />
    </ScrutinyLayout>
  );
}