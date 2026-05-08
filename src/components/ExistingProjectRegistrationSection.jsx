const ExistingProjectRegistrationSection = ({
  formData,
  handleInputChange,
 
}) => {
  return (
    <>
      <h2 className="page-title">Project Registration</h2>
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
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label" id="lblPlanNo">Building Plan No<font color="red">*</font></label>
                                <input 
                                    type="text" 
                                    name="buildingPlanNo"
                                    maxLength="50"
                                    className="form-control inputbox"
                                    placeholder="Plan No"
                                    value={formData.buildingPlanNo}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="note-section">
                                <label className="label note">
                                    Note: Copy the BA No. from DPMS Website &amp; Paste 
                                    <a href="http://apdpms.ap.gov.in//#" target="_blank" rel="noopener noreferrer" style={{color: 'blue'}}> Click Here</a>
                                </label>
                                <label className="label note">
                                    Enter Only FLP No. for Layouts &amp; Building Permit No. for Buildings
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Building Permission Validity From <font color="red">*</font>
                                </label>
                                <input 
                                    type="date" 
                                    name="buildingPermissionFrom"
                                    className="form-control inputbox"
                                    value={formData.buildingPermissionFrom}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Building Permission Validity Upto <font color="red">*</font>
                                </label>
                                <input 
                                    type="date" 
                                    name="buildingPermissionUpto"
                                    className="form-control inputbox"
                                    value={formData.buildingPermissionUpto}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Date of Commencement of the Project<font color="red">*</font>
                                </label>
                                <input 
                                    type="date" 
                                    name="dateOfCommencement"
                                    className="form-control inputbox"
                                    value={formData.dateOfCommencement}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Proposed Date of Completion of the Project<font color="red">*</font>
                                </label>
                                <input 
                                    type="date" 
                                    name="proposedCompletionDate"
                                    className="form-control inputbox"
                                    value={formData.proposedCompletionDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Area Details */}
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
                        <div className="col-sm-3" style={{display: 'none'}} id="dvHeight">
                            <div className="form-group">
                                <label className="label" id="lblbuildHeight">
                                    Height of the Building (in Meters)<font color="red">*</font>
                                </label>
                                <input 
                                    type="text" 
                                    name="buildingHeight"
                                    maxLength="15"
                                    className="form-control inputbox allownumericwithdecimal"
                                    placeholder="Height of the Building"
                                    value={formData.buildingHeight}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Area Details */}
                    <div className="row innerdivrow">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Total Plinth Area (in Sq.m)<font color="red">*</font>
                                </label>
                                <input 
                                    type="text" 
                                    name="totalPlinthArea"
                                    maxLength="15"
                                    className="form-control inputbox allownumericwithdecimal"
                                    placeholder="Total Plinth Area"
                                    value={formData.totalPlinthArea}
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
  className="form-control inputbox allownumericwithdecimal"
  value={formData.totalOpenArea}
  readOnly
/>

                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Total Built-up Area of all the Floors (including stilt area + parking area)(in Sq.m)<font color="red">*</font>
                                </label>
                                <input 
                                    type="number" 
                                    name="totalBuiltUpArea"
                                    maxLength="15"
                                    className="form-control inputbox allownumericwithdecimal"
                                    placeholder="Total Built-up Area of all the Floors (including stilt area + parking area)(Sq.m)"
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
                                    maxLength="4"
                                    className="form-control inputbox"
                                    placeholder="No. of Garages Available for Sale"
                                    value={formData.garagesAvailableForSale}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Total Area of Garages(in Sq.m)<font color="red">*</font>
                                </label>
                                <input 
                                    type="number" 
                                    name="totalGarageArea"
                                    maxLength="15"
                                    className="form-control inputbox allownumericwithdecimal"
                                    placeholder="Total Area of Garages"
                                    value={formData.totalGarageArea}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    No. of Open Parking Spaces<font color="red">*</font>
                                </label>number
                                <input 
                                    type="" 
                                    name="openParkingSpaces"
                                    maxLength="4"
                                    className="form-control inputbox allownumeric"
                                    placeholder="No. of Open Parking Spaces"
                                    value={formData.openParkingSpaces}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Total Open Parking Area(in Sq.m)<font color="red">*</font>
                                </label>
                                <input 
                                    type="number" 
                                    name="totalOpenParkingArea"
                                    maxLength="10"
                                    className="form-control inputbox allownumericwithdecimal"
                                    placeholder="Total Open Parking Area(in Sq.m)"
                                    value={formData.totalOpenParkingArea}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    No. of Covered Parking Spaces<font color="red">*</font>
                                </label>
                                <input 
                                    type="number" 
                                    name="coveredParkingSpaces"
                                    maxLength="4"
                                    className="form-control inputbox allownumeric"
                                    placeholder="No. of Covered Parking Spaces"
                                    value={formData.coveredParkingSpaces}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Total Covered Parking Area(in Sq.m)<font color="red">*</font>
                                </label>
                                <input 
                                    type="number" 
                                    name="totalCoveredParkingArea"
                                    maxLength="15"
                                    className="form-control inputbox allownumericwithdecimal"
                                    placeholder="Total Covered Parking Area(in Sq.m)"
                                    value={formData.totalCoveredParkingArea}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cost Details */}
                    <div className="row innerdivrow">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Estimated Cost of Construction (including Cost of Development of Facilities)(₹)<font color="red">*</font>
                                </label>
<input
  type="text"
  name="estimatedConstructionCost"
  value={formData.estimatedConstructionCost}
  onChange={handleInputChange}
  className="form-control inputbox"
  required
/>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Cost of Land (₹)<font color="red">*</font>
                                </label>
{/* Cost of Land */}
<input
  type="text"
  name="costOfLand"
  value={formData.costOfLand}
  onChange={handleInputChange}
  className="form-control inputbox"
  required
/>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label className="label">
                                    Total Project Cost (₹)<font color="red">*</font>
                                </label>
{/* Total Project Cost (AUTO) */}
<input
  type="text"
  name="totalProjectCost"
  value={formData.totalProjectCost}
  readOnly
  className="form-control inputbox"
  required
/>

                            </div>
                        </div>
                    </div>
                </div>


   
    </>
  );
};

export default ExistingProjectRegistrationSection;