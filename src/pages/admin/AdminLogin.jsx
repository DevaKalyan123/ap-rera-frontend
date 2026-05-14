// src/pages/admin/AdminLogin.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/adminLogin.css";
import TopHeader from "../../components/admin/TopHeader";
import { apiPost } from "../../api/api";
import { useAdmin } from "../../context/AdminContext";

const AdminLogin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { saveAdmin } = useAdmin();

  // =========================================
  // LOGIN
  // =========================================
  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await fetch(
        "https://ap-rera-backend.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      // SUCCESS
      if (response.ok) {

        // Save username for OTP verify
        localStorage.setItem("otp_username", username);

        // Open OTP screen
        setStep("otp");

      } else {

        setError(data.error || "Invalid username or password");

      }

    } catch (error) {

      console.log(error);

      setError("Server error");

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // VERIFY OTP
  // =========================================
  const handleVerifyOtp = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const savedUsername = localStorage.getItem("otp_username");

      const data = await apiPost(
        "/api/admin/verify-otp",
        {
          username: savedUsername,
          otp,
        }
      );

      console.log("OTP VERIFY RESPONSE:", data);

      // Save Admin
      saveAdmin(data.admin);

      // Remove temp username
      localStorage.removeItem("otp_username");

      // Navigate Dashboard
      navigate("/admin-dashboard", {
        replace: true,
      });

    } catch (error) {

      console.log(error);

      setError("Invalid or expired OTP. Please try again.");

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // RESEND OTP
  // =========================================
  const handleResendOtp = async () => {

    setError("");
    setLoading(true);

    try {

      await apiPost(
        "/api/admin/login",
        {
          username,
          password,
        }
      );

      setOtp("");

      alert("OTP resent successfully");

    } catch (error) {

      console.log(error);

      setError("Failed to resend OTP");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <TopHeader showHamburger={false} />

      <div className="admin-login-page">

        <div
          className={`admin-login-box ${
            step === "otp" ? "otp-active" : ""
          }`}
        >

          {/* LOGO */}
          <div className="admin-login-logo">

            <div className="logo-circle">
              <span className="logo-icon">
                &#9679;
              </span>
            </div>

          </div>

          {/* TITLE */}
          <h2 className="admin-login-title">

            {step === "login"
              ? "Admin Portal"
              : "Verify OTP"}

          </h2>

          {/* SUBTITLE */}
          <p className="admin-login-subtitle">

            {step === "login"
              ? "Sign in to your admin account"
              : "Enter the OTP sent to your registered email"}

          </p>

          {/* ERROR */}
          {error && (

            <div className="admin-error-msg">

              <span className="error-icon">
                &#9888;
              </span>

              {error}

            </div>

          )}

          {/* ========================================= */}
          {/* LOGIN FORM */}
          {/* ========================================= */}

          {step === "login" && (

            <form
              onSubmit={handleLogin}
              className="admin-form slide-in"
            >

              {/* USERNAME */}
              <div className="admin-form-group">

                <label>Username</label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    &#9786;
                  </span>

                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="admin-form-group">

                <label>Password</label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    &#128274;
                  </span>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              {/* LOGIN BUTTON */}
              <button
                className="admin-login-btn"
                type="submit"
                disabled={loading}
              >

                {loading ? (

                  <span className="btn-loading">

                    <span className="spinner"></span>

                    Sending OTP...

                  </span>

                ) : (
                  "Login"
                )}

              </button>

            </form>

          )}

          {/* ========================================= */}
          {/* OTP FORM */}
          {/* ========================================= */}

          {step === "otp" && (

            <form
              onSubmit={handleVerifyOtp}
              className="admin-form slide-in"
            >

              {/* OTP INFO */}
              <div className="otp-info-banner">

                <span className="otp-icon-big">
                  &#9993;
                </span>

                <span>
                  OTP sent successfully to your registered email
                </span>

              </div>

              {/* OTP INPUT */}
              <div className="admin-form-group">

                <label>Enter OTP</label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    &#128273;
                  </span>

                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      )
                    }
                    maxLength={6}
                    required
                    className="otp-input"
                  />

                </div>

                <span className="otp-hint">
                  {otp.length}/6 digits entered
                </span>

              </div>

              {/* VERIFY BUTTON */}
              <button
                className="admin-login-btn"
                type="submit"
                disabled={
                  loading || otp.length !== 6
                }
              >

                {loading ? (

                  <span className="btn-loading">

                    <span className="spinner"></span>

                    Verifying...

                  </span>

                ) : (
                  "Verify & Login"
                )}

              </button>

              {/* OTP FOOTER */}
              <div className="otp-footer">

                <span>
                  Didn't receive OTP?
                </span>

                <button
                  type="button"
                  className="resend-btn"
                  onClick={handleResendOtp}
                  disabled={loading}
                >
                  Resend OTP
                </button>

                <span className="separator">
                  |
                </span>

                <button
                  type="button"
                  className="back-btn"
                  onClick={() => {

                    setStep("login");
                    setOtp("");
                    setError("");

                  }}
                >
                  Go Back
                </button>

              </div>

            </form>

          )}

          {/* STEP INDICATORS */}
          <div className="step-indicators">

            <span
              className={`step-dot ${
                step === "login"
                  ? "active"
                  : "done"
              }`}
            ></span>

            <span className="step-line"></span>

            <span
              className={`step-dot ${
                step === "otp"
                  ? "active"
                  : ""
              }`}
            ></span>

          </div>

        </div>

      </div>
    </>
  );
};

export default AdminLogin;