import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import udaData from '../data/UdaData.json';

// Import libraries for professional data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const UdaReport = () => {
  // Map to the specific key in your JSON
  const allData = udaData["UDA(8) Wise Project Details"] || [];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic based on search input
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "UDA Projects");
    XLSX.writeFile(workbook, "UDA_Wise_Project_Report.xlsx");
  };

  // Professional PDF Export (Complete Data)
  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("UDA Wise Project Details", 14, 15);

    const tableRows = filteredData.map((row) => [
      row["S.No."],
      row["UDA Name"],
      row["Project Name"],
      row["Project Type"],
      row["Name Type"],
      row["Name"],
      row["Date of Submission"],
      row["Application Status"]
    ]);

    autoTable(doc, {
      head: [["S.No.", "UDA Name", "Project Name", "Type", "Name Type", "Name", "Submission Date", "Status"]],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [62, 83, 105] },
    });

    doc.save("UDA_Wise_Full_Project_Report.pdf");
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank" rel="noopener noreferrer">Home</Link> / <Link to="/mis-reports" className="text-white underline" target="_blank" rel="noopener noreferrer">MIS Reports</Link> / UDA Wise Project Details
      </div>

      <div className="report-card-container">
        <h2 className="report-title">UDA Wise Project Details</h2>

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
                <th>UDA Name</th>
                <th>Project Name</th>
                <th>Project Type</th>
                <th>Name Type</th>
                <th>Name</th>
                <th>Date of Submission</th>
                <th>Application Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((row, index) => (
                <tr key={index}>
                  <td>{row["S.No."]}</td>
                  <td>{row["UDA Name"]}</td>
                  <td className="text-left">{row["Project Name"]}</td>
                  <td>{row["Project Type"]}</td>
                  <td>{row["Name Type"]}</td>
                  <td className="text-left">{row["Name"]}</td>
                  <td>{row["Date of Submission"]}</td>
                  <td className="blue-text font-bold">{row["Application Status"]}</td>
                </tr>
              )) : (
                <tr><td colSpan="8" style={{padding: '20px', textAlign: 'center'}}>No records found</td></tr>
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

export default UdaReport;