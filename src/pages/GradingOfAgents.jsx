import React from "react";
import "../styles/GradingOfAgents.css";

const GradingOfAgents = () => {
  return (
    <div className="zpage-wrapper">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        You are here : <span>Home</span> / <span>Promotions</span> /{" "}
        <span className="active">Grading of Agents</span>
      </div>

      {/* Content Box */}
      <div className="content-box">
        <h2 className="page-title">Grading Of Agents</h2>

        {/* Need */}
        <h3 className="section-title">Need</h3>
        <p className="content-text">
          In current real estate market, real estate agents play a major role in
          influencing the decision making of consumer/home buyer regarding the
          selection of project in which they want to invest their hard earned
          money. It is difficult for the consumer/homebuyer to select a real
          estate agent whom he can trust and who has an efficient track record.
          Most of the time consumer/home buyers select Real estate agents based
          on the reviews given by our friends and known people, but there is
          lack of objective credibility measurement of the agent. With RERA in
          place all the real estate agents need to register, be verified and
          certified, in order to facilitate a real estate transaction.
          Simultaneously, APRERA will grade the real estate agents based on the
          documents and information submitted by them during the process of
          registration. This will improve the overall transparency and
          accountability in the sector.
        </p>

        {/* Advantages */}
        <h3 className="section-title">Advantages</h3>

        <h4 className="sub-title">To Real Estate Agents</h4>
        <ul className="bullet-list">
          <li>Building Trust among buyers</li>
          <li>
            Promotes credibility when compared with other real estate agents in
            the state
          </li>
        </ul>

        <h4 className="sub-title">To Buyers</h4>
        <ul className="bullet-list">
          <li>
            Helps in decision making through comparison of various Real estate
            agents in a region
          </li>
          <li>Get genuine information on the project</li>
        </ul>

        {/* Approach */}
        <h3 className="section-title">Approach</h3>
        <p className="content-text">
          APRERA will collect the information and documents submitted by Real
          estate agents for registration and analyze them based on the set
          parameters. The primary focus is to determine the credibility real
          estate agent. After analyzing the set parameters, a rating will be
          assigned and the real estate agent would be under surveillance
          throughout his/her tenure.
        </p>

        {/* Parameters */}
        <h3 className="section-title">Parameters</h3>

        <h4 className="sub-title">Real Estate Agent track record</h4>
        <ul className="bullet-list">
          <li>
            Previous projects for which sale has been facilitated by the agent
          </li>
          <li>Partners details</li>
        </ul>

        <h4 className="sub-title">Legal Clearance</h4>
        <ul className="bullet-list">
          <li>Legal cases</li>
        </ul>

        <h4 className="sub-title">Financial stability</h4>
        <ul className="bullet-list">
          <li>IT returns and balance sheet</li>
        </ul>
      </div>
    </div>
  );
};

export default GradingOfAgents;