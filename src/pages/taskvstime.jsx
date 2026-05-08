import React, { useState } from "react";
import "../styles/taskvstime.css";

const data = [
  { id: 1, task: "Establishment of Regulatory Authority & Appellate Tribunal (from 1st May 2018)", duration: "1 year" },
  { id: 2, task: "Web based online system shall be operationalised (from the date of establishment of regulatory authority).", duration: "1 year" },
  { id: 3, task: "Application shall be submitted by the promoters for ongoing projects, from the date of commencement i.e. 1st May 2017", duration: "3 months (31st July, 2017)" },
  { id: 4, task: "To issue registration certificate of a project from the date of submission", duration: "30 days" },
  { id: 5, task: "Redressal of complaint from the date of filing", duration: "30 days" },
  { id: 6, task: "Withdrawal of registration of project by Promoter", duration: "30 days" },
  { id: 7, task: "Redressal of grievance filed before the appellate tribunal", duration: "60 days" },
  { id: 8, task: "Handing over of possession to the allottee by the promoter", duration: "2 months" },
  { id: 9, task: "Timeline to revoke the registration from the date of issue of notice", duration: "Not less than 30 days" },
  { id: 10, task: "Handover of all plans, documents etc to Association", duration: "30 days" },
  { id: 11, task: "Response duration for allottee/promoter/agent after receiving notice", duration: "Not more than 30 days" },
  { id: 12, task: "After registration of project, login is created (for deemed project)", duration: "Same day" },
  { id: 13, task: "Intimation of change of professionals (Architect/Engineer/CA/Contractors)", duration: "7 days" },
  { id: 14, task: "Quarterly update of progress of the work", duration: "Within seven days from the expiry of each quarter" },
  { id: 15, task: "Refund of amount by the promoter to the allottee from the day of decision by judicial officer", duration: "Within 45 days" },
  
  // ✅ Newly added rows
  { id: 16, task: "Any vacancy caused to the office of the Chairperson or any other Member shall be filled-up (from the date on which such vacancy occurs)", duration: "Within 3 months" },
  { id: 17, task: "Intimation by promoter to the authority, when allottee withdraws from the project", duration: "30 days" },
  { id: 18, task: "Rectification of the structural defects by the promoter after intimation by the allottee/Association of allottees", duration: "30 days" },
  { id: 19, task: "Submission of annual report by the Authority to the Government", duration: "Within 90 days" }
];

export default function TaskVsTime() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = data.filter(item =>
    item.task.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="task-container">
      <div className="breadcrumb">
        You are here: <span>Home</span> / <span>Knowledge Hub</span> / <b>Task Vs Time</b>
      </div>

      <h2 className="page-title">
        Time Schedule For Various Issues Under The Provisions Of The Real Estate (R & D) Act, 2016
        And AP Real Estate (R & D) Rules, 2017
      </h2>

      <div className="table-controls">
        <div>
          Show{" "}
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>all</option>
          </select>{" "}
          entries
        </div>

        <div>
          Search:{" "}
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Task</th>
            <th>Max Duration</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id}>
              <td>{startIndex + index + 1}</td>
              <td>{item.task}</td>
              <td>{item.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries

        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}