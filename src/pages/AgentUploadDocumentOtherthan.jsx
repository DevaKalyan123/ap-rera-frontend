import { useState, useEffect } from "react";
import "../styles/AgentUploadDocumentOtherthan.css";
import { useNavigate, useLocation } from "react-router-dom";
import AgentStepper from "../components/AgentStepper";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default function AgentUploadDocumentOtherthan() {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    application_id,
    organisation_id,
    pan_card_number,
  } = location.state || {};

  const [files, setFiles] = useState({
    year1: null,
    year2: null,
    year3: null,
    year1Url: null,
    year2Url: null,
    year3Url: null
  });

  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState("");

  console.log("📦 LOCATION STATE FULL:", location.state);

  /* ================= FETCH EXISTING DATA ================= */

  useEffect(() => {

    if (!organisation_id) return;

    const fetchExistingData = async () => {

      try {

        const res = await axios.get(
          `${BASE_URL}/api/agent/other-than-individual/details`,
          {
            params: { organisation_id }
          }
        );

        const result = res.data;

        if (result.status !== "success") return;

        const org = result.organisation || {};

        setFiles(prev => ({
          ...prev,
          year1Url: org.itr_year1_doc || null,
          year2Url: org.itr_year2_doc || null,
          year3Url: org.itr_year3_doc || null
        }));

      } catch (err) {
        console.error("ITR fetch error:", err);
      }

    };

    fetchExistingData();

  }, [organisation_id]);

  /* ================= FILE CHANGE ================= */

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setShowError("Only PDF documents are allowed");
      e.target.value = "";
      return;
    }

    setFiles(prev => ({
      ...prev,
      [e.target.name]: file
    }));

  };

  /* ================= DOWNLOAD FILE ================= */

  const downloadFile = (file) => {

    const url = URL.createObjectURL(file);

    const link = document.createElement("a");

    link.href = url;
    link.download = file.name;

    link.click();

    URL.revokeObjectURL(url);

  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {

    setShowError("");

    if (!files.year1 && !files.year1Url) {
      setShowError("Please Upload Income Tax Return Acknowledgement of Year 1");
      return;
    }

    if (!files.year2 && !files.year2Url) {
      setShowError("Please Upload Income Tax Return Acknowledgement of Year 2");
      return;
    }

    if (!files.year3 && !files.year3Url) {
      setShowError("Please Upload Income Tax Return Acknowledgement of Year 3");
      return;
    }

    if (!agreed) {
      alert("Please check the Self Declaration");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("application_id", application_id);
      formData.append("id", organisation_id);
      formData.append("pan_card_number", pan_card_number);

      formData.append("itr_year1", files.year1);
      formData.append("itr_year2", files.year2);
      formData.append("itr_year3", files.year3);

      const res = await fetch(
        `${BASE_URL}/api/agent/other-than-individual/itr`,
        {
          method: "PATCH",
          body: formData
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setShowError(data.message || "Upload failed");
        return;
      }

      alert("ITR Documents Uploaded Successfully ✅");

      navigate("/preview-other", {
        state: {
          application_id,
          organisation_id,
          pan_card_number,
        },
      });

    } catch (err) {
      console.error(err);
      setShowError("Server error. Try again later.");
    }

  };

  /* ================= UI ================= */

  return (

    <div className="zagentud-page-wrapper">

      <div className="zagentud-breadcrumb">
        You are here : <a href="/">Home</a> / Registration / <strong>Real Estate Agent Registration</strong>
      </div>

      <div className="zagentud-container">

        <h2 className="zagentud-heading">Real Estate Agent Registration</h2>

        <AgentStepper
          currentStep={1}
          applicationId={application_id}
          organisationId={organisation_id}
          panCardNumber={pan_card_number}
        />

        <h3 className="zagentud-section-heading">Upload Documents</h3>

        <p className="zagentud-note">
          <strong>Note :</strong> If the entity is registered below 3 years period and if the IT returns are not available for 3 years period agent has to upload the available IT returns.
        </p>

        {showError && (
          <div className="zagentud-inline-error">
            <span>{showError}</span>
            <button
              type="button"
              className="zagentud-inline-error-close"
              onClick={() => setShowError("")}
            >
              ✕
            </button>
          </div>
        )}

        <table className="zagentud-table">

          <thead>
            <tr>
              <th>Document Name</th>
              <th>Upload Document</th>
              <th>Uploaded Document</th>
            </tr>
          </thead>

          <tbody>

            {/* YEAR 1 */}

            <tr>
              <td>Income Tax Return Acknowledgement Year 1 *</td>

              <td>
                <input
                  type="file"
                  name="year1"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </td>

              <td>

                {files.year1 ? (

                  <span
                    onClick={() => downloadFile(files.year1)}
                    style={{ cursor: "pointer", color: "#1e90ff", textDecoration: "underline" }}
                  >
                    {files.year1.name}
                  </span>

                ) : files.year1Url ? (

                  <a
                    href={`${BASE_URL}/api/${files.year1Url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Uploaded File
                  </a>

                ) : "-"}

              </td>

            </tr>

            {/* YEAR 2 */}

            <tr>
              <td>Income Tax Return Acknowledgement Year 2 *</td>

              <td>
                <input
                  type="file"
                  name="year2"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </td>

              <td>

                {files.year2 ? (

                  <span
                    onClick={() => downloadFile(files.year2)}
                    style={{ cursor: "pointer", color: "#1e90ff", textDecoration: "underline" }}
                  >
                    {files.year2.name}
                  </span>

                ) : files.year2Url ? (

                  <a
                    href={`${BASE_URL}/api/${files.year2Url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Uploaded File
                  </a>

                ) : "-"}

              </td>

            </tr>

            {/* YEAR 3 */}

            <tr>
              <td>Income Tax Return Acknowledgement Year 3 *</td>

              <td>
                <input
                  type="file"
                  name="year3"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </td>

              <td>

                {files.year3 ? (

                  <span
                    onClick={() => downloadFile(files.year3)}
                    style={{ cursor: "pointer", color: "#1e90ff", textDecoration: "underline" }}
                  >
                    {files.year3.name}
                  </span>

                ) : files.year3Url ? (

                  <a
                    href={`${BASE_URL}/api/${files.year3Url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Uploaded File
                  </a>

                ) : "-"}

              </td>

            </tr>

          </tbody>

        </table>
        <div className="zagentud-declaration">
          <h3 className="zagentud-section-heading">Declaration</h3>
          <div className="zagentud-declaration-row">
            <label className="zagentud-declaration-text">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span> I/We </span> <input type="text" className="zagentud-declaration-input" /> <span> solemnly affirm and declare that the particulars given above are correct to my/our knowledge and belief. </span>
            </label>
          </div>
        </div>
        <div className="zagentud-declaration">



          <div className="zagentud-declaration-actions">

            <button
              className="zagentud-btn-primary"
              onClick={handleSubmit}
            >
              Save And Continue
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}