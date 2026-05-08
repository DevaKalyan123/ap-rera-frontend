import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import agentData from '../data/AgentStatusData.json';

// Import libraries for professional data export
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const AgentStatusReport = () => {
  const allData = agentData["AgentStatusReort "] || [];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const parseStrictDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return null;
    try {
      const parts = dateStr.trim().split(' ');
      const dateParts = parts[0].split('/');
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const year = parseInt(dateParts[2], 10);

      let hours = 0, minutes = 0;
      if (parts[1]) {
        const timeParts = parts[1].split(':');
        hours = parseInt(timeParts[0], 10);
        minutes = parseInt(timeParts[1], 10);
        
        if (parts[2]) {
          const ampm = parts[2].toUpperCase();
          if (ampm === 'PM' && hours < 12) hours += 12;
          if (ampm === 'AM' && hours === 12) hours = 0;
        }
      }
      return new Date(year, month, day, hours, minutes);
    } catch (e) { return null; }
  };

  const calculateSLA = (receivedDateStr) => {
    const startDate = parseStrictDate(receivedDateStr);
    if (!startDate || isNaN(startDate.getTime())) return { d: "00", h: "00", m: "00", s: "00" };

    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + 30); 
    
    const diff = targetDate - now;
    if (diff <= 0) return { d: "00", h: "00", m: "00", s: "00" };

    return {
      d: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      h: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      m: String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0'),
      s: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
    };
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

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agent Status");
    XLSX.writeFile(workbook, "Agent_Status_Report.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Agent Status Report", 14, 15);

    const tableRows = filteredData.map((row) => [
      row["Sl.No"],
      row["Application No"],
      row["Agent Name"],
      row["Agent Type"],
      row["Date of Submission"],
      row["Status"]
    ]);

    autoTable(doc, {
      head: [["S.No.", "App No", "Agent Name", "Agent Type", "Submission Date", "Status"]],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [62, 83, 105] },
    });

    doc.save("Agent_Status_Full_Report.pdf");
  };

  return (
    <div className="report-page-wrapper">
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline" target="_blank" rel="noopener noreferrer">Home</Link> / MIS Reports / R1.2 Agent Status
      </div>

      <div className="report-card-container">
        <h2 className="report-title">R1.2 Status of Application for Agents</h2>

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
            <div className="search-box">Search: <input type="text" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} /></div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="rera-report-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Application No</th>
                <th>Agent Name</th>
                <th>Agent Type</th>
                <th>Date of Submission</th>
                <th>Status</th>
                <th className="sla-header">SLA Count Down</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => {
                const timer = calculateSLA(row["Received Date"]);
                return (
                  <tr key={index}>
                    <td>{row["Sl.No"]}</td>
                    <td className="blue-text font-bold">{row["Application No"]}</td>
                    <td className="text-left">{row["Agent Name"]}</td>
                    <td>{row["Agent Type"]}</td>
                    <td>{row["Date of Submission"]}</td>
                    <td className="text-left">{row["Status"]}</td>
                    <td>
                      <div className="countdown-container">
                        <div className="time-block"><span>{timer.d}</span><small>Days</small></div><span className="separator">:</span>
                        <div className="time-block"><span>{timer.h}</span><small>Hours</small></div><span className="separator">:</span>
                        <div className="time-block"><span>{timer.m}</span><small>Mins</small></div><span className="separator">:</span>
                        <div className="time-block"><span>{timer.s}</span><small>Secs</small></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pagination-footer no-print">
          <div className="pagination-info">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries</div>
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

export default AgentStatusReport;