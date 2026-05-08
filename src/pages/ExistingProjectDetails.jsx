import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/ProjectDetails.css";

import ProjectWizard from "../components/ProjectWizard";
import ProjectRegistrationSection from "../components/ExistingProjectRegistrationSection";
import ProjectSiteAddress from "../components/ExistingProjectSiteAddress";
import ProjectLocalAddress from "../components/ExistingProjectLocalAddress";
import ProjectMaterialFacts from "../components/ExistingProjectMaterialFacts";
import LegalDeclaration from "../components/ExistingLegalDeclaration";
import ProjectConstructionStatus from "../components/ExistingProjectConstructionStatus";

import OtherThanIndividualAuthorizedSignatory 
  from "../components/OtherThanIndividualAuthorizedSignatory";

import { apiPost, apiPut, apiGet } from "../api/api";

const ExistingProjectDetails = () => {

  const navigate = useNavigate();
  const location = useLocation();

  let panNumber =
    location.state?.panNumber ||
    sessionStorage.getItem("panNumber")||"SUNIL0000K";

  let applicationNumber =
    location.state?.applicationNumber ||
    sessionStorage.getItem("applicationNumber")||"100126273336";

  let promoterType =
   location.state?.promoterType ||
   sessionStorage.getItem("promoterType")||"other";


  /* ===============================
     STATES
  =============================== */

  const [isExistingProject, setIsExistingProject] = useState(false);

  const [fetchSuccessMsg, setFetchSuccessMsg] = useState("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const [formData, setFormData] = useState({

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
    address_proof_path: "",
    surveyNo: "",

    localAddress1: "",
    localAddress2: "",
    localArea: "",
    localLandmark: "",
    localDistrict: "0",
    localMandal: "0",
    localVillage: "0",
    localPincode: "",


    // ✅ Add these new fields

  authorizedSignatoryName: "",
  authorizedSignatoryMobile: "",
  authorizedSignatoryEmail: "",
  isExistingDirector: "",

  authorizedSignatoryPhoto: null,
  authorizedSignatoryPhotoPath: "",

  boardResolutionCopy: null,
  boardResolutionCopyPath: "",


    developmentCompleted: "",
    developmentPending: "",

    amountCollected: "",
    amountSpent: "",
    balanceAmount: "",

    planModified: false,
    projectDelayed: false,

    architect_certificate_path: "",
    engineer_certificate_path: "",
    ca_certificate_path: "",

    architectCertificate: null,
    engineerCertificate: null,
    caCertificate: null,

    numberOfUnits: "",
    unitsAdvanceTaken: "",
    unitsAgreementSale: "",
    unitsSold: "",

    legalDeclarationAccepted: false,
  });


  /* ===============================
     FORMAT DATE
  =============================== */

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };


  /* ===============================
     SAVE SESSION
  =============================== */

  useEffect(() => {
  sessionStorage.setItem("panNumber", panNumber);
  sessionStorage.setItem("applicationNumber", applicationNumber);

  if (promoterType) {
    sessionStorage.setItem("promoterType", promoterType);
  }

}, [panNumber, applicationNumber, promoterType]);
  /* ===============================
     LOAD EXISTING PROJECT
  =============================== */

  useEffect(() => {

    const loadProject = async () => {

      try {

       const endpoint =
  promoterType === "other"
    ? `/api/othertheninduvidual-project-registration/details?applicationNumber=${applicationNumber}&panNumber=${panNumber}`
    : `/api/project-registration/details?applicationNumber=${applicationNumber}&panNumber=${panNumber}`;

const res = await apiGet(endpoint);

        console.log("FETCH RESPONSE:", res);

        if (res?.data && Object.keys(res.data).length > 0) {

          setFetchSuccessMsg("Existing data loaded! You can update the information below and resubmit.");

          setIsExistingProject(true);

          const d = res.data;

          setFormData((prev) => ({

            ...prev,

            projectName: d.project_name || "",
            projectDescription: d.project_description || "",

            projectType: String(d.project_type || "0"),
            projectStatus: String(d.project_status || "0"),

            buildingPlanNo: d.building_plan_no || "",

            buildingPermissionFrom: formatDate(d.building_permission_from),
            buildingPermissionUpto: formatDate(d.building_permission_upto),
            dateOfCommencement: formatDate(d.date_of_commencement),
            proposedCompletionDate: formatDate(d.proposed_completion_date),

            totalAreaOfLand: d.total_area_of_land || "",
            buildingHeight: d.building_height || "",

            totalPlinthArea: d.total_plinth_area || "",
            totalBuiltUpArea: d.total_built_up_area || "",

            garagesAvailableForSale: d.garages_available_for_sale || "",
            totalGarageArea: d.total_garage_area || "",

            openParkingSpaces: d.open_parking_spaces || "",
            totalOpenParkingArea: d.total_open_parking_area || "",

            coveredParkingSpaces: d.covered_parking_spaces || "",
            totalCoveredParkingArea: d.total_covered_parking_area || "",

            estimatedConstructionCost: d.estimated_construction_cost || "",
            costOfLand: d.cost_of_land || "",

            projectAddress1: d.project_address1 || "",
            projectAddress2: d.project_address2 || "",

            projectDistrict: String(d.project_district || "0"),
            projectMandal: String(d.project_mandal || "0"),
            projectVillage: String(d.project_village || "0"),
            projectPincode: d.project_pincode || "",

            projectLatitude: d.project_latitude || "",
            projectLongitude: d.project_longitude || "",

            planApprovingAuthority: String(d.plan_approving_authority || "0"),

            surveyNo: d.survey_no || "",

            address_proof_path: d.address_proof_path || "",

            localAddress1: d.local_address1 || "",
            localAddress2: d.local_address2 || "",
            localArea: d.local_area || "",
            localLandmark: d.local_landmark || "",

            localDistrict: String(d.local_district || "0"),
            localMandal: String(d.local_mandal || "0"),
            localVillage: String(d.local_village || "0"),
            localPincode: d.local_pincode || "",


           authorizedSignatoryName: d.authorized_signatory_name || "",
           authorizedSignatoryMobile: d.authorized_signatory_mobile || "",
           authorizedSignatoryEmail: d.authorized_signatory_email || "",
           isExistingDirector: d.is_existing_director || "",

          authorizedSignatoryPhotoPath: d.authorized_signatory_photo_path || "",
          boardResolutionCopyPath: d.board_resolution_copy_path || "",


            developmentCompleted: d.development_completed || "",
            developmentPending: d.development_pending || "",

            amountCollected: d.amount_collected || "",
            amountSpent: d.amount_spent || "",
            balanceAmount: d.balance_amount || "",

            planModified: d.plan_modified === true,
            projectDelayed: d.project_delayed === true,

            architect_certificate_path: d.architect_certificate_path || "",
            engineer_certificate_path: d.engineer_certificate_path || "",
            ca_certificate_path: d.ca_certificate_path || "",

            numberOfUnits: d.number_of_units || "",
            unitsAdvanceTaken: d.units_advance_taken || "",
            unitsAgreementSale: d.units_agreement_sale || "",
            unitsSold: d.units_sold || "",

            legalDeclarationAccepted:
              d.legal_declaration_accepted === true,

          }));

        } else {

          setIsExistingProject(false);
          setFetchSuccessMsg("");
        }

      } catch (err) {

        console.error("FETCH ERROR:", err);
        setIsExistingProject(false);

      }
    };

    loadProject();

  }, [panNumber, applicationNumber, promoterType]);


  /* ===============================
     CALCULATIONS
  =============================== */

  const totalOpenArea =
    Number(formData.totalAreaOfLand) > 0 &&
    Number(formData.totalPlinthArea) > 0
      ? (
          Number(formData.totalAreaOfLand) -
          Number(formData.totalPlinthArea)
        ).toFixed(2)
      : "";

  const totalProjectCost = (
    (Number(formData.estimatedConstructionCost) || 0) +
    (Number(formData.costOfLand) || 0)
  ).toFixed(2);


  /* ===============================
     HANDLERS
  =============================== */

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };


  /* ===============================
     SUBMIT
  =============================== */
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!formData.legalDeclarationAccepted) {
//     alert("Accept legal declaration");
//     return;
//   }

//   const payload = {
//   ...formData,
//   panNumber,
//   applicationNumber,
//   totalOpenArea,
//   totalProjectCost,
// };

//   try {
//     // ✅ ALWAYS CALL SAME API
//     // ✅ If project exists → UPDATE
// if (promoterType === "other") {

//   if (isExistingProject) {
//     await apiPut(
//       "/api/othertheninduvidual-project-registration/update",
//       payload
//     );
//   } else {
//     await apiPost(
//       "/api/othertheninduvidual-project-registration",
//       payload
//     );
//   }

// } else {

//   if (isExistingProject) {
//     const formDataToSend = new FormData();

// // append normal fields
// Object.keys(formData).forEach((key) => {
//   if (formData[key] !== null && formData[key] !== undefined) {
//     formDataToSend.append(key, formData[key]);
//   }
// });

// formDataToSend.append("panNumber", panNumber);
// formDataToSend.append("applicationNumber", applicationNumber);
// formDataToSend.append("totalOpenArea", totalOpenArea);
// formDataToSend.append("totalProjectCost", totalProjectCost);

// const response = await fetch(
//   "https://bs20m5dw-8080.inc1.devtunnels.ms/api/project-registration/update",
//   {
//     method: "PUT",
//     body: formDataToSend,
//   }
// );

// if (!response.ok) {
//   throw new Error("Update failed");
// }
//   } else {
//     await apiPost("/api/project-registration", payload);
//   }

// }

// setSaveSuccessMsg("Project details saved successfully");
//     navigate("/existing-development-details", {
//       state: { panNumber, applicationNumber },
//     });

//   } catch (err) {
//     console.error("Submit Error:", err);
//     alert(err.message || "Save failed");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.legalDeclarationAccepted) {
    alert("Accept legal declaration");
    return;
  }

  try {

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append("panNumber", panNumber);
    formDataToSend.append("applicationNumber", applicationNumber);
    formDataToSend.append("totalOpenArea", totalOpenArea);
    formDataToSend.append("totalProjectCost", totalProjectCost);

    if (promoterType === "other") {

      if (isExistingProject) {

         await apiPut(
          "/api/othertheninduvidual-project-registration/update",
          formDataToSend
        );
      } else {

        await apiPost(
          "/api/othertheninduvidual-project-registration",
          Object.fromEntries(formDataToSend)
        );

      }

    } else {

      if (isExistingProject) {

      await apiPut(
        "/api/project-registration/update",
        formDataToSend
      );
      
      } else {
        await apiPost("/api/project-registration", Object.fromEntries(formDataToSend));
      }

    }

    setSaveSuccessMsg("Project details saved successfully");

    navigate("/existing-development-details", {
  state: { 
    panNumber, 
    applicationNumber,
    promoterType
  },
});

  } catch (err) {

    console.error("Submit Error:", err);
    alert(err.message || "Save failed");

  }
};
  /* ===============================
     RENDER
  =============================== */

  return (

    <div className="project-details-container">

      <ProjectWizard currentStep={2} />
      
       {fetchSuccessMsg && (
  <div className="alert alert-success">
    {fetchSuccessMsg}
  </div>
)}

{saveSuccessMsg && (
  <div className="alert alert-success">
    {saveSuccessMsg}
  </div>
)}

      

      <form onSubmit={handleSubmit} className="project-form">

        <ProjectRegistrationSection
          formData={{ ...formData, totalOpenArea, totalProjectCost }}
          handleInputChange={handleInputChange}
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
        
        {promoterType === "other" && (
        <OtherThanIndividualAuthorizedSignatory
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        />
        )}



       {["0", "3", ""].includes(formData.projectStatus) && (


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

            {isExistingProject ? "Save And Continue" : "Save And Continue"}

          </button>

        </div>

      </form>

    </div>
  );
};

export default ExistingProjectDetails;