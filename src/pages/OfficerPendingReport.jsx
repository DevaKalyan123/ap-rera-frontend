import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import pendingData from '../data/OfficerPendingData.json';

// Import libraries for professional data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const OfficerPendingReport = () => {
  // Map to the specific key in your JSON
  const allData = pendingData["Application Pending Against Off"] || [];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredData = allData.filter(item => 
    Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination Logic
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

  // Professional Excel Export (Full Data)
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Officer Pending Report");
    XLSX.writeFile(workbook, "Officer_Pending_Report.xlsx");
  };

  // Professional PDF Export (Complete Data)
  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Application Pending Against Officer", 14, 15);

    const tableRows = filteredData.map((row) => [
      row["S.No."],
      row["Officer Designation"],
      row["No.of Project Applications Pending"],
      row["No.of Agent Applications Pending"],
      row["No.of Complaints Pending"]
    ]);

    autoTable(doc, {
      head: [["S.No.", "Officer Designation", "Project Pending", "Agent Pending", "Complaints Pending"]],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [62, 83, 105] },
    });

    doc.save("Officer_Pending_Full_Report.pdf");
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank" rel="noopener noreferrer">Home</Link> / <Link to="/mis-reports" className="text-white underline" target="_blank" rel="noopener noreferrer">MIS Reports</Link> / Application Pending Against Officer
      </div>

      <div className="report-card-container">
        <h2 className="report-title">Application Pending Against Officer</h2>

        <div className="table-controls no-print">
          <div className="show-entries">
            Show 
            <select value={itemsPerPage} onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}>
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
                <th>Officer Designation</th>
                <th>No.of Project Applications Pending</th>
                <th>No.of Agent Applications Pending</th>
                <th>No.of Complaints Pending</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((row, index) => (
                <tr key={index}>
                  <td>{row["S.No."]}</td>
                  <td className="text-left font-bold">{row["Officer Designation"]}</td>
                  <td>{row["No.of Project Applications Pending"]}</td>
                  <td>{row["No.of Agent Applications Pending"]}</td>
                  <td>{row["No.of Complaints Pending"]}</td>
                </tr>
              )) : (
                <tr><td colSpan="5" style={{padding: '20px', textAlign: 'center'}}>No records found</td></tr>
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

export default OfficerPendingReport;