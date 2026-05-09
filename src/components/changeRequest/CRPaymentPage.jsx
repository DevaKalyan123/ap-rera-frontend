import React, { useState } from "react";
import "../../styles/CRPaymentPage.css";

// ─── CHANGE REQUEST PAYMENT PAGE ─────────────────────────────────────────────
// Props:
//   appInfo    → { applicationNumber, panNumber, projectName, applicantName, refNo }
//   onBack     → fn  (go back to Review & Submit)
//   onSuccess  → fn  (go to Step 5 — Done)
//   onPayment  → fn(gateway)  called when Make Payment clicked — parent does the API call

export default function CRPaymentPage({ appInfo = {}, onBack, onSuccess, onPayment }) {
  const [gateway,  setGateway]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date().toLocaleDateString("en-GB");

  const handlePayNow = async () => {
    if (!gateway) {
      alert("Please select a payment gateway");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    try {
      // Delegate actual API call to parent (Changerequest.jsx)
      await onPayment(gateway);
      onSuccess();
    } catch (err) {
      setErrorMsg(err.message || "Payment / submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crp-container">

      {/* ── TITLE ── */}
      <h3 className="crp-title">Payment Page</h3>

      {/* ── PAYMENT BOX ── */}
      <div className="crp-box">

        <div className="crp-header">Payment Details</div>

        {/* TOP META */}
        <div className="crp-top">
          <div className="crp-meta-left">
            <p><b>Application Number :</b> {appInfo.applicationNumber || "-"}</p>
            <p><b>Transaction Id :</b> {appInfo.refNo || "-"}</p>
            <p><b>APRERA GST No :</b> 37AAAGA0918E1ZY</p>
          </div>
          <div className="crp-meta-right">
            <p><b>Date :</b> {today}</p>
          </div>
        </div>

        {/* DETAILS TABLE */}
        <table className="crp-table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{appInfo.applicantName || "-"}</td>
            </tr>
            <tr>
              <td>PAN Number</td>
              <td>{appInfo.panNumber || "-"}</td>
            </tr>
            <tr>
              <td>Project Name</td>
              <td>{appInfo.projectName || "-"}</td>
            </tr>
            <tr>
              <td>Payment For</td>
              <td>Change Request Fee</td>
            </tr>
            <tr>
              <td><b>Change Reqist Amount</b></td>
              <td><b>₹ 5000.00</b></td>
            </tr>
          </tbody>
        </table>

        {/* GATEWAY + TOTAL */}
        <div className="crp-gateway-row">

          {/* LEFT: PAYMENT GATEWAY */}
          <div className="crp-gateway-section">
            <p><b>Select Payment Gateway :</b></p>
            {[
              { value: "ICICI", label: "ICICI BANK" },
              { value: "AXIS",  label: "AXIS BANK"  },
              { value: "HDFC",  label: "HDFC BANK"  },
            ].map(({ value, label }) => (
              <label key={value} className="crp-radio-label">
                <input
                  type="radio"
                  name="crp_gateway"
                  value={value}
                  checked={gateway === value}
                  onChange={(e) => setGateway(e.target.value)}
                  disabled={loading}
                />
                {label}
              </label>
            ))}
          </div>

          {/* RIGHT: TOTAL */}
          <div className="crp-right-actions">
            <div className="crp-amount-box">
              <b>Total Amount</b>&nbsp; ₹ 5000.00
            </div>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {errorMsg && (
          <div style={{ color: "#c0200f", fontWeight: "600", padding: "10px 16px", background: "#fff0f0", borderRadius: "6px", margin: "12px 0", fontSize: "13px" }}>
            ⚠️ {errorMsg}
          </div>
        )}
      </div>

      {/* ── ACTION BUTTONS (show only after gateway selected) ── */}
      {gateway && (
        <div className="crp-footer">
          <button className="crp-back-btn" onClick={onBack} disabled={loading}>
            ← Back
          </button>
          <button className="crp-pay-btn" onClick={handlePayNow} disabled={loading}>
            {loading ? "Submitting..." : "Make Payment"}
          </button>
        </div>
      )}

    </div>
  );
}