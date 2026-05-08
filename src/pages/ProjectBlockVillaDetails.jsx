import React, { useState } from "react";
import "../styles/ProjectBlockVillaDetails.css";
import { useNavigate } from "react-router-dom";
import QuarterlyStepper from "../components/QuarterlyStepper";
import { apiPost } from "../api/api";

const steps = [
  "Documents",
  "Block/Villa Details",
  "Floor Details",
  "Flat Details",
];

const rows = [
  { sno: 1, plotNo: 1 },
  { sno: 2, plotNo: 1 },
  { sno: 3, plotNo: 1 },
  { sno: 4, plotNo: 1 },
  { sno: 5, plotNo: 1 },
  { sno: 6, plotNo: 1 },
  { sno: 7, plotNo: 1 },
  { sno: 8, plotNo: 1 },
  { sno: 9, plotNo: 1 },
  { sno: 10, plotNo: 1 },
];
const createVillaRows = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    checked: false,
    constructionStatus: "",
    saleStatus: "",
    remarks: "",
    saleDoc: null,
    uploaded: false,
    photos: [],
    saved:false,
  }));

const ResidentialBlock = ({ onUpload, blockData, setBlockData,residentialPhotos }) => (
  <div className="projectblockvilla-table-wrapper">
    <table className="projectblockvilla-table">
     <thead>
<tr>
<th></th>
<th>S.No</th>
<th>Block</th>
<th>Status</th>
<th>Remarks</th>
<th>Upload Photos</th>
</tr>
</thead>
      <tbody>
       {blockData.map((row, index) => (
          <tr key={index} className={row.saved ? "saved-row" : ""}>

            {/* Checkbox */}
            <td>
              <input
  type="checkbox"
  checked={row.saved || row.checked}
  className={
    row.saved
      ? "checkbox-green"
      : row.checked
      ? "checkbox-blue"
      : ""
  }
  onChange={() => {
    const updated = [...blockData];
    updated[index].checked = !updated[index].checked;
    setBlockData(updated);
  }}
/>
            </td>

            <td>{index + 1}</td>

            {/* Block Name */}
            <td>
              <select
                value={row.block}
                onChange={(e) => {
                  const updated = [...blockData];
                  updated[index].block = e.target.value;
                  setBlockData(updated);
                }}
              >
                <option value="">Select Block</option>
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Block C">Block C</option>
              </select>
            </td>

            {/* Status */}
            <td>
              <select value={row.status}
                onChange={(e) => {
                  const updated = [...blockData];
                  updated[index].status = e.target.value;
                  setBlockData(updated);
                }}
              >
                <option value="">Select</option>
                
                <option>Yet To Start</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                value={row.remarks}
                onChange={(e) => {
                  const updated = [...blockData];
                  updated[index].remarks = e.target.value;
                  setBlockData(updated);
                }}
              />
            </td>
           <td>
<button
className="projectblockvilla-view-btn"
onClick={() => onUpload(index)}
>
Upload/View
</button>

{residentialPhotos[`1-${index}`]?.length > 0 && (
<span className="uploaded-text">Uploaded</span>
)}
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ResidentialFloor = ({ onUpload, floorData, setFloorData ,residentialPhotos }) => (
  <div className="projectblockvilla-table-wrapper">
    <table className="projectblockvilla-table">
      <thead>
<tr>
<th></th>
<th>S.No</th>
<th>Block</th>
<th>Floor</th>
<th>Status</th>
<th>Remarks</th>
<th>Upload Photos</th>
</tr>
</thead>
      <tbody>
        {floorData.map((row, index) => (
          <tr key={index} className={row.saved ? "saved-row" : ""}>

            <td>
              <input
  type="checkbox"
  checked={row.saved || row.checked}
  className={
    row.saved
      ? "checkbox-green"
      : row.checked
      ? "checkbox-blue"
      : ""
  }
  onChange={() => {
    const updated = [...floorData];
    updated[index].checked = !updated[index].checked;
    setFloorData(updated);
  }}
/>
            </td>

            <td>{index + 1}</td>

            <td>
  <select
    value={row.block}
    onChange={(e) => {
      const updated = [...floorData];
      updated[index].block = e.target.value;
      setFloorData(updated);
    }}
  >
    <option value="">Select Block</option>
    <option value="Block A">Block A</option>
    <option value="Block B">Block B</option>
    <option value="Block C">Block C</option>
  </select>
</td>

<td>
  <select
    value={row.floor}
    onChange={(e) => {
      const updated = [...floorData];
      updated[index].floor = e.target.value;
      setFloorData(updated);
    }}
  >
    <option value="">Select Floor</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
</td>
            <td>
              <select
                value={row.status}
                onChange={(e) => {
                  const updated = [...floorData];
                  updated[index].status = e.target.value;
                  setFloorData(updated);
                }}
              >
                <option value="">Select</option>
                <option>Yet To Start</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </td>
            <td>
              <input
                value={row.remarks}
                onChange={(e) => {
                  const updated = [...floorData];
                  updated[index].remarks = e.target.value;
                  setFloorData(updated);
                }}
              />
            </td>
            <td>
<button
className="projectblockvilla-view-btn"
onClick={() => onUpload(index)}
>
Upload/View
</button>

{residentialPhotos[`2-${index}`]?.length > 0 && (
<span className="uploaded-text">Uploaded</span>
)}
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ResidentialFlat = ({ onUpload, flatData, setFlatData, residentialPhotos }) => (
  <div className="projectblockvilla-table-wrapper">
    <table className="projectblockvilla-table">
      <thead>
        <tr>
          <th></th>
          <th>S.No</th>
          <th>Block</th>
          <th>Floor</th>
          <th>Flat</th>
          <th>Construction Status</th>
          <th>Sale Status</th>
          <th>Remarks</th>
          <th>Sale Document</th>
          <th>Upload Photos</th>
        </tr>
      </thead>

      <tbody>
        {flatData.map((row, index) => (
          <tr key={index} className={row.saved ? "saved-row" : ""}>

            {/* Checkbox */}
            <td>
              <input
                type="checkbox"
                checked={row.saved || row.checked}
                className={
                  row.saved
                    ? "checkbox-green"
                    : row.checked
                    ? "checkbox-blue"
                    : ""
                }
                onChange={() => {
                  const updated = [...flatData];
                  updated[index].checked = !updated[index].checked;
                  setFlatData(updated);
                }}
              />
            </td>

            {/* S.No */}
            <td>{index + 1}</td>

            {/* Block */}
            <td>
              <select
                value={row.block}
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].block = e.target.value;
                  setFlatData(updated);
                }}
              >
                <option value="">Select Block</option>
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Block C">Block C</option>
              </select>
            </td>

            {/* Floor */}
            <td>
              <select
                value={row.floor}
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].floor = e.target.value;
                  setFlatData(updated);
                }}
              >
                <option value="">Select Floor</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </td>

            {/* Flat Number */}
            <td>{100 + index}</td>

            {/* Construction Status */}
            <td>
              <select
                value={row.status}
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].status = e.target.value;
                  setFlatData(updated);
                }}
              >
                <option value="">Select</option>
                <option>Yet To Start</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </td>

            {/* Sale Status */}
            <td>
              <select
                value={row.saleStatus}
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].saleStatus = e.target.value;
                  setFlatData(updated);
                }}
              >
                <option value="">Select</option>
                <option>Sold</option>
                <option>Available</option>
              </select>
            </td>

            {/* Remarks */}
            <td>
              <input
                type="text"
                value={row.remarks}
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].remarks = e.target.value;
                  setFlatData(updated);
                }}
              />
            </td>

            {/* Sale Document */}
            <td>
              <input
                type="file"
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].saleDoc = e.target.files[0];
                  setFlatData(updated);
                }}
              />
            </td>

            {/* Upload Photos */}
            <td>
              <button
                className="projectblockvilla-view-btn"
                onClick={() => onUpload(index)}
              >
                Upload/View
              </button>

              {residentialPhotos[`3-${index}`]?.length > 0 && (
                <span className="uploaded-text">Uploaded</span>
              )}
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ProjectBlockVillaDetails = () => {

const navigate=useNavigate()
const [showModal, setShowModal] = useState(false);
const [residentialPhotos, setResidentialPhotos] = useState({});
 

const [villaData, setVillaData] = useState(createVillaRows());
  // 🔹 Block Step Data (for validation)
const [blockData, setBlockData] = useState([
  { block: "", status: "", remarks: "", file: null, checked: false, saved: false },
  { block: "", status: "", remarks: "", file: null, checked: false, saved: false },
  { block: "", status: "", remarks: "", file: null, checked: false, saved: false },
]);
  // 🔹 Floor Step Data
  const [floorData, setFloorData] = useState(
  Array.from({ length: 5 }, () => ({
    block: "",
    floor: "",
    status: "",
    remarks: "",
    file: null,
    fileName: "",
    uploaded: false,
    checked: false,
    saved: false,   // ✅ ADD THIS
  }))
);

  // 🔥 ADD THIS (VERY IMPORTANT – fixes data removal)
  const [flatData, setFlatData] = useState(
  Array.from({ length: 5 }, () => ({
    block: "",
    floor: "",
    status: "",
    saleStatus: "",
    remarks: "",
    saleDoc: null,
    photos: null,
    checked: false,
    saved: false,   // ✅ ADD THIS
  }))
);
  // 🔥 SAVE FUNCTIONS (Step Wise Save)
const handleSaveBlock = () => {
  const updated = blockData.map((row) => {
    if (row.block && row.status && row.remarks) {
      return { ...row, saved: true };   // ✅ green tick
    }
    return row;
  });

  setBlockData(updated);
};

const handleSaveFloor = () => {
  const updated = floorData.map((row) => {
    if (row.block && row.floor && row.status && row.remarks) {
      return { ...row, saved: true };   // green tick
    }
    return row;
  });

  setFloorData(updated);
};

const handleSaveFlat = () => {
  const updated = flatData.map((row) => {
  if (row.block && row.floor && row.status) {
      return { ...row, saved: true };
    }
    return row;
  });

  setFlatData(updated);
};

  const [showUploadModal, setShowUploadModal] = useState(false);
const [currentBlockIndex, setCurrentBlockIndex] = useState(null);
const [tempFiles, setTempFiles] = useState([]);
const [uploadedFiles, setUploadedFiles] = useState({});



  const [tableData, setTableData] = useState(
  rows.map((row) => ({
    plotNo: row.plotNo,
    constructionStatus: "",
    saleStatus: "",
    remarks: "",
    saleDoc: null,
    photos: []
  }))
);
  const [activeStep, setActiveStep] = useState(1); // 0-based index
   const [openModal, setOpenModal] = useState(false); 
   const [selectedFile, setSelectedFile] = useState(null);
   //const [uploadedFiles, setUploadedFiles] = useState([]);
   const [savedRows, setSavedRows] = useState({});
   const [saleDocs, setSaleDocs] = useState({});
   const [uploadedRows, setUploadedRows] = useState({});
   const [activeRow, setActiveRow] = useState(null);
   const [projectType, setProjectType] = useState("Plot");

   const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};

const handleAddFile = () => {
  if (!selectedFile || activeRow === null) return;

  const updated = [...tableData];
  updated[activeRow].photos = [
    ...updated[activeRow].photos,
    {
      id: Date.now(),
      file: selectedFile,
      url: URL.createObjectURL(selectedFile),
    },
  ];

  setTableData(updated);
  setSelectedFile(null);
};
const handleDelete = (id) => {
  const updated = [...tableData];
  updated[activeRow].photos = updated[activeRow].photos.filter(
    (photo) => photo.id !== id
  );
  setTableData(updated);
};
const handleSaleDocChange = (rowIndex, file) => {
  const updated = [...tableData];
  updated[rowIndex].saleDoc = file;
  setTableData(updated);
};
const handleSave = async () => {
  const formData = new FormData();

  formData.append("project_id", 123); // dynamic later
  formData.append("quarter", "Q1-2025");
  formData.append("rows", JSON.stringify(tableData));

  tableData.forEach((row, index) => {
    if (row.saleDoc) {
      formData.append(`saleDoc_${index}`, row.saleDoc);
    }

    row.photos.forEach((photo) => {
      formData.append(`photos_${index}`, photo);
    });
  });
  try {
await apiPost("/api/project/quarterly/plot/save", formData);

  // checkbox green
const updated = {};

tableData.forEach((row, index) => {
  if (
    row.constructionStatus ||
    row.saleStatus ||
    row.remarks ||
    row.saleDoc ||
    row.photos.length > 0
  ) {
    updated[index] = true;
  }
});

setSavedRows(updated);
 } catch (err) {
    console.error(err);
    alert("Error saving quarterly data");
  }
};

const handleUpload = (rowIndex) => {
  if (!tableData[rowIndex].saleDoc) return;

  setUploadedRows((prev) => ({
    ...prev,
    [rowIndex]: true, // mark uploaded
  }));
};
  return (
    <div className="projectblockvilla-page-bg">
    <div className="projectblockvilla-container">
      {/* Breadcrumb */}
      <div className="projectblockvilla-breadcrumb">
        You are here :
        <span
  className="projectblockvilla-link"
  onClick={() => navigate('/project-registration-wizard')}
  style={{ cursor: "pointer" }}
>
  Project Registration
</span>
        / Existing Project / Quarterly Updates
      </div>

      {/* Header */}
 <div class="projectblockvilla-header">
  <div class="projectblockvilla-title-section">
    <h2>Quarterly Updates</h2>
    <div class="projectblockvilla-underline"></div>
  </div>

  <button className="projectblockvilla-back-btn-Dashboard">
    Back to Dashboard
  </button>
</div>

    <QuarterlyStepper currentStep={2} />

      {/* Dropdown */}
      <div className="projectblockvilla-projecttype">
        <label>
          Project Consists of:
          <span className="projectblockvilla-required">*</span>
        </label>
 <select
  value={projectType}
  onChange={(e) => setProjectType(e.target.value)}
>
  <option>Plot</option>
  <option>Villa</option>
  <option>Residential</option>
  <option>Commercial</option>
</select>
      </div>

      {/* Table */}
      {projectType === "Plot" && (
      <div className="projectblockvilla-table-wrapper">
        <table className="projectblockvilla-table">
 <thead>
  <tr>
    <th>
    </th>
    <th>S.No</th>
    <th>Plot No</th>
    <th>Construction Status</th>
    <th>Sale Status</th>
    <th>Remarks</th>
    <th>Sale Document</th>
    <th>Upload Photos</th>
   <th></th> {/* extra right-side column */}
  </tr>
</thead>
<tbody>
  {rows.map((row, rowIndex) => (
    <tr key={rowIndex}>
      <td>
<input
  type="checkbox"
  checked={savedRows[rowIndex] || activeRow === rowIndex}
  onChange={() => setActiveRow(rowIndex)}
  className={
    savedRows[rowIndex]
      ? "checkbox-green"
      : activeRow === rowIndex
      ? "checkbox-blue"
      : ""
  }
/>
      </td>

      <td>{row.sno}</td>
      <td>{row.plotNo}</td>

      <td>
        <select
  value={tableData[rowIndex].saleStatus}
  onChange={(e) => {
    const updated = [...tableData];
    updated[rowIndex].saleStatus = e.target.value;
    setTableData(updated);
  }}
>
          <option value="">Select</option>
          <option>Yet To Start</option>
          <option>Under Construction</option>
          <option>Completed</option>
        </select>
      </td>

      <td>
        <select
  value={tableData[rowIndex].constructionStatus}
  onChange={(e) => {
    const updated = [...tableData];
    updated[rowIndex].constructionStatus = e.target.value;
    setTableData(updated);
  }}
>
          <option value="">Select</option>
          <option>Open For Sale</option>
          <option>Booked</option>
          <option>Leased</option>
          <option>Sold</option>
          <option value="">Not For Sale</option>
        </select>
      </td>

      <td>
        <input type="text" />
      </td>

      {/* SALE DOCUMENT */}
      <td>
        <div className="projectblockvilla-fileupload">
          <input
            type="file"
            onChange={(e) =>
              handleSaleDocChange(rowIndex, e.target.files[0])
            }
          />
<button
  className="projectblockvilla-upload-btn"
  onClick={() => handleUpload(rowIndex)}
>
  Upload
</button>
        </div>

        {/* ✅ THIS WILL NOW SHOW */}
{tableData[rowIndex].saleDoc && (
  <span
    className={
      uploadedRows[rowIndex]
        ? "sale-doc-name uploaded"   // blue
        : "sale-doc-name"             // normal
    }
  >
    {tableData[rowIndex].saleDoc.name}
  </span>
)}
      </td>

      {/* UPLOAD PHOTOS */}
      <td>
        <span
          className="projectblockvilla-upload-link"
         onClick={() => {
  setActiveRow(rowIndex);   // 🔑 VERY IMPORTANT 
  setOpenModal(true);
}}
        >
          Upload/View
        </span>
      </td>

      <td></td>
    </tr>
  ))}
</tbody>
        </table>
        <div className="projectblockvilla-action-bar">
  <button
    className="projectblockvilla-save-btn"
    onClick={handleSave}
  >
    Save
  </button>

  <button className="projectblockvilla-final-btn">
    Final Submit
  </button>
</div>
      </div>
      )}

{projectType === "Villa" && (
  <div className="projectblockvilla-table-wrapper">
    <table className="projectblockvilla-table">
      <thead>
        <tr>
          <th></th>
          <th>S.No</th>
          <th>Villa No</th>
          <th>Construction Status</th>
          <th>Sale Status</th>
          <th>Remarks</th>
          <th>Sale Document</th>
          <th>Upload Photos</th>
        </tr>
      </thead>

      <tbody>
        {villaData.map((row, index) => (
          <tr key={row.id}>
            <td>
              <input
                type="checkbox"
                checked={row.saved || row.checked}
className={
  row.saved
    ? "checkbox-green"
    : row.checked
    ? "checkbox-blue"
    : ""
}
                onChange={(e) => {
                  const updated = [...villaData];
                  updated[index].checked = e.target.checked;
                  setVillaData(updated);
                }}
              />
            </td>

            <td>{row.id}</td>
            <td>{row.id}</td>

            <td>
              <select
                value={row.constructionStatus}
                onChange={(e) => {
                  const updated = [...villaData];
                  updated[index].constructionStatus = e.target.value;
                  setVillaData(updated);
                }}
              >
                <option value="">Select</option>
                <option>Yet To Start</option>
                <option>Under Construction</option>
                <option>Completed</option>
              </select>
            </td>

            <td>
              <select
                value={row.saleStatus}
                onChange={(e) => {
                  const updated = [...villaData];
                  updated[index].saleStatus = e.target.value;
                  setVillaData(updated);
                }}
              >
                <option value="">Select</option>
                <option>Open for Sale</option>
                <option>Booked</option>
                <option>Leased</option>
                <option>Sold</option>
                <option>Not for Sale</option>
              </select>
            </td>

            <td>
              <input
                type="text"
                value={row.remarks}
                onChange={(e) => {
                  const updated = [...villaData];
                  updated[index].remarks = e.target.value;
                  setVillaData(updated);
                }}
              />
            </td>

            {/* Sale Document */}
            <td>
              <div className="projectblockvilla-fileupload">
                <input
                  type="file"
                  onChange={(e) => {
                    const updated = [...villaData];
                    updated[index].saleDoc = e.target.files[0];
                    setVillaData(updated);
                  }}
                />
                <button
                  className="projectblockvilla-upload-btn"
                  onClick={() => {
                    if (!villaData[index].saleDoc) return;
                    const updated = [...villaData];
                    updated[index].uploaded = true;
                    setVillaData(updated);
                  }}
                >
                  Upload
                </button>
              </div>
            </td>

            {/* Upload Photos */}
            <td>
              <span
                className="projectblockvilla-upload-link"
                onClick={() => {
                  setActiveRow(index);
                  setUploadedFiles(row.photos || []);
                  setOpenModal(true);
                }}
              >
                Upload/View
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* 🔥 ADD THIS BELOW TABLE */}
    <div className="projectblockvilla-action-bar">
      <button
        className="projectblockvilla-save-btn"
        onClick={() => {
  const updated = villaData.map((row) => {
    if (
      row.constructionStatus ||
      row.saleStatus ||
      row.remarks ||
      row.saleDoc ||
      row.photos.length > 0
    ) {
      return { ...row, saved: true };
    }
    return row;
  });

  setVillaData(updated);
  alert("Villa data saved successfully!");
}}
      >
        Save
      </button>

      <button
        className="projectblockvilla-final-btn"
        onClick={() => {
          alert("Villa Final Submitted Successfully!");
        }}
      >
        Final Submit
      </button>
    </div>
  </div>
)}
{projectType === "Residential" && activeStep === 1 && (
  <ResidentialBlock
  blockData={blockData}
  setBlockData={setBlockData}
  residentialPhotos={residentialPhotos}
  onUpload={(row) => {
    setActiveRow(row);
    setShowModal(true);
  }}
/>
)}

{projectType === "Residential" && activeStep === 2 && (
  <ResidentialFloor
  floorData={floorData}
  setFloorData={setFloorData}
  residentialPhotos={residentialPhotos}
  onUpload={(row) => {
    setActiveRow(row);
    setShowModal(true);
  }}
/>
)}

{projectType === "Residential" && activeStep === 3 && (
  <ResidentialFlat
  flatData={flatData}
  setFlatData={setFlatData}
  residentialPhotos={residentialPhotos}
  onUpload={(row) => {
    setActiveRow(row);
    setShowModal(true);
  }}
/>
)}
{showModal && (
  <div className="upload-modal-overlay">
    <div className="upload-modal">
      <div className="modal-header">
  <span>Upload Photos</span>
  <span
    className="modal-close-icon"
    onClick={() => setShowModal(false)}
  >
    ×
  </span>
</div>

     <div className="modal-upload-row">
  <input
    type="file"
    onChange={(e) => setSelectedFile(e.target.files[0])}
  />

  <button
    className="modal-add-btn"
    onClick={() => {
      if (!selectedFile) return;

      const key = `${activeStep}-${activeRow}`;

      setResidentialPhotos((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), {
          id: Date.now(),
          file: selectedFile,
          url: URL.createObjectURL(selectedFile),
        }],
      }));

      setSelectedFile(null);
    }}
  >
    Add
  </button>
</div>

      {/* ✅ TABLE SHOW AFTER ADD */}
      {residentialPhotos[`${activeStep}-${activeRow}`]?.length > 0 && (
        <table className="projectblockvilla-modal-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Uploaded File</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {residentialPhotos[`${activeStep}-${activeRow}`].map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <a href={item.url} download>
                    Download
                  </a>
                </td>
                <td>
                  <button
                    className="projectblockvilla-delete-btn"
                    onClick={() => {
                      const key = `${activeStep}-${activeRow}`;
                      const updated =
                        residentialPhotos[key].filter(
                          (photo) => photo.id !== item.id
                        );

                      setResidentialPhotos((prev) => ({
                        ...prev,
                        [key]: updated,
                      }));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => setShowModal(false)}>
        Close
      </button>
    </div>
  </div>
)}

     {openModal && (
  <div className="projectblockvilla-modal-overlay">
    <div className="projectblockvilla-modal">

      {/* Header */}
      <div className="projectblockvilla-modal-header">
        <h3>Upload Photos</h3>
        <span
          className="projectblockvilla-modal-close"
          onClick={() => setOpenModal(false)}
        >
          ×
        </span>
      </div>

      {/* Body */}
      <div className="projectblockvilla-modal-body">
        <label>
          Upload Photos:<span className="projectblockvilla-required">*</span>
        </label>

        <div className="projectblockvilla-modal-upload">
          <input type="file" onChange={handleFileChange} />
          <button className="projectblockvilla-add-btn" onClick={handleAddFile}  >
            Add
          </button>
        </div>

        {/* TABLE (like 1st image) */}
        {activeRow !== null &&
 tableData[activeRow].photos.length > 0 && (  
          <table className="projectblockvilla-modal-table">
            <thead>
              <tr>
                
                <th>S.No</th>
                <th>Uploaded Photos</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
{tableData[activeRow].photos.map((item, index) => (
  <tr key={item.id}>
    <td>{index + 1}</td>
    <td>
      <a href={item.url} download className="projectblockvilla-download">
        Download
      </a>
    </td>
    <td>
 <button
  className="projectblockvilla-delete-btn"
  onClick={() => {
    const key = `${activeStep}-${currentBlockIndex}`;

    const updatedRowFiles = uploadedFiles[key].filter(
      (_, i) => i !== index
    );

    setUploadedFiles((prev) => ({
      ...prev,
      [key]: updatedRowFiles,
    }));
  }}
>
  Delete
</button>
    </td>
  </tr>
))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="projectblockvilla-modal-footer">
        <button
          className="projectblockvilla-close-btn"
          onClick={() => setOpenModal(false)}
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
{showUploadModal && (
  <div className="upload-modal-overlay">
    <div className="upload-modal-box">

      {/* Header */}
      <div className="upload-modal-header">
        <span>Upload Photos</span>
        <span
          className="upload-modal-close-icon"
          onClick={() => setShowUploadModal(false)}
        >
          ×
        </span>
      </div>

      {/* Body */}
      <div className="upload-modal-body">
        <label>
          Upload Photos:<span className="projectblockvilla-required">*</span>
        </label>

        <div className="upload-row">
          <input
            type="file"
            multiple
            onChange={(e) => setTempFiles(e.target.files)}
          />

          <button
            className="upload-add-btn"
            onClick={() => {
              if (!tempFiles.length) return;

              const key = `${activeStep}-${currentBlockIndex}`;

              setUploadedFiles((prev) => ({
                ...prev,
                [key]: [...(prev[key] || []), ...Array.from(tempFiles)],
              }));

              setTempFiles([]);
            }}
          >
            Add
          </button>
        </div>

        {/* Uploaded files table */}
        {(uploadedFiles[`${activeStep}-${currentBlockIndex}`] || []).length > 0 && (
          <table className="uploaded-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Uploaded Photos</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(uploadedFiles[`${activeStep}-${currentBlockIndex}`] || []).map(
                (file, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a
                        href={URL.createObjectURL(file)}
                        download
                        className="download-link"
                      >
                        Download
                      </a>
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          const key = `${activeStep}-${currentBlockIndex}`;
                          const updated = uploadedFiles[key].filter(
                            (_, i) => i !== index
                          );
                          setUploadedFiles((prev) => ({
                            ...prev,
                            [key]: updated,
                          }));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="upload-modal-footer">
        <button
          className="upload-close-btn"
          onClick={() => setShowUploadModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{/* 🔵 RESIDENTIAL BOTTOM BUTTONS */}
{projectType === "Residential" && (
  <div className="residential-section">
    <div className="residential-bottom-buttons">

    {/* BLOCK STEP */}
    {activeStep === 1 && (
  <>
    {/* CENTER SAVE */}
    <button
      className="block-save-btn"
      onClick={handleSaveBlock}
    >
      Save
    </button>

    {/* RIGHT NEXT */}
    <button
      className="block-next-btn"
      onClick={() => setActiveStep(2)}
    >
      Next
    </button>
  </>
)}
    {/* FLOOR STEP */}
    {activeStep === 2 && (
  <div className="floor-button-layout">

    <button
      className="floor-prev-btn"
      onClick={() => setActiveStep(1)}
    >
      Previous
    </button>

    <button
      className="floor-save-btn"
      onClick={handleSaveFloor}
    >
      Save
    </button>

    <button
      className="floor-next-btn"
      onClick={() => setActiveStep(3)}
    >
      Next
    </button>

  </div>
)}

    {/* FLAT STEP */}
    {activeStep === 3 && (
      <>
        {/* 🔥 Previous Button */}
        <button
          className="res-prev-btn"
          onClick={() => setActiveStep(2)}
        >
          Previous
        </button>

        <button
          className="res-save-btn"
          onClick={handleSaveFlat}
        >
          Save
        </button>

        <button
          className="res-submit-btn"
          onClick={() => alert("Residential Submitted Successfully")}
        >
          Submit
        </button>
      </>
    )}

  </div>
  </div>
)}
{projectType === "Commercial" && (
  <>
        {activeStep === 0 && (
        <div className="projectblockvilla-table-wrapper">
          <h3>Upload Financial & Supporting Documents (F1–F5)</h3>
          <input type="file" multiple />

          <div className="projectblockvilla-action-row">
            {/* <button className="projectblockvilla-back-btn" disabled>
              Previous
            </button> */}
            <button
              className="projectblockvilla-submit-btn"
              onClick={() => setActiveStep(1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2 : BLOCK WISE ================= */}
{activeStep === 1 && (
          <div className="projectblockvilla-table-wrapper">
          <h3>
            Select Construction Status, fill remarks & Upload photos (Block Wise)
          </h3>

          <table className="projectblockvilla-table">
            <thead>
              <tr>
                <th></th>
                <th>S.No</th>
                <th>Block Name</th>
                <th>Construction Status</th>
                <th>Remarks</th>
                <th>Upload Photos (Block Wise)</th>
              </tr>
            </thead>
            <tbody>
              {["Block A", "Block B", "Block C"].map((block, index) => (
                <tr
  key={index}
  className={blockData[index].saved ? "saved-row" : ""}
>
  <td>
    <input
      type="checkbox"
      checked={blockData[index].checked}
      onChange={() => {
        const updated = [...blockData];
        updated[index].checked = !updated[index].checked;
        setBlockData(updated);
      }}
    />
  </td>
                  <td>{index + 1}</td>
              <td>
  <select
    value={blockData[index].block || ""}
    onChange={(e) => {
      const updated = [...blockData];
      updated[index].block = e.target.value;
      setBlockData(updated);
    }}
  >
    <option value="">Select Block</option>
    <option value="Block A">Block A</option>
    <option value="Block B">Block B</option>
    <option value="Block C">Block C</option>
  </select>
</td>

                  {/* Status */}
                  <td>
                    <select
                      value={blockData[index].status}
                      onChange={(e) => {
                        const updated = [...blockData];
                        updated[index].status = e.target.value;
                        setBlockData(updated);
                      }}
                    >
                      <option value="">Select</option>
                      <option>Yet To Start</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </td>

                  {/* Remarks */}
                  <td>
                    <input
                      type="text"
                      placeholder="Enter remarks"
                      value={blockData[index].remarks}
                      onChange={(e) => {
                        const updated = [...blockData];
                        updated[index].remarks = e.target.value;
                        setBlockData(updated);
                      }}
                    />
                  </td>

                  {/* File */}
                {/* Upload Photos (Block Wise) */}
<td>
  <span
    className="upload-view-link"
    onClick={() => {
      setCurrentBlockIndex(index);
      setShowUploadModal(true);
    }}
  >
    Upload/View
  </span>
</td>
                </tr>
              ))}
            </tbody>
          </table>

 <div className="projectblockvilla-action-row">
  <button
    className="projectblockvilla-save-btn center-save-btn"
    onClick={handleSaveBlock}
  >
    Save
  </button>

  <button
    className="projectblockvilla-submit-btn next-right-btn"
    onClick={() => setActiveStep(2)}
  >
    Next
  </button>
</div>
        </div>
      )}

      {/* ================= STEP 3 : FLOOR WISE ================= */}
     {activeStep === 2 && (
        <div className="projectblockvilla-table-wrapper">
          <h3>
            Select Block Name & Construction Status, Upload photos (Floor Wise)
          </h3>

          <table className="projectblockvilla-table">
            <thead>
              <tr>
                <th></th>
                <th>S.No</th>
                <th>Block Name</th>
                <th>Floor No</th>
                <th>Construction Status</th>
                <th>Remarks</th>
                <th>Upload Photos (Floor Wise)</th>
              </tr>
            </thead>
          <tbody>
  {floorData.map((row, index) => (
    <tr
  key={index}
  className={row.saved ? "saved-row" : ""}
>
  <td>
    <input
      type="checkbox"
      checked={row.checked}
      onChange={() => {
        const updated = [...floorData];
        updated[index].checked = !updated[index].checked;
        setFloorData(updated);
      }}
    />
  </td>
      <td>{index + 1}</td>

      {/* 🔽 Block Name Dropdown */}
      <td>
        <select
          value={row.block}
          onChange={(e) => {
            const updated = [...floorData];
            updated[index].block = e.target.value;
            setFloorData(updated);
          }}
        >
          <option value="">Select Block</option>
          <option value="Block A">Block A</option>
          <option value="Block B">Block B</option>
          <option value="Block C">Block C</option>
        </select>
      </td>

      {/* 🔽 Floor Number Dropdown */}
      <td>
        <select
          value={row.floor}
          onChange={(e) => {
            const updated = [...floorData];
            updated[index].floor = e.target.value;
            setFloorData(updated);
          }}
        >
          <option value="">Select Floor</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </td>

      {/* Construction Status */}
      <td>
        <select
          value={row.status}
          onChange={(e) => {
            const updated = [...floorData];
            updated[index].status = e.target.value;
            setFloorData(updated);
          }}
        >
          <option value="">Select</option>
          <option>Yet To Start</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </td>

      {/* Remarks */}
      <td>
        <input
          type="text"
          placeholder="Enter remarks"
          value={row.remarks}
          onChange={(e) => {
            const updated = [...floorData];
            updated[index].remarks = e.target.value;
            setFloorData(updated);
          }}
        />
      </td>

      {/* File Upload */}
    {/* Upload Photos (Floor Wise) */}
<td>
  <span
    className="upload-view-link"
    onClick={() => {
      setCurrentBlockIndex(index);
      setShowUploadModal(true);
    }}
  >
    Upload/View
  </span>
</td>
    </tr>
  ))}
</tbody>
          </table>

         <div className="projectblockvilla-action-row">
  <button
    className="projectblockvilla-back-btn"
    onClick={() => setActiveStep(1)}
  >
    Previous
  </button>

  <button
    className="projectblockvilla-save-btn"
    onClick={handleSaveFloor}
  >
    Save
  </button>

  <button
    className="projectblockvilla-submit-btn"
    onClick={() => setActiveStep(3)}
  >
    Next
  </button>
</div>
        </div>
      )}

      {/* ================= STEP 4 : FINAL SUBMIT ================= */}
{activeStep === 3 && (
  <div className="projectblockvilla-table-wrapper">
    <h3>
      Select Block Name & Floor No, Construction Status, Sale Status &
      Upload Documents
    </h3>

    <table className="projectblockvilla-table">
      <thead>
        <tr>
          {/* 🔥 Checkbox Header (must be present) */}
          <th style={{ width: "50px", textAlign: "center" }}></th>

          {/* S.No */}
          <th style={{ width: "70px" }}>S.No</th>

          <th>Block Name</th>
          <th>Floor No</th>
          <th>Construction Status</th>
          <th>Sale Status</th>
          <th>Remarks</th>
          <th>Sale Document</th>
          <th>Upload Photos</th>
        </tr>
      </thead>

      <tbody>
        {flatData.map((row, index) => (
          <tr
  key={index}
  className={row.saved ? "saved-row" : ""}
>
            {/* 🔥 Checkbox Column */}
            <td style={{ textAlign: "center" }}>
              <input
    type="checkbox"
    checked={row.saved || row.checked}
    className={
      row.saved
        ? "checkbox-green"
        : row.checked
        ? "checkbox-blue"
        : ""
    }
    onChange={(e) => {
      const updated = [...flatData];
      updated[index].checked = e.target.checked;
      setFlatData(updated);
    }}
  />
</td>

            {/* 1. S.No */}
            <td>{index + 1}</td>

            {/* 2. Block Name */}
            <td>
              <select
                value={row.block}
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].block = e.target.value;
                  setFlatData(updated);
                }}
              >
                <option value="">Select Block</option>
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Block C">Block C</option>
              </select>
            </td>

            {/* 3. Floor No */}
            <td>
              <select
                value={row.floor}
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].floor = e.target.value;
                  setFlatData(updated);
                }}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </td>

            {/* 4. Construction Status */}
            <td>
              <select
                value={row.status}
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].status = e.target.value;
                  setFlatData(updated);
                }}
              >
                <option value="">Select</option>
                <option>Yet To Start</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </td>

            {/* 5. Sale Status */}
            <td>
              <select
                value={row.saleStatus}
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].saleStatus = e.target.value;
                  setFlatData(updated);     
                }}
              >
                <option value="">Select</option>
                <option>Sold</option>
                <option>Available</option>
              </select>
            </td>

            {/* 6. Remarks */}
            <td>
              <input
                type="text"
                value={row.remarks}
                placeholder="Enter remarks"
                onChange={(e) => {
                  const updated = [...flatData];
                  updated[index].remarks = e.target.value;
                  setFlatData(updated);
                }}
              />
            </td>

            {/* 7. Sale Document */}
            <td>
              <div className="sale-doc-upload-box">
                <input
                  type="file"
                  className="sale-doc-input"
                  onChange={(e) => {
                    const updated = [...flatData];
                    updated[index].saleDoc = e.target.files[0];
                    setFlatData(updated);
                  }}
                />

                <button
                  type="button"
                  className="sale-doc-upload-btn"
                  onClick={() => {
                    if (!flatData[index].saleDoc) {
                      alert("Please choose a file first");
                      return;
                    }

                    const updated = [...flatData];
                    updated[index].uploadedFileName =
                      updated[index].saleDoc.name;
                    setFlatData(updated);
                  }}
                >
                  Upload
                </button>

                {flatData[index].uploadedFileName && (
                  <span className="uploaded-file-name">
                    {flatData[index].uploadedFileName}
                  </span>
                )}
              </div>
            </td>

            {/* 8. Upload Photos */}
            <td>
              <span
                className="upload-view-link"
                onClick={() => {
                  setCurrentBlockIndex(index);
                  setShowUploadModal(true);
                }}
              >
                Upload/View
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="projectblockvilla-action-row">
      <button
        className="projectblockvilla-back-btn"
        onClick={() => setActiveStep(2)}
      >
        Previous
      </button>

      <button
        className="projectblockvilla-save-btn"
        onClick={handleSaveFlat}
      >
        Save
      </button>

      <button className="projectblockvilla-submit-btn">
        Submit Quarterly Update
      </button>
    </div>
  </div>
)}
</>
)}   
    </div>
    </div>
  );
};


export default ProjectBlockVillaDetails;