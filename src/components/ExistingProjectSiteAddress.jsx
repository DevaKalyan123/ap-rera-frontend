import React, { useEffect, useState, useMemo } from "react";
import { apiGet, BASE_URL } from "../api/api";

const ExistingProjectSiteAddress = ({
  formData,
  handleInputChange,
  handleFileChange,
}) => {

  /* ================= STATE ================= */

  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);


  /* ================= MAP BACKEND → FRONTEND ================= */

  const mappedData = useMemo(() => {

    if (!formData) return {};

    return {
      ...formData,

      // ✅ PRIORITY: New File → Old Path
      addressProofPath:
        formData.addressProof ||
        formData.address_proof_path ||
        "",
    };

  }, [formData]);


  /* ================= HELPERS ================= */

  const safe = (v) =>
    v !== undefined && v !== null ? String(v) : "";


  const getFileUrl = (path) => {

    if (!path) return "";

    // New file → no URL
    if (path instanceof File) return "";

    if (path.startsWith("http")) return path;

    return `${BASE_URL}/${path}`;
  };


  const getFileName = (path) => {

    if (!path) return "";

    // ✅ New file
    if (path instanceof File) return path.name;

    return path.split("/").pop();
  };


  /* ================= CUSTOM FILE INPUT ================= */

  const FileInputBox = ({ path, name }) => {

    const fileUrl = getFileUrl(path);
    const fileName = getFileName(path);

    return (

      <div style={{ marginBottom: "8px" }}>

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

          {/* File Name */}
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "65%",
            }}
          >
            {fileName || "No file chosen"}
          </div>


          {/* Buttons */}
          <div>

            {/* VIEW only for old file */}
            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginRight: "10px",
                  textDecoration: "none",
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
                name={name}
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />

            </label>

          </div>

        </div>

      </div>
    );
  };


  /* ================= LOAD DISTRICTS ================= */

  useEffect(() => {

    const loadDistricts = async () => {

      try {
        const data = await apiGet("/api/districts/1");
        setDistricts(data || []);
      } catch (err) {
        console.error("District Error:", err);
      }
    };

    loadDistricts();

  }, []);


  /* ================= LOAD MANDALS ================= */

  useEffect(() => {

    if (!mappedData.projectDistrict || mappedData.projectDistrict === "0") {
      setMandals([]);
      return;
    }

    const loadMandals = async () => {

      try {

        const data = await apiGet(
          `/api/mandals/${mappedData.projectDistrict}`
        );

        setMandals(data || []);

      } catch (err) {
        console.error("Mandal Error:", err);
      }
    };

    loadMandals();

  }, [mappedData.projectDistrict]);


  /* ================= LOAD VILLAGES ================= */

  useEffect(() => {

    if (!mappedData.projectMandal || mappedData.projectMandal === "0") {
      setVillages([]);
      return;
    }

    const loadVillages = async () => {

      try {

        const data = await apiGet(
          `/api/villages/${mappedData.projectMandal}`
        );

        setVillages(data || []);

      } catch (err) {
        console.error("Village Error:", err);
      }
    };

    loadVillages();

  }, [mappedData.projectMandal]);


  /* ================= RENDER ================= */

  return (
    <div className="form-section">

      <h3 className="subheading">Project Site Address</h3>


      {/* ========== ROW 1 ========== */}
      <div className="row innerdivrow">

        <div className="col-sm-3">
          <label className="label">Door No *</label>

          <input
            type="text"
            name="projectAddress1"
            className="inputbox"
            value={safe(mappedData.projectAddress1)}
            onChange={handleInputChange}
            required
          />
        </div>


        <div className="col-sm-3">
          <label className="label">Area *</label>

          <input
            type="text"
            name="projectAddress2"
            className="inputbox"
            value={safe(mappedData.projectAddress2)}
            onChange={handleInputChange}
            required
          />
        </div>


        <div className="col-sm-3">
          <label className="label">District *</label>

          <select
            name="projectDistrict"
            className="inputbox"
            value={safe(mappedData.projectDistrict) || "0"}
            onChange={handleInputChange}
            required
          >

            <option value="0">Select</option>

            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}

          </select>
        </div>


        <div className="col-sm-3">
          <label className="label">Mandal *</label>

          <select
            name="projectMandal"
            className="inputbox"
            value={safe(mappedData.projectMandal) || "0"}
            onChange={handleInputChange}
            disabled={!mappedData.projectDistrict}
            required
          >

            <option value="0">Select</option>

            {mandals.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}

          </select>
        </div>

      </div>


      {/* ========== ROW 2 ========== */}
      <div className="row innerdivrow">

        <div className="col-sm-3">
          <label className="label">Village *</label>

          <select
            name="projectVillage"
            className="inputbox"
            value={safe(mappedData.projectVillage) || "0"}
            onChange={handleInputChange}
            disabled={!mappedData.projectMandal}
            required
          >

            <option value="0">Select</option>

            {villages.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}

          </select>
        </div>


        <div className="col-sm-3">
          <label className="label">Pincode *</label>

          <input
            type="text"
            name="projectPincode"
            className="inputbox"
            value={safe(mappedData.projectPincode)}
            onChange={handleInputChange}
            maxLength={6}
            required
          />
        </div>


        <div className="col-sm-3">
          <label className="label">Latitude *</label>

          <input
            type="number"
            name="projectLatitude"
            className="inputbox"
            value={safe(mappedData.projectLatitude)}
            onChange={handleInputChange}
            required
          />
        </div>


        <div className="col-sm-3">
          <label className="label">Longitude *</label>

          <input
            type="number"
            name="projectLongitude"
            className="inputbox"
            value={safe(mappedData.projectLongitude)}
            onChange={handleInputChange}
            required
          />
        </div>

      </div>


      {/* ========== ROW 3 ========== */}
      <div className="row innerdivrow">

        <div className="col-sm-3">
          <label className="label">Authority *</label>

          <select
            name="planApprovingAuthority"
            className="inputbox"
            value={safe(mappedData.planApprovingAuthority) || "0"}
            onChange={handleInputChange}
            required
          >

            <option value="0">Select</option>
            <option value="4">Vice Chairman, UDA</option>
            <option value="5">APCRDA</option>
            <option value="6">ULB</option>
            <option value="7">DTCP</option>
            <option value="9">VMRDA</option>

          </select>
        </div>


        {/* ===== ADDRESS PROOF FILE ===== */}
        <div className="col-sm-3">

          <label className="label">Address Proof *</label>

          <FileInputBox
            path={mappedData.addressProofPath}
            name="addressProof"
          />

        </div>


        <div className="col-sm-3">
          <label className="label">Survey No *</label>

          <input
            type="text"
            name="surveyNo"
            className="inputbox"
            value={safe(mappedData.surveyNo)}
            onChange={handleInputChange}
            required
          />
        </div>

      </div>

    </div>
  );
};

export default ExistingProjectSiteAddress;