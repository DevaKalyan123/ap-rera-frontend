import React from "react";

const safe = (value) =>
  value !== undefined && value !== null && String(value).trim() !== ""
    ? value
    : "NA";

const scrutiny_ExistingArchitects = ({ architects = [] }) => {
  return (
    <section className="scrutiny-associate-section">
      <h3 className="scrutiny-associate-title">Project Architects</h3>

      {architects.length === 0 ? (
        <div className="scrutiny-empty-state">Project architect details not added.</div>
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
                <th>Year of Establishment</th>
                <th>No. of Key Projects</th>
                <th>COA Registration No.</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {architects.map((architect, index) => (
                <tr key={`architect-${index}`}>
                  <td>{index + 1}</td>
                  <td>{safe(architect.name)}</td>
                  <td>{safe(architect.email)}</td>
                  <td>{safe(architect.address)}</td>
                  <td>{safe(architect.state)}</td>
                  <td>{safe(architect.district)}</td>
                  <td>{safe(architect.pinCode)}</td>
                  <td>{safe(architect.yearOfEstablishment)}</td>
                  <td>{safe(architect.keyProjects)}</td>
                  <td>{safe(architect.regNumber)}</td>
                  <td>{safe(architect.mobile)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default scrutiny_ExistingArchitects;