import React from "react";
import "../styles/evolutionofrera.css";
import evalution from"../../public/assets/images/evalution.jpg";

const timelineData = [
  {
    year: "2016",
    side: "left",
    color: "blue",
    text: "National Conference of Ministers (Housing & Urban Development) held to discuss implementation of RERA across states."
  },
  {
    year: "2016",
    side: "right",
    color: "red",
    text: "Drafting committee constituted by the Chief Secretary to study the RERA Act and frame draft rules."
  },
  {
    year: "2017",
    side: "left",
    color: "orange",
    text: "State Cabinet approved RERA draft rules."
  },
  {
    year: "2017",
    side: "right",
    color: "green",
    text: "The RERA Act, 2016 notified by the State Government."
  },
  {
    year: "2018",
    side: "left",
    color: "blue",
    text: "APRERA authority formally constituted by the Government of Andhra Pradesh."
  },
  {
    year: "2018",
    side: "right",
    color: "red",
    text: "Online registration portal launched for projects and agents."
  },
  {
    year: "2019",
    side: "left",
    color: "orange",
    text: "Rules amended to simplify procedures and strengthen transparency."
  },
  {
    year: "2020",  
    side: "right",
    color: "green",
    text: "Focus on dispute resolution, grading of promoters and agents."
  }
];

const EvolutionOfRera = () => {
  return (
    <div className="evofrera-page-container">

      {/* BREADCRUMB */}
      <div className="evofrera-breadcrumb">
        <span>You are here :</span>
        <span className="evofrera-link"> Home </span> /
        <span className="evofrera-link"> Knowledge Hub </span> /
        <span className="evofrera-active"> Evolution of RERA </span>
      </div>

      {/* INTRO SECTION */}
      <div className="evofrera-intro-section">
        <div className="evofrera-intro-left">
          <h2>Evolution of RERA</h2>
          <div className="evofrera-underline"></div>

          <p>
            The real estate sector plays a catalytic role in fulfilling the need
            and demand for housing and infrastructure in the country. While this
            sector has grown significantly in recent years, it has been largely
            unregulated.
          </p>

          <p>
            Though the Consumer Protection Act, 1986 provided recourse to buyers,
            it was inadequate to address all concerns. Therefore, the need for
            regulating the sector was emphasized, leading to the enactment of
            the Real Estate (Regulation and Development) Act, 2016.
          </p>
        </div>

        <div className="evofrera-intro-right">
          <img src={evalution} alt="Evalutionimg" />
        </div>
      </div>

      {/* TIMELINE */}
      <div className="evofrera-timeline-container">
        <div className="evofrera-timeline-line"></div>

        {timelineData.map((item, index) => (
          <div key={index} className={`evofrera-timeline-item ${item.side}`}>
            <div className={`evofrera-timeline-card ${item.color}`}>
              {item.text}
            </div>
            <div className="evofrera-timeline-year">{item.year}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default EvolutionOfRera;
