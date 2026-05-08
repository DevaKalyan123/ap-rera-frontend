import React, { useEffect, useState } from "react";
import { apiGet } from "../../api/api";

const scrutiny_ExistingProjectLocalAddress = ({ formData }) => {

  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);

  /* ================= LOAD DISTRICTS ================= */
  useEffect(() => {
    apiGet("/api/districts/1")
      .then(setDistricts)
      .catch(console.error);
  }, []);

  /* ================= LOAD MANDALS ================= */
  useEffect(() => {
    if (!formData?.localDistrict) return;

    apiGet(`/api/mandals/${formData.localDistrict}`)
      .then(setMandals)
      .catch(console.error);
  }, [formData?.localDistrict]);

  /* ================= LOAD VILLAGES ================= */
  useEffect(() => {
    if (!formData?.localMandal) return;

    apiGet(`/api/villages/${formData.localMandal}`)
      .then(setVillages)
      .catch(console.error);
  }, [formData?.localMandal]);

  /* ================= HELPERS ================= */
  const safe = (v) =>
    v !== undefined && v !== null && v !== "" ? v : "NA";

  const getName = (list, id) => {
    const found = list.find((x) => String(x.id) === String(id));
    return found ? found.name : "NA";
  };

  return (
    <div className="form-section">

      <h3 className="subheading">
        Project Local Address For Communication
      </h3>

      {/* ===== ROW 1 ===== */}
      <div className="row innerdivrow">

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">Door No / Flat No</span>
            <span className="display-field">
              {safe(formData?.localAddress1)}
            </span>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">Building Name</span>
            <span className="display-field">
              {safe(formData?.localAddress2)}
            </span>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">Area / Street</span>
            <span className="display-field">
              {safe(formData?.localArea)}
            </span>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">Landmark</span>
            <span className="display-field">
              {safe(formData?.localLandmark)}
            </span>
          </div>
        </div>

      </div>

      {/* ===== ROW 2 ===== */}
      <div className="row innerdivrow">

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">District</span>
            <span className="display-field">
              {getName(districts, formData?.localDistrict)}
            </span>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">Mandal</span>
            <span className="display-field">
              {getName(mandals, formData?.localMandal)}
            </span>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">Village</span>
            <span className="display-field">
              {getName(villages, formData?.localVillage)}
            </span>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">Pincode</span>
            <span className="display-field">
              {safe(formData?.localPincode)}
            </span>
          </div>
        </div>

      </div>

      {/* ===== ROW 3 ===== */}
      <div className="row innerdivrow">

        <div className="col-sm-3">
          <div className="display-group">
            <span className="display-label">Project Website</span>
            <span className="display-field">
              {safe(formData?.projectWebsiteURL)}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default scrutiny_ExistingProjectLocalAddress;