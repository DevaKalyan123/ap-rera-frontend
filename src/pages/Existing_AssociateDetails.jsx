import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ProjectAgent from "../components/Existing_ProjectAgent.jsx";
import Architects from "../components/Existing_Architects.jsx";
import StructuralEngineers from "../components/Existing_StructuralEngineers";
import ProjectContractors from "../components/Existing_ProjectContractors";
import CharteredAccountant from "../components/Existing_CharteredAccountant";
import ProjectEngineers from "../components/Existing_ProjectEngineers";
import ExistingProjectWizard from '../components/ExistingProjectWizard';

import { apiGet, apiPost } from "../api/api";
import "../styles/AssociateDetails.css";

const ExistingAssociateDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // -----------------------------
  // APPLICATION CONTEXT
  // -----------------------------
  const promoterType =
  location.state?.promoterType ||
  sessionStorage.getItem("promoterType");
 
  const applicationNumber =
    location.state?.applicationNumber ||
    sessionStorage.getItem("applicationNumber")||"100126606384";

  const panNumber =
    location.state?.panNumber ||
    sessionStorage.getItem("panNumber")||"PPPKK8888K";

  // -----------------------------
  // MASTER DATA
  // -----------------------------
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  // -----------------------------
  // ASSOCIATES STATE
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
  // SAVE APPLICATION CONTEXT
  // -----------------------------
  useEffect(() => {
  if (applicationNumber)
    sessionStorage.setItem("applicationNumber", applicationNumber);

  if (panNumber)
    sessionStorage.setItem("panNumber", panNumber);

  if (promoterType)
    sessionStorage.setItem("promoterType", promoterType);
}, [applicationNumber, panNumber, promoterType]);

  // -----------------------------
  // LOAD STATES
  // -----------------------------
  useEffect(() => {
    fetchStates();
  }, []);

  // -----------------------------
  // LOAD ASSOCIATES
  // -----------------------------
  useEffect(() => {
    if (applicationNumber) fetchAssociates();
  }, [applicationNumber]);

  // -----------------------------
  // API CALLS
  // -----------------------------
  const fetchStates = async () => {
    try {
      const res = await apiGet("/api/states");
      setStates(res || []);
    } catch (e) {
      console.error("States error:", e);
    }
  };

  const fetchDistricts = async (stateId) => {
    if (!stateId || isNaN(stateId)) {
      setDistricts([]);
      return;
    }
    try {
      const res = await apiGet(`/api/districts/${stateId}`);
      setDistricts(res || []);
    } catch (e) {
      console.error("District error:", e);
      setDistricts([]);
    }
  };

  // -----------------------------
  // ⭐ MAIN DATA FETCHER
  // -----------------------------
  const fetchAssociates = async () => {
    try {
      setLoading(true);

      // ✅ CALL PREVIEW API (POST)
      const previewRes = await apiPost("/api/project/preview", {
        applicationNumber,
        panNumber,
      });

      console.log("Preview API:", previewRes);

      const previewAssociates =
        previewRes?.data?.associate_details || null;

      const hasPreviewData =
        previewAssociates &&
        Object.values(previewAssociates).some(
          (arr) => Array.isArray(arr) && arr.length > 0
        );

      if (hasPreviewData) {
        console.log("✅ Loaded from PREVIEW API");
        setAssociates(previewAssociates);
        return;
      }

      // ✅ FALLBACK OLD API
      console.log("⚠️ Preview empty → Loading fallback");

      const response = await apiGet(
        `/api/application/associates?application_number=${applicationNumber}`
      );

      if (response?.data) {
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
    navigate(`/existing-development-details-upload-docs/${applicationNumber}`, {
      state: {
        applicationNumber,
        panNumber,
        promoterType   // ✅ ADD THIS
       },
    });
  };

  if (!applicationNumber || !panNumber) {
    return (
      <div className="associate-details-container">
        Missing application details.
      </div>
    );
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="associate-details-container">
      
      <div className="breadcrumb">
        Home / Project Registration / Associate Details
      </div>
<ExistingProjectWizard currentStep={4} />
      <h2 className="page-title">Associate Details</h2>

      {loading && <div className="loading-spinner">Loading...</div>}

      {/* DEBUG COUNTS */}
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

      {/* MODULES */}
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

export default ExistingAssociateDetails;