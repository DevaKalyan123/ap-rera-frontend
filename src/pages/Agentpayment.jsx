import "../styles/Agentpayment.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import AgentStepper from "../components/AgentStepper";

const AgentPaymentpage = () => {

  const location = useLocation();
  const data = location.state;

  // Gateway State
  const [gateway, setGateway] = useState("");

  // If user opens page directly
  if (!data) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        No payment data found. Please go from Preview page.
      </p>
    );
  }

  /* ================= AUTO GENERATED ================= */

  const transactionId = "TXN" + Date.now();

  const todayDate = new Date().toLocaleDateString("en-GB");

  const gstNo = "37AAAGA0918EZY";

  const amount = 50000;

  const paymentFor = "Agent Registration Fee";

  /* ================= PAYMENT HANDLER ================= */

  const handlePayNow = () => {
    if (!gateway) {
      alert("Please select a payment gateway");
      return;
    }

    alert(`Redirecting to ${gateway} Payment Gateway`);
  };

  /* ================= UI ================= */

  return (
    <div className="agent-payments-main-container">

      {/* Breadcrumb */}
      <div className="agent-payments-breadcrumb-bar">
        You are here :
        <span> Home </span> /
        <span> Payment Page </span>
      </div>

      <div className="agent-payments-content-padding">

        <h2 className="agent-payments-page-title">
          Payment Page
        </h2>
        <AgentStepper currentStep={3} />

        <div className="agent-payments-payment-center-box">

          {/* Header */}
          <div className="agent-payments-payment-box-header">
            Payment Details
          </div>

          {/* Top Info */}
          <div className="agent-payments-payment-top">

            <div>

              <p>
                <b>Application Number :</b> {data.application_no}
              </p>

              <p>
                <b>Transaction Id :</b> {transactionId}
              </p>

              <p>
                <b>APRERA GST No. :</b> {gstNo}
              </p>

            </div>

            <div className="agent-payments-payment-date">

              <p>
                <b>Date :</b> {todayDate}
              </p>

            </div>

          </div>

          {/* Table */}
          <table className="agent-payments-payment-table">

            <tbody>

              <tr>
                <td>Name</td>
                <td>{data.name}</td>
              </tr>

              <tr>
                <td>Firm GST No.</td>
                <td>URP</td>
              </tr>

              <tr>
                <td>Mobile No.</td>
                <td>{data.mobile}</td>
              </tr>

              <tr>
                <td>Payment For</td>
                <td>{paymentFor}</td>
              </tr>

              <tr>
                <td>Registration Amount</td>
                <td>₹ {amount}</td>
              </tr>

            </tbody>

          </table>

          {/* ================= Gateway + Amount ================= */}

          <div className="agent-payments-gateway-amount-row">

            {/* Gateway */}
            <div className="agent-payments-payment-gateway">

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

            {/* Amount */}
            <div className="agent-payments-total-box">

              <b>Total Amount</b>

              <span>₹ {amount}.00</span>

            </div>

          </div>


          {/* ================= ACTION BUTTONS ================= */}

          {gateway && (

            <div className="agent-payments-action-buttons">

              <button
                className="agent-payments-make-btn"
                onClick={handlePayNow}
              >
                Make Payment
              </button>

              <button
                className="agent-payments-cancel-btn"
                onClick={() => setGateway("")}
              >
                Cancel
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default AgentPaymentpage;