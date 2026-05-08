// import React from "react";

// const ProjectConstructionStatus = ({
//   formData,
//   handleInputChange,
//   handleFileChange,
// }) => {
//   return (
//     <div className="form-section">
//       <h3 className="subheading">
//         Present Construction Status Of The Project
//       </h3>

//       {/* DEVELOPMENT STATUS */}
//       <div className="row innerdivrow">
//         <div className="col-sm-6">
//           <div className="form-group">
//             <label className="label">
//               Extent of development carried out till date (0% to 99%)
//               <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="developmentCompleted"
//               className="inputbox"
//               placeholder="Development carried out till date"
//               value={formData.developmentCompleted}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-6">
//           <div className="form-group">
//             <label className="label">
//               Extent of development pending (0% to 99%)
//               <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="developmentPending"
//               className="inputbox"
//               placeholder="Extent of development pending"
//               value={formData.developmentPending}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>
//       </div>

//       {/* MONEY DETAILS */}
//       <div className="row innerdivrow">
//         <div className="col-sm-6">
//           <div className="form-group">
//             <label className="label">
//               Total amount of money collected from allottee
//               <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="amountCollected"
//               className="inputbox"
//               placeholder="Amount collected from allottee"
//               value={formData.amountCollected}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-6">
//           <div className="form-group">
//             <label className="label">
//               Total amount spent for development of project
//               <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="amountSpent"
//               className="inputbox"
//               placeholder="Amount spent for development"
//               value={formData.amountSpent}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>
//       </div>

//       {/* BANK & PLAN MODIFICATION */}
//       <div className="row innerdivrow">
//         <div className="col-sm-6">
//           <div className="form-group">
//             <label className="label">
//               Balance money in designated bank account
//               <font color="red">*</font>
//             </label>
//             <input
//               type="text"
//               name="balanceAmount"
//               className="inputbox"
//               placeholder="Money lying with promoter"
//               value={formData.balanceAmount}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="col-sm-6">
//           <div className="form-group">
//             <label className="label">
//               Is there any subsequent modification to the plan?
//               <font color="red">*</font>
//             </label>
//            <div className="radio-group">
//   <label>
//     <input
//       type="radio"
//       name="planModified"
//       value="yes"
//       checked={formData.planModified === "yes"}
//       onChange={handleInputChange}
//     />{" "}
//     Yes
//   </label>

//   <label>
//     <input
//       type="radio"
//       name="planModified"
//       value="no"
//       checked={formData.planModified === "no"}
//       onChange={handleInputChange}
//     />{" "}
//     No
//   </label>
// </div>

//           </div>
//         </div>
//       </div>

//       {/* UPLOAD CERTIFICATES */}
//       <h3 className="subheading">
//         Upload Certificates (As per APRERA Regulations)
//       </h3>

//       <div className="row innerdivrow">
//         <div className="col-sm-4">
//           <div className="form-group">
//             <label className="label">Architect Certificate (Form 1)</label>
//             <input
//               type="file"
//               name="architectCertificate"
//               className="inputbox"
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>

//         <div className="col-sm-4">
//           <div className="form-group">
//             <label className="label">Engineer Certificate (Form 2)</label>
//             <input
//               type="file"
//               name="engineerCertificate"
//               className="inputbox"
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>

//         <div className="col-sm-4">
//           <div className="form-group">
//             <label className="label">CA Certificate (Form 3)</label>
//             <input
//               type="file"
//               name="caCertificate"
//               className="inputbox"
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>
//       </div>

//       {/* PROJECT DELAYED */}
//       <div className="row innerdivrow">
//         <div className="col-sm-12">
//           <div className="form-group">
//             <label className="label">
//               Is the project delayed?
//               <font color="red">*</font>
//             </label>

//            <div className="radio-group">
//   <label>
//     <input
//       type="radio"
//       name="planModified"
//       value="yes"
//       checked={formData.planModified === "yes"}
//       onChange={handleInputChange}
//     />{" "}
//     Yes
//   </label>

//   <label>
//     <input
//       type="radio"
//       name="planModified"
//       value="no"
//       checked={formData.planModified === "no"}
//       onChange={handleInputChange}
//     />{" "}
//     No
//   </label>
// </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectConstructionStatus;



import React from "react";

const ProjectConstructionStatus = ({
  formData,
  handleInputChange,
  handleFileChange,
}) => {
  return (
    <div className="form-section">
      <h3 className="subheading">
        Present Construction Status Of The Project
      </h3>

      {/* DEVELOPMENT STATUS */}
      <div className="row innerdivrow">
        <div className="col-sm-6">
          <div className="form-group">
            <label className="label">
              Extent of development carried out till date (0% to 99%)
              <font color="red">*</font>
            </label>
            <input
              type="text"
              name="developmentCompleted"
              className="inputbox"
              placeholder="Development carried out till date"
              value={formData.developmentCompleted}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group">
            <label className="label">
              Extent of development pending (0% to 99%)
              <font color="red">*</font>
            </label>
            <input
              type="text"
              name="developmentPending"
              className="inputbox"
              placeholder="Extent of development pending"
              value={formData.developmentPending}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      {/* MONEY DETAILS */}
      <div className="row innerdivrow">
        <div className="col-sm-6">
          <div className="form-group">
            <label className="label">
              Total amount of money collected from allottee
              <font color="red">*</font>
            </label>
            <input
              type="text"
              name="amountCollected"
              className="inputbox"
              placeholder="Amount collected from allottee"
              value={formData.amountCollected}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group">
            <label className="label">
              Total amount spent for development of project
              <font color="red">*</font>
            </label>
            <input
              type="text"
              name="amountSpent"
              className="inputbox"
              placeholder="Amount spent for development"
              value={formData.amountSpent}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      {/* BANK & PLAN MODIFICATION */}
      <div className="row innerdivrow">
        <div className="col-sm-6">
          <div className="form-group">
            <label className="label">
              Balance money in designated bank account
              <font color="red">*</font>
            </label>
            <input
              type="text"
              name="balanceAmount"
              className="inputbox"
              placeholder="Money lying with promoter"
              value={formData.balanceAmount}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group">
            <label className="label">
              Is there any subsequent modification to the plan?
              <font color="red">*</font>
            </label>
            <div className="radio-group">
            <label>
              <input
                type="radio"
                name="planModified"
                value="yes"
                checked={formData.planModified === "yes"}
                onChange={handleInputChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="planModified"
                value="no"
                checked={formData.planModified === "no"}
                onChange={handleInputChange}
              />{" "}
              No
            </label>
          </div>
          </div>
        </div>
      </div>

      {/* UPLOAD CERTIFICATES */}
      <h3 className="subheading">
        Upload Certificates (As per APRERA Regulations)
      </h3>

      <div className="row innerdivrow">
        <div className="col-sm-4">
          <div className="form-group">
            <label className="label">Architect Certificate (Form 1)</label>
            <input
              type="file"
              name="architectCertificate"
              className="inputbox"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="col-sm-4">
          <div className="form-group">
            <label className="label">Engineer Certificate (Form 2)</label>
            <input
              type="file"
              name="engineerCertificate"
              className="inputbox"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="col-sm-4">
          <div className="form-group">
            <label className="label">CA Certificate (Form 3)</label>
            <input
              type="file"
              name="caCertificate"
              className="inputbox"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      {/* PROJECT DELAYED */}
      <div className="row innerdivrow">
        <div className="col-sm-12">
          <div className="form-group">
            <label className="label">
              Is the project delayed?
              <font color="red">*</font>
            </label>
            <div className="radio-group">
            <label>
              <input
                type="radio"
                name="projectDelayed"
                value="yes"
                checked={formData.projectDelayed === "yes"}
                onChange={handleInputChange}
              />{" "}
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="projectDelayed"
                value="no"
                checked={formData.projectDelayed === "no"}
                onChange={handleInputChange}
              />{" "}
              No
            </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectConstructionStatus;