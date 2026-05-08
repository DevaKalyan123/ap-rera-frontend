import React from "react";
import "../styles/ACF.css";

export default function Acf() {
  return (
    <div className="acf-wrapper">
      <div className="acf-container">
        {/* Breadcrumb */}
        <div className="acf-breadcrumb">
          You are here : <span>Home</span> / <span>Promotions</span> /{" "}
          <strong>ACF</strong>
        </div>
        <div className="act-textcontaint">
        {/* Title */}
        <h2 className="acf-page-title">ACF (Amicable Conciliation Forum)</h2>
        <div className="acf-title-underline"></div>

        {/* Content */}
        <p>
          ACF Alternate Disputes Redressal System to settle the disputes between
          promoter and allottee.
        </p>

        <p>
          As per Section 32 (g) of the Real Estate (Regulation and Development)
          Act 2016, APRERA Real Estate Regulatory Authority must take measures to
          facilitate amicable conciliation of disputes between the promoters
          and the allottees through dispute settlement forums set up by the
          consumer or promoter associations.
        </p>

        <p>
          With this objective, it was proposed to establish APRERA - ACF
          (Amicable Conciliation Forum) that shall facilitate resolution of
          disputes amicably, thereby saving cost and time of litigation to
          parties and State, promoting greater public satisfaction with legal
          system and dispute resolution.
        </p>

        <p>
          Under the mechanism of the Forum, if the parties don’t reach a
          consensus, the allottee(s) will have the possibility to lodge a formal
          complaint against the builder via APRERA Portal.
        </p>

        {/* Objectives */}
        <h3 className="acf-section-title">
          The objectives of the APRERA - ACF (Amicable Conciliation Forum) shall
          be as follows:
        </h3>

        <ul className="acf-arrow-list">
          <li>
            Constitute / establish panel of eminent Conciliators representing
            different stakeholder groups.
          </li>
          <li>
            To follow Conciliation rules emanating from best features of common
            and civil law systems after extensive consultation with
            practitioners.
          </li>
          <li>
            To promote and popularize the amicable and effective settlement of
            disputes arising with reference to Real Estate (Regulation and
            Development) Act 2016, with various Alternate Dispute Resolution
            (ADR) mechanism.
          </li>
          <li>
            To popularize conciliation as an effective dispute resolution
            mechanism with moderate cost (cost effective) and speedy settlement
            of commercial disputes.
          </li>
          <li>
            To co-ordinate/assist ADR proceedings by establishing facilities
            and providing administrating services.
          </li>
          <li>Finally providing the best platform for ADR.</li>
        </ul>
        </div>
      </div>
    </div>
  );
}