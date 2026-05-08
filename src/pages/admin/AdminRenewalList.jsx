import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../../api/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";
import { useNavigate } from "react-router-dom";

const AdminRenewalList = () => {

  const { status } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [renewals, setRenewals] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    loadRenewals();
  }, [status]);

  const loadRenewals = async () => {
    try {

      const apiStatus =
        status === "draft"
          ? "DRAFT"
          : status === "approved"
          ? "APPROVED"
          : status === "rejected"
          ? "REJECTED"
          : "EXPIRED";

      const data = await apiGet(
        `/api/agent-renewal/admin/renewals/${apiStatus}`
      );

      setRenewals(data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar sidebarOpen={sidebarOpen} />

      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>

        <TopHeader toggleSidebar={toggleSidebar} />

        <div className="admin-dashboard-content">

          <h2>{status.toUpperCase()} Renewals</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Agent ID</th>
                <th>Application No</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>

            <tbody>

              {renewals.length === 0 && (
                <tr>
                  <td colSpan="6">No Records Found</td>
                </tr>
              )}

{renewals.map((item) => (
  <tr
    key={item.id}
    style={{ cursor: "pointer" }}
    onClick={() => navigate(`/admin/renewal/${item.id}`)}
  >
    <td>{item.id}</td>
    <td>{item.agent_id}</td>
    <td>{item.application_no}</td>
    <td>{item.expiry_date}</td>
    <td>{item.status}</td>
    <td>{item.payment_status}</td>
  </tr>
))}

            </tbody>
          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminRenewalList;