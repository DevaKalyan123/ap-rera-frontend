import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";

const styles = `
  @import
  url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  .complaints-wrapper {
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 28px;
    background: #f4f6fb;
    min-height: 100vh;
  }
  .complaints-page-title {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 20px;
    letter-spacing: -0.3px;
  }

  /* ── Stats Row ── */
  .complaints-stats {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .stat-card {
    flex: 1;
    min-width: 100px;
    background: #fff;
    border-radius: 12px;
    padding: 14px 18px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    display: flex;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.18s;
    user-select: none;
  }
  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.10);
  }
  .stat-card.active-total   { border-color: #3b5bdb; background: #eef1ff; }
  .stat-card.active-open    { border-color: #3b82f6; background: #eff6ff; }
  .stat-card.active-pending { border-color: #f59e0b; background: #fffbeb; }
  .stat-card.active-close   { border-color: #12b76a; background: #ecfdf5; }
  .stat-card.active-reject  { border-color: #f04438; background: #fef2f2; }
  .stat-label {
    font-size: 11px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .stat-value {
    font-size: 24px;
    font-weight: 700;
  }
  .stat-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }
  .stat-total   .stat-value { color: #3b5bdb; }
  .stat-open    .stat-value { color: #3b82f6; }
  .stat-pending .stat-value { color: #f59e0b; }
  .stat-close   .stat-value { color: #12b76a; }
  .stat-reject  .stat-value { color: #f04438; }
  .dot-total   { background: #3b5bdb; }
  .dot-open    { background: #3b82f6; }
  .dot-pending { background: #f59e0b; }
  .dot-close   { background: #12b76a; }
  .dot-reject  { background: #f04438; }

  /* ── Toolbar ── */
  .complaints-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  .search-box {
    position: relative;
    flex: 1;
    min-width: 0;
  }

  .search-box svg {
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    pointer-events: none;
  }

  .search-box input {
    width: 100%;
    padding: 9px 12px 9px 36px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    font-size: 13px;
    font-family: inherit;
    background: #fff;
    color: #111827;
    outline: none;
    transition: border 0.2s;
    box-sizing: border-box;
  }

  .search-box input:focus {
    border-color: #3b5bdb;
    box-shadow: 0 0 0 3px rgba(59,91,219,0.08);
  }

  .filter-select {
    padding: 9px 12px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    font-size: 13px;
    font-family: inherit;
    background: #fff;
    color: #374151;
    cursor: pointer;
    outline: none;
    width: 140px;
    flex-shrink: 0;
    transition: border 0.2s;
  }

  .filter-select:focus {
    border-color: #3b5bdb;
    box-shadow: 0 0 0 3px rgba(59,91,219,0.08);
  }

  .results-count {
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 10px;
  }

  /* ── Table ── */
  .table-container {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.07);
    overflow-x: auto;
  }

  .complaints-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 920px;
  }

  .complaints-table thead {
    background: #f8f9ff;
    border-bottom: 2px solid #e9ecf5;
  }

  .complaints-table th {
    padding: 13px 14px;
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    color: #f8f8f8ff;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    white-space: nowrap;
  }

  .complaints-table tbody tr {
    border-bottom: 1px solid #f3f4f6;
    transition: background 0.15s;
  }

  .complaints-table tbody tr:hover {
    background: #f8f9ff;
  }

  .complaints-table tbody tr:last-child {
    border-bottom: none;
  }

  .complaints-table td {
    padding: 13px 14px;
    font-size: 13.5px;
    color: #374151;
    vertical-align: middle;
  }

  .complaint-id {
    font-family: 'Courier New', monospace;
    font-size: 12.5px;
    color: #3b5bdb;
    font-weight: 700;
    white-space: nowrap;
  }

  .subject-text {
    font-weight: 500;
    color: #111827;
  }

  .form-type-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 5px;
    white-space: nowrap;
    letter-spacing: 0.3px;
  }

  .form-type-m {
    background: #eff2ff;
    color: #3b5bdb;
    border: 1px solid #c5cff7;
  }

  .form-type-n {
    background: #fdf4ff;
    color: #7c3aed;
    border: 1px solid #ddd6fe;
  }

  .reg-no-text {
    color: #374151;
    font-size: 13px;
    white-space: nowrap;
  }

  .date-text {
    color: #6b7280;
    font-size: 13px;
    white-space: nowrap;
  }

  .reject-reason {
    font-size: 12px;
    color: #f04438;
    font-style: italic;
    max-width: 150px;
    word-break: break-word;
  }

  .no-data {
    color: #d1d5db;
    font-size: 13px;
  }

  /* ── Status Badge ── */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 11px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .badge-pending { background: #fef3c7; color: #92400e; }
  .badge-pending .badge-dot { background: #f59e0b; }

  .badge-open { background: #dbeafe; color: #1e40af; }
  .badge-open .badge-dot { background: #3b82f6; }

  .badge-close { background: #d1fae5; color: #065f46; }
  .badge-close .badge-dot { background: #12b76a; }

  .badge-reject { background: #fee2e2; color: #991b1b; }
  .badge-reject .badge-dot { background: #f04438; }

  /* ── View Button ── */
  .btn-view {
    padding: 6px 14px;
    border-radius: 7px;
    font-size: 12px;
    font-weight: 600;
    font-family: inherit;
    border: none;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
    background: #eff2ff;
    color: #3b5bdb;
  }

  .btn-view:hover {
    background: #3b5bdb;
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(59,91,219,0.3);
  }

  /* ── Empty ── */
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #9ca3af;
    font-size: 15px;
  }

  .empty-icon { font-size: 38px; margin-bottom: 10px; }
`;

// "close" from API → shown as "Closed" (not "Accepted")
const STATUS_MAP = {
  open: { label: "Open", cls: "badge-open" },
  pending: { label: "Pending", cls: "badge-pending" },
  closed: { label: "Closed", cls: "badge-close" },
  reject: { label: "Rejected", cls: "badge-reject" },
};

const STAT_CARDS = [
  { key: "all", label: "Total", dotCls: "dot-total", cardCls: "stat-total", activeCls: "active-total" },
  { key: "open", label: "Open", dotCls: "dot-open", cardCls: "stat-open", activeCls: "active-open" },
  { key: "pending", label: "Pending", dotCls: "dot-pending", cardCls: "stat-pending", activeCls: "active-pending" },
  { key: "closed", label: "Closed", dotCls: "dot-close", cardCls: "stat-close", activeCls: "active-close" },
  { key: "reject", label: "Rejected", dotCls: "dot-reject", cardCls: "stat-reject", activeCls: "active-reject" },
];

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formFilter, setFormFilter] = useState("all");
  const [activeCard, setActiveCard] = useState("all");
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    fetch("http://localhost:8080/api/complint/list")
      .then((res) => res.json())
      .then((data) => setComplaints(data.data || []))
      .catch((err) => console.log(err));
  }, []);

  const counts = {
    all: complaints.length,
    open: complaints.filter((c) => c.status === "open").length,
    pending: complaints.filter((c) => c.status === "pending").length,
    closed: complaints.filter((c) => c.status === "closed").length,
    reject: complaints.filter((c) => c.status === "reject").length,
  };

  const handleStatClick = (key) => {
    setActiveCard(key);
    setStatusFilter(key);
  };

  const filtered = complaints.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      String(c.complaint_id).includes(q) ||
      (c.subject || "").toLowerCase().includes(q) ||
      (c.complaint_register_no || "").toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchForm = formFilter === "all" || c.application_type === formFilter;
    return matchSearch && matchStatus && matchForm;
  });

  return (
    <>
      <style>{styles}</style>
      <div className="admin-layout">
        <AdminSidebar sidebarOpen={sidebarOpen} />
        <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>
          <TopHeader toggleSidebar={toggleSidebar} />
          <div className="admin-dashboard-content complaints-wrapper">

            <h2 className="complaints-page-title">Admin Complaints</h2>

            {/* ── Clickable Stat Cards ── */}
            <div className="complaints-stats">
              {STAT_CARDS.map(({ key, label, dotCls, cardCls, activeCls }) => (
                <div
                  key={key}
                  className={`stat-card ${cardCls} ${activeCard === key ? activeCls : ""}`}
                  onClick={() => handleStatClick(key)}
                  title={`Show ${label}`}
                >
                  <span className="stat-label">
                    <span className={`stat-dot ${dotCls}`} />
                    {label}
                  </span>
                  <span className="stat-value">{counts[key]}</span>
                </div>
              ))}
            </div>

            {/* ── Toolbar ── */}
            <div className="complaints-toolbar">
              <div className="search-box">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="   Search ID, subject, register no..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setActiveCard(e.target.value);
                }}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="close">Closed</option>
                <option value="reject">Rejected</option>
              </select>

              <select
                className="filter-select"
                value={formFilter}
                onChange={(e) => setFormFilter(e.target.value)}
              >
                <option value="all">All Forms</option>
                <option value="FORM_M">FORM_M</option>
                <option value="FORM_N">FORM_N</option>
              </select>
            </div>

            <div className="results-count">
              Showing <strong>{filtered.length}</strong> of <strong>{complaints.length}</strong> complaints
            </div>
            {/* ── Table ── */}
            <div className="table-container">
              <table className="complaints-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Complaint ID</th>
                    <th>Subject</th>
                    <th>Form Type</th>
                    <th>Register No.</th>
                    <th>Date</th>
                    <th>Status</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="9">
                        <div className="empty-state">
                          <div className="empty-icon">📭</div>
                          No complaints found
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item, idx) => {
                      const s = STATUS_MAP[item.status] || { label: item.status, cls: "badge-pending" };
                      const isFormM = item.application_type === "FORM_M";
                      return (
                        <tr key={item.complaint_id}>
                          <td style={{ color: "#9ca3af", fontWeight: 600 }}>{idx + 1}</td>
                          <td>
                            <span className="complaint-id">{item.complaint_id}</span>
                          </td>
                          <td>
                            <span className="subject-text">{item.subject || "—"}</span>
                          </td>
                          <td>
                            <span className={`form-type-badge ${isFormM ? "form-type-m" : "form-type-n"}`}>
                              {item.application_type}
                            </span>
                          </td>
                          <td>
                            {item.complaint_register_no
                              ? <span className="reg-no-text">{item.complaint_register_no}</span>
                              : <span className="no-data">—</span>}
                          </td>
                          <td>
                            <span className="date-text">{item.created_at}</span>
                          </td>
                          <td>
                            <span className={`status-badge ${s.cls}`}>
                              <span className="badge-dot" />
                              {s.label}
                            </span>
                          </td>

                          <td>
                            <button
                              className="btn-view"
                              onClick={() => navigate(`/admin/complaint/${item.complaint_id}`)}
                            >
                              View →
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminComplaints;