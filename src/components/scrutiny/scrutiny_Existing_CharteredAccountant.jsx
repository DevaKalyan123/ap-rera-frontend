import React from "react";

const safe = (value) =>
  value !== undefined && value !== null && String(value).trim() !== ""
    ? value
    : "NA";

const scrutiny_ExistingCharteredAccountant = ({ accountants = [] }) => {
  return (
    <section className="scrutiny-associate-section">
      <h3 className="scrutiny-associate-title">Chartered Accountant</h3>

      {accountants.length === 0 ? (
        <div className="scrutiny-empty-state">
          Chartered accountant details not added.
        </div>
      ) : (
        <div className="scrutiny-table-shell">
          <table className="scrutiny-data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Address</th>
                <th>State/UT</th>
                <th>District</th>
                <th>PIN Code</th>
                <th>ICAI Member ID</th>
                <th>No. of Key Projects</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {accountants.map((accountant, index) => (
                <tr key={`accountant-${index}`}>
                  <td>{index + 1}</td>
                  <td>{safe(accountant.name)}</td>
                  <td>{safe(accountant.email)}</td>
                  <td>{safe(accountant.address)}</td>
                  <td>{safe(accountant.state)}</td>
                  <td>{safe(accountant.district)}</td>
                  <td>{safe(accountant.pinCode)}</td>
                  <td>{safe(accountant.icaiMemberId)}</td>
                  <td>{safe(accountant.keyProjects)}</td>
                  <td>{safe(accountant.mobile)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default scrutiny_ExistingCharteredAccountant;