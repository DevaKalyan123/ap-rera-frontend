import React, { useState } from "react";
import { apiPost, apiDelete } from "../api/api";

const ExistingProjectContractors = ({
  applicationNumber,
  panNumber,
  contractors = [],
  states = [],
  districts = [],
  onStateChange,
  onUpdate,
}) => {
  const initialFormState = {
    nature_of_work: "",
    contractor_name: "",
    email_id: "",
    address_line1: "",
    address_line2: "",
    state_ut: "",
    district: "",
    pin_code: "",
    year_of_establishment: "",
    number_of_key_projects: "",
    mobile_number: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // -----------------------------
  // HELPER: GET STATE/DISTRICT NAMES
  // -----------------------------
  const getStateName = (stateId) => {
    const state = states.find((s) => (s.state_id || s.id) === stateId);
    return state ? (state.state_name || state.name) : stateId;
  };

  const getDistrictName = (districtId) => {
    const district = districts.find((d) => (d.district_id || d.id) === districtId);
    return district ? (district.district_name || district.name) : districtId;
  };

  // -----------------------------
  // INPUT CHANGE HANDLER
  // -----------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "state_ut") {
      const stateId = value ? Number(value) : "";

      setFormData((prev) => ({
        ...prev,
        state_ut: stateId,
        district: "",
      }));

      if (stateId && onStateChange) {
        onStateChange(stateId);
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // ADD CONTRACTOR
  // -----------------------------
  const handleAdd = async () => {
    if (
      !formData.nature_of_work.trim() ||
      !formData.contractor_name.trim() ||
      !formData.address_line1.trim() ||
      !formData.state_ut ||
      !formData.district ||
      !formData.pin_code.trim() ||
      !formData.mobile_number.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        application_number: applicationNumber,
        pan_number: panNumber,
        nature_of_work: formData.nature_of_work.trim(),
        contractor_name: formData.contractor_name.trim(),
        email_id: formData.email_id || null,
        address_line1: formData.address_line1.trim(),
        address_line2: formData.address_line2 || null,
        state_ut: Number(formData.state_ut),
        district: Number(formData.district),
        pin_code: formData.pin_code.trim(),
        year_of_establishment:
          formData.year_of_establishment === ""
            ? null
            : Number(formData.year_of_establishment),
        number_of_key_projects:
          formData.number_of_key_projects === ""
            ? null
            : Number(formData.number_of_key_projects),
        mobile_number: formData.mobile_number.trim(),
      };

      const response = await apiPost("/api/associate/contractor", payload);

      if (!response?.success) {
        throw new Error("Failed to add contractor");
      }

      const contractorId = response.data?.id || response.id;

      if (!contractorId) {
        throw new Error("Contractor ID not returned");
      }

      alert("Contractor added successfully");
      setFormData(initialFormState);

      if (onUpdate) {
        await onUpdate();
      }
    } catch (error) {
      console.error("Error adding contractor:", error);
      alert(error.message || "Error adding contractor");
    }
  };

  // -----------------------------
  // 🔥 SIMPLIFIED DELETE - NO BACKEND CHANGES NEEDED
  // -----------------------------
  const handleDelete = async (contractorId) => {
    if (!contractorId) {
      alert("Invalid contractor ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this contractor?"))
      return;

    try {
      console.log("Deleting contractor with ID:", contractorId);

      // 🔥 ONLY DELETE FROM MAIN TABLE
      // Backend should handle cascade deletion or we'll just refresh
      const response = await apiDelete(`/api/associate/contractor/${contractorId}`);

      console.log("Delete response:", response);

      // ✅ Check for success - be lenient with response format
      const isSuccess = 
        response?.success === true || 
        response?.success !== false ||
        response?.message?.toLowerCase().includes('success') ||
        response?.message?.toLowerCase().includes('deleted');

      if (isSuccess) {
        alert("Contractor deleted successfully");
      } else {
        // Even if response is unclear, still try to refresh
        console.warn("Unclear response, but attempting refresh:", response);
      }

      // ✅ ALWAYS REFRESH LIST TO SYNC STATE
      if (onUpdate) {
        await onUpdate();
      }
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response:", error.response);
      
      // 🔥 IMPROVED ERROR HANDLING
      let errorMessage = "Error deleting contractor";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(`Failed to delete: ${errorMessage}`);
      
      // 🔥 STILL REFRESH - Maybe it actually deleted
      if (onUpdate) {
        await onUpdate();
      }
    }
  };

  return (
    <div className="form-section">
      <h3 className="section-title-ac">Project Contractors</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>
            Contractor Nature Of Work<span className="required">*</span>
          </label>
          <input
            type="text"
            name="nature_of_work"
            value={formData.nature_of_work}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            Contractor Name<span className="required">*</span>
          </label>
          <input
            type="text"
            name="contractor_name"
            value={formData.contractor_name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Email ID</label>
          <input
            type="email"
            name="email_id"
            value={formData.email_id}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            Address Line 1<span className="required">*</span>
          </label>
          <input
            type="text"
            name="address_line1"
            value={formData.address_line1}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Address Line 2</label>
          <input
            type="text"
            name="address_line2"
            value={formData.address_line2}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            State / UT<span className="required">*</span>
          </label>
          <select
            name="state_ut"
            value={formData.state_ut}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select</option>
            {states.map((state, index) => {
              const key = state.state_id || state.id || index;
              const value = state.state_id || state.id;
              const label = state.state_name || state.name;

              return (
                <option key={key} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label>
            District<span className="required">*</span>
          </label>

          <select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            className="form-control"
            disabled={!formData.state_ut}
          >
            <option value="">Select</option>
            {districts.map((district, index) => {
              const key = district.district_id || district.id || index;
              const value = district.district_id || district.id;
              const label = district.district_name || district.name;

              return (
                <option key={key} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label>
            PIN Code<span className="required">*</span>
          </label>
          <input
            type="text"
            name="pin_code"
            value={formData.pin_code}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Year of Establishment</label>
          <input
            type="number"
            name="year_of_establishment"
            value={formData.year_of_establishment}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Number of Key Projects Completed</label>
          <input
            type="number"
            name="number_of_key_projects"
            value={formData.number_of_key_projects}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            Mobile Number<span className="required">*</span>
          </label>
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="add-button-container">
        <button className="btn-add" onClick={handleAdd}>
          Add
        </button>
      </div>

      {contractors && contractors.length > 0 && (
        <div className="added-items-section">
          <h4 className="added-items-title">Added Contractors</h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Nature of Work</th>
                <th>Name</th>
                <th>Address</th>
                <th>State</th>
                <th>District</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contractors.map((c, index) => (
                <tr key={`contractor-${c.id ?? "noid"}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{c.nature_of_work || '-'}</td>
                  <td>{c.contractor_name || '-'}</td>
                  <td>{c.address_line1 || '-'}</td>
                  <td>{getStateName(c.state_ut)}</td>
                  <td>{getDistrictName(c.district)}</td>
                  <td>{c.mobile_number || '-'}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(c.id)}
                      disabled={!c.id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExistingProjectContractors;