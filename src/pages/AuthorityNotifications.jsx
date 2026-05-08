import React from "react";
import { useState } from "react";
import "../styles/AuthorityNotifications.css";

// ✅ Use public assets as URLs (DO NOT import from /public)
const an38 = "/assets/pdfs/an38.pdf";
const an37 = "/assets/pdfs/an37.pdf";
const an1 = "/assets/pdfs/an1.pdf";
const an2 = "/assets/pdfs/an2.pdf";
const an3 = "/assets/pdfs/an3.pdf";
const an4 = "/assets/pdfs/an4.pdf";
const an5 = "/assets/pdfs/an5.pdf";
const an6 = "/assets/pdfs/an6.pdf";
const an7 = "/assets/pdfs/an7.pdf";
const an8 = "/assets/pdfs/an8.pdf";
const an9 = "/assets/pdfs/an9.pdf";
const an10 = "/assets/pdfs/an10.pdf";
const an11 = "/assets/pdfs/an11.pdf";
const an12 = "/assets/pdfs/an12.pdf";
const an13 = "/assets/pdfs/an13.pdf";
const an14 = "/assets/pdfs/an14.pdf";
const an15 = "/assets/pdfs/an15.pdf";
const an16 = "/assets/pdfs/an16.pdf";
const an17 = "/assets/pdfs/an17.pdf";
const an18 = "/assets/pdfs/an18.pdf";
const an19 = "/assets/pdfs/an19.pdf";
const an20 = "/assets/pdfs/an20.pdf";
const an21 = "/assets/pdfs/an21.pdf";
const an22 = "/assets/pdfs/an22.pdf";
const an23 = "/assets/pdfs/an23.pdf";
const an24 = "/assets/pdfs/an24.pdf";
const an25 = "/assets/pdfs/an25.pdf";
const an26 = "/assets/pdfs/an26.pdf";
const an27 = "/assets/pdfs/an27.pdf";
const an28 = "/assets/pdfs/an28.pdf";
const an29 = "/assets/pdfs/an29.pdf";
const an30 = "/assets/pdfs/an30.pdf";
const an31 = "/assets/pdfs/an31.pdf";
const an32 = "/assets/pdfs/an32.pdf";
const an33 = "/assets/pdfs/an33.pdf";
const an34 = "/assets/images/34.jpg";   // image
const an35 = "/assets/pdfs/an35.pdf";
const an36 = "/assets/pdfs/an36.pdf";

const data = [



  {
  sno: 1,
  circularNo: "Circular No. P/2/2026",
  isNew: true,
  date: "12-01-2026",
  subject:
    "Pending QPRs - 50% concession on applicable penalty levied for delayed submission of QPRs (Circular No. P/9/2025 Dt: 11-04-2025) for three months as one time opportunity.",
  file: an38,
},

  {
    
    sno: 2,
    circularNo: "Ref No. Empanelment of Legal Firms/2026",
    isNew: true,
    date: "08-01-2026",
    subject:
      "Request for Proposal (RFP) Empanelment of Legal Firm to Provide Legal Services for APRERA.",
    file: an37,
  },
  {
    sno: 3,
    circularNo: "P/18/2025",
    isNew: true,
    date: "29-12-2025",
    subject:
      "One Time Opportunity with 50% Concession on Late Fee for Un-registered Projects.",
    file: an1,
  },
  {
    sno: 4,
    circularNo: "A/17/2025",
    isNew: true,
    date: "15-12-2025",
    subject: "AP RERA - Office New Address - Notification.",
    file: an2,
  },
  {
    sno: 5,
    circularNo: "A/15/2025",
    isNew: false,
    date: "01-12-2025",
    subject: "AP RERA - Office New Address - Notification.",
    file: an3,
  },
  {
    sno: 6,
    circularNo: "APREAT",
    isNew: true,
    date: "01-12-2025",
    subject: "AP REAT - Office New Address - Notification.",
    file: an4,
  },
  {
    sno: 7,
    circularNo: "Roc No. A/10/2019/RERA",
    isNew: true,
    date: "14-10-2025",
    subject:
      "AP RERA - Applications are invited for the post of Standing Counsel one (1) for APRERA, Vijayawada - Reg.",
    file: an5,
  },
  {
    sno: 8,
    circularNo: "NO.MAU/70-RERA/GENL-6/2025-TPOP",
    isNew: true,
    date: "31-07-2025",
    subject:
      "AP RERA - to encourage the Green Buildings and to promote the sustainable urban development in the state of Andhra Pradesh - Reg.",
    file: an6,
  },
  {
    sno: 9,
    circularNo: "Circular No. P/9/2025",
    isNew: false,
    date: "11-04-2025",
    subject:
      "AP RERA - Pending QPRs - Imposition of Penalty for delayed submission and to provide uninterrupted link henceforth - Circular Issued - Reg.",
    file: an7,
  },
  {
    sno: 10,
    circularNo: "Circular No. P/8/2025",
    isNew: false,
    date: "28-03-2025",
    subject:
      "AP RERA – Directions for Maintenance and Operation of Real Estate Project Bank Accounts - Reg.",
    file: an8,
  },
  {
    sno: 11,
    circularNo: "Circular No. P/2/2025",
    isNew: false,
    date: "29-01-2025",
    subject:
      "Imposition of penalty of 12.5% of registration fee over and above actual registration fee irrespective of delay period as one time opportunity-Regarding.",
    file: an9,
  },
  {
    sno: 12,
    circularNo: "Notification for Appointment of Registrar (APREAT)",
    isNew: false,
    date: "31-01-2025",
    subject:
      "Applications are invited from the eligible Principal District Judges (Retired) of the AP State Judicial Services for appointment to the post of Registrar in the Andhra Pradesh Real Estate Appellate Tribunal (APREAT).established under Section 43(1) of the Real Estate (Regulation and Development) Act,2016 and read with Rule 31 of AP RERA Rules, 2017.",
    file: an10,
  },
  {
    sno: 13,
    circularNo: "Notification for Appointment of Adjudicating Officer",
    isNew: false,
    date: "29-01-2025",
    subject:
      "Applications are invited from eligible retired District Judges for appointment of the post of Adjudicating Officer in  the Andhra Pradesh Real Estate Regulatory Authority(APRERA) under Section 71(1) of the Real Estate (Regulation and Development) Act,2016.",
    file: an11,
  },
  {
    sno: 14,
    circularNo: "Corrigendum for Tender Notice No. Empanelment of legal Firms 2025",
    isNew: false,
    date: "17-01-2025",
    subject:
      "Request for Proposal (RFP) Empanelment of Legal Firm to Provide Legal Services For Andhra Pradesh Real Estate Regulatory",
    file: an12,
  },
  {
    sno: 15,
    circularNo: "Ref No. Empanelment of Legal Firms/2025",
    isNew: false,
    date: "10-01-2025",
    subject:
      "Request for Proposal (RFP) Empanelment of Legal Firm to Provide Legal Services For Andhra Pradesh Real Estate Regulatory",
    file: an13,
  },
  {
    sno: 16,
    circularNo: "Circular No. P/QUP/104/2023",
    isNew: false,
    date: "05-10-2023",
    subject:
      "AP RERA Authority meeting – Information regarding imposition of penalties on quarterly updates.",
    file: an14,
  },
  {
    sno: 17,
    circularNo: "Circular No. P/1082/2021-2",
    isNew: false,
    date: "14-03-2022",
    subject: "Guidelines for exemption from regular Quarterly Updates - Reg.",
    file: an15,
  },
  {
    sno: 18,
    circularNo: "Circular No. P/1082/2021-1",
    isNew: false,
    date: "31-12-2021",
    subject: "Quarterly Updates.",
    file: an16,
  },
  {
    sno: 19,
    circularNo: "Notification Rc. No.621605/M1/2017",
    isNew: false,
    date: "23-12-2021",
    subject: "Applications are invited for the post of Member (RERA Authority).",
    file: an17,
  },
  {
    sno: 20,
    circularNo: "Notification Rc. No.939202/M1/2019",
    isNew: false,
    date: "23-12-2021",
    subject: "Applications are invited for the post of Member (RERA Tribunal).",
    file: an18,
  },
  {
    sno: 21,
    circularNo: "Circular No. A/E-5(A)/2020",
    isNew: false,
    date: "16-07-2021",
    subject:
      "AP RERA Authority meeting – Information regarding imposition of penalties on quarterly updates.",
    file: an19,
  },
  {
    sno: 22,
    circularNo: "Circular No. A/E-3/2020",
    isNew: false,
    date: "01-04-2021",
    subject:
      "AP RERA Authority meeting – Information regarding imposition of penalties on quarterly updates.",
    file: an20,
  },
  {
    sno: 23,
    circularNo: "Circular No. P/2/2017-5",
    isNew: false,
    date: "01-02-2021",
    subject:
      "AP RERA Authority – Imposition of penalties on projects which are not registered with the Authority",
    file: an21,
  },
  {
    sno: 24,
    circularNo: "Circular No. A/E-1/2020",
    isNew: false,
    date: "09-10-2020",
    subject:
      "AP RERA Authority meeting – Information regarding imposition of penalties on quarterly updates.",
    file: an22,
  },
  {
    sno: 25,
    circularNo: "Circular No. P/1082/2019-3",
    isNew: false,
    date: "14-05-2020",
    subject:
      "AP RERA Authority meeting – Information regarding imposition of penalties on quarterly updates.",
    file: an23,
  },
  {
    sno: 26,
    circularNo: "Circular No. P/1082/2019-3",
    isNew: false,
    date: "18-03-2020",
    subject:
      "AP RERA Authority meeting – Information regarding imposition of penalties on quarterly updates.",
    file: an24,
  },
  {
    sno: 27,
    circularNo: "Circular No. A/1104/2019",
    isNew: false,
    date: "20-01-2020",
    subject: "AP RERA Authority meeting – Advise to Promoters.",
    file: an25,
  },
  {
    sno: 28,
    circularNo: "Circular No. P/1082/2019-2(A)",
    isNew: false,
    date: "08-01-2020",
    subject:
      "AP RERA Authority meeting – Information regarding imposition of penalties on quarterly updates.",
    file: an26,
  },
  {
    sno: 29,
    circularNo: "Circular No. P/2/2017-3",
    isNew: false,
    date: "01-01-2020",
    subject:
      "AP Real Estate Regulatory Authority - Imposition of late fee in addition to the actual fee prescribed by the Government for projects which are not registered with Authority - Reg.",
    file: an27,
  },
  {
    sno: 30,
    circularNo: "Circular No. P/1082/2019-2",
    isNew: false,
    date: "17-12-2019",
    subject:
      "AP RERA Authority meeting – Information regarding imposition of penalties on quarterly updates.",
    file: an28,
  },
  {
    sno: 31,
    circularNo: "Circular No. P/1082/2019-1(A)",
    isNew: false,
    date: "31-10-2019",
    subject:
      "AP RERA Authority meeting – Information regarding imposition of penalties on quarterly updates.",
    file: an29,
  },
  {
    sno: 32,
    circularNo: "Circular No. P/1082/2019-1",
    isNew: false,
    date: "25-09-2019",
    subject:
      "AP RERA Authority meeting – Information regarding imposition of penalties on quarterly updates.",
    file: an30,
  },
  {
    sno: 33,
    circularNo: "Circular No. P/2/2017-2",
    isNew: false,
    date: "11-09-2019",
    subject:
      "AP Real Estate Regulatory Authority - Imposition of late fee in addition to the actual fee prescribed by the Government for projects which are not registered with Authority - Reg.",
    file: an31,
  },
  {
    sno: 34,
    circularNo: "Circular No. P/2/2017-1",
    isNew: false,
    date: "15-05-2019",
    subject:
      "AP Real Estate Regulatory Authority - Imposition of late fee in addition to the actual fee prescribed by the Government for projects which are not registered with Authority - Reg.",
    file: an32,
  },
  {
    sno: 35,
    circularNo: "Ref No. APRERA/Trg/2019.",
    isNew: false,
    date: "17-01-2019",
    subject:
      "Specialised training to be organised by APRERA and Building and Construciton Authority, Ministry of National Development, Singapore.",
    file: an33,
  },
  {
    sno: 36,
    circularNo: "Ref No. APRERA/NC/2019.",
    isNew: false,
    date: "17-01-2019",
    subject:
      "Development of Real Estate Industry in AP - Deliberations meeting - Reg.",
    file: an34,
  },
  {
    sno: 37,
    circularNo: "Ref No. APRERA/Colleges/2019.",
    isNew: false,
    date: "17-01-2019",
    subject:
      "Andhra Pradesh Real Estate Regulatory Authority - Qualify - EOI.",
    file: an35,
  },
  {
    sno: 38,
    circularNo: "Ref No. APRERA/NC/2019.",
    isNew: false,
    date: "07-01-2019",
    subject:
      "National Conclave of Real Estate Regulatory Authorities on 5th -6th March, 2019 at India Habitat Centre, Lodhi Road, New Delhi-110003.",
    file: an36,
  },
];

export default function AuthorityNotifications() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const filteredData = data.filter(
    (item) =>
      item.circularNo.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.date.includes(search)
  );

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (page - 1) * entries;
  const visibleData = filteredData.slice(startIndex, startIndex + entries);

  return (
    <div className="auth-notif-wrapper">
      {/* Breadcrumb */}
     <div className="auth-notif-breadcrumb">
  You are here :
  <a href="/" className="auth-notif-home"> Home</a>
  <span> / </span>
  <span>Notifications</span>
  <span> / </span>
  <span>Authority Notifications</span>
</div>


      <h2 className="auth-notif-title">Authority Notifications</h2>
      <div className="auth-notif-underline"></div>

      {/* Controls */}
      <div className="auth-notif-controls">
        <div className="auth-notif-show-entries">
          <span>Show</span>
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
        </div>

        <div>
          Search:
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="auth-notif-table-box">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Circular No</th>
              <th>Date</th>
              <th>Subject</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item) => (
              <tr key={item.sno}>
                <td>{item.sno}</td>
                <td>
                  {item.circularNo}
                  {item.isNew && (
                    <span className="auth-notif-new-badge-star">NEW</span>
                  )}
                </td>
                <td>{item.date}</td>
                <td>{item.subject}</td>
                <td className="auth-notif-download">
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

        {visibleData.length === 0 && (
          <p className="auth-notif-no-data">No records found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="auth-notif-pagination">
  <button
    className="previous"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      className={page === i + 1 ? "auth-notif-active" : ""}
      onClick={() => setPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}

  <button
    className="next"
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>

    </div>
  );
}