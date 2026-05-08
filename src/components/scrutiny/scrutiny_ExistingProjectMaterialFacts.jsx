import React from "react";

const scrutiny_ExistingProjectMaterialFacts = ({ formData }) => {
  const safe = (v) =>
    v !== undefined && v !== null && v !== "" ? v : "NA";

  return (
    <div className="form-section">
      <h3 className="subheading">Project Material Facts</h3>

      <div className="row innerdivrow">

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">
              No of Units in the projects
            </span>
            <span className="display-field">
              {safe(formData?.numberOfUnits)}
            </span>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">
              No of Units advances taken
            </span>
            <span className="display-field">
              {safe(formData?.unitsAdvanceTaken)}
            </span>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">
              No of units where agreement for sale entered
            </span>
            <span className="display-field">
              {safe(formData?.unitsAgreementSale)}
            </span>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">
              No of units sold in the project
            </span>
            <span className="display-field">
              {safe(formData?.unitsSold)}
            </span>
          </div>
        </div>

      </div>

      {/* ===== DECLARATION TEXT ===== */}
      <div className="row innerdivrow">
        <div className="col-sm-12">
          <div className="display-group">
            <span className="display-field">
              The above said information is true to the best of my knowledge.
              The material facts regarding the above table are not concealed anywhere.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default scrutiny_ExistingProjectMaterialFacts;