import React, { useState } from "react";
import { apiPost, apiDelete } from "../api/api";

const Architects = ({
  architects = [],
  states = [],
  districts = [],
  applicationNumber,
  panNumber,
  onStateChange,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    architect_name: "",
    email_id: "",
    address_line1: "",
    address_line2: "",
    state_ut: "",
    district: "",
    pin_code: "",
    year_of_establishment: "",
    number_of_key_projects: "",
    coa_registration_number: "",
    mobile_number: "",
  });

  // -----------------------------
  // INPUT CHANGE HANDLER
  // -----------------------------
  const handleInputChange = (e) => {
  const { name, value } = e.target;

  // ⭐ State change logic (KEEP)
  if (name === "state_ut") {
    const stateId = value ? Number(value) : "";

    setFormData((prev) => ({
      ...prev,
      state_ut: stateId,
      district: "",
    }));

    if (stateId) onStateChange(stateId);
    return;
  }

  // ✅ Architect name → letters only
  if (name === "architect_name" && !/^[a-zA-Z\s.]*$/.test(value)) {
    return;
  }

  // ✅ Mobile → numbers only
  if (name === "mobile_number" && !/^\d*$/.test(value)) {
    return;
  }

  // ✅ PIN → numbers only
  if (name === "pin_code" && !/^\d*$/.test(value)) {
    return;
  }

  // ✅ COA Registration → A-Z / numbers / -
  if (name === "coa_registration_number" && !/^[A-Za-z0-9/-]*$/.test(value)) {
    return;
  }

  // ✅ Year + Projects → numbers only
  if (
    ["year_of_establishment", "number_of_key_projects"].includes(name) &&
    !/^\d*$/.test(value)
  ) {
    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]:
      name === "coa_registration_number"
        ? value.toUpperCase()
        : value.trimStart(),
  }));
};
// ⭐ Architect Validation (Enterprise)
const validateArchitect = () => {
  const errors = {};

  const currentYear = new Date().getFullYear();

  if (formData.email_id &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) {
    errors.email = "Invalid email format";
  }

  if (!/^\d{6}$/.test(formData.pin_code)) {
    errors.pin = "PIN code must be 6 digits";
  }

  if (!/^[6-9]\d{9}$/.test(formData.mobile_number)) {
    errors.mobile = "Enter valid 10 digit mobile number";
  }

  if (
    formData.year_of_establishment &&
    Number(formData.year_of_establishment) > currentYear
  ) {
    errors.year = "Year cannot be in future";
  }

  return errors;
};

  // -----------------------------
  // ADD ARCHITECT
  // -----------------------------
  const handleAdd = async () => {
    const requiredFields = [
      "architect_name",
      "address_line1",
      "state_ut",
      "district",
      "pin_code",
      "coa_registration_number",
      "mobile_number",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert("Please fill all required fields");
        return;
      }
    }
    const validationErrors = validateArchitect();

if (Object.keys(validationErrors).length > 0) {
  alert(Object.values(validationErrors)[0]);
  return;
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

      // 1️⃣ CREATE ARCHITECT
      const response = await apiPost("/api/associate/architect", payload);

      if (!response?.success) {
        throw new Error("Failed to create architect");
      }

      const architectId = response.data?.id || response.data?.data?.id;

      if (!architectId) {
        throw new Error("Architect ID not returned from API");
      }

      // 2️⃣ LINK ARCHITECT TO APPLICATION
      await apiPost("/api/application/associate", {
        application_number: applicationNumber,
        pan_number: panNumber,
        associate_type: "architect",
        associate_id: architectId,
      });

      alert("Architect added successfully");

      // 3️⃣ RESET FORM
      setFormData({
        architect_name: "",
        email_id: "",
        address_line1: "",
        address_line2: "",
        state_ut: "",
        district: "",
        pin_code: "",
        year_of_establishment: "",
        number_of_key_projects: "",
        coa_registration_number: "",
        mobile_number: "",
      });

      // 4️⃣ REFRESH LIST IMMEDIATELY
      if (onUpdate) {
        await onUpdate();
      }

    } catch (error) {
      console.error("Error adding architect:", error);
      alert(error.message || "Error adding architect");
    }
  };

  // -----------------------------
  // DELETE ARCHITECT
  // -----------------------------
  const handleDelete = async (architectId) => {
    if (!window.confirm("Are you sure you want to delete this architect?")) return;

    try {
      const response = await apiDelete(`/api/associate/architect/${architectId}`);

      if (response?.success) {
        alert("Architect deleted successfully");
        
        // ✅ REFRESH LIST IMMEDIATELY
        if (onUpdate) {
          await onUpdate();
        }
      }
    } catch (error) {
      console.error("Error deleting architect:", error);
      alert("Error deleting architect");
    }
  };

  return (
    <div className="form-section">
      <h3 className="section-title-ac">Project Architects</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>
            Architect Name<span className="required">*</span>
          </label>
          <input
            type="text"
            name="architect_name"
            value={formData.architect_name}
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
            {states.map((state, index) => (
              <option
                key={state.state_id ?? state.id ?? index}
                value={state.state_id ?? state.id}
              >
                {state.state_name ?? state.name}
              </option>
            ))}
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
            {districts.map((district, index) => (
              <option
                key={district.district_id ?? district.id ?? index}
                value={district.district_id ?? district.id}
              >
                {district.district_name ?? district.name}
              </option>
            ))}
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
            Reg. Number With COA<span className="required">*</span>
          </label>
          <input
            type="text"
            name="coa_registration_number"
            value={formData.coa_registration_number}
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

      {/* ✅ DISPLAY ADDED ARCHITECTS IMMEDIATELY */}
      {architects && architects.length > 0 && (
        <div className="added-items-section">
          <h4 className="added-items-title">Added Architects</h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>COA No</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {architects.map((a, index) => (
                <tr key={a.id || index}>
                  <td>{index + 1}</td>
                  <td>{a.architect_name}</td>
                  <td>{a.email_id || '-'}</td>
                  <td>{a.address_line1}</td>
                  <td>{a.mobile_number}</td>
                  <td>{a.coa_registration_number}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(a.id)}
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

export default Architects;
