import React from "react";

const ProjectRegistrationSection = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit
}) => {
  return (
    <>
      <h2 className="page-title">Project Registration</h2>

      <form onSubmit={handleSubmit} className="project-form">
 {/* Project Basic Information */}
                <div className="form-section">
                    <div className="row innerdivrow">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Project Name<font color="red">*</font>
                                </label>
                                <input 
                                    type="text" 
                                    name="projectName"
                                    maxLength="50"
                                    className="form-control inputbox"
                                    placeholder="Project Name"
                                    value={formData.projectName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">Project Description</label>
                                <input 
                                    type="text" 
                                    name="projectDescription"
                                    maxLength="500"
                                    className="form-control inputbox"
                                    placeholder="Project Description"
                                    value={formData.projectDescription}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Project Type<font color="red">*</font>
                                </label>
                                <select 
                                    name="projectType"
                                    className="form-control inputbox"
                                    value={formData.projectType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="0">Select</option>
                                    <option value="1">Residential</option>
                                    <option value="2">Commercial</option>
                                    <option value="3">Mixed Development</option>
                                    <option value="7">Layout for Plots</option>
                                    <option value="8">Layouts for Plots &amp; Buildings</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Project Status<font color="red">*</font>
                                </label>
                                <select 
                                    name="projectStatus"
                                    className="form-control inputbox"
                                    value={formData.projectStatus}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="0">Select</option>
                                    <option value="3">Under Development</option>
                                    <option value="4">New Project</option>
                                </select>
                            </div>
                        </div>
                  </div>

                    {/* Building Plan Details */}
                    
                  <div className="row innerdivrow">

  {/* COLUMN 1 */}
  <div className="col-sm-3">
    <div className="form-group">
      <label className="label">
        Building Plan No<font color="red">*</font>
      </label>
      <input
        type="text"
        name="buildingPlanNo"
        className="form-control inputbox"
        placeholder="Plan No"
        value={formData.buildingPlanNo}
        onChange={handleInputChange}
        required
      />
    </div>

    {/* RED NOTES */}
    <div className="note-text">
      <div>
        <strong>Note :</strong> Copy the BA No. from DPMS Website &amp; Paste
        <a href="http://apdpms.ap.gov.in//#" target="_blank" rel="noreferrer">
          {" "}Click Here
        </a>
      </div>
      <div>
        Enter Only FLP No. for Layouts &amp; Building Permit No. for Buildings
      </div>
    </div>
  </div>

  {/* COLUMN 2 */}
  <div className="col-sm-3">
    <div className="form-group">
      <label className="label">
        Building Permission Validity From <font color="red">*</font>
      </label>
      <input
        type="text"
        className="form-control inputbox disabled-look"
        placeholder="From Date"
        value={formData.buildingPermissionFrom}
        onChange={handleInputChange}
        readOnly
      />
    </div>

    <div className="form-group">
      <label className="label">
        Proposed Date of Completion of the Project<font color="red">*</font>
      </label>
      <input
        type="text"
        className="form-control inputbox disabled-look"
        placeholder="Proposed Date of Completion of the Project"
        value={formData.proposedCompletionDate}
        onChange={handleInputChange}
        readOnly
      />
    </div>
  </div>

  {/* COLUMN 3 */}
  <div className="col-sm-3">
    <div className="form-group">
      <label className="label">
        Building Permission Validity Upto <font color="red">*</font>
      </label>
      <input
        type="text"
        className="form-control inputbox disabled-look"
        placeholder="To Date"
        value={formData.buildingPermissionUpto}
        onChange={handleInputChange}
        readOnly
      />
    </div>
  </div>

  {/* COLUMN 4 */}
  <div className="col-sm-3">
    <div className="form-group">
      <label className="label">
        Date of Commencement of the Project<font color="red">*</font>
      </label>
      <input
        type="text"
        className="form-control inputbox disabled-look"
        placeholder="Date of Commencement of the Project"
        value={formData.dateOfCommencement}
        onChange={handleInputChange}
        readOnly
      />
    </div>
  </div>

</div>



                    <div className="row innerdivrow">
  <div className="col-sm-3">
    <div className="form-group">
      <label className="label">
        Total Area Of Land (in Sq.m)<font color="red">*</font>
      </label>
      <input
        type="text"
        name="totalAreaOfLand"
        maxLength="15"
        className="form-control inputbox allownumericwithdecimal"
        placeholder="Area Of Land"
        value={formData.totalAreaOfLand}
        onChange={handleInputChange}
        required
      />
    </div>
  </div>
</div>


<div className="row innerdivrow">
  <div className="col-sm-3">
    <div className="form-group">
      <label className="label">
        Total Plinth Area (in Sq.m)<font color="red">*</font>
      </label>
      <input
        type="text"
        name="totalPlinthArea"
        className="form-control inputbox"
        value={formData.totalPlinthArea}
        placeholder="Total Plinth Area"
        onChange={handleInputChange}
        required
      />
    </div>
  </div>

  <div className="col-sm-3">
    <div className="form-group">
      <label className="label">
        Total Open Area(in Sq.m)<font color="red">*</font>
      </label>
      <input
        type="text"
        name="totalOpenArea"
        className="form-control inputbox"
        value={formData.totalOpenArea}
        placeholder="Total Open Area"
        onChange={handleInputChange}
        readOnly
      />
    </div>
  </div>

  <div className="col-sm-3">
    <div className="form-group">
      <label className="label">
        Total Built-up Area of all the Floors (including stilt area + parking area)
        <font color="red">*</font>
      </label>
      <input
        type="text"
        name="totalBuiltUpArea"
        className="form-control inputbox"
        placeholder="Total Built-up Area"
        value={formData.totalBuiltUpArea}
        onChange={handleInputChange}
        required
      />
    </div>
  </div>

  <div className="col-sm-3">
    <div className="form-group">
      <label className="label">
        No. of Garages Available for Sale<font color="red">*</font>
      </label>
      <input
        type="text"
        name="garagesAvailableForSale"
        className="form-control inputbox"
        placeholder="Total Open Area"
        value={formData.garagesAvailableForSale}
        onChange={handleInputChange}
        required
      />
    </div>
  </div>
</div>

<div className="row innerdivrow">
  <div className="col-sm-3">
    <label className="label">
      Total Area of Garages(in Sq.m)<font color="red">*</font>
    </label>
    <input
      type="text"
      name="totalGarageArea"
      className="form-control inputbox"
      value={formData.totalGarageArea}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="col-sm-3">
    <label className="label">
      No. of Open Parking Spaces<font color="red">*</font>
    </label>
    <input
      type="text"
      name="openParkingSpaces"
      className="form-control inputbox"
      value={formData.openParkingSpaces}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="col-sm-3">
    <label className="label">
      Total Open Parking Area(in Sq.m)<font color="red">*</font>
    </label>
    <input
      type="text"
      name="totalOpenParkingArea"
      className="form-control inputbox"
      value={formData.totalOpenParkingArea}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="col-sm-3">
    <label className="label">
      No. of Covered Parking Spaces<font color="red">*</font>
    </label>
    <input
      type="text"
      name="coveredParkingSpaces"
      className="form-control inputbox"
      value={formData.coveredParkingSpaces}
      onChange={handleInputChange}
      required
    />
  </div>
</div>


<div className="row innerdivrow">
  <div className="col-sm-3">
    <label className="label">
      Total Covered Parking Area(in Sq.m)<font color="red">*</font>
    </label>
    <input
      type="text"
      name="totalCoveredParkingArea"
      className="form-control inputbox"
      value={formData.totalCoveredParkingArea}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="col-sm-3">
    <label className="label">
      Estimated Cost of Construction (including Cost of Development of Facilities)(₹)<font color="red">*</font>
    </label>
    <input
      type="text"
      name="estimatedConstructionCost"
      className="form-control inputbox"
      value={formData.estimatedConstructionCost}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="col-sm-3">
    <label className="label">
      Cost of Land (₹)<font color="red">*</font>
    </label>
    <input
      type="text"
      name="costOfLand"
      className="form-control inputbox"
      value={formData.costOfLand}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="col-sm-3">
    <label className="label">
      Total Project Cost (₹)<font color="red">*</font>
    </label>
    <input
      type="text"
      name="totalProjectCost"
      className="form-control inputbox"
      value={formData.totalProjectCost}
      readOnly
      required
    />
  </div>
</div>


                    {/* Additional Area Details */}
      </div>


      </form>
    </>
  );
};

export default ProjectRegistrationSection;