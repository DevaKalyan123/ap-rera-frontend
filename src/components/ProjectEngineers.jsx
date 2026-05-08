import React, { useState } from "react";
import { apiPost, apiDelete } from "../api/api";

const ProjectEngineers = ({
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
    mobile_number: "",
    number_of_key_projects: "",
  });

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

  if (stateId) {
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
  // ADD
  // -----------------------------
  const handleAdd = async () => {
    if (
      !formData.engineer_name.trim() ||
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

  engineer_name: formData.engineer_name.trim(),
  email_id: formData.email_id || null,
  address_line1: formData.address_line1.trim(),
  address_line2: formData.address_line2 || null,

  // ✅ IDs ONLY
  state_ut: Number(formData.state_ut),
  district: Number(formData.district),

  pin_code: formData.pin_code.trim(),
  mobile_number: formData.mobile_number.trim(),

  number_of_key_projects:
    formData.number_of_key_projects === ""
      ? null
      : Number(formData.number_of_key_projects),
};



      const response = await apiPost("/api/associate/project-engineer", payload);

const engineerId = response.data?.id || response.id;

if (!engineerId) {
  throw new Error("Project Engineer ID not returned");
}

        setFormData({
          engineer_name: "",
          email_id: "",
          address_line1: "",
          address_line2: "",
          state_ut: "",
          district: "",
          pin_code: "",
          mobile_number: "",
          number_of_key_projects: "",
        });

        // ✅ REFRESH LIST IMMEDIATELY
        if (onUpdate) {
          await onUpdate();
        }
      }
    catch (error) {
      console.error("Error adding project engineer:", error);
      alert(error.message || "Error adding project engineer");
    }
  };

  // -----------------------------
  // DELETE
  // -----------------------------
  const handleDelete = async (engineerId) => {
    if (!window.confirm("Are you sure you want to delete this project engineer?"))
      return;

    try {
      await apiDelete(`/api/associate/project-engineer/${engineerId}`);
      alert("Project Engineer deleted successfully");
      
      // ✅ REFRESH LIST IMMEDIATELY
      if (onUpdate) {
        await onUpdate();
      }
    } catch (error) {
      console.error("Error deleting project engineer:", error);
      alert("Error deleting project engineer");
    }
  };

  return (
    <div className="form-section">
      <h3 className="section-title-ac">Project Engineers</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>
            Project Engineer Name<span className="required">*</span>
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
            State/UT<span className="required">*</span>
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

        <div className="form-group">
          <label>Number of Key projects completed</label>
          <input
            type="number"
            name="number_of_key_projects"
            value={formData.number_of_key_projects}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="add-button-container">
        <button type="button" className="btn-add" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* ✅ DISPLAY ADDED ENGINEERS IMMEDIATELY */}
      {engineers && engineers.length > 0 && (
        <div className="added-items-section">
          <h4 className="added-items-title">Added Project Engineers</h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {engineers.map((e, index) => (
                <tr key={`project-engineer-${e.id ?? "noid"}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{e.engineer_name}</td>
                  <td>{e.email_id || '-'}</td>
                  <td>{e.address_line1}</td>
                  <td>{e.mobile_number}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(e.id)}
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

export default ProjectEngineers;