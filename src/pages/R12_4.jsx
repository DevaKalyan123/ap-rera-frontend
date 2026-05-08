import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';

// Import datasets for Ananthapuramu region
import agentData from '../data/R12_4_Agent.json';
import projectData from '../data/R12_4_Project.json';

// Import libraries for professional export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const R12_4 = () => {
  // Filter States
  const [district, setDistrict] = useState('All');
  const [appType, setAppType] = useState('Project');
  
  // Display States (updated only on GetDetails click)
  const [activeData, setActiveData] = useState([]);
  const [activeType, setActiveType] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleGetDetails = () => {
    // Select source based on JSON keys provided in sample
    let sourceData = appType === 'Project' 
      ? projectData["RegionWise Project DetailsAnant"] 
      : agentData["RegionWise Agent DetailsAnantap"];

    // Apply District Filter
    let filteredByDistrict = district === 'All' 
      ? sourceData 
      : sourceData.filter(item => item["District Name"] === district);

    setActiveData(filteredByDistrict || []);
    setActiveType(appType);
    setCurrentPage(1);
  };

  // Search/Filter Logic
  const searchedData = activeData.filter(item => 
    Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination Logic
  const totalPages = Math.ceil(searchedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedData.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  // Professional Excel Export
  const downloadExcel = () => {
    const dataToExport = searchedData.map(r => activeType === 'Project' ? {
      "Sl.No": r["Sl.No"],
      "District": r["District Name"],
      "App No": r["Application No"],
      "Project Name": r["Project Name"],
      "Submission Date": r["Submission Date"],
      "Promoter": r["Promoter Name"],
      "Status": r["ApplicationStatus"]
    } : {
      "Sl.No": r["Sl.No"],
      "District": r["District Name"],
      "App No": r["Application No"],
      "Agent Name": r["Agent Name"],
      "Submission Date": r["Submission Date"],
      "Status": r["ApplicationStatus"]
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RegionWise_Report");
    XLSX.writeFile(workbook, `RegionWise_Report_R12_4_${activeType}.xlsx`);
  };

  // Professional PDF Export
  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text(`Region Wise Report: ${activeType} - Ananthapuramu`, 14, 15);

    const headers = activeType === 'Project'
      ? [["Sl.No", "District", "App No", "Project Name", "Date", "Promoter", "Status"]]
      : [["Sl.No", "District", "App No", "Agent Name", "Date", "Status"]];

    const tableRows = searchedData.map(r => activeType === 'Project'
      ? [r["Sl.No"], r["District Name"], r["Application No"], r["Project Name"], r["Submission Date"], r["Promoter Name"], r["ApplicationStatus"]]
      : [r["Sl.No"], r["District Name"], r["Application No"], r["Agent Name"], r["Submission Date"], r["ApplicationStatus"]]
    );

    autoTable(doc, {
      head: headers,
      body: tableRows,
      startY: 22,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 123, 255] },
    });

    doc.save(`RegionWise_Report_R12_4_${activeType}.pdf`);
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank" rel="noopener noreferrer">Home</Link> / <Link to="/mis-reports" className="text-white underline" target="_blank" rel="noopener noreferrer">MIS Reports</Link> / Region Wise Reports R12.4 - Ananthapuramu
      </div>

      <div className="report-card-container">
        <h2 className="report-title-left">Region Wise Report: <strong>R12.4 - Ananthapuramu</strong></h2>
        <hr className="title-underline" />

        <div className="filter-container no-print">
          <div className="filter-group">
            <label>District Name:</label>
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="All">All</option>
              <option value="Chittoor">Chittoor</option>
              <option value="Y.S.R Kadapa">Y.S.R Kadapa</option>
              <option value="Ananthapuramu">Ananthapuramu</option>
              <option value="Kurnool">Kurnool</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Application Type:</label>
            <select value={appType} onChange={(e) => setAppType(e.target.value)}>
              <option value="Project">Project</option>
              <option value="Agent">Agent</option>
            </select>
          </div>

          <button className="get-details-btn" onClick={handleGetDetails}>GetDetails</button>
        </div>

        {activeType && (
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
                  {activeType === 'Project' ? (
                    <tr>
                      <th>Sl.No</th>
                      <th>District Name</th>
                      <th>Application No</th>
                      <th>Project Name</th>
                      <th>Submission Date</th>
                      <th>Promoter Name</th>
                      <th>Application Status</th>
                    </tr>
                  ) : (
                    <tr>
                      <th>Sl.No</th>
                      <th>District Name</th>
                      <th>Application No</th>
                      <th>Agent Name</th>
                      <th>Submission Date</th>
                      <th>Application Status</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {currentItems.length > 0 ? currentItems.map((row, index) => (
                    <tr key={index}>
                      <td>{row["Sl.No"]}</td>
                      <td>{row["District Name"]}</td>
                      <td className="blue-text font-bold">{row["Application No"]}</td>
                      <td className="text-left">{activeType === 'Project' ? row["Project Name"] : row["Agent Name"]}</td>
                      <td>{row["Submission Date"]}</td>
                      {activeType === 'Project' && <td className="text-left">{row["Promoter Name"]}</td>}
                      <td className="status-cell">{row["ApplicationStatus"]}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={activeType === 'Project' ? 7 : 6} style={{padding: '20px', textAlign: 'center'}}>No records found</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination-footer no-print">
              <div className="pagination-info">Showing {searchedData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, searchedData.length)} of {searchedData.length} entries</div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default R12_4;