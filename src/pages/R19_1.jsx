import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/R19_1.css';

const R19_1 = () => {
  const [fromDate, setFromDate] = useState('02/01/2026');
  const [toDate, setToDate] = useState('09/01/2026');
  const [caseType, setCaseType] = useState('New');
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNoDetails, setShowNoDetails] = useState(true);

  const handleGetDetails = () => {
    setShowNoDetails(true);
    setShowFromCalendar(false);
    setShowToCalendar(false);
    setShowDropdown(false);
  };

  const caseOptions = [
    'All',
    'Alteration Addition Existing',
    'Demolition And Reconstruction',
    'New',
    'Revision'
  ];

  return (
    <div className="r19-container">
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        You are here : <Link to="/" className="link">Home</Link> / <Link to="/mis-reports" className="link">MIS Reports</Link> / R19.1 Eligible Projects under RERA as per DPMS
      </div>

      <div className="content-box">
        <h2 className="page-title">R19.1 Eligible Projects Under RERA As Per DPMS</h2>

        <div className="form-grid">
          {/* From Date Group */}
          <div className="input-group">
            <label>From Date <span className="required">*</span></label>
            <div className="input-wrapper" onClick={() => { setShowFromCalendar(!showFromCalendar); setShowToCalendar(false); setShowDropdown(false); }}>
              <input type="text" value={fromDate} readOnly />
              {showFromCalendar && (
                <div className="custom-calendar">
                  <div className="calendar-header">Jan 2026</div>
                  <div className="calendar-days">
                    {/* Mocked days for demo */}
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    {[...Array(31)].map((_, i) => (
                      <div key={i} className={i === 24 ? "current-day" : i === 1 ? "selected-day" : ""}>{i + 1}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* To Date Group */}
          <div className="input-group">
            <label>To Date <span className="required">*</span></label>
            <div className="input-wrapper" onClick={() => { setShowToCalendar(!showToCalendar); setShowFromCalendar(false); setShowDropdown(false); }}>
              <input type="text" value={toDate} readOnly />
              {showToCalendar && (
                <div className="custom-calendar">
                  <div className="calendar-header">Jan 2026</div>
                  <div className="calendar-days">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    {[...Array(31)].map((_, i) => (
                      <div key={i} className={i === 24 ? "current-day" : i === 8 ? "selected-day" : ""}>{i + 1}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Case Type Group */}
          <div className="input-group">
            <label>Case Type <span className="required">*</span></label>
            <div className="input-wrapper" onClick={() => { setShowDropdown(!showDropdown); setShowFromCalendar(false); setShowToCalendar(false); }}>
              <div className="select-box">{caseType} <i className="fas fa-chevron-down"></i></div>
              {showDropdown && (
                <ul className="custom-dropdown">
                  {caseOptions.map((opt) => (
                    <li key={opt} onClick={() => { setCaseType(opt); setShowDropdown(false); }} className={caseType === opt ? "selected-opt" : ""}>
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="btn-group">
            <button className="details-btn" onClick={handleGetDetails}>Get Details</button>
          </div>
        </div>

        {/* Demo Result Message */}
        {showNoDetails && (
          <div className="no-details-area">
            <h3>No Details Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default R19_1;