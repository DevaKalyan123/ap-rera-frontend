const scrutiny_ExistingProjectRegistrationSection = ({
  formData,
}) => {
  return (
    <>
      <h2 className="page-title">Project Registration</h2>

      <div className="form-section">

        {/* ================= BASIC INFO ================= */}
        <div className="row innerdivrow">

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Project Name</span>
              <span className="display-field">
                {formData?.projectName || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Project Description</span>
              <span className="display-field">
                {formData?.projectDescription || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Project Type</span>
              <span className="display-field">
                {formData?.projectType === "1" && "Residential"}
                {formData?.projectType === "2" && "Commercial"}
                {formData?.projectType === "3" && "Mixed Development"}
                {formData?.projectType === "7" && "Layout for Plots"}
                {formData?.projectType === "8" && "Layouts for Plots & Buildings"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Project Status</span>
              <span className="display-field">
                {formData?.projectStatus === "3" && "Under Development"}
                {formData?.projectStatus === "4" && "New Project"}
              </span>
            </div>
          </div>

        </div>

        {/* ================= BUILDING DETAILS ================= */}
        <div className="row innerdivrow">

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Building Plan No</span>
              <span className="display-field">
                {formData?.buildingPlanNo || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Permission From</span>
              <span className="display-field">
                {formData?.buildingPermissionFrom || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Permission Upto</span>
              <span className="display-field">
                {formData?.buildingPermissionUpto || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Commencement Date</span>
              <span className="display-field">
                {formData?.dateOfCommencement || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Completion Date</span>
              <span className="display-field">
                {formData?.proposedCompletionDate || "NA"}
              </span>
            </div>
          </div>

        </div>

        {/* ================= AREA ================= */}
        <div className="row innerdivrow">

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Total Land Area</span>
              <span className="display-field">
                {formData?.totalAreaOfLand || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Plinth Area</span>
              <span className="display-field">
                {formData?.totalPlinthArea || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Open Area</span>
              <span className="display-field">
                {formData?.totalOpenArea || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Built-up Area</span>
              <span className="display-field">
                {formData?.totalBuiltUpArea || "NA"}
              </span>
            </div>
          </div>

        </div>

        {/* ================= PARKING ================= */}
        <div className="row innerdivrow">

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Garages</span>
              <span className="display-field">
                {formData?.garagesAvailableForSale || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Garage Area</span>
              <span className="display-field">
                {formData?.totalGarageArea || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Open Parking</span>
              <span className="display-field">
                {formData?.openParkingSpaces || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Open Parking Area</span>
              <span className="display-field">
                {formData?.totalOpenParkingArea || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Covered Parking</span>
              <span className="display-field">
                {formData?.coveredParkingSpaces || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Covered Parking Area</span>
              <span className="display-field">
                {formData?.totalCoveredParkingArea || "NA"}
              </span>
            </div>
          </div>

        </div>

        {/* ================= COST ================= */}
        <div className="row innerdivrow">

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Construction Cost</span>
              <span className="display-field">
                {formData?.estimatedConstructionCost || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Land Cost</span>
              <span className="display-field">
                {formData?.costOfLand || "NA"}
              </span>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="display-group">
              <span className="display-label">Total Cost</span>
              <span className="display-field">
                {formData?.totalProjectCost || "NA"}
              </span>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default scrutiny_ExistingProjectRegistrationSection;