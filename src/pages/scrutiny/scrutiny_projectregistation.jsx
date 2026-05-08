import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/api";
import "../../styles/scrutiny/scrutiny_projectregistation.css";
import { useNavigate } from "react-router-dom";
import ScrutinyLayout from "../../components/scrutiny/ScrutinyLayout";
import { useAdmin } from "../../context/AdminContext";

const PAGE_SIZES = [15, 25, 50];

const fmtDate = (value) => {
  if (!value) return "N/A";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleDateString("en-GB");
};

const fmtCurrency = (value) => {
  if (value === null || value === undefined || value === "" || value === "N/A") return "N/A";
  const num = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isNaN(num)
    ? String(value)
    : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(num);
};

const niceText = (value, fallback = "N/A") => {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value).replace(/_/g, " ").trim() || fallback;
};

const niceProjectType = (value) => {
  if (value === 1 || value === "1") return "Residential";
  if (value === 2 || value === "2") return "Commercial";
  if (value === 3 || value === "3") return "Mixed Development";
  return niceText(value);
};

const nicePromoterType = (value) => (String(value || "").toLowerCase() === "other" ? "Organization" : "Individual");

const getSla = (row) => {
  const status = String(row.status || "").toUpperCase();
  const created = row.created_at ? new Date(row.created_at) : null;
  const days = created && !Number.isNaN(created.getTime()) ? Math.floor((Date.now() - created.getTime()) / 86400000) : 0;
  if (status === "APPROVED") return { key: "ready", label: "Ready For Approval" };
  if (status === "REJECTED") return { key: "forwarded", label: "Returned / Forwarded" };
  if (days > 10) return { key: "overdue", label: "Beyond SLA" };
  return { key: "within", label: "Within SLA" };
};

const normalizeScrutinyRow = (record) => {
  const normalized = {
    ...record,
    promoterDisplay: record.promoterDisplay || record.promoter_display || nicePromoterType(record.promoter_type),
    projectName: record.projectName || record.project_name || "Pending project details",
    projectType: niceProjectType(record.projectType || record.project_type),
    projectStatus: record.projectStatus || record.project_status || "Under Scrutiny",
    projectCost: record.projectCost ?? record.project_cost ?? "",
    district: record.district || "N/A",
    applicantName: record.applicantName || record.applicant_name || "N/A",
    mobile: record.mobile || "N/A",
    email: record.email || "N/A",
    scrutinyLabel: record.scrutinyLabel || record.scrutiny_label || (String(record.promoter_type || "").toLowerCase() === "other" ? "S1" : "S2"),
    reviewDesk: record.reviewDesk || record.review_desk || "Technical Committee",
  };

  normalized.applicationDate = record.applicationDate || fmtDate(normalized.created_at);
  normalized.receivedDate = record.receivedDate || fmtDate(normalized.created_at);
  normalized.sla = getSla(normalized);

  return normalized;
};

export default function ScrutinyProjectRegistration() {
  const { admin } = useAdmin();
  const dept = admin?.department?.toLowerCase();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(1);
  const [banner, setBanner] = useState({ text: "", type: "ok" });

  const showBanner = (text, type = "ok") => setBanner({ text, type });

  const refresh = async () => {
    setLoading(true);
    try {
      const base = await fetch(
        `${BASE_URL}/api/scrutiny/project-registrations?dept=${dept}`
      ).then(res => res.json());

      const list = Array.isArray(base) ? base : base.data || [];

      setRows(list.map((row) => normalizeScrutinyRow(row)));

    } catch (error) {
      showBanner(error.message || "Unable to load scrutiny requests.", "err");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);
  useEffect(() => { setPage(1); }, [search, pageSize]);

  const filtered = rows.filter((row) =>
    [row.application_no, row.projectName, row.projectType, row.projectStatus, row.district, row.promoterDisplay, row.applicantName, row.email, row.mobile]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  const exportCsv = () => {
    // Your existing exportCsv function (kept as is)
    const lines = [["Application No", "Promoter Type", "Project Name", "Project Type", "Project Status", "Project Cost", "District", "Status", "Application Date", "Received Date", "Scrutiny", "SLA"],
    ...filtered.map((row) => [row.application_no, row.promoterDisplay, row.projectName, row.projectType, row.projectStatus, fmtCurrency(row.projectCost), row.district, row.reviewDesk, row.applicationDate, row.receivedDate, row.scrutinyLabel, row.sla.label])
    ]
      .map((line) => line.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([lines], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scrutiny-project-requests.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ScrutinyLayout>
      <div className="sr-page">
        <div className="sr-shell">
          <div className="sr-top">
            <div className="sr-breadcrumb">
              <span>You are here :</span><span>DashBoard</span><span>/</span><span>Project Registration</span><span>/</span><span>Scrutiny Engineer Requests</span>
            </div>
            <div className="sr-brand">
              <span>RERA-SE</span>
              <span className="sr-brand-icon"><i className="fa-solid fa-user" /></span>
            </div>
          </div>

          <div className="sr-body">
            {banner.text && (
              <div className={`sr-banner ${banner.type === "err" ? "sr-err" : "sr-ok"}`}>
                {banner.text}
              </div>
            )}

            <div className="sr-legend">
              <div className="sr-legend-item"><span className="sr-swatch sr-ready" />Ready For Approval</div>
              <div className="sr-legend-item"><span className="sr-swatch sr-overdue" />Beyond SLA</div>
              <div className="sr-legend-item"><span className="sr-swatch sr-within" />Within SLA</div>
              <div className="sr-legend-item"><span className="sr-swatch sr-forward" />From Verification Team to Director & Vice-versa</div>
            </div>

            <div className="sr-head">
              <div>
                <h1>View Project Requests</h1>
                <p>Click on Application Number to view full details.</p>
              </div>
              <div className="sr-actions">
                <button className="sr-btn" onClick={exportCsv}><i className="fa-regular fa-file-excel" /> Export CSV</button>
                <button className="sr-btn" onClick={() => window.print()}><i className="fa-regular fa-file-pdf" /> Save PDF</button>
                <button className="sr-btn" onClick={refresh}><i className="fa-solid fa-rotate" /> Refresh</button>
              </div>
            </div>

            <div className="sr-tools">
              <div className="sr-tools-left">
                <span>Show</span>
                <select className="sr-select" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                  {PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
                </select>
                <span>entries</span>
              </div>
              <div className="sr-tools-right">
                <span>Search:</span>
                <input
                  className="sr-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Application no, project, district..."
                />
              </div>
            </div>

            <div className="sr-table-card">
              <div className="sr-table-wrap">
                {loading ? (
                  <div className="sr-loading">Loading project requests...</div>
                ) : filtered.length === 0 ? (
                  <div className="sr-empty">No scrutiny requests found.</div>
                ) : (
                  <table className="sr-table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Application No.</th>
                        <th>Promoter Type</th>
                        <th>Project Name</th>
                        <th>Project Type</th>
                        <th>Project Status</th>
                        <th>Project Cost</th>
                        <th>District</th>
                        <th>Status</th>
                        <th>Application Date</th>
                        <th>Received Date</th>
                        <th>Scrutiny</th>
                        <th>SLA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map((row, index) => (
                        <tr key={row.id} onClick={() => navigate("/scrutiny/project-registration_1", {
                          state: { applicationNumber: row.application_no, promoterType: row.promoter_type }
                        })}>
                          <td>{start + index + 1}</td>
                          <td>
                            <button
                              className="sr-link"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/scrutiny/project-registration_1", {
                                  state: { applicationNumber: row.application_no, promoterType: row.promoter_type }
                                });
                              }}
                            >
                              {row.application_no}
                            </button>
                          </td>
                          <td>{row.promoterDisplay}</td>
                          <td>{row.projectName}</td>
                          <td>{row.projectType}</td>
                          <td>{row.projectStatus}</td>
                          <td>{fmtCurrency(row.projectCost)}</td>
                          <td>{row.district}</td>
                          <td><span className="sr-chip">{row.reviewDesk}</span></td>
                          <td>{row.applicationDate}</td>
                          <td>{row.receivedDate}</td>
                          <td><span className="sr-chip">{row.scrutinyLabel}</span></td>
                          <td><span className={`sr-sla ${row.sla.key}`}>{row.sla.label}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="sr-foot">
                <div className="sr-foot-text">
                  Showing {filtered.length ? start + 1 : 0} to {Math.min(start + pageSize, filtered.length)} of {filtered.length} entries
                </div>
                <div className="sr-pager">
                  <button className="sr-page-btn" disabled={safePage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
                  <span className="sr-foot-text">Page {safePage} of {totalPages}</span>
                  <button className="sr-page-btn" disabled={safePage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrutinyLayout>
  );
}