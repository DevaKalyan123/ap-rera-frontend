import { useState } from "react";
import { apiPost } from "../api/api";
import "../styles/agent_change_request_1.css";
import { useNavigate } from "react-router-dom";
import AgentChangeRequestStepper from "../components/agent_changerequest_steper";


const AgentChangeRequestLogin = () => {

  const [pan, setPan] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* SEND OTP */
  const handleGetOtp = async () => {

    if (pan.length !== 10) {
      alert("Please enter valid PAN number");
      return;
    }

    try {

      setLoading(true);

      await apiPost("api/otp/send-email", {
        panNumber: pan,
      });

      setOtpSent(true);
      alert("OTP sent to registered email");

    } catch (error) {

      alert(
        error?.error ||
        error?.message ||
        "PAN not registered or OTP not sent"
      );

    } finally {
      setLoading(false);
    }
  };

  /* VERIFY OTP */
const handleVerifyOtp = async () => {

  if (!otp) {
    alert("Please enter OTP");
    return;
  }

  console.log("PAN:", pan);
  console.log("OTP:", otp);

  try {

    const res = await apiPost("api/otp/verify", {
      panNumber: pan,
      otp: otp
    });

    sessionStorage.setItem("agent_pan", pan);

    navigate("/Agentchangerequest2");

  } catch (error) {

    console.log(error);
    alert("Invalid or expired OTP");

  }

};

  return (
    <div className="agentchangerequest-registration-page">

      <div className="agentchangerequest-outer-box">

        <div className="agentchangerequest-breadcrumb-box">
          You are here :
          <a href="/">
            <span className="agentchangerequest-crumb-link"> Home </span>
          </a>
          / <span>Agent</span> / <span>Change Request</span>
        </div>

        <h2 className="agentchangerequest-page-title">
          Agent Change Request Login
        </h2>

        <AgentChangeRequestStepper activeStep={1} />

       
        <div className="agentchangerequest-form-box">

          <div className="agentchangerequest-pan-wrapper">

            <div className="agentchangerequest-pan-input-group">

              <label>
                PAN Number
                <span className="agentchangerequest-required">*</span>
              </label>

              <input
                type="text"
                value={pan}
                maxLength={10}
                onChange={(e) =>
                  setPan(e.target.value.toUpperCase())
                }
                placeholder="Enter PAN Number"
              />

            </div>

            <button
              className="agentchangerequest-btn-primary"
              onClick={handleGetOtp}
            >
              {otpSent ? "Resend OTP" : "Get OTP"}
            </button>

          </div>

          {otpSent && (
            <div className="agentchangerequest-pan-wrapper">

              <div className="agentchangerequest-pan-input-group">

                <label>
                  OTP
                  <span className="agentchangerequest-required">*</span>
                </label>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />

              </div>

              <button
                className="agentchangerequest-btn-primary"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AgentChangeRequestLogin;