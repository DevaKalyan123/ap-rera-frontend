import React from "react";
import "../styles/UploadDocument.css";


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

const documents = [
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
    text: "Copy of the registered development agreement between the Owner of the land and the Promoter / Authorization letter given by the Land owner.",
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

export default function UploadDocument() {
  return (
    <div className="upload-page-wrapper">
      {/* Breadcrumb */}
      <div className="upload-breadcrumb-bar">
        You are here : <span className="home">Home</span> / Registration / Project Registration
      </div>

      {/* Title */}
      <h2 className="upload-page-title">Project Registration</h2>
      <div className="upload-title-underline"></div>

      {/* Stepper */}
      <div className="upload-stepper">
        {steps.map((step, index) => (
          <div key={index} className="upload-step">
            <div className={`upload-circle ${index === 4 ? "active" : index < 4 ? "done" : ""}`}>
              {index + 1}
            </div>
            <span>{step}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <table className="upload-table">
        <thead>
          <tr>
            <th>Document Type</th>
            <th>Upload (Max size 70 MB for each document)</th>
            <th>Uploaded Document</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.text} <span className="upload-required">{doc.text1}*</span></td>
              <td>
                <input type="file" />
              </td>
              <td></td>
            </tr>
          ))}
          {/* Submitted By */}
{/* ================= Consultancy & Declaration ================= */}


        </tbody>
      </table>
      <div className="upload-section">

  <div className="upload-submitted">
    <label>
      <strong>This Project Registration application is submitted by</strong>
      <span className="upload-required">*</span>
    </label>
    <label className="upload-radio">
      <input type="radio" checked readOnly /> Consultancy
    </label>
  </div>

  <h3 className="upload-section-title">Consultancy Details</h3>

  <div className="upload-form-grid">
  <div>
    <label>
      Name of Consultancy / Agency / Association / Individual<span>*</span>
    </label>
    <input
      type="text"
      placeholder="Name of Consultancy/Agency/Association"
    />
  </div>

  <div>
    <label>
      Name<span>*</span>
    </label>
    <input
      type="text"
      placeholder="Consultant Name"
    />
  </div>

  <div>
    <label>
      Mobile Number<span>*</span>
    </label>
    <input
      type="text"
      placeholder="Mobile Number"
    />
  </div>

  <div>
    <label>
      Email Id<span>*</span>
    </label>
    <input
      type="email"
      placeholder="Email"
    />
  </div>

  <div className="full-width">
    <label>
      Full Address for communication<span>*</span>
    </label>
    <textarea
      placeholder="Full Address for communication"
    ></textarea>
  </div>


  </div>

  <p className="upload-alert">
    Note: If encountered any issue during upload of documents, please contact APRERA IT Support Team.
  </p>

  <h3 className="upload-section-title">Declaration</h3>
  <div className="upload-declaration">
    <input type="checkbox" />
    <span>
      I/We <input type="text" className="upload-inline-input" /> solemnly affirm and declare that the particulars given above are correct to my/our knowledge and belief.
    </span>
  </div>

  <h3 className="upload-section-title">Note</h3>
  <div className="upload-note-list">
    <div>
      <input type="checkbox" /> 1. The applicability of the Penalty/additional fee may be imposed, if any, provision of the act is violated.
    </div>
    <div>
      <input type="checkbox" /> 2. As per section 4 of the RERA Act, 2016, shortfalls must be addressed within 15 days.
    </div>
  </div>

  <div className="upload-save-wrapper">
    <button className="upload-save-btn">Save</button>
  </div>

</div>
    </div>
  );
}