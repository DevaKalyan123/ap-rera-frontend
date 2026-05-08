import React from "react";
import "../styles/formsdownload.css";

import application from "../assets/images/application.pdf";
import application1 from "../assets/images/application1.pdf";
import Withdraw from "../assets/images/Withdraw.pdf";
import ChangeForm from "../assets/images/ChangeForm.pdf";


const formsData = [
  { category: "Project", code: "P1", subject: "Web Application Format for Project Individual Registration", file: application },
  { category: "Project", code: "P2", subject: "Web Application for Project Other-than Individual Registration", file: application1 },
  { category: "Project", code: "P3", subject: "Withdrawal Form - Web Application format for Withdrawal", file: Withdraw },
  { category: "Project", code: "P4", subject: "CR Form - Web Application format for Change Requests", file: ChangeForm },
  { category: "Project", code: "P5", subject: "Area Details of Apartments", file: "/excel/FlatDetails.xlsx" },
  { category: "Project", code: "P6", subject: "Area Details of Villas", file: "/excel/VillaDetailsTemplate.xlsx" },
  { category: "Project", code: "P7", subject: "Area Details of Plots", file: "/excel/PlotDetails.xlsx" },
  { category: "Project", code: "P8", subject: "Area Details of Commercial", file: "/excel/Commercial.xlsx" },
  { category: "Project", code: "P9", subject: "Statement of Source of Funds", file: "/excel/Source.docx" },
  { category: "Project", code: "P10", subject: "No Litigations Affidavit", file: "/excel/Casepending.pdf" },
  { category: "Project", code: "P11", subject: "FORM-B", file: "/excel/FormB.docx" },
  { category: "Project", code: "P12", subject: "Sample Affidavit (Promoter)", file: "/excel/Promoter.pdf" },
  { category: "Project", code: "P13", subject: "Documents Checklist", file: "/excel/Checklist.pdf" },
  { category: "Project", code: "P14", subject: "Allotment Letter", file: "/excel/Allotment.docx" },
  { category: "Project", code: "P15", subject: "Conveyance Deed to be submitted", file: "/excel/Conve.docx" },
  { category: "Project", code: "P16", subject: "Estimation of Construction - To be submitted for Building", file: "/excel/Estimate.docx" },
  { category: "Project", code: "P17", subject: "Estimation of Construction - To be submitted for Layout", file: "/excel/Layout.docx" },
  { category: "Project", code: "P18", subject: "Specifications of Constructions to be submitted", file: "/excel/Specification.docx" },
  { category: "Project", code: "P19", subject: "Structural stability certificate to be submitted", file: "/excel/Structural.docx" },
  { category: "Project", code: "P20", subject: "Statement of Ownership to be submitted", file: "/excel/Ownership.docx" },
  { category: "Project", code: "P21", subject: "Agreement for sale to be submitted", file: "/excel/Agreement.docx" },
  

  { category: "Agent", code: "A1", subject: "Web Application for Agent Individual", file: "/excel/ApplicationA.pdf" },
  { category: "Agent", code: "A2", subject: "Web Application for Agent Other-than Individual", file: "/excel/ApplicationB.pdf" },
  { category: "Agent", code: "A3", subject: "Sample Affidavit (Agent)", file: "/excel/AgentSample.pdf" },
  { category: "Agent", code: "A4", subject: "No Litigations Affidavit", file: "/excel/Litigation.pdf" },
  { category: "Agent", code: "A5", subject: "Documents Checklist", file: "/excel/ChecklistA.pdf" },

  { category: "Complaint", code: "C1", subject: "Web Application for Complaint Registration", file: "/excel/ApplicationC.pdf" },

  { category: "Architect Certificate", code: "F1B", subject: "Buildings – Ongoing Project", file: "/excel/Form1.docx" },
  { category: "Architect Certificate", code: "F1L", subject: "Layouts – Ongoing Project", file: "/excel/FormL.docx" },

  { category: "Engineer Certificate", code: "F2B", subject: "Buildings – Withdrawal", file: "/excel/Form2.docx" },
  { category: "Engineer Certificate", code: "F2L", subject: "Layouts – Withdrawal", file: "/excel/Form2L.docx" },

  { category: "CA Certificate", code: "F3B", subject: "For Buildings - To be submitted at the time of Registration of Ongoing Project and for withdrawal of Money from Designated Account", file: "/excel/Form3B.docx" },
  { category: "CA Certificate", code: "F3L", subject: "For Layouts - To be submitted at the time of Registration of Ongoing Project and for withdrawal of Money from Designated Account", file: "/excel/Form3L.docx" },






  { category: "Form 5", code: "F5", subject: "Annual Report on statement of accounts by CA/Auditor", file: "/excel/Form5.pdf" },
  { category: "Form 6", code: "F6", subject: "Affidavit on Structural Defects", file: "/excel/Form6.pdf" },
  { category: "Form 7", code: "F7", subject: "Affidavit – Unsold Flats", file: "/excel/Affidavit.docx" },
  { category: "Form E", code: "FE", subject: "Application For Extension Of Registration Of Project", file: "/excel/FE.pdf" },

  { category: "Form 8 - Bank A/c's Forms", code: "8A", subject: "Application for Change in RERA Bank Account", file: "/excel/Form8A.pdf" },
  { category: "Form 8 - Bank A/c's Forms", code: "8B", subject: "Certificate of Account Balance from Bank with existing RERA Bank Account", file: "/excel/Form8B.pdf" },
  { category: "Form 8 - Bank A/c's Forms", code: "8C", subject: "	Confirmation Letter of change in RERA Account", file: "/excel/Form8C.pdf" },
  { category: "Form 8 - Bank A/c's Forms", code: "8D", subject: "	Certificate of Fund Transfer by Bank having new RERA Bank Account", file: "/excel/Form8D.pdf" },
];

const categoryCounts = formsData.reduce((acc, cur) => {
  acc[cur.category] = (acc[cur.category] || 0) + 1;
  return acc;
}, {});

const FormsDownload = () => {
  return (
    <div className="forms-wrapper">
      <div className="breadcrumb">
        You are here : <span>Home</span> / <span>Registration</span> / <b>Forms Download</b>
      </div>

      <h2>Forms Download</h2>

      <table className="forms-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Form Code</th>
            <th>Subject</th>
            <th>Download</th>
            <th>Sample</th>
          </tr>
        </thead>

        <tbody>
          {formsData.map((item, index) => {
            const isFirst =
              index === 0 || formsData[index - 1].category !== item.category;

            return (
              <tr key={index}>
                {isFirst && (
                  <td className="category" rowSpan={categoryCounts[item.category]}>
                    {item.category}
                  </td>
                )}

                <td className="code">{item.code}</td>
                <td>{item.subject}</td>

                {/* DIRECT OPEN */}
                <td className="icon">
                  {item.file && (
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: "20px" }}
                    >
                      <i className="fa fa-download" aria-hidden="true"></i>
                    </a>
                  )}
                </td>

                <td className="icon"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FormsDownload;