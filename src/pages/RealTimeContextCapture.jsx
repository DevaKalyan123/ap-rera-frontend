import React from "react";
import { Link } from "react-router-dom";
import "../styles/rtcPage.css";

export default function RealTimeContextCapture() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="rtc-page">

      {/* Breadcrumb */}
       <div className="homeview-gap-zone"></div>
           <div className="homeview-breadcrumb-bar">
             <span className="homeview-bread-text">You are here :</span>
             <Link className="homeview-bread-link" to="/">Home</Link>
             <span className="homeview-bread-slash">/</span>
             <span className="homeview-bread-current">Real Time Context Capture Using Drones</span>
           </div>

      {/* Content */}
      <div className="rtc-container">

        <h1 className="rtc-title">Real Time Context Capture Using Drones</h1>
        <div className="rtc-line"></div>

        <p className="rtc-para">
         Drones are highly effective at surveying, 3D modeling, performing inspections for 
         safety and in places that are difficult or dangerous to reach, and giving real-time
          progress updates on a job site."Capturing site data today is costly, time-consuming 
          and often dangerous. Drones can easily go where it's inefficient or unsafe for field 
          personnel, making it easier to accurately measure our world so we can better manage it.
        </p>

        <p className="rtc-para">
          Capturing site data today is costly, time-consuming and often dangerous.
          Drones can easily go where it's inefficient or unsafe for field personnel.
        </p>

        <h1 className="rtc-bigtitle">Uses For Drones In Construction Projects</h1>
        <div className="rtc-line"></div>

        <h2 className="rtc-subtitle">Drone For Surveying</h2>

        <p className="rtc-para">
         You can use drones to quickly survey your job site and build maps. 
         Instead of using human resources, heavy machinery & expensive surveying tools,
          that produce complex data, you can get the job done in half the time & money, 
          with greater accuracy. his makes the task of creating very accurate maps and 
          providing valuable data to numerous companies much easier. Information that you
           acquire can be uploaded right away to a server, where it can be accessed by individuals
            all over the globe who you allow authorization.Drones can reach high-risk areas and 
            tightly-squeezed in locations that are quite a bit harder to reach with a human crew.
            Project managers can also opt to use 3D laser scanners that fly over the designated 
            region and give the surveyor quality images of what the terrain appears like.This data 
            is then used in a process called GIS mapping, which creates a digital map through a mix 
            of statistical analysis and cartography. These maps have a very high definition and allow for the viewing of very specific information about an area that's easy for the manager to access.As many national entities will soon offer delivery via drone, proprietors who are in the business of getting their goods quickly to customers will stand up and 
         take notice of regulations that may change drastically in the days to come.
        </p>

        <p className="rtc-para">
         Models such as high-resolution 3d types use browser-based technology so users can simply share by sending a link, and the client can then log in, view the data, and export it to any local entities if they need.For work on structures such as dikes and dirt containment, this is one way to very easily visualize the progress of the very important duties.
        </p>

        <h2 className="rtc-subtitle">Analyzing the Data</h2>

        <p className="rtc-para">
         Models such as high-resolution 3d types use browser-based technology so users can simply share by sending a link, and the client can then log in, view the data, and export it to any local entities if they need.For work on structures such as dikes and dirt containment, this is one way to very easily visualize the progress of the very important duties.</p>

        <h2 className="rtc-subtitle">Showing Clients the Progress</h2>

        <p className="rtc-para">
        When clients stay away from the job site and cannot afford to come to the site again & again & your current pictures are just not doing justice, drones can be an inventive way to show clients the progress of building, renovation, or inspection.If clients are not able to come view the job site regularly, drones are very helpful in providing a visual standpoint that they wouldn't have seen from the ground.It is not just the task of showing the client what is happening if they can't be there, it can also help with projects that haven't even begun yet.Drones do a great job of giving designers and architects an idea of what putting an adjacent structure up will look like, and how the aesthetics will change a very large project in a community in regards to open space on the ground and upwards.</p>

        <h2 className="rtc-subtitle">Monitoring Job Sites</h2>

        <p className="rtc-para">
          When you have to frequently shuttle between multiple job sites, or have taken up simultaneous renovation & facelift for multiple properties; putting up a drone to monitor the progress, work, safety standards and much more can save you a lot of energy, time & money.When your workers are on a job site, the main objective that any project manager could wish for is keeping them productive. It is understandable that energy levels will ebb and flow, but you can also detect if any equipment shows up missing, or if other areas may need more workers designated to them for special accommodations.If safety standards are one of the elements you are trying to monitor, one important aspect to keep in mind is that you will be flying a bit low to the ground..
        </p>

        <h2 className="rtc-subtitle">Better Safety Records</h2>

        <p className="rtc-para">
          With your eyes & ears in the sky, all the time, you will be in a much better position to locate that unstable pillar, precariously balanced laborer and not deep enough excavations. If, you keep up the drone - survey, gradually you will build an excellent safety system and your reputation.Drones in construction can do a great job of hovering over a location that is too dangerous for a worker to get to, and can save lives by monitoring workplace conditions in areas that are very hard to reach. In manufacturing plants, drones can help with reconnaissance, sending images of what kind of conditions can be expected before a worker is dispatched
        </p>
      </div>

      {/* Scroll to top */}
      <button className="rtc-scroll-btn" onClick={scrollTop}>⬆</button>
    </section>
  );
}