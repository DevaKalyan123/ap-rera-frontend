// import React from "react";

// const ProjectLocalAddress = ({ formData, handleInputChange }) => {
//   return (
//     <div className="form-section">
//       <h3 className="subheading">Project Local Address For Communication</h3>

//       {/* ================= ROW 1 ================= */}
//       <div className="row innerdivrow">
//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Door No. / Flat No. &amp; Floor No. <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="localAddress1"
//               className="form-control inputbox"
//               placeholder="Door No. / Flat No. & Floor No."
//               value={formData.localAddress1}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Apartment / Tower / Building Name <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="localAddress2"
//               className="form-control inputbox"
//               placeholder="Apartment / Tower / Building Name"
//               value={formData.localAddress2}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Area / Street Name <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="localArea"
//               className="form-control inputbox"
//               placeholder="Area / Street Name"
//               value={formData.localArea}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               Land Mark <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="localLandmark"
//               className="form-control inputbox"
//               placeholder="Land Mark"
//               value={formData.localLandmark}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>
//       </div>

//       {/* ================= ROW 2 ================= */}
//       <div className="row innerdivrow">
//         <div className="col-sm-3">
//           <div className="form-group">
//             <label className="label">
//               District <font color="red">*</font>
//             </label>
//             <select
//               name="localDistrict"
//               className="form-control inputbox"
//               value={formData.localDistrict}
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
//               <option value="9">SPR Nellore</option>
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
//               name="localMandal"
//               className="form-control inputbox"
//               value={formData.localMandal}
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
//               Village <font color="red">*</font>
//             </label>
//             <select
//               name="localVillage"
//               className="form-control inputbox"
//               value={formData.localVillage}
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
//               name="localPincode"
//               className="form-control inputbox"
//               placeholder="Postal PIN Code"
//               value={formData.localPincode}
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
//             <label className="label">Project Website URL</label>
//             <input
//               type="text"
//               name="projectWebsiteURL"
//               className="form-control inputbox"
//               placeholder="Project Website URL"
//               value={formData.projectWebsiteURL}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectLocalAddress;


import React, { useEffect, useState } from "react";
import { apiGet } from "../api/api";

const ProjectLocalAddress = ({ formData, handleInputChange }) => {
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);

  /* -------------------- LOAD DISTRICTS -------------------- */
  useEffect(() => {
    apiGet("/api/districts/1")
      .then(setDistricts)
      .catch(console.error);
  }, []);

  /* -------------------- LOAD MANDALS -------------------- */
  useEffect(() => {
    if (formData.localDistrict === "0") return;

    apiGet(`/api/mandals/${formData.localDistrict}`)
      .then(setMandals)
      .catch(console.error);
  }, [formData.localDistrict]);

  /* -------------------- LOAD VILLAGES -------------------- */
  useEffect(() => {
    if (formData.localMandal === "0") return;

    apiGet(`/api/villages/${formData.localMandal}`)
      .then(setVillages)
      .catch(console.error);
  }, [formData.localMandal]);

  return (
    <div className="form-section">
      <h3 className="subheading">
        Project Local Address For Communication
      </h3>

      <div className="row innerdivrow">
        <div className="col-sm-3">
          <div className="form-group">
          <label className="label">
            Door No. / Flat No. & Floor No. *
          </label>
          <input
            type="text"
            name="localAddress1"
            className="form-control inputbox"
            value={formData.localAddress1}
            onChange={handleInputChange}
            required
          />
        </div>
        </div>

        <div className="col-sm-3">
          <div className="form-group">
          <label className="label">
            Apartment / Tower / Building Name *
          </label>
          <input
            type="text"
            name="localAddress2"
            className="form-control inputbox"
            value={formData.localAddress2}
            onChange={handleInputChange}
            required
          />
        </div>
        </div>

        <div className="col-sm-3">
          <div className="form-group">
          <label className="label">Area / Street Name *</label>
          <input
            type="text"
            name="localArea"
            className="form-control inputbox"
            value={formData.localArea}
            onChange={handleInputChange}
            required
          />
        </div>
        </div>

        <div className="col-sm-3">
          <div className="form-group">
          <label className="label">Land Mark *</label>
          <input
            type="text"
            name="localLandmark"
            className="form-control inputbox"
            value={formData.localLandmark}
            onChange={handleInputChange}
            required
          />
        </div>
        </div>
      </div>

        {/* DISTRICT */}
        <div className="row innerdivrow">
        <div className="col-sm-3">
          <div className="form-group">
          <label className="label">District *</label>
          <select
            name="localDistrict"
            className="form-control inputbox"
            value={formData.localDistrict}
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
        </div>

        {/* MANDAL */}
        <div className="col-sm-3">
          <div className="form-group">
          <label className="label">Mandal *</label>
          <select
            name="localMandal"
            className="form-control inputbox"
            value={formData.localMandal}
            onChange={handleInputChange}
            required
            disabled={formData.localDistrict === "0"}
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

        {/* VILLAGE */}
        <div className="col-sm-3">
          <div className="form-group">
          <label className="label">Village *</label>
          <select
            name="localVillage"
            className="form-control inputbox"
            value={formData.localVillage}
            onChange={handleInputChange}
            required
            disabled={formData.localMandal === "0"}
          >
            <option value="0">Select</option>
            {villages.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        </div>

<div className="col-sm-3">
  <div className="form-group">
  <label className="label">Postal PIN Code *</label>
  <input
    type="text"
    name="localPincode"
    className="form-control inputbox"
    placeholder="6-digit PIN code"
    value={formData.localPincode}
    maxLength={6}
    inputMode="numeric"
    pattern="[0-9]*"
    onChange={(e) => {
      const value = e.target.value;

      // allow only digits & stop at 6
      if (/^\d{0,6}$/.test(value)) {
        handleInputChange(e);
      }
    }}
    required
  />
</div>
</div>
</div>


<div className="row innerdivrow">
        <div className="col-sm-3">
          <div className="form-group">
          <label className="label">Project Website URL</label>
          <input
            type="text"
            name="projectWebsiteURL"
            className="form-control inputbox"
            value={formData.projectWebsiteURL}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProjectLocalAddress;