import "../styles/Certificate.css";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";

const Certificate = () => {
 const location = useLocation();
const project = location.state?.projectData;

if (!project) {
  return <h2>Certificate Data Not Available</h2>;
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};


  /* ============================= */
  /* ✅ CLEAN PRINT (NO BACK PAGE) */
  /* ============================= */
  const handlePrint = () => {
    const content = document.getElementById("certificate-print");
    

    if (!content) {
      alert("Certificate not found");
      return;
    }
   
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Certificate</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 20mm;
            }
            body {
              font-family: "Times New Roman", Times, serif;
              margin: 0;
              padding: 0;
            }
            .c-cert-paper {
              width: 210mm;
              margin: auto;
            }
            .c-cert-header {
              text-align: center;
            }
            .c-cert-logo {
              width: 85px;
              margin-bottom: 6px;
            }
            .c-cert-title {
              font-weight: bold;
              font-size: 15px;
            }
            .c-cert-date-row {
              text-align: right;
              font-size: 13px;
              font-weight: bold;
            }
            .c-reg-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .c-reg-text {
              width: 70%;
            }
            .c-reg-box {
              display: inline-flex;
              border: 1px solid #000;
            }
            .c-reg-box span {
              padding: 6px 9px;
              border-right: 1px solid #000;
            }
            .c-reg-box span:last-child {
              border-right: none;
            }
            .c-main-list {
              padding-left: 20px;
            }
            .c-roman-list {
              list-style-type: lower-roman;
              padding-left: 35px;
            }
            .c-cert-sign {
              margin-top: 40px;
              text-align: right;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="c-cert-paper">
            ${content.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
    };
  };

  /* ============================= */
  /* ✅ DIRECT PDF DOWNLOAD */
  /* ============================= */
  const handleDownload = () => {
    const element = document.getElementById("certificate-print");

    html2pdf()
      .set({
        margin: 10,
        filename: "APRERA_Extension_Certificate.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .from(element)
      .save();
  };

  return (
    <div className="c-cert-page">

      {/* CERTIFICATE */}
      <div className="c-cert-paper" id="certificate-print">

        {/* HEADER */}
        <div className="c-cert-header">
          <img
            src="/assets/images/logo.jpg"
            alt="AP RERA"
            className="c-cert-logo"
          />
          <div className="c-cert-title">
            CERTIFICATE FOR EXTENSION OF REGISTRATION OF PROJECT
          </div>
        </div>

        {/* DATE */}
        <div className="c-cert-date-row">
          Dated: As per digital signature
        </div>

        <hr />

        {/* REGISTRATION */}
        <div className="c-reg-row">
          <p className="c-reg-text">
            This extension of registration is granted under section 6 of the Act,
            with project registration No.
          </p>

          <div className="c-reg-box">
          {project.application_number.split("").map((v,i)=>(
  <span key={i}>{v}</span>
))}

          </div>
        </div>

        <p>
          The registration is granted under section 5 of the Act with registration
          period from<b>{formatDate(project.validity_from)}</b> to{" "}
<b>{formatDate(project.validity_to)}</b>

        </p>

        <p><b>Project Name :</b>{project.project_name} </p>
        <p><b>Promoter Name :</b> {project.promoter_name}</p>

        <p>
          <b>Project Address :</b>  {project.project_address1},{" "}
  {project.project_pincode}
        </p>

        {/* CONDITIONS */}
        <ol className="c-main-list">
          <li>
            <b>{project.promoter_name}</b>, having its registered office/principal
            place of business at H No. 6/254, 6<sup>th</sup> Block,
            5<sup>th</sup> Floor, 533342, Anaparthi(V), Anaparthi(M),
            East Godavari(D), has applied for extension of project registration.
          </li>
          <li>
             This renewal of registration is granted subject to the following
            conditions, namely:-
            <ol className="c-roman-list">
              <li>The promoter shall execute and register a conveyance deed in favour
                of the allottee or the association of the allottees, as the case may be,
                of the apartment or the common areas as per section 17..</li>
              <li>The promoter shall deposit seventy percent of the amounts realized
                by the promoter in a separate account to be maintained in a scheduled
                bank to cover the cost of construction and the land cost to be used
                only for that purpose as per sub-clause (D) of clause (1) of
                sub-section (2) of section 4.</li>
              <li> The registration shall be valid for a period of <b>one</b> year
                commencing from  <b>{formatDate(project.new_validity_from)}</b> and ending with{" "}
                <b>{formatDate(project.new_validity_to)}</b> unless renewed by the Real Estate Regulatory
                Authority in accordance with section 6 read with rule 7 of the Act.</li>
              <li>The promoter shall comply with the provisions of the Act and the
                rules and regulations made thereunder.</li>
              <li>The promoter shall not contravene the provisions of any other law
                for the time being in force in the area where the project is being
                developed.</li>
              <li>If the above mentioned conditions are not fulfilled by the promoter,
                the regulatory authority may take necessary action against the
                promoter including revoking the registration granted herein, as per
                the Act and the rules and regulations made thereunder.</li>
            </ol>
          </li>
        </ol>

        {/* SIGNATURE */}
        <div className="c-cert-sign">
          Signature of the Regulatory Authority <br />
          AP Real Estate Regulatory Authority
        </div>

      </div>

      {/* BUTTONS */}
      <div className="c-cert-actions">
        <button className="c-print-btn" onClick={handlePrint}>
          Print
        </button>
        <button className="c-download-btn" onClick={handleDownload}>
          Download
        </button>
      </div>

    </div>
  );
};

export default Certificate;