import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../../api/api";
import "../../styles/admin/AdminProjects.css";

const AdminProjects = () => {

  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ States (ALL INSIDE COMPONENT)
  const [projects, setProjects] = useState([]);
  const [counts, setCounts] = useState({ total: 0, individual: 0, other: 0 });
  const [selectedType, setSelectedType] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;
  const [comment, setComment] = useState("");

  const [showPopup, setShowPopup] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

const fetchProjects = async () => {
  try {
    const data = await apiGet("/api/admin/projects");

    console.log("DATA:", data);
    setProjects(data);

    const total = data.length;
    const individual = data.filter(p => p.promoter_type === "individual").length;
    const other = data.filter(p => p.promoter_type === "other").length;

    setCounts({ total, individual, other });

  } catch (err) {
    console.error(err);
  }
};


  // ✅ Filter
  const filteredProjects = projects
    .filter(p => {
  if (selectedType === "ALL") return true;
  return p.promoter_type?.toLowerCase() === selectedType.toLowerCase();
})
    .filter(p => p.application_no.toLowerCase().includes(search.toLowerCase()));

const updateStatus = async (id, status) => {
  const url =
    status === "APPROVED"
      ? `/api/admin/projects/${id}/approve`
      : `/api/admin/projects/${id}/reject`;

  try {
    await apiPut(url, {
      comment:
        status === "REJECTED"
          ? "Rejected by admin"
          : "Approved by admin",
    });

    alert(`Project ${status}`);
    fetchProjects(); // refresh
  } catch (err) {
    console.error(err);
    alert("Failed to update project");
  }
};
useEffect(() => {
  fetchProjects();

  const interval = setInterval(() => {
    fetchProjects();   // ✅ auto refresh every 5 sec
  }, 5000);

  return () => clearInterval(interval);
}, []);
// const fetchProjectDetails = (id) => {
//   fetch(`http://localhost:8080/api/admin/projects/${id}`)
//     .then(res => res.json())
//     .then(data => setSelectedProject(data))
//     .catch(err => console.error(err));
// };

  // ✅ Pagination
  const paginatedProjects = filteredProjects.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ✅ Card click
  const filterProjects = (type) => {
  setSelectedType(type);
  setPage(1);
};

  return (
    <div className="admin-layout">

      <AdminSidebar sidebarOpen={sidebarOpen} />

      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>
        <TopHeader toggleSidebar={toggleSidebar} />
  <div className="ap-marquee">
    <div className="ap-marquee-track">

      <span className="badge">NEW</span>
      Approved Projects: {projects.filter(p => (p.status || "PENDING").toUpperCase() === "APPROVED").length}

      <span className="badge">NEW</span>
      Rejected Projects: {projects.filter(p => (p.status || "PENDING").toUpperCase() === "REJECTED").length}

      <span className="badge">NEW</span>
      Pending Projects: {projects.filter(p => !p.status || (p.status || "PENDING").toUpperCase() === "PENDING").length}

    </div>
  </div>

{showPopup && (
  <div className="ap-modal-overlay" onClick={() => setShowPopup(false)}>

    <div className="ap-modal" onClick={(e) => e.stopPropagation()}>

      {/* Header */}
      <div className="modal-header">
        <h3>Project Summary</h3>
        <span className="modal-close" onClick={() => setShowPopup(false)}>×</span>
      </div>

      {/* Body */}
      <div className="modal-body">
        <p className="modal-text">Here is the current status of project applications.</p>

        <div className="modal-stats">
          <p>Approved Projects: {projects.filter(p => (p.status || "PENDING").toUpperCase() === "APPROVED").length}</p>
          <p>Rejected Projects: {projects.filter(p => (p.status || "PENDING").toUpperCase() === "REJECTED").length}</p>
          <p>Pending Projects: {projects.filter(p => !p.status || (p.status || "PENDING").toUpperCase() === "PENDING").length}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="modal-footer">
        <button className="btn-cancel" onClick={() => setShowPopup(false)}>Close</button>
      </div>

    </div>
  </div>
)}
        <div className="admin-dashboard-content">
          
          <h2>Projects</h2>
          <p className="page-subtitle">
  Review and manage project applications
</p>

          {/* ✅ CARDS */}
  <div className="ap-stat-cards">

  <div
    className={`ap-stat-card blue ${selectedType === "ALL" ? "active" : ""}`}
    onClick={() => filterProjects("ALL")}
  >
    <h3>{counts.total}</h3>
    <p>Total Projects</p>
  </div>

  <div
    className={`ap-stat-card green ${selectedType === "individual" ? "active" : ""}`}
    onClick={() => filterProjects("individual")}
  >
    <h3>{counts.individual}</h3>
    <p>Individual</p>
  </div>

  <div
    className={`ap-stat-card red ${selectedType === "other" ? "active" : ""}`}
    onClick={() => filterProjects("other")}
  >
    <h3>{counts.other}</h3>
    <p>Other</p>
  </div>

</div>



{/* ✅ TABS */}
<div className="ap-tabs">

  <div
    className={`ap-tab ${selectedType === "ALL" ? "active" : ""}`}
    onClick={() => filterProjects("ALL")}
  >
    Tota Projects <span className="ap-badge">{counts.total}</span>
  </div>

  <div
    className={`ap-tab ${selectedType === "individual" ? "active" : ""}`}
    onClick={() => filterProjects("individual")}
  >
    Individual Projects <span className="ap-badge">{counts.individual}</span>
  </div>

  <div
    className={`ap-tab ${selectedType === "other" ? "active" : ""}`}
    onClick={() => filterProjects("other")}
  >
    Other Projects <span className="ap-badge">{counts.other}</span>
  </div>

</div>

{/* ✅ SEARCH + REFRESH */}
<div className="ap-toolbar">
  <input
    type="text"
    className="ap-search"
    placeholder="Search by PAN, application no, promoter type..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <button className="ap-refresh" onClick={() => window.location.reload()}>
    ⟳ Refresh
  </button>
</div>

          {/* ✅ TABLE */}
          {selectedType && (
            <>
<table className="ap-table">
  <thead className="theadtable">
    <tr>
      <th>ID</th>
      <th>Application No</th>
      <th>Promoter Type</th>
      <th>PAN</th>
      <th>Bank</th>
      <th>Action</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {paginatedProjects.map((p) => (
      <tr key={p.id}>
        <td>{p.id}</td>
        <td>{p.application_no}</td>
        <td>{p.promoter_type}</td>
        <td>{p.pan_number}</td>
        <td>{p.bank_name}</td>

        <td>
         <button 
  className="ap-btn ap-view-btn" 
  onClick={() => navigate(`/admin/project/${p.id}`)}
>
  View
</button>

          <button className="ap-btn ap-approve-btn" onClick={() => updateStatus(p.id, "APPROVED")}>
            Approve
          </button>

          <button className="ap-btn ap-reject-btn" onClick={() => updateStatus(p.id, "REJECTED")}>
            Reject
          </button>
        </td>

        <td className={`ap-status ${
  (p.status || "PENDING").toUpperCase() === "APPROVED"
    ? "ap-approved"
    : (p.status || "PENDING").toUpperCase() === "REJECTED"
    ? "ap-rejected"
    : "ap-pending"
    }`}>
  {(p.status || "PENDING").toUpperCase()}
</td>
      </tr>
    ))}
  </tbody>
</table>

             <>
             {/* {selectedProject && (
  <div className="ap-details-card">
  <div className="ap-details-card">

    <div className="ap-details-header">
      Project Details
    </div>

    <div className="ap-details-body">

      <div className="ap-details-grid">

        <div><b>Application No:</b> {selectedProject.application_no}</div>
        <div><b>Project Name:</b> {selectedProject.project_name}</div>
        <div><b>Promoter Type:</b> {selectedProject.promoter_type}</div>
        <div><b>PAN:</b> {selectedProject.pan_number}</div>

        <div><b>Email:</b> {selectedProject.email}</div>
        <div><b>Mobile:</b> {selectedProject.mobile}</div>
        <div><b>Project Type:</b> {selectedProject.project_type}</div>
        <div><b>District:</b> {selectedProject.project_district}</div>

        <div className="full-width">
          <b>Address:</b> {selectedProject.project_address}
        </div>

        <div>
          <b>Status:</b>
          <span className={`ap-status ${selectedProject.status === "APPROVED" ? "ap-approved" : selectedProject.status === "REJECTED" ? "ap-rejected" : "ap-pending"}`}>
            {selectedProject.status || "PENDING"}
          </span>
        </div>

      </div>

      <h4>Admin Action</h4>

      <textarea
        className="ap-textarea"
        placeholder="Enter rejection reason"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="ap-action-buttons">
        <button
          className="ap-btn ap-approve-btn"
          onClick={() => approve(selectedProject.id)}
        >
          Approve
        </button>

        <button
          className="ap-btn ap-reject-btn"
          onClick={() => reject(selectedProject.id)}
        >
          Reject
        </button>
      </div>

    </div>
  </div>
   </div>
)} */}
</>
              {/* ✅ PAGINATION */}
              <div style={{ marginTop: "10px" }}>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Prev
                </button>

                <span style={{ margin: "0 10px" }}>Page {page}</span>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page * itemsPerPage >= filteredProjects.length}
                >
                  Next
                </button>
              </div>
            </>
          )}

        </div>
        
      </div>
      
    </div>
    
  );

};
// ✅ Styles
const cardStyle = {
  flex: 1,
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
};

const theadStyle = {
  background: "#1e3a5f",
  color: "white"
};



export default AdminProjects;