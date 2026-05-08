// import React from "react";

// const ProjectMaterialFacts = ({ formData, handleInputChange }) => {
//   return (
//     <div className="form-section">
//       <h3 className="subheading">Project Material Facts</h3>

//       {/* ===== ROW 1 : FOUR FIELDS ===== */}
//       <div className="row innerdivrow">
//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               No of Units in the projects <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="numberOfUnits"
//               className="inputbox"
//               placeholder="No of Units in the projects"
//               value={formData.numberOfUnits}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               No of Units advances taken <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="unitsAdvanceTaken"
//               className="inputbox"
//               placeholder="No of Units advances taken"
//               value={formData.unitsAdvanceTaken}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               No of units where agreement for sale entered <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="unitsAgreementSale"
//               className="inputbox"
//               placeholder="No of units where agreement for sale entered"
//               value={formData.unitsAgreementSale}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               No of units sold in the project <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="unitsSold"
//               className="inputbox"
//               placeholder="No of units sold in the project"
//               value={formData.unitsSold}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>
//       </div>

//       {/* ===== ROW 2 : DECLARATION TEXT (NO CHECKBOX) ===== */}
//       <div className="row innerdivrow">
//         <div className="col-sm-12">
//           <p className="material-text">
//             The above said information is true to the best of my knowledge. The
//             material facts regarding the above table are not concealed anywhere.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectMaterialFacts;


import React from "react";

const ProjectMaterialFacts = ({ formData, handleInputChange }) => {
  return (
    <div className="form-section">
      <h3 className="subheading">Project Material Facts</h3>

      <div className="row innerdivrow">
        <div className="col-sm-3">
          <div className="form-group">
            <label className="label">
              No of Units in the projects<font color="red">*</font>
            </label>
            <input
              type="number"
              name="numberOfUnits"
              maxLength="6"
              className="form-control inputbox allownumeric"
              placeholder="No of Units in the projects"
              value={formData.numberOfUnits}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="col-sm-3">
          <div className="form-group">
            <label className="label">
              No of Units advances taken<font color="red">*</font>
            </label>
            <input
              type="number"
              name="unitsAdvanceTaken"
              maxLength="6"
              className="form-control inputbox allownumeric"
              placeholder="No of Units advances taken"
              value={formData.unitsAdvanceTaken}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="col-sm-3">
          <div className="form-group">
            <label className="label">
              No of units where agreement for sale entered<font color="red">*</font>
            </label>
            <input
              type="number"
              name="unitsAgreementSale"
              maxLength="6"
              className="form-control inputbox allownumeric"
              placeholder="No of units where agreement for sale entered"
              value={formData.unitsAgreementSale}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="col-sm-3">
          <div className="form-group">
            <label className="label">
              No of units sold in the project<font color="red">*</font>
            </label>
            <input
              type="number"
              name="unitsSold"
              maxLength="6"
              className="form-control inputbox allownumeric"
              placeholder="No of units sold in the project"
              value={formData.unitsSold}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="row innerdivrow">
        <div className="col-sm-12">
          <label className="label">
            The above said information is true to the best of my knowledge. The
            material facts regarding the above table are not concealed anywhere.
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProjectMaterialFacts;