// src/components/NewUserRegistration.jsx
import React, { useState, useEffect } from "react";
import { 
  getStates, 
  getDistricts, 
  submitPromoterRegistration 
} from "../api/api";
import "../styles/promotregistration.css";

const USER_TYPES = [
  "Developer",
  "Builder",
  "Developer & Builder",
];

const CATEGORIES = [
  "Individual",
  "other than Individual",
];

const PROMOTER_TYPES = [
  "Company",
  "Trust/Society",
  "Partnership/LLP Firm",
  "Joint Venture",
  "Government Department/Local Bodies/Government Bodies",
];

const NewUserRegistration = () => {
  const [step, setStep] = useState(1);
  const [pan, setPan] = useState("");
  const [userType, setUserType] = useState("");
  const [category, setCategory] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userInputCaptcha, setUserInputCaptcha] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  // Form data state
  const [formData, setFormData] = useState({
    pan_number: "",
    user_type: "",
    select_category: "",
    name_applicant: "",
    father_name: "",
    mobile_number: "",
    email_id: "",
    state: "",
    district: "",
    upload_document: null
  });
  
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Generate captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let captcha = "";
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  // Initialize captcha
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  // Fetch states on component mount
  useEffect(() => {
    const fetchAllStates = async () => {
      try {
        const statesData = await getStates();
        setStates(statesData);
      } catch (error) {
        console.error("Error fetching states:", error);
        alert("Failed to load states. Please try again.");
      }
    };
    
    fetchAllStates();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    const fetchStateDistricts = async () => {
      if (selectedState) {
        try {
          const districtsData = await getDistricts(selectedState);
          setDistricts(districtsData);
          setSelectedDistrict("");
          setFormData(prev => ({
            ...prev,
            district: ""
          }));
        } catch (error) {
          console.error("Error fetching districts:", error);
          alert("Failed to load districts. Please try again.");
        }
      } else {
        setDistricts([]);
        setSelectedDistrict("");
      }
    };
    
    fetchStateDistricts();
  }, [selectedState]);

  const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

  const handleGetDetails = () => {
    if (!validatePAN(pan)) {
      alert("Invalid PAN Card Number");
      return;
    }
    
    // Set PAN in form data
    setFormData(prev => ({
      ...prev,
      pan_number: pan
    }));
    
    setStep(2);
  };

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserInputCaptcha("");
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        upload_document: file
      }));
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    const stateName = e.target.options[e.target.selectedIndex].text;
    
    setSelectedState(stateId);
    handleInputChange("state", stateName);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    const districtName = e.target.options[e.target.selectedIndex].text;
    
    setSelectedDistrict(districtId);
    handleInputChange("district", districtName);
  };

  const validateForm = () => {
    // Check if captcha matches
    if (userInputCaptcha.toUpperCase() !== captcha) {
      alert("Invalid CAPTCHA! Please enter the correct code.");
      return false;
    }

    // Basic validation for required fields
    if (!formData.user_type) {
      alert("Please select user type");
      return false;
    }

    if (!formData.select_category) {
      alert("Please select category");
      return false;
    }

    if (formData.select_category === "Individual") {
      if (!formData.name_applicant || !formData.father_name || !formData.mobile_number || !formData.email_id) {
        alert("Please fill all required fields for Individual");
        return false;
      }
    } else {
      if (!formData.name_applicant || !formData.mobile_number || !formData.email_id) {
        alert("Please fill all required fields for Organization");
        return false;
      }
    }

    if (!formData.state || !formData.district) {
      alert("Please select state and district");
      return false;
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(formData.mobile_number)) {
      alert("Please enter a valid 10-digit mobile number");
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email_id)) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      // Create FormData for submission
      const submissionData = new FormData();
      
      // Add all form fields
      submissionData.append("pan_number", formData.pan_number);
      submissionData.append("user_type", formData.user_type);
      submissionData.append("select_category", formData.select_category);
      submissionData.append("name_applicant", formData.name_applicant);
      
      if (formData.father_name) {
        submissionData.append("father_name", formData.father_name);
      }
      
      submissionData.append("mobile_number", formData.mobile_number);
      submissionData.append("email_id", formData.email_id);
      submissionData.append("state", formData.state);
      submissionData.append("district", formData.district);
      
      // Add file if exists
      if (formData.upload_document) {
        submissionData.append("upload_document", formData.upload_document);
      }

      // Submit to backend using the API
      const response = await submitPromoterRegistration(submissionData);
      
      alert("Registered Successfully!");
      
      // Reset form
      setPan("");
      setUserType("");
      setCategory("other than Individual");
      setCaptcha(generateCaptcha());
      setUserInputCaptcha("");
      setSelectedState("");
      setSelectedDistrict("");
      setFormData({
        pan_number: "",
        user_type: "",
        select_category: "",
        name_applicant: "",
        father_name: "",
        mobile_number: "",
        email_id: "",
        state: "",
        district: "",
        upload_document: null
      });
      setStep(1);
      
    } catch (error) {
      console.error("Registration error:", error);
      alert(`Registration failed: ${error.message || "Please try again."}`);
    }
  };

  return (
    <div className="pr-nur-page">
      <div className="pr-nur-card">
        {/* Breadcrumb */}
        <div className="pr-nur-breadcrumb">
          You are here : <span>Home</span> /{" "}
          <span className="pr-active">New User Registration</span>
        </div>

        <h2 className="pr-nur-title">New User Registration</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="pr-nur-form">
            <div className="pr-nur-input-row">
              <div className="pr-pan-field">
                <label>
                  PAN Card Number<span className="pr-required">*</span>
                </label>
                <input
                  type="text"
                  value={pan}
                  maxLength={10}
                  placeholder="PAN Card Number"
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                />
              </div>

              <button
                type="button"
                className="pr-nur-btn"
                onClick={handleGetDetails}
              >
                Get Details
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form className="pr-nur-form" onSubmit={handleRegister}>
            <div className="pr-nur-row single">
              <div className="pr-nur-field">
                <label>PAN Card Number *</label>
                <input type="text" value={pan} disabled />
              </div>
            </div>

            {/* User Type & Category */}
            <div className="pr-nur-row two">
              <div className="pr-nur-field">
                <label>
                  Select User Type<span className="pr-required">*</span>
                </label>
                <select
                  value={userType}
                  onChange={(e) => {
                    setUserType(e.target.value);
                    handleInputChange("user_type", e.target.value);
                  }}
                  required
                >
                  <option value="">--Select--</option>
                  {USER_TYPES.map((ut) => (
                    <option key={ut} value={ut}>
                      {ut}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pr-nur-field">
                <label>
                  Select Category<span className="pr-required">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    handleInputChange("select_category", e.target.value);
                  }}
                  required
                >
                  <option value="">--Select--</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ===== INDIVIDUAL / DEFAULT SECTION ===== */}
            {(category === "" || category === "Individual") && (
              <>
                <div className="pr-nur-row three">
                  <div className="pr-nur-field">
                    <label>
                      Name of the Applicant<span className="pr-required">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={formData.name_applicant}
                      onChange={(e) => handleInputChange("name_applicant", e.target.value)}
                      required 
                    />
                  </div>

                  <div className="pr-nur-field">
                    <label>
                      Father's Name<span className="pr-required">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={formData.father_name}
                      onChange={(e) => handleInputChange("father_name", e.target.value)}
                      required 
                    />
                  </div>

                  <div className="pr-nur-field">
                    <label>
                      Mobile Number<span className="pr-required">*</span>
                    </label>
                    <input 
                      type="tel" 
                      value={formData.mobile_number}
                      onChange={(e) => handleInputChange("mobile_number", e.target.value)}
                      required 
                      maxLength="10"
                      placeholder="Enter 10-digit mobile number"
                    />
                  </div>
                </div>

                <div className="pr-nur-row three">
                  <div className="pr-nur-field">
                    <label>
                      Email Id<span className="pr-required">*</span>
                    </label>
                    <input 
                      type="email" 
                      value={formData.email_id}
                      onChange={(e) => handleInputChange("email_id", e.target.value)}
                      required 
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="pr-nur-field">
                    <label>
                      State/UT<span className="pr-required">*</span>
                    </label>
                    <select 
                      value={selectedState} 
                      onChange={handleStateChange}
                      required
                    >
                      <option value="">Select</option>
                      {states.map((state) => (
                        <option key={state.id || state.state_id} value={state.id || state.state_id}>
                          {state.state_name || state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pr-nur-field">
                    <label>
                      District<span className="pr-required">*</span>
                    </label>
                    <select 
                      value={selectedDistrict} 
                      onChange={handleDistrictChange}
                      required
                      disabled={!selectedState}
                    >
                      <option value="">Select</option>
                      {districts.map((district) => (
                        <option key={district.id || district.district_id} value={district.id || district.district_id}>
                          {district.district_name || district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* ===== OTHER THAN INDIVIDUAL SECTION ===== */}
            {category === "other than Individual" && (
              <>
                <div className="pr-nur-row three">
                  <div className="pr-nur-field">
                    <label>
                      Name of the Organisation<span className="pr-required">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={formData.name_applicant}
                      onChange={(e) => handleInputChange("name_applicant", e.target.value)}
                      required 
                    />
                  </div>

                  <div className="pr-nur-field">
                    <label>
                      Type of Promoter<span className="pr-required">*</span>
                    </label>
                    <select
                      value={formData.user_type}
                      onChange={(e) => handleInputChange("user_type", e.target.value)}
                      required
                    >
                      <option value="">--Select--</option>
                      {PROMOTER_TYPES.map((pt) => (
                        <option key={pt} value={pt}>
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pr-nur-field">
                    <label>
                      Mobile Number<span className="pr-required">*</span>
                    </label>
                    <input 
                      type="tel" 
                      value={formData.mobile_number}
                      onChange={(e) => handleInputChange("mobile_number", e.target.value)}
                      required 
                      maxLength="10"
                      placeholder="Enter 10-digit mobile number"
                    />
                  </div>
                </div>

                <div className="pr-nur-row three">
                  <div className="pr-nur-field">
                    <label>
                      Email Id<span className="pr-required">*</span>
                    </label>
                    <input 
                      type="email" 
                      value={formData.email_id}
                      onChange={(e) => handleInputChange("email_id", e.target.value)}
                      required 
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="pr-nur-field">
                    <label>
                      State/UT<span className="pr-required">*</span>
                    </label>
                    <select 
                      value={selectedState} 
                      onChange={handleStateChange}
                      required
                    >
                      <option value="">Select</option>
                      {states.map((state) => (
                        <option key={state.id || state.state_id} value={state.id || state.state_id}>
                          {state.state_name || state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pr-nur-field">
                    <label>
                      District<span className="pr-required">*</span>
                    </label>
                    <select 
                      value={selectedDistrict} 
                      onChange={handleDistrictChange}
                      required
                      disabled={!selectedState}
                    >
                      <option value="">Select</option>
                      {districts.map((district) => (
                        <option key={district.id || district.district_id} value={district.id || district.district_id}>
                          {district.district_name || district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Upload + Captcha */}
            <div className="pr-nur-row four">
              {/* Upload */}
              <div className="pr-nur-field">
                <label>Upload License Certificate</label>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              {/* Captcha */}
              <div className="pr-nur-field">
                <label>
                  Captcha<span className="pr-required">*</span>
                </label>

                <div className="pr-captcha-box">
                  <span className="pr-captcha-text">{captcha}</span>

                  <input
                    type="text"
                    placeholder="Enter CAPTCHA"
                    value={userInputCaptcha}
                    onChange={(e) => setUserInputCaptcha(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="pr-refresh-btn"
                    title="Refresh Captcha"
                    onClick={handleRefreshCaptcha}
                  >
                    ↻
                  </button>
                </div>
              </div>
            </div>

            <div className="pr-nur-actions">
              <button type="submit" className="pr-nur-register-btn">
                Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewUserRegistration;