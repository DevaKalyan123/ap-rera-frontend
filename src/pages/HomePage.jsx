import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";

import { useNavigate } from "react-router-dom";
import "../styles/QuickLinks.css";
import "../styles/publicnotice.css";
import "../styles/Homeservices.css";
import "../styles/AboutAPRERA.css";

// import { useNavigate } from "react-router-dom";
// import test3 from "/assets/images/img21.png";
// import test from "../assets/img19.png";
// import test1 from "../assets/images/img13.png";
// import test2 from "../assets/images/img3.png";
// import test from "../assets/images/img19.png"


import "../styles/statics.css";
// import { FaBuilding, FaUserTie, FaGavel } from "react-icons/fa";


import {
  FaSyncAlt,
  FaArrowRight,
  FaEdit,
  FaLock,
  FaFileContract,
  FaExchangeAlt,
  FaUserCheck,
  FaHandshake,
  FaListUl,
  FaGavel,
  FaBuilding,
  FaUserTie,
  FaFileAlt,
  FaStamp, 
} from "react-icons/fa";




// ✅ ChartJS
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

//import "../styles/publicnotice.css";
import {
  FaThumbsUp,
  FaEye,
  FaSlidersH,
  FaUsers,
} from "react-icons/fa";

/* ===========================
   ✅ NAVBAR COMPONENT
=========================== */
function Navbar() {
  const [paused, setPaused] = useState(false);

  return (
    <header className="homenavbar-new-navbar">
      <div className="homenavbar-new-notice-wrapper">
        <div className="homenavbar-new-notice-board">

          <div className="homenavbar-new-icon-box">🔔</div>
          <div className="homenavbar-new-divider"></div>

          <button className="ticker-btn">◀</button>

          <div className="homenavbar-new-ticker">
            <div className={`ticker-track ${paused ? "paused" : ""}`}>

              <span>
                One Time Opportunity with 50% Concession on Late Fee
                <span className="homenavbar-new-badge">NEW</span>
              </span>

              <span className="separator">|</span>

              <span>
                Quarterly Updates Jan–Mar 2026 before 21/04/2026
                <span className="homenavbar-new-badge">NEW</span>
              </span>

              <span className="separator">|</span>

              <span>
                Display APRERA Registration Certificate at site
                <span className="homenavbar-new-badge">NEW</span>
              </span>

            </div>
          </div>

          {/* ✅ THIS IS YOUR MISSING LOGIC */}
          <button
            className="ticker-btn"
            onClick={() => setPaused(!paused)}
          >
            {paused ? "▶" : "⏸"}
          </button>

          <button className="ticker-btn">▶</button>

        </div>
      </div>
    </header>
  );
}
/* ===========================
   ✅ HERO COMPONENT
=========================== */


const bgImages = [
  "https://i.pinimg.com/1200x/19/08/8b/19088b4df084b9b7b997316f313b3a46.jpg",
  "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?cs=srgb&dl=pexels-pixabay-269077.jpg&fm=jpg",
  "https://img.freepik.com/free-photo/modern-business-center_1127-3122.jpg?semt=ais_hybrid&w=740&q=80",
];

const heroStatements = [
  
];

function Hero() {
  const [bgIndex, setBgIndex] = useState(0);
  const [statementIndex, setStatementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatementIndex((prev) => (prev + 1) % heroStatements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="homepassport-hero"
      style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
    >
       {/* ================= ABOUT AP RERA SECTION ================= */}
      <section className="ap-home-about-section">
        <div className="ap-home-about-container">

          {/* LEFT CONTENT */}
          <div className="ap-home-about-left">
           
         <h2 style={{ fontSize: "32px", fontWeight: "700" }} className="aboutrera">
          ABOUT AP RERA
          </h2>

            <p style={{ fontSize: "16px", fontWeight: "500" }}>
              The Real Estate (Regulation & Development) Act, 2016 has been established on 25th March,
              2016 and considered as one of the landmark legislations passed by the Government of India.
              Its objective is to reform the real estate sector in India, encouraging greater transparency,
              citizen centricity, accountability and financial discipline. This is in line with the vast
              and growing economy of India as in future many people will be investing in real estate
              sector.
            </p>

           <p style={{ fontSize: "16px", fontWeight: "400" }}>
              All sections of the Real Estate (Regulation & Development) Act, 2016 came into force
              with effect from 1st May, 2017. The Andhra Pradesh Real Estate (Regulation & Development)
              Rules, 2017 was approved by Government of Andhra Pradesh and notified on March 27, 2017.
            </p>

            <p style={{ fontSize: "16px", fontWeight: "400" }}>
              For Buildings where the area of land proposed to be developed does not exceed five hundred
              square meters or the number of apartments proposed to be developed does not exceed eight
              inclusive of all phases.
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div className="ap-home-about-right">

            {/* Vertical Line */}
            <div className="ap-home-vertical-line"></div>

            {/* Chief Minister */}
            <div className="ap-home-cm-card">
              <img
                src="https://www.imageshine.in/uploads/gallery/PNG-Images-of-Nara-Chandrababu-Naidu.png"
                alt="Sri N. Chandrababu Naidu"
              />
              <h4>Sri N. Chandrababu Naidu</h4>
              <p>Hon’ble Chief Minister of Andhra Pradesh</p> 
            </div>

            {/* Vertical Line */}
            <div className="ap-home-vertical-line"></div>

            {/* Side Leaders */}
            <div className="ap-home-side-leaders">

              <div className="ap-home-side-leader">
                <img
                  src="https://mallishetty.wordpress.com/wp-content/uploads/2016/05/narayanasir.jpg"
                  alt="Sri P. Narayana"
                />
                <div>
                  <h5>Sri P. Narayana</h5>
                  <p>Hon’ble Minister for<br />MA & UD</p>
                </div>
              </div>

              <div className="ap-home-side-leader">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvYbO0kkDIqnDiHndh_Fu04lmISxIKEP_fvw&s"
                  alt="Sri A. Siva Reddy"
                />
                <div>
                  <h5>Sri A. Siva Reddy</h5>
                  <p>Hon’ble Chairperson,<br />AP RERA</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
      {/* Statement */}
      <div className="homepassport-statement-wrap">
        <h2 key={statementIndex} className="homepassport-statement">
          {heroStatements[statementIndex]}
        </h2>
      </div>
    </section>
  );
}




/* ===========================
   ✅ SERVICES COMPONENT
=========================== */
/* ===========================
   ✅ SERVICES COMPONENT
=========================== */

// function Services() {
//   const navigate = useNavigate();

//   const links = [
//     {
//       title:
//         "Documents to be submitted while applying for project on agent registration",
//       Image: test3,
//     },
//     {
//       title: "Project Registration",
//       Image: test,
//       path: "/project-registration-wizard",
//     },
//     {
//       title: "Agent Registration",
//       Image: test1,
//       path: "/agent-registration",
//     },
//     {
//       title: "Complaint Registration",
//       Image: test2,
//       path: "/complaintregistration",
//     },
//     {
//       title: "List of un-registered projects with APRERA",
//       Image: test,
//     },
//   ];

//   const handleClick = (link) => {
//     if (link.path) {
//       navigate(link.path);
//     }
//   };

 
  // return (
    // <section className="quick-links-section">
    //   <div className="quick-links-container">
    //     <h2 className="quick-links-title">Registration</h2>

    //     <div className="quick-links-row">
    //       {links.map((link, index) => (
    //         <div
    //           key={index}
    //           className="quick-link-card"
    //           onClick={() => handleClick(link)}
    //           style={{ cursor: link.path ? "pointer" : "default" }}
    //         >
    //           <img src={link.Image} alt="" className="quick-link-icon" />
    //           <p className="quick-link-text">{link.title}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
  // );
// }

function Services() {
  const navigate = useNavigate();

const registrationLinks = [
  {
    title:
      "Documents to be submitted while applying for project on agent registration",
    icon: FaFileAlt,
  },
  {
    title: "Project Registration",
    icon: FaBuilding,
    path: "/project-registration-wizard",
  },
  {
    title: "Agent Registration",
    icon: FaUserTie,
    path: "/agent-registration",
  },
  {
    title: "Complaint Registration",
    icon: FaEdit,
    path: "/complaintregistration",
  },
  {
    title: "List of un-registered projects with APRERA",
    icon: FaListUl,
  },
   {
    title: "exemption",
    icon: FaStamp,
    path: "/exemption",
  },
];

  const promoterServices = [
    { title: "Apply for Quarterly Update", icon: FaSyncAlt,path:"/quarterlyupdateexisting" },
    { title: "Apply for Project Extension", icon: FaArrowRight, path: "/otplogin" },
    { title: "Apply for Change Request", icon: FaEdit, path: "/changerequestverify" },
    { title: "Closure", icon: FaLock ,path:"/promoter-otp-login" },
  ];

  const agentServices = [
    { title: "Apply for Renewal", icon: FaFileContract, path: "/agent-renewal"},
    { title: "Apply for Change Request", icon: FaExchangeAlt, path: "/agent_change_request_1" },
    { title: "Agents Apply for Renewal", icon: FaUserCheck },
  ];

  const complaintServices = [
    { title: "Conciliation", icon: FaHandshake },
    { title: "Cause list", icon: FaListUl },
    { title: "Judgements / Orders", icon: FaGavel },
  ];

  const handleClick = (item) => {
    if (item.path) navigate(item.path);
  };

  const renderSection = (title, services) => (
    <>
      <h3 className="homeservices-section-title">{title}</h3>
      <div className="homeservices-services-grid">
        {services.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="homeservices-service-card"
              onClick={() => handleClick(item)}
            >
              <Icon className="homeservices-service-icon" />
              <p>{item.title}</p>
              <span className="homeservices-underline"></span>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
  <section className="homequick-links-overlap">
    <div className="homequick-services-card">
      <h2 className="homequick-main-title">SERVICES</h2>

     <div className="homequick-registration-grid">
  {registrationLinks.map((link, index) => {
    const Icon = link.icon;

    return (
      <div
        key={index}
        className="homequick-registration-card"
        onClick={() => handleClick(link)}
      >
        <div className="homequick-registration-icon-wrap">
          <Icon className="homequick-registration-icon" />
        </div>

        <p className="homequick-registration-text">{link.title}</p>
      </div>
    );
  })}
</div>


      <div className="homequick-section-divider"></div>

      {renderSection("Promotors Corner", promoterServices)}
      {renderSection("Real Estate Agent Corner", agentServices)}
      {renderSection("Complaint Corner", complaintServices)}
    </div>
  </section>
);

}

function Publicnotice() {
  const notices = [
    {
      title: "Trust",
      icon: <FaThumbsUp />,
      description:
        "APRERA helps developers in building credibility and go a long way in establishing a relationship of trust with the customers.",
    },
    {
      title: "Transparency",
      icon: <FaEye />,
      description:
        "APRERA creates a more equitable & fair transaction between the consumer and developer / promoter thus ensuring a positive environment in the real estate sector.",
    },
    {
      title: "Control",
      icon: <FaSlidersH />,
      description:
        "APRERA provisions would ensure strict control on management of funds and timely delivery of projects by the developers / promoters.",
    },
    {
      title: "Credibility",
      icon: <FaUsers />,
      description:
        "APRERA will facilitate the consumer while boosting the credibility of developers.",
    },
  ];

  return (
    <section className="homepublic-notice-section">
      <div className="homepublic-notice-container">
        <h2 className="homepublic-notice-title">Our Philosophy</h2>

        <div className="homepublic-notice-grid">
          {notices.map((notice, index) => (
            <div className="homepublic-notice-card" key={index}>
             <div className={`homepublic-notice-icon icon-${index}`}>
      {notice.icon}
    </div>
              {/* <h3 className="homepublic-notice-title">{notice.title}</h3> */}
              <p className="homepublic-notice-text">{notice.description}</p>
            </div>
          ))}
        </div>
        <div className="homepublic-philosophy-right">
          <h2>MAGNIFYING TOWARDS...</h2>
          <div className="homepublic-title-line"></div>

          <ul className="homepublic-arrow-list">
            <li>Ensuring accountability towards allottees and protect their interest.</li>
            <li>Infusing transparency, ensure fair-play and reduce frauds & delays.</li>
            <li>Introducing professionalism and pan India standardization.</li>
            <li>Establishing symmetry of information between promoter and allottee.</li>
            <li>Imposing responsibilities on both promoter and allottees.</li>
            <li>Establishing regulatory oversight mechanism.</li>
            <li>Fast-track dispute resolution mechanism.</li>
            <li>Promoting good governance and investor confidence.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Statics() {
  return (
    <section className="stats-section">
      <h2 className="stats-title">Dashboard</h2>

      <div className="stats-row">
        {/* PROJECTS */}
        <div className="stats-item">
          <FaBuilding className="stats-icon" />
          <h3 className="stats-heading">Status of Projects</h3>
          <div className="stats-underline"></div>
          <p className="stats-line">
            Received : <span className="stats-value">7201</span>
          </p>
          <p className="stats-line">
            Approved : <span className="stats-value">6317</span>
          </p>
        </div>

        <div className="stats-divider"></div>

        {/* AGENTS */}
        <div className="stats-item">
          <FaUserTie className="stats-icon" />
          <h3 className="stats-heading">Status of Agents</h3>
          <div className="stats-underline"></div>
          <p className="stats-line">
            Received : <span className="stats-value">304</span>
          </p>
          <p className="stats-line">
            Approved : <span className="stats-value">296</span>
          </p>
        </div>

        <div className="stats-divider"></div>

        {/* COMPLAINTS */}
        <div className="stats-item">
          <FaGavel className="stats-icon" />
          <h3 className="stats-heading">Status of Complaints</h3>
          <div className="stats-underline"></div>

          <div className="complaints-grid">
            <div>
              <h4 className="complaint-title">Form-M</h4>
              <p>Received : 691</p>
              <p>Disposed : 403</p>
              <p>Reserved for Order : Nil</p>
              <p>Cases before NCLT : 04</p>
              <p>Cases Running : 284</p>
            </div>

            <div>
              <h4 className="complaint-title">Form-N</h4>
              <p>Received : 141</p>
              <p>Disposed : 137</p>
              <p>Reserved for Order : Nil</p>
              <p>Cases before NCLT : 03</p>
              <p>Cases Running : 01</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ===========================
   ✅ PHILOSOPHY COMPONENT
=========================== */
// function Philosophy() {
//   return (
//     <section className="home-new-philosophy-wrapper">
//       <div className="home-new-philosophy-box">
//         <div className="home-new-philosophy-left">
//           <h2>OUR PHILOSOPHY</h2>
//           <div className="home-new-title-line"></div>

//           <p>
//             APRERA's philosophy is to have holistic approach towards promoting
//             the interests of the consumers as well as builders and boost
//             investments into real estate in an environment of trust and
//             confidence.
//           </p>

//           <div className="home-new-philo-grid">
//             <div className="home-new-philo-item">
//               <div className="home-new-icon-box">
//                 <img
//                   src="/src/assets/img6.png"
//                   alt="Trust"
//                   className="home-new-philo-icon"
//                 />
//               </div>
//               <div>
//                 <h4>Trust</h4>
//                 <p>
//                   APRERA helps developers in building credibility and
//                   establishing a relationship of trust with customers.
//                 </p>
//               </div>
//             </div>

//             <div className="home-new-philo-item">
//               <div className="home-new-icon-box">
//                 <img
//                   src="/src/assets/img7.png"
//                   alt="Transparency"
//                   className="home-new-philo-icon"
//                 />
//               </div>
//               <div>
//                 <h4>Transparency</h4>
//                 <p>
//                   APRERA ensures fair & equitable transactions between consumers
//                   and promoters.
//                 </p>
//               </div>
//             </div>

//             <div className="home-new-philo-item">
//               <div className="home-new-icon-box">
//                 <img
//                   src="/src/assets/img8.png"
//                   alt="Control"
//                   className="home-new-philo-icon"
//                 />
//               </div>
//               <div>
//                 <h4>Control</h4>
//                 <p>
//                   Ensures stricter control on management of funds and timely
//                   delivery of projects.
//                 </p>
//               </div>
//             </div>

//             <div className="home-new-philo-item">
//               <div className="home-new-icon-box">
//                 <img
//                   src="/src/assets/img9.png"
//                   alt="Credibility"
//                   className="home-new-philo-icon"
//                 />
//               </div>
//               <div>
//                 <h4>Credibility</h4>
//                 <p>
//                   APRERA facilitates consumers while boosting developer
//                   credibility.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <div className="home-new-philosophy-right">
//           <h2>MAGNIFYING TOWARDS...</h2>
//           <div className="home-new-title-line"></div>

//           <ul className="home-new-arrow-list">
//             <li>Ensuring accountability towards allottees and protect their interest.</li>
//             <li>Infusing transparency, ensure fair-play and reduce frauds & delays.</li>
//             <li>Introducing professionalism and pan India standardization.</li>
//             <li>Establishing symmetry of information between promoter and allottee.</li>
//             <li>Imposing responsibilities on both promoter and allottees.</li>
//             <li>Establishing regulatory oversight mechanism.</li>
//             <li>Fast-track dispute resolution mechanism.</li>
//             <li>Promoting good governance and investor confidence.</li>
//           </ul>
//         </div> */}
//       </div>
//     </section>
//   );
// }

/* ===========================
   ✅ ANALYSIS CHART COMPONENT
=========================== */
function AnalysisChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "PROJECTS",
        data: [45, 0, 0, 0, 0, 0],
        borderColor: "green",
        backgroundColor: "green",
        pointRadius: 5,
      },
      {
        label: "AGENTS",
        data: [3, 0, 0, 0, 0, 0],
        borderColor: "#00bcd4",
        backgroundColor: "#00bcd4",
        pointStyle: "rect",
        pointRadius: 5,
      },
      {
        label: "COMPLAINTS",
        data: [4, 0, 0, 0, 0, 0],
        borderColor: "red",
        backgroundColor: "red",
        pointStyle: "triangle",
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Count" },
        ticks: { stepSize: 10 },
      },
    },
  };

  return (
    <div style={{ height: "350px", padding: "20px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

/* ===========================
   ✅ DASHBOARD COMPONENT
=========================== */

// function Dashboard() {
//   return (
//     <section className="home-new-dashboard-wrapper">

//       <div className="home-new-analysis-box">
//         <div className="home-new-box-header">DATA ANALYSIS</div>

//         <div className="home-new-filters">
//           <div>
//             Year :
//             <select>
//               <option>2026</option>
//             </select>
//           </div>

//           <div>
//             Month :
//             <select>
//               <option>All</option>
//             </select>
//           </div>
//         </div>

//         <h4 className="home-new-analysis-title">
//           STATUS OF PROJECTS, AGENTS AND COMPLAINTS
//         </h4>

//         <AnalysisChart />
//       </div>

//       <div className="home-new-dashboard-box">
//         <div className="home-new-box-header">DASHBOARD</div>

//         {/* PROJECTS */}
//         <div className="home-new-dash-row">
//           <div className="home-new-dash-icon">
//             <img src="/src/assets/img10.png" alt="Projects" />
//           </div>
//           <div className="home-new-dash-content">
//             <h4>STATUS OF PROJECTS</h4>
//             <p>Received : <b>7134</b></p>
//             <p>Approved : <b>6289</b></p>
//           </div>
//         </div>

//         {/* AGENTS */}
//         <div className="home-new-dash-row">
//           <div className="home-new-dash-icon">
//             <img src="/src/assets/img11.png" alt="Agents" />
//           </div>
//           <div className="home-new-dash-content">
//             <h4>STATUS OF AGENTS</h4>
//             <p>Received : <b>303</b></p>
//             <p>Approved : <b>295</b></p>
//           </div>
//         </div>

//         {/* COMPLAINTS */}
//         <div className="home-new-dash-row">
//           <div className="home-new-dash-icon">
//             <img src="/src/assets/img12.png" alt="Complaints" />
//           </div>
//           <div className="home-new-dash-content">
//             <h4>STATUS OF COMPLAINTS</h4>

//             <div className="home-new-complaints-grid">
//               <div>
//                 <p>Total Cases (Form-M)</p>
//                 <p>Received : 657</p>
//                 <p>Disposed : 372</p>
//                 <p>Reserved : Nil</p>
//                 <p>Before NCLT : 04</p>
//                 <p>Running : 281</p>
//               </div>

//               <div>
//                 <p>Total Cases (Form-N)</p>
//                 <p>Received : 141</p>
//                 <p>Disposed : 133</p>
//                 <p>Reserved : Nil</p>
//                 <p>Before NCLT : 02</p>
//                 <p>Running : 06</p>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }


/* ===========================
   ✅ EXPERTISE COMPONENT
=========================== */

function Expertise() {
  return (
    <section className="home-new-expertise">
      <h2 className="home-new-section-title">OUR EXPERTISE</h2>
      <div className="home-new-title-line"></div>

      <p className="home-new-section-subtitle">
        APRERA strives to achieve its objectives by providing an integrated
        platform for real estate sector
      </p>

      <div className="home-new-expertise-grid">

        <div className="home-new-expertise-card">
          <div className="home-new-expertise-icon">
            <img src="/assets/images/imag13.png" alt="Consultation" />

          </div>
          <h3>CONSULTATION</h3>
          <p>
            APRERA provides strong support and guidance to stakeholders in the
            real estate sector through structured processes and transparency.
          </p>
        </div>

        <div className="home-new-expertise-card">
          <div className="home-new-expertise-icon">
            <img src="/assets/images/imag14.png" alt="Promotion" />
          </div>
          <h3>PROMOTION</h3>
          <p>
            APRERA provides strong support and guidance to stakeholders in the
            real estate sector through structured processes and transparency.
          </p>
        </div>

        <div className="home-new-expertise-card">
          <div className="home-new-expertise-icon">
            <img src="/assets/images/imag15.png"   alt="Protection" />
          </div>
          <h3>PROTECTION</h3>
          <p>
            APRERA provides strong support and guidance to stakeholders in the
            real estate sector through structured processes and transparency.
          </p>
        </div>

        <div className="home-new-expertise-card">
          <div className="home-new-expertise-icon">
            <img src="/assets/images/imag16.png"   alt="Financial Discipline" />
          </div>
          <h3>FINANCIAL DISCIPLINE</h3>
          <p>
            APRERA provides strong support and guidance to stakeholders in the
            real estate sector through structured processes and transparency.
          </p>
        </div>

        <div className="home-new-expertise-card">
          <div className="home-new-expertise-icon">
            <img src="/assets/images/imag17.png" alt="Quality Assurance" />
          </div>
          <h3>QUALITY ASSURANCE</h3>
          <p>
            APRERA provides strong support and guidance to stakeholders in the
            real estate sector through structured processes and transparency.
          </p>
        </div>

        <div className="home-new-expertise-card">
          <div className="home-new-expertise-icon">
            <img src="/assets/images/imag18.png" alt="Dispute Redressal" />
          </div>
          <h3>DISPUTE REDRESSAL</h3>
          <p>
            APRERA provides strong support and guidance to stakeholders in the
            real estate sector through structured processes and transparency.
          </p>
        </div>

      </div>
    </section>
  );
}

function Learning() {
  const navigate = useNavigate();

  const learningItems = [
    {
      img: "https://rera.ap.gov.in/RERA/images/news2.jpg",
      title: "BUILDING INFORMATION MODELLING (BIM)",
      path: "/bim",
    },
    {
      img: "https://rera.ap.gov.in/RERA/images/news1.jpg",
      title: "VIRTUAL REALITY INNOVATION",
      path: "/vr",
    },
    {
      img: "https://rera.ap.gov.in/RERA/images/news.jpg",
      title: "REAL TIME CONTEXT CAPTURE",
      path: "/rtc",
    },
  ];

  return (
    <section className="home-new-learning">
      <h2 className="home-new-section-title">LEARNING WITH US</h2>
      <div className="home-new-title-line"></div>

      <p className="home-new-section-subtitle">
        Technology intervention in Infrastructure
      </p>

      <div className="home-new-learning-grid">
        {learningItems.map((item, idx) => (
          <div className="home-new-learning-card" key={idx}>
            <div className="home-new-learning-img">
              <img src={item.img} alt={item.title} />
            </div>

            <h3>{item.title}</h3>

            <button onClick={() => navigate(item.path)}>View All</button>
          </div>
        ))}
      </div>
    </section>
  );
}


/* ===========================
   ✅ FEEDBACK COMPONENT
=========================== */
function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    feedbackFor: "0",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile only numbers
    if (name === "mobile") {
      const onlyNums = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: onlyNums }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name.trim()) return alert("Please enter Name");
    if (!formData.mobile.trim() || formData.mobile.length !== 10)
      return alert("Please enter valid Mobile (10 digits)");
    if (formData.feedbackFor === "0") return alert("Please select Feedback For");
    if (!formData.feedback.trim()) return alert("Please enter Feedback");

    alert("Feedback submitted successfully ✅ (Demo)");
    console.log("Submitted:", formData);

    // reset (optional)
    setFormData({
      name: "",
      mobile: "",
      feedbackFor: "0",
      email: "",
      feedback: "",
    });
  };

  return (
    <section className="home-new-feedback-wrapper">
      <div className="home-new-contact-row" id="home-new-contactinfo">
        {/* LEFT */}
        <div className="home-new-contact-col">
          <div className="home-new-reach-card">
            <div className="home-new-reach-border">
              <h5 className="home-new-reach-title">Reach Us</h5>

              <p className="home-new-reach-heading">
                <b>
                  ANDHRA PRADESH <br />
                  REAL ESTATE REGULATORY AUTHORITY
                </b>
              </p>

              <p className="home-new-reach-address">
                6th &amp; 7th Floors, APCRDA Project Office,
                <br />
                Rayapudi, Tulluru Mandal, Amaravati, Guntur District,
                <br />
                Andhra Pradesh. Pin - 522237.
              </p>

              <p className="home-new-reach-helpdesk">
                Help Desk <span className="home-new-icon">📞</span>{" "}
                <span className="home-new-highlight">6304906011</span>{" "}
                (All Working Days, 10AM-6PM)
              </p>

              <p className="home-new-reach-email">
                Write to <span className="home-new-icon">✉</span>{" "}
                <a
                  href="mailto:helpdesk-rera@ap.gov.in"
                  className="home-new-mail-link"
                  rel="noreferrer"
                >
                  helpdesk-rera[at]ap[dot]gov[dot]in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="home-new-contact-col">
          <div className="home-new-form-card">
            <h3 className="home-new-form-title">Feedback / Suggestion</h3>

            <form onSubmit={handleSubmit} className="home-new-feedback-form">
              <div className="home-new-grid-2">
                <div className="home-new-field">
                  <input
                    type="text"
                    name="name"
                    maxLength={50}
                    placeholder="Name*"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="home-new-field">
                  <input
                    type="text"
                    name="mobile"
                    maxLength={10}
                    placeholder="Mobile*"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>

                <div className="home-new-field home-new-select-field">
                  <select
                    name="feedbackFor"
                    value={formData.feedbackFor}
                    onChange={handleChange}
                  >
                    <option value="0">Select *</option>
                    <option value="1">General</option>
                    <option value="2">Tech Support</option>
                  </select>
                </div>

                <div className="home-new-field">
                  <input
                    type="email"
                    name="email"
                    maxLength={75}
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="home-new-textarea-wrap">
                <p className="home-new-char-limit">
                  {formData.feedback.length}/1000
                </p>

                <textarea
                  name="feedback"
                  placeholder="Feedback* (Maximum of 1000 Character)"
                  maxLength={1000}
                  rows={4}
                  value={formData.feedback}
                  onChange={handleChange}
                />
              </div>

              <div className="home-new-submit-row">
                <button type="submit" className="home-new-submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ===========================
   ✅ FOOTER COMPONENT
=========================== */
function Footer() {
  return (
    <footer className="home-new-footer">
      <div className="home-new-footer-logos">
        <img
          src="https://rera.ap.gov.in/RERA/images/footerlinksimg/AP-STATE.png"
          alt="AP State Portal"
        />
        <img src="https://pgportal.gov.in/images/logo.png" alt="PGRS" />
        <img
          src="https://rera.ap.gov.in/RERA/images/footerlinksimg/core.png"
          alt="CORE"
        />
        <img
          src="https://rera.ap.gov.in/RERA/images/footerlinksimg/eOffice.png"
          alt="eOffice"
        />
        <img
          src="https://rera.ap.gov.in/RERA/images/footerlinksimg/india_gov_logo.png"
          alt="India Gov"
        />
      </div>

      <div className="home-new-footer-policy">
        <span>Privacy Policy</span>
        <span>› Hyperlinking Policy</span>
        <span>› Copyright Policy</span>
        <span>› Disclaimer</span>
        <span>› Accessibility</span>
        <span>› Terms & Conditions</span>
        <span>› Site Map</span>
        <span>› Rate our website</span>

        <div className="home-new-social-icons">
          <span className="fb">f</span>
          <span className="tw">t</span>
          <span className="yt">▶</span>
        </div>
      </div>

      <div className="home-new-footer-bottom">
        <div className="home-new-left">© 2017, All Rights Reserved by APRERA, Govt of A.P. India</div>
        <div className="home-new-center">
          <span>No. Of Visitors : </span>
          <b>940905</b>
        </div>
        <div className="home-new-right">
          Last Updated on : 22/12/2025 17:14:45 <br />
          Designed and Developed by <b>APOnline</b>
        </div>
      </div>
    </footer>
  );
}

/* ===========================
   ✅ MAIN SINGLE PAGE EXPORT
=========================== */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />        {/* Registration */}
      <Publicnotice />   {/* Our Philosophy cards */}
      <Statics />        {/* 👈 NEW Dashboard stats */}
      {/* <Philosophy /> */}  
      {/* <Dashboard /> */}
      <Expertise />
      <Learning />
      <Feedback />
      {/* <Footer /> */}
    </>
  );
}