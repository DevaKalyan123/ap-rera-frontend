import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

import "../../styles/scrutiny/scrutinydashboard.css";
import ScrutinySidebar from "../../components/scrutiny/ScrutinitySidebar";
import TopHeader from "../../components/scrutiny/TopHeader";

const ScrutinyDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { admin } = useAdmin(); // ✅ get admin
  const dept = admin?.department?.toLowerCase(); // ✅ get department
  const dashboardNames = {
  planning: "Planning Dashboard",
  legal: "Legal Dashboard",
  audit: "Audit Dashboard",
  engineer: "Engineer Dashboard",
  verification: "Verification Dashboard",
  ad: "Assistant Director Dashboard",
  dd: "Deputy Director Dashboard",
  it: "IT Dashboard",
};

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="scrutiny-layout">

      <ScrutinySidebar sidebarOpen={sidebarOpen} />

      <div className={`scrutiny-main ${sidebarOpen ? "" : "scrutiny-main-full"}`}>

        <TopHeader toggleSidebar={toggleSidebar} />

        <div style={{ padding: "20px" }}>
          <h2>
  {dashboardNames[dept] || "Scrutiny Dashboard"}
</h2>

          <p>This page is under development...</p>
        </div>

      </div>
    </div>
  );
};

export default ScrutinyDashboard;