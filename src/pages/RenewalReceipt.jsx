import { useParams, useNavigate } from "react-router-dom";
import RenewalStepper from "../components/RenewalStepper";
import "../styles/RenewalReceipt.css";

function RenewalReceipt() {

  const { renewalId } = useParams();
  const navigate = useNavigate();

  return (

    <div className="renewal-page-wrapper">

      {/* Breadcrumb */}
      <div className="renewalreceipt-breadcrumb-bar">
        You are here :
        <a href="/" className="renewalreceipt-breadcrumb-link"> Home</a> /
        <span> Registration</span> /
        <span> Agent Renewal</span>
      </div>

      {/* Stepper */}
      <div className="stepper-wrapper">
        <RenewalStepper step={3} />
      </div>

      <div className="receipt-container">

        <h2 className="receipt-title">Payment Receipt</h2>

        <div className="receipt-card">

          <h3 className="success-text">Payment Successful ✅</h3>

          {/* 🔥 FLEX ROWS (NO TABLE) */}
          <div className="receipt-row">
            <span>Renewal ID</span>
            <span>{renewalId}</span>
          </div>

          <div className="receipt-row">
            <span>Status</span>
            <span className="next-btn">Successful</span>
          </div>

          <div className="receipt-row">
            <span>Amount Paid</span>
            <span>₹ 5000</span>
          </div>

          {/* Buttons */}
          <div className="btn-group">
            <button
              className="print-btn"
              onClick={() => window.print()}
            >
              Print Receipt
            </button>

            <button
              className="next-btn"
              onClick={() => navigate(`/renewal/certificate/${renewalId}`)}
            >
              Next
            </button>
          </div>

        </div>
        <div className="back-btn-wrapper">
          <button
            className="print-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>


      </div>


    </div>

  );

}

export default RenewalReceipt;