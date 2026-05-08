import { useState } from "react";
import { makePayment } from "../api/renewalApi";
import { useParams, useNavigate } from "react-router-dom";
import RenewalStepper from "../components/RenewalStepper";
import "../styles/RenewalPayment.css";

function RenewalPayment() {

  const { renewalId } = useParams();
  const navigate = useNavigate();

  const [method, setMethod] = useState("card");

  const pay = async () => {
    try {
      await makePayment(renewalId);
      navigate(`/renewal/receipt/${renewalId}`);
    } catch {
      alert("Payment Failed");
    }
  };

  return (

    <div className="renewal-page-wrapper">

      {/* Breadcrumb */}
      <div className="renewal-payments-breadcrumb-bar">
        You are here :
        <a href="/" className="renewal-payments-breadcrumb-link">Home</a> /
        <span> Registration</span> /
        <span> Agent Renewal</span>
      </div>

      {/* Stepper */}
      <div className="stepper-wrapper">
        <RenewalStepper step={2} />
      </div>

      <div className="payment-container">

        <h2 className="payment-title">Payment Gateway</h2>

        <div className="payment-card">

          <h3>Renewal Fee</h3>

          <p className="amount">₹ 5000</p>

          <label>Select Payment Method</label>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="card">Credit / Debit Card</option>
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
          </select>

          <button
            className="pay-btn"
            onClick={pay}
          >
            Pay Now
          </button>

        </div>

        <div className="back-btn-wrapper">
          <button
            className="upload-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

      </div>

    </div>

  );

}

export default RenewalPayment;