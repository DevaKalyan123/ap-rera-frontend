import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";
import "../../styles/admin/adminDashboard.css";

const AdminRequests = () => {

  const [requests, setRequests] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {

    fetch("http://localhost:8080/api/admin/requests")
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error("Error fetching requests:", err));

  }, []);

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>

        {/* Header */}
        <TopHeader toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div className="admin-dashboard-content">

          <h2>Pending Change Requests</h2>

          <table className="admin-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>PAN Number</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {requests.length === 0 ? (

                <tr>
                  <td colSpan="4">No requests found</td>
                </tr>

              ) : (

                requests.map((r) => (

                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.pan_number}</td>
                    <td>{r.status}</td>
                    <td>
                      <button className="admin-view-btn">
                        View
                      </button>
                    </td>
                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminRequests;