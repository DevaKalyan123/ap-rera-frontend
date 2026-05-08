import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";



import "../styles/projectDetails.css";
import ProjectWizard from "../components/ProjectWizard";

import ProjectRegistrationSection from "../components/ProjectRegistrationSection";
import ProjectSiteAddress from "../components/ProjectSiteAddress";
import ProjectLocalAddress from "../components/ProjectLocalAddress";
import ProjectMaterialFacts from "../components/ProjectMaterialFacts";
import LegalDeclaration from "../components/LegalDeclaration";
import ProjectConstructionStatus from "../components/ProjectConstructionStatus";
import { apiPost } from "../api/api";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

const panNumber =
  location.state?.panNumber || sessionStorage.getItem("panNumber");

const applicationNumber =
  location.state?.applicationNumber || sessionStorage.getItem("applicationNumber");

console.log("PAN Number:", panNumber);
console.log("Application Number:", applicationNumber);



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
  }
}, [panNumber, applicationNumber]);




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
  if (
  [
    "numberOfUnits",
    "unitsSold",
    "unitsAdvanceTaken",
    "unitsAgreementSale",
    "amountCollected",
    "amountSpent",
    "balanceAmount",
  ].includes(name) &&
  value !== "" &&
  !/^\d*\.?\d*$/.test(value)
) {
  return;
}


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
  const file = files[0];
  if (!file) return;

  const ext = file.name.split(".").pop().toLowerCase();

  // Only PDF allowed for certificates
  if (
    ["architectCertificate", "engineerCertificate", "caCertificate", "addressProof"].includes(name)
  ) {
    if (ext !== "pdf") {
      alert("Only PDF files allowed");
      e.target.value = "";
      return;
    }
  }

  setFormData((prev) => ({
    ...prev,
    [name]: file,
  }));
};

  // ⭐⭐⭐ PASTE VALIDATION FUNCTION HERE
const validateProjectDetails = () => {
  const newErrors = {};

  if (!formData.projectName.trim())
    newErrors.projectName = "Project name required";

  if (formData.projectType === "0")
    newErrors.projectType = "Select project type";

  if (formData.projectStatus === "0")
    newErrors.projectStatus = "Select project status";

  if (!formData.totalAreaOfLand)
    newErrors.totalAreaOfLand = "Total land area required";

  if (!formData.projectAddress1)
    newErrors.projectAddress1 = "Address Line 1 required";

  if (formData.projectDistrict === "0")
    newErrors.projectDistrict = "Select district";

  if (!/^\d{6}$/.test(formData.projectPincode))
    newErrors.projectPincode = "Invalid pincode";

  return newErrors;
};

  // 🔹 SUBMIT
  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validateProjectDetails();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    alert(Object.values(validationErrors)[0]);
    return;
  }

  if (!formData.legalDeclarationAccepted) {
    alert("Please accept the legal declaration");
    return;
    
  }
  // ✅ CREATE FORM DATA (THIS IS MISSING)
const payload = new FormData();

// append all form fields
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
  await apiPost("/api/project-registration", payload);

  // ✅ SHOW SUCCESS CONFIRMATION
  const confirmed = window.confirm(
    "Project details saved successfully.\nClick OK to continue to Development Details."
  );

  if (confirmed) {
navigate("/Development-Details", {
  state: {
    panNumber,
    applicationNumber,
  },
});


  }
} catch (err) {
  alert(err.message || "Something went wrong while saving project details");
}

  };

  return (
    <div className="project-details-container">
      <ProjectWizard currentStep={2} type="individual" />

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

export default ProjectDetails;