import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';
import workInProgressImg from '../assets/work-in-progress.jpg'; // Path to your saved image

const R10_3 = () => {
  return (
    <div className="report-page-wrapper">
      {/* Breadcrumb remains for navigation consistency */}
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline">Home</Link> / <Link to="/mis-reports" className="text-white underline">MIS Reports</Link> / R10.3 Fee for complaint
      </div>

      <div className="report-card-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', backgroundColor: '#fff' }}>
        <div className="text-center">
          <img 
            src={workInProgressImg} 
            alt="Work In Progress" 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
          />
          <p className="mt-4 text-gray-600 font-bold text-xl">This Report is Currently Under Development</p>
        </div>
      </div>
    </div>
  );
};

export default R10_3;