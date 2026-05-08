import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";
import "../../styles/admin/adminDashboard.css";
import { FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ FIXED FUNCTION
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">

      <AdminSidebar sidebarOpen={sidebarOpen} />

      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>

        <TopHeader toggleSidebar={toggleSidebar} />

        <div className="admin-dashboard-content">

          {/* ✅ ADDED TITLE */}
          <h2 className="dashboard-title">Dashboard Overview</h2>

          <div className="admin-dashboard-cards">

  <div className="admin-card modern premium-card">
    <div className="card-header">
      <p>Total Requests</p>
      <FaFileAlt />
    </div>
    <h2>120</h2>
  </div>

  <div className="admin-card modern">
    <div className="card-header">
      <p>Pending Requests</p>
      <FaClock />
    </div>
    <h2>40</h2>
  </div>

  <div className="admin-card modern">
    <div className="card-header">
      <p>Approved</p>
      <FaCheckCircle />
    </div>
    <h2>60</h2>
  </div>

  <div className="admin-card modern">
    <div className="card-header">
      <p>Rejected</p>
      <FaTimesCircle />
    </div>
    <h2>20</h2>
  </div>

</div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;