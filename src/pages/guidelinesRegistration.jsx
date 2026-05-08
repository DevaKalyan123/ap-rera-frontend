import "../styles/guidelinesRegistration.css";
import { FaDownload, FaFileAlt, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function GuidelinesForRegistration() {
  return (
    <div className="gr-page">

      {/* Breadcrumb */}
      <div className="gr-breadcrumb">
        You are here :&nbsp;
        <a href="/">Home</a> /&nbsp;
        <a href="/registration">Registration</a> /&nbsp;
        <strong>Guidelines for Registration</strong>
      </div>

      {/* Main Container */}
      <div className="gr-container">

        {/* Info Bar */}
        <div className="gr-info-bar">
          Download the forms for Project/Agent/Complaint Registration from the link given below.
        </div>

        {/* STEP 1 */}
        <div className="gr-step gr-step-red">
          <div className="gr-step-arrow">
            <div className="gr-step-number">
              <small>STEP</small>
              <strong>1</strong>
            </div>
          </div>

          <div className="gr-step-content">
            <div className="gr-main-text">
              Application form for Project/Agent/Complaint Registration
              <Link to="/formsdownload" className="gr-link">
                Click Here
              </Link>
            </div>


            <div className="gr-note">
              <strong>NOTE :</strong> The documents and Drawings must be self-attested and in
              PDF Format (70MB), Photo in JPEG Format (35mm×45mm, 300DPI,
              straight view/light background)
            </div>
          </div>

          <div className="gr-step-icon gr-red-icon">
            <FaDownload className="gr-icon" />
          </div>
        </div>

        {/* STEP 2 */}
        <div className="gr-step gr-step-orange">
          <div className="gr-step-arrow">
            <div className="gr-step-number">
              <small>STEP</small>
              <strong>2</strong>
            </div>
          </div>

          <div className="gr-step-content">
            Fill the required application form (printable/digital). It would be
            more useful during the submission for online application.
          </div>

          <div className="gr-step-icon gr-orange-icon">
            <FaFileAlt className="gr-icon" />
          </div>
        </div>

        {/* STEP 3 */}
        <div className="gr-step gr-step-blue">
          <div className="gr-step-arrow">
            <div className="gr-step-number">
              <small>STEP</small>
              <strong>3</strong>
            </div>
          </div>

          <div className="gr-step-content">
            For better understanding of registration screens verify the below
            user manuals and video tutorials.

            <ul className="gr-manual-list">
              <ul className="gr-manual-list">
                <li>
                  ► User manuals for Project/Agent/Complaint Registration
                  <Link to="/usermanual" className="gr-link">
                    Click Here
                  </Link>
                </li>
                <li>
                  ► Video tutorials
                  <Link to="/videoTutorial" className="gr-link">
                    Click Here
                  </Link>
                </li>
              </ul>

            </ul>
          </div>

          <div className="gr-step-icon gr-blue-icon">
            <FaSearch className="gr-icon" />
          </div>
        </div>

      </div>
    </div>
  );
}