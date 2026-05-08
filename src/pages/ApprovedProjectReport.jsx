import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import approvedData from '../data/ApprovedProjectData.json';

// Import libraries for professional data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const ApprovedProjectReport = () => {
  const allData = approvedData["Approved Project Report"] || [];
  
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

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Approved Projects");
    XLSX.writeFile(workbook, "Approved_Project_Report.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Approved Project Report", 14, 15);

    const tableRows = filteredData.map((row) => [
      row["S.No."],
      row["APRERA Registration ID"],
      row["Project Name"],
      row["Place"],
      row["Project Type"],
      row["Status"],
      row["Date of Approval"],
      row["Expected Date of Completion"],
    ]);

    autoTable(doc, {
      head: [["S.No.", "Registration ID", "Project Name", "Place", "Type", "Status", "Approval Date", "Completion Date"]],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 123, 255] },
    });

    doc.save("Approved_Project_Full_Report.pdf");
  };

  return (
    <div className="report-page-wrapper">
      {/* 🔹 target="_blank" added to open links in new tab */}
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank">Home</Link> / <Link to="/mis-reports" className="text-white underline" target="_blank">MIS Reports</Link> / Approved Project Report
      </div>

      <div className="report-card-container">
        <h2 className="report-title">Approved Project Report</h2>

        <div className="table-controls no-print">
          <div className="show-entries">
            Show 
            <select value={itemsPerPage} onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}>
              <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
            </select> entries
          </div>
          <div className="export-search">
            <div className="icons">
              {/* 🔹 High-quality icons added here */}
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
                style={{marginLeft: '10px'}}
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
                <th>Registration ID</th>
                <th>Project Name</th>
                <th>Place</th>
                <th>Project Type</th>
                <th>Status</th>
                <th>Approval Date</th>
                <th>Completion Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((row, index) => (
                <tr key={index}>
                  <td>{row["S.No."]}</td>
                  <td className="blue-text font-bold">{row["APRERA Registration ID"]}</td>
                  <td className="text-left min-w-200">{row["Project Name"]}</td>
                  <td className="text-left min-w-300">{row["Place"]}</td>
                  <td>{row["Project Type"]}</td>
                  <td>{row["Status"]}</td>
                  <td>{row["Date of Approval"]}</td>
                  <td>{row["Expected Date of Completion"]}</td>
                </tr>
              )) : (
                <tr><td colSpan="8" style={{padding: '20px'}}>No records found</td></tr>
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

export default ApprovedProjectReport;