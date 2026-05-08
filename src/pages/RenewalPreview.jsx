import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPreview } from "../api/renewalApi";
import RenewalStepper from "../components/RenewalStepper";
import "../styles/renewalpreview.css";

function RenewalPreview() {

  const { renewalId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {

    getPreview(renewalId)
      .then(res => setData(res.data))
      .catch(() => alert("Unable to load preview"));

  }, [renewalId]);

  if (!data) {
    return <p className="loading">Loading Application Preview...</p>;
  }

  const expiryDate = new Date(data.expiry_date);
  const today = new Date();

  const daysRemaining = Math.ceil(
    (expiryDate - today) / (1000 * 60 * 60 * 24)
  );

  const renewalFee = "₹ 5,000";
  const validityExtension = "5 Years";

  return (

    <div className="renewal-page-wrapper">

      {/* Breadcrumb */}

      <div className="renewalpayment-breadcrumb-bar">
        You are here :
        <a href="/" className="renewalpayment-breadcrumb-link">Home</a> /
        <span>Registration</span> /
        <span>Agent Renewal</span>
      </div>

      {/* Page Title */}

      <div className="renewal-container">
        <h2 className="renewal-page-title">Agent Renewal</h2>
      </div>

      {/* Stepper */}

      <div className="stepper-wrapper">
        <RenewalStepper step={3} />
      </div>


      <div className="preview-container">

        <h2 className="page-title">Renewal Application Preview</h2>


        {/* SUMMARY BOX */}

        <div className="summary-box">

          <div>
            <span>Renewal Fee</span>
            <h4>{renewalFee}</h4>
          </div>

          <div>
            <span>Validity Extension</span>
            <h4>{validityExtension}</h4>
          </div>

          <div>
            <span>Remaining Validity</span>
            <h4>{daysRemaining} Days</h4>
          </div>

        </div>


        {/* APPLICATION DETAILS */}

        <div className="preview-card">

          <h3>Application Details</h3>

          <table className="preview-table">

            <tbody>

              <tr>
                <td>Application Number</td>
                <td>{data.application_no}</td>
              </tr>

              <tr>
                <td>Application Created</td>
                <td>{data.created_at}</td>
              </tr>

              <tr>
                <td>Status</td>
                <td>
                  <span className="status">
                    {data.renewal_status}
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>


        {/* AGENT DETAILS */}

        <div className="preview-card">

          <h3>Agent Details</h3>

          <table className="preview-table">

            <tbody>

              <tr>
                <td>Agent Name</td>
                <td>{data.agent_name}</td>
              </tr>

              <tr>
                <td>PAN</td>
                <td>{data.pan}</td>
              </tr>

              <tr>
                <td>Mobile</td>
                <td>{data.mobile}</td>
              </tr>

              <tr>
                <td>Email</td>
                <td>{data.email}</td>
              </tr>

            </tbody>

          </table>

        </div>


        {/* VALIDITY */}

        <div className="preview-card">

          <h3>Registration Validity</h3>

          <table className="preview-table">

            <tbody>

              <tr>
                <td>Expiry Date</td>
                <td>{data.expiry_date}</td>
              </tr>

              <tr>
                <td>Remaining Validity</td>
                <td>{daysRemaining} Days</td>
              </tr>

            </tbody>

          </table>

        </div>


        {/* PAYMENT DETAILS */}

        <div className="preview-card">

          <h3>Payment Details</h3>

          <table className="preview-table">

            <tbody>

              <tr>
                <td>Payment Status</td>
                <td>{data.payment_status}</td>
              </tr>

            </tbody>

          </table>

        </div>


        {/* BUTTONS */}

        <div className="button-area">

          <button
            className="print-btn"
            onClick={() => window.print()}
          >
            Print Application
          </button>

          <button
            className="payment-btn"
            onClick={() => navigate(`/renewal/payment/${renewalId}`)}
          >
            Proceed to Payment
          </button>

        </div>

      </div>

    </div>

  );

}

export default RenewalPreview;