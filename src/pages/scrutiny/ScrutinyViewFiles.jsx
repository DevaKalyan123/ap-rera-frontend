import { useState } from "react";
import "../../styles/scrutiny/ScrutinyViewFiles.css";
import { apiGet, BASE_URL } from "../../api/api";
import ScrutinyLayout from "../../components/scrutiny/ScrutinyLayout";

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-GB");
};

const safeText = (value) => {
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
};

const getDateKey = (value) => {
  if (!value) return "";
  const text = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const buildDocumentUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = String(path).replace(/^\/+/, "");
  return encodeURI(`${BASE_URL.replace(/\/$/, "")}/${normalizedPath}`);
};

const ScrutinyViewFiles = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [resultTitle, setResultTitle] = useState("Search Results");

  const loadFpmsRows = async () => {
    const response = await apiGet("/api/scrutiny/fpms-dashboard");
    return Array.isArray(response?.rows) ? response.rows : [];
  };

  const handleGetDetails = async () => {
    const searchFileNumber = fileNumber.trim().toLowerCase();

    if (!searchFileNumber && (!fromDate || !toDate)) {
      setError("Please enter File Number or select both From Date and To Date.");
      setRows([]);
      setHasSearched(false);
      return;
    }

    if (!searchFileNumber && fromDate > toDate) {
      setError("From Date cannot be greater than To Date.");
      setRows([]);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setHasSearched(true);
      setRows([]);

      const fpmsRows = await loadFpmsRows();
      let filteredRows = [];

      if (searchFileNumber) {
        filteredRows = fpmsRows.filter((row) =>
          String(row.file_number || "").toLowerCase().includes(searchFileNumber)
        );
        setResultTitle(`Search Results for ${fileNumber.trim()}`);
      } else {
        filteredRows = fpmsRows.filter((row) => {
          const fileDate = getDateKey(row.file_date || row.created_at);
          return fileDate && fileDate >= fromDate && fileDate <= toDate;
        });
        setResultTitle(`Files from ${formatDate(fromDate)} to ${formatDate(toDate)}`);
      }

      setRows(filteredRows);
    } catch (loadError) {
      setError(loadError.message || "Unable to load scrutiny files.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setFileNumber("");
    setRows([]);
    setError("");
    setHasSearched(false);
    setResultTitle("Search Results");
  };

  return (

    <ScrutinyLayout>
<div className="Svff-svf-main">

      {/* HEADER */}
      

      <div className="Svff-svf-body">

        {/* SIDEBAR */}
        

        {/* CONTENT */}
        <div className="Svff-svf-content">

          {/* Breadcrumb */}
          <p className="Svff-breadcrumb">
            You are here : <span>DashBoard</span> / View Files
          </p>

          {/* CARD */}
          <div className="Svff-svf-card">

            <h3>Scrutiny View Files</h3>

            <div className="Svff-svf-form">

              <div className="Svff-row">
                <div className="Svff-field">
                  <label>From Date<span>*</span></label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(event) => setFromDate(event.target.value)}
                  />
                </div>

                <div className="Svff-field">
                  <label>To Date<span>*</span></label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(event) => setToDate(event.target.value)}
                  />
                </div>
              </div>

              <div className="Svff-or">OR</div>

              <div className="Svff-row">
                <div className="Svff-field full">
                  <label>File Number<span>*</span></label>
                  <input
                    type="text"
                    placeholder="File Number"
                    value={fileNumber}
                    onChange={(event) => setFileNumber(event.target.value)}
                  />
                </div>
              </div>

              <div className="Svff-buttons">
                <button
                  className="Svff-btn-blue"
                  type="button"
                  onClick={handleGetDetails}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Get Details"}
                </button>
                <button className="Svff-btn-red" type="button" onClick={handleClear}>
                  Clear
                </button>
              </div>

            </div>

          </div>

          {(error || hasSearched) && (
            <div className="Svff-results-card">
              {error && <div className="Svff-alert">{error}</div>}

              {hasSearched && !error && (
                <>
                  <div className="Svff-results-header">
                    <h3>{resultTitle}</h3>
                    <span>{rows.length} file{rows.length === 1 ? "" : "s"} found</span>
                  </div>

                  <div className="Svff-table-wrap">
                    <table className="Svff-results-table">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>File Number</th>
                          <th>Inward Number</th>
                          <th>Filed Date</th>
                          <th>File Description</th>
                          <th>Received Through</th>
                          <th>From Where</th>
                          <th>To Whom</th>
                          <th>Assigned To</th>
                          <th>Status</th>
                          <th>Document</th>
                        </tr>
                      </thead>

                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="11">Loading files...</td>
                          </tr>
                        ) : rows.length === 0 ? (
                          <tr>
                            <td colSpan="11">No files found.</td>
                          </tr>
                        ) : (
                          rows.map((row, index) => {
                            const documentUrl = buildDocumentUrl(row.file_path);

                            return (
                              <tr key={row.id || `${row.file_number}-${index}`}>
                                <td>{index + 1}</td>
                                <td>{safeText(row.file_number)}</td>
                                <td>{safeText(row.inward_no)}</td>
                                <td>{formatDate(row.file_date)}</td>
                                <td>{safeText(row.file_description)}</td>
                                <td>{safeText(row.received_through)}</td>
                                <td>{safeText(row.from_where)}</td>
                                <td>{safeText(row.to_whom)}</td>
                                <td>{safeText(row.assign_to)}</td>
                                <td>{safeText(row.status)}</td>
                                <td>
                                  {documentUrl ? (
                                    <a href={documentUrl} target="_blank" rel="noreferrer">
                                      View
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
    </ScrutinyLayout>
    
  );
};

export default ScrutinyViewFiles;