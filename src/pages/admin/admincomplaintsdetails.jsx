import React, { useState } from "react";
import "../../styles/admin/ComplaintDashboard.css";

const AdminComplaintsDetailss = () => {
  const [filter, setFilter] = useState("All");

  const complaints = [
  { id: "00000029", status: "New", name: "NAS client sheet", priority: "High" },
  { id: "00000028", status: "New", name: "Market research", priority: "Low" },
  { id: "00000027", status: "Consideration", name: "Business process", priority: "Medium" },
  { id: "00000026", status: "Approve", name: "Mobile App", priority: "High" },
  { id: "00000025", status: "Reject", name: "Government NSI", priority: "Medium" },
];

  const filteredData =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div className="container">

      {/* 🔍 Search Center */}
      <div className="top-controls">
        <input
          type="text"
          placeholder="Search Complaint ID..."
          className="complaint-search-box"
        />
      </div>
      <div>
         {/* 🎯 Filter Dropdown */}
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Reject">Reject</option>
          <option value="Approve">Approve</option>
          <option value="Consideration">Consideration</option>
        </select>
      </div>

      {/* 📊 Table */}
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Complaint ID</th>
            <th>Status</th>
            <th>Name</th>
            <th>Priority</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>
                <span className={`badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>
              <td>{item.name}</td>
              <td>
  <span className={`priority-badge ${item.priority.toLowerCase()}`}>
    {item.priority}
  </span>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default AdminComplaintsDetailss;