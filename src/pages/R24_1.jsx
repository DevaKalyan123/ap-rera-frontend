import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import closureData from '../data/R24_1_Data.json';

// Import libraries for professional data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const R23_1 = () => {
  // Map to the "ProjectClosureStatusReort " key
  const allData = closureData["ProjectClosureStatusReort "] || [];
  
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

  // Professional Excel Export (Complete Data)
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData.map(r => ({
      "Sl.No": r["Sl.No"],
      "Project ID": r["Project ID"],
      "Organization Type": r["Organization Type"],
      "Project Name": r["Project Name"],
      "Promoter Name": r["Promoter Name"],
      "Date of Submission": r["Date of Submission"],
      "Status": r["Status"]
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Closure Status");
    XLSX.writeFile(workbook, "Project_Closure_Status_Report.xlsx");
  };

  // Professional PDF Export (Complete Data)
  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Project Closure Status Report", 14, 15);

    const tableRows = filteredData.map((row) => [
      row["Sl.No"],
      row["Project ID"],
      row["Organization Type"],
      row["Project Name"],
      row["Promoter Name"],
      row["Date of Submission"],
      row["Status"]
    ]);

    autoTable(doc, {
      head: [["Sl.No", "Project ID", "Org. Type", "Project Name", "Promoter Name", "Submission Date", "Status"]],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [62, 83, 105] },
    });

    doc.save("Project_Closure_Status_Full_Report.pdf");
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank" rel="noopener noreferrer">Home</Link> / <Link to="/mis-reports" className="text-white underline" target="_blank" rel="noopener noreferrer">MIS Reports</Link> / R23.1 Project Closure Status Report
      </div>

      <div className="report-card-container">
        <h2 className="report-title">Project Closure Status Report</h2>

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
                <th>Sl.No</th>
                <th>Project ID</th>
                <th>Org. Type</th>
                <th>Project Name</th>
                <th>Promoter Name</th>
                <th>Submission Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((row, index) => (
                <tr key={index}>
                  <td>{row["Sl.No"]}</td>
                  <td className="blue-text font-bold">{row["Project ID"]}</td>
                  <td>{row["Organization Type"]}</td>
                  <td className="text-left">{row["Project Name"]}</td>
                  <td className="text-left">{row["Promoter Name"]}</td>
                  <td>{row["Date of Submission"]}</td>
                  <td className="text-orange-600 font-bold">{row["Status"]}</td>
                </tr>
              )) : (
                <tr><td colSpan="7" style={{padding: '20px', textAlign: 'center'}}>No records found</td></tr>
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

export default R23_1;