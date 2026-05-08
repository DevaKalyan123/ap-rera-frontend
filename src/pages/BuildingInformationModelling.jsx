import React from "react";
import { Link } from "react-router-dom";
import "../styles/LearningPages.css";

export default function BuildingInformationModelling() {
  return (
    <section className="homeview-learning-page">
      {/* ✅ Breadcrumb */}
      <div className="homeview-gap-zone"></div>
      <div className="homeview-breadcrumb-bar">
        <span className="homeview-bread-text">You are here :</span>
        <Link className="homeview-bread-link" to="/">Home</Link>
        <span className="homeview-bread-slash">/</span>
        <span className="homeview-bread-current">Building Information Modelling</span>
      </div>

      <div className="homeview-page-container">
        <h1 className="homeview-page-title">Building Information Modelling</h1>
        <div className="homeview-page-line"></div>
        

        <p className="homeview-page-para">
          BIM or Building Information Modelling is a process for creating and managing information
          on a construction project across the project lifecycle. One of the key outputs of this
          process is the Building Information Model, the digital description of every aspect of the
          built asset. This model draws on information assembled collaboratively and updated at key
          stages of a project. Creating a digital Building Information Model enables those who
          interact with the building to optimize their actions, resulting in a greater whole life
          value for the asset.
        </p>

        <p className="homeview-page-para">
          BIM data can be used to illustrate the entire building life-cycle, from cradle to cradle,
          from inception and design to demolition and materials reuse. Spaces, systems, products and
          sequences can be shown in relative scale to each other and, in turn, relative to the entire
          project. And by signaling conflict detection BIM prevents errors creeping in at the various
          stages of development/ construction.
        </p>

        <h2 className="homeview-page-subtitle">CHALLENGES OF INDIAN REAL ESTATE SECTOR</h2>

        <p className="homeview-page-para">
          The main challenges faced by Indian building industry are significant schedule and cost
          overrun, which is mainly occurring due to wastage of material, poor coordination, significant
          rework and lack of information sharing. Let us point the main issues faced by firms involved
          in built environment as follows.
        </p>

        <div className="homeview-two-col">
          <ul className="homeview-page-list">
            <li>Changes in design</li>
            <li>Time, work effect consumption</li>
            <li>Higher possibilities for error and rework</li>
            <li>Increasing input costs</li>
            <li>Deficiency of skilled labor that result in high risks for workers</li>
          </ul>

          <ul className="homeview-page-list">
            <li>Construction cost estimations</li>
            <li>Anxieties on the quality and productivity of the project</li>
            <li>Lack of organization of market</li>
            <li>Rare virtual environment work</li>
          </ul>
        </div>

        <h2 className="homeview-page-subtitle">INFLUENCE OF TECHNOLOGY IN REAL ESTATE SECTOR</h2>

        <p className="homeview-page-para">
          The bigger challenges faced by Real estate sector can be solved up to a limit with the
          emergence of technologies like BIM models. A lot of different IT-enabled project management
          tools have been introduced in the real estate market and the industry can ensure more
          efficient project delivery with the help of these technological tools. Such technologies can
          act as a catalyst to change the real estate companies in India and redefine their space in
          the country for both now and in the future. They can make tremendous changes in all areas
          like construction, project management, business management, marketing and customer service etc
        </p>

        <h1 className="homeview-page-bigtitle">How BIM modeling benefits to real estate sector</h1>
        <div className="homeview-page-line"></div>

        <h2 className="homeview-page-subtitle">BETTER OUTPUT THROUGH BIM COLLABORATION</h2>
        <p className="homeview-page-para">
          BIM creates a collaborative working relationship among all project partners including various
          design disciplines, contractor, specialists, suppliers and customer, using a single shared 3D model...
        </p>

        <h2 className="homeview-page-subtitle">OPTIMIZED PERFORMANCE</h2>
        <p className="homeview-page-para">
          As swift and accurate comparison between various design options is possible with BIM, it can
          develop more efficient, sustainable and cost-effective solutions.
        </p>

        <h2 className="homeview-page-subtitle">BETTER FORECAST</h2>
        <p className="homeview-page-para">
          Using BIM, project team can build the project in a virtual environment before construction started...
        </p>

        <h2 className="homeview-page-subtitle">QUICK PROJECT TURNAROUND</h2>
        <p className="homeview-page-para">
          As BIM allows changes in design concept in early stage of the project, last minute design changes can be avoided...
        </p>

        <h2 className="homeview-page-subtitle">ENHANCED SAFETY MEASURES</h2>
        <p className="homeview-page-para">
          The designs using BIM can optimize public safety with the help of crowd behaviors and fire modeling capability...
        </p>

        <h2 className="homeview-page-subtitle">ELIMINATION OF ERRORS AT EARLY DESIGN STAGE</h2>
        <p className="homeview-page-para">
          The single 3D model can integrate multidisciplinary design inputs that enable to identify and resolve interface issues...
        </p>

        <h1 className="homeview-page-bigtitle">Scope of using BIM to link property data in RERA</h1>
        <div className="homeview-page-line"></div>

        <p className="homeview-page-para">
          Building information modelling (BIM) offers rich opportunities for all the varied property professionals to use
          information throughout the property life cycle...
        </p>

        <h1 className="homeview-page-bigtitle">Vendors in Building Information Modeling Software</h1>
        <div className="homeview-page-line"></div>

        <div className="homeview-vendor-grid">
          <div className="homeview-vendor-col">
            <h3 className="homeview-vendor-title">Architecture</h3>
            <ul className="homeview-vendor-list">
              <li>Autodesk Revit Architecture</li>
              <li>Graphisoft ArchiCAD</li>
              <li>Nemetschek Allplan Architecture</li>
              <li>Gehry Technologies - Digital Project Designer</li>
              <li>Nemetschek Vectorworks Architect</li>
              <li>Bentley Architecture</li>
              <li>4MSA IDEA Architectural Design (IntelliCAD)</li>
              <li>CADSoft Envisioneer</li>
              <li>Softtech Spirit</li>
              <li>RhinoBIM (BETA)</li>
            </ul>

            <h3 className="homeview-vendor-title">Sustainability</h3>
            <ul className="homeview-vendor-list">
              <li>Autodesk Ecotect Analysis</li>
              <li>Autodesk Green Building Studio</li>
              <li>Graphisoft EcoDesigner</li>
              <li>IES Solutions Virtual Environment VE-Pro</li>
              <li>Bentley Tas Simulator</li>
              <li>Bentley Hevacomp</li>
              <li>DesignBuilder</li>
            </ul>
          </div>

          <div className="homeview-vendor-col">
            <h3 className="homeview-vendor-title">Structures</h3>
            <ul className="homeview-vendor-list">
              <li>Autodesk Revit Structure</li>
              <li>Bentley Structural Modeler</li>
              <li>Bentley RAM, STAAD and ProSteel</li>
              <li>Tekla Structures</li>
              <li>CypeCAD</li>
              <li>Graytec Advance Design</li>
              <li>StructureSoft Metal Wood Framer</li>
              <li>Nemetschek Scia</li>
              <li>4MSA Strad and Steel</li>
              <li>Autodesk Robot Structural Analysis</li>
            </ul>

            <h3 className="homeview-vendor-title">MEP</h3>
            <ul className="homeview-vendor-list">
              <li>Autodesk Revit MEP</li>
              <li>Bentley Hevacomp Mechanical Designer</li>
              <li>4MSA FineHVAC + FineLIFT + FineELEC + FineSANI</li>
              <li>Gehry Technologies - Digital Project MEP Systems Routing</li>
              <li>CADMEP (CADduct / CADmech)</li>
            </ul>
          </div>
        </div>

        <div className="homeview-vendor-grid" style={{ marginTop: "40px" }}>
          <div className="homeview-vendor-col">
            <h3 className="homeview-vendor-title">
              Construction (Simulation, Estimating and Const. Analysis)
            </h3>
            <ul className="homeview-vendor-list">
              <li>Autodesk Navisworks</li>
              <li>Solibri Model Checker</li>
              <li>Vico Office Suite</li>
              <li>Vela Field BIM</li>
              <li>Bentley ConstrucSim</li>
              <li>Tekla BIMSight</li>
              <li>Glue (by Horizontal Systems)</li>
              <li>Synchro Professional</li>
              <li>Innovaya</li>
            </ul>
          </div>

          <div className="homeview-vendor-col">
            <h3 className="homeview-vendor-title">Facility Managment</h3>
            <ul className="homeview-vendor-list">
              <li>Bentley Facilities</li>
              <li>FM:Systems FM:Interact</li>
              <li>Vintocon ArchiFM (For ArchiCAD)</li>
              <li>Onuma System</li>
              <li>EcoDomus</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}