import React, { useState } from 'react';
import '../styles/Promoter_Profile.css';

const Promoter_Profile = () => {
  const [formData, setFormData] = useState({
    applicationNo: '080126103613',
    promoterType: 'individual',
    bankState: '',
    bankName: '',
    branchName: '',
    accountNo: '',
    accountHolderName: '',
    ifscCode: '',
    name: '',
    fatherName: '',
    panNumber: 'CTOPV3072N',
    aadhaarNumber: '',
    mobileNumber: '',
    landlineNumber: '',
    emailId: '',
    websiteUrl: '',
    state: '',
    district: '',
    licenseNumber: '',
    licenseDate: '',
    gstNumber: '',
    otherReraRegistration: '',
    pastProjects: '',
    litigations: '',
    promoter2Details: ''
  });

  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

  // Validation functions
  const validateMobile = (mobile) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(mobile);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePAN = (pan) => {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return regex.test(pan);
  };

  const validateAadhaar = (aadhaar) => {
    const regex = /^\d{12}$/;
    return regex.test(aadhaar);
  };

  const validateAccountNo = (accountNo) => {
    const regex = /^\d{9,18}$/;
    return regex.test(accountNo);
  };

  const validateIFSC = (ifsc) => {
    const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return regex.test(ifsc);
  };

  const validateGST = (gst) => {
    const regex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
    return regex.test(gst);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    let error = '';
    switch (name) {
      case 'mobileNumber':
        if (value && !validateMobile(value)) {
          error = 'Mobile number must start with 6-9 and be 10 digits';
        }
        break;
      case 'emailId':
        if (value && !validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'panNumber':
        if (value && !validatePAN(value)) {
          error = 'PAN must be in format: ABCDE1234F';
        }
        break;
      case 'aadhaarNumber':
        if (value && !validateAadhaar(value)) {
          error = 'Aadhaar must be 12 digits';
        }
        break;
      case 'accountNo':
        if (value && !validateAccountNo(value)) {
          error = 'Account number must be 9-18 digits';
        }
        break;
      case 'ifscCode':
        if (value && !validateIFSC(value)) {
          error = 'Invalid IFSC code format';
        }
        break;
      case 'gstNumber':
        if (value && !validateGST(value)) {
          error = 'Invalid GST number format';
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [fieldName]: file.name
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="promoter-container">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <span>You are here : </span>
        <a href="/">Home</a>
        <span> / </span>
        <span>Registration / Project Registration</span>
      </div>

      {/* Page Header */}
      <div className="page-header">
        <h1>Project Registration</h1>
      </div>

      {/* Progress Wizard */}
      <div className="wizard-container">
        <div className="wizard-step active">
          <div className="step-circle">1</div>
          <div className="step-label">Promoter Profile</div>
        </div>
        <div className="wizard-step">
          <div className="step-circle">2</div>
          <div className="step-label">Project Details</div>
        </div>
        <div className="wizard-step">
          <div className="step-circle">3</div>
          <div className="step-label">Development Details</div>
        </div>
        <div className="wizard-step">
          <div className="step-circle">4</div>
          <div className="step-label">Associate Details</div>
        </div>
        <div className="wizard-step">
          <div className="step-circle">5</div>
          <div className="step-label">Upload Documents</div>
        </div>
        <div className="wizard-step">
          <div className="step-circle">6</div>
          <div className="step-label">Preview</div>
        </div>
        <div className="wizard-step">
          <div className="step-circle">7</div>
          <div className="step-label">Payment</div>
        </div>
        <div className="wizard-step">
          <div className="step-circle">8</div>
          <div className="step-label">Acknowledgment</div>
        </div>
      </div>

      <div className="promoter-form">
        {/* Application Number Section */}
        <section className="form-section">
          <h3 className="section-heading">Application Number</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Application Number<span className="required">*</span>
              </label>
              <input
                type="text"
                name="applicationNo"
                value={formData.applicationNo}
                className="form-input disabled"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Promoter Type Section */}
        <section className="form-section">
          <h3 className="section-heading">Promoter Type</h3>
          <div className="form-row">
            <div className="form-group full-width">
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="promoterType"
                    value="individual"
                    checked={formData.promoterType === 'individual'}
                    onChange={handleInputChange}
                  />
                  <span>Individual</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="promoterType"
                    value="other"
                    checked={formData.promoterType === 'other'}
                    onChange={handleInputChange}
                  />
                  <span>Other than Individual</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Bank Account Details Section */}
        <section className="form-section">
          <h3 className="section-heading">Designated Bank Account Details of the Project</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Bank State<span className="required">*</span>
              </label>
              <select
                name="bankState"
                value={formData.bankState}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select</option>
                <option value="2">Andhra Pradesh</option>
                <option value="32">Telangana</option>
                <option value="17">Karnataka</option>
                <option value="31">Tamil Nadu</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                Bank Name<span className="required">*</span>
              </label>
              <select
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select</option>
                <option value="4">STATE BANK OF INDIA</option>
                <option value="102">HDFC BANK</option>
                <option value="124">ICICI BANK LIMITED</option>
                <option value="22">AXIS BANK</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                Branch Name<span className="required">*</span>
              </label>
              <select
                name="branchName"
                value={formData.branchName}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                Account No<span className="required">*</span>
              </label>
              <input
                type="text"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
                className={`form-input ${errors.accountNo ? 'error' : ''}`}
                placeholder="Account No"
                maxLength={18}
              />
              {errors.accountNo && <span className="error-text">{errors.accountNo}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Account Holder's Name as in Bank Pass Book<span className="required">*</span>
              </label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Account Holder's Name"
                maxLength={200}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                IFSC Code<span className="required">*</span>
              </label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                className={`form-input ${errors.ifscCode ? 'error' : ''}`}
                placeholder="IFSC Code"
                maxLength={11}
              />
              {errors.ifscCode && <span className="error-text">{errors.ifscCode}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">
                Upload Bank Statement<span className="required">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'bankStatement')}
                className="form-input file-input"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {uploadedFiles.bankStatement && (
                <span className="file-name">{uploadedFiles.bankStatement}</span>
              )}
            </div>
          </div>
        </section>

        {/* Promoter Details Section */}
        <section className="form-section">
          <h3 className="section-heading">Promoter Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Name"
                maxLength={75}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Father Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Father Name"
                maxLength={75}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                PAN Card Number<span className="required">*</span>
              </label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                className={`form-input disabled ${errors.panNumber ? 'error' : ''}`}
                placeholder="PAN Card Number"
                maxLength={10}
                disabled
              />
              {errors.panNumber && <span className="error-text">{errors.panNumber}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">
                Upload PAN Card<span className="required">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'panCard')}
                className="form-input file-input"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {uploadedFiles.panCard && (
                <span className="file-name">{uploadedFiles.panCard}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Aadhaar Number<span className="required">*</span>
              </label>
              <input
                type="text"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleInputChange}
                className={`form-input ${errors.aadhaarNumber ? 'error' : ''}`}
                placeholder="Aadhaar Number"
                maxLength={12}
              />
              {errors.aadhaarNumber && <span className="error-text">{errors.aadhaarNumber}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">
                Upload Aadhaar<span className="required">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'aadhaar')}
                className="form-input file-input"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {uploadedFiles.aadhaar && (
                <span className="file-name">{uploadedFiles.aadhaar}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">
                Mobile Number<span className="required">*</span>
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className={`form-input ${errors.mobileNumber ? 'error' : ''}`}
                placeholder="Mobile Number"
                maxLength={10}
              />
              {errors.mobileNumber && <span className="error-text">{errors.mobileNumber}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Landline Number</label>
              <input
                type="text"
                name="landlineNumber"
                value={formData.landlineNumber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Landline Number"
                maxLength={11}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Email Id<span className="required">*</span>
              </label>
              <input
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleInputChange}
                className={`form-input ${errors.emailId ? 'error' : ''}`}
                placeholder="Email Id"
                maxLength={50}
              />
              {errors.emailId && <span className="error-text">{errors.emailId}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Promoter Website URL</label>
              <input
                type="text"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Website URL"
                maxLength={500}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                State/UT<span className="required">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select</option>
                <option value="2">Andhra Pradesh</option>
                <option value="32">Telangana</option>
                <option value="17">Karnataka</option>
                <option value="31">Tamil Nadu</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                District<span className="required">*</span>
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Upload Photograph<span className="required">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'photograph')}
                className="form-input file-input"
                accept=".jpg,.jpeg"
              />
              {uploadedFiles.photograph && (
                <span className="file-name">{uploadedFiles.photograph}</span>
              )}
              <small className="hint-text">Passport size (35mm x 45mm, 300 DPI, JPEG format)</small>
            </div>
            <div className="form-group">
              <label className="form-label">License Number by the local bodies</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="License Number"
                maxLength={23}
              />
            </div>
            <div className="form-group">
              <label className="form-label">License issued date</label>
              <input
                type="date"
                name="licenseDate"
                value={formData.licenseDate}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Upload License certificate</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'license')}
                className="form-input file-input"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {uploadedFiles.license && (
                <span className="file-name">{uploadedFiles.license}</span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">GST Number</label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                className={`form-input ${errors.gstNumber ? 'error' : ''}`}
                placeholder="GST Number"
                maxLength={15}
              />
              {errors.gstNumber && <span className="error-text">{errors.gstNumber}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Upload GST Number Document</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'gst')}
                className="form-input file-input"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {uploadedFiles.gst && (
                <span className="file-name">{uploadedFiles.gst}</span>
              )}
            </div>
          </div>
        </section>

        {/* Other State RERA Registration */}
        <section className="form-section">
          <h3 className="section-heading">Other State/UT RERA Registration Details</h3>
          <div className="form-row">
            <div className="form-group full-width">
              <label className="form-label">
                Do you have any registration in other State/UT<span className="required">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="otherReraRegistration"
                    value="yes"
                    checked={formData.otherReraRegistration === 'yes'}
                    onChange={handleInputChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="otherReraRegistration"
                    value="no"
                    checked={formData.otherReraRegistration === 'no'}
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Past Projects */}
        <section className="form-section">
          <h3 className="section-heading">Projects launched in the past 5 years</h3>
          <div className="form-row">
            <div className="form-group full-width">
              <label className="form-label">
                Last five years project details<span className="required">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="pastProjects"
                    value="yes"
                    checked={formData.pastProjects === 'yes'}
                    onChange={handleInputChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="pastProjects"
                    value="no"
                    checked={formData.pastProjects === 'no'}
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Litigations */}
        <section className="form-section">
          <h3 className="section-heading">Litigations</h3>
          <div className="form-row">
            <div className="form-group full-width">
              <label className="form-label">
                Any Civil/Criminal Cases<span className="required">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="litigations"
                    value="yes"
                    checked={formData.litigations === 'yes'}
                    onChange={handleInputChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="litigations"
                    value="no"
                    checked={formData.litigations === 'no'}
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Promoter 2 Details */}
        <section className="form-section">
          <h3 className="section-heading">Promoter 2 Details (Land Owners - only if sale transaction is involved)</h3>
          <div className="form-row">
            <div className="form-group full-width">
              <label className="form-label">
                Promoter 2 Details<span className="required">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="promoter2Details"
                    value="yes"
                    checked={formData.promoter2Details === 'yes'}
                    onChange={handleInputChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="promoter2Details"
                    value="no"
                    checked={formData.promoter2Details === 'no'}
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Upload Documents */}
        <section className="form-section">
          <h3 className="section-heading">Upload Documents</h3>
          <div className="info-box">
            <p>
              <strong>Note:</strong> If the entity is registered below 3 years period, and if the IT returns are not available for 3 years period promoter has to upload the available IT returns and audit balance sheets of the entity with a specific reason, refer form P12 in forms download for proforma of this Sample Affidavit.
            </p>
          </div>
          <div className="document-table">
            <table>
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Upload Document</th>
                  <th>Uploaded Document</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consolidated Income Tax Returns for the Past 3 Years<span className="required">*</span></td>
                  <td>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'itReturns')}
                      className="form-input file-input"
                      accept=".pdf"
                    />
                  </td>
                  <td className="text-center">
                    {uploadedFiles.itReturns && (
                      <span className="file-name">{uploadedFiles.itReturns}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Balance Sheet<span className="required">*</span></td>
                  <td>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'balanceSheet')}
                      className="form-input file-input"
                      accept=".pdf"
                    />
                  </td>
                  <td className="text-center">
                    {uploadedFiles.balanceSheet && (
                      <span className="file-name">{uploadedFiles.balanceSheet}</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="button" onClick={handleSubmit} className="btn-primary">
            Save And Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promoter_Profile;