import React from "react";

const safe = (value) =>
  value !== undefined && value !== null && String(value).trim() !== ""
    ? value
    : "NA";

const scrutiny_ExistingProjectContractors = ({ contractors = [] }) => {
  return (
    <section className="scrutiny-associate-section">
      <h3 className="scrutiny-associate-title">Project Contractors</h3>

      {contractors.length === 0 ? (
        <div className="scrutiny-empty-state">Project contractor details not added.</div>
      ) : (
        <div className="scrutiny-table-shell">
          <table className="scrutiny-data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Nature of Work</th>
                <th>Contractor Name</th>
                <th>Email ID</th>
                <th>Address</th>
                <th>State/UT</th>
                <th>District</th>
                <th>PIN Code</th>
                <th>Year of Establishment</th>
                <th>No. of Key Projects</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {contractors.map((contractor, index) => (
                <tr key={`contractor-${index}`}>
                  <td>{index + 1}</td>
                  <td>{safe(contractor.natureOfWork)}</td>
                  <td>{safe(contractor.name)}</td>
                  <td>{safe(contractor.email)}</td>
                  <td>{safe(contractor.address)}</td>
                  <td>{safe(contractor.state)}</td>
                  <td>{safe(contractor.district)}</td>
                  <td>{safe(contractor.pinCode)}</td>
                  <td>{safe(contractor.yearOfEstablishment)}</td>
                  <td>{safe(contractor.keyProjects)}</td>
                  <td>{safe(contractor.mobile)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default scrutiny_ExistingProjectContractors;