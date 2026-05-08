import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/scrutiny/unregisterList.css';
import { useAdmin } from "../../context/AdminContext";

const BASE_URL = "https://7zgjxth4-5056.inc1.devtunnels.ms/api";

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const ReraStatusBadge = ({ registered }) => {
  if (registered)
    return <span className="unregList-badge unregList-badge-registered"><span className="unregList-badge-dot" />RERA Registered</span>;
  return <span className="unregList-badge unregList-badge-unregistered"><span className="unregList-badge-dot" />Not Registered</span>;
};

function buildPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  pages.push(1);
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

const FILTER_OPTIONS = [
  { value: "all",      label: "select all" },
  { value: "owner",    label: "Owner Name" },
  { value: "mobile",   label: "Mobile No." },
  { value: "sno",      label: "S.No" },
  { value: "fileno",   label: "Application ID" },
  { value: "district", label: "District" },
  { value: "type",     label: "Project Type" },
  { value: "date",     label: "Date (Year / Month)" },
  { value: "status",   label: "RERA Status" },
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const SHORT_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - i);

// ── Upload Modal Component ────────────────────────────────────
function UploadModal({ onClose, onSuccess }) {
  const [projectType, setProjectType] = useState("");
  const [file, setFile]               = useState(null);
  const [uploading, setUploading]     = useState(false);
  const [result, setResult]           = useState(null);   // { inserted, skipped, sheet_used }
  const [error, setError]             = useState(null);
  const fileInputRef                  = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const handleSubmit = async () => {
    if (!projectType) { setError("Please select a project type."); return; }
    if (!file)        { setError("Please upload an Excel file.");   return; }

    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("project_type", projectType);
      formData.append("file", file);

      const res = await fetch(`${BASE_URL}/project-unregistered/upload-excel`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);

      setResult(json);
      onSuccess && onSuccess();
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setProjectType("");
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="unreg-modal-backdrop" onClick={handleBackdropClick}>
      <div className="unreg-modal" style={{ maxWidth: 480 }}>

        {/* HEAD */}
        <div className="unreg-modal-head">
          <div className="unreg-modal-head-left">
            <span className="unreg-modal-icon">📤</span>
            <div>
              <div className="unreg-modal-title">Add New Data</div>
              <div className="unreg-modal-sub">Upload Excel to import project records</div>
            </div>
          </div>
          <button className="unreg-modal-close" onClick={onClose} title="Close">✕</button>
        </div>

        {/* BODY */}
        <div className="unreg-modal-body">

          {result ? (
            /* ── SUCCESS STATE ── */
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontFamily: "var(--unreg-font-display)", fontSize: 17, fontWeight: 700, color: "var(--unreg-green)", marginBottom: 8 }}>
                Upload Successful!
              </div>
              <div className="unreg-modal-info-box unreg-modal-info-green" style={{ textAlign: "left", marginTop: 14 }}>
                <div>📋 <strong>Sheet used:</strong> {result.sheet_used}</div>
                <div style={{ marginTop: 6 }}>✅ <strong>Inserted:</strong> {result.inserted} records</div>
                <div style={{ marginTop: 4 }}>⏭️ <strong>Skipped:</strong> {result.skipped} rows</div>
              </div>
              <button
                className="unreg-modal-btn-ghost"
                style={{ marginTop: 18, width: "100%" }}
                onClick={handleReset}
              >
                Upload Another File
              </button>
            </div>
          ) : (
            <>
              {/* Project Type */}
              <div className="unreg-modal-field">
                <label className="unreg-modal-label">Project Type <span style={{ color: "var(--unreg-red)" }}>*</span></label>
                <div style={{ display: "flex", gap: 10 }}>
                  {["BUILDING", "LAYOUT"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setProjectType(type)}
                      style={{
                        flex: 1,
                        padding: "11px 0",
                        borderRadius: 7,
                        border: projectType === type
                          ? "2px solid var(--unreg-navy)"
                          : "1.5px solid var(--unreg-border)",
                        background: projectType === type
                          ? "var(--unreg-navy)"
                          : "var(--unreg-surface)",
                        color: projectType === type ? "#fff" : "var(--unreg-text-secondary)",
                        fontFamily: "var(--unreg-font-body)",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.18s ease",
                        letterSpacing: "0.5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 7,
                      }}
                    >
                      {type === "BUILDING" ? "🏢" : "🗺️"} {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className="unreg-modal-field">
                <label className="unreg-modal-label">Excel File (.xlsx / .xls) <span style={{ color: "var(--unreg-red)" }}>*</span></label>

                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: file ? "2px solid var(--unreg-green)" : "2px dashed var(--unreg-border-dark)",
                    borderRadius: 8,
                    padding: "22px 16px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: file ? "rgba(26,122,74,0.04)" : "var(--unreg-surface)",
                    transition: "all 0.18s ease",
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {file ? (
                    <>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>📊</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--unreg-green)", marginBottom: 3 }}>
                        {file.name}
                      </div>
                      <div style={{ fontSize: 11.5, color: "var(--unreg-text-muted)" }}>
                        {(file.size / 1024).toFixed(1)} KB — click to change
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.5 }}>📂</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--unreg-text-secondary)", marginBottom: 4 }}>
                        Click to browse or drag & drop
                      </div>
                      <div style={{ fontSize: 11.5, color: "var(--unreg-text-light)" }}>
                        Supports .xlsx and .xls files
                      </div>
                    </>
                  )}
                </div>
              </div>

              {error && (
                <div style={{
                  background: "#fef2f2",
                  border: "1px solid #fca5a5",
                  borderRadius: 6,
                  padding: "10px 14px",
                  fontSize: 12.5,
                  color: "#991b1b",
                  fontWeight: 600,
                }}>
                  ⚠️ {error}
                </div>
              )}
            </>
          )}
        </div>

        {/* FOOTER */}
        {!result && (
          <div className="unreg-modal-footer">
            <button className="unreg-modal-btn-ghost" onClick={onClose} disabled={uploading}>
              Cancel
            </button>
            {file && (
              <button className="unreg-modal-btn-ghost" onClick={handleReset} disabled={uploading}>
                Clear
              </button>
            )}
            <button
              className="unreg-modal-btn-primary"
              onClick={handleSubmit}
              disabled={uploading || !projectType || !file}
            >
              {uploading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    width: 14, height: 14,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid #fff",
                    borderRadius: "50%",
                    animation: "unregList-spin 0.7s linear infinite",
                    display: "inline-block",
                  }} />
                  Uploading...
                </span>
              ) : "📤 Upload & Import"}
            </button>
          </div>
        )}

        {result && (
          <div className="unreg-modal-footer">
            <button className="unreg-modal-btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────────────
export default function UnregisterList() {
  const navigate = useNavigate();

  const [records, setRecords]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [page, setPage]                 = useState(1);
  const [perPage]                       = useState(10);
  const [totalPages, setTotalPages]     = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // ── Upload modal state ──
  const [showUploadModal, setShowUploadModal] = useState(false);

  // ── Smart filter state ──
  const [filterBy, setFilterBy]         = useState("owner");
  const [filterValue, setFilterValue]   = useState("");
  const [filterYear, setFilterYear]     = useState("");
  const [filterMonth, setFilterMonth]   = useState("");
  const [filterType, setFilterType]     = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSno, setFilterSno]       = useState("");
  const { admin } = useAdmin();

  useEffect(() => {
    if (admin) {
      console.log("🔑 Role:", admin?.role);
      console.log("👤 User:", admin);
    }
  }, [admin]);

  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(filterValue), 350);
    return () => clearTimeout(t);
  }, [filterValue]);

  const handleFilterByChange = (val) => {
    setFilterBy(val);
    setFilterValue("");
    setFilterYear("");
    setFilterMonth("");
    setFilterType("");
    setFilterStatus("");
    setFilterSno("");
    setPage(1);
  };

  const handleReset = () => {
    setFilterBy("owner");
    setFilterValue("");
    setFilterYear("");
    setFilterMonth("");
    setFilterType("");
    setFilterStatus("");
    setFilterSno("");
    setPage(1);
  };

  // ── Fetch ──
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page,
        per_page: perPage,
        sort_by: "id",
        order: "desc",
      });

      if (filterBy === "owner"    && debounced)  params.append("search", debounced);
      if (filterBy === "district" && debounced)  params.append("district", debounced);
      if (filterBy === "type"     && filterType) params.append("project_type", filterType);
      if (filterBy === "fileno"   && debounced)  params.append("search", debounced);

      const res = await fetch(`${BASE_URL}/project-unregistered?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      let data = json.data || [];

      if (filterBy === "sno" && filterSno) {
        data = data.filter((r) => String(r.s_no ?? r.id) === filterSno.trim());
      }

      if (filterBy === "date") {
        if (filterYear) {
          data = data.filter((r) => {
            const d = r.approved_date || r.proceeding_order_date;
            return d && new Date(d).getFullYear() === parseInt(filterYear);
          });
        }
        if (filterMonth) {
          data = data.filter((r) => {
            const d = r.approved_date || r.proceeding_order_date;
            return d && new Date(d).getMonth() + 1 === parseInt(filterMonth);
          });
        }
      }

      if (filterBy === "status" && filterStatus) {
        const sv = filterStatus.toLowerCase();
        data = data.filter((r) =>
          sv === "registered" ? r.rera_registered === true : r.rera_registered === false
        );
      }

      setRecords(data);
      setTotalPages(json.total_pages || 1);
      setTotalRecords(json.total_records || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, debounced, filterBy, filterType, filterYear, filterMonth, filterStatus, filterSno]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => { setPage(1); }, [debounced, filterBy, filterType, filterYear, filterMonth, filterStatus, filterSno]);

  const pages = buildPages(page, totalPages);

  const unregisteredCount = records.filter((r) => !r.rera_registered).length;
  const layoutCount       = records.filter((r) => r.project_type === "LAYOUT").length;
  const buildingCount     = records.filter((r) => r.project_type === "BUILDING").length;

  const activeTag = (() => {
    if (filterBy === "date" && (filterYear || filterMonth)) {
      const m = filterMonth ? SHORT_MONTHS[parseInt(filterMonth) - 1] : null;
      return [m, filterYear].filter(Boolean).join(" ");
    }
    if (filterBy === "type"   && filterType)   return filterType;
    if (filterBy === "status" && filterStatus) return filterStatus;
    if (filterBy === "sno"    && filterSno)    return `S.No: ${filterSno}`;
    if (debounced) return debounced;
    return null;
  })();

  return (
    <div className="unregList-page">

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            // Refresh data after successful upload
            setTimeout(() => fetchData(), 500);
          }}
        />
      )}

          <div className="unregList-header-title">Unregistered Projects</div>

      <div className="unregList-main">

        <div className="unregList-stats">
          <div className="unregList-stat-card" style={{ "--stat-color": "#e07b00", "--stat-bg": "rgba(224,123,0,0.08)" }}>
            <div className="unregList-stat-icon">📋</div>
            <div>
              <div className="unregList-stat-value">{totalRecords}</div>
              <div className="unregList-stat-label">Total Applications</div>
            </div>
          </div>
          <div className="unregList-stat-card" style={{ "--stat-color": "#c0392b", "--stat-bg": "rgba(192,57,43,0.07)" }}>
            <div className="unregList-stat-icon">⚠️</div>
            <div>
              <div className="unregList-stat-value">{unregisteredCount}</div>
              <div className="unregList-stat-label">Not Registered (page)</div>
            </div>
          </div>
          <div className="unregList-stat-card" style={{ "--stat-color": "#1a7a4a", "--stat-bg": "rgba(26,122,74,0.07)" }}>
            <div className="unregList-stat-icon">🗺️</div>
            <div>
              <div className="unregList-stat-value">{layoutCount}</div>
              <div className="unregList-stat-label">Layout Projects (page)</div>
            </div>
          </div>
          <div className="unregList-stat-card" style={{ "--stat-color": "#1a3a5c", "--stat-bg": "rgba(26,58,92,0.07)" }}>
            <div className="unregList-stat-icon">🏢</div>
            <div>
              <div className="unregList-stat-value">{buildingCount}</div>
              <div className="unregList-stat-label">Building Projects (page)</div>
            </div>
          </div>
        </div>

        {/* ── FILTERS ── */}
        <div className="unregList-filters">
          <div className="unregList-filters-title">
            🔍 Filter &amp; Search
            {activeTag && (
              <span className="unregList-active-tag">
                {activeTag}
                <button className="unregList-tag-close" onClick={handleReset}>✕</button>
              </span>
            )}
            {/* ── ADD NEW DATA BUTTON (right side of filter title row) ── */}
            <button
              onClick={() => setShowUploadModal(true)}
              style={{
                marginLeft: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "var(--unreg-saffron)",
                border: "none",
                color: "#fff",
                fontFamily: "var(--unreg-font-body)",
                fontSize: 13,
                fontWeight: 700,
                padding: "7px 18px",
                borderRadius: 6,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(224,123,0,0.3)",
                transition: "all 0.18s ease",
                letterSpacing: "0.3px",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#c96e00";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(224,123,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--unreg-saffron)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(224,123,0,0.3)";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Add New Data
            </button>
          </div>

          <div className="unregList-filter-layout">

            {/* Dropdown */}
            <div className="unregList-filter-dropdown">
              <select
                value={filterBy}
                onChange={(e) => handleFilterByChange(e.target.value)}
                className="unregList-select"
              >
                {FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="unregList-filter-inputs">

              {["owner", "mobile", "fileno", "district"].includes(filterBy) && (
                <div className="unregList-filter-input-wrapper">
                  <span className="unregList-input-icon">
                    {filterBy === "owner"    && "👤"}
                    {filterBy === "mobile"   && "📞"}
                    {filterBy === "fileno"   && "🗂️"}
                    {filterBy === "district" && "📍"}
                  </span>
                  <input
                    type={filterBy === "mobile" ? "tel" : "text"}
                    className="unregList-filter-input"
                    placeholder={
                      filterBy === "owner"    ? "Enter owner name..."    :
                      filterBy === "mobile"   ? "Enter mobile number..."  :
                      filterBy === "fileno"   ? "Enter application ID..."  :
                      "Enter district name..."
                    }
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                  {filterValue && (
                    <button className="unregList-input-clear" onClick={() => setFilterValue("")}>✕</button>
                  )}
                </div>
              )}

              {filterBy === "sno" && (
                <div className="unregList-filter-input-wrapper">
                  <span className="unregList-input-icon">#</span>
                  <input
                    type="number"
                    className="unregList-filter-input"
                    placeholder="Enter S.No"
                    value={filterSno}
                    onChange={(e) => setFilterSno(e.target.value)}
                  />
                  {filterSno && (
                    <button className="unregList-input-clear" onClick={() => setFilterSno("")}>✕</button>
                  )}
                </div>
              )}

              {filterBy === "type" && (
                <div className="unregList-filter-chips">
                  <button
                    className={`unregList-chip ${filterType === "LAYOUT" ? "active" : ""}`}
                    onClick={() => setFilterType(filterType === "LAYOUT" ? "" : "LAYOUT")}
                  >
                    Layout
                  </button>
                  <button
                    className={`unregList-chip ${filterType === "BUILDING" ? "active" : ""}`}
                    onClick={() => setFilterType(filterType === "BUILDING" ? "" : "BUILDING")}
                  >
                    Building
                  </button>
                </div>
              )}

              {filterBy === "status" && (
                <div className="unregList-filter-chips">
                  <button
                    className={`unregList-chip chip-green ${filterStatus === "registered" ? "active" : ""}`}
                    onClick={() => setFilterStatus(filterStatus === "registered" ? "" : "registered")}
                  >
                    RERA Registered
                  </button>
                  <button
                    className={`unregList-chip chip-red ${filterStatus === "unregistered" ? "active" : ""}`}
                    onClick={() => setFilterStatus(filterStatus === "unregistered" ? "" : "unregistered")}
                  >
                    Not Registered
                  </button>
                </div>
              )}

              {filterBy === "date" && (
                <div className="unregList-date-filters">
                  <div className="unregList-year-select">
                    <label>Year</label>
                    <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                      <option value="">All</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  {filterYear && (
                    <div className="unregList-month-select">
                      <label>Month</label>
                      <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                        <option value="">All</option>
                        {MONTHS.map((m, i) => (
                          <option key={i} value={i + 1}>{m}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              <button className="unregList-btn-reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className="unregList-table-wrapper">
          <div className="unregList-table-header">
            <div className="unregList-table-title">Application Records</div>
          </div>

          {loading ? (
            <div className="unregList-loading">
              <div className="unregList-spinner" />
              <span>Loading records...</span>
            </div>
          ) : error ? (
            <div className="unregList-empty">
              <div className="unregList-empty-icon">⚠️</div>
              <div className="unregList-empty-text">Failed to load: {error}</div>
            </div>
          ) : records.length === 0 ? (
            <div className="unregList-empty">
              <div className="unregList-empty-icon">📭</div>
              <div className="unregList-empty-text">No records found for the selected filters.</div>
            </div>
          ) : (
            <div className="unregList-table-scroll">
              <table className="unregList-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Owner Name</th>
                    <th>Application ID</th>
                    <th>Approved Date</th>
                    <th>RERA Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id}>
                      <td className="unregList-sno">#{r.s_no ?? r.id}</td>
                      <td className="unregList-owner">
                        <span className="unregList-owner-name" title={r.owner_name}>
                          {r.owner_name || "—"}
                        </span>
                        {r.owner_mobile_no && (
                          <div className="unregList-owner-mobile">📞 {r.owner_mobile_no}</div>
                        )}
                      </td>
                      <td>
                        <span className="unregList-project-id">{r.fileno || r.lp_no || "—"}</span>
                      </td>
                      <td className="unregList-date">{fmtDate(r.approved_date)}</td>
                      <td>
                        <ReraStatusBadge registered={r.rera_registered} />
                      </td>
                      <td>
                        <button
                          className="unregList-btn-view"
                          onClick={() =>
                            navigate(`/scrutiny/project-unregistered/${r.id}`, {
                              state: { user: admin, record: r }
                            })
                          }
                        >
                          View
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── PAGINATION ── */}
          {!loading && records.length > 0 && (
            <div className="unregList-pagination">
              <div className="unregList-page-info">
                <button className="unregList-page-btn"> -Back </button>
              </div>
              <div className="unregList-page-controls">
                <button className="unregList-page-btn" onClick={() => setPage(1)} disabled={page === 1} title="First">«</button>
                <button className="unregList-page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                {pages.map((p, i) =>
                  p === "…" ? (
                    <span key={`e${i}`} className="unregList-page-ellipsis">…</span>
                  ) : (
                    <button key={p} className={`unregList-page-btn ${p === page ? "active" : ""}`} onClick={() => setPage(p)}>{p}</button>
                  )
                )}
                <button className="unregList-page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
                <button className="unregList-page-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages} title="Last">»</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}