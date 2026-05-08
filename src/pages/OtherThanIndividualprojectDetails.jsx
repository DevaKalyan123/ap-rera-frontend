import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";



import "../styles/ProjectDetails.css";
import ProjectWizard from "../components/ProjectWizard";

import ProjectRegistrationSection from "../components/ProjectRegistrationSection";
import ProjectSiteAddress from "../components/ProjectSiteAddress";
import ProjectLocalAddress from "../components/ProjectLocalAddress";
import ProjectMaterialFacts from "../components/ProjectMaterialFacts";
import LegalDeclaration from "../components/LegalDeclaration";
import OtherThanIndividualAuthorizedSignatory from "../components/OtherThanIndividualAuthorizedSignatory";

import ProjectConstructionStatus from "../components/ProjectConstructionStatus";
import { apiPost, apiGet } from "../api/api";

const OtherThanIndividualProjectDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const panNumber =
    location.state?.panNumber || sessionStorage.getItem("panNumber") || "lllll0000l";

  const applicationNumber =
    location.state?.applicationNumber || sessionStorage.getItem("applicationNumber") || "00000000000";

  const promoterType =
    location.state?.promoterType || sessionStorage.getItem("promoterType") || "other";

  const typeOfPromoter =
    location.state?.typeOfPromoter || sessionStorage.getItem("typeOfPromoter") || "";

  console.log("PAN Number:", panNumber);
  console.log("Application Number:", applicationNumber);
  console.log("Promoter Type:", promoterType);



  React.useEffect(() => {
    if (!panNumber || !applicationNumber) {
      alert("Session expired. Please start again.");
      // navigate("/project-wizard");
    }
  }, [panNumber, applicationNumber, navigate]);


  React.useEffect(() => {
    if (panNumber && applicationNumber) {
      sessionStorage.setItem("panNumber", panNumber);
      sessionStorage.setItem("applicationNumber", applicationNumber);
      if (promoterType) {
        sessionStorage.setItem("promoterType", promoterType);
      }
      if (typeOfPromoter) {
        sessionStorage.setItem("typeOfPromoter", typeOfPromoter);
      }
    }
  }, [panNumber, applicationNumber, promoterType, typeOfPromoter]);

  // ✅ PREFILL FROM API
  React.useEffect(() => {
    const fetchExistingData = async () => {
      try {
        if (!applicationNumber || !panNumber) return;
        const res = await apiGet(`/api/othertheninduvidual-project-registration/details?applicationNumber=${applicationNumber}&panNumber=${panNumber}`);

        if (res && res.success && res.data && Object.keys(res.data).length > 0) {
          const formatDate = (dateStr) => {
            if (!dateStr) return "";
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return "";
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          };

          setFormData((prev) => ({
            ...prev,
            projectName: res.data.project_name || "",
            projectDescription: res.data.project_description || "",
            projectType: String(res.data.project_type || "0"),
            projectStatus: String(res.data.project_status || "0"),
            buildingPlanNo: res.data.building_plan_no || "",
            buildingPermissionFrom: formatDate(res.data.building_permission_from),
            buildingPermissionUpto: formatDate(res.data.building_permission_upto),
            dateOfCommencement: formatDate(res.data.date_of_commencement),
            proposedCompletionDate: formatDate(res.data.proposed_completion_date),
            totalAreaOfLand: res.data.total_area_of_land || "",
            buildingHeight: res.data.building_height || "",
            totalPlinthArea: res.data.total_plinth_area || "",
            totalBuiltUpArea: res.data.total_built_up_area || "",
            garagesAvailableForSale: res.data.garages_available_for_sale || "",
            totalGarageArea: res.data.total_garage_area || "",
            openParkingSpaces: res.data.open_parking_spaces || "",
            totalOpenParkingArea: res.data.total_open_parking_area || "",
            coveredParkingSpaces: res.data.covered_parking_spaces || "",
            totalCoveredParkingArea: res.data.total_covered_parking_area || "",
            estimatedConstructionCost: res.data.estimated_construction_cost || "",
            costOfLand: res.data.cost_of_land || "",
            projectAddress1: res.data.project_address1 || "",
            projectAddress2: res.data.project_address2 || "",
            projectDistrict: String(res.data.project_district || "0"),
            projectMandal: String(res.data.project_mandal || "0"),
            projectVillage: String(res.data.project_village || "0"),
            projectPincode: res.data.project_pincode || "",
            projectLatitude: res.data.project_latitude || "",
            projectLongitude: res.data.project_longitude || "",
            planApprovingAuthority: String(res.data.plan_approving_authority || "0"),
            surveyNo: res.data.survey_no || "",
            localAddress1: res.data.local_address1 || "",
            localAddress2: res.data.local_address2 || "",
            localArea: res.data.local_area || "",
            localLandmark: res.data.local_landmark || "",
            localDistrict: String(res.data.local_district || "0"),
            localMandal: String(res.data.local_mandal || "0"),
            localVillage: String(res.data.local_village || "0"),
            localPincode: res.data.local_pincode || "",
            projectWebsiteURL: res.data.project_website_url || "",
            developmentCompleted: res.data.development_completed || "",
            developmentPending: res.data.development_pending || "",
            amountCollected: res.data.amount_collected || "",
            amountSpent: res.data.amount_spent || "",
            balanceAmount: res.data.balance_amount || "",
            planModified: res.data.plan_modified ? "true" : "false",
            projectDelayed: res.data.project_delayed ? "true" : "false",
            numberOfUnits: res.data.number_of_units || "",
            unitsAdvanceTaken: res.data.units_advance_taken || "",
            unitsAgreementSale: res.data.units_agreement_sale || "",
            unitsSold: res.data.units_sold || "",
            legalDeclarationAccepted: res.data.legal_declaration_accepted || false,
            authorizedSignatoryName: res.data.authorized_signatory_name || "",
            authorizedSignatoryMobile: res.data.authorized_signatory_mobile || "",
            authorizedSignatoryEmail: res.data.authorized_signatory_email || "",
            isExistingDirector: res.data.is_existing_director || "",

            // File paths for displaying existing files
            addressProofPath: res.data.address_proof_path || null,
            architectCertificatePath: res.data.architect_certificate_path || null,
            engineerCertificatePath: res.data.engineer_certificate_path || null,
            caCertificatePath: res.data.ca_certificate_path || null,
            authorizedSignatoryPhotoPath: res.data.authorized_signatory_photo_path || null,
            boardResolutionCopyPath: res.data.board_resolution_copy_path || null,
          }));
        }
      } catch (err) {
        console.error("Error fetching project details:", err);
      }
    };

    fetchExistingData();
  }, [applicationNumber, panNumber]);




  const [errors, setErrors] = useState({
    plinthArea: "",
  });


  // 🔹 SINGLE SOURCE OF TRUTH
  const [formData, setFormData] = useState({
    // Project Registration
    projectName: "",
    projectDescription: "",
    projectType: "0",
    projectStatus: "0",
    buildingPlanNo: "",
    buildingPermissionFrom: "",
    buildingPermissionUpto: "",
    dateOfCommencement: "",
    proposedCompletionDate: "",
    totalAreaOfLand: "",
    buildingHeight: "",
    totalPlinthArea: "",
    totalBuiltUpArea: "",
    garagesAvailableForSale: "",
    totalGarageArea: "",
    openParkingSpaces: "",
    totalOpenParkingArea: "",
    coveredParkingSpaces: "",
    totalCoveredParkingArea: "",
    estimatedConstructionCost: "",
    costOfLand: "",

    // Project Site Address
    projectAddress1: "",
    projectAddress2: "",
    projectDistrict: "0",
    projectMandal: "0",
    projectVillage: "0",
    projectPincode: "",
    projectLatitude: "",
    projectLongitude: "",
    planApprovingAuthority: "0",
    addressProof: null,
    surveyNo: "",

    // Project Local Address
    localAddress1: "",
    localAddress2: "",
    localArea: "",
    localLandmark: "",
    localDistrict: "0",
    localMandal: "0",
    localVillage: "0",
    localPincode: "",
    projectWebsiteURL: "",

    // Construction Status
    developmentCompleted: "",
    developmentPending: "",
    amountCollected: "",
    amountSpent: "",
    balanceAmount: "",
    planModified: "",

    // Certificates
    architectCertificate: null,
    engineerCertificate: null,
    caCertificate: null,

    // Project Delay
    projectDelayed: "",



    // Project Material Facts
    numberOfUnits: "",
    unitsAdvanceTaken: "",
    unitsAgreementSale: "",
    unitsSold: "",

    // Legal
    legalDeclarationAccepted: false,

    // 🔹 Authorized Signatory (Other Than Individual)
    authorizedSignatoryName: "",
    authorizedSignatoryMobile: "",
    authorizedSignatoryEmail: "",
    isExistingDirector: "",
    authorizedSignatoryPhoto: null,
    boardResolutionCopy: null,

    addressProofPath: null,
    architectCertificatePath: null,
    engineerCertificatePath: null,
    caCertificatePath: null,
    authorizedSignatoryPhotoPath: null,
    boardResolutionCopyPath: null,
  });

  const totalOpenArea =
    Number(formData.totalAreaOfLand) > 0
      ? Number(formData.totalPlinthArea) > 0
        ? Number(formData.totalPlinthArea) <= Number(formData.totalAreaOfLand)
          ? (
            Number(formData.totalAreaOfLand) -
            Number(formData.totalPlinthArea)
          ).toFixed(2)
          : ""
        : Number(formData.totalAreaOfLand).toFixed(2)
      : "";



  const totalProjectCost =
    Number(formData.estimatedConstructionCost) ||
      Number(formData.costOfLand)
      ? (
        (Number(formData.estimatedConstructionCost) || 0) +
        (Number(formData.costOfLand) || 0)
      ).toFixed(2)
      : "";
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // allow only numbers & decimals
    if (
      ["totalAreaOfLand", "totalPlinthArea", "estimatedConstructionCost", "costOfLand"].includes(name) &&
      value !== "" &&
      !/^\d*\.?\d*$/.test(value)
    ) {
      return;
    }

    setFormData((prev) => {
      // 🔹 CASCADING RESET (IMPORTANT)
      if (name === "projectDistrict") {
        return {
          ...prev,
          projectDistrict: value,
          projectMandal: "0",
          projectVillage: "0",
        };
      }

      if (name === "projectMandal") {
        return {
          ...prev,
          projectMandal: value,
          projectVillage: "0",
        };
      }

      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      const totalLand = Number(updated.totalAreaOfLand) || 0;
      const plinthArea = Number(updated.totalPlinthArea) || 0;

      if (name === "totalPlinthArea" && plinthArea > totalLand) {
        setErrors({
          plinthArea: "Plinth area cannot be greater than total land area",
        });
        return prev;
      }

      setErrors({ plinthArea: "" });
      return updated;
    });
  };

  // 🔹 FILE HANDLER
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // 🔹 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.legalDeclarationAccepted) {
      alert("Please accept the legal declaration");
      return;
    }

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    payload.append("panNumber", panNumber);
    payload.append("applicationNumber", applicationNumber);


    // ✅ append derived values
    payload.append("totalOpenArea", totalOpenArea);
    payload.append("totalProjectCost", totalProjectCost);

    try {
      await apiPost("/api/othertheninduvidual-project-registration", payload);

      // ✅ SHOW SUCCESS CONFIRMATION
      const confirmed = window.confirm(
        "Project details saved successfully.\nClick OK to continue to Development Details."
      );

      if (confirmed) {
        navigate("/other-than-individual-development-details", {
          state: {
            panNumber,
            applicationNumber,
            promoterType,
            typeOfPromoter,
          },
        });


      }
    } catch (err) {
      alert(err.message || "Something went wrong while saving project details");
    }

  };

  return (
    <div className="project-details-container">
      <ProjectWizard currentStep={2} />

      {/* 🔹 ONE FORM ONLY */}
      <form onSubmit={handleSubmit} className="project-form">
        <ProjectRegistrationSection
          formData={{
            ...formData,
            totalOpenArea,
            totalProjectCost,
          }}
          handleInputChange={handleInputChange}
          errors={errors}   // ✅ USE IT
        />

        <ProjectSiteAddress
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
        />

        <ProjectLocalAddress
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {formData.projectStatus === "3" && (
          <ProjectConstructionStatus
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />
        )}

        <OtherThanIndividualAuthorizedSignatory
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
        />


        <ProjectMaterialFacts
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <LegalDeclaration
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <div className="form-section">
          <button type="submit" className="btn btn-primary pull-right">
            Save And Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtherThanIndividualProjectDetails;
