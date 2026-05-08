// src/components/ChronologyOfEvents.jsx
import React from "react";
import "../styles/ChronologyOfEvents.css";

const events = [
  { date: "10th March 2016", text: "RERA bill passed in Rajyasabha", side: "left", color: "blue" },
  { date: "15th March 2016", text: "RERA bill passed in Loksabha", side: "right", color: "red" },
  { date: "25th March 2016", text: "Act of Parliament received the assent/approval of the President", side: "left", color: "orange" },
  { date: "28th March 2016", text: "Gazette Published", side: "right", color: "green" },
  { date: "27th April 2016", text: "Notification regarding commencement of Act", side: "left", color: "blue" },
  { date: "01st May 2016", text: "Commencement of ACT with 69 sections out of 92 sections", side: "right", color: "red" },
  { date: "31st October 2016", text: "Rules prescribed by the state government", side: "left", color: "orange" },
  { date: "27th March 2017", text: "APRERA Rules 2017 notified", side: "right", color: "green" },
  { date: "27th April 2017", text: "Notified all sections of Act implemented", side: "left", color: "blue" },
  { date: "01st May 2017", text: "Interim authority constituted", side: "right", color: "red" },
  { date: "01st May 2017", text: "Full implementation of all sections in Act", side: "left", color: "orange" },
  { date: "31st July 2017", text: "Regulation should be approved by state government (3 months after Authority established)", side: "right", color: "green" },
  { date: "31st July 2017", text: "Submission of ongoing projects", side: "left", color: "blue" },
  { date: "5th Feb 2018", text: "Online APRERA Application for all Registrations", side: "right", color: "red" },
  { date: "30th April 2018", text: "Deadline for Amendment of Act", side: "left", color: "orange" }
];

const ChronologyOfEvents = () => {
  return (
    <div className="timeline-page">
      <div className="breadcrumb">
        You are here : <span>Home</span> / <span>Knowledge Hub</span> /{" "}
        <span className="active">Chronology of Events</span>
      </div>

      <div className="timeline-wrapper">
        <h2>APRERA - Chronology of Events</h2>
        <h4 className="timeline-subtitle">Time Line for RERA</h4>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {events.map((e, i) => (
            <div key={i} className={`timeline-row ${e.side}`}>
              <div className={`event-box ${e.color}`}>
                {e.text}
              </div>

              <div className={`event-circle ${e.color}`}>
                {e.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChronologyOfEvents;