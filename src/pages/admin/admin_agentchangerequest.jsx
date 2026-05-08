import React, { useEffect, useMemo, useState } from "react";
import "../../styles/admin_agentchangerequest.css";
import { apiGet, apiPut, BASE_URL } from "../../api/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";

const BACKEND_BASE_URL = BASE_URL.replace(/\/$/, "");

const STATUS_FILTERS = ["All", "Pending", "Completed", "Rejected"];

const formatStatusLabel = (status) => {
  const map = {
    Pending: "Pending",
    Completed: "Completed",
    Rejected: "Rejected"
  };
  return map[status] || status;
};

const getPaymentStatusLabel = (rawStatus) => {
  const normalized = (rawStatus || "").toLowerCase();
  if (["completed", "approved"].includes(normalized)) {
    return "Completed";
  }
  if (normalized === "rejected") {
    return "Rejected";
  }
  return "Pending";
};

const getFileExtension = (fileName = "") => {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : "";
};

const getMimeTypeFromFileName = (fileName = "") => {
  const extension = getFileExtension(fileName);
  if (extension === ".pdf") {
    return "application/pdf";
  }
  if (extension === ".jpg" || extension === ".jpeg") {
    return "image/jpeg";
  }
  if (extension === ".png") {
    return "image/png";
  }
  if (extension === ".doc") {
    return "application/msword";
  }
  if (extension === ".docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  return "application/octet-stream";
};

const normalizeLabel = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const INDIVIDUAL_REPLACEMENT_LABELS = new Set([
  "photograph",
  "pan card proof",
  "address proof",
  "income tax returns acknowledgement year1",
  "income tax returns acknowledgement year 1",
  "income tax returns acknowlegement year1",
  "income tax returns acknowlegement year 1",
  "income tax returns acknowledgement year2",
  "income tax returns acknowledgement year 2",
  "income tax returns acknowlegement year2",
  "income tax returns acknowlegement year 2",
  "income tax returns acknowledgement year3",
  "income tax returns acknowledgement year 3",
  "income tax returns acknowlegement year3",
  "income tax returns acknowlegement year 3"
]);

const ORGANIZATION_REPLACEMENT_LABELS = new Set([
  "authorized signatory photo",
  "authorized signature",
  "authorised signature",
  "board resolution for authorized signatory",
  "upload registration card",
  "upload registration certificate",
  "upload pan card",
  "upload gst certificate",
  "upload gst",
  "address proof",
  "income tax returns acknowledgement year1",
  "income tax returns acknowledgement year 1",
  "income tax returns acknowlegement year1",
  "income tax returns acknowlegement year 1",
  "income tax returns acknowledgement year2",
  "income tax returns acknowledgement year 2",
  "income tax returns acknowlegement year2",
  "income tax returns acknowlegement year 2",
  "income tax returns acknowledgement year3",
  "income tax returns acknowledgement year 3",
  "income tax returns acknowlegement year3",
  "income tax returns acknowlegement year 3"
]);

const isReplacementFieldForType = (fieldType, label) => {
  const normalized = normalizeLabel(label);
  if (fieldType === "individual") {
    return INDIVIDUAL_REPLACEMENT_LABELS.has(normalized);
  }
  return ORGANIZATION_REPLACEMENT_LABELS.has(normalized);
};

const getFileNameFromPath = (filePath = "") => {
  if (!filePath) {
    return "";
  }
  const normalizedPath = filePath.split("?")[0].split("#")[0];
  const parts = normalizedPath.split(/[\\/]/);
  return decodeURIComponent(parts[parts.length - 1] || "");
};

const getOldFileUrl = (fileRef = "") => {
  if (!fileRef) {
    return "";
  }
  const trimmed = fileRef.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  const normalized = trimmed.replace(/\\/g, "/").replace(/^\/+/, "");
  if (normalized.startsWith("uploads/")) {
    return `${BACKEND_BASE_URL}/${normalized}`;
  }
  if (normalized.startsWith("agent_doc/")) {
    return `${BACKEND_BASE_URL}/api/${normalized}`;
  }
  if (normalized.includes("/")) {
    return `${BACKEND_BASE_URL}/${normalized}`;
  }
  return `${BACKEND_BASE_URL}/uploads/agents/${normalized}`;
};

const getFieldDocumentByLabel = (fieldDocuments, label) => {
  if (!fieldDocuments || !label) {
    return null;
  }
  if (fieldDocuments[label]) {
    return fieldDocuments[label];
  }
  const normalizedLabel = normalizeLabel(label);
  const matchEntry = Object.entries(fieldDocuments).find(
    ([key]) => normalizeLabel(key) === normalizedLabel
  );
  return matchEntry ? matchEntry[1] : null;
};

function AdminAgentChangeRequest() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const stats = useMemo(() => {
    return STATUS_FILTERS.slice(1).reduce((acc, key) => {
      acc[key] = requests.filter(
        (request) => getPaymentStatusLabel(request.status) === key
      ).length;
      return acc;
    }, {});
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return requests.filter((request) => {
      const currentLabel = getPaymentStatusLabel(request.status);
      const matchesStatus =
        statusFilter === "All" ? true : currentLabel === statusFilter;
      const matchesSearch =
        !normalizedSearch ||
        [request.applicationNo, request.panNumber]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedSearch));
      return matchesStatus && matchesSearch;
    });
  }, [requests, statusFilter, searchTerm]);

  const handleAction = async (id, newStatus) => {
    try {
      setActionError("");
      setActionMessage("");

      let response;

      if (newStatus === "Approved") {
        response = await apiPut(`/api/admin/change-requests/${id}/approve`, {});
      } else {
        response = await apiPut(`/api/admin/change-requests/${id}/status`, {
          status: newStatus
        });
      }

      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );

      setSelectedRequest((prev) =>
        prev && prev.id === id ? { ...prev, status: newStatus } : prev
      );

      if (response?.mail_sent) {
        setActionMessage(
          response.mail_message ||
            `${newStatus} successfully and mail sent to registered email.`
        );
      } else if (response?.mail_error) {
        setActionError(
          `Status updated successfully, but mail was not sent. ${response.mail_error}`
        );
      } else {
        setActionMessage(`${newStatus} successfully.`);
      }
    } catch (actionErrorValue) {
      console.error("Failed to update request status", actionErrorValue);
      setActionError(actionErrorValue.message || "Failed to update request status.");
      setActionMessage("");
    }
  };

  const latestRequest = filteredRequests[0] || null;
  const combinedFieldChanges = useMemo(() => {
    if (!selectedRequest) {
      return [];
    }
    const individual = (selectedRequest.individualFieldChanges || []).map((field) => ({
      ...field,
      fieldType: "individual"
    }));
    const organization = (selectedRequest.organizationFieldChanges || []).map((field) => ({
      ...field,
      fieldType: "organization"
    }));
    return [...individual, ...organization];
  }, [selectedRequest]);

  const openBase64File = (base64Data, fileName = "document") => {
    if (!base64Data) {
      return;
    }
    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const mimeType = getMimeTypeFromFileName(fileName);
      const blob = new Blob([byteArray], { type: mimeType });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Failed to open base64 file", error);
    }
  };

  const closeDetailsModal = () => {
    setSelectedRequest(null);
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchRequests = async () => {
      setIsLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();

        if (statusFilter && statusFilter !== "All") {
          params.append("status", statusFilter);
        }
        if (searchTerm.trim()) {
          params.append("search", searchTerm.trim());
        }

        const query = "/api/admin/change-requests/full";

        const response = await apiGet(query);
        if (!isCancelled) {
          setRequests(response?.requests || []);
        }
      } catch (fetchError) {
        console.error("Failed to load change requests", fetchError);
        if (!isCancelled) {
          setError("Unable to load change requests at this time.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchRequests();
    return () => {
      isCancelled = true;
    };
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    if (!selectedRequest) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeDetailsModal();
      }
    };
    window.addEventListener("keydown", onEscapeKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscapeKey);
    };
  }, [selectedRequest]);

  return (
    <div className="admin-layout">
      <AdminSidebar sidebarOpen={sidebarOpen} />
      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>
        <TopHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-dashboard-content">
          <div className="admin-change-request-page">
            <header className="admin-change-request-header">
              <div>
                <h1>Agent Change Requests</h1>
                <p className="placeholder-text">
                  Review, approve, or reject agent change requests submitted through the
                  portal.
                </p>
              </div>
              <div className="search-area">
                <input
                  type="search"
                  placeholder="Search by application or agent name"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </header>

      <section className="admin-status-cards">
        {STATUS_FILTERS.slice(1).map((status) => (
          <button
            key={status}
            className={`status-card ${
              statusFilter === status ? "status-card-active" : ""
            }`}
            onClick={() => setStatusFilter(status)}
          >
            <span className="status-card-label">{status}</span>
            <span className="status-card-value">{stats[status] || 0}</span>
          </button>
        ))}
        <button
          className={`status-card ${statusFilter === "All" ? "status-card-active" : ""}`}
          onClick={() => setStatusFilter("All")}
        >
          <span className="status-card-label">All Requests</span>
          <span className="status-card-value">{requests.length}</span>
        </button>
      </section>

      <section className="admin-filter-row">
        <span>Filter by status:</span>
        <div className="filter-buttons">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              className={`filter-pill ${
                statusFilter === status ? "filter-pill-active" : ""
              }`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      {error && <p className="error-message">{error}</p>}
      {actionError && <p className="error-message">{actionError}</p>}
      {actionMessage && (
        <p className="success-message" style={{ color: "green", marginBottom: "16px" }}>
          {actionMessage}
        </p>
      )}

      <section className="admin-request-table">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Application No.</th>
                <th>Agent / Applicant</th>
                <th>Request Status</th>
                <th>Submitted On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="empty-state">
                    Loading change requests...
                  </td>
                </tr>
              ) : filteredRequests.length ? (
                filteredRequests.map((request) => {
                  const paymentStatus = getPaymentStatusLabel(request.status);
                  return (
                    <tr key={request.id}>
                      <td>{request.applicationNo || "-"}</td>
                      <td>
                        <strong>{request.panNumber || "PAN: N/A"}</strong>
                        <div className="muted-text">{request.applicantType || "-"}</div>
                      </td>
                      <td>
                        <span
                          className={`status-chip status-${paymentStatus
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {formatStatusLabel(paymentStatus)}
                        </span>
                      </td>
                      <td>{request.submittedAt || "-"}</td>
                      <td className="action-buttons">
                        <button
                          type="button"
                          className="subtle-secondary"
                          onClick={() => setSelectedRequest(request)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="success"
                          onClick={() => handleAction(request.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="danger"
                          onClick={() => handleAction(request.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="empty-state">
                    No change requests match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>


      {/* FULL DETAILS PANEL */}
      {selectedRequest && (
        <div className="full-details-modal-overlay" onClick={closeDetailsModal}>
          <div
            className="full-details-panel full-details-modal-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="panel-header">
              <h2>Change Request Details</h2>
              <button className="close-button" onClick={closeDetailsModal}>
                Close
              </button>
            </div>
          <div className="details-grid">
            <div>
              <strong>Application No.</strong>
              <p>{selectedRequest.applicationNo || "-"}</p>
            </div>
            <div>
              <strong>PAN Number</strong>
              <p>{selectedRequest.panNumber || "-"}</p>
            </div>
            <div>
              <strong>Applicant Type</strong>
              <p>{selectedRequest.applicantType || "-"}</p>
            </div>
            <div>
              <strong>Payment Status</strong>
              <p>
                {formatStatusLabel(
                  getPaymentStatusLabel(selectedRequest.status)
                )}
              </p>
            </div>
            <div>
              <strong>Submitted On</strong>
              <p>{selectedRequest.submittedAt || "-"}</p>
            </div>
          </div>

          <section>
            <h3>Issue Summary</h3>
            <p>{selectedRequest.individualDescription || selectedRequest.organizationDescription || "No description provided."}</p>
            <p className="muted-text issue-summary-type-clamp">
              Issue Type:{" "}
              {selectedRequest.individualIssueType ||
                selectedRequest.organizationIssueType ||
                selectedRequest.individualIssue ||
                selectedRequest.organizationIssue ||
                "Not specified"}
            </p>
          </section>
          <section>
            <h3>Field Changes</h3>
            {combinedFieldChanges.map((field, index) => {
              const isReplacementField = isReplacementFieldForType(
                field.fieldType,
                field.label
              );
              const fieldDocuments =
                field.fieldType === "individual"
                  ? selectedRequest.individualFieldDocuments
                  : selectedRequest.organizationFieldDocuments;
              const fieldDocument = getFieldDocumentByLabel(
                fieldDocuments,
                field.label
              );
              const oldFileUrl = isReplacementField
                ? getOldFileUrl(field.oldValue || "")
                : "";
              const oldFileName = getFileNameFromPath(field.oldValue || "");

              return (
                <div
                  key={`${field.fieldType}-${field.label}-${index}`}
                  className="field-change-row"
                >
                  <div className="field-label">
                    {field.issue} - {field.label}
                  </div>
                  <div className="field-values">
                    {isReplacementField ? (
                      <>
                        <span>
                          Old File:{" "}
                          {oldFileUrl ? (
                            <a href={oldFileUrl} target="_blank" rel="noreferrer">
                              {oldFileName || "View Old File"}
                            </a>
                          ) : (
                            "-"
                          )}
                        </span>
                        <span>
                          New File:{" "}
                          {fieldDocument?.data ? (
                            <button
                              type="button"
                              onClick={() =>
                                openBase64File(
                                  fieldDocument.data,
                                  fieldDocument.original_name ||
                                    fieldDocument.stored_name ||
                                    "document"
                                )
                              }
                              style={{
                                color: "blue",
                                textDecoration: "underline",
                                background: "none",
                                border: "none",
                                cursor: "pointer"
                              }}
                            >
                              View New File
                            </button>
                          ) : (
                            "not uploaded"
                          )}
                        </span>
                        <span>
                          Description: {field.newValue || "-"}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Old: {field.oldValue || "-"}</span>
                        <span>New: {field.newValue || "-"}</span>
                        <span>
                          Supporting Document:{" "}
                          {fieldDocument?.data ? (
                            <button
                              type="button"
                              onClick={() =>
                                openBase64File(
                                  fieldDocument.data,
                                  fieldDocument.original_name ||
                                    fieldDocument.stored_name ||
                                    "document"
                                )
                              }
                              style={{
                                color: "blue",
                                textDecoration: "underline",
                                background: "none",
                                border: "none",
                                cursor: "pointer"
                              }}
                            >
                              View Supporting File
                            </button>
                          ) : (
                            "not uploaded"
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {combinedFieldChanges.length === 0 && (
              <p className="muted-text">No per-field changes recorded.</p>
            )}
          </section>

          <section>
            <h3>Replacement Reason</h3>
            <p>
              {selectedRequest.individualReplaceReason ||
                selectedRequest.organizationReplaceReason ||
                "No reason provided."}
            </p>
          </section>
          </div>
        </div>
      )}

      {latestRequest && (
        <section className="admin-request-panel">
          <div>
            <h2>Latest Request Overview</h2>
            <p>
              Application <strong>{latestRequest.applicationNo}</strong> - {latestRequest.agentName}
            </p>
          </div>
          <div className="panel-details">
            <div>
              <span>Payment Status</span>
              <strong>
                {formatStatusLabel(getPaymentStatusLabel(latestRequest.status))}
              </strong>
            </div>
            <div>
              <span>Submitted</span>
              <strong>{latestRequest.submittedAt}</strong>
            </div>
            <div>
              <span>Applicant Type</span>
              <strong>{latestRequest.applicantType}</strong>
            </div>
          </div>
        </section>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAgentChangeRequest;