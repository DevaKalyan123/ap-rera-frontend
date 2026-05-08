import "../styles/CidcandAPRERAJointNotification.css";
import Agencies_APRERApdf from "../../public/assets/pdfs/Enlistment_Agencies_APRERA.pdf";
import INSTRUCTIONSpdf from "../../public/assets/pdfs/INSTRUCTIONS_TO_APPLICANTS.pdf";
import INDIVIDUALpdf from "../../public/assets/pdfs/INDIVIDUAL_APPLICATION_FORM.pdf";
import COMMONpdf from "../../public/assets/pdfs/COMMON_APPLICATION_FORM.pdf";
import VENDORjpg from "../../public/assets/images/Vendor_Registration_advertisement.jpeg";

export default function CidcandAPRERAJointNotifications() {
  const documents = [
    { id: 1, name: "Enlistment of Agencies APRERA", file: Agencies_APRERApdf },
    { id: 2, name: "Instructions to Applicants", file: INSTRUCTIONSpdf },
    { id: 3, name: "Individual Application Form", file: INDIVIDUALpdf },
    { id: 4, name: "Common Application Form", file: COMMONpdf },
    { id: 5, name: "Vendor Registration Advertisement", file: VENDORjpg },
  ];

  return (
    <div className="cidc-aprera-page-container">
<div className="cidc-border">
      <div className="cidc-aprera-breadcrumb">
        You are here :
        <span> Home</span> / <span> Notifications</span> /{" "}
        <span> CIDC and APRERA Joint Notifications</span>
      </div>
      <div className="cidc-container">
      <h1 className="cidc-aprera-main-title">
        Notice No. 001/2018 Enlistment/Registration of Agencies of Agencies, Companies, Professionals etc
        to Render the Services to Real Estate, Construction and Infrastructure projects in the state of Andhra Pradesh
      </h1>

      <h2 className="cidc-aprera-section-title">Objective Of Advertisement</h2>

      <div className="cidc-aprera-vendor-db">
        <a href="#" className="cidc-aprera-vendor-blink">
          Vendor Database
        </a>
      </div>

      <p>
        <strong>Andhra Pradesh Real Estate Regulatory Authority (APRERA), </strong>
        an Authority set up under the Real Estate (Regulation & Development) Act,
        2016 has the prime responsibility of regulating the Real Estate business in
        the State of Andhra Pradesh and ensuring that the real estate activities in
        the state are properly regulated and streamlined as per the provisions of the
        act and the subsequent rules/regulations applicable from time to time and
        amendments thereof.
      </p>

      <p>
        Keeping in view the objective of the government to reform the real estate sector
        in Andhra Pradesh and to meet the mandate of APRERA, encouraging greater
        transparency, citizen centricity, accountability and financial discipline,
        applications are invited for enrolment of various agencies, who shall be on the
        approved list of agencies to render the services to Real Estate Projects in State
        of A.P.
      </p>

      <p>
        APRERA has engaged the services of <strong>CIDC Enlistment Division</strong>. for this
        and for complete list of Items / Services required, Criteria for Registration,
        Application Forms and other details please log on to the website
        <a href="https://www.cidcdatabase.com" target="_blank">
          www.cidcdatabase.com
        </a>{" "}
        or{" "}
        <a href="https://rera.ap.gov.in" target="_blank">
          https://rera.ap.gov.in
        </a>
      </p>

      <p>
        There is no fee payble by individual experts, How ever they should be enrolled
        on the National Register of Professional Engineers of ECI in appropriate category.
        the details could be had from{" "}
        <a href="https://www.ecindia.org" target="_blank">
          www.ecindia.org
        </a>
      </p>

      <h2 className="cidc-aprera-section-title">Notification Documents</h2>

      <table className="cidc-aprera-doc-table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Document</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>
                <a href={doc.file} target="_blank">⬇️</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cidc-aprera-section-title">Contact Us</h2>

      <div className="cidc-aprera-contact-box">
        <p className="cidc-aprera-contact-title">
          Enlistment Division (APRERA CELL)
        </p>

        <p className="cidc-aprera-contact-title2">
          <strong>Construction Industry Development Council</strong>
        </p>

        <p>
          801 (8th Floor), Hemkunt Chambers,89, Nehru Place, New Delhi – 110019
        </p>
        <p>
          <strong>Tel:</strong> 011-2623 4770, 2648 9992, 4161 7971
        </p>
        <p>
          <strong>Fax:</strong> 011-2645 1604
        </p>
        <p>
          <strong>Email:</strong> enlistment@cidc.in, enlistmentcidc@gmail.com
        </p>
        <p>
          <strong>Web:</strong> www.cidcdatabase.com & https://rera.ap.gov.in
        </p>
        </div>
      </div>
    </div>
    </div>
  );
}