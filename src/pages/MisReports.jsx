import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MisReports.css'; 

const MisReports = () => {
  // State for main categories (R1, R6, R15, etc.)
  const [expandedId, setExpandedId] = useState(null);
  // State for nested categories (R6.2, etc.)
  const [expandedSubId, setExpandedSubId] = useState(null);

  const toggleReport = (id) => {
    setExpandedId(expandedId === id ? null : id);
    setExpandedSubId(null); // Reset nested menus when switching main categories
  };

  const toggleSubReport = (e, id) => {
    e.preventDefault(); // Prevent navigation if it's a dropdown toggle
    e.stopPropagation(); // Prevent parent card click
    setExpandedSubId(expandedSubId === id ? null : id);
  };

  const reportData = [
    {
      id: 'R1', title: 'General Report',
      subItems: [
        { label: 'R1.1 - Status of Application for Projects', link: '/reports/R1.1' },
        { label: 'R1.2 - Status of Application for Agents', link: '/reports/R1.2' },
        { label: 'R1.3 - Status of Complaints', link: '/reports/R1.3' },
      ]
    },
    {
      id: 'R2', title: 'Special reports',
      subItems: [
        { label: 'R2.1 - Assembly constituency wise', link: '/reports/R2.1' },
        { label: 'R2.2 - Parliament constituency wise', link: '/reports/R2.2' },
        { label: 'R2.3 - CM Dash Board Reports', link: '/reports/R2.3' },
      ]
    },
    {
      id: 'R3', title: 'Type of housing',
      subItems: [
        { label: 'R3.1 - Apartments', link: '/reports/R3.1' },
        { label: 'R3.2 - Group housing', link: '/reports/R3.2' },
        { label: 'R3.3 - GDS', link: '/reports/R3.3' },
        { label: 'R3.4 - Commercial', link: '/reports/R3.4' },
        { label: 'R3.5 - Mixed', link: '/reports/R3.5' },
        { label: 'R3.6 - Layouts-for Plot Development', link: '/reports/R3.6' },
        { label: 'R3.7 - Layouts-for Plots & Houses', link: '/reports/R3.7' },
      ]
    },
    {
      id: 'R4', title: 'Tentative Reports',
      subItems: [
        { label: 'R4.1 - Approved Projects', link: '/reports/R4.1' },
        { label: 'R4.2 - Approved Agents', link: '/reports/R4.2' },
      ]
    },
    {
      id: 'R5', title: 'Local Body Reports',
      subItems: [
        { label: 'R5.1 - APCRDA', link: '/reports/R5.1' },
        { label: 'R5.2 - UDA(8) wise', link: '/reports/R5.2' },
        { label: 'R5.3 - ULB(110) wise', link: '/reports/R5.3' },
        { label: 'R5.4 - DTCP', link: '/reports/R5.4' },
      ]
    },
    {
      id: 'R6', title: 'Daily alerts / reports',
      subItems: [
        { label: 'R6.1 - Fund availability', link: '/reports/R6.1' },
        { label: 'R6.2 - Abstract of Application status',
          id: 'R6.2', title: 'Abstract of Application status / reports',
      subItems: [
        { label: 'R6.2.1 - project', link: '/reports/R6.2.1' },
        { label: 'R6.2.2 - Agent', link: '/reports/R6.2.2' },
        { label: 'R6.2.3 - Compliant', link: '/reports/R6.2.3' },
      ]
         },
        { label: 'R6.3 - Complaint pending status', link: '/reports/R6.3' },
        { label: 'R6.4 - Pending Applications against officer', link: '/reports/R6.4' },
      ]
    },
    { id: 'R7', title: 'Project Progress Report', 
      subItems: [
        {label: 'R7.1 - Gant Charts', link: '/reports/R7.1'},
        {label: 'R7.2 - Real time image capture', link: '/reports/R7.2'},
        {label: 'R7.3 - Count down timer', link: '/reports/R7.3'}
      ] 
    },
    { id: 'R8', title: 'Agent Progress Report', 
      subItems: [
        {label: 'R8.1 - Area sold', link: '/reports/R8.1'},
        {label: 'R8.2 - Recipients', link: '/reports/R8.2'},
      ] 
    },
    { id: 'R9', title: 'Category wise Reports', 
      subItems: [
        {label: 'R9.1 - Upto 1000 sq.m', link: '/reports/approved-detailed'},
        {label: 'R9.2 - Abstract of Application status', link: '/reports/R9.2' },
        { label: 'R9.3 - Project Detailed Report', link: '/reports/R9.3' }
      ] },
    { id: 'R10', title: 'Fee -Reconciliation report', 
      subItems: [
        {label: 'R10.1 - Project wise', link: '/reports/R10.1'},
        {label: 'R10.2 - Agent wise', link: '/reports/R10.2'},
        {label: 'R10.3 - Fee for complaint', link: '/reports/R10.3'}
      ] },
    { id: 'R11', title: 'Group Housing by Govt', 
      subItems: [
        {label: 'R11.1 - Project wise', link: '/reports/R11.1'}
      ] },
    { id: 'R12', title: 'Region Wise Reports', 
      subItems: [
        {label: 'R12.1 - Visakhapatnam', link: '/reports/R12.1'},
        {label: 'R12.2 - Rajamahendravaram', link: '/reports/R12.2'},
        {label: 'R12.3 - Guntur', link: '/reports/R12.3'},
        {label: 'R12.4 - Anantapuram', link: '/reports/R12.4'}
      ] },
    { id: 'R13', title: 'Financial Reports', 
      subItems: [
        {label: 'R13.1 - Fee Received', link: '/reports/R13.1'},
        {label: 'R13.2 - Income and Expenditure', link: '/reports/R13.2'},
        {label: 'R13.3 - Assets & Liabilities', link: '/reports/R13.3'},
        {label: 'R13.4 - Profit & Loss', link: '/reports/R13.4'},
        { label: 'R13.5 - District Wise Financial (Agents)', link: '/reports/R13.5' },
        { label: 'R13.6 - District Wise Financial (Projects)', link: '/reports/R13.6' }
      ] },
    { id: 'R14', title: 'Registers', 
      subItems: [
        {label: 'R14.1 - Form Q', link: '/reports/R14.1'},
        {label: 'R14.2 - Form R', link: '/reports/R14.2'},
        {label: 'R14.3 - Form S', link: '/reports/R14.3'}
      ] },
    { 
  id: 'R15', 
  title: 'Rating by User - Reports', 
  subItems: [
    // Changed link to match your Route path="/reports/R15.1"
    { label: 'R15.1 - Rate of Website Graph', link: '/reports/R15.1' }, 
    { label: 'R15.2 - Feedback Details', link: '/reports/R15.2' }, 
  ] 
},
{ 
  id: 'R16', 
  title: 'Application Initiated - Reports', 
  subItems: [
    { label: 'R16.1 - Initiated Report', link: '/reports/R16.1' }
  ] 
},
    { id: 'R17', title: 'Login wise Pending Reports', 
      subItems: [
        {label: 'R17.1 - Pending Projects', link: '/reports/R17.1'},
        { label: 'R17.2 - Pending Agents Report', link: '/reports/R17.2' }
      ] },
    { id: 'R18', title: 'Third Party Scrutinized Applications Reports', 
      subItems: [
        {label: 'R18.1 - Projects', link: '/reports/R18.1'},
        {label: 'R18.2 - Agents', link: '/reports/R18.2'}
      ] },
    { id: 'R19', title: 'DPMS Reports', 
      subItems: [
        {label: 'R19.1 - Eligible Projects', link: '/reports/R19.1'}
      ] },
    { id: 'R20', title: 'Micro Reports', 
      subItems: [
        { label: 'R20.1 - Dwelling Units (Flats / Villas)', link: '/reports/R20.1' },
        { label: 'R20.2 - Sold Information Report', link: '/reports/R20.2' },
        { label: 'R20.3 - Total Built-Up Area Report', link: '/reports/R20.3' }
      ] },
    { id: 'R21', title: 'Application Wise Time Taken Report', 
      subItems: [
        {label: 'R21.1 - Project', link: '#'},
        { label: 'R21.2 - Agent Application Wise Time Taken', link: '/reports/R21.2' }
      ] },
    { id: 'R22', title: 'Validity Reports', 
      subItems: [
        {label: 'R22.1 - Project', link: '#'},
        { label: 'R22.2 - Agent Renewal Countdown', link: '/reports/R22.2' }
      ] },
    { id: 'R23', title: 'Quarterly Updates Reports', 
      subItems: [{label: 'R23.1 - Project', link: '/reports/R23.1'}

      ] },
    { id: 'R24', title: 'Project Closure Report', 
      subItems: [
        {label: 'R24.1 - Application Status', link: '/reports/R24.1'}
      ] },

      { id: 'R25', title: 'Status Of Projects', 
      subItems: [
        {label: 'R25.1 - Extension Of Projects', link: '/reports/R25.1'},
        {label: 'R25.2 - Change Request Status', link: '/reports/R25.2'},
        {label: 'R25.3 - Renewal Of Agent Registration', link: '/reports/R25.3'}
      ] }
  ];

  return (
    <div className="mis-container">
      <div className="breadcrumb-bar">
        You are here : <Link to="/" className="link">Home</Link> / MIS Reports
      </div>

      <div className="reports-content-box">
        <h2 className="page-title">MIS Reports</h2>
        
        <div className="reports-grid">
          {reportData.map((report) => (
            <div key={report.id} className="report-wrapper">
              {/* Main Category Card */}
              <div 
                className={`report-card ${expandedId === report.id ? 'active' : ''}`}
                onClick={() => toggleReport(report.id)}
              >
                <i className={`fas ${expandedId === report.id ? 'fa-minus' : 'fa-plus'} icon-blue`}></i>
                <span className="report-text">
                  {report.id} - {report.title}
                </span>
              </div>

              {/* Level 1 Sub-items */}
              {expandedId === report.id && (
                <ul className="sub-list">
                  {report.subItems.map((sub, idx) => (
                    <li key={idx} className="sub-item">
                      {sub.subItems ? (
                        <div className="nested-wrapper">
                          <div 
                            className={`sub-item-toggle ${expandedSubId === sub.id ? 'active' : ''}`}
                            onClick={(e) => toggleSubReport(e, sub.id)}
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          >
                            <i className={`fas ${expandedSubId === sub.id ? 'fa-chevron-down' : 'fa-chevron-right'} mr-2`} style={{ fontSize: '10px' }}></i>
                            <span>{sub.label}</span>
                          </div>

                          {/* Level 2 Sub-items (Nested List) */}
                          {expandedSubId === sub.id && (
                            <ul className="nested-sub-list" style={{ paddingLeft: '20px', marginTop: '5px' }}>
                              {sub.subItems.map((nestedSub, nIdx) => (
                                <li key={nIdx} className="nested-sub-item" style={{ padding: '5px 0' }}>
                                  {/* 🔹 Added target="_blank" and rel for Nested Link */}
                                  <Link 
                                    to={nestedSub.link} 
                                    className="report-link" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                  >
                                    <i className="fas fa-file-alt mr-2 text-gray-400"></i>
                                    {nestedSub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        /* Regular Sub-item Link */
                        /* 🔹 Added target="_blank" and rel for Standard Sub-item */
                        <Link 
                          to={sub.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {sub.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MisReports;