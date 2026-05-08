import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ExtensionPaymentPage.css";

const ExtensionPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Receive Data from Previous Page
  const projectData = location.state?.projectData;

  // ✅ Safety Check
  if (!projectData) {
    return <p>No Payment Data Found</p>;
  }

  // ✅ Today Date
  const todayDate = new Date().toLocaleDateString("en-GB");

  // ✅ Generate Transaction ID only once
  const generateTransactionId = () => {
    return "TXN" + Date.now();
  };
  const [transactionId] = useState(generateTransactionId);

  const [selectedBank, setSelectedBank] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleMakePayment = () => {
    setTimeout(() => {
      setShowSuccessPopup(true);
    }, 500);
  };
const closePopup = () => {
  setShowSuccessPopup(false);

  navigate("/certificate", {
    state: {
      projectData: {
        ...projectData,
        transactionId,
        paymentDate: todayDate
      }
    }
  });
};


  return (
    <div className="epp-payment-container">
      <h2 className="epp-page-title">Payment In Process</h2>

      <div className="epp-payment-box">
        <div className="epp-payment-header">Payment Details</div>

        {/* 🔹 TOP SECTION */}
        <div className="epp-payment-top">
          <div>
            <p>
              <strong>Application Number :</strong>{" "}
              {projectData.application_number}
            </p>

            <p>
              <strong>Transaction Id :</strong> {transactionId}
            </p>

           <p><strong>APRERA GST No :</strong> 37AAAGA0918E1ZY</p>       
          </div>

          <div className="epp-payment-date">
            <p>
              <strong>Date :</strong> {todayDate}
            </p>
          </div>
        </div>

        {/* 🔹 TABLE SECTION */}
        <table className="epp-payment-table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{projectData.promoter_name}</td>
            </tr>
            <tr>
              <td>Mobile No.</td>
              <td>{projectData.promoter_mobile}</td>
            </tr>
            <tr>
              <td>Payment For</td>
              <td>Project Extension</td>
            </tr>
            <tr>
              <td><strong>Registration Amount</strong></td>
              <td><strong>₹ 1000.00</strong></td>
            </tr>
          </tbody>
        </table>

        {/* 🔹 PAYMENT GATEWAY */}
        <div className="epp-gateway-section">
          <div className="epp-gateway-options">
            <p><strong>Select Payment Gateway :</strong></p>

            <label>
              <input
                type="radio"
                name="bank"
                onChange={() => setSelectedBank("ICICI")}
              />
              ICICI BANK
            </label>

            <label>
              <input
                type="radio"
                name="bank"
                onChange={() => setSelectedBank("AXIS")}
              />
              AXIS BANK
            </label>

            <label>
              <input
                type="radio"
                name="bank"
                onChange={() => setSelectedBank("HDFC")}
              />
              HDFC BANK
            </label>
          </div>

          <div className="epp-total-amount">
            Total Amount ₹ 1000.00
          </div>
        </div>

        {/* 🔹 PAYMENT ACTION */}
        {selectedBank && (
          <div className="epp-payment-action-box">
            <p>
              You have selected <strong>{selectedBank} BANK</strong>
            </p>

            <div className="epp-payment-buttons">
              <button className="epp-pay-btn" onClick={handleMakePayment}>
                Make Payment
              </button>

              <button
                className="epp-cancel-btn"
                onClick={() => setSelectedBank("")}
              >
                Cancel Payment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 SUCCESS POPUP */}
      {showSuccessPopup && (
        <div className="epp-payment-popup">
          <div className="epp-payment-popup-box success">
            <h3>Payment Successful</h3>
            <p>Your payment has been completed successfully.</p>
            <button className="epp-pay-btn" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtensionPaymentPage;