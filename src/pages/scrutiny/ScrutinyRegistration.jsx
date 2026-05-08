import { useState } from "react";
import ScrutinySidebar from "../../components/scrutiny/ScrutinitySidebar";
import TopHeader from "../../components/scrutiny/TopHeader";

const ScrutinyRegistration = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <ScrutinySidebar sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>

        {/* Top Header (only toggle here) */}
        <TopHeader toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div style={{ padding: "20px" }}>
          <h2>Scrutiny Registration</h2>

          <div style={styles.card}>
            <p>This is a dummy Scrutiny Registration page.</p>

            <button style={styles.button}>
              Add New Registration
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "15px",
    padding: "10px 15px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }
};

export default ScrutinyRegistration;