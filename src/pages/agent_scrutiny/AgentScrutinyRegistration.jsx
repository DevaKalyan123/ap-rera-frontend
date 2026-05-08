import { useEffect, useState } from "react";
import { apiGet, BASE_URL } from "../../api/api";
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

const getSla = (row) => {
  const status = String(row.status || "").toUpperCase();
  const created = row.created_at ? new Date(row.created_at) : null;
  const days = created && !Number.isNaN(created.getTime()) ? Math.floor((Date.now() - created.getTime()) / 86400000) : 0;
  if (status === "APPROVED") return { key: "ready", label: "Ready For Approval" };
  if (status === "REJECTED") return { key: "forwarded", label: "Returned / Forwarded" };
  if (days > 10) return { key: "overdue", label: "Beyond SLA" };
  return { key: "within", label: "Within SLA" };
};

export default function AgentScrutinyRegistration() {
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
      const base = await apiGet(`/api/agent-scrutiny/registrations?dept=${dept}`);

      const list = Array.isArray(base) ? base : base.data || [];

      setRows(
        list.map((row) => ({
          ...row,
          applicationDate: fmtDate(row.created_at),
          sla: getSla(row),
        }))
      );
    } catch (error) {
      showBanner(error.message || "Unable to load agent scrutiny requests.", "err");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);
  
  useEffect(() => {
    setPage(1);
  }, [search, pageSize]);

  const filtered = rows.filter((row) =>
    [
      row.application_no,
      row.applicant_name,
      row.promoter_display,
      row.district,
      row.mobile,
      row.email,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  const exportCsv = () => {
    const lines = [
      [
        "Application No",
        "Agent Type",
        "Agent Name",
        "Mobile",
        "Email",
        "District",
        "Status",
        "Registration Date",
        "Scrutiny",
        "SLA",
      ],
      ...filtered.map((row) => [
        row.application_no,
        row.promoter_display,
        row.applicant_name,
        row.mobile,
        row.email,
        row.district,
        row.review_desk,
        row.applicationDate,
        row.scrutiny_label,
        row.sla.label,
      ]),
    ]
      .map((line) => line.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([lines], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scrutiny-agent-requests.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ScrutinyLayout>
      <div className="sr-page">
        <div className="sr-shell">
          <div className="sr-top">
            <div className="sr-breadcrumb">
              <span>You are here :</span>
              <span>DashBoard</span>
              <span>/</span>
              <span>Agent Registration</span>
              <span>/</span>
              <span>Scrutiny Engineer Requests</span>
            </div>
            <div className="sr-brand">
              <span>RERA-SE</span>
              <span className="sr-brand-icon">
                <i className="fa-solid fa-user" />
              </span>
            </div>
          </div>

          <div className="sr-body">
            {banner.text && (
              <div className={`sr-banner ${banner.type === "err" ? "sr-err" : "sr-ok"}`}>
                {banner.text}
              </div>
            )}

            <div className="sr-legend">
              <div className="sr-legend-item">
                <span className="sr-swatch sr-ready" />
                Ready For Approval
              </div>
              <div className="sr-legend-item">
                <span className="sr-swatch sr-overdue" />
                Beyond SLA
              </div>
              <div className="sr-legend-item">
                <span className="sr-swatch sr-within" />
                Within SLA
              </div>
              <div className="sr-legend-item">
                <span className="sr-swatch sr-forward" />
                From Verification Team to Director & Vice-versa
              </div>
            </div>

            <div className="sr-head">
              <div>
                <h1>View Agent Requests</h1>
                <p>Click on Application Number to view full details.</p>
              </div>
              <div className="sr-actions">
                <button className="sr-btn" onClick={exportCsv}>
                  <i className="fa-regular fa-file-excel" /> Export CSV
                </button>
                <button className="sr-btn" onClick={() => window.print()}>
                  <i className="fa-regular fa-file-pdf" /> Save PDF
                </button>
                <button className="sr-btn" onClick={refresh}>
                  <i className="fa-solid fa-rotate" /> Refresh
                </button>
              </div>
            </div>

            <div className="sr-tools">
              <div className="sr-tools-left">
                <span>Show</span>
                <select
                  className="sr-select"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {PAGE_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span>entries</span>
              </div>
              <div className="sr-tools-right">
                <span>Search:</span>
                <input
                  className="sr-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Application no, agent, district..."
                />
              </div>
            </div>

            <div className="sr-table-card">
              <div className="sr-table-wrap">
                {loading ? (
                  <div className="sr-loading">Loading agent requests...</div>
                ) : filtered.length === 0 ? (
                  <div className="sr-empty">No agent scrutiny requests found.</div>
                ) : (
                  <table className="sr-table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Application No.</th>
                        <th>Agent Type</th>
                        <th>Agent Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>District</th>
                        <th>Status</th>
                        <th>Registration Date</th>
                        <th>Scrutiny</th>
                        <th>SLA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map((row, index) => (
                        <tr
                          key={row.application_no}
                          onClick={() =>
                            navigate("/agent-scrutiny/registration_1", {
                              state: {
                                applicationNumber: row.application_no,
                                agentType: row.promoter_type,
                              },
                            })
                          }
                        >
                          <td>{start + index + 1}</td>
                          <td>
                            <button
                              className="sr-link"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/agent-scrutiny/registration_1", {
                                  state: {
                                    applicationNumber: row.application_no,
                                    agentType: row.promoter_type,
                                  },
                                });
                              }}
                            >
                              {row.application_no}
                            </button>
                          </td>
                          <td>{row.promoter_display}</td>
                          <td>{row.applicant_name}</td>
                          <td>{row.mobile}</td>
                          <td>{row.email}</td>
                          <td>{row.district}</td>
                          <td>
                            <span className="sr-chip">{row.review_desk}</span>
                          </td>
                          <td>{row.applicationDate}</td>
                          <td>
                            <span className="sr-chip">{row.scrutiny_label}</span>
                          </td>
                          <td>
                            <span className={`sr-sla ${row.sla.key}`}>
                              {row.sla.label}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="sr-foot">
                <div className="sr-foot-text">
                  Showing {filtered.length ? start + 1 : 0} to{" "}
                  {Math.min(start + pageSize, filtered.length)} of {filtered.length} entries
                </div>
                <div className="sr-pager">
                  <button
                    className="sr-page-btn"
                    disabled={safePage === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>
                  <span className="sr-foot-text">
                    Page {safePage} of {totalPages}
                  </span>
                  <button
                    className="sr-page-btn"
                    disabled={safePage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrutinyLayout>
  );
}
