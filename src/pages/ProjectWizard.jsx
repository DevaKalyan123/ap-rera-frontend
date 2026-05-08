
import React, { useState } from "react";
import "../styles/projectWizard.css";
import { apiGet, apiPost } from "../api/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { OTHERTHANINDIVIDUALWIZARD_STEPS } from "../components/wizardConfig";

// ================= VALIDATION REGEX =================
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const AADHAAR_REGEX = /^\d{12}$/;
const PIN_REGEX = /^\d{6}$/;
const ACCOUNT_REGEX = /^\d{18}$/;
const OTHER_FLOW_MAX_STEP_KEY = "otherProjectWizardMaxStep";



export default function ProjectWizard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isOtherProfileSaved =
    sessionStorage.getItem("projectWizardReturnMode") === "other" &&
    (location.state?.promoterType === "other" ||
      sessionStorage.getItem("promoterType") === "other");
  const otherMaxUnlockedStep = Math.max(
    Number(sessionStorage.getItem(OTHER_FLOW_MAX_STEP_KEY) || 1),
    isOtherProfileSaved ? 2 : 1
  );
  const [currentScreen, setCurrentScreen] = useState("instructions");
  const [step, setStep] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [applicationType, setApplicationType] = useState("new");

  const steps = [
    "Promoter Profile",
    "Project Details",
    "Development Details",
    "Associate Details",
    "Upload Documents",
    "Preview",
    "Payment",
    "Acknowledgment",
  ];

  const [formData, setFormData] = useState({
    applicationNo: "",
    promoterType: "other",
    panNumber: "",

    // Bank Details
    bankState: "",
    bankName: "",
    branchName: "",
    accountNo: "",
    accountHolder: "",
    ifsc: "",

    // Promoter Details
    name: "",
    fatherName: "",
    aadhaar: "",
    mobile: "",
    landline: "",
    email: "",
    promoterWebsite: "",
    stateUT: "",
    district: "",
    licenseNo: "",
    licenseDate: "",
    gstNum: "",

    // Other State Registration
    otherStateReg: "",
    reraRegNumber: "",
    reraState: "",
    registrationRevoked: "",
    revocationReason: "",

    // Organisation Details (New)
    typeOfPromoter: "",
    organizationName: "",
    cinNumber: "",
    registrationDate: "",
    authorizedSignatoryName: "",
    authorizedSignatoryEmail: "",
    // Reuse: gstNum, panNumber, stateUT, district, promoterWebsite

    // Organisation Member Details (New)
    orgMemberIsIndian: "indian",
    orgMemberName: "",
    orgMemberDesignation: "",
    orgMemberMobile: "",
    orgMemberEmail: "",
    orgMemberAddressLine1: "",
    orgMemberAddressLine2: "",
    orgMemberState: "",
    orgMemberDistrict: "",
    orgMemberPinCode: "",
    orgMemberAadhaar: "",
    orgMemberPan: "",
    orgMemberDin: "",

    // RERA Refinements
    // registrationRevoked defaults to ""

    // Litigation Refinements
    interimOrder: "",
    finalOrderDetails: "",

    // Promoter 2 Refinements
    promoter2IsOrganization: "no",
    promoter2IsIndian: "indian",
    promoter2Name: "",
    promoter2State: "",
    promoter2District: "",
    promoter2AddressLine1: "",
    promoter2AddressLine2: "",
    promoter2PinCode: "",
    promoter2Mobile: "",
    promoter2Email: "",
    promoter2PanCard: "",
    promoter2Aadhaar: "",

    // Projects Last 5 Years
    lastFiveYears: "",
    projectName: "",
    projectType: "",
    currentStatus: "",
    projectAddress: "",
    projectStateUT: "",
    projectDistrict: "",
    pinCode: "",
    surveyNo: "",
    actualCompletionDate: "",
    expectedCompletionDate: "",

    // Litigations
    litigation: "",
    caseNo: "",
    tribunalPlace: "",
    petitionerName: "",
    respondentName: "",
    caseFacts: "",
    caseStatus: "",
    interimOrder: "",
    finalOrderDetails: "",

    // Promoter 2
    promoter2: "",
    promoter2IsOrganization: "",
    promoter2IsIndian: "",
    promoter2Name: "",
    promoter2AddressLine1: "",
    promoter2AddressLine2: "",
    promoter2Mobile: "",
    promoter2Email: "",
    promoter2PanCard: "",
  });
  const [otherDocuments, setOtherDocuments] = useState({});
  const [currentLitigationFiles, setCurrentLitigationFiles] = useState({
    interimOrderCertificateFile: null,
    disposedCertificateFile: null,
  });
  const [currentPromoter2File, setCurrentPromoter2File] = useState(null);

  const getSelectedFileName = (file) => (file?.name ? file.name : "");

  // ================= FILE VALIDATION =================
const validateFile = (file, type) => {
  if (!file) return true;

  const imageTypes = ["image/jpeg", "image/jpg", "image/png"];
  const pdfType = ["application/pdf"];

  if (type === "image" && !imageTypes.includes(file.type)) {
    alert("Only JPG/JPEG/PNG images allowed");
    return false;
  }

  if (type === "pdf" && !pdfType.includes(file.type)) {
    alert("Only PDF files allowed");
    return false;
  }

  return true;
};

const handleFileChange = (e, type, fieldName) => {
  const file = e.target.files[0];

  if (!validateFile(file, type)) {
    e.target.value = "";
    return;
  }

  if (!fieldName) {
    return;
  }

  if (fieldName === "interimOrderCertificateFile" || fieldName === "disposedCertificateFile") {
    setCurrentLitigationFiles((prev) => ({
      ...prev,
      [fieldName]: file || null,
    }));
    return;
  }

  if (fieldName === "promoter2DocumentFile") {
    setCurrentPromoter2File(file || null);
    return;
  }

  setOtherDocuments((prev) => ({
    ...prev,
    [fieldName]: file || null,
  }));
};


  // Arrays to store added entries
  const [reraEntries, setReraEntries] = useState([]);
  const [projectEntries, setProjectEntries] = useState([]);
  const [litigationEntries, setLitigationEntries] = useState([]);
  const [promoter2Entries, setPromoter2Entries] = useState([]);
  const [orgMemberEntries, setOrgMemberEntries] = useState([]);

  React.useEffect(() => {
    const shouldReturnToPromoterProfile =
      location.state?.returnToPromoterProfile ||
      sessionStorage.getItem("projectWizardReturnMode") === "other";
    const promoterTypeFromState =
      location.state?.promoterType || sessionStorage.getItem("promoterType");
    const applicationNumber =
      location.state?.applicationNumber || sessionStorage.getItem("applicationNumber");

    if (!shouldReturnToPromoterProfile || promoterTypeFromState !== "other" || !applicationNumber) {
      return;
    }

    const loadSavedPromoterProfile = async () => {
      try {
        const data = await apiGet(`/api/other-t-indv/promoter/get/${applicationNumber}`);

        if (!data?.formData) {
          return;
        }

        setCurrentScreen("form");
        setShowDetails(true);

        setFormData((prev) => ({
          ...prev,
          ...data.formData,
          promoterType: "other",
          applicationNo: data.formData.applicationNo || applicationNumber,
        }));

        setReraEntries(Array.isArray(data.reraEntries) ? data.reraEntries : []);
        setProjectEntries(Array.isArray(data.projectEntries) ? data.projectEntries : []);
        setLitigationEntries(Array.isArray(data.litigationEntries) ? data.litigationEntries : []);
        setPromoter2Entries(Array.isArray(data.promoter2Entries) ? data.promoter2Entries : []);
        setOrgMemberEntries(Array.isArray(data.orgMemberEntries) ? data.orgMemberEntries : []);
        sessionStorage.setItem("projectWizardReturnMode", "other");
      } catch (error) {
        console.error("Failed to load promoter profile", error);
      }
    };

    loadSavedPromoterProfile();
  }, [location.state]);

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "panNumber" || name === "orgMemberPan" || name === "promoter2PanCard") {
    setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
    return;
  }

  if (name === "accountNo") {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 18) return;
  }

  if (name.toLowerCase().includes("mobile")) {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 10) return;
  }

  if (name.toLowerCase().includes("aadhaar")) {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 12) return;
  }

  if (name.toLowerCase().includes("pin")) {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 6) return;
  }

  if (name === "ifsc") {
    setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
    return;
  }

  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));
};
const handleSubmitInstructions = () => {
  sessionStorage.removeItem("projectWizardReturnMode");

  // ⭐ IF USER SELECTS EXISTING
  if (applicationType === "existing") {
    navigate("/projectregistrationexisting");
    return;
  }

  // ⭐ IF USER SELECTS NEW (YOUR CURRENT FLOW)
  setCurrentScreen("form");

  const appNo = `100126${Math.floor(Math.random() * 900000 + 100000)}`;

  setFormData((prev) => ({ ...prev, applicationNo: appNo }));

  sessionStorage.setItem("applicationNumber", appNo);
};


  const handleGetDetails = () => {
    if (!formData.panNumber) {
      alert("Please enter PAN Card Number");
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.panNumber)) {
      alert("Invalid PAN format");
      return;
    }

    // setShowDetails(true);
    // ✅ STORE PAN
    sessionStorage.setItem("panNumber", formData.panNumber);

    setShowDetails(true);

  };

  // Add RERA Entry
  const handleAddReraEntry = () => {
    if (!formData.reraRegNumber || !formData.reraState || !formData.registrationRevoked) {
      alert("Please fill all required RERA fields");
      return;
    }

    const newEntry = {
      id: Date.now(),
      reraRegNumber: formData.reraRegNumber,
      reraState: formData.reraState,
      registrationRevoked: formData.registrationRevoked,
      revocationReason: formData.revocationReason,
    };

    setReraEntries([...reraEntries, newEntry]);

    // Clear form
    setFormData(prev => ({
      ...prev,
      reraRegNumber: "",
      reraState: "",
      registrationRevoked: "",
      revocationReason: "",
    }));
  };

  // Delete RERA Entry
  const handleDeleteReraEntry = (id) => {
    setReraEntries(reraEntries.filter(entry => entry.id !== id));
  };

  // Add Project Entry
  const handleAddProjectEntry = () => {
    if (!formData.projectName || !formData.projectType || !formData.currentStatus || !formData.projectAddress) {
      alert("Please fill all required project fields");
      return;
    }

    const newEntry = {
      id: Date.now(),
      projectName: formData.projectName,
      projectType: formData.projectType,
      currentStatus: formData.currentStatus,
      projectAddress: formData.projectAddress,
      projectStateUT: formData.projectStateUT,
      projectDistrict: formData.projectDistrict,
      pinCode: formData.pinCode,
      surveyNo: formData.surveyNo,
    };

    setProjectEntries([...projectEntries, newEntry]);

    // Clear form
    setFormData(prev => ({
      ...prev,
      projectName: "",
      projectType: "",
      currentStatus: "",
      projectAddress: "",
      projectStateUT: "",
      projectDistrict: "",
      pinCode: "",
      surveyNo: "",
    }));
  };

  // Delete Project Entry
  const handleDeleteProjectEntry = (id) => {
    setProjectEntries(projectEntries.filter(entry => entry.id !== id));
  };

  // Add Litigation Entry
  const handleAddLitigationEntry = () => {
    if (!formData.caseNo || !formData.tribunalPlace || !formData.petitionerName || !formData.respondentName) {
      alert("Please fill all required litigation fields");
      return;
    }

    const newEntry = {
      id: Date.now(),
      caseNo: formData.caseNo,
      tribunalPlace: formData.tribunalPlace,
      petitionerName: formData.petitionerName,
      respondentName: formData.respondentName,
      caseFacts: formData.caseFacts,
      caseStatus: formData.caseStatus,
      interimOrder: formData.interimOrder,
      finalOrderDetails: formData.finalOrderDetails,
      interimOrderCertificateFile: currentLitigationFiles.interimOrderCertificateFile,
      disposedCertificateFile: currentLitigationFiles.disposedCertificateFile,
    };

    setLitigationEntries([...litigationEntries, newEntry]);

    // Clear form
    setFormData(prev => ({
      ...prev,
      caseNo: "",
      tribunalPlace: "",
      petitionerName: "",
      respondentName: "",
      caseFacts: "",
      caseStatus: "",
      interimOrder: "",
      finalOrderDetails: "",
    }));
    setCurrentLitigationFiles({
      interimOrderCertificateFile: null,
      disposedCertificateFile: null,
    });
  };

  // Delete Litigation Entry
  const handleDeleteLitigationEntry = (id) => {
    setLitigationEntries(litigationEntries.filter(entry => entry.id !== id));
  };

  // Add Promoter 2 Entry
  const handleAddPromoter2Entry = () => {
    if (!formData.promoter2Name || !formData.promoter2AddressLine1 || !formData.promoter2Mobile || !formData.promoter2Email || !formData.promoter2PanCard) {
      alert("Please fill all required Promoter 2 fields");
      return;
    }

    const newEntry = {
      id: Date.now(),
      promoter2IsOrganization: formData.promoter2IsOrganization,
      promoter2IsIndian: formData.promoter2IsIndian,
      promoter2Name: formData.promoter2Name,
      promoter2AddressLine1: formData.promoter2AddressLine1,
      promoter2AddressLine2: formData.promoter2AddressLine2,
      promoter2Mobile: formData.promoter2Mobile,
      promoter2Email: formData.promoter2Email,
      promoter2PanCard: formData.promoter2PanCard,
      promoter2State: formData.promoter2State,
      promoter2District: formData.promoter2District,
      promoter2PinCode: formData.promoter2PinCode,
      promoter2Aadhaar: formData.promoter2Aadhaar,
      promoter2DocumentFile: currentPromoter2File,
    };

    setPromoter2Entries([...promoter2Entries, newEntry]);

    // Clear form
    setFormData(prev => ({
      ...prev,
      promoter2IsOrganization: "",
      promoter2IsIndian: "",
      promoter2Name: "",
      promoter2AddressLine1: "",
      promoter2AddressLine2: "",
      promoter2Mobile: "",
      promoter2Email: "",
      promoter2PanCard: "",
      promoter2State: "",
      promoter2District: "",
      promoter2PinCode: "",
      promoter2Aadhaar: "",
    }));
    setCurrentPromoter2File(null);
  };

  // Delete Promoter 2 Entry
  const handleDeletePromoter2Entry = (id) => {
    setPromoter2Entries(promoter2Entries.filter(entry => entry.id !== id));
  };

  // Add Org Member Entry
  const handleAddOrgMemberEntry = () => {
    // Basic validation
    if (!formData.orgMemberName || !formData.orgMemberMobile || !formData.orgMemberEmail) {
      alert("Please fill all required member details");
      return;
    }

    const newEntry = {
      id: Date.now(),
      isIndian: formData.orgMemberIsIndian,
      name: formData.orgMemberName,
      designation: formData.orgMemberDesignation,
      mobile: formData.orgMemberMobile,
      email: formData.orgMemberEmail,
      address1: formData.orgMemberAddressLine1,
      address2: formData.orgMemberAddressLine2,
      state: formData.orgMemberState,
      district: formData.orgMemberDistrict,
      pinCode: formData.orgMemberPinCode,
      aadhaar: formData.orgMemberAadhaar,
      pan: formData.orgMemberPan,
      din: formData.orgMemberDin,
    };

    setOrgMemberEntries([...orgMemberEntries, newEntry]);

    // Clear fields
    setFormData(prev => ({
      ...prev,
      orgMemberName: "",
      orgMemberDesignation: "",
      orgMemberMobile: "",
      orgMemberEmail: "",
      orgMemberAddressLine1: "",
      orgMemberAddressLine2: "",
      orgMemberState: "",
      orgMemberDistrict: "",
      orgMemberPinCode: "",
      orgMemberAadhaar: "",
      orgMemberPan: "",
      orgMemberDin: "",
    }));
  };

  // Delete Org Member Entry
  const handleDeleteOrgMemberEntry = (id) => {
    setOrgMemberEntries(orgMemberEntries.filter(entry => entry.id !== id));
  };

  const handleSaveAndContinue = async () => {
    try {

      // ✅ Bank validation
      if (!formData.bankState || !formData.bankName || !formData.accountNo) {
        alert("Please fill all required bank details");
        return;
      }

      if (!/^\d{18}$/.test(formData.accountNo)) {
        alert("Account Number must be exactly 18 digits");
        return;
      }

      // ✅ Promoter validation
      if (formData.promoterType === "individual") {
        if (!formData.name || !formData.fatherName || !formData.aadhaar || !formData.mobile || !formData.email) {
          alert("Please fill all required promoter details");
          return;
        }
      } else {
        if (!formData.typeOfPromoter || !formData.organizationName || !formData.cinNumber || !formData.registrationDate || !formData.authorizedSignatoryMobile || !formData.authorizedSignatoryEmail) {
          alert("Please fill all required organisation details");
          return;
        }
      }

      if (!formData.otherStateReg || !formData.lastFiveYears || !formData.litigation || !formData.promoter2) {
        alert("Please answer all Yes/No questions");
        return;
      }

      // ✅ Promoter2 validation
      if (formData.promoter2 === "yes") {

        if (
          formData.promoter2Name ||
          formData.promoter2AddressLine1 ||
          formData.promoter2Mobile ||
          formData.promoter2Email ||
          formData.promoter2PanCard
        ) {
          alert("Please click ADD to save Promoter 2 details before continuing");
          return;
        }

        if (promoter2Entries.length === 0) {
          alert("Please fill and ADD Promoter 2 details");
          return;
        }
     

      }
      // Global validations (MOVE HERE)
if (!PAN_REGEX.test(formData.panNumber)) {
  alert("Invalid PAN Number");
  return;
}

if (formData.mobile && !MOBILE_REGEX.test(formData.mobile)) {
  alert("Invalid Mobile Number");
  return;
}

if (formData.ifsc && !IFSC_REGEX.test(formData.ifsc)) {
  alert("Invalid IFSC Code");
  return;
}

if (formData.aadhaar && !AADHAAR_REGEX.test(formData.aadhaar)) {
  alert("Invalid Aadhaar Number");
  return;
}

if (!ACCOUNT_REGEX.test(formData.accountNo)) {
  alert("Account Number must be 18 digits");
  return;
}

if (formData.pinCode && !PIN_REGEX.test(formData.pinCode)) {
  alert("Invalid PIN Code");
  return;
}


      // 🔥 SEND TO BACKEND (ONLY ONE TRY BLOCK)
      if (formData.promoterType === "individual") {
        await apiPost("/api/project-registration-wizard", formData);
      } else {
        const payload = new FormData();
        const promoter2Payload = promoter2Entries.map((entry) => {
          const { promoter2DocumentFile, ...rest } = entry;
          return rest;
        });
        const litigationPayload = litigationEntries.map((entry) => {
          const {
            interimOrderCertificateFile,
            disposedCertificateFile,
            ...rest
          } = entry;
          return rest;
        });

        Object.entries(formData).forEach(([key, value]) => {
          payload.append(key, value ?? "");
        });

        payload.append("promoter2Entries", JSON.stringify(promoter2Payload));
        payload.append("orgMemberEntries", JSON.stringify(orgMemberEntries));
        payload.append("reraEntries", JSON.stringify(reraEntries));
        payload.append("projectEntries", JSON.stringify(projectEntries));
        payload.append("litigationEntries", JSON.stringify(litigationPayload));

        Object.entries(otherDocuments).forEach(([key, file]) => {
          if (file) {
            payload.append(key, file);
          }
        });

        promoter2Entries.forEach((entry, index) => {
          if (entry.promoter2DocumentFile) {
            payload.append(`promoter2DocumentFile_${index}`, entry.promoter2DocumentFile);
          }
        });

        litigationEntries.forEach((entry, index) => {
          if (entry.interimOrderCertificateFile) {
            payload.append(`litigationInterimOrderFile_${index}`, entry.interimOrderCertificateFile);
          }
          if (entry.disposedCertificateFile) {
            payload.append(`litigationDisposedFile_${index}`, entry.disposedCertificateFile);
          }
        });

        await apiPost("/api/other-t-indv/promoter/save", payload);
      }

      alert("Form saved successfully in DB!");

      sessionStorage.setItem("panNumber", formData.panNumber);
      sessionStorage.setItem("applicationNumber", formData.applicationNo);

      // ✅ CONDITIONAL REDIRECT
      if (formData.promoterType === "other") {
        sessionStorage.setItem("projectWizardReturnMode", "other");
        sessionStorage.setItem(OTHER_FLOW_MAX_STEP_KEY, "2");
        navigate("/other-than-individual-project-details", {
          state: {
            panNumber: formData.panNumber,
            applicationNumber: formData.applicationNo,
          },
        });
      } else {
        // DO NOT TOUCH individual flow
        navigate("/project-details", {
          state: {
            panNumber: formData.panNumber,
            applicationNumber: formData.applicationNo,
          },
        });
      }


    } catch (error) {
      console.error(error);
      alert(
        "Failed to save form: " +
        (error.response?.data?.error || error.message)
      );
    }
  };

  // Instructions Screen
  if (currentScreen === "instructions") {
    return (
      <div className="projwizard-page">
        <div className="projwizard-card">
          <h2 className="projwizard-main-title">Project Registration</h2>

          <h3 className="projwizard-instruction-heading">General Instructions :</h3>

          <ol className="projwizard-instruction-list">
            <li>This is not a mobile App (however can be viewed on mobile screen) so kindly use laptop/desktop for use of this site.</li>
            <li>Clear the cookies before filling the online form</li>
            <li>Remove pop-up block from your browser</li>
            <li>Photograph - Passport size (35mm x 45mm, 300 DPI, Straight view/Light background) and in JPEG format.</li>
            <li>All the documents that are to be uploaded in the application should be in PDF format and should not be password protected, Drawings in DWG format and self-attested (every page of every document).</li>
            <li>Site best viewed in "Google Chrome (Version 62.0.3202.94)"</li>
            <li>Fields marked with *are mandatory.</li>
          </ol>

          <h3 className="projwizard-instruction-heading">Guide to fill online registration form :</h3>

          <ol className="projwizard-instruction-list">
            <li>Many details are required for the registration of project which involves information regarding promoter, Promoter 2, plan approvals, Time schedule, Location details of project, Bank account of the project, Associate details etc</li>
            <li>For step by step understanding of filing online application, kindly refer <Link to="/guidelinesRegistration" className="projwizard-link">Guidelines for Registration</Link> page.</li>
            <li>Select "New" as application type, if you are a new applicant.</li>
            <li>Select "Existing" as application type, if application was incomplete / Shortfall / Withdraw / Change Request</li>
            <li>The entire form is divided to various parts with "Save and Continue" facilities for each part</li>
            <li><strong style={{ color: 'red' }}>List of Address Proof:</strong> Aadhaar/Ration Card/Bank Book/Driving License/Voter Id/Gas/Phone Bill/Passport (Any one)</li>
            <li><a href="../../../public/assets/pdfs/Checklist-Project.pdf"target="_blank" 
  rel="noopener noreferrer" className="projwizard-link">Click Here</a> for the list of supporting documents, their respective file formats that are needed to be attached with the Project Registration Application Form</li>
            <li><Link to="/feecalculater" className="projwizard-link">Fee Calculator</Link></li>
          </ol>

          <div className="projwizard-application-type-section">
            <label className="projwizard-app-type-label">Application Type*</label>
            <div className="projwizard-radio-group">
              <label>
                <input
                  type="radio"
                  name="applicationType"
                  value="new"
                  checked={applicationType === "new"}
                  onChange={(e) => setApplicationType(e.target.value)}
                />
                {" "}New
              </label>
              <label>
                <input
                  type="radio"
                  name="applicationType"
                  value="existing"
                  checked={applicationType === "existing"}
                  onChange={(e) => setApplicationType(e.target.value)}
                />
                {" "}Existing
              </label>
            </div>
          </div>

          <div className="projwizard-submit-button-container">
            <button className="projwizard-submit-btn" onClick={handleSubmitInstructions}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dynamic Organisation Labels
  const orgConfig = {
    "Company": { idLabel: "CIN Number", dateLabel: "Date of Registration", uploadLabel: "Upload Memorandum of Articles/Bye-laws", memberTitle: "Company Director(S) Details", showDin: true, showAadhaar: false },
    "Partnership Firm": { idLabel: "Firm Number", dateLabel: "Firm Registration Date", uploadLabel: "Upload Partnership Deed", memberTitle: "Partnership Member(S) Details", showDin: false, showAadhaar: false },
    "LLP": { idLabel: "LLP Number", dateLabel: "Firm Registration Date", uploadLabel: "Upload LLP Deed", memberTitle: "LLP Partner(S) Details", showDin: false, showAadhaar: false },
    "Trust/Society": { idLabel: "Trust/Society Number", dateLabel: "Trust/Society Registration Date", uploadLabel: "Upload Trust Deed/Society Bye-laws", memberTitle: "Trust/Society Member(S) Details", showDin: false, showAadhaar: false },
    "Government Department/Local Bodies": { idLabel: "TAN Number", dateLabel: "Date of Registration", uploadLabel: "Upload Government Order", memberTitle: "Government Department/Local Bodies Member(S) Details", showDin: false, showAadhaar: true },
    "Joint Venture": { idLabel: "Joint Venture Number", dateLabel: "Date of Registration", uploadLabel: "Upload Memorandum of Articles/Bye-laws", memberTitle: "Joint Venture Director(S) Details", showDin: true, showAadhaar: false },
    "default": { idLabel: "Registration Number", dateLabel: "Date of Registration", uploadLabel: "Upload Registration Document", memberTitle: "Member(S) Details", showDin: false, showAadhaar: false }
  };

  const currentOrgConfig = orgConfig[formData.typeOfPromoter] || orgConfig["default"];

  // Main Form Screen
  return (
    <div className="projwizard-page">
      <div className="projwizard-card">
        {/* BREADCRUMB */}
        <div className="projwizard-breadcrumb">
          You are here : <span>Home</span> / <span>Registration</span> / Project Registration
        </div>

        <h2 className="projwizard-title">Project Registration</h2>
        <div className="projwizard-header-line"></div>

        {/* STEPPER */}
        <div className="projwizard-stepper">
          {steps.map((label, index) => {
            const num = index + 1;
            const targetStep = OTHERTHANINDIVIDUALWIZARD_STEPS[index];
            const canOpenStep = num <= otherMaxUnlockedStep;

            return (
              <div
                key={index}
                className="projwizard-step-item"
                onClick={() => {
                  if (!canOpenStep || !targetStep) {
                    return;
                  }

                  if (num === 1) {
                    return;
                  }

                  navigate(targetStep.path, {
                    state: {
                      panNumber:
                        location.state?.panNumber || sessionStorage.getItem("panNumber") || "",
                      applicationNumber:
                        location.state?.applicationNumber ||
                        sessionStorage.getItem("applicationNumber") ||
                        "",
                      promoterType: "other",
                      typeOfPromoter:
                        location.state?.typeOfPromoter ||
                        sessionStorage.getItem("typeOfPromoter") ||
                        "",
                    },
                  });
                }}
                style={{ cursor: canOpenStep ? "pointer" : "default" }}
              >
                <div
                  className={`projwizard-step-circle ${step === num ? "projwizard-active" : ""
                    }`}
                >
                  {num}
                </div>
                <div className="projwizard-step-label">
                  {label.split(" ").map((w, i) => (
                    <div key={i}>{w}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FORM BODY */}
        <div className="projwizard-form-body">

          {/* APPLICATION NUMBER */}
          <div className="projwizard-section-block">
            <h3 className="projwizard-h3">Application Number</h3>
            <div className="projwizard-section-line"></div>

            <label className="projwizard-field-label">Application Number*</label>
            <input
              type="text"
              name="applicationNo"
              value={formData.applicationNo}
              readOnly
              className="projwizard-text-input"
              style={{ width: "300px" }}
            />
          </div>

          {/* PROMOTER TYPE */}
          <div className="projwizard-section-block">
            <h3 className="projwizard-h3">Promoter Type</h3>
            <div className="projwizard-section-line"></div>

            <div className="projwizard-radio-row">
              <label>
                <input
                  type="radio"
                  name="promoterType"
                  value="individual"
                  checked={formData.promoterType === "individual"}
                  onChange={handleChange}
                  disabled={showDetails}
                />{" "}
                Individual
              </label>

              <label>
                <input
                  type="radio"
                  name="promoterType"
                  value="other"
                  checked={formData.promoterType === "other"}
                  onChange={handleChange}
                  disabled={showDetails}
                />{" "}
                Other than Individual
              </label>
            </div>
          </div>


          {/* PAN INPUT SECTION - MISSING FIX */}
          {!showDetails && (
            <div className="projwizard-section-block">
              <h3 className="projwizard-h3">Enter PAN Details</h3>
              <div className="projwizard-section-line"></div>
              <div className="projwizard-grid">
                <div className="field">
                  <label>PAN Number<span className="projwizard-required">*</span></label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="Enter PAN Number"
                  />
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <button className="projwizard-submit-btn" onClick={handleGetDetails}>Get Details</button>
              </div>
            </div>
          )}

          {/* SHOW AFTER GET DETAILS */}
          {showDetails && (
            <>
              {/* BANK DETAILS */}
              <div className="projwizard-section-block">
                <h3 className="projwizard-h3">
                  Designated Bank Account Details Of The Project
                </h3>
                <div className="projwizard-section-line"></div>

                <div className="projwizard-grid">
                  <div className="field">
                    <label>Bank State<span className="projwizard-required">*</span></label>
                    <select name="bankState" value={formData.bankState} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="AP">Andhra Pradesh</option>
                      <option value="TS">Telangana</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Bank Name<span className="projwizard-required">*</span></label>
                    <select name="bankName" value={formData.bankName} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>SBI</option>
                      <option>HDFC</option>
                      <option>ICICI</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Branch Name<span className="projwizard-required">*</span></label>
                    <select name="branchName" value={formData.branchName} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Ameerpet</option>
                      <option>Madhapur</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Account No<span className="projwizard-required">*</span></label>
                    <input
                      type="text"
                      name="accountNo"
                      value={formData.accountNo}
                      onChange={handleChange}
                      placeholder="Enter 18-digit Account Number"
                      maxLength={18}
                      inputMode="numeric"
                    />
                  </div>

                  <div className="field">
                    <label>Account Holder's Name as in Bank Pass Book<span className="projwizard-required">*</span></label>
                    <input type="text" name="accountHolder" value={formData.accountHolder} onChange={handleChange} placeholder="Account Holder's Name as in Bank Pass" />
                  </div>

                  <div className="field">
                    <label>IFSC Code<span className="projwizard-required">*</span></label>
                    <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="IFSC Code" />
                  </div>

                  <div className="field">
                    <label>Upload Bank Statement<span className="projwizard-required">*</span></label>
                    <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","bankStatementFile")} />
                    {getSelectedFileName(otherDocuments.bankStatementFile) && (
                      <div className="projwizard-uploaded-name">{getSelectedFileName(otherDocuments.bankStatementFile)}</div>
                    )}

                  </div>
                </div>
              </div>



              {/* INDIVIDUAL PROMOTER DETAILS */}
              {formData.promoterType === "individual" && showDetails && (
                <div className="projwizard-section-block">
                  <h3 className="projwizard-h3">Promoter Details</h3>
                  <div className="projwizard-section-line"></div>

                  <div className="projwizard-grid">
                    <div className="field">
                      <label>Name<span className="projwizard-required">*</span></label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                    </div>

                    <div className="field">
                      <label>Father Name<span className="projwizard-required">*</span></label>
                      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father Name" />
                    </div>

                    <div className="field">
                      <label>PAN Card Number<span className="projwizard-required">*</span></label>
                      <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="ODZPS3189E" readOnly />
                    </div>

                    <div className="field">
                      <label>Upload PAN Card<span className="projwizard-required">*</span></label>
                      <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf")} />

                    </div>

                    <div className="field">
                      <label>Aadhaar Number<span className="projwizard-required">*</span></label>
                      <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} placeholder="Aadhaar Number" />
                    </div>

                    <div className="field">
                      <label>Upload Aadhaar<span className="projwizard-required">*</span></label>
                      <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf")} />

                    </div>

                    <div className="field">
                      <label>Mobile Number <span className="projwizard-required">*</span></label>
                      <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" />
                    </div>

                    <div className="field">
                      <label>Landline Number</label>
                      <input type="text" name="landline" value={formData.landline} onChange={handleChange} placeholder="Landline Number" />
                    </div>

                    <div className="field">
                      <label>Email Id<span className="projwizard-required">*</span></label>
                      <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email Id" />
                    </div>

                    <div className="field">
                      <label>Promoter Website URL</label>
                      <input type="text" name="promoterWebsite" value={formData.promoterWebsite} onChange={handleChange} placeholder="Website" />
                    </div>

                    <div className="field">
                      <label>State/UT<span className="projwizard-required">*</span></label>
                      <select name="stateUT" value={formData.stateUT} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="TS">Telangana</option>
                      </select>
                    </div>

                    <div className="field">
                      <label>District<span className="projwizard-required">*</span></label>
                      <select name="district" value={formData.district} onChange={handleChange}>
                        <option value="">Select</option>
                        <option>Vijayawada</option>
                        <option>Guntur</option>
                      </select>
                    </div>

                    <div className="field">
                      <label>Upload Photograph<span className="projwizard-required">*</span></label>
                      <input type="file" accept=".jpg,.jpeg,.png"
onChange={(e)=>handleFileChange(e,"image")} />

                    </div>

                    <div className="field">
                      <label>License Number by the local bodies</label>
                      <input type="text" name="licenseNo" value={formData.licenseNo} onChange={handleChange} placeholder="License Number by the local bodies" />
                    </div>

                    <div className="field">
                      <label>License issued date</label>
                      <input type="date" name="licenseDate" value={formData.licenseDate} onChange={handleChange} placeholder="License issued date" />
                    </div>

                    <div className="field">
                      <label>Upload License certificate</label>
                      <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf")} />

                    </div>

                    <div className="field">
                      <label>GST Num</label>
                      <input type="text" name="gstNum" value={formData.gstNum} onChange={handleChange} placeholder="GST Num" />
                    </div>

                    <div className="field">
                      <label>Upload GST Num Document</label>
                      <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf")} />

                    </div>
                  </div>
                </div>
              )}

              {/* ORGANISATION DETAILS (OTHER) */}
              {formData.promoterType === "other" && showDetails && (
                <div className="projwizard-section-block">
                  <h3 className="projwizard-h3">Organisation Details</h3>
                  <div className="projwizard-section-line"></div>

                  <div className="projwizard-grid">
                    <div className="field">
                      <label>Type of Promoter<span className="projwizard-required">*</span></label>
                      <select name="typeOfPromoter" value={formData.typeOfPromoter} onChange={handleChange}>
                        <option value="">Select</option>
                        <option>Company</option>
                        <option>Partnership Firm</option>
                        <option>LLP</option>
                        <option>Trust/Society</option>
                        <option>Government Department/Local Bodies</option>
                        <option>Joint Venture</option>
                      </select>
                    </div>

                    <div className="field">
                      <label>Name of the Organisation<span className="projwizard-required">*</span></label>
                      <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} placeholder="Name of the Organisation" />
                    </div>

                    <div className="field">
                      <label>{currentOrgConfig.idLabel}<span className="projwizard-required">*</span></label>
                      <input type="text" name="cinNumber" value={formData.cinNumber} onChange={handleChange} placeholder={currentOrgConfig.idLabel} />
                    </div>

                    <div className="field">
                      <label>{currentOrgConfig.dateLabel}<span className="projwizard-required">*</span></label>
                      <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} />
                    </div>

                    <div className="field">
                      <label>{currentOrgConfig.uploadLabel}<span className="projwizard-required">*</span></label>
                      <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","organizationRegistrationFile")} />
                      {getSelectedFileName(otherDocuments.organizationRegistrationFile) && (
                        <div className="projwizard-uploaded-name">{getSelectedFileName(otherDocuments.organizationRegistrationFile)}</div>
                      )}

                    </div>

                    <div className="field">
                      <label>GST Num</label>
                      <input type="text" name="gstNum" value={formData.gstNum} onChange={handleChange} placeholder="GST Num" />
                    </div>

                    <div className="field">
                      <label>Upload GST Document</label>
                      <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","gstDocumentFile")} />
                      {getSelectedFileName(otherDocuments.gstDocumentFile) && (
                        <div className="projwizard-uploaded-name">{getSelectedFileName(otherDocuments.gstDocumentFile)}</div>
                      )}

                    </div>

                    <div className="field">
                      <label>PAN Card Number<span className="projwizard-required">*</span></label>
                      <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="PAN Card Number" readOnly />
                    </div>

                    <div className="field">
                      <label>Upload PAN Card<span className="projwizard-required">*</span></label>
                      <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","panCardFile")} />
                      {getSelectedFileName(otherDocuments.panCardFile) && (
                        <div className="projwizard-uploaded-name">{getSelectedFileName(otherDocuments.panCardFile)}</div>
                      )}

                    </div>

                    <div className="field">
                      <label>Upload Address Proof<span className="projwizard-required">*</span></label>
                      <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","addressProofFile")} />
                      {getSelectedFileName(otherDocuments.addressProofFile) && (
                        <div className="projwizard-uploaded-name">{getSelectedFileName(otherDocuments.addressProofFile)}</div>
                      )}

                    </div>

                    <div className="field">
                      <label>Mobile Number (Preferred Mobile No. of Authorized Signatory)<span className="projwizard-required">*</span></label>
                      <input type="text" name="authorizedSignatoryMobile" value={formData.authorizedSignatoryMobile} onChange={handleChange} placeholder="Mobile Number" />
                    </div>

                    <div className="field">
                      <label>Email Id<span className="projwizard-required">*</span></label>
                      <input type="text" name="authorizedSignatoryEmail" value={formData.authorizedSignatoryEmail} onChange={handleChange} placeholder="Email Id" />
                    </div>

                    <div className="field">
                      <label>Website</label>
                      <input type="text" name="promoterWebsite" value={formData.promoterWebsite} onChange={handleChange} placeholder="website" />
                    </div>

                    <div className="field">
                      <label>Landline Number</label>
                      <input type="text" name="authorizedSignatoryLandline" value={formData.authorizedSignatoryLandline} onChange={handleChange} placeholder="Landline Number" />
                    </div>

                    <div className="field">
                      <label>State/UT<span className="projwizard-required">*</span></label>
                      <select name="stateUT" value={formData.stateUT} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="TS">Telangana</option>
                      </select>
                    </div>

                    <div className="field">
                      <label>District<span className="projwizard-required">*</span></label>
                      <select name="district" value={formData.district} onChange={handleChange}>
                        <option value="">Select</option>
                        <option>Vijayawada</option>
                        <option>Guntur</option>
                      </select>
                    </div>
                  </div>

                  {/* DYNAMIC MEMBER SECTION - Only show if promoter type is selected and not default */}
                  {formData.typeOfPromoter && (
                    <>
                      <h3 className="projwizard-h3" style={{ marginTop: '30px', color: '#008CBA' }}>{currentOrgConfig.memberTitle}</h3>
                      <div className="projwizard-section-line"></div>

                      <div className="aprera-row">
                        <div className="aprera-radio">
                          <label>
                            <input type="radio" name="orgMemberIsIndian" value="indian" checked={formData.orgMemberIsIndian === "indian"} onChange={handleChange} /> Indian
                          </label>
                          <label>
                            <input type="radio" name="orgMemberIsIndian" value="foreigner" checked={formData.orgMemberIsIndian === "foreigner"} onChange={handleChange} /> Foreigner
                          </label>
                        </div>
                      </div>

                      <div className="projwizard-grid">
                        <div className="field">
                          <label>Name<span className="projwizard-required">*</span></label>
                          <input type="text" name="orgMemberName" value={formData.orgMemberName} onChange={handleChange} placeholder="Name" />
                        </div>

                        <div className="field">
                          <label>Designation<span className="projwizard-required">*</span></label>
                          <select name="orgMemberDesignation" value={formData.orgMemberDesignation} onChange={handleChange}>
                            <option value="">Select</option>
                            <option>Director</option>
                            <option>Partner</option>
                            <option>Member</option>
                            <option>Chairman</option>
                            <option>Secretary</option>
                          </select>
                        </div>

                        <div className="field">
                          <label>Mobile Number<span className="projwizard-required">*</span></label>
                          <input type="text" name="orgMemberMobile" value={formData.orgMemberMobile} onChange={handleChange} placeholder="Mobile Number" />
                        </div>

                        <div className="field">
                          <label>Email Id<span className="projwizard-required">*</span></label>
                          <input type="text" name="orgMemberEmail" value={formData.orgMemberEmail} onChange={handleChange} placeholder="Email Id" />
                        </div>

                        <div className="field">
                          <label>Address Line 1<span className="projwizard-required">*</span></label>
                          <input type="text" name="orgMemberAddressLine1" value={formData.orgMemberAddressLine1} onChange={handleChange} placeholder="Address Line 1" />
                        </div>

                        <div className="field">
                          <label>Address Line 2</label>
                          <input type="text" name="orgMemberAddressLine2" value={formData.orgMemberAddressLine2} onChange={handleChange} placeholder="Address Line 2" />
                        </div>

                        {/* INDIAN SPECIFIC FIELDS */}
                        {formData.orgMemberIsIndian === "indian" && (
                          <>
                            <div className="field">
                              <label>State/UT<span className="projwizard-required">*</span></label>
                              <select name="orgMemberState" value={formData.orgMemberState} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="AP">Andhra Pradesh</option>
                                <option value="TS">Telangana</option>
                              </select>
                            </div>

                            <div className="field">
                              <label>District<span className="projwizard-required">*</span></label>
                              <select name="orgMemberDistrict" value={formData.orgMemberDistrict} onChange={handleChange}>
                                <option value="">Select</option>
                                <option>Vijayawada</option>
                                <option>Guntur</option>
                              </select>
                            </div>

                            <div className="field">
                              <label>PIN Code<span className="projwizard-required">*</span></label>
                              <input type="text" name="orgMemberPinCode" value={formData.orgMemberPinCode} onChange={handleChange} placeholder="PIN Code" />
                            </div>
                          </>
                        )}

                        {/* DIN NUMBER Check */}
                        {currentOrgConfig.showDin && (
                          <div className="field">
                            <label>DIN Number<span className="projwizard-required">*</span></label>
                            <input type="text" name="orgMemberDin" value={formData.orgMemberDin} onChange={handleChange} placeholder="DIN Number" />
                          </div>
                        )}

                        {/* Aadhaar Check (Only if Indian OR Govt Body requires it explicitly) */}
                        {(formData.orgMemberIsIndian === "indian" || currentOrgConfig.showAadhaar) && (
                          <div className="field">
                            <label>Aadhaar Number<span className="projwizard-required">*</span></label>
                            <input type="text" name="orgMemberAadhaar" value={formData.orgMemberAadhaar} onChange={handleChange} placeholder="Aadhaar Number" />
                          </div>
                        )}

                        <div className="field">
                          <label>PAN Card Number<span className="projwizard-required">*</span></label>
                          <input type="text" name="orgMemberPan" value={formData.orgMemberPan} onChange={handleChange} placeholder="PAN Card Number" />
                        </div>

                        <div className="field">
                          <label>Upload PAN Card,AadhaarCard and Photograph<span className="projwizard-required">*</span> (.pdf format only)</label>
                          <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf")} />

                        </div>
                      </div>

                      <button type="button" className="projwizard-add-btn" onClick={handleAddOrgMemberEntry}>Add</button>
                      <div style={{ clear: 'both' }}></div>

                      {/* MEMBER TABLE */}
                      {orgMemberEntries.length > 0 && (
                        <table className="projwizard-doc-table" style={{ marginTop: '20px' }}>
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Name</th>
                              <th>Designation</th>
                              <th>Mobile</th>
                              <th>Email</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orgMemberEntries.map((entry, index) => (
                              <tr key={entry.id}>
                                <td>{index + 1}</td>
                                <td>{entry.name}</td>
                                <td>{entry.designation}</td>
                                <td>{entry.mobile}</td>
                                <td>{entry.email}</td>
                                <td>
                                  <button type="button" className="projwizard-delete-btn" onClick={() => handleDeleteOrgMemberEntry(entry.id)}>Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* OTHER STATE / UT */}
              <div className="projwizard-section-block aprera-section">
                <h3 className="projwizard-h3">Other State/UT RERA Registration Details</h3>
                <div className="projwizard-section-line"></div>

                <div className="aprera-row">
                  <div className="aprera-label">
                    Do you have any registration in other State/UT<span>*</span>
                  </div>
                  <div className="aprera-radio">
                    <label>
                      <input type="radio" name="otherStateReg" value="yes" checked={formData.otherStateReg === "yes"} onChange={handleChange} /> Yes
                    </label>
                    <label>
                      <input type="radio" name="otherStateReg" value="no" checked={formData.otherStateReg === "no"} onChange={handleChange} /> No
                    </label>
                  </div>
                </div>

                {/* CONDITIONAL: Show if otherStateReg is "yes" */}
                {formData.otherStateReg === "yes" && (
                  <div className="projwizard-conditional-section">
                    <div className="projwizard-grid">
                      <div className="field">
                        <label>RERA Registration Number<span className="projwizard-required">*</span></label>
                        <input type="text" name="reraRegNumber" value={formData.reraRegNumber} onChange={handleChange} placeholder="RERA Registration Number" />
                      </div>

                      <div className="field">
                        <label>State/UT<span className="projwizard-required">*</span></label>
                        <select name="reraState" value={formData.reraState} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="AP">Andhra Pradesh</option>
                          <option value="TS">Telangana</option>
                          <option value="KA">Karnataka</option>
                        </select>
                      </div>

                      <div className="field">
                        <label>Have your said registration been revoked?<span className="projwizard-required">*</span></label>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                          <label>
                            <input type="radio" name="registrationRevoked" value="yes" checked={formData.registrationRevoked === "yes"} onChange={handleChange} /> Yes
                          </label>
                          <label>
                            <input type="radio" name="registrationRevoked" value="no" checked={formData.registrationRevoked === "no"} onChange={handleChange} /> No
                          </label>
                        </div>
                      </div>

                      {formData.registrationRevoked === "yes" && (
                        <div className="field">
                          <label>Reason for Revocation<span className="projwizard-required">*</span></label>
                          <input type="text" name="revocationReason" value={formData.revocationReason} onChange={handleChange} placeholder="Reason for Revocation" />
                        </div>
                      )}
                    </div>
                    <button type="button" className="projwizard-add-btn" onClick={handleAddReraEntry}>Add</button>
                    <div style={{ clear: 'both' }}></div>

                    {/* RERA ENTRIES TABLE */}
                    {reraEntries.length > 0 && (
                      <table className="projwizard-doc-table" style={{ marginTop: '20px' }}>
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th>RERA Registration Number</th>
                            <th>State/UT</th>
                            <th>Have your said registration been revoked?</th>
                            <th>Reason for Revocation</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reraEntries.map((entry, index) => (
                            <tr key={entry.id}>
                              <td>{index + 1}</td>
                              <td>{entry.reraRegNumber}</td>
                              <td>{entry.reraState}</td>
                              <td>{entry.registrationRevoked === "yes" ? "Yes" : "No"}</td>
                              <td>{entry.revocationReason}</td>
                              <td>
                                <button
                                  type="button"
                                  className="projwizard-delete-btn"
                                  onClick={() => handleDeleteReraEntry(entry.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>

              {/* PROJECTS LAST 5 YEARS */}
              <div className="projwizard-section-block aprera-section">
                <h3 className="projwizard-h3">Projects Launched In The Past 5 Years</h3>
                <div className="projwizard-section-line"></div>

                <div className="aprera-row">
                  <div className="aprera-label">
                    Last five years project details<span>*</span>
                  </div>
                  <div className="aprera-radio">
                    <label>
                      <input type="radio" name="lastFiveYears" value="yes" checked={formData.lastFiveYears === "yes"} onChange={handleChange} /> Yes
                    </label>
                    <label>
                      <input type="radio" name="lastFiveYears" value="no" checked={formData.lastFiveYears === "no"} onChange={handleChange} /> No
                    </label>
                  </div>
                </div>

                {/* CONDITIONAL: Show if lastFiveYears is "yes" */}
                {formData.lastFiveYears === "yes" && (
                  <div className="projwizard-conditional-section">
                    <p className="aprera-note-red">Note : Only if it is by the same Promoter/Firm then the following information has to be given</p>

                    <div className="projwizard-grid">
                      <div className="field">
                        <label>Project Name<span className="projwizard-required">*</span></label>
                        <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Project Name" />
                      </div>

                      <div className="field">
                        <label>Project Type<span className="projwizard-required">*</span></label>
                        <select name="projectType" value={formData.projectType} onChange={handleChange}>
                          <option value="">Select</option>
                          <option>Residential</option>
                          <option>Commercial</option>
                          <option>Mixed Use</option>
                        </select>
                      </div>

                      <div className="field">
                        <label>Current Status<span className="projwizard-required">*</span></label>
                        <select name="currentStatus" value={formData.currentStatus} onChange={handleChange}>
                          <option value="">Select</option>
                          <option>Completed</option>
                          <option>Delay</option>
                          <option>Under Development</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Address<span className="projwizard-required">*</span></label>
                        <input type="text" name="projectAddress" value={formData.projectAddress} onChange={handleChange} placeholder="Address" />
                      </div>

                      <div className="field">
                        <label>State/UT<span className="projwizard-required">*</span></label>
                        <select name="projectStateUT" value={formData.projectStateUT} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="AP">Andhra Pradesh</option>
                          <option value="TS">Telangana</option>
                        </select>
                      </div>

                      <div className="field">
                        <label>District<span className="projwizard-required">*</span></label>
                        <select name="projectDistrict" value={formData.projectDistrict} onChange={handleChange}>
                          <option value="">Select</option>
                          <option>Vijayawada</option>
                          <option>Guntur</option>
                        </select>
                      </div>

                      <div className="field">
                        <label>PIN Code<span className="projwizard-required">*</span></label>
                        <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="PIN Code" />
                      </div>

                      <div className="field">
                        <label>Survey No & Revenue Village</label>
                        <input type="text" name="surveyNo" value={formData.surveyNo} onChange={handleChange} placeholder="Survey No" />
                      </div>

                      {/* CONDITIONAL FIELDS BASED ON CURRENT STATUS */}
                      {formData.currentStatus === "Completed" && (
                        <>
                          <div className="field">
                            <label>Actual Completion date<span className="projwizard-required">*</span></label>
                            <input type="date" name="actualCompletionDate" value={formData.actualCompletionDate} onChange={handleChange} placeholder="Completion date" />
                          </div>
                          <div className="field">
                            <label>Upload Project Occupancy Certificate<span className="projwizard-required">*</span></label>
                            <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf")} />

                          </div>
                        </>
                      )}

                      {formData.currentStatus === "Delay" && (
                        <div className="field">
                          <label>Expected Completion date<span className="projwizard-required">*</span></label>
                          <input type="date" name="expectedCompletionDate" value={formData.expectedCompletionDate} onChange={handleChange} placeholder="Completion date" />
                        </div>
                      )}

                      {formData.currentStatus === "Under Development" && (
                        <div className="field">
                          <label>Actual Completion date<span className="projwizard-required">*</span></label>
                          <input type="date" name="actualCompletionDate" value={formData.actualCompletionDate} onChange={handleChange} placeholder="Completion date" />
                        </div>
                      )}
                    </div>
                    <button type="button" className="projwizard-add-btn" onClick={handleAddProjectEntry}>Add</button>
                    <div style={{ clear: 'both' }}></div>

                    {/* PROJECT ENTRIES TABLE */}
                    {projectEntries.length > 0 && (
                      <table className="projwizard-doc-table" style={{ marginTop: '20px' }}>
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th>Project Name</th>
                            <th>Project Type</th>
                            <th>Current Status</th>
                            <th>Address</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectEntries.map((entry, index) => (
                            <tr key={entry.id}>
                              <td>{index + 1}</td>
                              <td>{entry.projectName}</td>
                              <td>{entry.projectType}</td>
                              <td>{entry.currentStatus}</td>
                              <td>{entry.projectAddress}</td>
                              <td>
                                <button
                                  type="button"
                                  className="projwizard-delete-btn"
                                  onClick={() => handleDeleteProjectEntry(entry.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>

              {/* LITIGATIONS */}
              <div className="projwizard-section-block aprera-section">
                <h3 className="projwizard-h3">Litigations</h3>
                <div className="projwizard-section-line"></div>

                <div className="aprera-row">
                  <div className="aprera-label">
                    Any Civil/Criminal Cases<span>*</span>
                  </div>
                  <div className="aprera-radio">
                    <label>
                      <input type="radio" name="litigation" value="yes" checked={formData.litigation === "yes"} onChange={handleChange} /> Yes
                    </label>
                    <label>
                      <input type="radio" name="litigation" value="no" checked={formData.litigation === "no"} onChange={handleChange} /> No
                    </label>
                  </div>
                </div>

                {/* CONDITIONAL: Show if litigation is "yes" */}
                {formData.litigation === "yes" && (
                  <div className="projwizard-conditional-section">
                    <p className="aprera-note-red">Note : In case Petitioner/Respondent are more than one, Please provide their names by comma separated.</p>

                    <div className="projwizard-grid">
                      <div className="field">
                        <label>Case No.<span className="projwizard-required">*</span></label>
                        <input type="text" name="caseNo" value={formData.caseNo} onChange={handleChange} placeholder="Case No." />
                      </div>

                      <div className="field">
                        <label>Name & Place of Tribunal/Authority<span className="projwizard-required">*</span></label>
                        <input type="text" name="tribunalPlace" value={formData.tribunalPlace} onChange={handleChange} placeholder="Name & Place of Tribunal/Authority" />
                      </div>

                      <div className="field">
                        <label>Name of the Petitioner<span className="projwizard-required">*</span></label>
                        <input type="text" name="petitionerName" value={formData.petitionerName} onChange={handleChange} placeholder="Name of the Petitioner" />
                      </div>

                      <div className="field">
                        <label>Name of the Respondent<span className="projwizard-required">*</span></label>
                        <input type="text" name="respondentName" value={formData.respondentName} onChange={handleChange} placeholder="Name of the Respondent" />
                      </div>

                      <div className="field">
                        <label>Facts of the case/contents of the Petition<span className="projwizard-required">*</span></label>
                        <textarea name="caseFacts" value={formData.caseFacts} onChange={handleChange} placeholder="Facts of the case/contents of the Petition"></textarea>
                      </div>

                      <div className="field">
                        <label>Present status of the case<span className="projwizard-required">*</span></label>
                        <select name="caseStatus" value={formData.caseStatus} onChange={handleChange}>
                          <option value="">Select</option>
                          <option>Completed</option>
                          <option>Delayed</option>
                          <option>Under Development</option>
                        </select>
                      </div>

                      <div className="field">
                        <label>Interim Order if any<span className="projwizard-required">*</span></label>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                          <label>
                            <input type="radio" name="interimOrder" value="yes" checked={formData.interimOrder === "yes"} onChange={handleChange} /> Yes
                          </label>
                          <label>
                            <input type="radio" name="interimOrder" value="no" checked={formData.interimOrder === "no"} onChange={handleChange} /> No
                          </label>
                        </div>
                      </div>

                      {/* CONDITIONAL: Show Interim Order Certificate only if "yes" */}
                      {formData.interimOrder === "yes" && (
                        <div className="field">
                          <label>Interim Order Certificate<span className="projwizard-required">*</span></label>
                          <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","interimOrderCertificateFile")} />
                          {getSelectedFileName(currentLitigationFiles.interimOrderCertificateFile) && (
                            <div className="projwizard-uploaded-name">{getSelectedFileName(currentLitigationFiles.interimOrderCertificateFile)}</div>
                          )}

                        </div>
                      )}

                      <div className="field">
                        <label>Details of final order if disposed<span className="projwizard-required">*</span></label>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                          <label>
                            <input type="radio" name="finalOrderDetails" value="yes" checked={formData.finalOrderDetails === "yes"} onChange={handleChange} /> Yes
                          </label>
                          <label>
                            <input type="radio" name="finalOrderDetails" value="no" checked={formData.finalOrderDetails === "no"} onChange={handleChange} /> No
                          </label>
                        </div>
                      </div>

                      {/* CONDITIONAL: Show Disposed Certificate only if "yes" */}
                      {formData.finalOrderDetails === "yes" && (
                        <div className="field">
                          <label>Disposed Certificate<span className="projwizard-required">*</span></label>
                          <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","disposedCertificateFile")} />
                          {getSelectedFileName(currentLitigationFiles.disposedCertificateFile) && (
                            <div className="projwizard-uploaded-name">{getSelectedFileName(currentLitigationFiles.disposedCertificateFile)}</div>
                          )}

                        </div>
                      )}
                    </div>
                    <button type="button" className="projwizard-add-btn" onClick={handleAddLitigationEntry}>Add</button>
                    <div style={{ clear: 'both' }}></div>

                    {/* LITIGATION ENTRIES TABLE */}
                    {litigationEntries.length > 0 && (
                      <table className="projwizard-doc-table" style={{ marginTop: '20px' }}>
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th>Case No.</th>
                            <th>Tribunal/Authority</th>
                            <th>Petitioner</th>
                            <th>Respondent</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {litigationEntries.map((entry, index) => (
                            <tr key={entry.id}>
                              <td>{index + 1}</td>
                              <td>{entry.caseNo}</td>
                              <td>{entry.tribunalPlace}</td>
                              <td>{entry.petitionerName}</td>
                              <td>{entry.respondentName}</td>
                              <td>
                                <button
                                  type="button"
                                  className="projwizard-delete-btn"
                                  onClick={() => handleDeleteLitigationEntry(entry.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* IF NO → SHOW SELF DECLARED AFFIDAVIT */}
                {formData.litigation === "no" && (
                  <div className="projwizard-conditional-section">
                    <p className="aprera-note-red">
                      Note : "A self declared affidavit (on Rs.20 non judicial stamp paper) has to be uploaded if there are no cases pending, refer form P10 in forms download for proforma of this Self Affidavit."
                    </p>

                    <div className="projwizard-grid">
                      <div className="field">
                        <label>
                          Self Declared Affidavit<span className="projwizard-required">*</span>
                        </label>
                        <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","selfAffidavitFile")} />
                        {getSelectedFileName(otherDocuments.selfAffidavitFile) && (
                          <div className="projwizard-uploaded-name">{getSelectedFileName(otherDocuments.selfAffidavitFile)}</div>
                        )}

                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PROMOTER 2 DETAILS */}
              <div className="projwizard-section-block aprera-section">
                <h3 className="projwizard-h3">
                  Promoter 2 Details (Land Owners - Only If Sale Transaction Is Involved)
                </h3>
                <div className="projwizard-section-line"></div>

                <div className="aprera-row">
                  <div className="aprera-label">
                    Promoter 2 Details<span>*</span>
                  </div>
                  <div className="aprera-radio">
                    <label>
                      <input type="radio" name="promoter2" value="yes" checked={formData.promoter2 === "yes"} onChange={handleChange} /> Yes
                    </label>
                    <label>
                      <input type="radio" name="promoter2" value="no" checked={formData.promoter2 === "no"} onChange={handleChange} /> No
                    </label>
                  </div>
                </div>

                {/* CONDITIONAL: Show if promoter2 is "yes" */}
                {formData.promoter2 === "yes" && (
                  <div className="projwizard-conditional-section">
                    <div className="aprera-row" style={{ marginTop: '20px' }}>
                      <div className="aprera-label">
                        Is Promoter 2 is Organization
                      </div>
                      <div className="aprera-radio">
                        <label>
                          <input type="radio" name="promoter2IsOrganization" value="yes" checked={formData.promoter2IsOrganization === "yes"} onChange={handleChange} /> Yes
                        </label>
                        <label>
                          <input type="radio" name="promoter2IsOrganization" value="no" checked={formData.promoter2IsOrganization === "no"} onChange={handleChange} /> No
                        </label>
                      </div>
                    </div>

                    <div className="aprera-row" style={{ marginTop: '15px' }}>
                      <div className="aprera-label">
                        Is Promoter 2 is
                      </div>
                      <div className="aprera-radio">
                        <label>
                          <input type="radio" name="promoter2IsIndian" value="indian" checked={formData.promoter2IsIndian === "indian"} onChange={handleChange} /> Indian
                        </label>
                        <label>
                          <input type="radio" name="promoter2IsIndian" value="foreigner" checked={formData.promoter2IsIndian === "foreigner"} onChange={handleChange} /> Foreigner
                        </label>
                      </div>
                    </div>

                    {/* ORGANIZATION FLOW */}
                    {formData.promoter2IsOrganization === "yes" && (
                      <div className="projwizard-grid" style={{ marginTop: '20px' }}>
                        <div className="field">
                          <label>Organization Name<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2Name" value={formData.promoter2Name} onChange={handleChange} placeholder="Name" />
                        </div>

                        <div className="field">
                          <label>State/UT<span className="projwizard-required">*</span></label>
                          <select name="promoter2State" value={formData.promoter2State} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="AP">Andhra Pradesh</option>
                            <option value="TS">Telangana</option>
                          </select>
                        </div>

                        <div className="field">
                          <label>District<span className="projwizard-required">*</span></label>
                          <select name="promoter2District" value={formData.promoter2District} onChange={handleChange}>
                            <option value="">Select</option>
                            <option>Vijayawada</option>
                            <option>Guntur</option>
                          </select>
                        </div>

                        <div className="field">
                          <label>Address Line 1<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2AddressLine1" value={formData.promoter2AddressLine1} onChange={handleChange} placeholder="Address Line 1" />
                        </div>

                        <div className="field">
                          <label>Address Line 2</label>
                          <input type="text" name="promoter2AddressLine2" value={formData.promoter2AddressLine2} onChange={handleChange} placeholder="Address Line 2" />
                        </div>

                        <div className="field">
                          <label>PIN Code<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2PinCode" value={formData.promoter2PinCode} onChange={handleChange} placeholder="PIN Code" />
                        </div>

                        <div className="field">
                          <label>Mobile No<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2Mobile" value={formData.promoter2Mobile} onChange={handleChange} placeholder="Mobile No" />
                        </div>

                        <div className="field">
                          <label>Email ID<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2Email" value={formData.promoter2Email} onChange={handleChange} placeholder="Email ID" />
                        </div>

                        <div className="field">
                          <label>Organization PAN Card Number<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2PanCard" value={formData.promoter2PanCard} onChange={handleChange} placeholder="Pancard Number" />
                        </div>

                        <div className="field">
                          <label>Upload PAN Card and Photograph<span className="projwizard-required">*</span> (.pdf format only)</label>
                          <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","promoter2DocumentFile")} />
                          {getSelectedFileName(currentPromoter2File) && (
                            <div className="projwizard-uploaded-name">{getSelectedFileName(currentPromoter2File)}</div>
                          )}

                        </div>
                      </div>
                    )}

                    {/* INDIVIDUAL FLOW (Organization = No) */}
                    {formData.promoter2IsOrganization === "no" && (
                      <div className="projwizard-grid" style={{ marginTop: '20px' }}>
                        <div className="field">
                          <label>Name<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2Name" value={formData.promoter2Name} onChange={handleChange} placeholder="Name" />
                        </div>

                        <div className="field">
                          <label>State/UT<span className="projwizard-required">*</span></label>
                          <select name="promoter2State" value={formData.promoter2State} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="AP">Andhra Pradesh</option>
                            <option value="TS">Telangana</option>
                          </select>
                        </div>

                        <div className="field">
                          <label>District<span className="projwizard-required">*</span></label>
                          <select name="promoter2District" value={formData.promoter2District} onChange={handleChange}>
                            <option value="">Select</option>
                            <option>Vijayawada</option>
                            <option>Guntur</option>
                          </select>
                        </div>

                        <div className="field">
                          <label>Address Line 1<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2AddressLine1" value={formData.promoter2AddressLine1} onChange={handleChange} placeholder="Address Line 1" />
                        </div>

                        <div className="field">
                          <label>Address Line 2</label>
                          <input type="text" name="promoter2AddressLine2" value={formData.promoter2AddressLine2} onChange={handleChange} placeholder="Address Line 2" />
                        </div>

                        <div className="field">
                          <label>PIN Code<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2PinCode" value={formData.promoter2PinCode} onChange={handleChange} placeholder="PIN Code" />
                        </div>

                        <div className="field">
                          <label>Mobile No<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2Mobile" value={formData.promoter2Mobile} onChange={handleChange} placeholder="Mobile No" />
                        </div>

                        <div className="field">
                          <label>Email ID<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2Email" value={formData.promoter2Email} onChange={handleChange} placeholder="Email ID" />
                        </div>

                        <div className="field">
                          <label>Aadhaar No<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2Aadhaar" value={formData.promoter2Aadhaar} onChange={handleChange} placeholder="AadhaarNo" />
                        </div>

                        <div className="field">
                          <label>Pan Card No<span className="projwizard-required">*</span></label>
                          <input type="text" name="promoter2PanCard" value={formData.promoter2PanCard} onChange={handleChange} placeholder="Pancard Number" />
                        </div>

                        <div className="field">
                          <label>Upload PAN Card,AadhaarCard and Photograph<span className="projwizard-required">*</span> (.pdf format only)</label>
                          <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","promoter2DocumentFile")} />
                          {getSelectedFileName(currentPromoter2File) && (
                            <div className="projwizard-uploaded-name">{getSelectedFileName(currentPromoter2File)}</div>
                          )}
                        </div>
                      </div>
                    )}

                    <button type="button" className="projwizard-add-btn" onClick={handleAddPromoter2Entry}>Add</button>
                    <div style={{ clear: 'both' }}></div>

                    {/* PROMOTER 2 ENTRIES TABLE */}
                    {promoter2Entries.length > 0 && (
                      <table className="projwizard-doc-table" style={{ marginTop: '20px' }}>
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {promoter2Entries.map((entry, index) => (
                            <tr key={entry.id}>
                              <td>{index + 1}</td>
                              <td>{entry.promoter2Name}</td>
                              <td>{entry.promoter2AddressLine1}</td>
                              <td>{entry.promoter2Mobile}</td>
                              <td>{entry.promoter2Email}</td>
                              <td>
                                <button
                                  type="button"
                                  className="projwizard-delete-btn"
                                  onClick={() => handleDeletePromoter2Entry(entry.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>

              {/* UPLOAD DOCUMENTS */}
              <div className="projwizard-section-block aprera-section">
                <h3 className="projwizard-h3">Upload Documents</h3>
                <div className="projwizard-section-line"></div>

                <p className="aprera-note">
                  <strong>Note :</strong> If the entity is registered below 3 years period, and if the IT returns are not available for 3 years period promoter has to upload the available IT returns and audit balance sheets of the entity with a specific reason, refer form P12 in forms download for proforma of this Sample Affidavit
                </p>

                <table className="projwizard-doc-table">
                  <thead>
                    <tr>
                      <th>Document Name</th>
                      <th>Upload Document</th>
                      <th>Uploaded Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Consolidated Income Tax Returns for the Past 3 Years<span className="projwizard-required">*</span></td>
                      <td>
                        <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","itrReturnsFile")} />
                        {getSelectedFileName(otherDocuments.itrReturnsFile) && (
                          <div className="projwizard-uploaded-name">{getSelectedFileName(otherDocuments.itrReturnsFile)}</div>
                        )}

                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Balance Sheet<span className="projwizard-required">*</span></td>
                      <td>
                        <input type="file" accept=".pdf"
onChange={(e)=>handleFileChange(e,"pdf","balanceSheetFile")} />
                        {getSelectedFileName(otherDocuments.balanceSheetFile) && (
                          <div className="projwizard-uploaded-name">{getSelectedFileName(otherDocuments.balanceSheetFile)}</div>
                        )}

                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="projwizard-save-container">
                <button className="projwizard-save-btn" onClick={handleSaveAndContinue}>
                  Save And Continue
                </button>
              </div>
            </>
          )}

          {/* PAN SECTION - ONLY SHOW BEFORE GET DETAILS */}



        </div>
      </div >
    </div >
  );
}
