import React, { useState, useEffect, useRef } from "react";

import { apiPost } from "../api/api";
import "../styles/complaintdetails.css";

export default function ComplaintDetails({
  setCurrentStep,
  setComplaintData,
  complaintData
}) {
  const STATES = [
    "Andaman and Nicobar Island (UT)",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh (UT)",
    "Chhattisgarh",
    "Dadra and Nagar Haveli (UT)",
    "Daman and Diu (UT)",
    "Delhi (NCT)",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep (UT)",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry (UT)",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const DISTRICTS = {
    "Andhra Pradesh": [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Kadapa",
      "Krishna",
      "Kurnool",
      "Nellore",
      "Prakasam",
      "Srikakulam",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
    ],
    Telangana: [
      "Adilabad",
      "Hyderabad",
      "Karimnagar",
      "Khammam",
      "Mahabubnagar",
      "Medak",
      "Nalgonda",
      "Nizamabad",
      "Ranga Reddy",
      "Warangal",
    ],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
    ],
    Karnataka: [
      "Bengaluru Urban",
      "Mysuru",
      "Mangaluru",
      "Hubballi",
    ],
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
    ],
    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Thrissur",
    ],
  };

  const complaintByOptionsMap = {
    Agent: ["Allottee", "Others", "Promoter"],
    Allottee: ["Agent", "Promoter"],
    Promoter: ["Agent", "Allottee", "Others"],
  };

  const inputFilters = {
    onlyChars: /^[A-Za-z\s]*$/,
    onlyNumbers: /^\d*$/,
    alphaNumeric: /^[A-Za-z0-9\-\/]*$/,
  };


  const [form, setForm] = useState({
    complaintAgainst: "",
    complaintBy: "",
    complainantRERA: "",
    complainantName: "",
    complainantMobile: "",
    complainantEmail: "",
    cAddress1: "",
    cAddress2: "",
    cState: "",
    cDistrict: "",
    cPincode: "",
    agentId: "",
    respondentRERA: "",
    projectName: "",
    respondentName: "",
    respondentMobile: "",
    respondentEmail: "",
    rAddress1: "",
    rAddress2: "",
    rState: "",
    rDistrict: "",
    rPincode: "",
    promoterRegId: "",
    subject: "",
    subjectOther: "",
    description: "",
    relief: "",
    reliefOther: "",
    complaintRegarding: "",
    interimOrder: "",
    interimFile: null,
    agreementFile: null,
    feeReceiptFile: null,
    declaration1: false,
    declaration2: false,
    declarantName: "",
    docDesc: "",
    docFile: null,
    projectRegistered: "",  
 projectRegNumber: "",    
  projectLpNumber: "", 
  });

  const [districtList, setDistrictList] = useState([]);
  const [supportingDocs, setSupportingDocs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});
  const [activeError, setActiveError] = useState("");
  const docFileRef = useRef(null);

  const [rows, setRows] = useState([]);    

  const handleAddRow = () => {
    if (!form.agreed || !form.delivered || !form.deviation) {
      alert("Please fill all fields");
      return;
    }

    setRows([
      ...rows,
      {
        agreed: form.agreed,
        delivered: form.delivered,
        deviation: form.deviation,
      },
    ]);

    // clear fields
    setForm({
      ...form,
      agreed: "",
      delivered: "",
      deviation: "",
    });
  };

  const handleDelete = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };



  useEffect(() => {
    if (complaintData) {
      setForm((p) => ({ ...p, ...complaintData }));
      setSupportingDocs(complaintData.supportingDocs || []);
    }
  }, [complaintData]);

  // const handleChange = (e) => {
  //   const { name, value, type, checked, files } = e.target;
  //   setForm((p) => ({
  //     ...p,
  //     [name]:
  //       type === "checkbox"
  //         ? checked
  //         : type === "file"
  //           ? files[0]
  //           : value,
  //   }));
  // };


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "projectRegistered") {
  setForm((p) => ({
    ...p,
    projectRegistered: value,
    projectRegNumber: value === "Yes" ? p.projectRegNumber : "",
    projectLpNumber: value === "No" ? p.projectLpNumber : "",
  }));
  return;
}
    // 🔥 CLEAR OPPOSITE FIELDS WHEN COMPLAINANT RERA CHANGES
    if (name === "complainantRERA") {
      setForm((p) => ({
        ...p,
        complainantRERA: value,

        // YES → keep ID, clear NO fields
        agentId: value === "Yes" ? p.agentId : "",

        // NO → keep personal fields, clear YES fields
        complainantName: value === "No" ? p.complainantName : "",
        complainantMobile: value === "No" ? p.complainantMobile : "",
        complainantEmail: value === "No" ? p.complainantEmail : "",
        cAddress1: value === "No" ? p.cAddress1 : "",
        cAddress2: value === "No" ? p.cAddress2 : "",
        cState: value === "No" ? p.cState : "",
        cDistrict: value === "No" ? p.cDistrict : "",
        cPincode: value === "No" ? p.cPincode : "",
      }));

      // clear old errors
      setErrors({});
      setActiveError("");
      return; // ⛔ STOP normal flow
    }
    // 🔥 CLEAR OPPOSITE FIELDS WHEN RESPONDENT RERA CHANGES
    if (name === "respondentRERA") {
      setForm((p) => ({
        ...p,
        respondentRERA: value,

        // YES → keep ID, clear NO fields
        promoterRegId: value === "Yes" ? p.promoterRegId : "",

        // NO → keep personal fields, clear YES fields
        respondentName: value === "No" ? p.respondentName : "",
        respondentMobile: value === "No" ? p.respondentMobile : "",
        respondentEmail: value === "No" ? p.respondentEmail : "",
        rAddress1: value === "No" ? p.rAddress1 : "",
        rAddress2: value === "No" ? p.rAddress2 : "",
        rState: value === "No" ? p.rState : "",
        rDistrict: value === "No" ? p.rDistrict : "",
        rPincode: value === "No" ? p.rPincode : "",
      }));

      setErrors({});
      setActiveError("");
      return; // ⛔ STOP normal flow
    }

    /* ================= FILE VALIDATION (STEP 2) ================= */
    if (type === "file") {
      const file = files?.[0];
      if (!file) return;

      // 🔴 Allow ONLY PDF
      if (file.type !== "application/pdf") {
        setActiveError("Only PDF files are allowed");
        e.target.value = "";
        return;
      }

      // 🔴 Optional: size limit (5MB)
      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        setActiveError("PDF file size must be less than 5 MB");
        e.target.value = "";
        return;
      }


      setForm((p) => ({ ...p, [name]: file }));
      return;
    }

    /* ================= INPUT FILTERS ================= */
    if (["complainantName", "respondentName", "declarantName"].includes(name)) {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    if (["complainantMobile", "respondentMobile"].includes(name)) {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (["cPincode", "rPincode"].includes(name)) {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 6) return;
    }

    if (["agentId", "promoterRegId"].includes(name)) {
      if (!/^[A-Za-z0-9\-\/]*$/.test(value)) return;
      if (value.length > 20) return;
    }

    /* ================= NORMAL STATE UPDATE ================= */
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,

      // ⭐ AUTO-FILL DECLARANT NAME
      ...(name === "complainantName" && {
        declarantName: value,
      }),

    }));

    /* ================= CLEAR FIELD ERROR ================= */
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };


  const handleAddDoc = () => {
    if (!form.docDesc || !form.docFile) return;

    if (form.docFile.type !== "application/pdf") {
      setActiveError("Only PDF files are allowed");
      return;
    }

    setSupportingDocs((p) => [
      ...p,
      { id: Date.now(), desc: form.docDesc, file: form.docFile },
    ]);

    setForm((p) => ({ ...p, docDesc: "", docFile: null }));

    if (docFileRef.current) {
      docFileRef.current.value = ""; // ✅ FILE INPUT RESET
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!form.applicationType) {
      newErrors.applicationType = "Please select Application Type";
    }

    if (!form.complaintAgainst) {
      newErrors.complaintAgainst = "Please Select Complaint Against";
    }

    if (!form.complaintBy) {
      newErrors.complaintBy = "Please Select Complaint By";
    }

    // ✅ COMPLAINANT
    if (showComplainantBlock || showAllotteeComplainantOnly) {

      if (complainantRERA_Yes) {
        if (!form.agentId || form.agentId.trim() === "") {
          newErrors.agentId = "Please Enter Registration ID";
        }
      }

      if (complainantRERA_No || !form.complainantRERA) {

        if (!form.complainantName) {
          newErrors.complainantName = "Please Enter Name of the Complainant";
        }

        if (!form.complainantMobile) {
          newErrors.complainantMobile = "Please Enter Mobile Number";
        } else if (!/^[6-9]\d{9}$/.test(form.complainantMobile)) {
          newErrors.complainantMobile = "Please Enter Valid Mobile Number";
        }

        if (!form.complainantEmail) {
          newErrors.complainantEmail = "Please Enter Email Id";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.complainantEmail)) {
          newErrors.complainantEmail = "Please Enter a Valid Email Id";
        }


        if (!form.cAddress1) {
          newErrors.cAddress1 = "Please Enter Address Line 1";
        }

        if (!form.cState) {
          newErrors.cState = "Please Select State";
        }

        if (!form.cDistrict) {
          newErrors.cDistrict = "Please Select District";
        }

        if (!form.cPincode) {
          newErrors.cPincode = "Please Enter Pincode";
        } else if (!/^[1-9][0-9]{5}$/.test(form.cPincode)) {
          newErrors.cPincode = "Please Enter a Valid 6-digit Pincode";
        }

      }
    }

    // ✅ RESPONDENT
    if (showRespondentBlock) {

      if (respondentRERA_Yes && (isAgent || isPromoter)) {
        if (!form.promoterRegId || form.promoterRegId.trim() === "") {
          newErrors.promoterRegId = "Please Enter  Agent ID";
        }
      }

      if (respondentRERA_No) {

        if (form.complaintAgainst !== "Agent" && !form.projectName) {
          newErrors.projectName = "Please Enter Project Name";
        }

        if (!form.projectName) {
          newErrors.projectName = "Please Enter Project Name";
        }
        if (!form.respondentName) {
          newErrors.respondentName = "Please Enter Name";
        }

        if (!form.respondentMobile) {
          newErrors.respondentMobile = "Please Enter Mobile Number";
        } else if (!/^[6-9]\d{9}$/.test(form.respondentMobile)) {
          newErrors.respondentMobile = "Please Enter Valid Mobile Number";
        }

        if (!form.respondentEmail) {
          newErrors.respondentEmail = "Please Enter Email ID";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.respondentEmail)) {
          newErrors.respondentEmail = "Please Enter a Valid Email ID";
        }

      }
    }
    // ⭐ EXTRA FIX — Agent vs Allottee case
    const isAgentAgainstAllottee =
      form.complaintAgainst === "Allottee" &&
      form.complaintBy === "Agent";

    if (isAgentAgainstAllottee) {

      if (!form.projectName) {
        newErrors.projectName = "Please Enter Project Name";
      }

      if (!form.respondentName) {
        newErrors.respondentName = "Please Enter Name";
      }

      // ✅ MOBILE VALIDATION
      if (!form.respondentMobile) {
        newErrors.respondentMobile = "Please Enter Mobile Number";
      } else if (!/^[6-9]\d{9}$/.test(form.respondentMobile)) {
        newErrors.respondentMobile = "Please Enter Valid 10-digit Mobile Number";
      }

      // ✅ EMAIL VALIDATION
      if (!form.respondentEmail) {
        newErrors.respondentEmail = "Please Enter Email ID";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.respondentEmail)) {
        newErrors.respondentEmail = "Please Enter Valid Email ID";
      }

      // ⭐ Fee receipt required when Agent complains against Allottee
      if (!form.feeReceiptFile) {
        newErrors.feeReceiptFile = "Please upload Fee Receipt";
      }

      // ✅ DESCRIPTION VALIDATION
      if (!form.description) {
        newErrors.description = "Please Enter Description of Complaint";
      }
    }


    // ✅ RESPONDENT ADDRESS VALIDATION
    if (showRespondentAddress) {
      if (!form.rAddress1) {
        newErrors.rAddress1 = "Please enter Address Line 1";
      }

      if (!form.rState) {
        newErrors.rState = "Please select State";
      }

      if (!form.rDistrict) {
        newErrors.rDistrict = "Please select District";
      }

      if (!form.rPincode) {
        newErrors.rPincode = "Please enter PIN Code";
      } else if (!/^[1-9][0-9]{5}$/.test(form.rPincode)) {
        newErrors.rPincode = "Please enter a valid 6-digit PIN Code";
      }
    }

    if (!form.subject) {
      newErrors.subject = "Please Enter Subject of Complaint";
    }

    if (!form.relief) {
      newErrors.relief = "Please Enter Relief Sought";
    }
    // =====================================================
    // ⭐ DETAILS OF COMPLAINT – DYNAMIC VALIDATION (ADD HERE)
    // =====================================================

    // If Subject = Any Other → subjectOther required
    if (form.subject === "Any Other" && !form.subjectOther?.trim()) {
      newErrors.subjectOther = "Please enter Subject of Complaint";
    }

    // If Relief = Any Other → reliefOther required
    if (form.relief === "Any Other" && !form.reliefOther?.trim()) {
      newErrors.reliefOther = "Please enter Relief Sought from APRERA";
    }


    // 1️⃣ Interim Order required ONLY when complaintAgainst = Promoter
    if (form.complaintAgainst === "Promoter" && !form.interimOrder) {
      newErrors.interimOrder = "Please select Interim Order";
    }


    // 2️⃣ Upload document ONLY when Interim Order = Yes
    if (
      form.complaintAgainst === "Promoter" &&
      form.interimOrder === "Yes" &&
      !form.interimFile
    ) {
      newErrors.interimFile = "Please upload relevant document";
    }


    // 3️⃣ Agreement upload required in Promoter ↔ Allottee cases
    const isPromoterByAllottee =
      form.complaintAgainst === "Promoter" &&
      form.complaintBy === "Allottee";

    const isAllotteeByPromoter =
      form.complaintAgainst === "Allottee" &&
      form.complaintBy === "Promoter";

    if ((isPromoterByAllottee || isAllotteeByPromoter) && !form.agreementFile) {
      newErrors.agreementFile = "Please upload Agreement for Sale";
    }


    // 4️⃣ Complaint Regarding required when complaintBy = Allottee
    if (form.complaintBy === "Allottee" && !form.complaintRegarding?.trim()) {
      newErrors.complaintRegarding = "Please enter Complaint Regarding";
    }



    if (isAgentAgainstAllottee) {
      // ⭐ Fee receipt required when Agent complains against Allottee
      if (!form.feeReceiptFile) {
        newErrors.feeReceiptFile = "Please upload Fee Receipt";
      }

      // ✅ DESCRIPTION VALIDATION
      if (!form.description) {
        newErrors.description = "Please Enter Description of Complaint";
      }
    }
    // ⭐ Promoter complaining against Allottee
    const isPromoterAgainstAllottee =
      form.complaintAgainst === "Allottee" &&
      form.complaintBy === "Promoter";

    if (isPromoterAgainstAllottee) {
      // ✅ Project Name REQUIRED
      if (!form.projectName) {
        newErrors.projectName = "Please Enter Project Name";
      }

      // ✅ Respondent basic details
      if (!form.respondentName) {
        newErrors.respondentName = "Please Enter Name";
      }

      if (!form.respondentMobile) {
        newErrors.respondentMobile = "Please Enter Mobile Number";
      } else if (!/^[6-9]\d{9}$/.test(form.respondentMobile)) {
        newErrors.respondentMobile = "Please Enter Valid Mobile Number";
      }

      if (!form.respondentEmail) {
        newErrors.respondentEmail = "Please Enter Email ID";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.respondentEmail)) {
        newErrors.respondentEmail = "Please Enter Valid Email ID";
      }

      // ✅ Address required
      if (!form.rAddress1) newErrors.rAddress1 = "Please Enter Address Line 1";
      if (!form.rState) newErrors.rState = "Please Select State";
      if (!form.rDistrict) newErrors.rDistrict = "Please Select District";

      if (!form.rPincode) {
        newErrors.rPincode = "Please Enter PIN Code";
      } else if (!/^[1-9][0-9]{5}$/.test(form.rPincode)) {
        newErrors.rPincode = "Please Enter Valid 6-digit PIN Code";
      }

      // ✅ ONLY description required in complaint section
      if (!form.description) {
        newErrors.description = "Please Enter Description of Complaint";
      }
    }


    // ✅ DESCRIPTION VALIDATION
    // ✅ DESCRIPTION VALIDATION (skip for Promoter by Allottee)
    if (
      !isPromoterByAllottee &&   // ⭐ IMPORTANT CONDITION
      (
        form.complaintBy === "Allottee" ||
        form.complaintBy === "Others" ||
        form.complaintBy === "Promoter" ||
        (form.complaintAgainst === "Promoter" && form.complaintBy === "Agent")
      ) &&
      !form.description
    ) {
      newErrors.description = "Please Enter Description of Complaint";
    }




    if (
      (isAgainstAllottee && !byAgent) ||
      isPromoterByAllottee
    ) {
      if (!form.agreementFile) {
        newErrors.agreementFile = "Please upload Agreement for Sale";
      }
    }
    if (isComplaintByAllottee && !form.complaintRegarding) {
      newErrors.complaintRegarding = "Please enter Complaint Regarding";
    }
    // ✅ FEE RECEIPT VALIDATION
    const requireFeeReceipt =
      form.complaintBy === "Allottee" && !isPromoterByAllottee;

    if (requireFeeReceipt && !form.feeReceiptFile) {
      newErrors.feeReceiptFile = "Please upload Fee Receipt";
    }



    // 1️⃣ Interim Order (Yes / No) is mandatory when against Promoter
    if (form.complaintAgainst === "Promoter" && !form.interimOrder) {
      newErrors.interimOrder = "Please select Interim Order";
    }

    // 2️⃣ Upload document ONLY when Interim Order = Yes
    if (
      form.complaintAgainst === "Promoter" &&
      form.interimOrder === "Yes" &&
      !form.interimFile
    ) {
      newErrors.interimFile = "Please upload relevant document";
    }

    if (isPromoterByAllottee && rows.length === 0) {
      newErrors.description_details =
        "Please add at least one Agreed / Delivered / Deviation row";
    }

    if (!form.declaration1) {
      newErrors.declaration1 = "Please Accept Declaration";
    }
    if (!form.declaration2 || !form.declarantName) {
      newErrors.declarantName =
        "Please Enter Declarant Name and Accept Declaration";
    }
    
    if (!form.projectRegistered) {
  newErrors.projectRegistered = "Please select project registration status";
}

if (form.projectRegistered === "Yes" && !form.projectRegNumber) {
  newErrors.projectRegNumber = "Please enter Project Registration Number";
}

if (form.projectRegistered === "No" && !form.projectLpNumber) {
  newErrors.projectLpNumber = "Please enter B.A / L.P Number";
}
   
    setErrors(newErrors);
    setActiveError(Object.values(newErrors)[0] || "");

    return Object.keys(newErrors).length === 0;
  };



  // API submission handler following the backend contract
  const handleSaveAndContinue = async () => {

    // ❌ STOP here if required fields are missing
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      setSubmitError("");

      // STEP 1: Create complaint (POST /complint/create)
      const complaintPayload = {
        complainant:
        {
          type: form.complaintBy || "",
          registered_id: form.complainantRERA === "Yes" ? form.agentId || null : null,
          name: form.complainantName || "",
          mobile: form.complainantMobile || "",
          email: form.complainantEmail || "",
          address_line1: form.cAddress1 || "",
          address_line2: form.cAddress2 || "",
          state: form.cState || "",
          district: form.cDistrict || "",
          pincode: form.cPincode || "",
        },
        respondent:
        {
          type: form.complaintAgainst || "",
          is_rera_registered: form.respondentRERA === "Yes",
          registration_id: form.respondentRERA === "Yes" ? form.promoterRegId || null : null,
          project_name: form.projectName || "",
          name: form.respondentName || "",
          phone: form.respondentMobile || "",
          email: form.respondentEmail || "",
          address_line1: form.rAddress1 || "",
          address_line2: form.rAddress2 || "",
          state: form.rState || "",
          district: form.rDistrict || "",
          pincode: form.rPincode || "",
        },
        complaint:
        {
          subject: form.subject || "",
          relief_sought: form.relief || "",
          application_type: form.applicationType,
          complaint_regarding: form.complaintRegarding,
          description: isPromoterByAllottee ? " " : form.description || "",
          complaint_facts: isPromoterByAllottee && rows.length > 0 ?
            {
              agreed: rows[0].agreed,
              delivered: rows[0].delivered,
              deviation: rows[0].deviation,
            } : null,
           project: {
      is_registered: form.projectRegistered === "Yes",
      registration_number:
        form.projectRegistered === "Yes"
          ? form.projectRegNumber
          : null,
      lp_number:
        form.projectRegistered === "No"
          ? form.projectLpNumber
          : null,
    },
        },
      };

      const createData = await apiPost("/api/complint/create", complaintPayload);

      if (!createData || !createData.complaint_id) {
        throw new Error("Failed to create complaint - no complaint_id returned");
      }

      const complaintId = createData.complaint_id;

      // STEP 2A: Upload system complaint documents (one at a time)
      const systemDocs = [
        { type: "AGREEMENT_FOR_SALE", file: form.agreementFile },
        { type: "FEE_RECEIPT", file: form.feeReceiptFile },
        { type: "INTERIM_ORDER", file: form.interimFile },
      ];

      for (const doc of systemDocs) {
        if (doc.file) {
          const formData = new FormData();
          formData.append("complaint_id", complaintId.toString());
          formData.append("type", doc.type);
          formData.append("document", doc.file);

          await apiPost("/api/complint/upload-complaint-documents", formData);
        }
      }

      // STEP 2B: Upload supporting documents (all at once)
      if (supportingDocs.length > 0) {
        const supportingFormData = new FormData();
        supportingFormData.append("complaint_id", complaintId.toString());

        supportingDocs.forEach((doc) => {
          supportingFormData.append("document_description", doc.desc);
          supportingFormData.append("documents", doc.file);
        });

        await apiPost("/api/complint/upload-supporting-documents", supportingFormData);
      }

      // Save all data including complaint_id
      setComplaintData({
        ...form,
        supportingDocs,
        complaint_id: complaintId
      });

      // Move to next step
      setCurrentStep(2);

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(error.message || "Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Flags
  const isPromoterByAllottee =
    form.complaintAgainst === "Promoter" &&
    form.complaintBy === "Allottee";

  // 🎯 Exact combinations
  const isAllotteeByPromoter =
    form.complaintAgainst === "Allottee" &&
    form.complaintBy === "Promoter";



  const showAllotteeComplainantOnly =
    (form.complaintAgainst === "Agent" &&
      (form.complaintBy === "Allottee" || form.complaintBy === "Others")) ||
    isPromoterByAllottee;

  const isPromoterByOthers =
    form.complaintAgainst === "Promoter" &&
    form.complaintBy === "Others";


  const isAgainstAllottee = form.complaintAgainst === "Allottee";
  const isComplaintByAllottee = form.complaintBy === "Allottee";
  const isInitialComplaintStage = !form.complaintAgainst && !form.complaintBy;
  const isComplaintAgainstAllottee = form.complaintAgainst === "Allottee";
  const isComplaintByOthers = form.complaintBy === "Others";
  const isAgentAgainstPromoter =
    form.complaintAgainst === "Promoter" &&
    form.complaintBy === "Agent";

  const isInitialStage = !form.complaintAgainst || !form.complaintBy;
  const isAgent = form.complaintAgainst === "Agent";
  const isAllottee = form.complaintAgainst === "Allottee";
  const isPromoter = form.complaintAgainst === "Promoter";

  const byAgent = form.complaintBy === "Agent";
  const byAllottee = form.complaintBy === "Allottee";
  const byOthers = form.complaintBy === "Others";
  const byPromoter = form.complaintBy === "Promoter";

  const complainantRERA_Yes = form.complainantRERA === "Yes";
  const complainantRERA_No = form.complainantRERA === "No";
  const respondentRERA_Yes = form.respondentRERA === "Yes";
  const respondentRERA_No = form.respondentRERA === "No";
  // ✅ ONE shared condition for Respondent Address (UI + validation sync)
  const showRespondentAddress =
    isAgainstAllottee ||
    (isAgent && respondentRERA_No) ||
    (isPromoter && respondentRERA_No);


  const showSubjectOther = form.subject === "Any Other";
  const showReliefOther = form.relief === "Any Other";

  const isSubjectResolved =
    form.subject &&
    (form.subject !== "Any Other" || form.subjectOther);

  const isReliefResolved =
    form.relief &&
    (form.relief !== "Any Other" || form.reliefOther);

  const showComplainantBlock =
    form.complaintBy &&
    !showAllotteeComplainantOnly &&
    (byAllottee || byPromoter || byAgent);

  const showRespondentBlock = isAgent || isPromoter || isAllottee;

  const showComplainantRERA = (isAgent && byPromoter) || isPromoter;
  const showRespondentRERA = (isAgent && !form.complaintBy) || isPromoter;

  const showAgreementUpload =
    !isInitialStage &&
    ((isAllottee && byPromoter) || (isPromoter && byAllottee));




  const showInterim = form.complaintAgainst === "Promoter";
  const showInterimUpload = showInterim && form.interimOrder === "Yes";


  return (
    <div className="cr-container">
      <h3>Complaint Details</h3>

      {/* 🔴 SINGLE ERROR POPUP (ONE BY ONE) */}
      {activeError && (
        <div className="cr-error-toast" style={{ top: "90px" }}>
          <span className="cr-error-toast-text">{activeError}</span>
          <button
            className="cr-error-toast-close"
            onClick={() => setActiveError("")}
          >
            ×
          </button>
        </div>
      )}



      {submitError && (
        <div style={{ color: "red", marginBottom: "1rem", padding: "10px", backgroundColor: "#fee", border: "1px solid red" }}>
          {submitError}
        </div>
      )}

      <div className="cr-row">
        <div>
          <label>Complaint Against <span>*</span></label>
          <select
            name="complaintAgainst"
            value={form.complaintAgainst}
            onChange={(e) => {
              handleChange(e);
              setForm((p) => ({ ...p, complaintBy: "" }));
            }}
          >
            <option value="">Select</option>
            <option>Agent</option>
            <option>Allottee</option>
            <option>Promoter</option>
          </select>
        </div>
        <div>
          <label>Complaint By <span>*</span></label>
          <select
            name="complaintBy"
            value={form.complaintBy}
            onChange={handleChange}
            disabled={!form.complaintAgainst}
          >
            <option value="">Select</option>
            {(complaintByOptionsMap[form.complaintAgainst] || []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(showAllotteeComplainantOnly || isPromoterByOthers) && (
        <>
          <h4>Details Of The Complainant</h4>
          <div className="cr-row-3">
            <div>
              <label>Name of the Complainant <span>*</span></label>
              <input
                name="complainantName"
                placeholder="Name of the Complainant"
                value={form.complainantName}
                onChange={handleChange}
                maxLength={50}
              />
            </div>
            <div>
              <label>Mobile No <span>*</span></label>
              <input
                name="complainantMobile"
                placeholder="Mobile No"
                value={form.complainantMobile}
                onChange={handleChange}
                maxLength={10}
                inputMode="numeric"
              />
            </div>
            <div>
              <label>Email ID <span>*</span></label>
              <input
                name="complainantEmail"
                placeholder="Email ID"
                value={form.complainantEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <h4>Complainant Communication Address</h4>

          <div className="cr-row-3">
            {/* Address Line 1 */}
            <div className="cr-field">
              <label>
                Address Line 1 <span>*</span>
              </label>
              <input
                name="cAddress1"
                placeholder="Address Line 1"
                value={form.cAddress1}
                onChange={handleChange}
              />
            </div>

            {/* Address Line 2 */}
            <div className="cr-field">
              <label>Address Line 2</label>
              <input
                name="cAddress2"
                placeholder="Address Line 2"
                value={form.cAddress2}
                onChange={handleChange}
              />
            </div>

            {/* State / UT */}
            <div className="cr-field">
              <label>
                State / UT <span>*</span>
              </label>
              <select
                name="cState"
                value={form.cState}
                onChange={(e) => {
                  handleChange(e);
                  setDistrictList(DISTRICTS[e.target.value] || []);
                }}
              >
                <option value="">Select</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="cr-field">
              <label>
                District <span>*</span>
              </label>
              <select
                name="cDistrict"
                value={form.cDistrict}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {districtList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* PIN Code */}
            <div className="cr-field">
              <label>
                PIN Code <span>*</span>
              </label>
              <input
                name="cPincode"
                placeholder="PIN Code"
                value={form.cPincode}
                onChange={handleChange}
                maxLength={6}
                inputMode="numeric"
              />
            </div>
          </div>

        </>
      )}

      {showComplainantBlock && (
        <>
          <h4>Details of the Complainant</h4>
          <div className="cr-rera-block">
            <label className="cr-rera-label">
              Is He/She Registered with AP RERA:
            </label>
            <div className="cr-radio-line">
              <label>
                <input
                  type="radio"
                  name="complainantRERA"
                  value="Yes"
                  checked={form.complainantRERA === "Yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="complainantRERA"
                  value="No"
                  checked={form.complainantRERA === "No"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="cr-row-3">
            {complainantRERA_Yes && (
              <input
                name="agentId"
                placeholder="Promoter / Project Reg. ID / Agent ID *"
                value={form.agentId}
                onChange={handleChange}
                maxLength={20}
              />


            )}
          </div>

          {complainantRERA_No && (
            <>
              {/* ---------- BASIC DETAILS (3 FIELDS) ---------- */}
              <div className="cr-row-3">
                <div className="cr-field">
                  <label>Name of the Complainant <span>*</span></label>
                  <input
                    name="complainantName"
                    placeholder="Name of the Complainant"
                    value={form.complainantName}
                    onChange={handleChange}
                  />
                </div>

                <div className="cr-field">
                  <label>Mobile No <span>*</span></label>
                  <input
                    name="complainantMobile"
                    placeholder="Mobile No"
                    value={form.complainantMobile}
                    onChange={handleChange}
                  />
                </div>

                <div className="cr-field">
                  <label>Email ID <span>*</span></label>
                  <input
                    name="complainantEmail"
                    placeholder="Email ID"
                    value={form.complainantEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ---------- ADDRESS HEADING (OUTSIDE GRID) ---------- */}
              <h4>Complainant Communication Address</h4>

              {/* ---------- ADDRESS LINE 1 & 2 ---------- */}
              <div className="cr-row-3">
                <div className="cr-field">
                  <label>Address Line 1 <span>*</span></label>
                  <input
                    name="cAddress1"
                    placeholder="Address Line 1"
                    value={form.cAddress1}
                    onChange={handleChange}
                  />
                </div>

                <div className="cr-field">
                  <label>Address Line 2</label>
                  <input
                    name="cAddress2"
                    placeholder="Address Line 2"
                    value={form.cAddress2}
                    onChange={handleChange}
                  />
                </div>


                {/* ---------- STATE / DISTRICT / PIN ---------- */}

                <div className="cr-field">
                  <label>State / UT <span>*</span></label>
                  <select
                    name="cState"
                    value={form.cState}
                    onChange={(e) => {
                      handleChange(e);
                      setDistrictList(DISTRICTS[e.target.value] || []);
                    }}
                  >
                    <option value="">Select</option>
                    {STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="cr-field">
                  <label>District <span>*</span></label>
                  <select
                    name="cDistrict"
                    value={form.cDistrict}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {districtList.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="cr-field">
                  <label>PIN Code <span>*</span></label>
                  <input
                    name="cPincode"
                    placeholder="PIN Code"
                    value={form.cPincode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

        </>
      )}

      {showRespondentBlock && (
        <>
          <h4>Details of the Respondent</h4>
          {(isAgent || isPromoter) && (
            <>
              <label>Is He/She Registered with AP RERA:</label>
              <div className="cr-radio-line">
                <label>
                  <input
                    type="radio"
                    name="respondentRERA"
                    value="Yes"
                    checked={form.respondentRERA === "Yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="respondentRERA"
                    value="No"
                    checked={form.respondentRERA === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </>
          )}

          <div className="cr-row-3">
            {respondentRERA_Yes && (isPromoter || isAgent) && (
              <input
                name="promoterRegId"
                placeholder={isAgent ? "Agent ID *" : "Promoter / Project Reg. ID *"}
                value={form.promoterRegId}
                onChange={handleChange}
              />
            )}
          </div>

          {(isAllottee || (isAgent && respondentRERA_No) || (isPromoter && respondentRERA_No)) && (
            <div className="cr-row-3">
              <div className="cr-field">
                <label>Project Name <span><span>*</span></span></label>
                <input
                  name="projectName"
                  placeholder="Project Name *"
                  value={form.projectName}
                  onChange={handleChange}
                />
              </div>

              <div className="cr-field">
                <label>
                  {isPromoter
                    ? "Promoter Name (Preferably Company Name)"
                    : "Name"}{" "}
                  <span>*</span>
                </label>
                <input
                  name="respondentName"
                  placeholder={
                    isPromoter
                      ? "Promoter Name (Preferably Company Name)"
                      : "Name"
                  }
                  value={form.respondentName}
                  onChange={handleChange}
                />
              </div>

              <div className="cr-field">
                <label>Mobile No <span>*</span></label>
                <input
                  name="respondentMobile"
                  placeholder="Mobile *"
                  value={form.respondentMobile}
                  onChange={handleChange}
                />
              </div>

              <div className="cr-field">
                <label>Email ID <span>*</span></label>
                <input
                  name="respondentEmail"
                  placeholder="Email *"
                  value={form.respondentEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

        </>
      )}

      {(
        isAgainstAllottee ||
        (isAgent && respondentRERA_No) ||
        (isPromoter && respondentRERA_No)
      ) && (

          <>
            <h4>Respondent Communication Address</h4>
            <div className="cr-row-3">
              <div className="cr-field">
                <label>Address Line 1 <span>*</span></label>
                <input
                  name="rAddress1"
                  placeholder="Address Line 1"
                  value={form.rAddress1}
                  onChange={handleChange}
                />
              </div>

              <div className="cr-field">
                <label>Address Line 2</label>
                <input
                  name="rAddress2"
                  placeholder="Address Line 2"
                  value={form.rAddress2}
                  onChange={handleChange}
                />
              </div>

              <div className="cr-field">
                <label>State / UT <span>*</span></label>
                <select
                  name="rState"
                  value={form.rState}
                  onChange={(e) => {
                    handleChange(e);
                    setDistrictList(DISTRICTS[e.target.value] || []);
                  }}
                >
                  <option value="">Select</option>
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="cr-field">
                <label>District <span>*</span></label>
                <select
                  name="rDistrict"
                  value={form.rDistrict}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {districtList.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="cr-field">
                <label>PIN Code <span>*</span></label>
                <input
                  name="rPincode"
                  placeholder="PIN Code"
                  value={form.rPincode}
                  onChange={handleChange}
                />
              </div>
            </div>

          </>
        )}

      <h4>Details Of The Complaint</h4>
      <div className="cr-row-3">
        {/* ================= SUBJECT & RELIEF ================= */}

        {/* 🔴 ONLY FOR Promoter BY Allottee → DROPDOWNS */}
        {isPromoterByAllottee ? (
          <>
            {/* Subject of Complaint */}
            <div className="cr-field">
              <label>Subject of Complaint <span>*</span></label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Any Other">Any Other</option>
                <option value="Financial Issues">Financial Issues</option>
                <option value="Legal Issues">Legal Issues</option>
                <option value="Specifications and Quality Constructions">
                  Specifications and Quality Constructions
                </option>
                <option value="Time Frame">Time Frame</option>
              </select>
            </div>

            {/* Any Other – Subject */}
            {form.subject === "Any Other" && (
              <div className="cr-field">
                <label>Any Other <span>*</span></label>
                <input
                  name="subjectOther"
                  placeholder="Subject of Complaint"
                  value={form.subjectOther || ""}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Relief Sought */}
            <div className="cr-field">
              <label>Relief Sought from APRERA <span>*</span></label>
              <select
                name="relief"
                value={form.relief}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Any Other">Any Other</option>
                <option value="Cancellation of Agreement">
                  Cancellation of Agreement
                </option>
                <option value="Compensation">Compensation</option>
                <option value="Rectification of Work">Rectification of Work</option>
              </select>
            </div>

            {/* Any Other – Relief */}
            {form.relief === "Any Other" && (
              <div className="cr-field">
                <label>Any Other <span>*</span></label>
                <input
                  name="reliefOther"
                  placeholder="Relief Sought from APRERA"
                  value={form.reliefOther || ""}
                  onChange={handleChange}
                />
              </div>
            )}
          </>
        ) : (
          <>
            {/* 🟢 ALL OTHER CONDITIONS → NORMAL INPUTS */}
            <div className="cr-field">
              <label>Subject of Complaint <span>*</span></label>
              <input
                name="subject"
                placeholder="Subject of Complaint"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="cr-field">
              <label>Relief Sought from APRERA <span>*</span></label>
              <input
                name="relief"
                placeholder="Relief Sought from APRERA"
                value={form.relief}
                onChange={handleChange}
              />
            </div>
          </>
        )}


        {form.complaintAgainst === "Promoter" && (
          <div className="cr-field">
            <label>Interim Order <span>*</span></label>
            <div className="cr-radio-inline">
              <label>
                <input
                  type="radio"
                  name="interimOrder"
                  value="Yes"
                  checked={form.interimOrder === "Yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="interimOrder"
                  value="No"
                  checked={form.interimOrder === "No"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>
        )}

        {/* ===== Description of Complaint + Agreed/Delivered/Deviation ===== */}

        {(isComplaintByOthers || byPromoter) && (
          <div className="cr-field">
            <div>
              <label>Description of Complaint <span>*</span></label>
              <input
                name="description"
                placeholder="Description of Complaint"
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>
        )}


        {isAgentAgainstPromoter && (
          <div>
            <div className="cr-field">
              <label>Description of Complaint <span>*</span></label>
              <input
                name="description"
                placeholder="Description of Complaint"
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>
        )}


        {/* Upload Fee Receipt → ONLY when Against Allottee AND NOT By Promoter */}
        {isAgainstAllottee && (byAgent || !isAllotteeByPromoter) && (
          <div className="cr-row-3">
            <div>
              <label>Upload Fee Receipt <span>*</span></label>
              <input
                type="file"
                name="feeReceiptFile"
                accept="application/pdf"
                onChange={handleChange}
              />
            </div>
          </div>
        )}


        {/* {isAgainstAllottee && (
          <div className="cr-row-3">
            <div>
              <label>Description of Complaint *</label>
              <input
                name="description"
                placeholder="Description of Complaint"
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>
        )} */}

        {/* {isAgainstAllottee && (
          <div className="cr-row-3">
            <div>
              <label>Upload Fee Receipt *</label>
              <input
                type="file"
                name="feeReceiptFile"
                accept="application/pdf"
                onChange={handleChange}
              />
            </div>
          </div>
        )} */}



        {/* Description → NOT for Promoter by Allottee */}
        {isComplaintByAllottee && !isPromoterByAllottee && (
          <div className="cr-row-3">
            <div>
              <label>Description of Complaint *</label>
              <input
                name="description"
                placeholder="Description of Complaint"
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {isAgainstAllottee && !byAgent && (
          <div className="cr-row-3">
            <div>
              <label>Upload Agreement for Sale <span>*</span></label>
              <input
                type="file"
                name="agreementFile"
                accept="application/pdf"
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {isAgainstAllottee && byAgent && (
          <div className="cr-row-3">
            <div>
              <label>Description of Complaint <span>*</span></label>
              <input
                name="description"
                placeholder="Description of Complaint"
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {isPromoterByAllottee && (
          <div className="cr-row-3">
            <div>
              <label>Upload Agreement for Sale <span>*</span></label>
              <input
                type="file"
                name="agreementFile"
                accept="application/pdf"
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {isComplaintByAllottee && (
          <div className="cr-row-3">
            <div>
              <label>
                Complaint Regarding <span>*</span>
                <span style={{ color: "red" }}>
                  {" "}(Ex: House/Flat/Block/Floor No.)
                </span>
              </label>
              <input
                name="complaintRegarding"
                placeholder="Complaint Regarding"
                value={form.complaintRegarding}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {isComplaintByAllottee && !isPromoterByAllottee && !isAllotteeByPromoter && (
          <div className="cr-row-3">
            <div>
              <label>Upload Fee Receipt <span>*</span></label>
              <input
                type="file"
                name="feeReceiptFile"
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* <div className="cr-row-3">
        {showAgreementUpload && (
          <input
            type="file"
            name="agreementFile"
            onChange={handleChange}
          />
        )}
      </div> */}

        <div className="cr-row-3">
          {showInterimUpload && (
            <div>
              <label>Upload Relavant Document <span>*</span></label>
              <input
                type="file"
                name="interimFile"
                accept="application/pdf"
                onChange={handleChange}


              />
            </div>
          )}

        </div>

      </div>
      {isPromoterByAllottee && (
        <>
          <div>
            {/* ===== Description of Complaint (heading only) ===== */}
            <div className="cr-section-heading">
              Description of Complaint
            </div>

            {/* ===== Scoped container ===== */}

            <div className="cr-row-3">
              <div>
                <label>Agreed / Committed <span>*</span></label>
                <input
                  name="agreed"
                  placeholder="Agreed / Committed"
                  value={form.agreed || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Delivered <span>*</span></label>
                <input
                  name="delivered"
                  placeholder="Delivered"
                  value={form.delivered || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Deviation <span>*</span></label>
                <input
                  name="deviation"
                  placeholder="Deviation"
                  value={form.deviation || ""}
                  onChange={handleChange}
                />
              </div>

              {/* ===== Add Button (ONLY ONE) ===== */}

              <button
                type="button"
                className="cr-btn-add"
                onClick={handleAddRow}
              >
                Add
              </button>

            </div>
          </div>

          {/* ===== Table ===== */}
          {rows.length > 0 && (
            <table className="cr-data-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Agreed</th>
                  <th>Delivered</th>
                  <th>Deviation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.agreed}</td>
                    <td>{row.delivered}</td>
                    <td>{row.deviation}</td>
                    <td>
                      <button
                        type="button"
                        className="cr-btn-delete"
                        onClick={() => handleDelete(index)}
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
      <h4>Project Details</h4>

<div className="cr-row-3">
  
  {/* Left Side → Radio */}
  <div className="cr-field">
    <label>Is project registered with AP RERA:</label>

    <div className="cr-radio-line">
      <label>
        <input
          type="radio"
          name="projectRegistered"
          value="Yes"
          checked={form.projectRegistered === "Yes"}
          onChange={handleChange}
        />
        Yes
      </label>

      <label>
        <input
          type="radio"
          name="projectRegistered"
          value="No"
          checked={form.projectRegistered === "No"}
          onChange={handleChange}
        />
        No
      </label>
    </div>
  </div>

  {/* Right Side → Dynamic Field */}
  {form.projectRegistered === "Yes" && (
    <div className="cr-field">
      <label>Project Registration Number <span>*</span></label>
      <input
        name="projectRegNumber"
        placeholder="Enter Project Registration Number"
        value={form.projectRegNumber}
        onChange={handleChange}
      />
    </div>
  )}

  {form.projectRegistered === "No" && (
    <div className="cr-field">
      <label>B.A / L.P Number <span>*</span></label>
      <input
        name="projectLpNumber"
        placeholder="Enter B.A / L.P Number"
        value={form.projectLpNumber}
        onChange={handleChange}
      />
    </div>
  )}

</div>
      <h4>Supporting Documents</h4>
      <div className="cr-row-3">
        <div>
          <label>Document Description</label>
          <input
            name="docDesc"
            placeholder="Document Description"
            value={form.docDesc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Upload Document</label>
          <input
            type="file"
            name="docFile"
            accept="application/pdf"
            ref={docFileRef}
            onChange={handleChange}
          />

        </div>
        <button
          type="button"
          onClick={handleAddDoc}
          className="cr-add-btn"
        >
          Add
        </button>
      </div>

      {supportingDocs.length > 0 && (
        <table className="cr-doc-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Document Description</th>
              <th>Uploaded Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {supportingDocs.map((d, i) => (
              <tr key={d.id}>
                <td>{i + 1}</td>
                <td>{d.desc}</td>
                <td>
                  <a
                    href={URL.createObjectURL(d.file)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </td>
                <td>
                  <button
                    type="button"
                    className="cr-btn-delete"
                    onClick={() =>
                      setSupportingDocs((p) => p.filter((x) => x.id !== d.id))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4>Declaration</h4>
      <div className="cr-declaration">
        <input
          type="checkbox"
          name="declaration1"
          checked={form.declaration1 || false}
          onChange={handleChange}
        />
        <span>
          I hereby declare that the complaint mentioned above is not pending before any
          court of law or any other authority or any other tribunal.
        </span>
      </div>
      <div className="cr-declaration">
        <input
          type="checkbox"
          name="declaration2"
          checked={form.declaration2 || false}
          onChange={handleChange}
        />
        <span>
          I,&nbsp;
         <input
  type="text"
  name="declarantName"
  value={form.declarantName || ""}
  onChange={handleChange}
  className="cr-inline-input"
/>
          , the complainant do hereby verify that the contents of above are true to my
          personal knowledge and belief and that I have not suppressed any material
          fact(s).
        </span>
      </div>

      <div className="cr-footer">
        <button
          className="cr-proceed-btn"
          onClick={handleSaveAndContinue}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Save And Continue"}
        </button>
      </div>
    </div>
  );
}