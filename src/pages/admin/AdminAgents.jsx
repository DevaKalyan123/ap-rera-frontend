import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";

const AdminAgents = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      
      <AdminSidebar sidebarOpen={sidebarOpen} />

      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>

        <TopHeader toggleSidebar={toggleSidebar} />

        <div className="admin-dashboard-content">
          <h2>Agents</h2>
          <p>Agents page content will appear here.</p>
        </div>

      </div>

    </div>
  );
};

export default AdminAgents;