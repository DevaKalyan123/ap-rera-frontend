import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const ScrutinySidebar = ({ sidebarOpen }) => {

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX: inside component
  const { admin } = useAdmin();
  const dept = admin?.department?.toLowerCase();
  const panelNames = {
  planning: "PLANNING PANEL",
  legal: "LEGAL PANEL",
  audit: "AUDIT PANEL",
  engineer: "SCRUTINY ENGINEER PANEL",
  verification: "VERIFICATION PANEL",
  ad: "ASSISTANT DIRECTOR PANEL",
  dd: "DEPUTY DIRECTOR PANEL",
  it: "IT PANEL",
};

  // ✅ Dropdown state
  const isFpmsRoute =
    dept === "engineer" && location.pathname.includes("/scrutiny");

  const [fpmsOpen, setFpmsOpen] = useState(isFpmsRoute);

  return (
    <div
      className={`scrutiny-sidebar ${
        sidebarOpen ? "scrutiny-sidebar-open" : "scrutiny-sidebar-closed"
      }`}
    >

      {/* ✅ Dynamic Panel */}
      <h2 className="scrutiny-sidebar-title">
  {panelNames[dept] || "SCRUTINY PANEL"}
</h2>

      {/* Project Registration */}
      <button onClick={() => navigate("/scrutiny/project-registration")}>
        Project Registration
      </button>

      {/* Agent Registration */}
      <button onClick={() => navigate("/agent-scrutiny/registrations")}>
        Agent Registration
      </button>

      {/* ✅ FPMS only for engineer */}
        <>
          <button
            onClick={() => {
              navigate("/fpms/dashboard");
              setFpmsOpen(true);
            }}
          >
            📊 FPMS Dashboard
          </button>

          {fpmsOpen && (
            <div style={{ paddingLeft: "20px" }}>
              <button onClick={() => navigate("/scrutiny/create-files")}>
                📄 Create Files
              </button>

              <button onClick={() => navigate("/scrutiny/view-files")}>
                📁 View Files
              </button>
            </div>
          )}
        </>
      <button onClick={() => navigate("/UnregisterList")}>
        Rera unregistration
      </button>
      {/* Logout */}
      <button onClick={() => navigate("/")}>
        Logout
      </button>

    </div>
  );
};

export default ScrutinySidebar;