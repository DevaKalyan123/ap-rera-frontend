import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import timeTakenData from '../data/R21_2_Data.json';

// Import libraries for professional data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const R21_2 = () => {
  // Map to the "Agent Application wise time tak" key from your JSON sample
  const allData = timeTakenData["Agent Application wise time tak"] || [];
  
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agent Time Taken");
    XLSX.writeFile(workbook, "Agent_Time_Taken_Report_R21_2.xlsx");
  };

  // Professional PDF Export (Complete Data)
  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(14);
    doc.text("Agent Application Wise Time Taken Report", 14, 15);

    const tableRows = filteredData.map((r) => [
      r["S.No"],
      r["Application No"],
      r["Agent Name"],
      r["Scrutiny - S1 Days/Hours"],
      r["Scrutiny - S2 Days/Hours"],
      r["Time taken to submit shortfall documents by Agent - D1 Days/Hours"],
      r["Approved date"],
      r["Total Time"]
    ]);

    autoTable(doc, {
      head: [["S.No", "App No", "Agent Name", "S1", "S2", "D1", "Approved Date", "Total Time"]],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [62, 83, 105] },
    });

    doc.save("Agent_Time_Taken_Full_Report_R21_2.pdf");
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank" rel="noopener noreferrer">Home</Link> / <Link to="/mis-reports" className="text-white underline" target="_blank" rel="noopener noreferrer">MIS Reports</Link> / R21.2 Agent Application Wise Time Taken
      </div>

      <div className="report-card-container">
        <h2 className="report-title">Agent Application Wise Time Taken Report</h2>

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

        <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <table className="rera-report-table min-w-full">
            <thead>
              <tr className="bg-blue-100">
                <th rowSpan="2">S.No</th>
                <th rowSpan="2">Application No</th>
                <th rowSpan="2">Agent Name</th>
                <th rowSpan="2" style={{minWidth: '150px'}}>Initial Submission</th>
                <th colSpan="5">Scrutiny Stages (S1 - S5)</th>
                <th colSpan="5">Shortfall Stages (D1 - D5)</th>
                <th rowSpan="2">Approved Date</th>
                <th rowSpan="2">Total Scrutiny</th>
                <th rowSpan="2">Total Agent</th>
                <th rowSpan="2">Total Time</th>
              </tr>
              <tr className="bg-blue-50 text-xs">
                <th>S1</th><th>S2</th><th>S3</th><th>S4</th><th>S5</th>
                <th>D1</th><th>D2</th><th>D3</th><th>D4</th><th>D5</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((row, index) => (
                <tr key={index}>
                  <td>{row["S.No"]}</td>
                  <td className="blue-text font-bold">{row["Application No"]}</td>
                  <td className="text-left" style={{minWidth: '200px'}}>{row["Agent Name"]}</td>
                  <td>{row["Time taken to submit application (Payment date to Initiated date )"]}</td>
                  <td>{row["Scrutiny - S1 Days/Hours"]}</td>
                  <td>{row["Scrutiny - S2 Days/Hours"]}</td>
                  <td>{row["Scrutiny - S3 Days/Hours"]}</td>
                  <td>{row["Scrutiny - S4 Days/Hours"]}</td>
                  <td>{row["Scrutiny - S5 Days/Hours"]}</td>
                  <td>{row["Time taken to submit shortfall documents by Agent - D1 Days/Hours"]}</td>
                  <td>{row["Time taken to submit shortfall documents by Agent - D2 Days/Hours"]}</td>
                  <td>{row["Time taken to submit shortfall documents by Agent - D3 Days/Hours"]}</td>
                  <td>{row["Time taken to submit shortfall documents by Agent - D4 Days/Hours"]}</td>
                  <td>{row["Time taken to submit shortfall documents by Agent - D5 Days/Hours"]}</td>
                  <td>{row["Approved date"]}</td>
                  <td className="font-bold">{row["Total no of Days/Hours to scrutiny"]}</td>
                  <td className="font-bold">{row["Total no of Days/Hours application with Agent"]}</td>
                  <td className="blue-text font-bold">{row["Total Time"]}</td>
                </tr>
              )) : (
                <tr><td colSpan="18" style={{padding: '20px', textAlign: 'center'}}>No records found</td></tr>
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

export default R21_2;