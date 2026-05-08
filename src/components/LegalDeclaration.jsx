// import React from "react";

// const LegalDeclaration = ({ formData, handleInputChange }) => {
//   return (
//     <div className="form-section legal-box">
//       <div className="row innerdivrow">
//   <div className="col-sm-12">
//     <label className="legal-inline">
//       <input
//         type="checkbox"
//         name="legalDeclarationAccepted"
//         checked={formData.legalDeclarationAccepted}
//         onChange={handleInputChange}
//         required
//       />
//       <span>
//         The Authority is at a liberty to initiate legal action on the said
//         project, if the above stated facts in the table is false.
//       </span>
//     </label>
//   </div>
// </div>

//     </div>
//   );
// };

// export default LegalDeclaration;


import React from "react";

const LegalDeclaration = ({ formData, handleInputChange }) => {
  return (
    <div className="form-section legal-box">
      <div className="row innerdivrow">
        <div className="col-sm-12">
          <label className="legal-inline">
          <input
            type="checkbox"
            name="legalDeclarationAccepted"
            checked={formData.legalDeclarationAccepted}
            onChange={handleInputChange}
            required
          />
          <span className="label" style={{ marginLeft: "8px" }}>
            The Authority is at a liberty to initiate legal action on the said
            project, if the above stated facts in the table is false.
          </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LegalDeclaration;