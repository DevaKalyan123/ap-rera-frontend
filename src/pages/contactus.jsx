import "../styles/ContactUs.css";
import { Link } from "react-router-dom";


export default function ContactUs() {
  return (
    <div className="contactuss-wrapper">

      {/* Breadcrumb */}
      <div className="contactuss-breadcrumb-bar">
  You are here :
  <Link to="/" className="contactuss-breadcrumb-home">
    Home
    <span className="contactuss-home-underline"></span>
  </Link>
  <span className="contactuss-breadcrumb-sep"> / </span>

  <span className="contactuss-breadcrumb-text">About Us</span>
  <span className="contactuss-breadcrumb-sep"> / </span>

  <span className="contactuss-breadcrumb-text">Contact Us</span>
  <span className="contactuss-breadcrumb-sep"> / </span>

  <span className="contactuss-breadcrumb-active">Staff</span>
</div>

      {/* Help Desk */}
     {/* PAGE HEADER */}
<div className="contactuss-page-header">
  <div className="contactuss-header-row">

    {/* LEFT SIDE – EMPTY (or future title if needed) */}
    <div></div>

    {/* RIGHT SIDE – HELP DESK */}
    <div className="contactuss-helpdesk contactus-blink-effect">
      <span className="contactuss-helpdesk-text">Help Desk :</span>
      <span className="contactuss-helpdesk-icon">
        <img src="../../public/assets/images/image.png" />
      </span>
      <span className="contactuss-helpdesk-number">6304906011</span>
    </div>

  </div>
</div>



      {/* A. CHAIRPERSON */}
      <section>
        <h3 className="contactuss-section-title">A. CHAIRPERSON</h3>
        <table className="contactuss-data-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Designation</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email ID</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>CHAIRPERSON</td>
              <td>SRI A. SIVA REDDY</td>
              <td>-</td>
              <td>chairperson@ap-rera.in</td>
              <td>
                <img src="../../public/assets/images/Chairperson_APRERA.jpeg" alt="Chairperson" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* B. MEMBERS */}
      <section>
        <h3 className="contactuss-section-title">B. MEMBERS</h3>
        <table className="contactuss-data-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Designation</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email ID</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "SRI RAJASEKHARA REDDY EADA", "rsr@ap-rera.in","../../public/assets/images/Rajasekhar sir.jpeg"],
              ["2", "SRI U.S.L.N. KAMESWARA RAO", "kameswararao@ap-rera.in", "../../public/assets/images/kameswararao sir.jpeg"],
              ["3", "SRI AVALA JAGANNADHA RAO", "ajrao1965@ap-rera.in", "../../public/assets/images/JagannadhaRao Sir New.jpeg"],
              ["4", "SRI MANTRIRAO VENKATA RATNAM", "mantrirao@ap-rera.in", "../../public/assets/images/Venkata Ratnam Sir.jpg"],
              ["5", "SRI SRINIVASA RAO DAMACHERLA", "dsrgntrm@ap-rera.in", "../../public/assets/images/Srinivasa Rao Sir.jpg"],
              ["6", "SRI VENKATESWARLU MERUVA", "venkatmember@ap-rera.in", "../../public/assets/images/Venkateswarlu Sir.jpg"],
              ["7", "SRI KULADEEP JUJJAVARAPU", "kuldeepmember@ap-rera.in", "../../public/assets/images/Kuladeep Sir.png"],
            ].map((m, i) => (
              <tr key={i}>
                <td>{m[0]}</td>
                <td>MEMBER</td>
                <td>{m[1]}</td>
                <td>-</td>
                <td>{m[2]}</td>
                <td>
                  <img src={`/images/${m[3]}`} alt={m[1]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* C. ADJUDICATION */}
      <section>
        <h3 className="contactuss-section-title">C. ADJUDICATION</h3>
        <table className="contactuss-data-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Designation</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email ID</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>ADJUDICATING OFFICER</td>
              <td>SRI SUVARNA RAJU</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* D. RTI */}
      <section>
        <h3 className="contactuss-section-title">D. RTI</h3>
        <table className="contactuss-data-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Designation</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email ID</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>PUBLIC INFORMATION OFFICER</td>
              <td>SRI M RANGA PRASAD</td>
              <td>8688300973</td>
              <td>rp.makarla@ap-rera.in</td>
              <td>-</td>
            </tr>
            <tr>
              <td>2</td>
              <td>ASST. PUBLIC INFORMATION OFFICER</td>
              <td>SMT Y.N.L SIRISHA</td>
              <td>9989890596</td>
              <td>sirisha@ap-rera.in</td>
              <td>-</td>
            </tr>
            <tr>
              <td>3</td>
              <td>APPELLATE AUTHORITY</td>
              <td>SMT K NAGA SUNDARI</td>
              <td>9347271464</td>
              <td>director@ap-rera.in</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* E. ACCOUNTS & AUDIT */}
      <section>
        <h3 className="contactuss-section-title">E. ACCOUNTS & AUDIT</h3>
        <table className="contactuss-data-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Designation</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email ID</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>ACCOUNTS OFFICER</td>
              <td>SRI G V SATYANARAYANA</td>
              <td>-</td>
              <td>accountsofficer@ap-rera.in</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ================= OFFICE SECTION ================= */}
      <section>
        <h3 className="contactuss-section-title">Office</h3>

        <div className="contactuss-office-box">
          <div className="contactuss-office-left">
            <h4>ANDHRA PRADESH REAL ESTATE REGULATORY AUTHORITY</h4>
            <p>6th &amp; 7th Floors,</p>
            <p>APCRDA Project Office,</p>
            <p>Rayapudi, Tulluru Mandal,</p>
            <p>Amaravati, Guntur District,</p>
            <p>Andhra Pradesh. Pin - 522237.</p>

            <p className="contactuss-office-help">
              <strong>Help Desk :</strong>{" "}
              <span>6304906011</span> (All Working Days, 10AM - 5.30PM)
            </p>

            <p className="contactuss-office-mail">
              Write to<br />
              authority.aprera@gmail.com<br />
              helpdesk-rera@ap.gov.in<br />
              complaint@ap-rera.in
            </p>
          </div>

          <div className="contactuss-office-right">
            <iframe
              title="APRERA Office"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d61194.37276190021!2d80.496107!3d16.543844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35ed004f0fedc3%3A0x1f16a1b1d63e2a81!2sAPCRDA%20Project%20Office!5e0!3m2!1sen!2sin!4v1767983217513!5m2!1sen!2sin"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}