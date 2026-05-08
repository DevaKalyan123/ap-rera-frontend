import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/reportPage.css';

const R14_3 = () => {
  return (
    <div className="report-page-wrapper">
      {/* Breadcrumb remains for navigation consistency */}
      <div className="breadcrumb-blue no-print">
        You are here : <Link to="/" className="text-white underline">Home</Link> / <Link to="/mis-reports" className="text-white underline">MIS Reports</Link> / R14.3 Form S
      </div>

      
          <p className="mt-4 text-gray-600 font-bold text-xl">No details Found</p>
        </div>

  );
};

export default R14_3;