import React from "react";
import "../styles/apreat.css";

export default function Apreat() {
  return (
    <div className="apreatt-page-wrapper">
      <div className="apreatt-content-box">

        {/* Breadcrumb */}
        <div className="apreatt-breadcrumb">
          You are here : APREAT Contact Us
        </div>

        <div className="apreatt-inner-content">

          {/* CHAIRPERSON */}
          <div className="apreatt-section-title">CHAIRPERSON</div>
          <div className="apreatt-underline"></div>

          <table className="apreatt-table">
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
                <td className="apreatt-name">
                  HON'BLE JUSTICE SRI M. GANGARAO
                </td>
                <td>7901097368</td>
                <td>-</td>
                <td>
                  <img
                    className="apreatt-photo"
                    src="/assets/images/JUSTICEMGangarao.jpg"
                    alt="Chairperson"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* MEMBERS */}
          <div className="apreatt-section-title">MEMBERS</div>
          <div className="apreatt-underline"></div>

          <table className="apreatt-table">
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
                <td>JUDICIAL MEMBER</td>
                <td className="apreatt-name">
                  SRI RAMACHANDRA REDDY MANDALAPU
                </td>
                <td>9914756999</td>
                <td>-</td>
                <td>
                  <img
                    className="apreatt-photo"
                    src="/assets/images/Ramachandrareddy sir.jpeg"
                    alt="Ramachandra Reddy"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* REGISTRAR */}
          <div className="apreatt-section-title">REGISTRAR</div>
          <div className="apreatt-underline"></div>

          <table className="apreatt-table">
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
                <td>REGISTRAR</td>
                <td className="apreatt-name">
                  SRI GUDURI RAMA KRISHNA
                </td>
                <td>-</td>
                <td>registrar.apreat@gmail.com</td>
                <td>
                  <img
                    className="apreatt-photo"
                    src="/assets/images/guduri.jpeg"
                    alt="Guduri Rama Krishna"
                  />
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}