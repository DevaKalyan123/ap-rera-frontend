
import React, { useState } from "react";
import "../styles/complaintRegistration.css";
import { useNavigate } from "react-router-dom";
// import ComplaintDetails from "./complaintdetails";
import PreviewPage from "./previewpage";
import PaymentPage from "./paymentpage";
//import ComplaintDetails from "./complaintdetails";
import ComplaintDetails from "./complaintDetails";
import ProjectWizard from "../components/ProjectWizard";
/* ================= STEP WIZARD COMPONENT ================= */
function StepWizard({ currentStep }) {
    const steps = [
        "Complaint Registration Details",
        "Preview",
        "Payment",
        "Acknowledgement",
    ];
    return (
        <div className="complaintregistration-stepwizard">
            <div className="complaintregistration-stepwizard-row">
                {steps.map((label, index) => {
                    const step = index + 1;
                    return (
                        <div className="complaintregistration-stepwizard-step" key={step}>
                            <div
                               className={`complaintregistration-step-circle ${
  step <= currentStep ? "complaintregistration-active" : ""
}`}
                            >
                                {step}
                            </div>
                            <p>{label}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default function ComplaintRegistration() {


    const navigate = useNavigate();
    const [showInstructions, setShowInstructions] = useState(true);


    const [currentStep, setCurrentStep] = useState(1);
   const [complaintData, setComplaintData] = useState({
  applicationType: "", // Form M or Form N
});

// ✅ ADD THIS HERE
const complaintSteps = [
  "Complaint Registration Details",
  "Preview",
  "Payment",
  "Acknowledgement",
];



    const [documents, setDocuments] = useState({
        saleAgreement: null,
        feeReceipt: null,
        interimOrder: null,
    });

    const [declaration, setDeclaration] = useState({
        agree1: false,
        agree2: false,
        name: "",
    });

    /* ================= DOWNLOAD FORM (EDITABLE DOC) ================= */
    const downloadForm = (type) => {
        const fileMap = {
            M: "/docx/FORMM.docx",
            N: "/docx/FORMN.docx",
        };

        const link = document.createElement("a");
        link.href = fileMap[type];
        link.setAttribute("download", "");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    /* ================= FILE UPLOAD ================= */
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (!files[0]) return;

        if (files[0].type !== "application/pdf") {
            alert("Only PDF files are allowed");
            return;
        }

        if (files[0].size > 70 * 1024 * 1024) {
            alert("File size must be less than 70MB");
            return;
        }

        setDocuments((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleDeclarationChange = (e) => {
        const { name, checked, value } = e.target;
        setDeclaration((prev) => ({
            ...prev,
            [name]: checked ?? value,
        }));
    };

    /* ================= UI ================= */
    return (
        <div className="complaintregistration-page-wrapper">
            <div className="complaintregistration-container">
                <div className="complaintregistration-breadcrumb">
                    <span>You are here : </span>
                    <a href="/">Home</a> / Registration /{" "}
                    <span>Complaint Registration</span>
                </div>

                <h2 className="compalintregistration-main-heading">Complaint Registration</h2>

              <StepWizard currentStep={currentStep} />



                {/* STEP 1 */}
                {currentStep === 1 && showInstructions && (

                    <div className="complaintregistration-step-box">

                        <h3 className="complaintregistration-section-title">General Instructions :</h3>

                        <ol className="complaintregistration-instruction-list">
                            <li>Clear the cookies before filling the online form</li>
                            <li>Remove pop-up block from your browser</li>
                            <li>
                                All the documents that are to be uploaded in the application should be in
                                PDF format, self-attested (every page of every document) and should not be
                                password protected.
                            </li>
                            <li>
                                Site best viewed in "Google Chrome (Version 62.0.3202.94)"
                            </li>
                            <li>
                                Fields marked with <span className="comaplaintregistration-required">*</span> are mandatory.
                            </li>
                            <li>
                                The Applicants are hereby informed to submit their application either in{" "}
                                <a
                                    href="#"
                                    className="comaplaintregistration-link-text"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        downloadForm("M");
                                    }}
                                >
                                    Form M
                                </a>{" "}
                                or{" "}
                                <a
                                    href="#"
                                    className="comaplaintregistration-link-text"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        downloadForm("N");
                                    }}
                                >
                                    Form N
                                </a>
                            </li>

                            <li>
                                The Complainant is directed to submit the four sets of hard copies filed
                                along with the documentary evidence by mentioning the application number
                                on the top of it to this Authority.
                            </li>
                            <li>
                                The Complainant is also directed to send the other side copies to this
                                Authority along with the documents filed, which enables this Authority
                                to issue notices as per the provision of RERA Act and AP RERA Rules.
                            </li>
                        </ol>

                        <h3 className="complaintregistration-section-title">Guide to fill online registration form :</h3>

                        <ol className="complaintregistration-instruction-list">
                            <li>
                                For step by step understanding of filing online application, kindly refer{" "}
                                <span
                                    className="complaintregistration-link-text"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate("/guidelinesRegistration")}
                                >
                                    Guidelines for Registration
                                </span>
                                page.
                            </li>
                            <li>
                                List of documents required for complaint registration are fee receipt,
                                agreement for sale, interim order and other supporting documents which
                                are proofs of complaint.
                            </li>
                            <li>
                                Select complaint against – (on whom your are going to give complaint
                                i.e respondent)
                            </li>
                            <li>Select complaint by – (complainant)</li>
                            <li>
                                The entire form is divided to various parts with "Save and Continue"
                                facilities for each part
                            </li>
                        </ol>

                     <div className="complaintregistration-application-type">
  <div className="complaintregistration-section-label">
    Application Type
    <span className="complaintregistration-required">*</span>
  </div>

  <div className="complaintregistration-radio-group">
    <label className="complaintregistration-radio-option">
      <input
        type="radio"
        name="applicationType"
        value="FORM_M"
        checked={complaintData.applicationType === "FORM_M"}
        onChange={(e) =>
          setComplaintData((prev) => ({
            ...prev,
            applicationType: e.target.value,
          }))
        }
      />
      <span>Form M</span>
    </label>

    <label className="complaintregistration-radio-option">
      <input
        type="radio"
        name="applicationType"
        value="FORM_N"
        checked={complaintData.applicationType === "FORM_N"}
        onChange={(e) =>
          setComplaintData((prev) => ({
            ...prev,
            applicationType: e.target.value,
          }))
        }
      />
      <span>Form N</span>
    </label>
  </div>
</div>



                        <div className="complaintregistration-cr-footer right">
                            <button
  className="complaintregistration-proceed-btn"
  onClick={() => {
    if (!complaintData.applicationType) {
      alert("Please select Application Type (Form M or Form N)");
      return;
    }
    setShowInstructions(false);
  }}
>
  Proceed
</button>


                        </div>

                    </div>
                )}


                {/* STEP 2 */}
                {currentStep === 1 && !showInstructions && (
                    <ComplaintDetails                        setCurrentStep={setCurrentStep}
                        complaintData={complaintData}
                        setComplaintData={setComplaintData}
                    />
                )}
                {currentStep === 2 && (
                    <PreviewPage
                        complaintData={complaintData}
                        setCurrentStep={setCurrentStep}
                    />
                )}

                {currentStep === 3 && (
                    <PaymentPage
                        complaintData={complaintData}
                        setCurrentStep={setCurrentStep}
                    />
                )}

                {currentStep === 4 && (
                    <AcknowledgementPage
                        complaintData={complaintData}
                    />
                )}


            </div>
        </div>
    );
}