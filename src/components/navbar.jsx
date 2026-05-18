import "../styles/navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import OfficeorderPdf from "../../public/assets/pdfs/Officeorder.pdf";
import CAUSELISTPdf from "../../public/assets/pdfs/CAuselist.pdf";
import appealPdf from "../../public/assets/pdfs/AppealToBuyer.pdf";
import legalpdf from "../../public/assets/pdfs/LEGAL_APRERA_CORPORATE_PRESENTATION.pdf";
import Logo from "../../public/assets/images/logo.jpg";
import GoogleTranslate from "./GoogleTranslate";

const Navbar = ({ setHideNotice }) => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅
  const [showNotice, setShowNotice] = useState(false);
  const isScrutinyRoute =
    location.pathname.startsWith("/scrutiny") ||
    location.pathname.startsWith("/scrutinity");

  if (
    isScrutinyRoute ||
    location.pathname.startsWith("/admin") ||
    location.pathname === "/admin-login" ||
    location.pathname === "/apreatapplication"
  ) {
    return null;
  }

  return (
    <>
      {/* Top Header */}
      <div className="top-header">
        <div className="header-center">


          <p className="header-title"><img src={Logo} alt="APRERA Logo" className="header-logo" />ANDHRA PRADESH REAL ESTATE REGULATORY AUTHORITY</p>
        </div>

        <div className="top-header-right">
          <GoogleTranslate />
          <button className="search-btn">SEARCH RERA PROJECTS</button>
        </div>

        {/* <button className="search-btn">SEARCH RERA PROJECTS</button> */}
      </div>

      {/* Main Navbar */}
      <nav className="main-navbar">
        <ul className="nav-list">
          <li onClick={() => navigate("/")}>
            HOME
          </li>

          

          {/* <li>APREAT</li> */}

          {/* REGISTRATION */}
          <li className="dropdown">
            REGISTRATION <span className="arrow"></span>
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/promotregistration")}>
                Promoter Registration
              </li>
              <li onClick={() => navigate("/guidelinesRegistration")}>
                Guidelines for Registration
              </li>
              <li className="sub-dropdown" onClick={() => navigate("/project-registration")}>
                Project Registration 
                
              </li>
              {/* PROJECT REGISTRATION */}
              {/* <li className="sub-dropdown" onClick={() => navigate("/project-registration")}>
                Project Registration <span className="arrow">▸</span>
                <ul className="sub-dropdown-menu">
                  <li>Apply for quarterly update</li>
                  <li onClick={(e) => {
        e.stopPropagation();
        navigate("/otplogin");
      }}>Apply for project extension</li>
                  <li>Apply for change request</li>
                  <li>Closure</li>
                  <li onClick={(e) => {
        e.stopPropagation();
        navigate("/InformProject");
      }}>
                    Inform un-registered project details
                  </li>
                  <li>List of projects to be registered</li>
                  <li>Rejected Projects</li>
                  <li>Revoked Projects</li>
                
                </ul>
              </li>*/}
               
    <li className="sub-dropdown" onClick={() => navigate("/agent-registration")}>
  Agent Registration

  
</li>
<li className="sub-dropdown" onClick={() => navigate("/complaintRegistration")}>
  Complaint Registration 

 
</li> 
              <li onClick={() => navigate("/feecalculater")}>
                Fee Calculator
              </li>
              <li onClick={() => navigate("/usermanual")}>
                User Manuals
              </li>
              <li onClick={() => navigate("/formsdownload")}>
                Forms Download
              </li>
              <li onClick={() => navigate("/videoTutorial")}>
                Video Tutorials
              </li>
              <li onClick={() => navigate("/mobileapp")}>
                Mobile App
              </li>
            </ul>
          </li>
          <li className="dropdown">REPORTS <span className="arrow"></span>
            <ul className="dropdown-menu">

              <li onClick={() => navigate("/mis-reports")}>MIS reports</li>
              <li>GIS reports</li>
            </ul>
          </li>
          <li className="dropdown">REGISTERED <span className="arrow"></span>
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/registered/projects")}>
                Projects
              </li>
              <li onClick={() => navigate("/agents")}>
                Agents </li>
            </ul>
          </li>
          <li className="dropdown">JUDGEMENTS/ORDERS <span className="arrow"></span>

            <ul className="dropdown-menu">
              <li
                onClick={() =>
                  window.open(
                    window.location.origin + "/statistics",
                    "_blank"
                  )
                }
              >
                Statistics
              </li>

            </ul>
          </li>
          <li className="dropdown">NOTIFICATIONS <span className="arrow"></span>
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/goinotifications")}>
                GOI Notifications
              </li>
              <li onClick={() => navigate("/goapnotifications")}>
                GOAP Notifications
              </li>
              <li onClick={() => navigate("/authoritynotifications")}>
                Authority Notificatoins
              </li>
              <li onClick={() => navigate("/cidcandaprerajoint")}>
                CIDC and APRERA Joint Notifications
              </li>

              <li>
                <a
                  href={CAUSELISTPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Complaints: Cause List Motion Hearing Before Adjudicating Officer
                </a>
              </li>
              <li>
                <a
                  href={OfficeorderPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Office Order
                </a>
              </li>
            </ul>
          </li>
          <li className="dropdown">KNOWLEDGE HUB <span className="arrow"></span>
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/evolutionofrera")}>
                Evolution of RERA
              </li>
              <li onClick={() => navigate("/race")}>RACE</li>
              <li onClick={() => navigate("/taskvstime")}>
                Task Vs Time
              </li>
              <li onClick={() => navigate("/ChronologyOfEvents")}>Chronology of Events</li>
              <li onClick={() => window.open(legalpdf, "_blank")}> APRERA Presentation</li>
              <li onClick={() => navigate("/JudgementHub")}>Judgement</li>
              <li onClick={() => navigate("/vendordatabase")}>
                VendorDatabase
              </li>
              <li onClick={() => navigate("/AdvertisementGuidelines")}>Advertisement Guidelines</li>
              <li onClick={() => navigate("/audiovisualgallery")}> AudioVisualGallery </li>
              <li onClick={() => navigate("/PressRelease")}>Press Releases</li>
              <li onClick={() => navigate("/gradingofpromotors")}> GradingOfPromotors </li>
              <li onClick={() => navigate("/GradingOfAgents")}>Grading of Agents</li>
              <li onClick={() => navigate("/acf")}> acf </li>
              <li onClick={() => navigate("/Testimonials")}>Testimonials</li>
              <li onClick={() => window.open(appealPdf, "_blank")}>Appeal to Buyer</li>
            </ul>
          </li>

          {/* <li onClick={()=>navigate("/complaint-orders")}>COMPLAINT ORDERS</li> */}
          <li className="dropdown">COMPLAINT ORDERS <span className="arrow"></span>
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/complaintstatus")}>
                FORM M
              </li>
              <li onClick={() => navigate("/complaintstatus")}>
                FORM N </li>
            </ul>
          </li>

          <li onClick={() =>
    window.open("/apreatapplication", "_blank")
  }>APREAT</li>
{/* ABOUT US DROPDOWN */}
          <li className="dropdown">ABOUT US <span className="arrow"></span>

            <ul className="dropdown-menu">
              {/* <li onClick={() => navigate("/aprera")}>
                What is APRERA
              </li> */}

              <li onClick={() => navigate("/organogram")}>
                Organisation Structure
              </li>

              <li onClick={() => navigate("/ourservices")}>
                Our Services
              </li>
              <li onClick={() => navigate("/recruitment")}>Recruitment</li>

              <li onClick={() => navigate("/rti")}>RTI</li>

              <li onClick={() => navigate("/our-leadership")}>
                Our Leadership
              </li>
              <li className="contact-submenu">
                <span className="contact-title">
                  Contact Us <span className="right-arrow">▶</span>
                </span>

                <ul className="contact-submenu-box">
                  <li onClick={() => navigate("/contact-us/aprera")}>
                    APRERA
                  </li>
                </ul>
              </li>
            </ul>
          </li>
<li onClick={() => navigate("/dbbase")}>
  <span className="dbbase-menu">
    DPMS
  </span>
</li>
          <li className="dropdown dropdown-right">LOGIN <span className="arrow"></span>
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/admin-login")}>
                ADMIN LOGIN
              </li>
               {/* <li onClick={() => navigate("scrutinity/scrutiny-engineer")}>
      Scrutiny Engineer
    </li> */}
              <li onClick={() => navigate("/department")}>
                DEPARTMENT LOGIN
              </li>
              <li onClick={() => navigate("/promoter")}>
                PROMOTOR LOGIN </li>

            </ul>
          </li>

 {/* 🔔 Bell Icon */}

<li className="nav-bell" style={{ position: "relative" }}>
  <span onClick={() => setShowNotice(!showNotice)}>
    🔔
  </span>

{showNotice && ( <div className="notice-dropdown">
   <div className="notice-scroll-box"> <ul className="notice-scroll-list">


      <li>
         <span className="new-inline">NEW</span>
        <div className="notice-text">
          One Time Opportunity with 50% Concession on Late Fee for Un-registered Projects.
        </div>
      </li>

      <li>
      <span className="new-inline">NEW</span>
        <div className="notice-text">
          Quarterly Updates: All the Promoters have to submit the Quarterly Update of January 2026 - March 2026 on or before 21/04/2026 without fail.
        </div>
      </li>

      <li>
        <span className="new-inline">NEW</span>
        <div className="notice-text">
          Promoters intending to obtain a project extension are advised to appear before the Authority at the office of APRERA on working days.
        </div>
      </li>

      <li>
         <span className="new-inline">NEW</span>
        <div className="notice-text">
          All promoters are hereby informed that the Project Extension Module has been enabled online.
        </div>
      </li>

      <li>
         <span className="new-inline">NEW</span>
        <div className="notice-text">
          Promoters are requested to display the APRERA Registration Certificate / ID at the respective project site.
        </div>
      </li>

      <li
        onClick={() => navigate("/promotregistration")}
        style={{ cursor: "pointer" }}
      >
         <span className="new-inline">NEW</span>
        <div className="notice-text">
          All the promoters are instructed to register themselves in the AP RERA web portal.
        </div>
      </li>

    </ul>
  </div>
</div>
)}



</li>      </ul>
      </nav>
    </>
  );
};

export default Navbar;