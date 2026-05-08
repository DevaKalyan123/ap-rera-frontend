import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/ApplicantDetails.css";
import { apiGet,apiPost } from "../api/api";

const ApplicantDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const completedStep = Number(localStorage.getItem("completedStep") || 0);

  const passedPan = location.state?.pan || "";
  const [litigationStatus, setLitigationStatus] = useState(null);
  const [occupations, setOccupations] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [agentType, setAgentType] = useState("Individual");

  //const applicationNo = sessionStorage.getItem("application_no");
  const [interimOrder, setInterimOrder] = useState(null);
  const [finalOrder, setFinalOrder] = useState(null);
  const [otherStateReg, setOtherStateReg] = useState(null);


// ===== Projects (Last 5 Years) =====
const [projectName, setProjectName] = useState("");
const [projects, setProjects] = useState([]);
const [litigations, setLitigations] = useState([]);

const [litigationForm, setLitigationForm] = useState({
  caseNo: "",
  namePlace: "",
  petitioner: "",
  respondent: "",
  facts: "",
  presentStatus: "",
  interimOrder: "No",
  finalOrder: "No",
  interimCert: null,
  disposedCert: null,
});
const [uploadedFiles, setUploadedFiles] = useState({
  photograph: null,
  panProof: null,
  addressProof: null,
  //selfAffidavitFile: null,
});
const [savedFiles, setSavedFiles] = useState({
  selfAffidavit: null,
});


// ===== Other State RERA =====
// ===== Other State RERA =====
//const [otherStateReg, setOtherStateReg] = useState("No");

const [otherReraForm, setOtherReraForm] = useState({
  regNo: "",
  stateId: "",
  stateName: "",
  districtId: "",
  districtName: "",
});

const [otherReraList, setOtherReraList] = useState([]);
  
  // Location dropdowns
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);
  const [villages, setVillages] = useState([]);
  const [otherStates, setOtherStates] = useState([]);
  const [otherDistricts, setOtherDistricts] = useState([]);
  const [otherStateId, setOtherStateId] = useState("");
  const [otherDistrictId, setOtherDistrictId] = useState("");

  const [form, setForm] = useState({
    agentName: "",
    fatherName: "",
    occupation: "",
    occupationName: "",
    email: "",
    aadhaar: "",
    pan: "",
    panProof: null,
    mobile: "",
    landline: "",
    licenseNumber: "",
    licenseDate: "",
    address1: "",
    address2: "",
    state: "",
    district: "",
    mandal: "",
    village: "",
    pincode: "",
    addressProof: null,
    
  });
  //const completedStep = Number(localStorage.getItem("completedStep") || 0);


  //   const [files, setFiles] = useState({
  //   photograph: null,
  //   panProof: null,
  //   addressProof: null,
  // });
    /* ================= LOAD SAVED FORM ================= */

// useEffect(() => {
//   if (!applicationNo) return;

//   apiGet(`api/agent/resume-applicationss/${applicationNo}`)
//     .then((res) => {
//       if (res.success && res.data) {
//         const d = res.data;

//         setForm((prev) => ({
//           ...prev,

//           // -------- BASIC DETAILS --------
//           agentName: d.agent_name || "",
//           fatherName: d.father_name || "",
//           occupation: d.occupation_id || "",
//           email: d.email || "",
//           aadhaar: d.aadhaar || "",
//           pan: d.pan || "",
//           mobile: d.mobile || "",
//           landline: d.landline || "",
//           licenseNumber: d.license_number || "",
//           licenseDate: d.license_date || "",

//           // -------- ADDRESS --------
//           address1: d.address1 || "",
//           address2: d.address2 || "",
//           state: d.state_id || "",
//           district: d.district || "",
//           mandal: d.mandal || "",
//           village: d.village || "",
//           pincode: d.pincode || "",
//         }));

//         // -------- FILE INFO (display only) --------
//         setUploadedFiles({
//           photograph: d.photograph || null,
//           panProof: d.pan_proof || null,
//           addressProof: d.address_proof || null,
//           selfAffidavitFile: d.self_declared_affidavit || null,
//         });
//       }
//     })
//     .catch((err) => {
//       console.error("Resume error:", err);
//     });
// }, [applicationNo]);

// useEffect(() => {
//   const agentId = localStorage.getItem("agentId");
//   if (agentId) {
//     localStorage.setItem("completedStep", "1");
//   }
// }, []);
// useEffect(() => {
//   const completed = Number(localStorage.getItem("completedStep") || 0);

//   // 🔥 ensure agent step stays completed
//   if (completed < 1) {
//     localStorage.setItem("completedStep", "1");
//   }
// }, []);


useEffect(() => {
  // ✅ clear ONLY when PAN comes from PAN-entry flow
  if (passedPan && !location.state?.agentId) {
    localStorage.removeItem("agentId");
    localStorage.removeItem("completedStep");
  }
}, [passedPan, location.state]);

useEffect(() => {
  if (passedPan) {
    setForm((prev) => ({
      ...prev,
      pan: passedPan,
    }));
  }
}, [passedPan]);


useEffect(() => {
  // 🚫 If new PAN flow, do NOT load preview
  if (passedPan) return;

  const agentId = location.state?.agentId || localStorage.getItem("agentId");
  if (!agentId) return;

  apiGet(`/api/agent/preview/${agentId}`)
    .then((res) => {
      if (!res.success) return;

      const { agent_details, projects, litigations, other_state_rera } = res.data;

      /* ================= BASIC FORM ================= */
      setForm({
        agentName: agent_details.agent_name || "",
        fatherName: agent_details.father_name || "",
        occupation: agent_details.occupation_id || "",
        occupationName: agent_details.occupation_name || "",
        email: agent_details.email || "",
        aadhaar: agent_details.aadhaar || "",
        pan: agent_details.pan || "",
        mobile: agent_details.mobile || "",
        landline: agent_details.landline || "",
        licenseNumber: agent_details.license_number || "",
       licenseDate: agent_details.license_date
  ? new Date(agent_details.license_date).toISOString().slice(0, 10)
  : "",

        address1: agent_details.address1 || "",
        address2: agent_details.address2 || "",
        state: agent_details.state_id || "",
        district: agent_details.district || "",
        mandal: agent_details.mandal || "",
        village: agent_details.village || "",
        pincode: agent_details.pincode || "",
      });

      /* ================= FILES ================= */
      setUploadedFiles({
        photograph: agent_details.photograph,
        panProof: agent_details.pan_proof,
        addressProof: agent_details.address_proof,
       // selfAffidavitFile: agent_details.self_declared_affidavit,
      });
      setSavedFiles({
  selfAffidavit: agent_details.self_declared_affidavit,
});


      /* ================= PROJECTS ================= */
      setShowProjects(
        agent_details.last_five_years_project_details === "Yes"
      );
      setProjects(
        projects.map((p) => ({
          id: p.id,
          name: p.project_name,
        }))
      );

      /* ================= LITIGATIONS ================= */
      setLitigationStatus(agent_details.any_civil_criminal_cases);
      setLitigations(
        litigations.map((l) => ({
          id: l.id,
          caseNo: l.case_no,
          namePlace: l.tribunal_place,
          petitioner: l.petitioner_name,
          respondent: l.respondent_name,
          facts: l.case_facts,
          presentStatus: l.present_status,
          interimOrder: l.interim_order,
          finalOrder: l.final_order,
          interimCert: l.interim_order_certificate,
          disposedCert: l.disposed_certificate,
        }))
      );
      // ✅ Restore Interim & Final Order radios
if (litigations && litigations.length > 0) {
  setInterimOrder(litigations[0].interim_order || "No");
  setFinalOrder(litigations[0].final_order || "No");
}


      /* ================= OTHER STATE RERA ================= */
      setOtherStateReg(agent_details.registration_other_states === "Yes");
      setOtherReraList(
        other_state_rera.map((r) => ({
          id: r.id,
          regNo: r.registration_number,
          stateId: r.state_id,
          stateName: r.state_name,
          districtName: r.district,
        }))
      );
      setOtherReraForm({
  regNo: "",
  stateId: "",
  stateName: "",
  districtId: "",
  districtName: "",
});

    });
}, []);


  //  useEffect(() => {
  //   if (!passedPan) return;

  //   const savedForm = localStorage.getItem(`applicantForm_${passedPan}`);

  //   if (savedForm) {
  //     setForm(JSON.parse(savedForm));
  //   } else {
  //     setForm((prev) => ({ ...prev, pan: passedPan }));
  //   }
  // }, [passedPan]);

  // useEffect(() => {
  // if (!form.pan) return;

  // localStorage.setItem(
  //   `applicantForm_${form.pan}`,
  //   JSON.stringify(form)
  // );

  // localStorage.setItem("currentPan", form.pan);
  // }, [form]);


//  useEffect(() => {
//   sessionStorage.removeItem("application_no");
//   localStorage.removeItem("agentId");

//   setForm({
//     agentName: "",
//     fatherName: "",
//     occupation: "",
//     occupationName: "",
//     email: "",
//     aadhaar: "",
//     pan: passedPan || "",
//     photograph: null,
//     panProof: null,
//     mobile: "",
//     landline: "",
//     licenseNumber: "",
//     licenseDate: "",
//     address1: "",
//     address2: "",
//     state: "",
//     district: "",
//     mandal: "",
//     village: "",
//     pincode: "",
//     addressProof: null,
//   });

//   setLitigationStatus(null);
//   setShowProjects(null);
//   setOtherStateReg(null);   // 👈 ADD THIS LINE
//   setAgentType("Individual");
// }, []);


  // Fetch occupations
  useEffect(() => {
    apiGet("/api/occupations")
      .then((res) => {
        if (res.success) {
          setOccupations(res.data);
        }
      })
      .catch((err) => console.error("Occupation API error:", err));
  }, []);

  // Fetch states on mount
  useEffect(() => {
    apiGet("/api/states")
      .then((res) => {
        setStates(res || []);
      })
      .catch((err) => console.error("States API error:", err));
  }, []);

 


  // Fetch districts when state changes
  useEffect(() => {
    if (form.state) {
      apiGet(`/api/districts/${form.state}`)
        .then((res) => {
          setDistricts(res || []);
          setMandals([]);
          setVillages([]);
        })
        .catch((err) => console.error("Districts API error:", err));
    }
  }, [form.state]);

  // Fetch mandals when district changes
  useEffect(() => {
  if (!form.district) return;

  apiGet(`/api/mandals/${form.district}`)
    .then((res) => {
      setMandals(res || []);
    })
    .catch((err) => console.error("Mandals API error:", err));
}, [form.district]);


  // Fetch villages when mandal changes
  useEffect(() => {
  if (!form.mandal) return;

  apiGet(`/api/villages/${form.mandal}`)
    .then((res) => {
      setVillages(res || []);
    })
    .catch((err) => console.error("Villages API error:", err));
}, [form.mandal]);

useEffect(() => {
  if (
    villages.length > 0 &&
    form.village &&
    !villages.find(v => v.id == form.village)
  ) {
    // re-set village after villages are loaded
    setForm(prev => ({
      ...prev,
      village: prev.village,
    }));
  }
}, [villages]);


useEffect(() => {
  apiGet("/api/states")
    .then((res) => {
      console.log("Other States API response:", res); // 👈 IMPORTANT

      const data =
        res?.data && Array.isArray(res.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

      setOtherStates(
        data.map((s) => ({
          state_id: s.state_id ?? s.id,
          state_name: s.state_name ?? s.name,
        }))
      );
    })
    .catch((err) => console.error("Other States API error:", err));
}, []);



  
  
 useEffect(() => {
  if (!otherStateId) return;

  apiGet(`/api/districts/${otherStateId}`)
    .then((res) => {
      console.log("Other Districts API response:", res);

      const data =
        res?.data && Array.isArray(res.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

      setOtherDistricts(
        data.map((d) => ({
          district_id: d.district_id ?? d.id,
          district_name: d.district_name ?? d.name,
        }))
      );
    })
    .catch((err) => console.error("Other Districts API error:", err));
}, [otherStateId]);


  
    const [showProjects, setShowProjects] = useState(null);
    // const [showOtherState, setShowOtherState] = useState(null)

  /* -------------------- HANDLERS -------------------- */


  // Add project
const handleAddProject = () => {
  if (!projectName.trim()) {
    alert("Please enter Project Name");
    return;
  }

  const newProject = {
    id: Date.now(), // temporary id (backend will replace later)
    name: projectName,
  };

  setProjects([...projects, newProject]);
  setProjectName("");
};

// Delete project
const handleDeleteProject = (id) => {
  setProjects(projects.filter((p) => p.id !== id));
};

// ===== Litigation handlers =====
const handleLitigationChange = (e) => {
  const { name, value } = e.target;
  setLitigationForm({ ...litigationForm, [name]: value });
};

const handleAddLitigation = () => {
  if (
    !litigationForm.caseNo ||
    !litigationForm.namePlace ||
    !litigationForm.petitioner ||
    !litigationForm.respondent ||
    !litigationForm.presentStatus
  ) {
    alert("Please fill all required fields");
    return;
  }

  setLitigations([
    ...litigations,
    { ...litigationForm, id: Date.now() },
  ]);

  // reset form
  setLitigationForm({
    caseNo: "",
    namePlace: "",
    petitioner: "",
    respondent: "",
    facts: "",
    presentStatus: "",
    interimOrder: "No",
    finalOrder: "No",
  });

  setInterimOrder("No");
  setFinalOrder("No");
};

const handleDeleteLitigation = (id) => {
  setLitigations(litigations.filter((l) => l.id !== id));
};

// Add Other State RERA
const handleAddOtherRera = () => {
  if (
    !otherReraForm.regNo ||
    !otherReraForm.stateId ||
    !otherReraForm.districtId
  ) {
    alert("Please fill all fields");
    return;
  }

  const newRow = {
    id: Date.now(),
    ...otherReraForm,
  };

  setOtherReraList([...otherReraList, newRow]);

  // reset form
  setOtherReraForm({
    regNo: "",
    stateId: "",
    stateName: "",
    districtId: "",
    districtName: "",
  });
};

// Delete row
const handleDeleteOtherRera = (id) => {
  setOtherReraList(otherReraList.filter((r) => r.id !== id));
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, [fieldName]: file });
    }
  };

  const validateFile = (file, type) => {
    if (!file) return false;
    const name = file.name.toLowerCase();
    if (type === "jpg" && !name.endsWith(".jpg")) {
      alert("Only JPG files allowed");
      return false;
    }
    if (type === "pdf" && !name.endsWith(".pdf")) {
      alert("Only PDF files allowed");
      return false;
    }
    return true;
  };

  /* -------------------- VALIDATION -------------------- */
  const handleSaveContinue = async () => {

  if (!form.agentName) return alert("Please Enter Agent Name");
  if (!form.photograph && !uploadedFiles.photograph)
  return alert("Please Upload Photograph");
  if (!form.fatherName) return alert("Please Enter Father Name");
  if (!form.occupation) return alert("Please Select Occupation");
  if (!form.email) return alert("Please Enter Email");
  if (form.aadhaar.length !== 12) return alert("Aadhaar Number must be 12 digits");
  if (!form.panProof && !uploadedFiles.panProof)
  return alert("Please Upload PAN Card");
  if (form.pan.length !== 10) return alert("PAN Card must be 10 digits");
  if (!form.mobile) return alert("Please Enter Mobile Number");
  if (!form.address1) return alert("Please Enter Address Line 1");
  if (!form.state) return alert("Please Select State");
  if (!form.district) return alert("Please Select District");
  if (!form.mandal) return alert("Please Select Mandal");
  if (!form.village) return alert("Please Select Local Area / Village");
  if (!form.pincode) return alert("Please Enter PIN Code");
 if (!form.addressProof && !uploadedFiles.addressProof)
  return alert("Please Upload Address Proof");
   if (litigationStatus === null)
    return alert("Please select Yes or No for Litigations");
  if (litigationStatus === "No" && !uploadedFiles.selfAffidavitFile) {
  return alert("Please upload Self Declared Affidavit file");
}

  if (showProjects === null)
    return alert("Please select Yes or No for Projects");

  if (otherStateReg === null)
    return alert("Please select Yes or No for Other State RERA");
  // ================= CONDITIONAL VALIDATIONS =================

  // 🔹 Projects
  if (showProjects === true && projects.length === 0) {
    return alert("Please add at least one Project");
  }

  // 🔹 Litigations
  if (litigationStatus === "Yes" && litigations.length === 0) {
    return alert("Please add at least one Litigation record");
  }
  // if (litigationStatus === "No" && litigations.length === 0) {
  //   return alert("Please choose the file");
  // }

  // 🔹 Other State RERA
  if (otherStateReg === true && otherReraList.length === 0) {
    return alert("Please add at least one Other State RERA registration");
  }
  {uploadedFiles.photograph && (
  <small style={{ color: "green" }}>Already uploaded</small>
)}



  try {
    const formData = new FormData();

    // text fields
    Object.entries(form).forEach(([key, value]) => {
      if (
        key !== "photograph" &&
        key !== "panProof" &&
        key !== "addressProof"
      ) {
        formData.append(key, value);
      }
    });

    // file fields
    formData.append("agentType", agentType);
    formData.append("photograph", form.photograph);
    formData.append("panProof", form.panProof);
    formData.append("addressProof", form.addressProof);
    if (uploadedFiles.selfAffidavitFile) {
  formData.append("selfAffidavit", uploadedFiles.selfAffidavitFile);

}
formData.append("last_five_years_project_details", showProjects ? "Yes" : "No");
formData.append("any_civil_criminal_cases", litigationStatus);   // "Yes" or "No"
formData.append("registration_other_states", otherStateReg ? "Yes" : "No");
formData.append("projects", JSON.stringify(projects));
const cleanLitigations = litigations.map((l) => ({
  caseNo: l.caseNo,
  namePlace: l.namePlace,
  petitioner: l.petitioner,
  respondent: l.respondent,
  facts: l.facts,
  presentStatus: l.presentStatus,
  interimOrder: l.interimOrder,
  finalOrder: l.finalOrder,
}));
formData.append("litigations", JSON.stringify(cleanLitigations));

// append interim and disposed certificate files separately
litigations.forEach((l, index) => {
  if (l.interimCert) {
    formData.append(`interimCert_${index}`, l.interimCert);
  }
  if (l.disposedCert) {
    formData.append(`disposedCert_${index}`, l.disposedCert);
  }
});
formData.append("otherReraList", JSON.stringify(otherReraList));


   // append agent_id
formData.append("agent_id", localStorage.getItem("agentId"));

// ✅ ACTUAL API CALL
const response = await apiPost("/api/agent/register-step1", formData);



   if (response.success) {
  localStorage.setItem("agentId", response.agent_id);

  // ✅ THIS IS THE ONLY PLACE STEP-1 MUST BE SET
  localStorage.setItem("completedStep", "1");

  setShowSuccessPopup(true);
}
else {
      alert(response.message || "Failed to save applicant details");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong while saving");
  }
  if (response.success) {
  setSavedFiles({
    selfAffidavit: uploadedFiles.selfAffidavitFile,
  });
}
};

  /* -------------------- UI -------------------- */
  return (
    <div className="applicantdetails-page-wrapper">
      <div className="applicantdetails-rera-container">
        {/* Breadcrumb */}
        <div className="applicantdetails-breadcrumb">
          You are here :
       <a href="/"> <span className="applicantdetails-link"> Home </span> </a>/
        <span> Registration </span> /
          <span>Real Estate Agent Registration</span>
        </div>

        <div className="applicantdetails-content-box">
          <h2 className="applicantdetails-page-title">Real Estate Agent Registration</h2>

          {/* Stepper */}
      <div className="applicantdetails-stepper">
  {[
    { label: "Agent Detail", path: "/applicant-details", step: 1 },
    { label: "Upload Documents", path: "/agent-upload-documents", step: 2 },
    { label: "Preview", path: "/agent-preview", step: 3 },
    { label: "Payment", path: "", step: 4 },
    { label: "Acknowledgement", path: "/agent-acknowledgement", step: 5 },
  ].map((item) => {
    const isClickable = item.step <= completedStep + 1;
     (item.step === completedStep + 1 && completedStep < 3);

    return (
      <div
        key={item.step}
        className="applicantdetails-step"
        style={{
          cursor: isClickable ? "pointer" : "not-allowed",
          opacity: isClickable ? 1 : 0.4,
        }}
        onClick={() => {
          if (!isClickable) {
            alert("Please complete previous step first");
            return;
          }

          navigate(item.path, {
            state: { agentId: localStorage.getItem("agentId") },
          });
        }}
      >
        <div
          className={`applicantdetails-circle ${
             item.step === 1 || item.step <= completedStep ? "active" : ""
          }`}
        >
          {item.step}
        </div>

        <span>{item.label}</span>
      </div>
    );
  })}
</div>


          {/* Applicant Details */}
          <section className="applicantdetails-section">
  <h3 className="applicantdetails-section-title">Agent Type</h3>

  <div className="applicantdetails-radio-inline">
  <label>
    <input
      type="radio"
      name="agentType"
      value="Individual"
      checked={true}
      disabled
    />
    Individual
  </label>

  <label style={{ marginLeft: "30px", color: "#999" }}>
    <input
      type="radio"
      name="agentType"
      value="Other"
      disabled
    />
    Other than individual
  </label>
</div>
</section>
          <section className="applicantdetails-section">
            <h3 className="applicantdetails-section-title">Applicant Details</h3>

            <div className="applicantdetails-grid-4">
              <div>
                <label className="required">Agent Name</label>
                <input name="agentName" value={form.agentName} onChange={handleChange} placeholder="Agent Name"/>
              </div>

              <div>
                <label className="required">Upload Photograph (JPG)</label>
                <input
                  type="file"
                  accept=".jpg"
                  onChange={(e) => {
                    if (validateFile(e.target.files[0], "jpg")) {
                      handleFileChange(e, "photograph");
                    }
                  }}
                />
                
{/* {uploadedFiles.photograph && (
  <small style={{ color: "green" }}>
    ✔ Photograph already uploaded
  </small>
)} */}
              </div>

              <div>
                <label className="required">Father's Name</label>
                <input name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father Name"/>
              </div>

              <div>
                <label className="required">Occupation</label>
                <select
                  name="occupation"
                  value={form.occupation}
                  onChange={(e) => {
                    const selected = occupations.find(
                      (o) => o.occupation_id == e.target.value
                    );
                    setForm({
                      ...form,
                      occupation: e.target.value,
                      occupationName: selected?.occupation_name || "",
                    });
                  }}
                >
                  <option value="">Select</option>
                  {occupations.map((o) => (
                    <option key={o.occupation_id} value={o.occupation_id}>
                      {o.occupation_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="required">Email Id</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Id"
 />
              </div>

              <div>
                <label className="required">Aadhaar Number</label>
                <input
                  name="aadhaar"
                  value={form.aadhaar}
                  maxLength="12"
                  placeholder="Aadhaar Number"

                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setForm({ ...form, aadhaar: value });
                  }}
                />
              </div>

              <div>
                <label className="required">PAN Card Number</label>
                <input
  name="pan"
  value={form.pan}
  maxLength="10"
  disabled={!!passedPan}   // 🔒 lock PAN
  onChange={(e) => {
    const value = e.target.value.toUpperCase();
    setForm({ ...form, pan: value });
  }}
/>
              </div>

              <div>
                <label className="required">Upload PAN Card (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    if (validateFile(e.target.files[0], "pdf")) {
                      handleFileChange(e, "panProof");
                    }
                  }}
                />
                
{/* {uploadedFiles.panProof && (
  <small style={{ color: "green" }}>
    ✔ PAN card already uploaded
  </small>
)} */}
              </div>

              <div>
                <label className="required">Mobile Number</label>
                <input
                  name="mobile"
                  value={form.mobile}
                  maxLength="10"
                  placeholder="Mobile Number"

                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setForm({ ...form, mobile: value });
                  }}
                />
              </div>

              <div>
                <label>Land Line Number</label>
                <input
  name="landline"
  value={form.landline}
  placeholder="STD Code - Landline Number"
  maxLength="15"
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9-]/g, "");
    setForm({ ...form, landline: value });
  }}
/>

              </div>

              <div>
                <label>License Number by local bodies</label>
                <input
                  name="licenseNumber"
                  value={form.licenseNumber}
                  onChange={handleChange}
                  placeholder="License Number by the local bodies"

                />
              </div>

              <div>
                <label>License Issued Date</label>
                <input
                  type="date"
                  name="licenseDate"
                  value={form.licenseDate}
                  onChange={handleChange}
                  placeholder="License Issued Date"

                />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="applicantdetails-section">
            <h3 className="applicantdetails-section-title">Local Address For Communication</h3>

            <div className="applicantdetails-grid-4">
              <div>
                <label className="required">Address Line 1</label>
                <input name="address1" value={form.address1} onChange={handleChange} placeholder="Address Line 1"
 />
              </div>

              <div>
                <label>Address Line 2</label>
                <input name="address2" value={form.address2} onChange={handleChange} placeholder="Address Line 2"
 />
              </div>

              <div>
                <label className="required">State</label>
                <select
  name="state"
  value={form.state}
  onChange={(e) => {
    setForm({
      ...form,
      state: e.target.value,
      district: "",
      mandal: "",
      village: "",
    });
  }}
>
  <option value="">Select State</option>
  {states.map((state) => (
    <option key={state.id} value={state.id}>
      {state.state_name}
    </option>
  ))}
</select>

              </div>

              <div>
                <label className="required">District</label>
                <select
  name="district"
  value={form.district}
  onChange={(e) => {
    setForm({
      ...form,
      district: e.target.value,
      mandal: "",
      village: "",
    });
  }}
  disabled={!form.state}
>
  <option value="">Select District</option>
  {districts.map((district) => (
    <option key={district.id} value={district.id}>
      {district.name}
    </option>
  ))}
</select>

              </div>

              <div>
                <label className="required">Mandal</label>
                <select
  name="mandal"
  value={form.mandal}
  onChange={(e) => {
    setForm({
      ...form,
      mandal: e.target.value,
      village: "",
    });
  }}
  disabled={!form.district}
>
  <option value="">Select Mandal</option>
  {mandals.map((mandal) => (
    <option key={mandal.id} value={mandal.id}>
      {mandal.name}
    </option>
  ))}
</select>

              </div>

              <div>
                <label className="required">Local Area / Village</label>
               <select
  name="village"
  value={form.village}
  onChange={handleChange}
  disabled={!form.mandal}
>
  <option value="">Select Village</option>
  {villages.map((village) => (
    <option key={village.id} value={village.id}>
      {village.name}
    </option>
  ))}
</select>

              </div>

              <div>
                <label className="required">PIN Code </label>
                <input
                  name="pincode"
                  value={form.pincode}
                  maxLength="6"
                  placeholder="PIN Code"

                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setForm({ ...form, pincode: value });
                  }}
                />
              </div>

              <div>
                <label className="required">Upload Address Proof (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    if (validateFile(e.target.files[0], "pdf")) {
                      handleFileChange(e, "addressProof");
                    }
                  }}
                />
                {/* {uploadedFiles.addressProof && (
  <small style={{ color: "green" }}>
    ✔ Address proof already uploaded
  </small>
)} */}
              </div>
            </div>
          </section>

          {/* Projects */}
         <section className="applicantdetails-section">
  <h3 className="applicantdetails-section-title">
    Projects Launched In The Past 5 Years
  </h3>

  <div className="applicantdetails-project-row">

    {/* LEFT: RADIO */}
    <div className="applicantdetails-project-radio">
      <span>Last five years project details <span style={{ color: "red" }}>*</span></span>

      <label>
        <input
          type="radio"
          name="projectsLastFiveYears"
          checked={showProjects === true}
          onChange={() => setShowProjects(true)}
        />
        Yes
      </label>

      <label>
        <input
          type="radio"
          name="projectsLastFiveYears"
          checked={showProjects === false}
          onChange={() => setShowProjects(false)}
        />
        No
      </label>
    </div>

    {/* INPUT */}
    {showProjects && (
      <div className="project-name-box">
        <label >Project Name <span style={{ color: "red" }}>*</span></label>
        <input 
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
    )}

    {/* ADD BUTTON */}
    {showProjects && (
      <button
        type="button"
        className="applicantdetails-add-btn"
        onClick={handleAddProject}
      >
        Add
      </button>
    )}
  </div>

  {/* ===== TABLE BELOW (LIKE IMAGE 4) ===== */}
  {showProjects && projects.length > 0 && (
    <table className="applicantdetails-table">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Project Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p, index) => (
          <tr key={p.id}>
            <td>{index + 1}</td>
            <td>{p.name}</td>
            <td>
              <button
                type="button"
                className="applicantdetails-delete-btn"
                onClick={() => handleDeleteProject(p.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</section>

          {/* Litigations */}
    {/* Litigations */}
          <section className="applicantdetails-section">
            <h3 className="applicantdetails-section-title">Litigations</h3>

            <div className="applicantdetails-radio-inline applicantdetails-litigation-row">
              <span>Any Civil/Criminal Cases <span style={{ color: "red" }}>*</span> </span>

              <label>
                <input
                  type="radio"
                  name="litigation"
                  value="Yes"
                  checked={litigationStatus === "Yes"}
                  onChange={() => setLitigationStatus("Yes")}
                />{" "}
                Yes
              </label>

             <label>
                <input
                  type="radio"
                  name="litigation"
                  value="No"
                  checked={litigationStatus === "No"}
                  onChange={() => setLitigationStatus("No")}
                />{" "}
                No
              </label>

             {litigationStatus === "No" && (
  <div className="applicantdetails-litigation-affidavit">

    <div className="affidavit-text">
      <label >Self Declared Affidavit <span style={{ color: "red" }}>*</span></label>

      <p className="affidavit-note">
        Note: "A self declared affidavit (on Rs. 20 non judicial stamp paper)
        has to be uploaded if there are no cases pending, refer Form 4 in
        form downloads for proforma of this Self Affidavit."
      </p>
    </div>

    <input
  type="file"
  accept=".pdf,.jpg,.jpeg,.png"
  onChange={(e) =>
    setUploadedFiles({
      ...uploadedFiles,
      selfAffidavitFile: e.target.files[0],
    })
  }
/>
{/* {savedFiles.selfAffidavit && (
  <small style={{ color: "green" }}>
    ✔ Self affidavit already uploaded
  </small>
)} */}


  </div>
)}

            </div>

            {litigationStatus === "Yes" && (
              <>
                <p style={{ color: "red", marginTop: "10px" }}>
                  Note : In case Petitioner/Respondent are more than one, please provide
                  their names by comma separated.
                </p>

                <div className="applicantdetails-conditional-box applicantdetails-grid-4">
                  <div>
                    <label className="required">Case No</label>
                    <input
            name="caseNo"
            value={litigationForm.caseNo}
            onChange={handleLitigationChange}
            placeholder="Case No."

          />
                  </div>

                  <div>
                    <label className="required">Name & Place of Tribunal/Authority</label>
                    <input
            name="namePlace"
            value={litigationForm.namePlace}
            onChange={handleLitigationChange}
            placeholder="Name & Place of Tribunal/Authority"

          />
                  </div>

                  <div>
                    <label className="required">Name of the Petitioner</label>
                    <input
            name="petitioner"
            value={litigationForm.petitioner}
            onChange={handleLitigationChange}
            placeholder="Name of the Petitioner"

          />
                  </div>

                  <div>
                    <label className="required">Name of the Respondent</label>
                    <input
            name="respondent"
            value={litigationForm.respondent}
            onChange={handleLitigationChange}
            placeholder="Name of the Respondent"

          />
                  </div>

                  <div>
                    <label className="required">Facts of the Case/Contents of the Case</label>
                    <input
            name="facts"
            value={litigationForm.facts}
            onChange={handleLitigationChange}
            placeholder="Facts of the Case/Contents of the Case"

          />
                  </div>

                  <div>
                    <label className="required">Present Status of the case</label>
                    <select
                     name="presentStatus"
            value={litigationForm.presentStatus}
            onChange={handleLitigationChange}
            >
                      <option>Select</option>
                      <option value="Completed">Completed</option>
                      <option value="Delay">Delay</option>
                      <option value="Under Development">Under Development</option>
                    </select>
                  </div>
<div>
  <label className="required">Interim Order if any</label>

  <div className="applicantdetails-radio-inline">
    <label>
      <input
        type="radio"
        name="interimOrder"
        value="Yes"
        checked={interimOrder === "Yes"}
        onChange={() => {
                setInterimOrder("Yes");
                setLitigationForm({ ...litigationForm, interimOrder: "Yes" });
              }}
            />{" "}
      Yes
    </label>

    <label>
      <input
        type="radio"
        name="interimOrder"
        value="No"
        checked={interimOrder === "No"}
       onChange={() => {
                setInterimOrder("No");
                setLitigationForm({ ...litigationForm, interimOrder: "No" });
              }}
            />{" "}
      No
    </label>
  </div>
</div>


{/* <div>
  <label>Details of final order if disposed *</label>

  <div className="applicantdetails-radio-inline">
    <label>
      <input
        type="radio"
        name="finalOrder"
        value="Yes"
        checked={finalOrder === "Yes"}
        onChange={() => setFinalOrder("Yes")}
      />
      Yes
    </label>

    <label>
      <input
        type="radio"
        name="finalOrder"
        value="No"
        checked={finalOrder === "No"}
        onChange={() => setFinalOrder("No")}
      />
      No
    </label>
  </div>
</div>*/}
<div> 
  <label className="required">Details of final order if disposed</label>

  <div className="applicantdetails-radio-inline">
    <label>
      <input
        type="radio"
        name="finalOrder"
        value="Yes"
        checked={finalOrder === "Yes"}
        onChange={() => {
                setFinalOrder("Yes");
                setLitigationForm({ ...litigationForm, finalOrder: "Yes" });
              }}
            />{" "}
      Yes
    </label>

    <label>
      <input
        type="radio"
        name="finalOrder"
        value="No"
        checked={finalOrder === "No"}
        onChange={() => {
                setFinalOrder("No");
                setLitigationForm({ ...litigationForm, finalOrder: "No" });
              }}
            />{" "}
            No
    </label>
  </div>
</div>



                  {/* <div>
                    <label>Details of final order if disposed *</label>
                    <label>
                      <input type="radio" /> Yes
                    </label>
                    <label>
                      <input type="radio" /> No
                    </label> 
                  </div> */}

                 {interimOrder === "Yes" && (
  <div>
    <label className="required">Interim Order Certificate</label>
       <input
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      onChange={(e) =>
        setLitigationForm({
          ...litigationForm,
          interimCert: e.target.files[0],
        })
      }
    />
  </div>
)}


                 {finalOrder === "Yes" && (
  <div>
    <label className="required">Disposed Certificate </label>
    <input
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      onChange={(e) =>
        setLitigationForm({
          ...litigationForm,
          disposedCert: e.target.files[0],
        })
      }
    />
  </div>
)}


                  <div></div>

                  <div>
                    <button
            type="button"
            className="applicantdetails-add-btn"
            onClick={handleAddLitigation}
          >
            Add
          </button>
                  </div>
                </div>
              {/* ===== TABLE ===== */}
      {litigations.length > 0 && (
        <table className="applicantdetails-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Case No</th>
              <th>Name & Place</th>
              <th>Petitioner</th>
              <th>Respondent</th>
              <th>Status</th>
              <th>Interim</th>
              <th>Final</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {litigations.map((l, index) => (
              <tr key={l.id}>
                <td>{index + 1}</td>
                <td>{l.caseNo}</td>
                <td>{l.namePlace}</td>
                <td>{l.petitioner}</td>
                <td>{l.respondent}</td>
                <td>{l.presentStatus}</td>
                <td>{l.interimOrder}</td>
                <td>{l.finalOrder}</td>
                <td>
                  <button onClick={() => handleDeleteLitigation(l.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )}
</section>

            {/* Other State */}
   {/* ================= OTHER STATE / UT RERA ================= */}
<section className="applicantdetails-section">
  <h3 className="applicantdetails-section-title">
    Other State/UT RERA Registration Details
  </h3>

  <div className="applicantdetails-radio-inline">
  <span>Do you have registration in other states <span style={{ color: "red" }}>*</span> </span>

  <label>
    <input
      type="radio"
      name="otherStateReg"
      checked={otherStateReg === true}
      onChange={() => setOtherStateReg(true)}
    />
    Yes
  </label>

  <label>
    <input
      type="radio"
      name="otherStateReg"
      checked={otherStateReg === false}
      onChange={() => setOtherStateReg(false)}
    />
    No
  </label>
</div>


  {otherStateReg && (
    <>
      <div className="applicantdetails-grid-4 applicantdetails-conditional-box">
        <div>
          <label className="required">Registration Number</label>
          <input
            value={otherReraForm.regNo}
            placeholder="Registration Number"

            onChange={(e) =>
              setOtherReraForm({ ...otherReraForm, regNo: e.target.value })
            }
          />
        </div>

        <div>
          <label className="required">State / UT </label>
          <select
  value={otherReraForm.stateId}
  onChange={(e) => {
    const state = otherStates.find(
      (s) => s.state_id == e.target.value   // ✅ FIX
    );

    setOtherReraForm({
      ...otherReraForm,
      stateId: e.target.value,
      stateName: state?.state_name || "",
      districtId: "",
      districtName: "",
    });

    setOtherStateId(e.target.value); // triggers district API
  }}
>
  <option value="">Select</option>
  {otherStates.map((s) => (
    <option key={s.state_id} value={s.state_id}>
      {s.state_name}
    </option>
  ))}
</select>

        </div>

        <div>
          <label className="required">District </label>
          <select
  value={otherReraForm.districtId}
  onChange={(e) => {
    const dist = otherDistricts.find(
      (d) => d.district_id == e.target.value   // ✅ FIX
    );

    setOtherReraForm({
      ...otherReraForm,
      districtId: e.target.value,
      districtName: dist?.district_name || "",
    });
  }}
  disabled={!otherReraForm.stateId}
>
  <option value="">Select</option>
  {otherDistricts.map((d) => (
    <option key={d.district_id} value={d.district_id}>
      {d.district_name}
    </option>
  ))}
</select>

        </div>

        <div style={{ alignSelf: "flex-end" }}>
          <button
            type="button"
            className="applicantdetails-add-btn"
            onClick={handleAddOtherRera}
          >
            Add
          </button>
        </div>
      </div>

      {otherReraList.length > 0 && (
        <table className="applicantdetails-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Registration Number</th>
              <th>State/UT</th>
              <th>District</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {otherReraList.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.regNo}</td>
                <td>{r.stateName}</td>
                <td>{r.districtName}</td>
                <td>
                  <button
                    className="applicantdetails-delete-btn"
                    onClick={() => handleDeleteOtherRera(r.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )}
</section>


          <div className="applicantdetails-form-footer-row">
  <button
    type="button"
    className="applicantdetails-applicant-back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
  

          {/* Save */}

          <div className="applicantdetails-btn-row">
        
          <button onClick={handleSaveContinue}>
            Save And Continue
          </button>
        </div>
         {/* ================= SUCCESS POPUP ================= */}
        {showSuccessPopup && (
          <div className="applicantdetails-success-modal-overlay">
            <div className="applicantdetails-success-modal">
              <h3>Success</h3>
              <p>Applicant Details Saved Successfully</p>

              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  navigate("/agent-upload-documents", {
                    state: {
                      agentId: localStorage.getItem("agentId"),
                    },
                  });
                }}
              >
                OK
              </button>
            </div>
        </div>
      )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ApplicantDetails;