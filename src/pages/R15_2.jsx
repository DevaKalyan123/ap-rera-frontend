import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import agentFeedbackData from '../data/R15_2_Data.json';

// Import libraries for professional data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const R15_2 = () => {
  const allData = agentFeedbackData["Status of Application for Agent"] || [];
  
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
        "Name": r["Name"],
        "Mobile No": r["Mobile No"],
        "Feedback Type": r["Feedback Type"],
        "Email ID": r["Email ID"],
        "Message": r["Message"],
        "Feedback Date": r["Feedback Date"]
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agent Status Feedback");
    XLSX.writeFile(workbook, "Status_of_Application_for_Agent_R15_2.xlsx");
  };

  // Professional PDF Export
  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Status of Application for Agent", 14, 15);

    const tableRows = filteredData.map((r) => [
      r["S.No."],
      r["Name"],
      r["Mobile No"],
      r["Feedback Type"],
      r["Email ID"],
      r["Message"],
      r["Feedback Date"]
    ]);

    autoTable(doc, {
      head: [["S.No.", "Name", "Mobile No", "Feedback Type", "Email ID", "Message", "Feedback Date"]],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 123, 255] },
      columnStyles: {
        5: { cellWidth: 80 } // Setting fixed width for the Message column in PDF
      }
    });

    doc.save("Status_of_Application_for_Agent_R15_2.pdf");
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank" rel="noopener noreferrer">Home</Link> / <Link to="/mis-reports" className="text-white underline" target="_blank" rel="noopener noreferrer">MIS Reports</Link> / R15.2 Status of Application for Agent
      </div>

      <div className="report-card-container">
        <h2 className="report-title">Status of Application for Agent</h2>

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
                <th>Name</th>
                <th>Mobile No</th>
                <th>Feedback Type</th>
                <th>Email ID</th>
                <th>Message</th>
                <th>Feedback Date</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length > 0 ? currentItems.map((row, index) => (
                <tr key={index}>
                    <td>{row["S.No."]}</td>
                    <td className="text-left font-bold">{row["Name"]}</td>
                    <td>{row["Mobile No"]}</td>
                    <td>{row["Feedback Type"]}</td>
                    <td>{row["Email ID"]}</td>
                    <td className="text-left" style={{maxWidth: '300px'}}>{row["Message"]}</td>
                    <td className="blue-text">{row["Feedback Date"]}</td>
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
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="page-nav">Next</button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)} className="page-nav">Last</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default R15_2;