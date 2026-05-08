import React, { useState } from "react";
import { apiPost, apiDelete } from "../api/api";

const StructuralEngineers = ({
  engineers = [],
  states = [],
  districts = [],
  applicationNumber,
  panNumber,
  onStateChange,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    engineer_name: "",
    email_id: "",
    address_line1: "",
    address_line2: "",
    state_ut: "",
    district: "",
    pin_code: "",
    year_of_establishment: "",
    number_of_key_projects: "",
    licence_number: "",
    mobile_number: "",
  });

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
  // INPUT CHANGE
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
  // ADD STRUCTURAL ENGINEER
  // -----------------------------
  const handleAdd = async () => {
    const requiredFields = [
      "engineer_name",
      "address_line1",
      "state_ut",
      "district",
      "pin_code",
      "licence_number",
      "mobile_number",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert("Please fill all required fields");
        return;
      }
    }

    try {
      const payload = {
        application_number: applicationNumber,
        pan_number: panNumber,
        ...formData,
        state_ut: Number(formData.state_ut),
        district: Number(formData.district),
        year_of_establishment:
          formData.year_of_establishment === ""
            ? null
            : Number(formData.year_of_establishment),
        number_of_key_projects:
          formData.number_of_key_projects === ""
            ? null
            : Number(formData.number_of_key_projects),
      };

      const response = await apiPost("/api/associate/structural-engineer", payload);

      if (!response?.success) {
        throw new Error("Failed to add structural engineer");
      }

      const engineerId = response.data?.id || response.id;

      if (!engineerId) {
        throw new Error("Structural Engineer ID not returned");
      }

      await apiPost("/api/application/associate", {
        application_number: applicationNumber,
        pan_number: panNumber,
        associate_type: "engineer",
        associate_id: engineerId,
      });

      alert("Structural Engineer added successfully");

      setFormData({
        engineer_name: "",
        email_id: "",
        address_line1: "",
        address_line2: "",
        state_ut: "",
        district: "",
        pin_code: "",
        year_of_establishment: "",
        number_of_key_projects: "",
        licence_number: "",
        mobile_number: "",
      });

      if (onUpdate) {
        await onUpdate();
      }
    } catch (error) {
      console.error("Error adding structural engineer:", error);
      alert(error.message || "Error adding structural engineer");
    }
  };

  // -----------------------------
  // 🔥 SIMPLIFIED DELETE - NO BACKEND CHANGES NEEDED
  // -----------------------------
  const handleDelete = async (engineerId) => {
    if (!engineerId) {
      alert("Invalid engineer ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this structural engineer?"))
      return;

    try {
      console.log("Deleting engineer with ID:", engineerId);

      // 🔥 ONLY DELETE FROM MAIN TABLE
      // Backend should handle cascade deletion or we'll just refresh
      const response = await apiDelete(`/api/associate/structural-engineer/${engineerId}`);

      console.log("Delete response:", response);

      // ✅ Check for success - be lenient with response format
      const isSuccess = 
        response?.success === true || 
        response?.success !== false ||
        response?.message?.toLowerCase().includes('success') ||
        response?.message?.toLowerCase().includes('deleted');

      if (isSuccess) {
        alert("Structural Engineer deleted successfully");
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
      let errorMessage = "Error deleting structural engineer";
      
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
      <h3 className="section-title-ac">Structural Engineers</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>
            Engineer Name<span className="required">*</span>
          </label>
          <input
            type="text"
            name="engineer_name"
            value={formData.engineer_name}
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
          <label>Year of establishment</label>
          <input
            type="number"
            name="year_of_establishment"
            placeholder="YYYY"
            value={formData.year_of_establishment}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Number of key projects completed</label>
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
            Licence Number<span className="required">*</span>
          </label>
          <input
            type="text"
            name="licence_number"
            value={formData.licence_number}
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

      {engineers && engineers.length > 0 && (
        <div className="added-items-section">
          <h4 className="added-items-title">Added Structural Engineers</h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>State</th>
                <th>District</th>
                <th>Mobile</th>
                <th>Licence</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {engineers.map((e, index) => (
                <tr key={e.id || index}>
                  <td>{index + 1}</td>
                  <td>{e.engineer_name || '-'}</td>
                  <td>{e.email_id || '-'}</td>
                  <td>{e.address_line1 || '-'}</td>
                  <td>{getStateName(e.state_ut)}</td>
                  <td>{getDistrictName(e.district)}</td>
                  <td>{e.mobile_number || '-'}</td>
                  <td>{e.licence_number || '-'}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(e.id)}
                      disabled={!e.id}
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

export default StructuralEngineers;