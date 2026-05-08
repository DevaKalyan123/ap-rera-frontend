import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../../api/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";

const AdminComplaints = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await apiGet("/api/agent-renewal/admin/renewal-dashboard")
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar sidebarOpen={sidebarOpen} />

      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>

        <TopHeader toggleSidebar={toggleSidebar} />

        <div className="admin-dashboard-content">

          <h2>Renewal</h2>
          <p>Agents Renewal requests here</p>

          <div className="admin-dashboard-cards">

            <div className="admin-card"
                 onClick={() => navigate("/admin/renewals/all")}>
              <h3>{stats.total || 0}</h3>
              <p>Total Renewals</p>
            </div>

            <div className="admin-card"
                 onClick={() => navigate("/admin/renewals/draft")}>
              <h3>{stats.draft || 0}</h3>
              <p>Draft Renewals</p>
            </div>

            <div className="admin-card"
                 onClick={() => navigate("/admin/renewals/approved")}>
              <h3>{stats.approved || 0}</h3>
              <p>Approved</p>
            </div>

            <div className="admin-card"
                 onClick={() => navigate("/admin/renewals/rejected")}>
              <h3>{stats.rejected || 0}</h3>
              <p>Rejected</p>
            </div>

            <div className="admin-card"
                 onClick={() => navigate("/admin/renewals/expired")}>
              <h3>{stats.expired || 0}</h3>
              <p>Expired</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminComplaints;