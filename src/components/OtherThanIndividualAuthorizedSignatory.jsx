// import React from "react";

// const OtherThanIndividualAuthorizedSignatory = ({
//   formData,
//   handleInputChange,
//   handleFileChange,
// }) => {
//   return (
//     <>
//       <h2 className="page-title">Authorized Signatory Details</h2>

//       <div className="form-section">
//         <div className="row innerdivrow">

//           {/* Name */}
//           <div className="col-sm-3">
//             <div className="form-group">
//               <label>Name *</label>
//               <input
//                 type="text"
//                 name="authorizedSignatoryName"
//                 className="form-control"
//                 value={formData.authorizedSignatoryName || ""}
//                 onChange={handleInputChange}
//                 placeholder="Name"
//               />
//             </div>
//           </div>

//           {/* Mobile */}
//           <div className="col-sm-3">
//             <div className="form-group">
//               <label>Mobile Number *</label>
//               <input
//                 type="text"
//                 name="authorizedSignatoryMobile"
//                 className="form-control"
//                 value={formData.authorizedSignatoryMobile || ""}
//                 onChange={handleInputChange}
//                 placeholder="Mobile Number"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div className="col-sm-3">
//             <div className="form-group">
//               <label>Email Id *</label>
//               <input
//                 type="email"
//                 name="authorizedSignatoryEmail"
//                 className="form-control"
//                 value={formData.authorizedSignatoryEmail || ""}
//                 onChange={handleInputChange}
//                 placeholder="Email"
//               />
//             </div>
//           </div>

//           {/* Existing Director/Member */}
//           <div className="col-sm-3">
//             <div className="form-group">
//               <label>
//                 Is the Authorized signatory among the existing director/member *
//               </label>

//               <div>
//                 <label style={{ marginRight: "10px" }}>
//                   <input
//                     type="radio"
//                     name="isExistingDirector"
//                     value="yes"
//                     checked={formData.isExistingDirector === "yes"}
//                     onChange={handleInputChange}
//                   />{" "}
//                   Yes
//                 </label>

//                 <label>
//                   <input
//                     type="radio"
//                     name="isExistingDirector"
//                     value="no"
//                     checked={formData.isExistingDirector === "no"}
//                     onChange={handleInputChange}
//                   />{" "}
//                   No
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Passport Photo Upload */}
//           <div className="col-sm-3">
//             <div className="form-group">
//               <label>Passport size photograph of Authorised Signatory</label>
//               <input
//                 type="file"
//                 name="authorizedSignatoryPhoto"
//                 className="form-control"
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>

//           {/* Board Resolution Upload */}
//           <div className="col-sm-3">
//             <div className="form-group">
//               <label>Copy of Board Resolution for Authorised signatory</label>
//               <input
//                 type="file"
//                 name="boardResolutionCopy"
//                 className="form-control"
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default OtherThanIndividualAuthorizedSignatory;

import React from "react";
import { BASE_URL } from "../api/api";

const OtherThanIndividualAuthorizedSignatory = ({
  formData = {},
  handleInputChange,
  handleFileChange,
}) => {

  /* ================= FILE HELPERS ================= */

  const getFileUrl = (path) => {
    if (!path) return "";
    if (path instanceof File) return "";
    return `${BASE_URL}/${path.replace(/\\/g, "/")}`;
  };

  const getFileName = (path) => {
    if (!path) return "No file chosen";
    if (path instanceof File) return path.name;
    return path.replace(/\\/g, "/").split("/").pop();
  };

  const FileInputBox = ({ path, name }) => {
    const fileUrl = getFileUrl(path);
    const fileName = getFileName(path);

    return (
      <div style={{ marginBottom: "10px" }}>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "6px 12px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            fontSize: "14px",
          }}
        >
          {/* File Name */}
          <div
            style={{
              maxWidth: "60%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {fileName}
          </div>

          {/* Actions */}
          <div>
            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginRight: "15px",
                  fontSize: "14px",
                  color: "#ffc107",
                  textDecoration: "none",
                }}
              >
                View
              </a>
            )}

            <label
              style={{
                cursor: "pointer",
                color: "#007bff",
                fontSize: "14px",
              }}
            >
              Choose
              <input
                type="file"
                hidden
                name={name}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="form-section">

      <div className="subheading">
        Authorized Signatory Details
      </div>

      {/* ===== ROW 1 ===== */}
      <div className="innerdivrow">

        <div className="col-sm-3 form-group">
          <label className="label">Name *</label>
          <input
            type="text"
            name="authorizedSignatoryName"
            className="inputbox"
            value={formData.authorizedSignatoryName || ""}
            onChange={handleInputChange}
            placeholder="Name"
          />
        </div>

        <div className="col-sm-3 form-group">
          <label className="label">Mobile Number *</label>
          <input
            type="text"
            name="authorizedSignatoryMobile"
            className="inputbox"
            value={formData.authorizedSignatoryMobile || ""}
            onChange={handleInputChange}
            placeholder="Mobile Number"
          />
        </div>

        <div className="col-sm-3 form-group">
          <label className="label">Email Id *</label>
          <input
            type="email"
            name="authorizedSignatoryEmail"
            className="inputbox"
            value={formData.authorizedSignatoryEmail || ""}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div>

        <div className="col-sm-3 form-group">
          <label className="label">
            Is the Authorized signatory among the existing director/member *
          </label>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="isExistingDirector"
                value="yes"
                checked={formData.isExistingDirector === "yes"}
                onChange={handleInputChange}
              />{" "}
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="isExistingDirector"
                value="no"
                checked={formData.isExistingDirector === "no"}
                onChange={handleInputChange}
              />{" "}
              No
            </label>
          </div>
        </div>

      </div>

      {/* ===== ROW 2 (FILE UPLOADS) ===== */}
      <div className="innerdivrow">

        {/* Passport Photo */}
        <div className="col-sm-3 form-group">
          <label className="label">
            Passport size photograph of Authorised Signatory
          </label>

          <FileInputBox
  path={
    formData.authorizedSignatoryPhoto || 
    formData.authorizedSignatoryPhotoPath
  }
  name="authorizedSignatoryPhoto"
/>
        </div>

        {/* Board Resolution */}
        <div className="col-sm-3 form-group">
          <label className="label">
            Copy of Board Resolution for Authorised signatory
          </label>

          <FileInputBox
  path={
    formData.boardResolutionCopy || 
    formData.boardResolutionCopyPath
  }
  name="boardResolutionCopy"
/>
        </div>

      </div>

    </div>
  );
};

export default OtherThanIndividualAuthorizedSignatory;