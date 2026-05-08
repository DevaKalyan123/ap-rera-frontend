// ProjectPreview.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectWizard from "../components/ProjectWizard";
import "../styles/ProjectPreview.css";
import "../styles/aprera-print-override.css";
import { apiGet, apiPost, BASE_URL } from "../api/api";
import axios from "axios";


// ✅ HELPERS (ADD HERE)
const formatDate = (value) => {
  if (!value) return "N/A";
  try {
    return new Date(value).toLocaleDateString("en-GB"); // DD-MM-YYYY
  } catch {
    return value;
  }
};
// ✅ APRERA DOCUMENT TYPE MASTER (ADD HERE)
const DOCUMENT_MASTER = [
  { id: 1, mandatory: true, text: "Copies of the registered ownership documents / Pattadhar pass books issued by Revenue department along with link documents and authorization letter given by the Land Owner (refer Form P20 in form download)." },

  { id: 2, mandatory: true, text: "Copies of the combined field sketches showing the Survey Number boundaries, Subdivision boundaries, and Layout boundaries duly marking the Geo-Coordinates at every corner of the site." },

  { id: 3, mandatory: true, text: "Detailed site plan showing the measurements as on ground including diagonals along with Geo-Coordinates (Latitude and Longitude) at end points of the project site along with incorporation on Satellite Imagery." },

  { id: 4, mandatory: true, text: "Copy of the registered development agreement between the Owner of the land and the Promoter / Authorization letter given by the Land owner to undertake the construction of the building by the promoter." },

  { id: 5, mandatory: true, text: "Land Title search Report from an Advocate (include Advocate Enrolment Number) having experience of atleast ten years in land related matters." },

  { id: 6, mandatory: true, text: "Latest (by 30 days) Encumbrance certificate (for entire period of document) issued by the Registration and Stamps department." },

  { id: 7, mandatory: true, text: "Copy of the plan and proceedings issued by the competent Authority for approval of plans (TDR Bonds, if any)." },

  { id: 8, mandatory: true, text: "Approved plan / list of amenities proposed in the site." },

  { id: 9, mandatory: false, text: "NOC’s issued by Authority (where applicable viz., Airport Authority, Fire Department, Environmental Clearance, etc.)." },

  { id: 10, mandatory: true, text: "Detailed technical specifications of the construction of the buildings and facilities proposed in the project including brand details, specifications of infrastructure and details of fixtures and fittings (refer Form P18 in forms download)." },

  { id: 11, mandatory: false, text: "Topo Plan drawn to a scale with nearby land marks of the site." },

  { id: 12, mandatory: false, text: "Licenses / Enrolment form of Civil Contractors, or turnkey contractor, or EPC Contractors of the project (if any)." },

  { id: 13, mandatory: false, text: "Licenses / Enrolment form of Engineer or firm or company (if any)." },

  { id: 14, mandatory: false, text: "Licenses / Enrolment form of Chartered Accountant or firm or company." },

  { id: 15, mandatory: true, text: "Detailed estimate of the expenditure for construction of the building (refer Form P16 in forms download)." },

  { id: 16, mandatory: true, text: "Statement of source of funds for construction of building (refer Form P9 in forms download)." },

  { id: 17, mandatory: false, text: "Details of financial agreement made with any bank or other financial institution recognised by the Reserve Bank of India and of legal safeguards taken, if any, for the construction of building, or transfer of building by sale, gift or mortgage or otherwise (wherever applicable)." },

  { id: 18, mandatory: false, text: "Copy of documents showing details of mortgage or any other legal encumbrance created on land in favour of any bank or financial institution recognised by the RBI (where applicable)." },

  { id: 19, mandatory: true, text: "Proforma of the Allotment Letter proposed to be signed with the Allottee (refer Form P14 in forms download)." },

  { id: 20, mandatory: true, text: "Proforma of the Agreement for Sale proposed to be signed with the Allottee (refer Form P15 in forms download)." },

  { id: 21, mandatory: false, text: "Proforma of the Conveyance Deed proposed to be signed with the Allottee." },

  { id: 22, mandatory: true, text: "Structural Stability Certificate duly issued by Certified Structural Consultant (refer Form P19 in forms download)." },

  { id: 23, mandatory: false, text: "Copy of Insurance of title of the land." },

  { id: 24, mandatory: true, text: "FORM - B, Declaration, supported by an affidavit (on Rs.20 non judicial stamp paper), which shall be signed by the promoter or any person authorized by the promoter under Rule 3-B(2)(a) of AP Real Estate Rules-2017 (refer Form P11 in forms download)." },

  { id: 25, mandatory: false, text: "Details of the area mortgaged to the Competent Authority for approval of Plans / Mortgage Deed." }
];





const ProjectPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [devDetails, setDevDetails] = useState(null);


  const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(true);
    const [externalDevWork, setExternalDevWork] = useState({});

  const panNumber =
    location.state?.panNumber || sessionStorage.getItem("panNumber")||"LOVEP9898N";
  const applicationNumber =
    location.state?.applicationNumber ||
    sessionStorage.getItem("applicationNumber")||"100126657319";  

  useEffect(() => {
  if (!applicationNumber || !panNumber) {
    console.warn("Missing applicationNumber or panNumber");
    setLoading(false);
    // 🔁 Normalize uploaded documents by ID



    return;
  }

  const fetchPreviewData = async () => {
    try {
      const resData = await apiPost("/api/project/preview", {
  applicationNumber,
  panNumber
});

setAllData(resData.data);


    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchPreviewData();
}, [applicationNumber, panNumber]);

// ✅ NEW: Continue button handler
  const handleContinue = () => {
    navigate("/payment", {
      state: {
        applicationNumber,
        panNumber,
      },
    });
  };
  

 useEffect(() => {
  if (!applicationNumber || !panNumber) return;

  const fetchDevelopmentDetails = async () => {
    try {
     const response = await apiGet(
  `/api/development-details?application_number=${applicationNumber}&pan_number=${panNumber}`
);

      console.log("🟢 FULL API RESPONSE:", response);
      console.log(
        "🟡 external_development_work:",
        response?.data?.external_development_work
      );

      setExternalDevWork(response?.data?.external_development_work || {});
setDevDetails(response?.data || null);

    } catch (error) {
      console.error("❌ Development details API error:", error);
    }
  };

  fetchDevelopmentDetails();
}, [applicationNumber, panNumber]);

  // ✅ NEW: Download PDF handler
  const handleDownloadPDF = () => {
    window.print();
  };
 
  const EXTERNAL_WORK_LABELS = [
  { key: "Roads", label: "Roads" },
  { key: "Water_Supply", label: "Water Supply" },
  { key: "Fire_Fighting_Facility", label: "Fire Fighting Facility" },
  { key: "Drinking_Water_Facility", label: "Drinking Water Facility" },
  { key: "Use_of_Renewable_Energy", label: "Use of Renewable Energy" },
  { key: "Sewage_and_Drainage_System", label: "Sewage and Drainage System" },
  { key: "Emergency_Evacuation_Service", label: "Emergency Evacuation Service" },
  { key: "Solid_Waste_Management_And_Disposal", label: "Solid Waste Management And Disposal" },
  { key: "Electricity_Supply_Transformation_Station", label: "Electricity Supply Transformation Station" }
];

  const project = allData?.project_details || {};
  console.log("🔥 PROJECT DETAILS 👉", project);

  // 🔥 FIX: Normalize development_details (DB → UI)
const rawDevDetails = devDetails?.development_details;

let normalizedDevDetails = {};
try {
  normalizedDevDetails =
    typeof rawDevDetails === "string"
      ? JSON.parse(rawDevDetails)
      : rawDevDetails || {};
} catch (e) {
  console.log("❌ JSON parse failed:", e);
  normalizedDevDetails = {};
}

console.log("🔥 DEV DETAILS FROM DB 👉", normalizedDevDetails);

// ✅ CORRECT KEY FROM DB
const apartmentsFlats =
  normalizedDevDetails?.Apartments_Flats ||
  normalizedDevDetails?.apartments_flats ||
  normalizedDevDetails?.apartments ||
  {};
const apartmentRows =
  apartmentsFlats?.rows ||
  normalizedDevDetails?.rows ||
  [];


console.log("✅ normalizedDevDetails:", normalizedDevDetails);
console.log("✅ Apartments_Flats:", apartmentsFlats);
console.log("✅ apartmentRows:", apartmentRows);


console.log("🧩 Apartments_Flats from DB:", apartmentsFlats);
console.log("🧩 Apartment rows:", apartmentRows);
// ✅ DERIVE BUILDING TYPE FROM EXCEL DATA
let buildingTypeText = "N/A";

if (apartmentRows.length > 0) {
  buildingTypeText = "Apartments / Flats";
}

  // ===================================================
// 📎 ATTACHED DOCUMENTS – APRERA PAGINATION SETUP
// ===================================================

const documents = allData?.project_upload_documents || [];

const DOCS_PER_PAGE = 8;

const uploadedDocMap = {};
documents.forEach((d) => {
  const id = Number(d.document_name);
  if (id) uploadedDocMap[id] = d;
});

const documentPages = [];
for (let i = 0; i < DOCUMENT_MASTER.length; i += DOCS_PER_PAGE) {
  documentPages.push(
    DOCUMENT_MASTER.slice(i, i + DOCS_PER_PAGE)
  );
}

  // ✅ NORMALIZE PROJECT DETAILS (BACKEND → UI)
// ✅ FIXED PROJECT DETAILS (MATCH BACKEND KEYS)
const fixedProject = {
  name: project["Project Name"] || "N/A",
  description: project["Project Description"] || "N/A",
  type: project["Project Type"] || "N/A",
  status: project["Project Status"] || "New Project",

  buildingPlanNo: project["Building Plan No"] || "N/A",
  surveyNo: project["Survey No"] || "N/A",

  permissionFrom: project["Building Permission Validity From"] || "N/A",
  permissionTo: project["Building Permission Validity To"] || "N/A",

  startDate: project["Project Starting Date"] || "N/A",
  completionDate: project["Proposed Completion Date"] || "N/A",

  landArea: project["Total Area of Land (Sq.m)"] || "N/A",
  height: project["Height of Building (m)"] || "0.00",
  plinthArea: project["Total Plinth Area (Sq.m)"] || "N/A",
  openArea: project["Total Open Area (Sq.m)"] || "N/A",
  builtUpArea: project["Total Built-up Area (Sq.m)"] || "N/A",

  estimatedCost: project["Estimated Cost of Construction"] || "N/A",
  landCost: project["Cost of Land"] || "N/A",
  totalCost: project["Total Project Cost (₹)"] || "N/A",

  address: project["Project Address"] || "N/A",
  district: project["District"] || "N/A",
  mandal: project["Mandal"] || "N/A",
  village: project["Village"] || "N/A",
  pincode: project["Pincode"] || "N/A",
  // ADD THESE:
 planApprovingAuthority:
  project["Plan Approving Authority"] ||
  project["Plan approving authority"] ||
  project.planApprovingAuthority ||
  "N/A",

apcdraName:
  project["APCRDA Name"] ||
  project.apcrdaName ||
  "N/A",

addressProof:
  project["Address Proof"] ||
  project.addressProof ||
  "N/A",
  
  // Local Address
  localAddress1: project["Local Address Line1"] || "N/A",
  localAddress2: project["Local Address Line2"] || "N/A",
  localDistrict: project["Local District"] || "N/A",
  localMandal: project["Local Mandal"] || "N/A",
  localVillage: project["Local Village"] || "N/A",
  localPincode: project["Local Pincode"] || "N/A",
  projectWebsite: project["Project Website"] || "NA (//)",
  
  // Parking/Garage
  noOfGarages: project["No of Garages Available for Sale"] || "0",
  totalGarageArea: project["Total Area of Garages"] || "0.00",
  noOfOpenParking: project["No of Open Parking Spaces"] || "0",
  totalOpenParking: project["Total Open Parking"] || "0.00",
  noOfCoveredParking: project["No of Covered Parking"] || "0",
  totalCoveredParkingArea: project["Total Covered Parking Area"] || "0.00",

  // ✅ ADD HERE (Latitude / Longitude)
  project_latitude: project["Latitude"] || "N/A",
  project_longitude: project["Longitude"] || "N/A",

};

const development = allData?.development_details || {};
// ✅ Apartments / Flats from Excel
// ✅ Correct path based on backend response
// ✅ CORRECT DEVELOPMENT STRUCTURE (NESTED)

console.log("✅ apartments enabled:", apartmentsFlats?.enabled);
console.log("✅ apartment rows:", apartmentRows);


console.log("✅ Apartment rows length 👉", apartmentRows.length);

// ✅ ADD THIS EXACTLY HERE 👇
const groupedApartments = apartmentRows.reduce((acc, row) => {
  const block = row.name_of_the_block || "MAIN";
  if (!acc[block]) acc[block] = [];
  acc[block].push(row);
  return acc;
}, {});







  console.log("Documents in preview:", documents);
// ✅ FIRST: raw data
const associatesRaw = allData?.associate_details || {};
// ✅ BUILD UPLOADED DOCUMENT MAP (ADD HERE)


// ✅ NOW it is safe to log
console.log("Associates raw 👉", associatesRaw);


console.log(
  "🏢 FULL development_details 👉",
  allData?.development_details
);






 

// ✅ NORMALIZE DEVELOPMENT DETAILS (BACKEND → UI)


const associates = {
  architects: (associatesRaw.architects || []).map((a) => ({
    name: a.name,
    email: a.email,
    address: a.address,
    address2: a.address2,
    state: a.state,
    district: a.district,
    pincode: a.pin_code,
    mobile: a.mobile,
    regNumber: a.reg_number,
    yearOfEstablishment: a.year_of_establishment || 0,
    keyProjects: a.number_of_key_projects || 0,
  })),

  engineers: (associatesRaw.engineers || []).map((e) => ({
    name: e.name,
    email: e.email,
    address: e.address,
    address2: e.address2,
    state: e.state,
    district: e.district,
    pincode: e.pin_code,
    mobile: e.mobile,
    licenseNumber: e.licence_number,
    yearOfEstablishment: e.year_of_establishment || 0,
    keyProjects: e.number_of_key_projects || 0,
  })),

  charteredAccountants: (associatesRaw.accountants || []).map((c) => ({
    name: c.name,
    email: c.email,
    address: c.address,
    address2: c.address2,
    state: c.state,
    district: c.district,
    pincode: c.pin_code,
    mobile: c.mobile,
    icaiMemberId: c.icai_member_id,
    keyProjects: c.number_of_key_projects || 0,
  })),

  agents: (associatesRaw.agents || []).map((a) => ({
    name: a.name,
    address: a.address,
    mobile: a.mobile,
    reraNumber: a.registration_number || "—",
  })),
  
};
const projectEngineers = (associatesRaw.project_engineers || []).map((e) => ({
  name: e.engineer_name,
  email: e.email_id,
  address: e.address_line1,
  address2: e.address_line2,
  state: e.state_ut,
  district: e.district,
  pincode: e.pin_code,
  mobile: e.mobile_number,
  keyProjects: e.number_of_key_projects || 0,
}));




// Debug (optional, but helpful)
console.log("📄 Document pages:", documentPages.length);







  

  if (loading || !allData) {
    return (
      <div className="preview-loading">
        <div className="loading-spinner">Loading preview...</div>
      </div>
    );
  }

  return (
    <div className="preview-container">
      {/* Header - No Print */}
      <div className="preview-header no-print">
        <div className="breadcrumb">
          <span>You are here : </span>
          <a href="/">Home</a>
          <span> / </span>
          <span>Registration / Project Registration / Preview</span>
        </div>

        <ProjectWizard currentStep={6} />

        <div className="preview-actions">
          <button onClick={handleDownloadPDF} className="btn btn-download">
            <span>📥</span> Download PDF
          </button>
          <button onClick={handleContinue} className="btn btn-continue">
            Continue to Payment →
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="pdf-content">
        {/* Header Section */}
        <div className="pdf-header">
          <h1 className="pdf-title">PROJECT REGISTRATION - PREVIEW</h1>
          <p className="pdf-subtitle">
            Andhra Pradesh Real Estate Regulatory Authority (APRERA)
          </p>
        </div>

        {/* Application Details */}
        <div className="section application-info">
          <table className="info-table">
            <tbody>
              <tr>
                <td className="label">Application Number:</td>
                <td className="value">{applicationNumber || "N/A"}</td>
                <td className="label">PAN Number:</td>
                <td className="value">{panNumber || "N/A"}</td>
              </tr>
              <tr>
                <td className="label">Promoter Type:</td>
                <td className="value">
                  {fixedProject.type || "Individual"}              </td>
                <td className="label">Date:</td>
                <td className="value">{formatDate(new Date())}</td>

              </tr>
            </tbody>
          </table>
        </div>

        {/* Promoter Details */}
        <section className="section">
  <h2 className="section-title">Promoter Details</h2>

  <table className="data-table">
    <tbody>
      <tr>
        <td className="label-cell">Name</td>
        <td>{allData?.promoter_details?.["Promoter Name"] || "N/A"}</td>

        <td className="label-cell">Father Name</td>
        <td>{allData?.promoter_details?.["Father Name"] || "N/A"}</td>
      </tr>

      <tr>
        <td className="label-cell">PAN Card Number</td>
        <td>{allData?.promoter_details?.["PAN"] || "N/A"}</td>
        <td className="label-cell">Aadhaar Number</td>
        <td>{allData?.promoter_details?.["Aadhaar"] || "N/A"}</td>
      </tr>

      <tr>
        <td className="label-cell">Mobile Number</td>
        <td>{allData?.promoter_details?.["Mobile Number"] || "N/A"}</td>
        <td className="label-cell">Email ID</td>
        <td>{allData?.promoter_details?.["Email"] || "N/A"}</td>
      </tr>

      <tr>
        <td className="label-cell">State/UT</td>
        <td className="value-cell">
  {allData?.promoter_details?.["State"] || "N/A"}
</td>
        <td className="label-cell">District</td>
        <td className="value-cell">
  {allData?.promoter_details?.["District"] || "N/A"}
</td>
      </tr>

      <tr>
        <td className="label-cell">Landline Number</td>
        <td className="value-cell">
  {allData?.promoter_details?.["Landline"] || "N/A"}
</td>
        <td className="label-cell">Promoter Website</td>
        <td className="value-cell">
  {allData?.promoter_details?.["Promoter Website"] || "N/A"}
</td>
      </tr>
    </tbody>
  </table>

  <h3 className="subsection-title">Project Bank Details</h3>
  <table className="data-table">
    <tbody>
      <tr>
        <td className="label-cell">Bank State</td>
        <td className="value-cell">
  {allData?.promoter_details?.["Bank State"] || "N/A"}
</td>
        <td className="label-cell">Bank Name</td>
        <td className="value-cell">{allData?.promoter_details?.["Bank Name"] || "N/A"}</td>
      </tr>

      <tr>
        <td className="label-cell">Branch Name</td>
        <td className="value-cell">{allData?.promoter_details?.["Branch Name"] || "N/A"}</td>
        <td className="label-cell">Account Number</td>
        <td className="value-cell">{allData?.promoter_details?.["Account Number"] || "N/A"}</td>
      </tr>

      <tr>
        <td className="label-cell">IFSC Code</td>
        <td className="value-cell">{allData?.promoter_details?.["IFSC Code"] || "N/A"}</td>
        <td className="label-cell">Account Holder Name</td>
        <td className="value-cell">{allData?.promoter_details?.["Account Holder Name"] || "N/A"}</td>
      </tr>
    </tbody>
  </table>
</section>
<section className="section">
  <h2 className="section-title">Attached Documents</h2>
  <table className="data-table">
    <thead>
      <tr>
        <th className="table-header">Document Type</th>
        <th className="table-header">Uploaded Document</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Income Tax Return Acknowledgement of Preceding Year 1</td>
        <td className="center">
          {allData?.promoter_details?.["Income Tax Year 1"] !== "N/A" ? (
            <a href={allData?.promoter_details?.["Income Tax Year 1"]} target="_blank" rel="noreferrer">
              View Document
            </a>
          ) : "NA"}
        </td>
      </tr>
      <tr>
        <td>Income Tax Return Acknowledgement of Preceding Year 2</td>
        <td className="center">
          {allData?.promoter_details?.["Income Tax Year 2"] !== "N/A" ? (
            <a href={allData?.promoter_details?.["Income Tax Year 2"]} target="_blank" rel="noreferrer">
              View Document
            </a>
          ) : "NA"}
        </td>
      </tr>
      <tr>
        <td>Income Tax Return Acknowledgement of Preceding Year 3</td>
        <td className="center">
          {allData?.promoter_details?.["Income Tax Year 3"] !== "N/A" ? (
            <a href={allData?.promoter_details?.["Income Tax Year 3"]} target="_blank" rel="noreferrer">
              View Document
            </a>
          ) : "NA"}
        </td>
      </tr>
      <tr>
        <td>Consolidated Income Tax Returns for the Past 3 Years</td>
        <td className="center">
          {allData?.promoter_details?.["Consolidated IT Returns"] !== "N/A" ? (
            <a href={allData?.promoter_details?.["Consolidated IT Returns"]} target="_blank" rel="noreferrer">
              Test word.pdf
            </a>
          ) : "NA"}
        </td>
      </tr>
      <tr>
        <td>Balance Sheet</td>
        <td className="center">
          {allData?.promoter_details?.["Balance Sheet"] !== "N/A" ? (
            <a href={allData?.promoter_details?.["Balance Sheet"]} target="_blank" rel="noreferrer">
              Test word.pdf
            </a>
          ) : "NA"}
        </td>
      </tr>
    </tbody>
  </table>
</section>

{/* Promoter Details - Documents */}
<section className="section">
  <h2 className="section-title">Promoter Details</h2>
  <table className="data-table">
    <tbody>
      <tr>
        <td className="label-cell">Name</td>
        <td className="value-cell">{allData?.promoter_details?.["Promoter Name"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">Father Name</td>
        <td className="value-cell">{allData?.promoter_details?.["Father Name"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">PAN Card Number</td>
        <td className="value-cell">{allData?.promoter_details?.["PAN"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">PAN Card Document</td>
        <td className="value-cell">
          {allData?.promoter_details?.["PAN Card Document"] !== "N/A" ? (
            <a href={allData?.promoter_details?.["PAN Card Document"]} target="_blank" rel="noreferrer">
              Test word.pdf
            </a>
          ) : "N/A"}
        </td>
      </tr>
      <tr>
        <td className="label-cell">Aadhaar Number</td>
        <td className="value-cell">{allData?.promoter_details?.["Aadhaar"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">Aadhaar Upload</td>
        <td className="value-cell">
          {allData?.promoter_details?.["Aadhaar Document"] !== "N/A" ? (
            <a href={allData?.promoter_details?.["Aadhaar Document"]} target="_blank" rel="noreferrer">
              Test word.pdf
            </a>
          ) : "N/A"}
        </td>
      </tr>
      <tr>
        <td className="label-cell">Mobile Number</td>
        <td className="value-cell">{allData?.promoter_details?.["Mobile Number"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">Landline Number</td>
        <td className="value-cell">{allData?.promoter_details?.["Landline"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">Email Id</td>
        <td className="value-cell">{allData?.promoter_details?.["Email"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">State/UT</td>
        <td className="value-cell">{allData?.promoter_details?.["State"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">District</td>
        <td className="value-cell">{allData?.promoter_details?.["District"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">License Number by the local bodies</td>
        <td className="value-cell">{allData?.promoter_details?.["License Number"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">License issued date</td>
        <td className="value-cell">{allData?.promoter_details?.["License Issued Date"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">Promoter Website Url</td>
        <td className="value-cell">{allData?.promoter_details?.["Promoter Website"] || "NA (//)"}  </td>
      </tr>
      <tr>
        <td className="label-cell">Upload License certificate</td>
        <td className="value-cell">
          {allData?.promoter_details?.["License Certificate"] !== "N/A" ? (
            <a href={allData?.promoter_details?.["License Certificate"]} target="_blank" rel="noreferrer">
              View Document
            </a>
          ) : "N/A"}
        </td>
      </tr>
      <tr>
        <td className="label-cell">GST Num</td>
        <td className="value-cell">{allData?.promoter_details?.["GST Number"] || "N/A"}</td>
      </tr>
      <tr>
        <td className="label-cell">GST Num Document</td>
        <td className="value-cell">
          {allData?.promoter_details?.["GST Document"] !== "N/A" ? (
            <a href={allData?.promoter_details?.["GST Document"]} target="_blank" rel="noreferrer">
              View Document
            </a>
          ) : "N/A"}
        </td>
      </tr>
      <tr>
        <td className="label-cell">Photo</td>
        <td className="value-cell">
          {allData?.promoter_details?.["Photo"] !== "N/A" ? (
            <a href={allData?.promoter_details?.["Photo"]} target="_blank" rel="noreferrer">
              View Photo
            </a>
          ) : "N/A"}
        </td>
      </tr>
    </tbody>
  </table>
</section>

        {/* Project Details */}
        <section className="section page-break">
          <h2 className="section-title">Project Details</h2>

          <table className="data-table">
            <tbody>
              <tr>
                <td className="value-cell" colSpan="3">
  {fixedProject.name }
</td>

              </tr>
              <tr>
                <td className="label-cell">Project Description</td>
                <td className="value-cell" colSpan="3">
                  {fixedProject.description || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="label-cell">Project Type</td>
                <td className="value-cell">
                  {fixedProject.type }
                </td>
                <td className="label-cell">Project Status</td>
                <td className="value-cell">
                  {fixedProject.status || "New Project"}
                </td>
              </tr>
              <tr>
                <td className="label-cell">Building Plan No</td>
                <td className="value-cell">
                  {fixedProject.buildingPlanNo || "N/A"}
                </td>
                <td className="label-cell">Survey No</td>
                <td className="value-cell">
                  {fixedProject.surveyNo || "N/A"}
                </td>
              </tr>
              
                <tr>
  <td className="label-cell">Building Permission Validity From</td>
  <td className="value-cell">{fixedProject.permissionFrom}</td>

  <td className="label-cell">Building Permission Validity To</td>
  <td className="value-cell">{fixedProject.permissionTo}</td>
</tr>
    
<tr>
  <td className="label-cell">Project Starting Date</td>
  <td className="value-cell">{fixedProject.startDate}</td>

  <td className="label-cell">Proposed Completion Date</td>
  <td className="value-cell">{fixedProject.completionDate}</td>
</tr>

              <tr>
                <td className="label-cell">Total Area of Land (Sq.m)</td>
                <td className="value-cell">
                  {fixedProject.landArea || "N/A"}
                </td>
                <td className="label-cell">Height of Building (m)</td>
                <td className="value-cell">
                  {fixedProject.height || "0.00"}
                </td>
              </tr>
              <tr>
                <td className="label-cell">Total Plinth Area (Sq.m)</td>
                <td className="value-cell">
                  {fixedProject.plinthArea || "N/A"}
                </td>
                <td className="label-cell">Total Open Area (Sq.m)</td>
                <td className="value-cell">
                  {fixedProject.openArea || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="label-cell">Total Built-up Area (Sq.m)</td>
                <td className="value-cell">
                  {fixedProject.builtUpArea || "N/A"}
                </td>
                <td className="label-cell">Estimated Cost of Construction</td>
                <td className="value-cell">
                  ₹ {fixedProject.estimatedCost || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="label-cell">Cost of Land</td>
                <td className="value-cell">₹ {fixedProject.landCost}</td>
                <td className="label-cell">Total Project Cost</td>
                <td className="value-cell">
                  ₹ {fixedProject.totalCost}
                </td>
              </tr>
                <tr>
  <td className="label-cell">No.of Garages Available for Sale</td>
  <td className="value-cell">{fixedProject.noOfGarages}</td>
</tr>
<tr>
  <td className="label-cell">Total Area of Garages(Sq.m)</td>
  <td className="value-cell">{fixedProject.totalGarageArea}</td>
</tr>
<tr>
  <td className="label-cell">No.of Open Parking Spaces</td>
  <td className="value-cell">{fixedProject.noOfOpenParking}</td>
</tr>
<tr>
  <td className="label-cell">Total Open Parking(Sq.m)</td>
  <td className="value-cell">{fixedProject.totalOpenParking}</td>
</tr>
<tr>
  <td className="label-cell">No.of Covered Parking</td>
  <td className="value-cell">{fixedProject.noOfCoveredParking}</td>
</tr>
<tr>
  <td className="label-cell">Total covered Parking Area(Sq.m)</td>
  <td className="value-cell">{fixedProject.totalCoveredParkingArea}</td>
</tr>


              
            </tbody>
          </table>

          <h3 className="subsection-title">Project Site Address</h3>
          <table className="data-table">
            <tbody>
              <tr>
                <td className="label-cell">Address Line 1</td>
                <td className="value-cell" colSpan="3">
                  {fixedProject.address} 
                </td>
              </tr>
              <tr>
                <td className="label-cell">Address Line 2</td>
                <td className="value-cell" colSpan="3">
                  { "N/A"}
                </td>
              </tr>
              <tr>
                <td className="label-cell">District</td>
                <td className="value-cell">
                  {fixedProject.district}
                </td>
                <td className="label-cell">Mandal</td>
                <td className="value-cell">
                  {fixedProject.mandal }
                </td>
              </tr>
              <tr>
                <td className="label-cell">Local Area/Village</td>
                <td className="value-cell">
                  {fixedProject.village }
                </td>
                <td className="label-cell">Pincode</td>
                <td className="value-cell">
                  {fixedProject.pincode}
                </td>
              </tr>
              <tr>
  <td className="label-cell">Latitude</td>
  <td className="value-cell">
    {fixedProject.project_latitude || "N/A"}
  </td>

  <td className="label-cell">Longitude</td>
  <td className="value-cell">
    {fixedProject.project_longitude || "N/A"}
  </td>
</tr>

              
            </tbody>
          </table>
          {/* Project Local Address For Communication */}
<section className="section">
  <h2 className="section-title">Project Local Address For Communication</h2>
  <table className="data-table">
    <tbody>
      <tr>
        <td className="label-cell">Address Line1</td>
        <td className="value-cell">{fixedProject.localAddress1}</td>
      </tr>
      <tr>
        <td className="label-cell">Address Line2</td>
        <td className="value-cell">{fixedProject.localAddress2}</td>
      </tr>
      <tr>
        <td className="label-cell">District</td>
        <td className="value-cell">{fixedProject.localDistrict}</td>
      </tr>
      <tr>
        <td className="label-cell">Mandal</td>
        <td className="value-cell">{fixedProject.localMandal}</td>
      </tr>
      <tr>
        <td className="label-cell">Local Area/Village</td>
        <td className="value-cell">{fixedProject.localVillage}</td>
      </tr>
      <tr>
        <td className="label-cell">PINcode</td>
        <td className="value-cell">{fixedProject.localPincode}</td>
      </tr>
      <tr>
        <td className="label-cell">Project Website</td>
        <td className="value-cell">{fixedProject.projectWebsite}</td>
      </tr>
    </tbody>
  </table>
</section>

          <h3 className="subsection-title">Plan Approving Authority</h3>
          <table className="data-table">
            <tbody>
<tr>
  <td className="label-cell">Plan Approving Authority</td>
  <td className="value-cell">{fixedProject.planApprovingAuthority || "N/A"}</td>
  <td className="label-cell">APCRDA Name</td>
  <td className="value-cell">{fixedProject.apcrdaName || "N/A"}</td>
</tr>

<tr>
  <td className="label-cell">Survey No.</td>
  <td className="value-cell">{fixedProject.surveyNo}</td>
</tr>

<tr>
  <td className="label-cell">Address Proof</td>
  <td className="value-cell">
    {fixedProject.addressProof !== "N/A" ? (
      <a href={fixedProject.addressProof} target="_blank" rel="noreferrer">
        Test word.pdf
      </a>
    ) : "N/A"}
  </td>
</tr>
</tbody>
          </table>
        </section>

        {/* Development Details - COMPLETE EXAMPLE */}
<section className="section page-break">
  <h2 className="section-title">Development Details</h2>

  {/* Excel Data Display */}
  <div style={{ marginTop: '30px' }}>
    {apartmentRows.length > 0 && (
  <>
    <div style={{ marginBottom: "10px" }}>
      <strong>Total Flats:</strong> {apartmentRows.length}
    </div>

    <div style={{ overflowX: "auto" }}>
      <table className="data-table small-text">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Block</th>
            <th>Floor</th>
            <th>Flat No</th>
            <th>Type</th>
            <th>Carpet Area</th>
            <th>Balcony Area</th>
            <th>Common Area</th>
            <th>Parking Area</th>
            <th>Total Area</th>
          </tr>
        </thead>
        <tbody>
  {Object.entries(groupedApartments).map(([block, rows]) => (
    <React.Fragment key={block}>
      <tr>
        <td
          colSpan="10"
          style={{
            fontWeight: "bold",
            background: "#f2f2f2",
            textAlign: "left",
          }}
        >
          Block : {block}
        </td>
      </tr>

      {rows.map((row, idx) => (
        
  <tr key={`${block}-${idx}`}>
    <td>{idx + 1}</td>

    {/* 🔥 TRY MULTIPLE POSSIBLE KEYS */}
    <td>{row["Name of the Block"] || "—"}</td>
<td>{row["Floor Number"] || "—"}</td>
<td>{row["Flat Number"] || "—"}</td>
<td>{row["Type of flat (1BHK/2BHK/3BHK/Others)"] || "—"}</td>
<td>{row["Carpet Area of each unit (Sq.m)"] || "—"}</td>
<td>{row["Area of exclusive balcony/verandah (Sq.m)"] || "—"}</td>
<td>{row["Share of Common Areas (Sq.m)"] || "—"}</td>
<td>{row["Parking Area if any (Sq.m)"] || "—"}</td>
<td>{row["Total area of each Flat/unit (Sq.m)"] || "—"}</td>
  </tr>
))}
    </React.Fragment>
  ))}
</tbody>

      </table>
    </div>
  </>
)}
  </div>

  {/* External Development Work */}
  <h3 className="subsection-title" style={{ marginTop: '40px' }}>External Development Work</h3>
  <table className="data-table">
    <thead>
      <tr>
        <th className="table-header" style={{ textAlign: 'left' }}>Work Type</th>
        <th className="table-header" style={{ textAlign: 'center', width: '150px' }}>% Completed</th>
      </tr>
    </thead>
    <tbody>
      {EXTERNAL_WORK_LABELS.map(({ key, label }) => (
        <tr key={key}>
          <td style={{ padding: '10px' }}>{label}</td>
          <td className="center" style={{ padding: '10px' }}>
            {externalDevWork?.[key] !== undefined ? `${externalDevWork[key]}%` : '0%'}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  
</section>
    {/* Project Material Facts */}
<section className="section">
  <h2 className="section-title">Project Material Facts</h2>
  <table className="data-table">
    <tbody>
      <tr>
        <td className="label-cell">No of Units in the projects</td>
        <td className="value-cell">{allData?.material_facts?.["No of Units in the project"] || "1"}</td>
      </tr>
      <tr>
        <td className="label-cell">No of Units advances taken</td>
        <td className="value-cell">{allData?.material_facts?.["No of Units advances taken"] || "0"}</td>
      </tr>
      <tr>
        <td className="label-cell">No of units where agreement for sale entered</td>
        <td className="value-cell">{allData?.material_facts?.["No of units where agreement for sale entered"] || "0"}</td>
      </tr>
      <tr>
        <td className="label-cell">No of units sold in the project</td>
        <td className="value-cell">{allData?.material_facts?.["No of units sold in the project"] || "0"}</td>
      </tr>
    </tbody>
  </table>
  
  <div style={{ marginTop: "15px", fontSize: "13px", lineHeight: "1.6" }}>
    <p>The above said information is true to the best of my knowledge. The material facts regarding the above table are not concealed anywhere.</p>
    <p>The Authority is at a liberty to initiate legal action on the said project, if the above stated facts in the table is false.</p>
  </div>
</section>
        

        {/* Associate Details */}

  <section className="section page-break">
  <h2 className="section-title">Associate Details</h2>
  {/* Project Agent */}
<h3 className="associate-title">Project Agent</h3>
<div className="associate-underline"></div>

{associates.agents.length === 0 ? (
  <p className="not-added-text">Project Agent details not added</p>
) : (
  <table className="data-table small-text">
    <thead>
      <tr>
        <th>S.No</th>
        <th>RERA Registration No</th>
        <th>Agent Name</th>
        <th>Address</th>
        <th>Mobile Number</th>
      </tr>
    </thead>
    <tbody>
      {associates.agents.map((a, idx) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{a.reraNumber}</td>
          <td>{a.name}</td>
          <td>{a.address}</td>
          <td>{a.mobile}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}


  {/* Project Architects */}
<h3 className="associate-title">Project Architects</h3>
<div className="associate-underline"></div>

{associates.architects.length === 0 ? (
  <p className="not-added-text">Project Architects details not added</p>
) : (
  <table className="data-table small-text">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Architect Name</th>
        <th>Email ID</th>
        <th>Address Line 1</th>
        <th>Address Line 2</th>
        <th>State/UT</th>
        <th>District</th>
        <th>PIN Code</th>
        <th>Year of establishment</th>
        <th>Number of Key projects completed</th>
        <th>Reg. Number With COA</th>
        <th>Mobile Number</th>
      </tr>
    </thead>
    <tbody>
      {associates.architects.map((a, idx) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{a.name}</td>
          <td>{a.email || "—"}</td>
          <td>{a.address}</td>
          <td>{a.address2 || "—"}</td>
          <td>{a.state}</td>
          <td>{a.district}</td>
          <td>{a.pincode}</td>
          <td>{a.yearOfEstablishment}</td>
          <td>{a.keyProjects}</td>
          <td>{a.regNumber}</td>
          <td>{a.mobile}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}


  {/* Engineers */}
  <h3 className="subsection-title">Structural Engineers</h3>

{associates.engineers.length === 0 ? (
  <p className="not-added">Structural Engineers details not added</p>
) : (
  <table className="data-table small-text">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Engineer Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>State</th>
        <th>District</th>
        <th>PIN Code</th>
        <th>Mobile</th>
        <th>No. of Key Projects</th>
      </tr>
    </thead>
    <tbody>
      {associates.engineers.map((e, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{e.name}</td>
          <td>{e.email}</td>
          <td>{e.address}</td>
          <td>{e.state}</td>
          <td>{e.district}</td>
          <td>{e.pin_code}</td>
          <td>{e.mobile}</td>
          <td>{e.number_of_key_projects}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}



  {/* Chartered Accountant */}
  <h3 className="subsection-title">Chartered Accountant</h3>
  {associates.charteredAccountants.length === 0 ? (
    <p className="not-added">Chartered Accountant details not added</p>
  ) : (
    <table className="data-table small-text">
      <thead>
        <tr>
          <th>S.No</th>
          <th>CA Name</th>
          <th>Email ID</th>
          <th>Address</th>
          <th>State/UT</th>
          <th>District</th>
          <th>Mobile</th>
          <th>ICAI Member ID</th>
        </tr>
      </thead>
      <tbody>
        {associates.charteredAccountants.map((ca, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{ca.name}</td>
            <td>{ca.email}</td>
            <td>{ca.address}</td>
            <td>{ca.state}</td>
            <td>{ca.district}</td>
            <td>{ca.mobile}</td>
            <td>{ca.icaiMemberId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

{/* Project Engineers */}
<h3 className="subsection-title">Project Engineers</h3>

{projectEngineers.length === 0 ? (
  <p className="not-added">Project Engineers details not added</p>
) : (
  <table className="data-table small-text">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Engineer Name</th>
        <th>Email ID</th>
        <th>Address</th>
        <th>State/UT</th>
        <th>District</th>
        <th>PIN Code</th>
        <th>Mobile</th>
        <th>No. of Key Projects</th>
      </tr>
    </thead>
    <tbody>
      {projectEngineers.map((e, idx) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{e.name}</td>
          <td>{e.email || "—"}</td>
          <td>{e.address}</td>
          <td>{e.state}</td>
          <td>{e.district}</td>
          <td>{e.pincode}</td>
          <td>{e.mobile}</td>
          <td>{e.keyProjects}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}


{/* Project Contractors */}
<h3 className="subsection-title">Project Contractors</h3>

{(associatesRaw.contractors || []).length === 0 ? (
  <p className="not-added">Project Contractors details not added</p>
) : (
  <table className="data-table small-text">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Nature of Work</th>
        <th>Contractor Name</th>
        <th>Email ID</th>
        <th>Address</th>
        <th>State/UT</th>
        <th>District</th>
        <th>PIN Code</th>
        <th>Year of Establishment</th>
        <th>No. of Key Projects</th>
        <th>Mobile Number</th>
      </tr>
    </thead>
    <tbody>
      {associatesRaw.contractors.map((c, idx) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{c.nature_of_work}</td>
          <td>{c.contractor_name}</td>
          <td>{c.email_id || "—"}</td>
          <td>{c.address_line1}</td>
          <td>{c.state_ut}</td>
          <td>{c.district}</td>
          <td>{c.pin_code}</td>
          <td>{c.year_of_establishment || "—"}</td>
          <td>{c.number_of_key_projects || "—"}</td>
          <td>{c.mobile_number}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

{/* Consultancy Details */}
<section className="section">
  <h2 className="section-title">Consultancy Details</h2>
  <table className="data-table">
    <tbody>
      <tr>
        <td className="label-cell">Name of Consultancy/Agency/Association</td>
        <td className="value-cell">
          {allData?.consultancy_details?.consultancy_name || "N/A"}
        </td>
      </tr>
      <tr>
        <td className="label-cell">Consultant Name</td>
        <td className="value-cell">
          {allData?.consultancy_details?.consultant_name || "N/A"}
        </td>
      </tr>
      <tr>
        <td className="label-cell">Mobile Number</td>
        <td className="value-cell">
          {allData?.consultancy_details?.mobile || "N/A"}
        </td>
      </tr>
      <tr>
        <td className="label-cell">Email Id</td>
        <td className="value-cell">
          {allData?.consultancy_details?.email || "N/A"}
        </td>
      </tr>
      <tr>
        <td className="label-cell">Full Address for communication</td>
        <td className="value-cell">
          {allData?.consultancy_details?.address || "N/A"}
        </td>
      </tr>
    </tbody>
  </table>
</section>


</section> 
{/* Other State / Past Projects / Litigations */}
<section className="section">
  <h2 className="section-title">Other State / Past Project / Litigation Details</h2>
  
  <div style={{ marginBottom: "15px" }}>
    <strong>Registered in Other State / UT</strong> {allData?.other_state_registration?.has_other_state || "no"}
  </div>
  
  <div style={{ marginBottom: "15px" }}>
    <strong>Projects launched in last 5 years</strong> {allData?.last_five_years_projects?.has_projects || "no"}
  </div>
  
  <div style={{ marginBottom: "15px" }}>
    <strong>Any Civil / Criminal Cases</strong> {allData?.litigation_details?.has_case || "no"}
  </div>
</section>

{/* Uploaded Documents */}
<section className="section">
  <h2 className="section-title">Attached Documents</h2>

  {documentPages.map((pageDocs, pageIndex) => (
    <div
      key={pageIndex}
      className={pageIndex > 0 ? "page-break" : ""}
    >
      <table className="data-table">
        <thead>
          <tr>
            <th className="table-header">Document Type</th>
            <th className="table-header">Uploaded Document</th>
          </tr>
        </thead>

        <tbody>
          {pageDocs.map((doc) => {
            const uploaded = uploadedDocMap[doc.id];

            return (
              <tr key={doc.id}>
                <td style={{ textAlign: "left" }}>
                  {doc.text}
                  {doc.mandatory && (
                    <span style={{ color: "red", fontWeight: 600 }}>
                      {" "}*
                    </span>
                  )}
                </td>

                <td className="center">
                  {uploaded?.file_path ? (
                    <a
                     href={`${BASE_URL}${uploaded.file_path}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Document
                    </a>
                  ) : (
                    <span style={{ color: "#999" }}>NA</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Footer like APRERA */}
      <div className="pdf-page-footer">
        Page {pageIndex + 1} of {documentPages.length}
      </div>
    </div>
  ))}
</section>

{/* Declaration */}
<section className="section page-break">
  <h2 className="section-title">Declaration</h2>
  <div className="declaration-box">
    <p className="declaration-text">
      ☑ I/We <strong>
        {allData?.promoter_details?.["Promoter Name"] || "___________"}
      </strong> solemnly affirm and declare that the particulars given above are
      correct to my/our knowledge and belief.
    </p>

    <h3 className="subsection-title">Note</h3>
    <ol className="declaration-notes">
      <li>
        The applicability of the Penalty/additional fee may be imposed,
        if any, provision of the act is violated, as determined by the
        Authority, as the case may be.
      </li>
      <li>
        As per section 4 of the RERA Act, 2016, you are hereby directed
        to address the shortfalls within 15 days as addressed by the
        Authority, failing which the application may be rejected as per
        Section 4 of the Act.
      </li>
    </ol>
  </div>
</section>

{/* Footer */}
<div className="pdf-footer">
  <p>Generated on: {new Date().toLocaleString()}</p>
  <p>Andhra Pradesh Real Estate Regulatory Authority (APRERA)</p>
  <p>Application Number: {applicationNumber}</p>
</div>
      </div>
    </div>
  );
};

export default ProjectPreview;