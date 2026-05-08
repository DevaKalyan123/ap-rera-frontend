// src/components/scrutiny/ScrutinyHeader.jsx

import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import "../../styles/scrutiny/scrutinyHeader.css";

const ScrutinyHeader = ({ toggleSidebar }) => {
  const { admin, clearAdmin } = useAdmin(); 
   console.log("AdminContext data in Header:", admin);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdmin(); // clears context + localStorage
    navigate("/", { replace: true });
  };

  const photoUrl = admin?.photo ? `http://localhost:5056${admin.photo}` : null;

  const initials = admin?.full_name
    ? admin.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "AD";

  return (
    <div className="scrutiny-header">

      <div className="scrutiny-header-left">
        <button className="scrutiny-hamburger" onClick={toggleSidebar}>☰</button>
        <h2 className="scrutiny-title">SCRUTINY ENGINEER PANEL</h2>
      </div>

      <div className="scrutiny-header-right">
        {admin?.role && (
          <span className="scrutiny-role-badge">
            {admin.role.replace(/_/g, " ")}
          </span>
        )}

        <div className="scrutiny-user-info">
          <span className="scrutiny-user-name">{admin?.full_name ?? "Admin"}</span>
          <span className="scrutiny-user-dept">{admin?.department ?? ""}</span>
        </div>

        {photoUrl ? (
          <img
            className="scrutiny-avatar"
            src={photoUrl}
            alt={admin?.full_name ?? "Admin"}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className="scrutiny-avatar-initials"
          style={{ display: photoUrl ? "none" : "flex" }}
        >
          {initials}
        </div>

        <button className="scrutiny-logout-btn" onClick={handleLogout} title="Logout">
          ⎋ Logout
        </button>
      </div>

    </div>
  );
};

export default ScrutinyHeader;