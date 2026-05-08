import React from "react";
import { useState } from "react";
import "../styles/rti.css";

export default function RTI() {

  // ✅ NOTHING OPEN BY DEFAULT
  const [open, setOpen] = useState("");

  const toggle = (id) => {
    setOpen(open === id ? "" : id);
  };

  return (
    <div className="rti">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        You are here : <span>Home</span> / About Us / RTI
      </div>
      <div className="rti-maincontaint">
      <h1 className="rti-title">THE RIGHT TO INFORMATION ACT 2005</h1>
      <div className="rti-blue-line"></div>

      <p className="rti-desc">
        An Act to provide for setting out the practical regime of right to
        information for citizens to secure access to information under the
        control of public authorities, in order to promote transparency and
        accountability in the working of every public authority the constitution of a Central Information Commission and State Information Commissions and for matters connected therewith or incidental thereto.
      </p>

      <div className="accordion">

        {/* RTI ACT */}
        <div className={`acc-item ${open === "act" ? "open" : ""}`}>
          <div className="acc-header" onClick={() => toggle("act")}>
            <span>{open === "act" ? "−" : "+"}</span>
            Right To Information Act 2005
          </div>

          {open === "act" && (
            <div className="acc-body">
              <a href="../../public/assets/pdfs/RTIACT2005.pdf" target="_blank">
                RTI Act 2005
              </a>
              <br />
              <a href="../../public/assets/pdfs/RTIACT2005_TELUGU.pdf" target="_blank">
                సమాచార హక్కు చట్టం 2005
              </a>
            </div>
          )}
        </div>

        {/* Notification */}
        {/* Notification */}
<div className={`acc-item ${open === "notification" ? "open" : ""}`}>
  <div className="acc-header" onClick={() => toggle("notification")}>
    <span>{open === "notification" ? "−" : "+"}</span>
    Notification
  </div>

  {open === "notification" && (
    <div className="acc-body notice-box">
      <span className="notice-text">
        This content will be published very soon...
      </span>
    </div>
  )}
</div>


        {/* Appeals */}
        {/* Appeals */}
<div className={`acc-item ${open === "appeals" ? "open" : ""}`}>
  <div className="acc-header" onClick={() => toggle("appeals")}>
    <span>{open === "appeals" ? "−" : "+"}</span>
    Appeals
  </div>

  {open === "appeals" && (
    <div className="acc-body">

      <p>
        <strong>The First Appeal:</strong> The first appeal to the officer senior
        in rank to the PIO in the concerned public authority within 30 days from
        the expiry of the prescribed time limit or from the receipt of the
        decision (delay may be condoned by the appellate authority if sufficient
        cause is shown).
      </p>

      <p>
        <strong>The Second Appeal:</strong> The second appeal to the Central
        Information Commission or the State Information Commission as the case
        may be, within 90 days of the date on which the decision was given or
        should have been made by the first appellate authority (delay may be
        condoned by the Commission if sufficient cause is shown).
      </p>

      <p>
        <strong>The Third Appeal:</strong> The third party appeal against PIO's
        decision must be filed within 30 days before first appellate authority;
        and, within 90 days of the decision on the first appeal, before the
        appropriate information commission which is the second appellate
        authority.
      </p>

    </div>
  )}
</div>

        {/* CPIO */}
        {/* CPIO */}
<div className={`acc-item ${open === "cpio" ? "open" : ""}`}>
  <div className="acc-header" onClick={() => toggle("cpio")}>
    <span>{open === "cpio" ? "−" : "+"}</span>
    CPIO, Appellate Authority Contact Details
  </div>

  {open === "cpio" && (
    <div className="acc-body">

      <table className="cpio-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Designation of the Officer</th>
            <th>Designation under RTI Act</th>
            <th>Mobile Number</th>
            <th>Email Address</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Smt K Naga Sundari</td>
            <td>Director</td>
            <td>Appellate Authority</td>
            <td>9347271464</td>
            <td>nagasundari.k@gov.in</td>
            <td>
              D.No.: 60-5-1, 3rd & 4th Floors, Y Tower, Siddhartha Nagar 1st Lane,
              Pinnamaneni Polyclinic Road, Vijayawada - 520010,
              Krishna District, Andhra Pradesh.
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>SRI M Ranga Prasad</td>
            <td>Assistant Director</td>
            <td>Public Information Officer</td>
            <td>8688300973</td>
            <td>rp.makarla@gov.in</td>
            <td>Same as above</td>
          </tr>

          <tr>
            <td>3</td>
            <td>Smt Y.N.L. Sirisha</td>
            <td>TPS</td>
            <td>Asst. Public Information Officer</td>
            <td>9989890596</td>
            <td>nlsirisha.yerrapothu@ap.gov.in</td>
            <td>Same as above</td>
          </tr>
        </tbody>
      </table>

    </div>
  )}
</div>


        {/* Published Info */}
        {/* Published Info */}
<div className={`acc-item ${open === "published" ? "open" : ""}`}>
  <div className="acc-header" onClick={() => toggle("published")}>
    <span>{open === "published" ? "−" : "+"}</span>
    Published information as per Right to Information Act, 2005, Sec 4(1)(b)
  </div>

  {open === "published" && (
    <div className="acc-body">
      <p className="soon">This content will be published very soon...</p>
    </div>
  )}
</div>

</div>
      </div>
    </div>
  );
}