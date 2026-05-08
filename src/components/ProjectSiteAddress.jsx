// import React from "react";

// const ProjectSiteAddress = ({
//   formData,
//   handleInputChange,
//   handleFileChange
// }) => {
//   return (
//     <div className="form-section">
//       <h3 className="subheading">Project Site Address</h3>

//       {/* ================= ROW 1 ================= */}
//       <div className="row innerdivrow">
//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Near by Door No. &amp; Street Name <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="projectAddress1"
//               className="form-control inputbox"
//               placeholder="Near by Door No. & Street Name"
//               value={formData.projectAddress1}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Area &amp; Land Mark <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="projectAddress2"
//               className="form-control inputbox"
//               placeholder="Area & Land Mark"
//               value={formData.projectAddress2}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               District <font color="red">*</font>
//             </label>
//             <select
//               name="projectDistrict"
//               className="form-control inputbox"
//               value={formData.projectDistrict}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select</option>
//               <option value="1">Srikakulam</option>
//               <option value="2">Vizianagaram</option>
//               <option value="3">Visakhapatnam</option>
//               <option value="4">East Godavari</option>
//               <option value="5">West Godavari</option>
//               <option value="6">Krishna</option>
//               <option value="7">Guntur</option>
//               <option value="8">Prakasam</option>
//               <option value="9">Sri Potti Sriramulu Nellore</option>
//               <option value="10">Chittoor</option>
//               <option value="11">Y.S.R Kadapa</option>
//               <option value="12">Ananthapuramu</option>
//               <option value="13">Kurnool</option>
//             </select>
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Mandal <font color="red">*</font>
//             </label>
//             <select
//               name="projectMandal"
//               className="form-control inputbox"
//               value={formData.projectMandal}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* ================= ROW 2 ================= */}
//       <div className="row innerdivrow">
//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Village <font color="red">*</font>
//             </label>
//             <select
//               name="projectVillage"
//               className="form-control inputbox"
//               value={formData.projectVillage}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select</option>
//             </select>
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Postal PIN Code <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="projectPincode"
//               maxLength="6"
//               className="form-control inputbox"
//               placeholder="Postal PIN Code"
//               value={formData.projectPincode}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Latitude <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="projectLatitude"
//               className="form-control inputbox"
//               placeholder="Latitude"
//               value={formData.projectLatitude}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Longitude <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="projectLongitude"
//               className="form-control inputbox"
//               placeholder="Longitude"
//               value={formData.projectLongitude}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>
//       </div>

//       {/* ================= ROW 3 ================= */}
//       <div className="row innerdivrow">
//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Plan Approving Authority <font color="red">*</font>
//             </label>
//             <select
//               name="planApprovingAuthority"
//               className="form-control inputbox"
//               value={formData.planApprovingAuthority}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select</option>
//               <option value="4">Vice Chairman, UDA</option>
//               <option value="5">Commissioner, APCRDA</option>
//               <option value="6">Commissioner, ULB</option>
//               <option value="7">Director, Town and Country Planning</option>
//               <option value="9">Commissioner, VMRDA</option>
//             </select>
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Upload Address Proof <font color="red">*</font>
//             </label>
//             <input
//               type="file"
//               name="addressProof"
//               className="form-control inputbox"
//               onChange={handleFileChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Site Survey No. <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="surveyNo"
//               className="form-control inputbox"
//               placeholder="Survey No."
//               value={formData.surveyNo}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectSiteAddress;

import React, { useEffect, useState } from "react";
import { apiGet } from "../api/api";

/**
 * ======================================================
 * ProjectSiteAddress
 * ======================================================
 * ✅ NO local formData state
 * ✅ Uses parent formData
 * ✅ Uses parent handlers
 * ✅ Sends ALL fields to backend
 * ======================================================
 */
const ProjectSiteAddress = ({
  formData,
  handleInputChange,
  handleFileChange,
}) => {
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);

  /* ======================================================
     LOAD DISTRICTS (ONCE)
     ====================================================== */
  useEffect(() => {
    apiGet("/api/districts/1")
      .then(setDistricts)
      .catch(console.error);
  }, []);

  /* ======================================================
     LOAD MANDALS (WHEN DISTRICT CHANGES)
     ====================================================== */
 useEffect(() => {
  if (formData.projectDistrict === "0") return;

  let cancelled = false;

  apiGet(`/api/mandals/${formData.projectDistrict}`)
    .then((data) => {
      if (!cancelled) setMandals(data);
    })
    .catch(console.error);

  return () => {
    cancelled = true;
  };
}, [formData.projectDistrict]);

  /* ======================================================
     LOAD VILLAGES (WHEN MANDAL CHANGES)
     ====================================================== */
useEffect(() => {
  if (formData.projectMandal === "0") return;

  let cancelled = false;

  apiGet(`/api/villages/${formData.projectMandal}`)
    .then((data) => {
      if (!cancelled) setVillages(data);
    })
    .catch(console.error);

  return () => {
    cancelled = true;
  };
}, [formData.projectMandal]);


  /* ======================================================
     JSX
     ====================================================== */
  return (
    <div className="form-section">
      <h3 className="subheading">Project Site Address</h3>

      {/* ================= ROW 1 ================= */}
      <div className="row innerdivrow">
        <div className="col-sm-3">
          <label className="label">Near by Door No. & Street Name *</label>
          <input
            type="text"
            name="projectAddress1"
            className="form-control inputbox"
            value={formData.projectAddress1}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-sm-3">
          <label className="label">Area & Landmark *</label>
          <input
            type="text"
            name="projectAddress2"
            className="form-control inputbox"
            value={formData.projectAddress2}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-sm-3">
          <label className="label">District *</label>
          <select
            name="projectDistrict"
            className="form-control inputbox"
            value={formData.projectDistrict}
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
            className="form-control inputbox"
            value={formData.projectMandal}
            onChange={handleInputChange}
            disabled={formData.projectDistrict === "0"}
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

      {/* ================= ROW 2 ================= */}
      <div className="row innerdivrow">
        <div className="col-sm-3">
          <label className="label">Village *</label>
          <select
            name="projectVillage"
            className="form-control inputbox"
            value={formData.projectVillage}
            onChange={handleInputChange}
            disabled={formData.projectMandal === "0"}
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
          <label className="label">Postal PIN Code *</label>
          <input
            type="text"
            name="projectPincode"
            className="form-control inputbox"
            value={formData.projectPincode}
            maxLength={6}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => {
              if (/^\d{0,6}$/.test(e.target.value)) {
                handleInputChange(e);
              }
            }}
            required
          />
        </div>

        <div className="col-sm-3">
          <label className="label">Latitude *</label>
          <input
            type="number"
            name="projectLatitude"
            className="form-control inputbox"
            value={formData.projectLatitude}
            step="0.000001"
            min="-90"
            max="90"
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-sm-3">
          <label className="label">Longitude *</label>
          <input
            type="number"
            name="projectLongitude"
            className="form-control inputbox"
            value={formData.projectLongitude}
            step="0.000001"
            min="-180"
            max="180"
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      {/* ================= ROW 3 ================= */}
      <div className="row innerdivrow">
        <div className="col-sm-3">
          <label className="label">Plan Approving Authority *</label>
          <select
            name="planApprovingAuthority"
            className="form-control inputbox"
            value={formData.planApprovingAuthority}
            onChange={handleInputChange}
            required
          >
            <option value="0">Select</option>
            <option value="4">Vice Chairman, UDA</option>
            <option value="5">Commissioner, APCRDA</option>
            <option value="6">Commissioner, ULB</option>
            <option value="7">Director, Town and Country Planning</option>
            <option value="9">Commissioner, VMRDA</option>
          </select>
        </div>

        <div className="col-sm-3">
          <label className="label">Upload Address Proof *</label>
          <input
            type="file"
            name="addressProof"
            className="form-control inputbox"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="col-sm-3">
          <label className="label">Site Survey No. *</label>
          <input
            type="text"
            name="surveyNo"
            className="form-control inputbox"
            value={formData.surveyNo}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectSiteAddress;