import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/agents.css';

// Custom file saver function
const saveFile = (data, filename, type) => {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/* ---------- GENERATE 300 AGENTS ---------- */
const generateAgents = () => {
  const districts = [
    "Krishna","Guntur","Prakasam","YSR Kadapa","Chittoor",
    "Visakhapatnam","Nellore","Kurnool","Anantapur","East Godavari"
  ];

  const mandals = [
    "Vijayawada Urban","Guntur","Ongole","Kadapa","Tirupati",
    "Visakhapatnam","Nellore","Kurnool","Anantapur","Rajamahendravaram"
  ];

  const villages = [
    "VIJAYAWADA(URBAN)","GUNTUR","ONGOLE","KADAPA","TIRUPATI",
    "VISAKHAPATNAM","NELLORE","KURNOOL","ANANTAPUR","RAJAHMUNDRY"
  ];

  const agents = [];

  for (let i = 1; i <= 300; i++) {
    const idx = i % districts.length;

    agents.push({
      id: i,
      registrationId: `A3100000${String(i).padStart(3, "0")}`,
      name: `ABC REAL ESTATE AGENCY ${i}`,
      place: `${villages[idx]} (V), ${mandals[idx]} (M), ${districts[idx]}(D)`,
      dateOfSubmission: "15/11/2018",
      dateOfApproval: "31/01/2019",
      validTill: "30/01/2026",
      status:
        i % 9 === 0 ? "Suspended" :
        i % 7 === 0 ? "Pending Renewal" :
        i % 5 === 0 ? "Expired" :
        "Active"
    });
  }

  return agents;
};

const AgentsReport = () => {

  /* ---------- DATA ---------- */
  const agents = useMemo(() => generateAgents(), []);

  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------- SEARCH ---------- */
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.registrationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ---------- PAGINATION ---------- */
  const totalAgents = filteredAgents.length;
  const totalPages = Math.ceil(totalAgents / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentAgents = filteredAgents.slice(startIndex, endIndex);

  /* ---------- EXCEL DOWNLOAD ---------- */
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAgents.map((agent, index) => ({
      'S.No.': index + 1,
      'Registration ID': agent.registrationId,
      'Name': agent.name,
      'Place': agent.place,
      'Date of Submission': agent.dateOfSubmission,
      'Date of Approval': agent.dateOfApproval,
      'Valid Till': agent.validTill,
      'Status': agent.status
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agents Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    
    saveFile(excelBuffer, 
      `R4.2_Approved_Agent_Report_${new Date().toISOString().split('T')[0]}.xlsx`,
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
  };

  /* ---------- PDF DOWNLOAD ---------- */
  const downloadPDF = () => {
    const doc = new jsPDF('landscape');
    
    // Header
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('ANDHRA PRADESH REAL ESTATE REGULATORY AUTHORITY', 15, 15);
    
    doc.setFontSize(14);
    doc.text('R4.2 - Approved Agent Report', 15, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 35);
    doc.text(`Total Agents: ${filteredAgents.length}`, 250, 35);
    
    // Table data
    const tableColumn = [
      "S.No.", 
      "Registration ID", 
      "Name", 
      "Place", 
      "Date of Submission", 
      "Date of Approval", 
      "Valid Till", 
      "Status"
    ];
    
    const tableRows = filteredAgents.map((agent, index) => [
      index + 1,
      agent.registrationId,
      agent.name,
      agent.place,
      agent.dateOfSubmission,
      agent.dateOfApproval,
      agent.validTill,
      agent.status
    ]);
    
    // Add table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [248, 249, 250] },
      margin: { top: 45 }
    });
    
    // Convert to blob and save
    const pdfOutput = doc.output('blob');
    saveFile(pdfOutput, 
      `R4.2_Approved_Agent_Report_${new Date().toISOString().split('T')[0]}.pdf`,
      'application/pdf'
    );
  };

  /* ---------- GET STATUS COLOR ---------- */
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Expired': return 'status-expired';
      case 'Pending Renewal': return 'status-pending';
      case 'Suspended': return 'status-suspended';
      default: return '';
    }
  };

  /* ---------- PAGINATION NUMBERS ---------- */
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="ar-container">

      {/* Breadcrumb */}
      <div className="ar-breadcrumb">
        You are here / Home / MIS Reports / <strong>R4.2-Approved Agent Report</strong>
      </div>

      {/* Header */}
      <div className="ar-report-header">
        <h1>R4.2-Approved Agent Report</h1>
        {/* <div className="ar-agents-count">
          Total Agents: <span className="ar-count-badge">{totalAgents}</span>
        </div> */}
      </div>

      {/* Controls - Now in one line with search on right */}
      <div className="ar-controls-row">
        {/* Left side: Show entries */}
        <div className="ar-show-entries">
          <span>Show</span>
          <select
            className="ar-entries-select"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>

        {/* Right side: Export Icons + Search */}
        <div className="ar-controls-right">
          {/* Export Icons */}
          <div className="ar-export-icons">
            <button 
              className="ar-export-icon-btn ar-pdf-icon" 
              onClick={downloadPDF}
              title="Download PDF"
            >
              <i className="fas fa-file-pdf"></i>
            </button>
            <button 
              className="ar-export-icon-btn ar-excel-icon" 
              onClick={downloadExcel}
              title="Download Excel"
            >
              <i className="fas fa-file-excel"></i>
            </button>
          </div>

          {/* Search Bar */}
          <div className="ar-search-box">
            <span className="ar-search-label">Search:</span>
            <input
              type="text"
              className="ar-search-input"
              placeholder=""
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="ar-table-container">
        <table className="ar-agents-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Registration ID</th>
              <th>Name</th>
              <th>Place</th>
              <th>Date of Submission</th>
              <th>Date of Approval</th>
              <th>Valid Till</th>
              {/* <th>Status</th> */}
            </tr>
          </thead>
          <tbody>
            {currentAgents.map((agent, index) => (
              <tr key={agent.id}>
                <td>{startIndex + index + 1}</td>
                <td className="ar-registration-id">{agent.registrationId}</td>
                <td><strong className='agentnames'>{agent.name}</strong></td>
                <td>{agent.place}</td>
                <td>{agent.dateOfSubmission}</td>
                <td>{agent.dateOfApproval}</td>
                <td>{agent.validTill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="ar-table-footer">
        <div className="ar-pagination-info">
          Showing {startIndex + 1} to {Math.min(endIndex, totalAgents)} of {totalAgents} entries
        </div>

        <div className="ar-pagination-controls">
          <button
            className="ar-pagination-btn ar-prev-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i> Previous
          </button>

          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="ar-pagination-ellipsis">...</span>
            ) : (
              <button
                key={page}
                className={`ar-pagination-btn ar-page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          ))}

          <button
            className="ar-pagination-btn ar-next-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentsReport;