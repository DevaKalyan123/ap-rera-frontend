import React, { useMemo } from "react";
import { BASE_URL } from "../api/api";

const ExistingProjectConstructionStatus = ({
  formData,
  handleInputChange,
  handleFileChange,
}) => {

  /* ================= MAP DATA ================= */

  const mappedData = useMemo(() => {

    if (!formData) return {};

    return {

      developmentCompleted:
        formData.developmentCompleted ??
        formData.development_completed ??
        "",

      developmentPending:
        formData.developmentPending ??
        formData.development_pending ??
        "",

      amountCollected:
        formData.amountCollected ??
        formData.amount_collected ??
        "",

      amountSpent:
        formData.amountSpent ??
        formData.amount_spent ??
        "",

      balanceAmount:
        formData.balanceAmount ??
        formData.balance_amount ??
        "",

      planModified:
        String(formData.planModified) === "true",

      projectDelayed:
        String(formData.projectDelayed) === "true",

      architectPath:
        formData.architectCertificate ||
        formData.architect_certificate_path ||
        "",

      engineerPath:
        formData.engineerCertificate ||
        formData.engineer_certificate_path ||
        "",

      caPath:
        formData.caCertificate ||
        formData.ca_certificate_path ||
        "",
    };

  }, [formData]);


  /* ================= HELPERS ================= */

  const safe = (v) =>
    v !== null && v !== undefined ? v : "";


  const getFileUrl = (path) => {

    if (!path) return "";

    if (path instanceof File) return "";

    if (path.startsWith("http")) return path;

    return `${BASE_URL}/${path}`;
  };


  const getFileName = (path) => {

    if (!path) return "";

    if (path instanceof File) return path.name;

    return path.split("/").pop();
  };


  /* ================= FILE BOX ================= */

  const FileInputBox = ({ path, name }) => {

    const fileUrl = getFileUrl(path);
    const fileName = getFileName(path);

    return (

      <div style={{ marginBottom: "10px" }}>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "6px 10px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            fontSize: "14px",
          }}
        >

          <div
            style={{
              maxWidth: "65%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {fileName || "No file chosen"}
          </div>


          <div>

            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginRight: "10px",
                  fontSize: "13px",
                }}
              >
                View
              </a>
            )}


            <label
              style={{
                cursor: "pointer",
                color: "#007bff",
                fontSize: "13px",
              }}
            >
              Choose

              <input
                type="file"
                hidden
                name={name}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />

            </label>

          </div>

        </div>

      </div>
    );
  };


  /* ================= RENDER ================= */

  return (

    <div className="form-section">

      <h3 className="subheading">
        Present Construction Status
      </h3>


      {/* DEVELOPMENT */}
      <div className="row innerdivrow">

        <div className="col-sm-6">

          <label className="label">
            Development Completed *
          </label>

          <input
            type="text"
            name="developmentCompleted"
            className="inputbox"
            value={safe(mappedData.developmentCompleted)}
            onChange={handleInputChange}
          />

        </div>


        <div className="col-sm-6">

          <label className="label">
            Development Pending *
          </label>

          <input
            type="text"
            name="developmentPending"
            className="inputbox"
            value={safe(mappedData.developmentPending)}
            onChange={handleInputChange}
          />

        </div>

      </div>


      {/* MONEY */}
      <div className="row innerdivrow">

        <div className="col-sm-6">

          <label className="label">
            Amount Collected *
          </label>

          <input
            type="text"
            name="amountCollected"
            className="inputbox"
            value={safe(mappedData.amountCollected)}
            onChange={handleInputChange}
          />

        </div>


        <div className="col-sm-6">

          <label className="label">
            Amount Spent *
          </label>

          <input
            type="text"
            name="amountSpent"
            className="inputbox"
            value={safe(mappedData.amountSpent)}
            onChange={handleInputChange}
          />

        </div>

      </div>


      {/* BANK + PLAN */}
      <div className="row innerdivrow">

        <div className="col-sm-6">

          <label className="label">
            Balance Amount *
          </label>

          <input
            type="text"
            name="balanceAmount"
            className="inputbox"
            value={safe(mappedData.balanceAmount)}
            onChange={handleInputChange}
          />

        </div>


        <div className="col-sm-6">

          <label className="label">
            Plan Modified? *
          </label>

          <div className="radio-group">

            <label>
              <input
                type="radio"
                name="planModified"
                value="true"
                checked={mappedData.planModified === true}
                onChange={handleInputChange}
              /> Yes
            </label>


            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name="planModified"
                value="false"
                checked={mappedData.planModified === false}
                onChange={handleInputChange}
              /> No
            </label>

          </div>

        </div>

      </div>


      {/* CERTIFICATES */}
      <h3 className="subheading">
        Upload Certificates
      </h3>


      <div className="row innerdivrow">

        <div className="col-sm-4">

          <label className="label">
            Architect Certificate
          </label>

          <FileInputBox
            path={mappedData.architectPath}
            name="architectCertificate"
          />

        </div>


        <div className="col-sm-4">

          <label className="label">
            Engineer Certificate
          </label>

          <FileInputBox
            path={mappedData.engineerPath}
            name="engineerCertificate"
          />

        </div>


        <div className="col-sm-4">

          <label className="label">
            CA Certificate
          </label>

          <FileInputBox
            path={mappedData.caPath}
            name="caCertificate"
          />

        </div>

      </div>


      {/* DELAY */}
      <div className="row innerdivrow">

        <div className="col-sm-12">

          <label className="label">
            Project Delayed? *
          </label>

          <div className="radio-group">

            <label>
              <input
                type="radio"
                name="projectDelayed"
                value="true"
                checked={mappedData.projectDelayed === true}
                onChange={handleInputChange}
              /> Yes
            </label>


            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name="projectDelayed"
                value="false"
                checked={mappedData.projectDelayed === false}
                onChange={handleInputChange}
              /> No
            </label>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ExistingProjectConstructionStatus;