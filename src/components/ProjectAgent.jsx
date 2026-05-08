import React, { useState } from "react";
import { apiPost, apiDelete } from "../api/api";

const ProjectAgent = ({ applicationNumber, panNumber, agents = [], onUpdate }) => {
  const [formData, setFormData] = useState({
    rera_registration_no: "",
    agent_name: "",
    agent_address: "",
    mobile_number: "",
  });

  // -------------------------------
  // Handle Input Change
  // -------------------------------
  const handleInputChange = (e) => {
  const { name, value } = e.target;

  // ✅ Mobile → numbers only
  if (name === "mobile_number" && !/^\d*$/.test(value)) {
    return;
  }

  // ✅ Agent Name → letters, space, dot only
  if (name === "agent_name" && !/^[a-zA-Z\s.]*$/.test(value)) {
    return;
  }

  // ✅ AP RERA Registration No
  // allow only A-Z, numbers, / and -
  if (name === "rera_registration_no" && !/^[A-Za-z0-9/-]*$/.test(value)) {
    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: name === "rera_registration_no"
      ? value.toUpperCase() // auto uppercase RERA
      : value.trimStart(),
  }));
};

 // ⭐ Enterprise validation for Project Agent
const validateAgent = () => {
  const errors = {};

  const rera = formData.rera_registration_no.trim();
  const name = formData.agent_name.trim();
  const address = formData.agent_address.trim();
  const mobile = formData.mobile_number.trim();

  if (!rera) errors.rera = "RERA Registration No required";
  if (!name) errors.name = "Agent name required";
  if (!address) errors.address = "Agent address required";
  if (!mobile) errors.mobile = "Mobile number required";

  // 🔹 India Mobile Validation
  if (mobile && !/^[6-9]\d{9}$/.test(mobile)) {
    errors.mobile = "Enter valid 10 digit mobile number";
  }

  // 🔹 Agent Name letters only
  if (name && !/^[a-zA-Z\s.]+$/.test(name)) {
    errors.name = "Only letters allowed in agent name";
  }

  // 🔹 RERA basic check
  if (rera && rera.length < 6) {
    errors.rera = "Invalid RERA Registration Number";
  }

  // 🔹 Prevent duplicate agents
  if (
    agents.some(
      (a) =>
        (a.rera_registration_no || a.registration_number) === rera
    )
  ) {
    errors.rera = "Agent already added";
  }

  return errors;
};

  // -------------------------------
  // Add Project Agent
  // -------------------------------

  const handleAdd = async () => {
    const { rera_registration_no, agent_name, agent_address, mobile_number } =
      formData;

    const validationErrors = validateAgent();

if (Object.keys(validationErrors).length > 0) {
  alert(Object.values(validationErrors)[0]);
  return;
}


    try {
      // 1️⃣ CREATE AGENT
      const res = await apiPost("/api/associate/project-agent", {
        application_number: applicationNumber,
        pan_number: panNumber,
        rera_registration_no,
        agent_name,
        agent_address,
        mobile_number,
      });

      // 🔑 GET CREATED AGENT ID
      const createdAgentId = res?.id || res?.data?.id;

      if (!createdAgentId) {
        throw new Error("Agent created but ID not returned");
      }

      // 🔗 LINK AGENT TO APPLICATION
      await apiPost("/api/application/associate", {
        application_number: applicationNumber,
        pan_number: panNumber,
        associate_type: "agent",
        associate_id: createdAgentId,
      });

      alert("Project agent added successfully");

      // RESET FORM
      setFormData({
        rera_registration_no: "",
        agent_name: "",
        agent_address: "",
        mobile_number: "",
      });

      // ✅ REFRESH DATA IMMEDIATELY
      if (onUpdate) {
        await onUpdate();
      }

    } catch (error) {
      console.error("Error adding project agent:", error);
      alert(error.message || "Error adding project agent");
    }
  };

  // -------------------------------
  // Delete Project Agent
  // -------------------------------
  const handleDelete = async (agentId) => {
    if (!window.confirm("Are you sure you want to delete this project agent?")) return;

    try {
      await apiDelete(`/api/associate/project-agent/${agentId}`);
      alert("Project agent deleted successfully");
      
      // ✅ REFRESH DATA IMMEDIATELY
      if (onUpdate) {
        await onUpdate();
      }
    } catch (error) {
      console.error("Error deleting project agent:", error);
      alert(error.message || "Error deleting project agent");
    }
  };

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div className="form-section">
      <h3 className="section-title-ac">Project Agent</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>
            Agent RERA Registration No.<span className="required">*</span>
          </label>
          <input
            type="text"
            name="rera_registration_no"
            value={formData.rera_registration_no}
            onChange={handleInputChange}
            placeholder="Agent RERA Reg No"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            Agent Name<span className="required">*</span>
          </label>
          <input
            type="text"
            name="agent_name"
            value={formData.agent_name}
            onChange={handleInputChange}
            placeholder="Agent Name"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            Agent Address<span className="required">*</span>
          </label>
          <input
            type="text"
            name="agent_address"
            value={formData.agent_address}
            onChange={handleInputChange}
            placeholder="Agent Address"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            Mobile Number<span className="required">*</span>
          </label>
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            maxLength="15"
            className="form-control"
          />
        </div>
      </div>

      <div className="add-button-container">
        <button className="btn-add" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* ✅ DISPLAY ADDED AGENTS IMMEDIATELY */}
      {agents && agents.length > 0 && (
        <div className="added-items-section">
          <h4 className="added-items-title">Added agents</h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>RERA Reg No</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <tr key={agent.id || index}>
                  <td>{index + 1}</td>
                  <td>{agent.registration_number || agent.rera_registration_no}</td>
                  <td>{agent.name || agent.agent_name}</td>
                  <td>{agent.mobile || agent.mobile_number}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(agent.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectAgent;