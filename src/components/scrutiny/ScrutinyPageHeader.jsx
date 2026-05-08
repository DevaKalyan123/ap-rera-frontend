import "../../styles/scrutiny/scrutiny_page_header.css";
import { Link } from "react-router-dom";

export default function ScrutinyPageHeader() {
  return (
    <div className="scrutiny-page-header">
      <div className="scrutiny-page-breadcrumb">
  <span>You are here :</span>

  <Link to="/dashboard">DashBoard</Link>
  <span>/</span>

  <Link to="/scrutiny/project-registration">Scrutiny Engineer Requests</Link>
  <span>/</span>

  <span>Project Registration Form</span>
</div>

      <div className="scrutiny-page-brand">
        <span>RERA-SE</span>
        <button
          type="button"
          className="scrutiny-page-print"
          onClick={() => window.print()}
          title="Print"
        >
          <i className="fa-solid fa-print" />
        </button>
      </div>
    </div>
  );
}