import { useState } from "react";
import { Outlet } from "react-router-dom";
import FpmsSidebar from "./FpmsSidebar";
import TopHeader from "../../components/scrutiny/TopHeader";

const FPMSLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="scrutiny-layout">
      <FpmsSidebar sidebarOpen={sidebarOpen} />

      <div className={`scrutiny-main ${sidebarOpen ? "" : "scrutiny-main-full"}`}>
        <TopHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FPMSLayout;