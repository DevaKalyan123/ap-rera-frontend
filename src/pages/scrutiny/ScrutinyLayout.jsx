import { useState } from "react";
import { Outlet } from "react-router-dom";
import ScrutinySidebar from "../../components/scrutinity/ScrutinitySidebar";
import TopHeader from "../../components/scrutinity/TopHeader";

const ScrutinyLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="scrutiny-layout">

      {/* ✅ Sidebar only once */}
      <ScrutinySidebar sidebarOpen={sidebarOpen} />

      {/* Main */}
      <div className={`scrutiny-main ${sidebarOpen ? "" : "scrutiny-main-full"}`}>

        {/* ✅ Header only once */}
        <TopHeader toggleSidebar={toggleSidebar} />

        {/* ✅ Page content here */}
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default ScrutinyLayout;