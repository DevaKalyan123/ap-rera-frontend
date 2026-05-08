import React from "react";

const safe = (value) =>
  value !== undefined && value !== null && String(value).trim() !== ""
    ? value
    : "NA";

const scrutiny_ExistingProjectAgent = ({ agents = [] }) => {
  return (
    <section className="scrutiny-associate-section">
      <h3 className="scrutiny-associate-title">Project Agent</h3>

      {agents.length === 0 ? (
        <div className="scrutiny-empty-state">Project agent details not added.</div>
      ) : (
        <div className="scrutiny-table-shell">
          <table className="scrutiny-data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Agent RERA Registration No.</th>
                <th>Agent Name</th>
                <th>Agent Address</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <tr key={`agent-${index}`}>
                  <td>{index + 1}</td>
                  <td>{safe(agent.registrationNumber)}</td>
                  <td>{safe(agent.name)}</td>
                  <td>{safe(agent.address)}</td>
                  <td>{safe(agent.mobile)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default scrutiny_ExistingProjectAgent;