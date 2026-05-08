import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ComplaintStatusForm.css";

const ComplaintStatusForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    complaintType: "",
    complaintId: "",
    captcha: ""
  });

  const [generatedCaptcha, setGeneratedCaptcha] = useState("");

  // CAPTCHA GENERATE
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let cap = "";
    for (let i = 0; i < 5; i++) {
      cap += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(cap);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.complaintType) {
      alert("Please select complaint type");
      return;
    }

    if (!formData.complaintId) {
      alert("Please enter complaint ID");
      return;
    }

    if (formData.captcha !== generatedCaptcha) {
      alert("Invalid CAPTCHA");
      generateCaptcha();
      return;
    }

    // 🔥 IMPORTANT CHANGE HERE
  navigate(`/admin/complaint/${formData.complaintId}`, {
  state: {
    complaintType: formData.complaintType,
    role: "complaint"   // 🔥 added
  }
});};

  return (
    <div className="complaint-status">
      <h2 className="complaint-status__title">Complaint Status</h2>

      <form className="complaint-status__form" onSubmit={handleSubmit}>

        {/* Complaint Type */}
        <div className="complaint-status__group complaint-status__group--row">
          <label className="complaint-status__label">Complaint Type</label>

          <select
            name="complaintType"
            value={formData.complaintType}
            onChange={handleChange}
            className="complaint-status__input"
          >
            <option value="">-- Select Type --</option>
            <option value="agent">Agent</option>
            <option value="promoter">Promoter</option>
            <option value="allottee">Allottee</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Complaint ID */}
        <div className="complaint-status__group complaint-status__group--row">
          <label className="complaint-status__label">Complaint ID</label>

          <input
            type="text"
            name="complaintId"
            value={formData.complaintId}
            onChange={handleChange}
            className="complaint-status__input"
            placeholder="Enter Complaint ID"
          />
        </div>

        {/* CAPTCHA */}
        <div className="complaint-status__group complaint-status__group--row">
          <label className="complaint-status__label">CAPTCHA</label>

          <div className="complaint-status__captcha-wrapper">
            <div className="complaint-status__captcha-box">
              <span className="complaint-status__captcha-text">
                {generatedCaptcha}
              </span>

              <button
                type="button"
                onClick={generateCaptcha}
                className="complaint-status__refresh-btn"
              >
                ↻
              </button>
            </div>

            <input
              type="text"
              name="captcha"
              value={formData.captcha}
              onChange={handleChange}
              className="complaint-status__input"
              placeholder="Enter CAPTCHA"
            />
          </div>
        </div>

        <button className="complaint-status__submit-btn">
          Check Status
        </button>

      </form>
    </div>
  );
};

export default ComplaintStatusForm;