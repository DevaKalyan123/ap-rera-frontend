import React from "react";
import "./ComplaintDashboard.css";

const ComplaintDetails = () => {
  const data = {
    total: 120,
    newComplaints: 25,
    approved: 40,
    rejected: 15,
    consideration: 40,
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Complaint Dashboard</h2>

      <div className="cards-container">

        <div className="card total">
          <h3>Total Complaints</h3>
          <p>{data.total}</p>
        </div>

        <div className="card new">
          <h3>New Complaints</h3>
          <p>{data.newComplaints}</p>
        </div>

        <div className="card approved">
          <h3>Approved</h3>
          <p>{data.approved}</p>
        </div>

        <div className="card rejected">
          <h3>Rejected</h3>
          <p>{data.rejected}</p>
        </div>

        <div className="card consideration">
          <h3>Under Consideration</h3>
          <p>{data.consideration}</p>
        </div>

      </div>
    </div>
  );
};

export default ComplaintDetails;