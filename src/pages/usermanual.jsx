import React from "react";
import "../styles/usermanual.css";
import User from "../../public/assets/pdfs/User.pdf";
import APRERA from "../../public/assets/pdfs/APRERA.pdf";
import Agent from "../../public/assets/pdfs/Agent.pdf";



const UserManual = () => {
  return (
    <div className="um-page">

      {/* Breadcrumb */}
      <div className="um-bread">
        You are here :
        <a href="#"> Home </a> /
        <a href="#"> Registration </a> /
        <span> User Manuals</span>
      </div>

      {/* Title */}
      <div className="um-title">
        <h2>User Manuals</h2>
        {/* <div className="um-line"></div> */}
      </div>

      {/* Table */}
      <div className="um-table-box">
        <table className="um-manual">
          <thead>
            <tr>
              <th className="um-blank"></th>
              <th>Subject</th>
              <th className="um-down-head">Download</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="um-cat" rowSpan="2">Project</td>
              <td>User Manual for Project Individual Registration</td>
              <td className="um-down">
                <a href={User} target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: "20px" }}
                >
                <i className="fa fa-download" aria-hidden="true"></i>
                </a>
              </td>
            </tr>

            <tr>
              <td>User Manual for Project Other-than Individual Registration</td>
              <td className="um-down">
                <a href={APRERA} target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: "20px" }}
                >
                <i className="fa fa-download" aria-hidden="true"></i>
                </a>
              </td>
            </tr>

            <tr>
              <td className="um-cat" rowSpan="2">Agent</td>
              <td>User Manual for Agent Individual Registration</td>
              <td className="um-down">
                <a href={Agent} target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: "20px" }}
                >
                <i className="fa fa-download" aria-hidden="true"></i>
                </a>
              </td>
            </tr>

            <tr>
              <td>User Manual for Agent Other-than Individual Registration</td>
              <td className="um-down">
                <a href={APRERA} target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: "20px" }}
                >
                <i className="fa fa-download" aria-hidden="true"></i>
                </a>
              </td>
            </tr>

            <tr>
              <td className="um-cat">Complaint Registration</td>
              <td>User Manual for Complaint Registration</td>
              <td className="um-down">
                <a href={APRERA} target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: "20px" }}
                >
                <i className="fa fa-download" aria-hidden="true"></i>
                </a>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManual;