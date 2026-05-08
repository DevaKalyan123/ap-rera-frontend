import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api/api";
import "../styles/otplogin.css";

const OTPLogin = () => {  
  const navigate = useNavigate();

  const [pan, setPan] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  // =========================
  // SEND OTP
  // =========================
  const handleGetOtp = async () => {
    if (!panRegex.test(pan)) {
      setShowPopup(true);
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");

      // const res = await fetch(`${API_BASE}/login/send-otp`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ pan_number: pan }),
      // });

      // const data = await res.json();

      // if (!res.ok) {
      //   throw new Error(data.message || "Failed to send OTP");
      // }
      const data = await apiPost("/api/login/send-otp", {
        pan_number: pan,
      });

      setOtpSent(true);
      setSuccessMsg("OTP sent successfully to registered email");

    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setErrorMsg("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      // const res = await fetch(`${API_BASE}/login/verify-otp`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     pan_number: pan,
      //     otp: otp,
      //   }),
      // });

      // const data = await res.json();

      // if (!res.ok) {
      //   throw new Error(data.message || "OTP verification failed");
      // }
      const data = await apiPost("/api/login/verify-otp", {
        pan_number: pan,
        otp: otp,
      });
      console.log("Login API Response:", data);
      // ✅ STORE RESPONSE (SAFE)
      sessionStorage.setItem("loginResponse", JSON.stringify(data));

      // ✅ NAVIGATE WITH RESPONSE
      navigate("/ExtensionProcess", {
        state: {
          loginData: data,
        },
      });

    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESEND OTP
  // =========================
  const handleResendOtp = () => {
    setOtp("");
    handleGetOtp();
  };

  return (
    <>
      <div className="otplogin-page-bg">
        <div className="otplogin-outer-frame">
          <div className="otplogin-otp-container">

            {/* PAN INPUT */}
            <div className="otplogin-form-group">
              <label>
                PAN Card Number <span className="required">*</span>
              </label>

              <div className="otplogin-pan-row">
                <input
                  type="text"
                  placeholder="Please Enter Pan Number"
                  value={pan}
                  maxLength={10}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  disabled={otpSent}
                />

                {!otpSent ? (
                  <button
                    className="otplogin-otp-btn"
                    onClick={handleGetOtp}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Get OTP"}
                  </button>
                ) : (
                  <button
                    className="otplogin-otp-btn"
                    onClick={handleResendOtp}
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>

            {/* OTP INPUT */}
            {otpSent && (
              <div className="otplogin-form-group">
                <label>OTP *</label>

                <div className="otplogin-pan-row">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <button
                    className="otplogin-otp-btn"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              </div>
            )}

            {/* MESSAGES */}
            {errorMsg && (
              <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>
            )}
            {successMsg && (
              <p style={{ color: "green", textAlign: "center" }}>{successMsg}</p>
            )}

          </div>
        </div>
      </div>

      {/* PAN ERROR POPUP */}
      {showPopup && (
        <div className="otplogin-popup-overlay">
          <div className="otplogin-popup-box">
            <p>Please enter a valid PAN number</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default OTPLogin;