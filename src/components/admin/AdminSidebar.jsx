import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../../api/api";
// import "../../styles/admin/adminsidebar.css"
import { FaHome, FaProjectDiagram, FaUserTie, FaUsers, FaExclamationCircle, FaRedo } from "react-icons/fa";

const AdminSidebar = ({ sidebarOpen }) => {

  const navigate = useNavigate();
  const [pendingAgentRequests, setPendingAgentRequests] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadPendingAgentRequests = async () => {
      try {
        const response = await apiGet("/api/admin/change-requests/full");
        const requests = response?.requests || [];
        const pendingCount = requests.filter((request) => {
          const normalizedStatus = (request?.status || "").toLowerCase();
          return !["approved", "completed", "rejected"].includes(normalizedStatus);
        }).length;

        if (isMounted) {
          setPendingAgentRequests(pendingCount);
        }
      } catch (error) {
        if (isMounted) {
          setPendingAgentRequests(0);
        }
      }
    };

    loadPendingAgentRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : "admin-sidebar-closed"}`}>

      <h2 className="admin-sidebar-title">ADMIN DASHBOARD</h2>

      <button onClick={() => navigate("/admin-dashboard")}>
  <FaHome /> Dashboard
</button>

      <button onClick={() => navigate("/admin/change-requests")}>
        Project Change Request
      </button>

      <button
        onClick={() => navigate("/admin/agent-change-request")}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}
      >
        Agent Change Request
        {pendingAgentRequests > 0 && (
          <span
            style={{
              minWidth: "22px",
              height: "22px",
              borderRadius: "999px",
              background: "#d93025",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "700",
              padding: "0 6px"
            }}
          >
            {pendingAgentRequests}
          </span>
        )}
      </button>

      <button onClick={() => navigate("/admin/projects")}>
        Projects
      </button>

      <button onClick={() => navigate("/admin/agents")}>
        Agents
      </button>

      <button onClick={() => navigate("/admin/complaints")}>
        Complaints
      </button>

    
      <button onClick={() => navigate("/admin/renewal")}>
        Renewal
      </button>

      {/* <button onClick={() => navigate("/")}>
        Logout
      </button> */}

    </div>
  );
};

export default AdminSidebar;