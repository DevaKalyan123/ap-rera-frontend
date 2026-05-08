import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ScrutinyPageHeader from "../../components/scrutiny/ScrutinyPageHeader";
import ProjectWizard from "../../components/scrutiny/scrutiny_steper";
import ScrutinyRemarksField from "../../components/scrutiny/ScrutinyRemarksField";
import ScrutinyLayout from "../../components/scrutiny/ScrutinyLayout";
import ScrutinyProjectAgent from "../../components/scrutiny/scrutiny_Existing_ProjectAgent";
import ScrutinyArchitects from "../../components/scrutiny/scrutiny_Existing_Architects";
import ScrutinyStructuralEngineers from "../../components/scrutiny/scrutiny_Existing_StructuralEngineers";
import ScrutinyProjectContractors from "../../components/scrutiny/scrutiny_Existing_ProjectContractors";
import ScrutinyCharteredAccountant from "../../components/scrutiny/scrutiny_Existing_CharteredAccountant";
import ScrutinyProjectEngineers from "../../components/scrutiny/scrutiny_Existing_ProjectEngineers";

import { apiGet, apiPost } from "../../api/api";
import "../../styles/scrutiny/scrutiny_projectregistation_4.css";

const hasValue = (value) =>
  value !== undefined && value !== null && String(value).trim() !== "";

const pickValue = (...values) => values.find(hasValue) ?? "";

const joinAddress = (...values) => values.filter(hasValue).join(", ");

const normalizePromoterType = (value) => {
  const normalized = String(value || "").trim().toLowerCase();

  if (normalized === "individual") return "individual";
  if (
    normalized === "other" ||
    normalized === "other than individual" ||
    normalized === "otherthanindividual" ||
    normalized === "other_then_individual"
  ) {
    return "other";
  }

  return normalized || "";
};

const scrutiny_projectregistation_4 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const promoterType = normalizePromoterType(
    location.state?.promoterType || sessionStorage.getItem("promoterType")
  );

  const applicationNumber =
    location.state?.applicationNumber ||
    sessionStorage.getItem("applicationNumber") ||
    "100126606384";

  const panNumber =
    location.state?.panNumber ||
    sessionStorage.getItem("panNumber") ||
    "PPPKK8888K";

  const [associates, setAssociates] = useState({
    agents: [],
    architects: [],
    engineers: [],
    contractors: [],
    accountants: [],
    project_engineers: [],
  });

  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (applicationNumber) {
      sessionStorage.setItem("applicationNumber", applicationNumber);
    }

    if (panNumber) {
      sessionStorage.setItem("panNumber", panNumber);
    }

    if (promoterType) {
      sessionStorage.setItem("promoterType", promoterType);
    }
  }, [applicationNumber, panNumber, promoterType]);

  useEffect(() => {
    if (applicationNumber && panNumber) {
      fetchAssociates();
    }
  }, [applicationNumber, panNumber, promoterType]);

  const fetchAssociates = async () => {
    try {
      setLoading(true);

      const previewEndpoint =
        promoterType === "other"
          ? "/api/othertheninduvidual/project/preview"
          : "/api/project/preview";

      const previewRes = await apiPost(previewEndpoint, {
        applicationNumber,
        panNumber,
      });

      const previewAssociates = previewRes?.data?.associate_details || null;

      const hasPreviewData =
        previewAssociates &&
        Object.values(previewAssociates).some(
          (items) => Array.isArray(items) && items.length > 0
        );

      if (hasPreviewData) {
        setAssociates(previewAssociates);
        return;
      }

      const response = await apiGet(
        `/api/application/associates?application_number=${applicationNumber}&pan_number=${panNumber}`
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

  const normalizedAssociates = useMemo(
    () => ({
      agents: (associates.agents || []).map((agent) => ({
        registrationNumber: pickValue(
          agent.registration_number,
          agent.rera_registration_no
        ),
        name: pickValue(agent.name, agent.agent_name),
        address: pickValue(agent.address, agent.agent_address),
        mobile: pickValue(agent.mobile, agent.mobile_number),
      })),

      architects: (associates.architects || []).map((architect) => ({
        name: pickValue(architect.name, architect.architect_name),
        email: pickValue(architect.email, architect.email_id),
        address: joinAddress(
          architect.address,
          architect.address_line1,
          architect.address2,
          architect.address_line2
        ),
        state: pickValue(architect.state, architect.state_ut),
        district: pickValue(architect.district),
        pinCode: pickValue(architect.pin_code, architect.pincode),
        regNumber: pickValue(
          architect.reg_number,
          architect.coa_registration_number
        ),
        yearOfEstablishment: pickValue(architect.year_of_establishment),
        keyProjects: pickValue(architect.number_of_key_projects),
        mobile: pickValue(architect.mobile, architect.mobile_number),
      })),

      engineers: (associates.engineers || []).map((engineer) => ({
        name: pickValue(engineer.name, engineer.engineer_name),
        email: pickValue(engineer.email, engineer.email_id),
        address: joinAddress(
          engineer.address,
          engineer.address_line1,
          engineer.address2,
          engineer.address_line2
        ),
        state: pickValue(engineer.state, engineer.state_ut),
        district: pickValue(engineer.district),
        pinCode: pickValue(engineer.pin_code, engineer.pincode),
        licenseNumber: pickValue(
          engineer.licence_number,
          engineer.license_number
        ),
        yearOfEstablishment: pickValue(engineer.year_of_establishment),
        keyProjects: pickValue(engineer.number_of_key_projects),
        mobile: pickValue(engineer.mobile, engineer.mobile_number),
      })),

      contractors: (associates.contractors || []).map((contractor) => ({
        natureOfWork: pickValue(contractor.nature_of_work),
        name: pickValue(contractor.contractor_name, contractor.name),
        email: pickValue(contractor.email, contractor.email_id),
        address: joinAddress(
          contractor.address,
          contractor.address_line1,
          contractor.address2,
          contractor.address_line2
        ),
        state: pickValue(contractor.state, contractor.state_ut),
        district: pickValue(contractor.district),
        pinCode: pickValue(contractor.pin_code, contractor.pincode),
        yearOfEstablishment: pickValue(contractor.year_of_establishment),
        keyProjects: pickValue(contractor.number_of_key_projects),
        mobile: pickValue(contractor.mobile, contractor.mobile_number),
      })),

      accountants: (associates.accountants || []).map((accountant) => ({
        name: pickValue(accountant.name, accountant.accountant_name),
        email: pickValue(accountant.email, accountant.email_id),
        address: joinAddress(
          accountant.address,
          accountant.address_line1,
          accountant.address2,
          accountant.address_line2
        ),
        state: pickValue(accountant.state, accountant.state_ut),
        district: pickValue(accountant.district),
        pinCode: pickValue(accountant.pin_code, accountant.pincode),
        icaiMemberId: pickValue(accountant.icai_member_id),
        keyProjects: pickValue(accountant.number_of_key_projects),
        mobile: pickValue(accountant.mobile, accountant.mobile_number),
      })),

      projectEngineers: (associates.project_engineers || []).map((engineer) => ({
        name: pickValue(engineer.name, engineer.engineer_name),
        email: pickValue(engineer.email, engineer.email_id),
        address: joinAddress(
          engineer.address,
          engineer.address_line1,
          engineer.address2,
          engineer.address_line2
        ),
        state: pickValue(engineer.state, engineer.state_ut),
        district: pickValue(engineer.district),
        pinCode: pickValue(engineer.pin_code, engineer.pincode),
        keyProjects: pickValue(engineer.number_of_key_projects),
        mobile: pickValue(engineer.mobile, engineer.mobile_number),
      })),
    }),
    [associates]
  );

  const handleSaveAndContinue = () => {
    navigate("/scrutiny/project-registration_5", {
      state: {
        applicationNumber,
        panNumber,
        promoterType,
      },
    });
  };

  if (!applicationNumber || !panNumber) {
    return (
      <ScrutinyLayout>
        <div className="scrutiny-associate-container">
          Missing application details.
        </div>
      </ScrutinyLayout>
    );
  }

  return (
    <ScrutinyLayout>
      <div className="scrutiny-associate-container">
        <ScrutinyPageHeader />

        <ProjectWizard currentStep={4} />

        <div className="scrutiny-breadcrumb">
          Home / Project Registration / Associate Details
        </div>

        <h2 className="scrutiny-page-title">Associate Details</h2>

        {loading && <div className="scrutiny-loading">Loading existing data...</div>}

        <ScrutinyProjectAgent agents={normalizedAssociates.agents} />

        <ScrutinyArchitects architects={normalizedAssociates.architects} />

        <ScrutinyStructuralEngineers engineers={normalizedAssociates.engineers} />

        <ScrutinyProjectContractors contractors={normalizedAssociates.contractors} />

        <ScrutinyCharteredAccountant accountants={normalizedAssociates.accountants} />

        <ScrutinyProjectEngineers
          engineers={normalizedAssociates.projectEngineers}
        />

        <ScrutinyRemarksField
          id="scrutiny-associate-remarks"
          value={remarks}
          onChange={setRemarks}
        />

        <div className="scrutiny-button-row">
          <button
            type="button"
            className="scrutiny-save-button"
            onClick={handleSaveAndContinue}
            disabled={loading}
          >
            Continue to Next Page
          </button>
        </div>
      </div>
    </ScrutinyLayout>
  );
};

export default scrutiny_projectregistation_4;