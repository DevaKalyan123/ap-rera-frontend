import { useState } from "react";

import "../../styles/scrutiny/scrutinydashboard.css";

const ScrutinyDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="scrutiny-layout">

      {/* Sidebar */}
      <ScrutinySidebar sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <div className={`scrutiny-main ${sidebarOpen ? "" : "scrutiny-main-full"}`}>

        {/* Top Header (toggle here only) */}
        <TopHeader toggleSidebar={toggleSidebar} />

        {/* Dummy Content */}
        <div style={{ padding: "20px" }}>
          <h2>Scrutiny Dashboard</h2>
          <p>This page is under development...</p>
        </div>

      </div>

    </div>
  );
};

export default ScrutinyDashboard;