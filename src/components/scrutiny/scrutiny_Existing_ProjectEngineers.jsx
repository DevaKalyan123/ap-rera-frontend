import React from "react";

const safe = (value) =>
  value !== undefined && value !== null && String(value).trim() !== ""
    ? value
    : "NA";

const scrutiny_ExistingProjectEngineers = ({ engineers = [] }) => {
  return (
    <section className="scrutiny-associate-section">
      <h3 className="scrutiny-associate-title">Project Engineers</h3>

      {engineers.length === 0 ? (
        <div className="scrutiny-empty-state">Project engineer details not added.</div>
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
                <th>No. of Key Projects</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {engineers.map((engineer, index) => (
                <tr key={`project-engineer-${index}`}>
                  <td>{index + 1}</td>
                  <td>{safe(engineer.name)}</td>
                  <td>{safe(engineer.email)}</td>
                  <td>{safe(engineer.address)}</td>
                  <td>{safe(engineer.state)}</td>
                  <td>{safe(engineer.district)}</td>
                  <td>{safe(engineer.pinCode)}</td>
                  <td>{safe(engineer.keyProjects)}</td>
                  <td>{safe(engineer.mobile)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default scrutiny_ExistingProjectEngineers;