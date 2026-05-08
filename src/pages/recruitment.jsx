import "../styles/recruitment.css";
import { FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";



const Recruitment = () => {
  return (
  
    <div className="recruitmentt-page">

      <div className="recruitmentt-outer-box">

        {/* Breadcrumb */}
        <div className="recruitmentt-breadcrumb-bar">
          You are here :
          <Link to="/" className="recruitmentt-breadcrumb-home"> Home</Link>
          <span className="recruitmentt-breadcrumb-separator"> / </span>
          <span className="recruitmentt-breadcrumb-text">About Us</span>
          <span className="recruitmentt-breadcrumb-separator"> / </span>
          <span className="recruitmentt-breadcrumb-text">Recruitment</span>
        </div>

        <div className="recruitmentt-container">
          <h2 className="recruitmentt-title">Recruitment</h2>

          <table className="recruitmentt-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Circular No</th>
                <th>Date</th>
                <th>Subject</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>A/3/2018</td>
                <td></td>
                <td>
                  Applications are invited for the post of Legal Assistant.
                </td>
                <td className="recruitmentt-download-cell">
                  <a
                    href="https://rera.ap.gov.in/RERA/DOCUMENTS/Notice/Assistant_Leagal_officer.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="recruitmentt-download-link"
                  >
                    <FaDownload />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
};

export default Recruitment;