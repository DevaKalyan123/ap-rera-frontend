import React from "react";
import "../styles/PressRelease.css";
import PressNotepdf from "../../public/assets/pdfs/PressNote.pdf";
import LastDatepdf from "../../public/assets/pdfs/LastDate_News.pdf";

const PressRelease = () => {
  return (
    <div className="pressRel-page">
      <div className="pressRel-container">
        {/* Breadcrumb */}
        <div className="pressRel-breadcrumb">
          You are here :&nbsp;
          <a href="#">Home</a> /&nbsp;
          <a href="#">Promotions</a> /&nbsp;
          <span>Press Releases</span>
        </div>

        {/* Content */}
        <div className="pressRel-content">
          <h2 className="pressRel-page-title">Press Releases</h2>

          <table className="pressRel-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Download</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="pressRel-subject-text">Press note on Web launch</td>
                <td className="pressRel-date-text">05th Feb 2018</td>
                <td>
                  <span className="pressRel-download-link" onClick={() => window.open(PressNotepdf, "_blank")}>⬇️</span>
                </td>
              </tr>

              <tr>
                <td className="pressRel-subject-text">
                  Press Note on Last Date to register with APRERA
                </td>
                <td className="pressRel-date-text">27th Aug 2019</td>
                <td>
                  <span className="pressRel-download-link" onClick={() => window.open(LastDatepdf, "_blank")}>⬇️</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PressRelease;