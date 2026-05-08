import React from "react";

const scrutiny_ExistingLegalDeclaration = ({ formData }) => {

  const isAccepted = formData?.legalDeclarationAccepted;

  return (
    <div className="form-section legal-box">

      <div className="row innerdivrow">
        <div className="col-sm-12">

          <div className="display-group">

            <span className="display-label">Legal Declaration</span>

            <span className="display-field">
              {isAccepted ? "✔ Accepted" : "✖ Not Accepted"}
            </span>

            <span className="display-field" style={{ marginTop: "6px" }}>
              The Authority is at a liberty to initiate legal action on the said
              project, if the above stated facts in the table is false.
            </span>

          </div>

        </div>
      </div>

    </div>
  );
};

export default scrutiny_ExistingLegalDeclaration;