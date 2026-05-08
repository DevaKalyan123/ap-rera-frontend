import { useState } from "react";
import "../styles/project.css";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// 🔹 Generate mock AP RERA–like data
const generateProjects = () => {
  const names = [
    "OCEANIC HEIGHTS",
    "HEMA DURGA JEWEL COUNTY BLOCK C AND D",
    "LAKSHMI RESIDENCY",
    "C N R RESIDENCY",
    "ADVAITA KUTIRAM",
    "SRI LALITHA RESIDENCY",
    "DYNAMIK JUPITER",
    "PANCHAJANYA",
    "KRISHNA LEELA RESIDENCY",
  ];

  const places = [
    "Visakhapatnam (V), Visakhapatnam (M), Visakhapatnam (D)",
    "Kesarapalle (V), Gannavaram (M), Krishna (D)",
    "Kanuru (U) (V), Penamaluru (M), Krishna (D)",
    "Ongole (V), Ongole (M), Prakasam (D)",
    "Guntur (U) (V), Guntur (M), Guntur (D)",
    "Rajahmundry (V), Rajamahendravaram (M), East Godavari (D)",
  ];

  const statuses = ["New Project", "Under Development"];

  return Array.from({ length: 314 }, (_, i) => ({
    sno: i + 1,
    regId: `P0${Math.floor(300000000 + i)}`,
    projectName: names[i % names.length],
    place: places[i % places.length],
    type: "Residential",
    status: statuses[i % statuses.length],
    approvalDate: "01/12/2018",
    completionDate: `30/0${(i % 9) + 1}/202${i % 5}`,
  }));
};

const Project = () => {
  const data = generateProjects();

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Search
  const filtered = data.filter(
    (p) =>
      p.projectName.toLowerCase().includes(search.toLowerCase()) ||
      p.regId.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination logic
  const totalPages = Math.ceil(filtered.length / entries);
  const start = (currentPage - 1) * entries;
  const end = Math.min(start + entries, filtered.length);
  const paginatedData = filtered.slice(start, end);

  // 📊 EXCEL DOWNLOAD
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      "APRERA_Approved_Projects.xlsx"
    );
  };

  // 📄 PDF DOWNLOAD
  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");

    doc.setFontSize(14);
    doc.text("R4.1 - Approved Projects Report", 14, 15);

    const tableData = filtered.map((p) => [
      p.sno,
      p.regId,
      p.projectName,
      p.place,
      p.type,
      p.status,
      p.approvalDate,
      p.completionDate,
    ]);

    autoTable(doc, {
      head: [[
        "S.No",
        "APRERA Registration ID",
        "Project Name",
        "Place",
        "Project Type",
        "Status",
        "Date of Approval",
        "Expected Date of Completion",
      ]],
      body: tableData,
      startY: 22,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [63, 83, 104] },
    });

    doc.save("APRERA_Approved_Projects.pdf");
  };

  return (
    <div className="apr-project-container">

      {/* Breadcrumb */}
      <div className="apr-breadcrumb">
        You are here : <span>Home</span> / <span>MIS Reports</span> /{" "}
        <b>R4.1-Approved Project Report</b>
      </div>

      <h2 className="apr-page-title">R4.1-Approved Projects Report</h2>

      {/* Controls */}
      <div className="apr-table-controls">
        <div>
          Show{" "}
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{" "}
          entries
        </div>

        <div className="apr-right-controls">
          <img
            src="https://cdn-icons-png.flaticon.com/512/732/732220.png"
            className="apr-icon-btn"
            title="Download Excel"
            onClick={downloadExcel}
          />

          <img
            src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
            className="apr-icon-btn"
            title="Download PDF"
            onClick={downloadPDF}
          />

          <span>Search:</span>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="apr-table-wrapper">
        <table className="apr-project-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>APRERA Registration ID</th>
              <th>Project Name</th>
              <th>Place</th>
              <th>Project Type</th>
              <th>Status</th>
              <th>Date of Approval</th>
              <th>Expected Date of Completion</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((p) => (
              <tr key={p.sno}>
                <td>{p.sno}</td>
                <td>{p.regId}</td>
                <td className="apr-project-link">{p.projectName}</td>
                <td>{p.place}</td>
                <td>{p.type}</td>
                <td>{p.status}</td>
                <td>{p.approvalDate}</td>
                <td>{p.completionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ PAGINATION FOOTER */}
      <div className="apr-pagination-container">
        <div className="apr-pagination-info">
          Showing {start + 1} to {end} of {filtered.length} entries
        </div>

        <div className="apr-pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
            First
          </button>

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 3),
              Math.min(totalPages, currentPage + 2)
            )
            .map((page) => (
              <button
                key={page}
                className={currentPage === page ? "apr-active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;