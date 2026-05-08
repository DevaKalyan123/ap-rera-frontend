import React from "react";
import "../styles/GoiNotifications.css";

const notifications = [
  {
    sno: 1,
    orderNo: "S.O. 1544(E)",
    date: "27.04.2016",
    subject:
      "Notification regarding commencement of Real Estate (Regulation and Development) Act, 2016",
    file: "/assets/pdfs/5067gi.pdf",
  },
  {
    sno: 2,
    orderNo: "16/2016",
    date: "01.05.2016",
    subject: "RERA India Gazette",
    file: "/assets/pdfs/5324gi.pdf",
  },
  {
    sno: 3,
    orderNo: "S.O. 3347(E)",
    date: "28.10.2016",
    subject: "Real Estate removal of Difficulties Order",
    file: "/assets/pdfs/3gi.pdf",
  },
  {
    sno: 4,
    orderNo: "S.O. 1216(E)",
    date: "19.04.2017",
    subject: "RERA - Centre notified pending sections of the Act",
    file: "/assets/pdfs/4gi.pdf",
  },
];

function GoiRera() {
  return (
    <div className="goi-notif-wrapper">
      {/* Breadcrumb */}
      <div className="goi-notif-breadcrumb">
        You are here :
        <a href="/" className="goi-notif-home"> Home</a> /{" "}
        <span className="goIitext">Notifications</span>
          <span> / </span>
  <span>GOIN Notifications</span>
      </div>

      {/* Title */}
      <h2 className="goi-notif-title">GOI RERA GO's</h2>
      <div className="goi-notif-underline"></div>

      {/* Table */}
      <div className="goi-notif-table-box">
        <div className="goi-notif-table-title">
          Central Government Notifications
        </div>

        <table className="goi-table">
          <thead className="goi-thead">
            <tr className="goi-tr">
              <th>S.No</th>
              <th>Order No</th>
              <th>Date</th>
              <th>Subject</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody className="goi-tbody">
            {notifications.map((item) => (
              <tr key={item.sno}>
                <td>{item.sno}</td>
                <td>{item.orderNo}</td>
                <td>{item.date}</td>
                <td>{item.subject}</td>
                <td className="goi-notif-download">
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GoiRera;