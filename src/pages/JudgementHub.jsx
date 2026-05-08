import React from "react";
import "../styles/JudgementHub.css";
import ApReraJud from "../../public/assets/pdfs/APRERA_Judgement.pdf"

const JudgementHub = () => {
  return (
    <div className="judgement-page">
      <div className="judgement-container">
        {/* Breadcrumb */}
        <div className="judgement-breadcrumb">
          You are here :&nbsp;
          <a href="#">Home</a> /&nbsp;
          <a href="#">Knowledge Hub</a> /&nbsp;
          <span>Judgement</span>
        </div>

        {/* Content */}
        <div className="judgement-content">
          <h2 className="judgement-page-title">Judgement</h2>

          <table className="judgement-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Description</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td className="judgement-desc-text">Judgement</td>
                <td>
                  <span className="judgement-download-link" onClick={() => window.open(ApReraJud, "_blank")}>⬇️</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JudgementHub;