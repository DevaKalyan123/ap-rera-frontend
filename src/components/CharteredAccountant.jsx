import React, { useState } from "react";
import { apiPost, apiDelete } from "../api/api";

const CharteredAccountant = ({
  accountants = [],
  states = [],
  districts = [],
  applicationNumber,
  panNumber,
  onStateChange,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    accountant_name: "",
    email_id: "",
    address_line1: "",
    address_line2: "",
    state_ut: "",
    district: "",
    pin_code: "",
    icai_member_id: "",
    number_of_key_projects: "",
    mobile_number: "",
  });

  // -----------------------------
  // INPUT CHANGE
  // -----------------------------
  const handleInputChange = (e) => {
  const { name, value } = e.target;

  // ⭐ State logic (KEEP)
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

  // ✅ Accountant name → letters only
  if (name === "accountant_name" && !/^[a-zA-Z\s.]*$/.test(value)) {
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

  // ✅ ICAI ID → uppercase letters + numbers
  if (name === "icai_member_id" && !/^[A-Za-z0-9/-]*$/.test(value)) {
    return;
  }

  // ✅ Projects → numbers only
  if (name === "number_of_key_projects" && !/^\d*$/.test(value)) {
    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]:
      name === "icai_member_id"
        ? value.toUpperCase()
        : value.trimStart(),
  }));
};

// ⭐ Chartered Accountant Validation
const validateAccountant = () => {
  const errors = {};

  if (!/^\d{6}$/.test(formData.pin_code)) {
    errors.pin = "PIN code must be 6 digits";
  }

  if (!/^[6-9]\d{9}$/.test(formData.mobile_number)) {
    errors.mobile = "Enter valid 10 digit mobile number";
  }

  if (
    formData.email_id &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)
  ) {
    errors.email = "Invalid email format";
  }

  if (
    formData.number_of_key_projects &&
    Number(formData.number_of_key_projects) < 0
  ) {
    errors.projects = "Projects cannot be negative";
  }

  return errors;
};

  // -----------------------------
  // ADD
  // -----------------------------
  const handleAdd = async () => {
  if (
    !formData.accountant_name.trim() ||
    !formData.address_line1.trim() ||
    !formData.state_ut ||
    !formData.district ||
    !formData.pin_code.trim() ||
    !formData.icai_member_id.trim() ||
    !formData.mobile_number.trim()
  ) {
    alert("Please fill all required fields");
    return;
  }
  const validationErrors = validateAccountant();

if (Object.keys(validationErrors).length > 0) {
  alert(Object.values(validationErrors)[0]);
  return;
}

  try {
    const payload = {
      application_number: applicationNumber,
      pan_number: panNumber,

      accountant_name: formData.accountant_name.trim(),
      email_id: formData.email_id.trim() || null,
      address_line1: formData.address_line1.trim(),
      address_line2: formData.address_line2.trim() || null,

      state_ut: Number(formData.state_ut),
      district: Number(formData.district),

      pin_code: formData.pin_code.trim(),
      icai_member_id: formData.icai_member_id.trim(),

      number_of_key_projects:
        formData.number_of_key_projects === ""
          ? null
          : Number(formData.number_of_key_projects),

      mobile_number: formData.mobile_number.trim(),
    };

    const response = await apiPost("/api/associate/accountant", payload);

    const accountantId = response.data?.id || response.id;
    if (!accountantId) {
      throw new Error("Accountant ID not returned");
    }

    await apiPost("/api/application/associate", {
      application_number: applicationNumber,
      pan_number: panNumber,
      associate_type: "accountant",
      associate_id: accountantId,
    });

    setFormData({
      accountant_name: "",
      email_id: "",
      address_line1: "",
      address_line2: "",
      state_ut: "",
      district: "",
      pin_code: "",
      icai_member_id: "",
      number_of_key_projects: "",
      mobile_number: "",
    });

    if (onUpdate) {
      await onUpdate();
    }
  } catch (error) {
    console.error("Error adding chartered accountant:", error);
    alert(error.message || "Error adding chartered accountant");
  }
};


  // -----------------------------
  // DELETE
  // -----------------------------
  const handleDelete = async (accountantId) => {
    if (!window.confirm("Are you sure you want to delete this chartered accountant?"))
      return;

    try {
      await apiDelete(`/api/associate/accountant/${accountantId}`);
      alert("Chartered Accountant deleted successfully");
      
      // ✅ REFRESH LIST IMMEDIATELY
      if (onUpdate) {
        await onUpdate();
      }
    } catch (error) {
      console.error("Error deleting chartered accountant:", error);
      alert("Error deleting chartered accountant");
    }
  };

  return (
    <div className="form-section">
      <h3 className="section-title-ac">Chartered Accountant</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>
            Chartered Accountant Name<span className="required">*</span>
          </label>
          <input
            type="text"
            name="accountant_name"
            value={formData.accountant_name}
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
            ICAI Member Id<span className="required">*</span>
          </label>
          <input
            type="text"
            name="icai_member_id"
            value={formData.icai_member_id}
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
        <button type="button" className="btn-add" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* ✅ DISPLAY ADDED ACCOUNTANTS IMMEDIATELY */}
      {accountants && accountants.length > 0 && (
        <div className="added-items-section">
          <h4 className="added-items-title">Added Chartered Accountants</h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>ICAI ID</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accountants.map((a, index) => (
                <tr key={`accountant-${a.id || index}`}>
                  <td>{index + 1}</td>
                  <td>{a.accountant_name}</td>
                  <td>{a.email_id || '-'}</td>
                  <td>{a.address_line1}</td>
                  <td>{a.icai_member_id}</td>
                  <td>{a.mobile_number}</td>
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

export default CharteredAccountant;
