import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/AnnouncementPopup.css";

// IMAGE
import announcementImg from "../../public/assets/images/apreraad_new1.jpg";

// PDFS
import Circular from "../../public/assets/pdfs/Circular-p-18.pdf";
import QUStatus from "../../public/assets/pdfs/QU Status Report.pdf";
import CircularCR from "../../public/assets/pdfs/Circular-CR-Levy of Fee.pdf";
import QPR from "../../public/assets/pdfs/QPR-circular_Uninterupted.pdf";
import Bank from "../../public/assets/pdfs/Bank_Circular.pdf";

const announcements = [
    {
    title: "Circular No. P/2/2026  Dt.12-01-2026",
    description:
      "50% Concession on applicable penalty levied for delayed submission of QPRs",
    pdf: Circular,
  },
  {
    title: "Circular No. P/18/2025 Dt.29-12-2025",
    description:
      "One Time Opportunity with 50% Concession on Late Fee for Un-registered Projects.",
    pdf: Circular,
  },
  {
    title: "Quarterly Updates Status Report",
    description:
      "APRERA Registered Projects - Quarterly Updates Status Report (By order of the Authority).",
    pdf: QUStatus,
  },
  

  // {
  //   title: "Circular No. P/10/2025, Dt.14-05-2025",
  //   description:
  //     "AP RERA - Change Request (CR) - Levy of Fee - Circular Issued - Reg.",
  //   pdf: CircularCR,
  // },
  // {
  //   title: "Circular No. P/9/2025 Dt.28-03-2025",
  //   description:
  //     "AP RERA - Pending QPRs - Imposition of Penalty for delayed submission and to provide uninterrupted link henceforth - Circular Issued - Reg.",
  //   pdf: QPR,
  // },
  // {
  //   title: "Circular No. P/8/2025 Dt.28-03-2025",
  //   description:
  //     "AP RERA - Directions for Maintenance and Operation of Real Estate Project Bank Accounts - Reg.",
  //   pdf: Bank,
  // },
];

const AnnouncementPopup = () => {
  // 1 = Image popup, 2 = Announcement popup, 0 = closed
  const [step, setStep] = useState(1);
  const location = useLocation();

  useEffect(() => {
  
  return () => {
    document.body.style.overflow = "auto";
  };
}, []);




  // ✅ SHOW POPUP ONLY ON HOME PAGE
  if (location.pathname !== "/") {
    return null;
  }

  if (step === 0) return null;

  const openPdfInNewPage = (pdfUrl) => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="announcement-popup-overlay">
      <div className="announcement-popup-container">
        {/* HEADER */}
        <div className="announcement-popup-header">
          <span>{step === 2 ? "ANNOUNCEMENTS" : ""}</span>

          <button
            onClick={() => {
              if (step === 1) setStep(2);
              else setStep(0);
            }}
          >
            ×
          </button>
        </div>

        {/* ===== POPUP 1 – IMAGE ===== */}
   {step === 1 && (
  <div className="announcement-popup-body">
    <div className="announcement-doc-frame">
      <img src={announcementImg} alt="APRERA Circular" />
    </div>
  </div>
)}



        {/* ===== POPUP 2 – ANNOUNCEMENTS ===== */}
        {step === 2 && (
          <div className="announcement-popup-announcement-">
            {announcements.map((item, index) => (
              <div
                key={index}
                className="announcement-card"
                style={{ cursor: item.pdf ? "pointer" : "default" }}
                onClick={() => item.pdf && openPdfInNewPage(item.pdf)}
              >
                <div className="announcement-title">
                  <span className="announcement-new-badge">NEW</span>
                  {item.title}
                  <span className="announcement-new-badge">NEW</span>
                </div>
                <p>
                  <b>{item.description}</b>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementPopup;