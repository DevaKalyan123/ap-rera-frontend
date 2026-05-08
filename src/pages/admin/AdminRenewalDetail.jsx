import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet, apiPut, BASE_URL } from "../../api/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TopHeader from "../../components/admin/TopHeader";
import "../../styles/admin/adminRenewalDetail.css";

const AdminRenewalDetail = () => {

  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [data, setData] = useState({});
  const [remarks, setRemarks] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    try {

      const res = await apiGet(
        `/api/agent-renewal/admin/renewal/${id}`
      );

      setData(res);
      setRemarks(res.remarks || "");

    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (status) => {

    try {

      await apiPut(
        `/api/agent-renewal/admin/renewal/update/${id}`,
        {
          status,
          remarks
        }
      );

      alert("Status Updated Successfully");

      loadDetail();

    } catch (err) {
      console.error(err);
    }
  };

  const documents = data.documents || {};

  return (

    <div className="admin-layout">

      <AdminSidebar sidebarOpen={sidebarOpen} />

      <div className={`admin-main ${sidebarOpen ? "" : "admin-main-full"}`}>

        <TopHeader toggleSidebar={toggleSidebar} />

        <div className="admin-dashboard-content renewal-detail-page">

          <div className="renewal-card">

            <h2>Renewal Details</h2>

           <div className="renewal-details-table">

  <div className="detail-row">
    <div className="detail-label">Application No</div>
    <div className="detail-value">{data.application_no}</div>
  </div>

  <div className="detail-row">
    <div className="detail-label">Agent ID</div>
    <div className="detail-value">{data.agent_id}</div>
  </div>

  <div className="detail-row">
    <div className="detail-label">Expiry Date</div>
    <div className="detail-value">{data.expiry_date}</div>
  </div>

  <div className="detail-row">
    <div className="detail-label">Status</div>
    <div className="detail-value status">{data.renewal_status}</div>
  </div>

  <div className="detail-row">
    <div className="detail-label">Payment</div>
    <div className="detail-value">{data.payment_status}</div>
  </div>

</div>
          </div>


          <div className="renewal-card">

            <h3>Documents</h3>

            <div className="doc-container">

              {documents.pan_card && (
                <a
                 href={`${BASE_URL}/${documents.pan_card.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-btn"
                >
                  PAN Card
                </a>
              )}

              {documents.aadhaar_card && (
                <a
                  href={`${BASE_URL}/${documents.aadhaar_card.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-btn"
                >
                  Aadhaar Card
                </a>
              )}

              {documents.address_proof && (
                <a
                  href={`${BASE_URL}/${documents.address_proof.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-btn"
                >
                  Address Proof
                </a>
              )}

              {documents.previous_rera_certificate && (
                <a
                  href={`${BASE_URL}/${documents.previous_rera_certificate.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-btn"
                >
                  Previous Certificate
                </a>
              )}

            </div>

          </div>


          {data.renewal_status === "DRAFT" && (

            <div className="renewal-card">

              <h3>Admin Action</h3>

              <textarea
                className="remarks-box"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks..."
              />

              <div className="action-buttons">

                <button
                  className="approve-btn"
                  onClick={() => updateStatus("APPROVED")}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => updateStatus("REJECTED")}
                >
                  Reject
                </button>

              </div>

            </div>

          )}


          {data.renewal_status !== "DRAFT" && (

            <div className="renewal-card">

              <h3>Admin Remarks</h3>

              <div className="remarks-display">
                {data.remarks || "No remarks provided"}
              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default AdminRenewalDetail;