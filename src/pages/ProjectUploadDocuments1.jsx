import "../styles/ProjectUploadDocument.css";
import ProjectWizard from "../components/ProjectWizard";
import React,{ useState } from "react";
import { apiPost } from "../api/api";
import { useNavigate } from "react-router-dom";



const uploaddocDocuments = [
   {
    id: 1,
    text: "Copies of the registered ownership documents / Pattadhar pass books issued by Revenue department along with link documents and authorization letter given by the Land Owner",
    text1: "(refer Form P20 in form download).",
  },
  {
    id: 2,
    text: "Copies of the combined field sketches showing the Survey Number boundaries, Subdivision boundaries, and Layout boundaries duly marking the Geo-Coordinates at every corner of the site.",
  },
  {
    id: 3,
    text: "Detailed site plan showing the measurements as on ground including diagonals along with Geo-Coordinates (Latitude and Longitude) at end points of the project site along with incorporation on Satellite Imagery.",
  },
  {
    id: 4,
    text: "Copy of the registered development agreement between the Owner of the land and the Promoter / Authorization letter given by the Land owner  to undertake the construction of the building by the promoter.",
  },
    {
    id: 5,
    text: "Land Title search Report from an Advocate (include Advocate Enrolment Number) having experience of atleast ten years in land related matters.",
  },
  {
    id: 6,
    text: "Latest (by 30 days) Encumbrance certificate (for entire period of document) issued by the Registration and Stamps department.",
  },
  {
    id: 7,
    text: "Copy of the plan and proceedings issued by the competent Authority for approval of plans (TDR Bonds, if any).",
  },
  {
    id: 8,
    text: "Approved plan / list of amenities proposed in the site.",
  },
  {
    id: 9,
    text: "NOC’s issued by Authority (where applicable viz., Airport Authority, Fire Department, Environmental Clearance, etc.).",
  },
  {
    id: 10,
    text: "Detailed technical specifications of the construction if the buildings and facilities proposed in the project including brand details, specifications of infrastructure and details of fixtures and fittings",
    text1:"(refer Form P18 in forms download)."
  },
  {
    id: 11,
    text: "Topo Plan drawn to a scale with nearby land marks of the site.",
  },
  {
    id: 12,
    text: "Licenses/Enrolment form of Civil Contractors, or turnkey contractor, or EPC Contractors of the project (if any).",
  },
  {
  
    id: 13,
    text: "Licenses/Enrolment form of Structural Engineer of the project (if there is any overhead tank or major structure proposed in the layout).",
  },
  {
    id: 14,
    text: "Licenses/Enrolment form of Architect or firm or company.",
  },
  {
    id: 15,
    text: "Licenses/Enrolment form of Engineer or firm or company (if any).",
  },
  {
    id: 16,
    text: "Licenses/Enrolment form of Chartered Accountant or firm or company.",
  },
  {
    id: 17,
    text: "Detailed estimate of the expenditure for construction of the building",
    text1:"(refer Form P16 in forms download).",
  },
  {
    id: 18,
    text: "Statement of source of funds for construction of building",
    text1:"(refer Form P9 in forms download)."
  },
  {
    id: 19,
    text: "Details of financial agreement made with any bank or other financial institution recognised by the Reserve Bank of India and of legal safeguards taken, if any, for the construction of building, or transfer of building by sale, gift or mortgage or otherwise (wherever applicable).",
  },
  {
    id: 20,
    text: "Copy of documents showing details of mortgage or any other legal encumbrance created on land in favour of any bank or financial institution recognised by the RBI (where applicable).",
  },
  {
    id: 21,
    text: "Proforma of the Allotment Letter proposed to be signed with the Allottee",
    text1:"(refer Form P14 in forms download)."
  },
    {
    id: 22,
    text: "Proforma of the Agreement for Sale proposed to be signed with the Allottee",
    text1:"(refer Form P15 in forms download)."
  },
  {
    id: 23,
    text: "Proforma of the Conveyance Deed proposed to be signed with the Allottee",
  },
  {
    id: 24,
    text: "Structural Stability Certificate duly issued by Certified Structural Consultant",
    text1:"(refer Form P19 in forms download)."
  },
  {
    id: 25,
    text: "Copy of Insurance of title of the land.",
  },
  {
    id: 26,
    text: "FORM - B, Declaration, supported by an affidavit (on Rs.20 non judicial stamp paper), which shall be signed by the promoter or any person authorized by the promoter under Rule 3-B(2)(a) to of AP Real Estate Rules-2017",
    text1:"(refer Form P11 in forms download)."
  },
  {
    id: 27,
    text: "Details of the area mortgaged to the Competent Authority for approval of Plans / Mortgage Deed.",
  }
];
// const NOT_REQUIRED_DOC_IDS = [2, 9, 12, 15, 19, 20, 25];


export default function ProjectUploadDocuments() {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [consultancyName, setConsultancyName] = useState("");
const [consultantName, setConsultantName] = useState("");
const [mobile, setMobile] = useState("");
const [email, setEmail] = useState("");
const [declarationChecked, setDeclarationChecked] = useState(false);
const [note1Checked, setNote1Checked] = useState(false);
const [note2Checked, setNote2Checked] = useState(false);
const applicationNumber = sessionStorage.getItem("applicationNumber");
const panNumber = sessionStorage.getItem("panNumber");

console.log("Upload page applicationNumber:", applicationNumber);
console.log("Upload page panNumber:", panNumber);

const [popupMessage, setPopupMessage] = useState("");
const [address, setAddress] = useState("");


const isValidMobile = (mobile) => {
  const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile numbers
  return mobileRegex.test(mobile);
};

const isValidEmail = (email) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};



  const handleFileChange = (docId, file) => {
    if (!file) return;

    setUploadedFiles((prev) => ({
      ...prev,
      [docId]: {
        file,
        url: URL.createObjectURL(file),
      },
    }));
  };


const uploadProjectDocuments = async () => {
  const formData = new FormData();

  formData.append("application_number", applicationNumber);
  formData.append("pan_number", panNumber);

  Object.entries(uploadedFiles).forEach(([docId, fileObj]) => {
    if (fileObj?.file) {
      formData.append(`doc_${docId}`, fileObj.file);
    }
  });

  return apiPost("/api/project/documents/upload", formData);
};








const saveConsultantDeclaration = async () => {
  const payload = {
    application_number: applicationNumber,
    pan_number: panNumber,
    consultancy_name: consultancyName,
    consultant_name: consultantName,
    mobile_number: mobile,
    email_id: email,
    address: address,
    declaration_name: consultantName,
    declaration_accept: declarationChecked ? "Y" : "N",
    note1_accept: note1Checked ? "Y" : "N",
    note2_accept: note2Checked ? "Y" : "N",
  };

  const res = await apiPost(
    "/api/project/consultant-declaration/save",
    payload
  );

  return res; // 👈 important
};


const handleSave =  async () => {
  // 1️⃣ Required documents validation
  // const missingRequiredDocs = uploaddocDocuments.filter(
  //   (doc) =>
  //     !NOT_REQUIRED_DOC_IDS.includes(doc.id) &&
  //     !uploadedFiles[doc.id]
  // );

  // if (missingRequiredDocs.length > 0) {
  //   setPopupMessage(
  //     "Please Upload Detailed site plan showing the measurements as on ground including diagonals along with Geo-Coordinates (Latitude and Longitude) at end points of the project site along with incorporation of same on Satellite Imagery"
  //   );
  //   setShowPopup(true);
  //   return;
  // }

  // ================= Consultancy Details Validation =================

  // Consultancy Name

  // ❌ BLOCK SAVE IF NO DOCUMENTS UPLOADED
if (Object.keys(uploadedFiles).length === 0) {
  setPopupMessage("Please upload at least one document");
  setShowPopup(true);
  return;
}

  if (!consultancyName.trim()) {
    setPopupMessage(
      "Please Enter Name of Consultancy/Agency/Association/Individual"
    );
    setShowPopup(true);
    return;
  }

  // Consultant Name
  if (!consultantName.trim()) {
    setPopupMessage("Please Enter Name");
    setShowPopup(true);
    return;
  }

  // Mobile
  if (!mobile.trim()) {
    setPopupMessage("Please Enter Mobile Number");
    setShowPopup(true);
    return;
  }

  if (!isValidMobile(mobile)) {
    setPopupMessage("Please Enter Valid Mobile Number");
    setShowPopup(true);
    return;
  }

  // Email
  if (!email.trim()) {
    setPopupMessage("Please Enter Email Id");
    setShowPopup(true);
    return;
  }

  if (!isValidEmail(email)) {
    setPopupMessage("Please Enter Valid Email Id");
    setShowPopup(true);
    return;
  }

  // Address
  if (!address.trim()) {
    setPopupMessage("Please Enter Address");
    setShowPopup(true);
    return;
  }

  // ================= Declaration & Notes =================

  if (!declarationChecked) {
    setPopupMessage("Please Check Self Declaration");
    setShowPopup(true);
    return;
  }

  if (!note1Checked) {
    setPopupMessage("Please Check Note 1");
    setShowPopup(true);
    return;
  }

  if (!note2Checked) {
    setPopupMessage("Please Check Note 2");
    setShowPopup(true);
    return;
  }

  // ✅ All validations passed
 // ✅ All validations passed
try {
    await saveConsultantDeclaration();
    await uploadProjectDocuments();



    setPopupMessage("Project documents saved successfully");
    setShowPopup(true);

    // 👉 Move to Preview step
  // ✅ Store values for refresh safety
sessionStorage.setItem("applicationNumber", applicationNumber);
sessionStorage.setItem("panNumber", panNumber);

// ✅ Navigate to Preview WITH STATE
setTimeout(() => {
  navigate("/preview", {
    state: {
      applicationNumber,
      panNumber,
    },
  });
}, 500);

  } catch (err) {
    setPopupMessage(err.message || "Something went wrong");
    setShowPopup(true);
  }


};

  return (
    <div className="uploaddoc-container">
           {/* Breadcrumb */}
      <div className="uploaddoc-breadcrumb">
        You are here :{" "}
        <span className="uploaddoc-breadcrumb-home">Home</span> / Registration /
        Project Registration
      </div>

      {/* Title */}
      <h2 className="uploaddoc-title">Project Registration</h2>
      <ProjectWizard currentStep={5} />
      <div className="uploaddoc-title-line" />

      {/* Stepper */}
      {/* <div className="uploaddoc-stepper">
        {uploaddocSteps.map((step, index) => (
          <div key={index} className="uploaddoc-step">
            <div
              className={`uploaddoc-step-circle ${
                index === 4
                  ? "uploaddoc-step-active"
                  : index < 4
                  ? "uploaddoc-step-done"
                  : ""
              }`}
            >
              {index + 1}
            </div>
            <span className="uploaddoc-step-label">{step}</span>
          </div>
        ))}
      </div> */}

      {/* Table */}
      
      <table className="uploaddoc-table">
        <thead>
          <tr>
            <th className="uploaddoc-th">Document Type</th>
            <th className="uploaddoc-th">
              Upload (Max size 70 MB for each document)
            </th>
            <th className="uploaddoc-th">Uploaded Document</th>
          </tr>
        </thead>
        
          <tbody>
  {uploaddocDocuments.map((doc) => (
    <tr key={doc.id}>
      {/* Document Type */}
     <td className="uploaddoc-td">
  {doc.text}

  {/* {!NOT_REQUIRED_DOC_IDS.includes(doc.id) && (
    <span className="uploaddoc-required"> *</span>
  )} */}

  {doc.text1 && (
    <span className="uploaddoc-doc-note"> {doc.text1}</span>
  )}
</td>


      {/* Upload */}
      <td className="uploaddoc-td">
        <input
          type="file"
          onChange={(e) =>
            handleFileChange(doc.id, e.target.files[0])
          }
        />
      </td>

      {/* Uploaded Document */}
      <td className="uploaddoc-td">
        {uploadedFiles[doc.id] && (
          <a
            href={uploadedFiles[doc.id].url}
            download={uploadedFiles[doc.id].file.name}
            target="_blank"
            rel="noreferrer"
            className="uploaddoc-download-link"
          >
            {uploadedFiles[doc.id].file.name}
          </a>
        )}
      </td>
    </tr>
  ))}
</tbody>

        
      </table>
      
      {/* ================= Submitted By ================= */}
<div className="uploaddoc-submitted-by">
  <label className="uploaddoc-submitted-label">
    This Project Registration application is submitted by
    <span className="uploaddoc-required">*</span>
  </label>

  <label className="uploaddoc-radio">
    <input type="radio" checked readOnly />
    Consultancy
  </label>
</div>

{/* ================= Consultancy Details ================= */}
<h3 className="uploaddoc-section-title">Consultancy Details</h3>
<div className="uploaddoc-section-underline"></div>

<div className="uploaddoc-form-grid">
  <div>
    <label>
      Name of Consultancy/Agency/Association/Individual
      <span className="uploaddoc-required">*</span>
    </label>
    <input
  type="text"
  placeholder="Name of Consultancy/Agency/Association"
  value={consultancyName}
  onChange={(e) => setConsultancyName(e.target.value)}
/>

  </div>

  <div>
    <label>
      Name<span className="uploaddoc-required">*</span>
    </label>
    <input
  type="text"
  placeholder="Consultant Name"
  value={consultantName}
  onChange={(e) => setConsultantName(e.target.value)}
/>

  </div>

  <div>
    <label>
      Mobile Number<span className="uploaddoc-required">*</span>
    </label>
    <input
  type="text"
  placeholder="Mobile Number"
  value={mobile}
  maxLength={10}
  onChange={(e) =>
    setMobile(e.target.value.replace(/\D/g, ""))
  }
/>


  </div>

  <div>
    <label>
      Email Id<span className="uploaddoc-required">*</span>
    </label>
    <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

  </div>

  <div className="uploaddoc-full-width">
    <label>
      Full Address for communication
      <span className="uploaddoc-required">*</span>
    </label>
   <input
  placeholder="Full Address for communication"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>

  </div>
</div>

<p className="uploaddoc-note">
  Note: If encountered any issue during upload of documents, please contact
  APRERA IT Support Team.
</p>
{/* ================= Declaration ================= */}
<h3 className="uploaddoc-section-title">Declaration</h3>
<div className="uploaddoc-section-underline"></div>

<div className="uploaddoc-declaration">
  <input
  type="checkbox"
  checked={declarationChecked}
  onChange={(e) => setDeclarationChecked(e.target.checked)}
/>

  <span>
    I/We
    <input type="text" className="uploaddoc-inline-input" />
    solemnly affirm and declare that the particulars given above are correct
    to my/our knowledge and belief.
  </span>
</div>

{/* ================= Note ================= */}
<h3 className="uploaddoc-section-title">Note</h3>
<div className="uploaddoc-section-underline"></div>

<div className="uploaddoc-note-list">
  <div>
    <input
  type="checkbox"
  checked={note1Checked}
  onChange={(e) => setNote1Checked(e.target.checked)}
/>

    <span>
      1. The applicability of the Penalty/additional fee may be imposed, if
      any, provision of the act is violated, as determined by the Authority,
      as the case may be.
    </span>
  </div>

  <div>
    <input
  type="checkbox"
  checked={note2Checked}
  onChange={(e) => setNote2Checked(e.target.checked)}
/>

    <span>
      2. As per section 4 of the RERA Act, 2016, you are hereby directed to
      address the shortfalls within 15 days as addressed by the Authority,
      failing which the application may be rejected as per Section 4 of the Act.
    </span>
  </div>
</div>

{/* ================= Save Button ================= */}
<div className="uploaddoc-save-wrapper">
  <button
  className="uploaddoc-save-btn"
  onClick={handleSave}
>
  Save
</button>


</div>
{showPopup && (
  <>
    <div className="uploaddoc-overlay"></div>

    <div className="uploaddoc-popup">
      <button
        className="uploaddoc-popup-close"
        onClick={() => setShowPopup(false)}
      >
        ×
      </button>

      <p>{popupMessage}</p>
    </div>
  </>
)}


    </div>
  );
}