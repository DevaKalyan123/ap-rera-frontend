import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import closureData from '../data/R25_2_Data.json'; // Ensure filename matches your JSON

const R25_3 = () => {
  // Map to the "ProjectClosureStatusReort " key (Note the trailing space in your JSON key)
  // const allData = []; // no dummy data
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

  // CSV Export Logic
  const downloadCSV = () => {
    const headers = [
        "Sl.No", 
        "Agent Registration ID", 
        "Agent Name",
        "Address",
        "RERA Validity Date",
        "Applied Date",
        "SLA CountDown For Working Days",
        "Status",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredData.map(r => [
        `"${r["Sl.No"]}"`, 
        `"${r["Agent Registration ID"]}"`,
        `"${r["Agent Name"]}"`,
        `"${r["Address"]}"`,
        `"${r["RERA Validity Date"]}"`,
        `"${r["Applied Date"]}"`,
        `"${r["SLA CountDown For Working Days"]}"`,
        `"${r["Status"]}"`
      ].join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Renewal Of Agent Registration_Report_R25_3.csv";
    link.click();
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline">Home</Link> / <Link to="/mis-reports" className="text-white underline">MIS Reports</Link> / R25.3 Renewal Of Agent Registration
      </div>

      <div className="report-card-container">
        <h2 className="report-title">Renewal Of Agent Registration</h2>

        <div className="table-controls no-print">
          <div className="show-entries">
            Show 
            <select value={itemsPerPage} onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}>
              <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
            </select> entries
          </div>
          <div className="export-search">
            <div className="icons">
              <i className="fas fa-file-excel excel" onClick={downloadCSV} title="Export to Excel"></i>
              <i className="fas fa-file-pdf pdf" onClick={() => window.print()} title="Print PDF"></i>
            </div>
            <div className="search-box">Search: <input type="text" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} /></div>
          </div>
        </div>

        <table className="rera-report-table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Application Number</th>
              <th>Project Name</th>
              <th>Address</th>
              <th>BA (OR) LP Number</th>
              <th>Applied Date</th>
              <th>SLA CountDown For Working Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? currentItems.map((row, index) => (
              <tr key={index}>
                <td>{row["Sl.No"]}</td>
                <td className="blue-text font-bold">{row["Application Number"]}</td>
                <td className="text-left">{row["Project Name"]}</td>
                <td className="text-left">{row["Address"]}</td>
                <td>{row["BA (OR) LP Number"]}</td>
                <td>{row["SLA CountDown For Working Days"]}</td>
                <td className="text-orange-600 font-bold">{row["Status"]}</td>
              </tr>
            )) : (
              <tr>
  <td colSpan="10" style={{ padding: '20px', textAlign: 'center' }}>
    No records found
  </td>
</tr>

            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
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

export default R25_3;