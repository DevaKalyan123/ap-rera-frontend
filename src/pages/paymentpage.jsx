import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/paymentpage.css";

function PaymentPage({ complaintData = {}, setCurrentStep, currentStep }) {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Data coming from Preview Page
  const {
    applicationNo,
    complainantName,
    complainantMobile,
  } = location.state || {};

  const [gateway, setGateway] = useState("");

  const today = new Date().toLocaleDateString("en-GB");

  const handlePayNow = () => {
    if (!gateway) {
      alert("Please select a payment gateway");
      return;
    }
    // ✅ Move to Acknowledgement step
    setCurrentStep(4);
  };

  return (
    <div className="payment-container">

      {/* ===== PAGE TITLE ===== */}
      <h3 className="page-title">Payment Page</h3>

      {/* ===== PAYMENT BOX ===== */}
      <div className="payment-box">
        <div className="payment-header">Payment Details</div>

        <div className="payment-top">
          <div>
            <p><b>Application Number :</b> {applicationNo || "-"}</p>
            <p><b>Transaction Id :</b> 3100126004</p>
            <p><b>APRERA GST No :</b> 37AAAGA0918E1ZY</p>
          </div>

          <div className="payment-date-box">
            <p><b>Date :</b> {today}</p>
          </div>
        </div>

        <table className="payment-table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{complainantName || "-"}</td>
            </tr>
            <tr>
              <td>Mobile No.</td>
              <td>{complainantMobile || "-"}</td>
            </tr>
            <tr>
              <td>Payment For</td>
              <td>Complaint Registration Fee</td>
            </tr>
            <tr>
              <td><b>Registration Amount</b></td>
              <td><b>₹ 1000.00</b></td>
            </tr>
          </tbody>
        </table>

        {/* ===== Gateway + Back + Amount Row ===== */}
        <div className="gateway-amount-row">

          {/* LEFT: PAYMENT GATEWAY */}
          <div className="payment-gateway-section">
            <p><b>Select Payment Gateway :</b></p>

            <label>
              <input
                type="radio"
                name="gateway"
                value="ICICI"
                checked={gateway === "ICICI"}
                onChange={(e) => setGateway(e.target.value)}
              />
              ICICI BANK
            </label>

            <label>
              <input
                type="radio"
                name="gateway"
                value="AXIS"
                checked={gateway === "AXIS"}
                onChange={(e) => setGateway(e.target.value)}
              />
              AXIS BANK
            </label>

            <label>
              <input
                type="radio"
                name="gateway"
                value="HDFC"
                checked={gateway === "HDFC"}
                onChange={(e) => setGateway(e.target.value)}
              />
              HDFC BANK
            </label>
          </div>

          {/* RIGHT: BACK + TOTAL */}
          <div className="payment-right-actions">
            <button
              className="payment-back-btn"
              onClick={() => navigate("/complaintregistration")}
            >
              Back
            </button>

            <div className="payent-amount-box">
              <b>Total Amount</b> ₹ 1000.00
            </div>
          </div>
        </div>
      </div>

      {/* ===== ACTION BUTTONS ===== */}
      {gateway && (
        <div className="payment-footer">
          <div className="payment-action-buttons">
            <button className="make-payment-btn" onClick={handlePayNow}>
              Make Payment
            </button>

            <button
              className="cancel-payment-btn"
              onClick={() => setGateway("")}
            >
              Cancel Payment
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default PaymentPage;