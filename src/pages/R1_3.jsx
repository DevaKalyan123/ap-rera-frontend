import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import complaintData from '../data/R1_3_Data.json';

// Import libraries for professional data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const R1_3 = () => {
  const allData = complaintData["ComplaintStatusReort "] || [];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Helper function to handle scientific notation if the JSON data is numeric
  const formatComplaintNo = (val) => {
    if (!val) return "-";
    const num = Number(val);
    if (!isNaN(num) && String(val).toLowerCase().includes('e')) {
      return num.toLocaleString('fullwide', {useGrouping:false});
    }
    return String(val);
  };

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
        "S.No.": r["Sl.No"],
        "Application No": formatComplaintNo(r["Complaint No"]),
        "Complaint By": r["Complaint By"],
        "Complainant Name": r["Complainant Name"],
        "Complaint Against": r["Complaint Against"],
        "Respondent Name": r["Respondent Name"] || "-",
        "Status": r["Application Status"]
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");
    XLSX.writeFile(workbook, "Status_Of_Complaints_R1_3.xlsx");
  };

  // Professional PDF Export
  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Status Of Complaints", 14, 15);

    const tableRows = filteredData.map((r) => [
      r["Sl.No"],
      formatComplaintNo(r["Complaint No"]),
      "-",
      "-",
      "-",
      r["Complaint By"],
      r["Complainant Name"],
      r["Complaint Against"],
      r["Respondent Name"] || "-",
      r["Application Status"]
    ]);

    autoTable(doc, {
      head: [["S.No.", "Application No", "SR No", "CCP No", "CP No", "By", "Complainant", "Against", "Respondent", "Status"]],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [0, 123, 255] },
    });

    doc.save("Status_Of_Complaints_R1_3.pdf");
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank" rel="noopener noreferrer">Home</Link> / Reports / Status Of Complaints
      </div>

      <div className="report-card-container">
        <h2 className="report-title-left">Status Of Complaints</h2>

        <div className="table-controls no-print">
          <div className="show-entries">
            Show entries 
            <select value={itemsPerPage} onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}>
              <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
            </select>
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
            <div className="search-box">
              Search: <input type="text" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="rera-report-table custom-ui-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Application No</th>
                <th>SR No</th>
                <th>CCP No (As per Form N)</th>
                <th>CP No (As per form M)</th>
                <th>Complaint By</th>
                <th>Complainant Name</th>
                <th>Complaint Against</th>
                <th>Respondent Name</th>
                <th>Status of the Complaint</th>
                <th>Next hearing Date</th>
                <th>IA</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((row, index) => (
                <tr key={index}>
                  <td>{row["Sl.No"]}</td>
                  <td>{formatComplaintNo(row["Complaint No"])}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{row["Complaint By"]}</td>
                  <td className="text-left">{row["Complainant Name"]}</td>
                  <td>{row["Complaint Against"]}</td>
                  <td className="text-left">{row["Respondent Name"] || "-"}</td>
                  <td>
                    <button className="view-btn">View</button>
                  </td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )) : (
                <tr><td colSpan="12" className="p-4 text-center">No records found</td></tr>
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

export default R1_3;
