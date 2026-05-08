import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api/api";
import "../styles/PromoterOtpLogin.css";

const PromoterOtpLogin = () => {

  const navigate = useNavigate();

  const [panNumber, setPanNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showInvalidPopup, setShowInvalidPopup] = useState(false);

  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  // ================= SEND OTP =================
  const handleSendOtp = async () => {

    if (!panPattern.test(panNumber)) {
      setShowInvalidPopup(true);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      await apiPost("api/login/send-otp", {
        pan_number: panNumber,
      });

      setIsOtpSent(true);
      setSuccessMessage("OTP sent successfully to registered email");

    } catch (err) {
      setErrorMessage(
        err?.error || err?.message || "Failed to send OTP"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {

    if (!otpValue || otpValue.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await apiPost("api/login/verify-otp", {
        pan_number: panNumber,
        otp: otpValue,
      });

      sessionStorage.setItem(
        "loginResponse",
        JSON.stringify(response)
      );

      navigate("/closure", {
        state: { panNumber },
      });

    } catch (err) {
      setErrorMessage(
        err?.error || err?.message || "OTP verification failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ================= RESEND OTP =================
  const handleResendOtp = () => {
    setOtpValue("");
    handleSendOtp();
  };

  return (
    <>
      <div className="promoterotplogin-otp-page-bg">

        <div className="promoterotplogin-otp-wrapper">

          {/* Breadcrumb */}
          <div className="promoterotplogin-otp-breadcrumb">
            <span>You are here :</span>

            <span
              className="promoterotplogin-breadcrumb-link"
              onClick={() => navigate("/")}
            >
              Home
            </span>

            <span> / Registration / Closure Login</span>
          </div>

          {/* Title */}
         <div className="promoterotplogin-otp-title">
  Closure Login
</div>

          {/* Form */}
        <div className="promoterotplogin-otp-card centered-card">

            {/* PAN */}
            <div className="promoterotplogin-form-group">

              <label>
                PAN Card Number <span className="promoterotploginrequired">*</span>
              </label>

              <div className="promoterotplogin-input-row">

                <input
                  type="text"
                  placeholder="Enter PAN Number"
                  value={panNumber}
                  maxLength={10}
                  onChange={(e) =>
                    setPanNumber(
                      e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, "")
                    )
                  }
                  disabled={isOtpSent}
                />

                {!isOtpSent ? (
                  <button
                    onClick={handleSendOtp}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Get OTP"}
                  </button>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                )}

              </div>
            </div>

            {/* OTP */}
            {isOtpSent && (
              <div className="promoterotplogin-form-group">

                <label>
                  OTP <span className="promoterotplogin-required">*</span>
                </label>

                <div className="promoterotplogin-input-row">

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otpValue}
                    maxLength={6}
                    onChange={(e) =>
                      setOtpValue(e.target.value.replace(/\D/g, ""))
                    }
                  />

                  <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </button>

                </div>
              </div>
            )}

            {/* Messages */}
            {errorMessage && (
              <p className="promoterotplogin-error-msg">{errorMessage}</p>
            )}

            {successMessage && (
              <p className="promoterotplogin-success-msg">{successMessage}</p>
            )}

          </div>

        </div>

      </div>

      {/* POPUP */}
      {showInvalidPopup && (
        <div className="promoterotplogin-popup-overlay">
          <div className="promoterotplogin-popup-box">
            <p>Please enter a valid PAN number</p>
            <button onClick={() => setShowInvalidPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PromoterOtpLogin;