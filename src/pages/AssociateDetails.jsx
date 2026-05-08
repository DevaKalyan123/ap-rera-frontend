import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ProjectAgent from "../components/ProjectAgent";
import Architects from "../components/Architects";
import StructuralEngineers from "../components/StructuralEngineers";
import ProjectContractors from "../components/ProjectContractors";
import CharteredAccountant from "../components/CharteredAccountant";
import ProjectEngineers from "../components/ProjectEngineers";

import { apiGet } from "../api/api";
import "../styles/AssociateDetails.css";

const AssociateDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // -----------------------------
  // APPLICATION CONTEXT
  // -----------------------------
  const applicationNumber =
    location.state?.applicationNumber ||
    sessionStorage.getItem("applicationNumber");

  const panNumber =
    location.state?.panNumber ||
    sessionStorage.getItem("panNumber");

  // -----------------------------
  // MASTER DATA
  // -----------------------------
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  // -----------------------------
  // ASSOCIATES STATE (SINGLE SOURCE OF TRUTH)
  // -----------------------------
  const [associates, setAssociates] = useState({
    agents: [],
    architects: [],
    engineers: [],
    contractors: [],
    accountants: [],
    project_engineers: [],
  });

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // PERSIST APPLICATION DETAILS
  // -----------------------------
  useEffect(() => {
    if (applicationNumber) {
      sessionStorage.setItem("applicationNumber", applicationNumber);
    }
    if (panNumber) {
      sessionStorage.setItem("panNumber", panNumber);
    }
  }, [applicationNumber, panNumber]);

  // -----------------------------
  // FETCH STATES (ONCE)
  // -----------------------------
  useEffect(() => {
    fetchStates();
  }, []);

  // -----------------------------
  // FETCH ASSOCIATES (ON LOAD / UPDATE)
  // -----------------------------
  useEffect(() => {
    if (applicationNumber) {
      fetchAssociates();
    }
  }, [applicationNumber]);

  // -----------------------------
  // API CALLS
  // -----------------------------
  const fetchStates = async () => {
    try {
      const response = await apiGet("/api/states");
      setStates(response || []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchDistricts = async (stateId) => {
  // 🔒 HARD GUARD (THIS IS THE FIX)
  if (!stateId || isNaN(stateId)) {
    console.warn("Invalid stateId, skipping district fetch:", stateId);
    setDistricts([]);
    return;
  }

  try {
    const response = await apiGet(`/api/districts/${stateId}`);
    setDistricts(response || []);
  } catch (error) {
    console.error("Error fetching districts:", error);
    setDistricts([]);
  }
};


  const fetchAssociates = async () => {
    try {
      setLoading(true);
      const response = await apiGet(
        `/api/application/associates?application_number=${applicationNumber}&pan_number=${panNumber}`
      );

      if (response?.success) {
        setAssociates(response.data);
      }
    } catch (error) {
      console.error("Error fetching associates:", error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // NAVIGATION
  // -----------------------------
  const handleSaveAndContinue = () => {
    navigate("/project-upload-documents", {
      state: { applicationNumber, panNumber },
    });
  };

  // -----------------------------
  // SAFETY CHECK
  // -----------------------------
  if (!applicationNumber || !panNumber) {
    return (
      <div className="associate-details-container">
        <div className="error-message">
          Missing application details. Please go back and try again.
        </div>
      </div>
    );
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="associate-details-container">
       {/* ✅ ADD HERE */}
    <ProjectWizard currentStep={4} type="individual" />
      <div className="breadcrumb">
        Home / Project Registration / Associate Details
      </div>

      <h2 className="page-title">Associate Details</h2>

      {loading && <div className="loading-spinner">Loading...</div>}

      {/* ---------------- DEBUG / COUNTS ---------------- */}
      <div className="debug-panel">
        <div><strong>Application:</strong> {applicationNumber}</div>
        <div><strong>PAN:</strong> {panNumber}</div>
        <div className="debug-grid">
          <div>Agents: {associates.agents.length}</div>
          <div>Architects: {associates.architects.length}</div>
          <div>Engineers: {associates.engineers.length}</div>
          <div>Contractors: {associates.contractors.length}</div>
          <div>Accountants: {associates.accountants.length}</div>
          <div>Project Engineers: {associates.project_engineers.length}</div>
        </div>
      </div>

      {/* ---------------- MODULES ---------------- */}

      <ProjectAgent
        applicationNumber={applicationNumber}
        panNumber={panNumber}
        agents={associates.agents}
        onUpdate={fetchAssociates}
      />

      <Architects
        states={states}
        districts={districts}
        applicationNumber={applicationNumber}
        panNumber={panNumber}
        architects={associates.architects}
        onStateChange={fetchDistricts}
        onUpdate={fetchAssociates}
      />

      <StructuralEngineers
        states={states}
        districts={districts}
        applicationNumber={applicationNumber}
        panNumber={panNumber}
        engineers={associates.engineers}
        onStateChange={fetchDistricts}
        onUpdate={fetchAssociates}
      />

      <ProjectContractors
        states={states}
        districts={districts}
        applicationNumber={applicationNumber}
        panNumber={panNumber}
        contractors={associates.contractors}
        onStateChange={fetchDistricts}
        onUpdate={fetchAssociates}
      />

      <CharteredAccountant
        states={states}
        districts={districts}
        applicationNumber={applicationNumber}
        panNumber={panNumber}
        accountants={associates.accountants}
        onStateChange={fetchDistricts}
        onUpdate={fetchAssociates}
      />

      <ProjectEngineers
        states={states}
        districts={districts}
        applicationNumber={applicationNumber}
        panNumber={panNumber}
        engineers={associates.project_engineers}
        onStateChange={fetchDistricts}
        onUpdate={fetchAssociates}
      />

      {/* ---------------- SAVE ---------------- */}
      <div className="button-container">
        <button
          className="btn-save-continue"
          onClick={handleSaveAndContinue}
          disabled={loading}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default AssociateDetails;
