import React from "react";
import "../styles/AdvertisementGuidelines.css";
import guidelineImage from "../../public/assets/images/Annexure.jpg";
import Annexure from "../../public/assets/pdfs/Annexure.pdf";


const AdvertisementGuidelines = () => {
  return (
    <div className="ad-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        You are here : <span>Home</span> / <span>Promotions</span> /{" "}
        <span className="active">Advertisement Guidelines</span>
      </div>

      <div className="content-wrapper">
        <h2 className="main-title">
          PROVISIONS OF THE REAL ESTATE (REGULATION AND DEVELOPMENT) ACT, 2016
        </h2>
        <h3 className="sub-title">
          FOR ADVERTISEMENT OF REAL ESTATE PROJECTS
        </h3>

        {/* Sections */}
        <h4 className="section-title">ADVERTISEMENT WITH REGISTERED NUMBER ONLY</h4>
        <p>
          Under section 3(1) of the Act, No promoter shall advertise, market,
          book, sell or offer for sale, or invite persons to purchase in any
          manner any plot, apartment or building in any Real Estate Project
          without registering the Real Estate Project with the Real Estate
          Regulatory Authority established under the Act.
        </p>

        <h4 className="section-title">NO FALSE FACTS TO BE ADVERTISED</h4>
        <p>
          After registration of the Project, the promoter can advertise his/her
          project via any sort of media like brochures, pamphlets, etc.
          Advertisements published for inviting buyers shall be truthful and
          based on the facts as have been revealed to the authority and strictly
          no exaggeration or misinterpretation which may create a biased
          impression in the minds of buyers.
        </p>

        <h4 className="section-title">REGISTERED NUMBER TO BE DISPLAYED</h4>
        <p>
          Under section 11(1)(a) and (2) of the Act it is compulsory for the
          promoter to mention the registration number of the project provided by
          the authority on the website as well as on any advertisement. The
          promoter must display the “RERA REGISTERED” details in all their
          advertisements.
        </p>

        <h4 className="section-title">
          COPY OF THE BROCHURE TO BE SUBMITTED TO THE AUTHORITY
        </h4>
        <p>
          Under section 11(2) of the Act a copy of the prospectus or brochure or
          any pamphlet which information relating to the project is sought to be
          conveyed to the allottees or prospective buyers shall be submitted to
          the authority before print/circulate.
        </p>

        <h4 className="section-title">
          GUIDELINES FOR DISPLAY OF “RERA REGISTERED” STAMP
        </h4>

        {/* Red Border Image Box */}
        <div className="image-box">
          <img
            src={guidelineImage}
            alt="RERA Registered Stamp Guidelines"
          />
        </div>

        {/* Downloads */}
        <h4 className="section-title">DOWNLOADS</h4>

        <table className="downloads-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Document</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>AP RERA Authorized Stamp</td>
              <td>
                <a className="download-btn" href="/downloads/AP_RERA_authorised_stamp(1).zip" download >⬇️</a>
                {/* <button className="download-btn" >⬇️</button> */}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Where to show RERA registered stamp</td>
              <td>
                <button className="download-btn" onClick={() => window.open(Annexure, "_blank")}>⬇️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertisementGuidelines;