import "../styles/OurLeadership.css";
import { Link } from "react-router-dom";


export default function OurLeadership() {
  return (
    <div className="ourleadership-page">
<div className="ourleadership-maincontainer"></div>
      {/* Breadcrumb */}
      <div className="ourleadership-breadcrumb">
  You are here :
  <Link to="/" className="breadcrumb-home">
    Home
    <span className="home-underline"></span>
  </Link>
  <span className="breadcrumb-sep"> / </span>
  About Us
  <span className="breadcrumb-sep"> / </span>
  <span className="ourleadership-active">Our Leadership</span>
</div>


      {/* Page Title */}
      <div className="ourleadership-page-header">
        <h2 className="ourleadership-h2">OUR LEADERSHIP</h2>
        

      

      {/* Leadership Table */}
      <table className="ourleadership-leadership-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>NAME OF THE PERSON</th>
            <th>DESIGNATION</th>
            <th>MAIL ID</th>
            <th>PHOTO</th>
          </tr>
        </thead>
        <tbody>
  <tr>
    <td>1</td>
    <td>SRI A. SIVA REDDY<br />APRERA</td>
    <td>CHAIRPERSON</td>
    <td>chairperson@ap-rera.in</td>
    <td>
      <img src="../../public/assets/images/Chairperson_APRERA.jpeg" alt="Chairperson_APRERA.jpeg" />
    </td>
  </tr>

  <tr>
    <td>2</td>
    <td>SRI RAJASEKHARA REDDY EADA</td>
    <td>MEMBER</td>
    <td>rsr@ap-rera.in</td>
    <td>
      <img src="../../public/assets/images/Rajasekhar sir.jpeg" alt="Rajasekhar sir.jpeg" />
    </td>
  </tr>

  <tr>
    <td>3</td>
    <td>SRI S.L. KAMESWARA RAO UPADRASTA</td>
    <td>MEMBER</td>
    <td>kameswararao@ap-rera.in</td>
    <td>
      <img src="../../public/assets/images/kameswararao sir.jpeg" alt="kameswararao sir.jpeg" />
    </td>
  </tr>

  <tr>
    <td>4</td>
    <td>SRI JAGANNADHA RAO AVALA</td>
    <td>MEMBER</td>
    <td>ajrao1965@ap-rera.in</td>
    <td>
      <img src="../../public/assets/images/JagannadhaRao Sir New.jpeg" alt="JagannadhaRao Sir New.jpeg" />
    </td>
  </tr>

  <tr>
    <td>5</td>
    <td>SRI MANTRIRAO VENKATA RATNAM</td>
    <td>MEMBER</td>
    <td>mantrirao@ap-rera.in</td>
    <td>
      <img src="../../public/assets/images/Venkata Ratnam Sir.jpg" alt="Venkata Ratnam Sir.jpg" />
    </td>
  </tr>

  <tr>
    <td>6</td>
    <td>SRI SRINIVASA RAO DAMACHERLA</td>
    <td>MEMBER</td>
    <td>dsrgntrm@ap-rera.in</td>
    <td>
      <img src="../../public/assets/images/Srinivasa Rao Sir.jpg" alt="Srinivasa Rao Sir.jpg" />
    </td>
  </tr>

  <tr>
    <td>7</td>
    <td>SRI VENKATESWARLU MERUVA</td>
    <td>MEMBER</td>
    <td>venkatmember@ap-rera.in</td>
    <td>
      <img src="../../public/assets/images/Venkateswarlu Sir.jpg" alt="Venkateswarlu Sir.jpg" />
    </td>
  </tr>

  <tr>
    <td>8</td>
    <td>SRI KULADEEP JUJJAVARAPU</td>
    <td>MEMBER</td>
    <td>kuldeepmember@ap-rera.in</td>
    <td>
      <img src="../../public/assets/images/Kuladeep Sir.png" alt="" />
    </td>
  </tr>
</tbody>

      </table>

      {/* Office Section */}
      <div className="ourleadership-office-section">
        <h3>Office</h3>
        <div className="ourleadership-title-line"></div>

        <div className="ourleadership-office-box">
          <div className="ourleadership-office-details">
            <h4>ANDHRA PRADESH REAL ESTATE REGULATORY AUTHORITY</h4>
            <p>
              6th & 7th Floors,<br />
              APCRDA Project Office,<br />
              Rayapudi,Tulluru Mandal,<br />
              Amaravati, Guntur District,<br />
              Andhra Pradesh. Pin - 522237.
            </p>

            <p className="ourleadership-blue">
              Help Desk ☎ 6304906011 (All Working Days, 10AM - 6PM)
            </p>
            <p className="ourleadership-blue">
              ✉ helpdesk-rera@ap.gov.in <br />
              ✉ complaint@ap-rera.in
            </p>
          </div>

          <div className="ourleadership-map-box">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d61194.37276190021!2d80.496107!3d16.543844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35ed004f0fedc3%3A0x1f16a1b1d63e2a81!2sAPCRDA%20Project%20Office!5e0!3m2!1sen!2sin!4v1767983217513!5m2!1sen!2sin" ></iframe>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}