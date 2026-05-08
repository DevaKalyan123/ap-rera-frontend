import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/admin/AdminProjectDetails.css";

const AdminProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [showRejectModal, setShowRejectModal] = useState(false);
const [rejectReason, setRejectReason] = useState("");
  const [project, setProject] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
const [approveRemark, setApproveRemark] = useState("");

  // ✅ ADD THIS (missing in your code)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/projects/${id}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!project) {
    return <p className="admin-project-details__loading">Loading...</p>;
  }

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>
        
        {/* Header */}
        <TopHeader toggleSidebar={toggleSidebar} />

        <div className="admin-project-details">

          {/* Top Bar */}
          <div className="admin-project-details__top-bar">
            <button
              className="admin-project-details__back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back to List
            </button>

            <span className="admin-project-details__status-badge">
              SUBMITTED
            </span>
          </div>

          <h2 className="admin-project-details__title">Project Detail</h2>

          {/* Card */}
          <div className="admin-project-details__card">
            <div className="admin-project-details__card-header">
              Project Information
            </div>

            <div className="admin-project-details__grid">
              <div>
                <label>Application No</label>
                <p>{project.application_no}</p>
              </div>

              <div>
                <label>Project Name</label>
                <p>{project.project_name}</p>
              </div>

              <div>
                <label>PAN</label>
                <p>{project.pan_number}</p>
              </div>

              <div>
                <label>Promoter Type</label>
                <p>{project.promoter_type}</p>
              </div>

              <div>
                <label>Email</label>
                <p>{project.email}</p>
              </div>

              <div>
                <label>Mobile</label>
                <p>{project.mobile}</p>
              </div>

              <div>
                <label>District</label>
                <p>{project.project_district}</p>
              </div>

              <div>
                <label>Address</label>
                <p>{project.project_address}</p>
              </div>

              <div>
                <label>Status</label>
                <span className="admin-project-details__status success">
                  {project.status || "PENDING"}
                </span>
              </div>
            </div>
          </div>

          {/* Requested Changes */}
          <div className="admin-project-details__card">
            {/* <div className="admin-project-details__card-header">
              Requested Changes
              <span className="admin-project-details__changes-count">
                0 changes
              </span>
            </div> */}
{/* 
            <p className="admin-project-details__empty-text">
              No changes available
            </p> */}
          </div>

          {/* Admin Action */}
          <div className="admin-project-details__card">
            <div className="admin-project-details__card-header">
              Admin Action
            </div>

            <div className="admin-project-details__warning-box">
              Review all details carefully before taking action.
            </div>

            <div className="admin-project-details__btn-group">
             <button
  className="admin-project-details__approve-btn"
  onClick={() => setShowApproveModal(true)}
>
  ✓ Approve
</button>

            <button
  className="admin-project-details__reject-btn"
  onClick={() => setShowRejectModal(true)}
>
  ✕ Reject
</button>
            </div>
          </div>
          {showRejectModal && (
  <div className="admin-project-details__modal-overlay">
    
    <div className="admin-project-details__modal">

      {/* Header */}
      <div className="admin-project-details__modal-header">
        <span>⚠ Reject Change Request</span>
        <button
          className="admin-project-details__close-btn"
          onClick={() => setShowRejectModal(false)}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="admin-project-details__modal-body">
        <p>
          Please provide a reason for rejecting this change request.
          This will be visible to the applicant.
        </p>

        <label>Rejection Reason *</label>

        <textarea
          placeholder="Enter detailed reason for rejection..."
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </div>

      {/* Footer */}
      <div className="admin-project-details__modal-footer">
        <button
          className="admin-project-details__cancel-btn"
          onClick={() => setShowRejectModal(false)}
        >
          Cancel
        </button>

        <button
          className="admin-project-details__confirm-reject-btn"
          onClick={async () => {
  if (!rejectReason.trim()) {
    alert("Please enter rejection reason");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/admin/projects/${id}/reject`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: rejectReason
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Project Rejected & Email Sent ❌");
      setShowRejectModal(false);
      setRejectReason("");
      window.location.reload();
    } else {
      alert("Rejection failed");
      console.error(data);
    }
  } catch (error) {
    console.error(error);
  }
}}
        >
          Confirm Reject
        </button>
      </div>

    </div>
  </div>
)}
{showApproveModal && (
  <div className="admin-project-details__modal-overlay">

    <div className="admin-project-details__modal">

      {/* Header */}
      <div className="admin-project-details__modal-header approve">
        <span>✔ Approve Request</span>
        <button
          className="admin-project-details__close-btn"
          onClick={() => setShowApproveModal(false)}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="admin-project-details__modal-body">
        <p>
          Please confirm approval of this request.
          You may optionally add remarks.
        </p>

        <label>Approval Remarks (Optional)</label>

        <textarea
          placeholder="Enter remarks (optional)..."
          value={approveRemark}
          onChange={(e) => setApproveRemark(e.target.value)}
        />
      </div>

      {/* Footer */}
      <div className="admin-project-details__modal-footer">
        <button
          className="admin-project-details__cancel-btn"
          onClick={() => setShowApproveModal(false)}
        >
          Cancel
        </button>

        <button
          className="admin-project-details__confirm-approve-btn"
          onClick={async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/admin/projects/${id}/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        remark: approveRemark
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Project Approved & Email Sent ✅");
      setShowApproveModal(false);
      setApproveRemark("");
      window.location.reload(); // refresh data
    } else {
      alert("Approval failed ❌");
      console.error(data);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error");
  }
}}
        >
          Confirm Approve
        </button>
      </div>

    </div>
  </div>
)}
        </div>
      </div>
    </div>
    
  );
};

export default AdminProjectDetails;