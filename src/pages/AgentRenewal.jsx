import { useState } from "react";
import { getAgentDetails, createRenewal } from "../api/renewalApi";
import { useNavigate } from "react-router-dom";
import "../styles/AgentRenewal.css";

function AgentRenewal() {

  const [applicationNo, setApplicationNo] = useState("");
  const [agent, setAgent] = useState(null);

  const navigate = useNavigate();

  const fetchAgent = async () => {

    if (applicationNo.length == 0) {
    alert("Please Enter Registration Number");
    return;
  }

      if (applicationNo.length !== 13) {
    alert("Registration Number must be exactly 13 digits");
    return;
  }

    try {

      const res = await getAgentDetails(applicationNo);

      setAgent(res.data);

    } catch {

      alert("No Records Found or Invaid Registration Number");

    }

  };

  const startRenewal = async () => {

    try {

      const res = await createRenewal({
        agent_id: agent.agent_id,
        expiry_date: agent.valid_to,
        fee_type: "INDIVIDUAL",
        email: agent.email

      });

      const renewalId = res.data.renewal_id;

      navigate(`/renewal/upload/${renewalId}`);

    } catch {

      alert("Renewal creation failed");

    }

  };

  return (

    <div className="renewal-page-wrapper">
  
  {/* Breadcrumb */}
  <div class="agentrenewal-breadcrumb-bar">
  You are here :
  <a href="/" class="agentrenewal-breadcrumb-link">Home</a> /
  <span> Registration /</span>
  <span>Agent Renewal</span>
</div>
    
    <div className="renewal-container">

      <h2 className="renewal-page-title">Agent Renewal</h2>
      <div class="search-section">

  <label class="form-label">
    Registration Number <span class="required">*</span>
  </label>

      <div className="search-row">

<input
  type="text"
  placeholder="Enter Registration Number"
  value={applicationNo}
  maxLength={13}
  onChange={(e) => {
    const value = e.target.value;

    // Allow only digits
    if (/^\d*$/.test(value)) {
      setApplicationNo(value);
    }
  }}
/>

        <button className="fetch-btn" onClick={fetchAgent}>
          Fetch Agent
        </button>

      </div>
      </div>

      {agent && (

        <div className="agent-card">

          <h3>Agent Registration Details</h3>

          <div className="agent-grid">

            <div>
              <label>Agent Name</label>
              <p>{agent.agent_name}</p>
            </div>

            <div>
              <label>PAN Number</label>
              <p>{agent.pan}</p>
            </div>

            <div>
              <label>Mobile Number</label>
              <p>{agent.mobile}</p>
            </div>

            <div>
              <label>Email</label>
              <p>{agent.email}</p>
            </div>

            <div>
              <label>Registration Number</label>
              <p>{applicationNo}</p>
            </div>

            <div>
              <label>Valid From</label>
              <p>{agent.valid_from || "01-01-2023"}</p>
            </div>

            <div>
              <label>Valid To</label>
              <p>{agent.valid_to || "31-12-2025"}</p>
            </div>

            <div>
              <label>Status</label>
              <p className="status-active">Active</p>
            </div>

            <div>
              <label>Renewal Fee</label>
              <p>₹ 5,000</p>
            </div>

          </div>

          <button
            className="renewal-btn"
            onClick={startRenewal}
          >
            Create Renewal Application
          </button>

        </div>

      )}

    </div>
    </div>
  );

}

export default AgentRenewal;