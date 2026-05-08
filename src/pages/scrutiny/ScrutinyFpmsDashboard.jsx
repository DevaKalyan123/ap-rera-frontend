import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../../api/api";
import ScrutinySidebar from "../../components/scrutiny/ScrutinitySidebar";
import TopHeader from "../../components/scrutiny/TopHeader";
import "../../styles/scrutiny/fpms.css";

const PAGE_SIZES = [15, 25, 50];

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-GB");
};

const safeText = (value) => {
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
};

const ScrutinyFpmsDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState({
    total_files: 0,
    open_files: 0,
    closed_files: 0,
  });
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(1);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiGet("/api/scrutiny/fpms-dashboard");
        setSummary(response?.summary || { total_files: 0, open_files: 0, closed_files: 0 });
        setRows(Array.isArray(response?.rows) ? response.rows : []);
      } catch (loadError) {
        setError(loadError.message || "Unable to load FPMS dashboard data.");
        setSummary({ total_files: 0, open_files: 0, closed_files: 0 });
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, pageSize]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;

    return rows.filter((row) =>
      [
        row.file_number,
        row.inward_no,
        row.file_description,
        row.received_through,
        row.from_where,
        row.to_whom,
        row.assign_to,
        row.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePageNumber = Math.min(page, totalPages);
  const startIndex = (safePageNumber - 1) * pageSize;
  const paginatedRows = filteredRows.slice(startIndex, startIndex + pageSize);

  return (
    <div className="scrutiny-layout">
      <ScrutinySidebar sidebarOpen={sidebarOpen} />

      <div className={`scrutiny-main ${sidebarOpen ? "" : "scrutiny-main-full"}`}>
        <TopHeader toggleSidebar={toggleSidebar} />

        <div className="fpms-container">
          <div className="breadcrumb">
            You are here : <b>FPMS Dashboard</b>
          </div>

          <div className="fpms-cards">
            <div className="fpms-card blue">
              <div className="icon-circle">Files</div>
              <div className="card-right">
                <h4>TOTAL FILES</h4>
                <h2>{summary.total_files || 0}</h2>
                <p>Created</p>
              </div>
            </div>

            <div className="fpms-card orange">
              <div className="icon-circle">Open</div>
              <div className="card-right">
                <h4>OPEN</h4>
                <h2>{summary.open_files || 0}</h2>
                <p>Files</p>
              </div>
            </div>

            <div className="fpms-card green">
              <div className="icon-circle">Closed</div>
              <div className="card-right">
                <h4>CLOSED</h4>
                <h2>{summary.closed_files || 0}</h2>
                <p>Files</p>
              </div>
            </div>
          </div>

          <div className="fpms-table">
            <div className="table-header">
              <h3>Total Files</h3>

              <div className="table-controls">
                <span>Show</span>
                <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
                  {PAGE_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span>entries</span>

                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="alert alert-danger" style={{ marginBottom: "12px" }}>
                {error}
              </div>
            )}

            <div className="table-wrapper">
              <table className="fpms-data-table">
                <thead>
                  <tr>
                    <th>S.No <span>↕</span></th>
                    <th>File Number <span>↕</span></th>
                    <th>Inward Number <span>↕</span></th>
                    <th>Filed Date <span>↕</span></th>
                    <th>File Description <span>↕</span></th>
                    <th>Received Through <span>↕</span></th>
                    <th>From Where <span>↕</span></th>
                    <th>To Whom <span>↕</span></th>
                    <th>File Assigned To <span>↕</span></th>
                    <th>File Assigned Date <span>↕</span></th>
                    <th>Status <span>↕</span></th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="11">Loading dashboard data...</td>
                    </tr>
                  ) : paginatedRows.length === 0 ? (
                    <tr>
                      <td colSpan="11">No files found.</td>
                    </tr>
                  ) : (
                    paginatedRows.map((row, index) => (
                      <tr key={row.id || index}>
                        <td>{startIndex + index + 1}</td>
                        <td>{safeText(row.file_number)}</td>
                        <td>{safeText(row.inward_no)}</td>
                        <td>{formatDate(row.file_date)}</td>
                        <td>{safeText(row.file_description)}</td>
                        <td>{safeText(row.received_through)}</td>
                        <td>{safeText(row.from_where)}</td>
                        <td>{safeText(row.to_whom)}</td>
                        <td>{safeText(row.assign_to)}</td>
                        <td>{formatDate(row.file_assigned_date)}</td>
                        <td>{safeText(row.status)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "12px",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div>
                Showing {filteredRows.length ? startIndex + 1 : 0} to {Math.min(startIndex + pageSize, filteredRows.length)} of {filteredRows.length} entries
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button type="button" disabled={safePageNumber === 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
                  Prev
                </button>
                <span>Page {safePageNumber} of {totalPages}</span>
                <button
                  type="button"
                  disabled={safePageNumber >= totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrutinyFpmsDashboard;