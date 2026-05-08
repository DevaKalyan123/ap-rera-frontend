import { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/AgentDashboard.css";

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState("partial");
  const [applications, setApplications] = useState([]);

  const navigate = useNavigate();
  const pan = sessionStorage.getItem("agent_pan");

  useEffect(() => {
    if (!pan) return;

    const url =
      activeTab === "partial"
        ? `/api/agent/partial-applications/${pan}`
        : `/api/agent/shortfall-applications/${pan}`;

    apiGet(url)
      .then((res) => {
        console.log("FULL RESPONSE 👉", res);

        if (res?.success === true && Array.isArray(res.data)) {
          setApplications(res.data);
        } else {
          setApplications([]);
        }
      })
      .catch((err) => {
        console.error("API ERROR", err);
        setApplications([]);
      });
  }, [activeTab, pan]);

 const openApplication = (app) => {
  // ✅ store agentId where ApplicantDetails expects it
  localStorage.setItem("agentId", app.agent_id);

  // optional (if needed later)
  sessionStorage.setItem("application_no", app.application_no);

  navigate("/applicant-details", {
    state: {
      agentId: app.agent_id,
    },
  });
};


  return (
    <div className="agent-dashboard-wrapper">
      {/* LEFT MENU */}
      <div className="agent-sidebar">
        <div
          className={`menu-item ${activeTab === "partial" ? "active" : ""}`}
          onClick={() => setActiveTab("partial")}
        >
          Partial Applications
        </div>

        <div
          className={`menu-item ${activeTab === "shortfall" ? "active" : ""}`}
          onClick={() => setActiveTab("shortfall")}
        >
          Shortfall Applications
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="agent-content">
        <h3 className="page-title">
          {activeTab === "partial"
            ? "Partial Applications"
            : "Shortfall Applications"}
        </h3>

        <table className="agent-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Application No</th>
              <th>Name</th>
              <th>Name Type</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {applications.length > 0 ? (
              applications.map((app, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>

                  <td>
                    <span
                      className="application-link"
                      onClick={() => openApplication(app)}
                    >
                      {app.application_no}
                    </span>
                  </td>

                  <td>{app.agent_name}</td>
                  <td>{app.name_type}</td>
                  <td>{app.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentDashboard;