import "../styles/Payment.css";
import { useEffect, useState } from "react";
import { apiGet } from "../api/api";

const Payment = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const agentId = localStorage.getItem("agentId");

    apiGet(`/api/agent/payment-details/${agentId}`)
      .then(res => {
        if (res.success) setData(res.data);
      });
  }, []);

  if (!data) return null;

  return (
    <div className="agent-payments-main-container">

      <div className="agent-payments-breadcrumb-bar">
        You are here :
        <span> Home </span> /
        <span> Payment Page </span>
      </div>

      <div className="agent-payments-content-padding">

        <h2 className="agent-payments-page-title">Payment Page</h2>

        <div className="agent-payments-payment-center-box">

          <div className="agent-payments-payment-box-header">Payment Details</div>

          <div className="agent-payments-payment-top">
            <div>
              <p><b>Application Number :</b> {data.application_no}</p>
              <p><b>Transaction Id :</b> {data.transaction_id}</p>
              <p><b>APRERA GST No. :</b> 37AAAGA0918EZY</p>
            </div>

            <div className="agent-payments-payment-date">
              <p><b>Date :</b> {new Date(data.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <table className="agent-payments-payment-table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{data.agent_name}</td>
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
                <td>{data.payment_for}</td>
              </tr>
              <tr>
                <td>Registration Amount</td>
                <td>₹ {data.amount}</td>
              </tr>
            </tbody>
          </table>

          <div className="agent-payments-payment-amount">
            <b>Total Amount</b>
            <span>₹ {data.amount}.00</span>
          </div>

          <div className="agent-payments-payment-btn-row">
            <button className="agent-payments-payment-btn">
              Proceed To Pay
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;