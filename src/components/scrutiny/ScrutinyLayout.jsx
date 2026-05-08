import { useState } from "react";
import ScrutinitySidebar from "./ScrutinitySidebar";
import TopHeader from "./TopHeader";
import "../../styles/scrutiny/scrutinydashboard.css";

export default function ScrutinyLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="scrutiny-layout">
      <ScrutinitySidebar sidebarOpen={sidebarOpen} />

      <div className={`scrutiny-main ${sidebarOpen ? "" : "scrutiny-main-full"}`}>
        <TopHeader toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        {children}
      </div>
    </div>
  );
}