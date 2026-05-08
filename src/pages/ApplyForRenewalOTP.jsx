import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ApplyForRenewalOTP.css";

const ApplyForRenewalOTP = () => {

  const navigate = useNavigate();

  const [panNumber, setPanNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState("");

  // SEND OTP
  const sendOtp = async () => {

    try {

      const response = await fetch("http://localhost:8080/api/otp/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          panNumber: panNumber
        })
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtp(true);
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }

    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }

  };

  // VERIFY OTP
const verifyOtp = async () => {

  try {

    const response = await fetch("http://localhost:8080/api/otp/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        panNumber: panNumber,
        otp: otp
      })
    });

    const data = await response.json();

    if (response.ok) {

      alert("OTP verified successfully");

      localStorage.setItem("renewalPan", panNumber);

      navigate("/agent-renewal");

    } else {

      setMessage(data.error || "Verification failed");

    }

  } catch (error) {

    console.error(error);
    setMessage("Server error");

  }

};

  return (
    <div className="applyForRenewalOTPContainer">

      <div className="applyForRenewalOTPBox">

        <h2 className="applyForRenewalOTPTitle">
          Agent Renewal Verification
        </h2>

        <div className="applyForRenewalOTPField">

          <label>PAN Number</label>

          <input
            type="text"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            placeholder="Enter PAN Number"
          />

        </div>

        <button
          className="applyForRenewalOTPSendBtn"
          onClick={sendOtp}
        >
          Send OTP
        </button>

        {showOtp && (

          <div className="applyForRenewalOTPVerifyBox">

            <label>Enter OTP</label>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />

            <button
              className="applyForRenewalOTPVerifyBtn"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>

          </div>

        )}

        {message && (
          <p className="applyForRenewalOTPMessage">
            {message}
          </p>
        )}

      </div>

    </div>
  );
};

export default ApplyForRenewalOTP;