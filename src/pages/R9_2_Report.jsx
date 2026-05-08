import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import reportData from '../data/R9_2_Data.json';

// Import libraries for professional data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const R9_2_Report = () => {
  const allData = reportData["Sheet1"] || [];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = allData.filter(item => 
    Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  // Professional Excel Export
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData.map(r => ({
        "S.No.": r["S.No."],
        "Application No": r["Application No"],
        "Project Name": r["Project Name"],
        "Project Type": r["ProjectType"],
        "Name Type": r["Name Type"],
        "Name": r["Name"],
        "Total Area(sq.m)": r["Total Area(sq.m)"],
        "Created Date": r["Project Created Date"],
        "Payment Date": r["Payment Date"],
        "Status": r["Application Status"]
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report R9.2");
    XLSX.writeFile(workbook, "R9_2_Report.xlsx");
  };

  // Professional PDF Export
  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("R9.2 Report", 14, 15);

    const tableRows = filteredData.map((r) => [
      r["S.No."],
      r["Application No"],
      r["Project Name"],
      r["ProjectType"],
      r["Name Type"],
      r["Name"],
      r["Total Area(sq.m)"],
      r["Project Created Date"],
      r["Payment Date"],
      r["Application Status"]
    ]);

    autoTable(doc, {
      head: [["S.No.", "App No", "Project Name", "Type", "Name Type", "Name", "Area", "Created", "Payment", "Status"]],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [0, 123, 255] },
    });

    doc.save("R9_2_Report.pdf");
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank" rel="noopener noreferrer">Home</Link> / <Link to="/mis-reports" className="text-white underline" target="_blank" rel="noopener noreferrer">MIS Reports</Link> / R9.2 Report
      </div>

      <div className="report-card-container">
        <h2 className="report-title">R9.2 Report</h2>

        <div className="table-controls no-print">
          <div className="show-entries">
            Show <select value={itemsPerPage} onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}>
              <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
            </select> entries
          </div>
          <div className="export-search">
            <div className="icons" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/732/732220.png" 
                className="apr-icon-btn" 
                alt="Excel" 
                title="Export to Excel"
                onClick={downloadExcel} 
              />
              <img 
                src="https://cdn-icons-png.flaticon.com/512/337/337946.png" 
                className="apr-icon-btn" 
                alt="PDF" 
                title="Download Full PDF"
                onClick={downloadPDF} 
              />
            </div>
            <div className="search-box">Search: <input type="text" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} /></div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="rera-report-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Application No</th>
                <th>Project Name</th>
                <th>Project Type</th>
                <th>Name Type</th>
                <th>Name</th>
                <th>Total Area(sq.m)</th>
                <th>Created Date</th>
                <th>Payment Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((row, index) => (
                <tr key={index}>
                  <td>{row["S.No."]}</td>
                  <td className="blue-text">{row["Application No"]}</td>
                  <td className="text-left">{row["Project Name"]}</td>
                  <td>{row["ProjectType"]}</td>
                  <td>{row["Name Type"]}</td>
                  <td className="text-left">{row["Name"]}</td>
                  <td>{row["Total Area(sq.m)"]}</td>
                  <td>{row["Project Created Date"]}</td>
                  <td>{row["Payment Date"]}</td>
                  <td className={row["Application Status"] === "Project Approved" ? "blue-text" : ""}>
                      {row["Application Status"]}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="10" style={{padding: '20px'}}>No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-footer no-print">
          <div className="pagination-info">Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries</div>
          <div className="pagination-buttons">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className="page-nav">First</button>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="page-nav">Prev</button>
            {getPageNumbers().map(num => (
              <button key={num} onClick={() => setCurrentPage(num)} className={`page-num ${currentPage === num ? 'active' : ''}`}>{num}</button>
            ))}
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)} className="page-nav">Next</button>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(totalPages)} className="page-nav">Last</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default R9_2_Report;