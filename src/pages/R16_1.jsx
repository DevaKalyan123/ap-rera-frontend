import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';

// Import libraries for professional data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Import both JSON files
import agentData from '../data/R16_1_Agent.json';
import projectData from '../data/R16_1_Project.json';

const R16_1 = () => {
  const [selectedType, setSelectedType] = useState('');
  const [reportType, setReportType] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle "Get Details" click
  const handleGetDetails = () => {
    if (selectedType) {
      setReportType(selectedType);
      setCurrentPage(1);
    } else {
      alert("Please select an Application Type first.");
    }
  };

  // Get data based on selection
  const rawData = reportType === 'agent' 
    ? agentData["Application Initiated Report agent"] 
    : reportType === 'project' 
    ? projectData["Application Initiated Report project"] 
    : [];

  // Filter Logic
  const filteredData = rawData.filter(item => 
    Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Advanced Pagination Logic
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
    const dataToExport = filteredData.map(r => reportType === 'agent' ? {
        "S.No.": r["S.No."],
        "Application No": r["Application No"],
        "Agent Type": r["Agent Type"],
        "Place": r["Place"],
        "Status": r["Status"]
    } : {
        "S.No.": r["S.No."],
        "Application No": r["Application No"],
        "Promoter Name": r["Promoter Name"],
        "Project Name": r["Project Name"],
        "Build Plan Number": r["Build Plan Number"],
        "Place": r["Place"],
        "Status": r["Status"]
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Initiated Report");
    XLSX.writeFile(workbook, `R16_1_${reportType}_Report.xlsx`);
  };

  // Professional PDF Export
  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text(`R16.1 Application Initiated Report - ${reportType.toUpperCase()}`, 14, 15);

    const headers = reportType === 'agent' 
      ? [["S.No.", "Application No", "Agent Type", "Place", "Status"]]
      : [["S.No.", "Application No", "Promoter Name", "Project Name", "Build Plan", "Place", "Status"]];
    
    const tableRows = filteredData.map(r => reportType === 'agent' 
      ? [r["S.No."], r["Application No"], r["Agent Type"], r["Place"], r["Status"]]
      : [r["S.No."], r["Application No"], r["Promoter Name"], r["Project Name"], r["Build Plan Number"], r["Place"], r["Status"]]
    );

    autoTable(doc, {
      head: headers,
      body: tableRows,
      startY: 22,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 123, 255] },
    });

    doc.save(`R16_1_${reportType}_Report.pdf`);
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank" rel="noopener noreferrer">Home</Link> / <Link to="/mis-reports" className="text-white underline" target="_blank" rel="noopener noreferrer">MIS Reports</Link> / R16.1 Application Initiated Report
      </div>

      <div className="report-card-container">
        <h2 className="report-title-left">R16.1 Application Initiated Report</h2>
        
        {/* Filter Section */}
        <div className="filter-section no-print" style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', marginBottom: '30px' }}>
          <div className="input-group">
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
              Application Type<span style={{ color: 'red' }}>*</span>
            </label>
            <select 
              className="filter-select" 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '250px' }}
            >
              <option value="">Select</option>
              <option value="agent">Agent Registration</option>
              <option value="project">Project Registration</option>
            </select>
          </div>
          <button className="get-details-btn" onClick={handleGetDetails}>
            Get Details
          </button>
        </div>

        {reportType && (
          <>
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
                <div className="search-box">Search: <input type="text" onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} /></div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="rera-report-table">
                <thead>
                  {reportType === 'agent' ? (
                    <tr>
                      <th>S.No.</th>
                      <th>Application No</th>
                      <th>Agent Type</th>
                      <th>Place</th>
                      <th>Status</th>
                    </tr>
                  ) : (
                    <tr>
                      <th>S.No.</th>
                      <th>Application No</th>
                      <th>Promoter Name</th>
                      <th>Project Name</th>
                      <th>Build Plan Number</th>
                      <th>Place</th>
                      <th>Status</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {currentItems.length > 0 ? currentItems.map((row, index) => (
                    <tr key={index}>
                      <td>{row["S.No."]}</td>
                      <td className="blue-text font-bold">{row["Application No"]}</td>
                      {reportType === 'agent' ? (
                        <>
                          <td>{row["Agent Type"]}</td>
                          <td className="text-left text-sm">{row["Place"]}</td>
                        </>
                      ) : (
                        <>
                          <td className="text-left">{row["Promoter Name"]}</td>
                          <td className="text-left">{row["Project Name"]}</td>
                          <td>{row["Build Plan Number"]}</td>
                          <td className="text-left text-sm">{row["Place"]}</td>
                        </>
                      )}
                      <td className="font-bold" style={{ color: '#007bff' }}>{row["Status"]}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={reportType === 'agent' ? 5 : 7} style={{padding: '20px', textAlign: 'center'}}>No records found</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination-footer no-print">
              <div className="pagination-info">
                Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
              </div>
              <div className="pagination-buttons">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(1)} 
                  className="page-nav"
                >First</button>
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(currentPage - 1)} 
                  className="page-nav"
                >Prev</button>
                
                {getPageNumbers().map(num => (
                  <button 
                    key={num} 
                    onClick={() => setCurrentPage(num)} 
                    className={`page-num ${currentPage === num ? 'active' : ''}`}
                  >
                    {num}
                  </button>
                ))}

                <button 
                  disabled={currentPage === totalPages || totalPages === 0} 
                  onClick={() => setCurrentPage(currentPage + 1)} 
                  className="page-nav"
                >Next</button>
                <button 
                  disabled={currentPage === totalPages || totalPages === 0} 
                  onClick={() => setCurrentPage(totalPages)} 
                  className="page-nav"
                >Last</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default R16_1;