// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import "../styles/ProjectClosure.css";

// export default function ProjectClosure() {

//   const location = useLocation();

//   const applicationNo = location.state?.applicationNo;
//   const projectName = location.state?.projectName;
//   const promoterName = location.state?.promoterName;

//   const [occupancy, setOccupancy] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   const handleSubmit = () => {
//   setShowPopup(true);
// };

//   return (
//     <div className="project-closure-wrapper">

//       <div className="project-closure-heading">
//         Closure Details
//         <div className="project-closure-line"></div>
//       </div>

//       <div className="project-closure-box">

//         {/* Basic Details */}

//         <div className="project-closure-form-section">

//           <div className="project-closure-form-row">
//             <label>Application No</label>
//             <input
//               type="text"
//               value={applicationNo || ""}
//               readOnly
//             />
//           </div>

//           <div className="project-closure-form-row">
//             <label>Project Name</label>
//             <input
//               type="text"
//               value={projectName || ""}
//               readOnly
//             />
//           </div>

//           <div className="project-closure-form-row">
//             <label>Promoter Name</label>
//             <input
//               type="text"
//               value={promoterName || ""}
//               readOnly
//             />
//           </div>

//         </div>

//         {/* Supporting Documents */}

//         <h4 className="project-closure-support-title">Supporting Documents</h4>

//         {/* Occupancy Certificate */}

//         <div className="project-closure-occupancy-section">

//           <div className="project-closure-occupancy-row">

//             <label className="project-closure-occupancy-label">
//               Do you have Occupancy Certificate:
//               <span style={{ color: "red" }}>*</span>
//             </label>

//             <div className="project-closure-radio-group">

//               <label>
//                 <input
//                   type="radio"
//                   value="YES"
//                   checked={occupancy === "YES"}
//                   onChange={(e) => setOccupancy(e.target.value)}
//                 />
//                 YES
//               </label>

//               <label>
//                 <input
//                   type="radio"
//                   value="NO"
//                   checked={occupancy === "NO"}
//                   onChange={(e) => setOccupancy(e.target.value)}
//                 />
//                 NO
//               </label>

//             </div>

//           </div>

//         </div>

//         {/* Upload OC */}

//         {occupancy === "YES" && (

//   <div className="project-closure-upload-row">

//     <label className="project-closure-upload-label">
//       Upload Occupancy Certificate:
//       <span style={{color:"red"}}>*</span>
//     </label>

//     <input
//       type="file"
//       className="project-closure-file-input"
//     />

//   </div>

// )}

// <div className="project-closure-doc-row">
//   <label>2. All Sale Deed Copies</label>
//   <input type="file" multiple />
// </div>

// <div className="project-closure-doc-row">
//   <label>3. Association of Allottees Formation Proof</label>
//   <input type="file" />
// </div>

// <div className="project-closure-doc-row">
//   <label>4. Common Areas / Amenities Handover Proof</label>
//   <input type="file" />
// </div>

// <div className="project-closure-doc-row">
//   <label>5. Structural Liability Affidavit (Form F6)</label>
//   <input type="file" />
// </div>

// <div className="project-closure-doc-row">
//   <label>6. Unsold Units Affidavit (Form F7)</label>
//   <input type="file" />
// </div>

// <div className="project-closure-doc-row">
//   <label>7. Consolidated Bank Statement of RERA Designated Bank Account</label>
//   <input type="file" />
// </div>

// <div className="project-closure-doc-row">
//   <label>8. Latest Photographs of the Project</label>
//   <input type="file" multiple />
// </div>

// <div className="project-closure-submit-row">
//   <button
//     className="project-closure-submit-btn"
//     onClick={handleSubmit}
//   >
//     Submit Closure Request
//   </button>
// </div>

//       </div>
//      {showPopup && (
//   <div className="project-closure-popup-overlay">
//     <div className="project-closure-popup-box">
//       <h3>Success</h3>
//       <p>Your Closure Request has been submitted successfully.</p>

//       <button
//         className="project-closure-popup-btn"
//         onClick={() => setShowPopup(false)}
//       >
//         OK
//       </button>
//     </div>
//   </div>
// )} 
//     </div>

//   );
// }


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ProjectClosure.css";

export default function ProjectClosure() {
    const location = useLocation();

    const [projectDetails, setProjectDetails] = useState({
        applicationNumber: location.state?.projectData?.application_number || localStorage.getItem("application_no"),
        projectName: location.state?.projectData?.project_name || localStorage.getItem("project_name"),
        promoterName: location.state?.projectData?.name || localStorage.getItem("promoter_name")
    });

    const [success, setSuccess] = useState(false);
    const [hasOccupancy, setHasOccupancy] = useState("");
    const RequiredStar = () => <span style={{ color: "red" }}> *</span>;
    const handlePdfValidation = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== "application/pdf") {
            alert("Only PDF files are allowed");
            e.target.value = "";
        }
    };

    const handleImageValidation = (e) => {
        const files = Array.from(e.target.files);
        const invalid = files.some(
            (file) =>
                !["image/png", "image/jpeg", "image/jpg"].includes(file.type)
        );

        if (invalid) {
            alert("Only image files are allowed");
            e.target.value = "";
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const form = new FormData(e.target);

        form.append("applicationNumber", projectDetails.applicationNumber);
        form.append("projectName", projectDetails.projectName);
        form.append("promoterName", projectDetails.promoterName);

        const response = await fetch(
            "http://localhost:8080/api/project_closure/submit",
            {
                method: "POST",
                body: form
            }
        );

        const result = await response.json();

        if (result.status === "success") {
            setSuccess(true);
        }

    };

    if (success) {
        return (
            <div className="projectclosure-closure-container">
                <h2 className="projectclosure-success">✔ Request Submitted Successfully</h2>
            </div>
        );
    }

    return (

        <div className="projectclosure-closure-container">

            <h2 className="projectclosure-page-title">Closure Details</h2>

            <div className="projectclosure-closure-card">

                <div className="projectclosure-project-box">

                    <label>Application No</label>
                    <input value={projectDetails.applicationNumber || ""} readOnly />

                    <label>Project Name</label>
                    <input value={projectDetails.projectName || ""} readOnly />

                    <label>Promoter Name</label>
                    <input value={projectDetails.promoterName || ""} readOnly />

                </div>

                <h3 className="projectclosure-section-title">Supporting Documents</h3>

                <form className="projectclosure-closure-form" onSubmit={handleSubmit}>

                    <div className="projectclosure-occupancy-row">
                        <label>
                            1. Do you have Occupancy Certificate:
                            <RequiredStar />
                        </label>

                        <div className="projectclosure-radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="occupancyCertificateStatus"
                                    value="Yes"
                                    onChange={(e) => setHasOccupancy(e.target.value)}
                                />
                                YES
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="occupancyCertificateStatus"
                                    value="No"
                                    onChange={(e) => setHasOccupancy(e.target.value)}
                                />
                                NO
                            </label>
                        </div>
                    </div>

                    {/* SHOW FILE UPLOAD ONLY IF YES */}

                    {hasOccupancy === "Yes" && (
                        <div className="projectclosure-form-row">
                            <label>Upload Occupancy Certificate: *</label>
                            <input
                                type="file"
                                name="occupancyCertificateDoc"
                                accept=".pdf"
                                required
                                onChange={handlePdfValidation}
                            />
                        </div>
                    )}

                    <div className="projectclosure-form-row">
                        <label>
                            2. All the Sale Deed Copies shall be uploaded
                            <RequiredStar />
                        </label>
                        <input
                            type="file"
                            name="saleDeedCopiesDoc"
                            accept=".pdf"
                            required
                            onChange={handlePdfValidation}
                        />
                    </div>

                    <div className="projectclosure-form-row">
                        <label>
                            3. The Promoter has to form an Association of Allottee
                            <RequiredStar />
                        </label>
                        <input
                            type="file"
                            name="associationOfAllotteesDoc"
                            accept=".pdf"
                            required
                            onChange={handlePdfValidation}
                        />
                    </div>

                    <div className="projectclosure-form-row">
                        <label>
                            4. The Common Areas/Amenities as completed and the same shall be handed over
                            <RequiredStar />
                        </label>
                        <input
                            type="file"
                            name="commonAreasHandoverDoc"
                            accept=".pdf"
                            required
                            onChange={handlePdfValidation}
                        />
                    </div>

                    <div className="projectclosure-form-row">
                        <label>5.An Affidavit regarding the Structural Liability Has to be submittedas per RERA format(F6) <RequiredStar /></label>
                        <input
                            type="file"
                            name="structuralLiabilityDoc"
                            accept=".pdf"
                            required
                            onChange={handlePdfValidation}
                        />
                    </div>

                    <div className="projectclosure-form-row">
                        <label>6. An Affidavit regarding the structural liability has to be submitted as per RERA format(F7) <RequiredStar /></label>
                        <input
                            type="file"
                            name="unsoldUnitsDoc"
                            accept=".pdf"
                            required
                            onChange={handlePdfValidation}
                        />
                    </div>

                    <div className="projectclosure-form-row">
                        <label>7. Consolidated Bank Statement of RERA designated bank account <RequiredStar /></label>
                        <input
                            type="file"
                            name="reraBankStatementDoc"
                            accept=".pdf"
                            required
                            onChange={handlePdfValidation}
                        />
                    </div>

                    <div className="projectclosure-form-row">
                        <label>8. Latest Photographs of the project <RequiredStar /></label>
                        <input
                            type="file"
                            name="projectPhotosDoc"
                            accept="image/png, image/jpeg, image/jpg"
                            multiple
                            required
                            onChange={handleImageValidation}
                        />
                    </div>


                    <div className="projectclosure-button-row">
                        <button type="reset" className="projectclosure-reset-btn">Reset</button>
                        <button type="submit" className="projectclosure-submit-btn">Submit Application</button>
                    </div>

                </form>

            </div>

        </div>

    );
}