// src/pages/admin/AdminLogin.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin/adminLogin.css";
import TopHeader from "../components/admin/TopHeader";
import { apiPost } from "../api/api";
import { useAdmin } from "../context/AdminContext";

const DepartmentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { saveAdmin } = useAdmin();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiPost("/api/admin/login", { username, password });
      setStep("otp");
    } catch {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiPost("/api/admin/verify-otp", { username, otp });
      saveAdmin(data.admin); // ✅ saves to context + localStorage in one call
      const dept = data.admin.department?.toLowerCase();

const deptRoutes = {
  planning: "/planning/planning-dashboard",
  legal: "/legal/legal-dashboard",
  audit: "/audit/audit-dashboard",
  engineer: "/scrutiny/scrutiny-engineer",
  verification: "/verification/verification-dashboard",
  ad: "/ad/ad-dashboard",
  dd: "/dd/dd-dashboard",
  it: "/it/it-dashboard",
};

navigate(deptRoutes[dept] || "/admin-dashboard", { replace: true });

    } catch {
      setError("Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      await apiPost("/api/admin/login", { username, password });
      setOtp("");
    } catch {
      setError("Failed to resend OTP. Please go back and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopHeader showHamburger={false} />
      <div className="admin-login-page">
        <div className={`admin-login-box ${step === "otp" ? "otp-active" : ""}`}>

          <div className="admin-login-logo">
            <div className="logo-circle">
              <span className="logo-icon">&#9679;</span>
            </div>
          </div>

          <h2 className="admin-login-title">
            {step === "login" ? "Department Portal" : "Verify OTP"}
          </h2>
          <p className="admin-login-subtitle">
            {step === "login"
              ? "Sign in to your admin account"
              : "Enter the OTP sent to your registered email"}
          </p>

          {error && (
            <div className="admin-error-msg">
              <span className="error-icon">&#9888;</span> {error}
            </div>
          )}

          {step === "login" && (
            <form onSubmit={handleLogin} className="admin-form slide-in">
              <div className="admin-form-group">
                <label>Username</label>
                <div className="input-wrapper">
                  <span className="input-icon">&#9786;</span>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">&#128274;</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <button className="admin-login-btn" type="submit" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span> Sending OTP...
                  </span>
                ) : "Login"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="admin-form slide-in">
              <div className="otp-info-banner">
                <span className="otp-icon-big">&#9993;</span>
                <span>OTP sent successfully to your registered email</span>
              </div>
              <div className="admin-form-group">
                <label>Enter OTP</label>
                <div className="input-wrapper">
                  <span className="input-icon">&#128273;</span>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    maxLength={6}
                    required
                    autoFocus
                    className="otp-input"
                  />
                </div>
                <span className="otp-hint">{otp.length}/6 digits entered</span>
              </div>
              <button
                className="admin-login-btn"
                type="submit"
                disabled={loading || otp.length !== 6}
              >
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span> Verifying...
                  </span>
                ) : "Verify & Login"}
              </button>
              <div className="otp-footer">
                <span>Didn&apos;t receive OTP?</span>
                <button type="button" className="resend-btn" onClick={handleResendOtp} disabled={loading}>
                  Resend OTP
                </button>
                <span className="separator">|</span>
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => { setStep("login"); setOtp(""); setError(""); }}
                >
                  Go Back
                </button>
              </div>
            </form>
          )}

          <div className="step-indicators">
            <span className={`step-dot ${step === "login" ? "active" : "done"}`}></span>
            <span className="step-line"></span>
            <span className={`step-dot ${step === "otp" ? "active" : ""}`}></span>
          </div>

        </div>
      </div>
    </>
  );
};

export default DepartmentLogin;