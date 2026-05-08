import "../styles/ProjectUploadDocument.css";
import ProjectWizard from "../components/ProjectWizard";
import React, { useState, useEffect } from "react";
import { apiPost, apiPut } from "../api/api";
import { useNavigate } from "react-router-dom";

const uploaddocDocuments = [
   {
    id: 1,
    text: "Copies of the registered ownership documents / Pattadhar pass books issued by Revenue department along with link documents and authorization letter given by the Land Owner",
    text1: "(refer Form P20 in form download).",
  },
  {
    id: 2,
    text: "Copies of the combined field sketches showing the Survey Number boundaries, Subdivision boundaries, and Layout boundaries duly marking the Geo-Coordinates at every corner of the site.",
  },
  {
    id: 3,
    text: "Detailed site plan showing the measurements as on ground including diagonals along with Geo-Coordinates (Latitude and Longitude) at end points of the project site along with incorporation on Satellite Imagery.",
  },
  {
    id: 4,
    text: "Copy of the registered development agreement between the Owner of the land and the Promoter / Authorization letter given by the Land owner  to undertake the construction of the building by the promoter.",
  },
    {
    id: 5,
    text: "Land Title search Report from an Advocate (include Advocate Enrolment Number) having experience of atleast ten years in land related matters.",
  },
  {
    id: 6,
    text: "Latest (by 30 days) Encumbrance certificate (for entire period of document) issued by the Registration and Stamps department.",
  },
  {
    id: 7,
    text: "Copy of the plan and proceedings issued by the competent Authority for approval of plans (TDR Bonds, if any).",
  },
  {
    id: 8,
    text: "Approved plan / list of amenities proposed in the site.",
  },
  {
    id: 9,
    text: "NOC’s issued by Authority (where applicable viz., Airport Authority, Fire Department, Environmental Clearance, etc.).",
  },
  {
    id: 10,
    text: "Detailed technical specifications of the construction if the buildings and facilities proposed in the project including brand details, specifications of infrastructure and details of fixtures and fittings",
    text1:"(refer Form P18 in forms download)."
  },
  {
    id: 11,
    text: "Topo Plan drawn to a scale with nearby land marks of the site.",
  },
  {
    id: 12,
    text: "Licenses/Enrolment form of Civil Contractors, or turnkey contractor, or EPC Contractors of the project (if any).",
  },
  {
  
    id: 13,
    text: "Licenses/Enrolment form of Structural Engineer of the project (if there is any overhead tank or major structure proposed in the layout).",
  },
  {
    id: 14,
    text: "Licenses/Enrolment form of Architect or firm or company.",
  },
  {
    id: 15,
    text: "Licenses/Enrolment form of Engineer or firm or company (if any).",
  },
  {
    id: 16,
    text: "Licenses/Enrolment form of Chartered Accountant or firm or company.",
  },
  {
    id: 17,
    text: "Detailed estimate of the expenditure for construction of the building",
    text1:"(refer Form P16 in forms download).",
  },
  {
    id: 18,
    text: "Statement of source of funds for construction of building",
    text1:"(refer Form P9 in forms download)."
  },
  {
    id: 19,
    text: "Details of financial agreement made with any bank or other financial institution recognised by the Reserve Bank of India and of legal safeguards taken, if any, for the construction of building, or transfer of building by sale, gift or mortgage or otherwise (wherever applicable).",
  },
  {
    id: 20,
    text: "Copy of documents showing details of mortgage or any other legal encumbrance created on land in favour of any bank or financial institution recognised by the RBI (where applicable).",
  },
  {
    id: 21,
    text: "Proforma of the Allotment Letter proposed to be signed with the Allottee",
    text1:"(refer Form P14 in forms download)."
  },
    {
    id: 22,
    text: "Proforma of the Agreement for Sale proposed to be signed with the Allottee",
    text1:"(refer Form P15 in forms download)."
  },
  {
    id: 23,
    text: "Proforma of the Conveyance Deed proposed to be signed with the Allottee",
  },
  {
    id: 24,
    text: "Structural Stability Certificate duly issued by Certified Structural Consultant",
    text1:"(refer Form P19 in forms download)."
  },
  {
    id: 25,
    text: "Copy of Insurance of title of the land.",
  },
  {
    id: 26,
    text: "FORM - B, Declaration, supported by an affidavit (on Rs.20 non judicial stamp paper), which shall be signed by the promoter or any person authorized by the promoter under Rule 3-B(2)(a) to of AP Real Estate Rules-2017",
    text1:"(refer Form P11 in forms download)."
  },
  {
    id: 27,
    text: "Details of the area mortgaged to the Competent Authority for approval of Plans / Mortgage Deed.",
  }
];

export default function UploadDocumentsWithApi() {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [consultancyName, setConsultancyName] = useState("");
    const [consultantName, setConsultantName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [declarationChecked, setDeclarationChecked] = useState(false);
    const [note1Checked, setNote1Checked] = useState(false);
    const [note2Checked, setNote2Checked] = useState(false);
    const [address, setAddress] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const applicationNumber = sessionStorage.getItem("applicationNumber") || "100126116502";
    const panNumber = sessionStorage.getItem("panNumber") || "ODZPS3189G";
    const promoterType = sessionStorage.getItem("promoterType");   // ✅ ADD THIS

    // Helper function to extract filename from URL
    const extractFileNameFromUrl = (url) => {
        if (!url) return null;
        
        try {
            // Try to decode the URL first
            const decodedUrl = decodeURIComponent(url);
            
            // Get the last part after the last slash
            const urlParts = decodedUrl.split('/');
            let fileName = urlParts[urlParts.length - 1];
            
            // Remove query parameters if any
            fileName = fileName.split('?')[0];
            
            // Remove any leading/trailing spaces
            fileName = fileName.trim();
            
            // If fileName is empty or just a slash, return null
            if (!fileName || fileName === '' || fileName === '/') {
                return null;
            }
            
            return fileName;
        } catch (error) {
            console.error("Error extracting filename:", error);
            return null;
        }
    };

    // Helper function to get document type text for better filename display
    const getDocumentTypeText = (docId) => {
        const doc = uploaddocDocuments.find(d => d.id === docId);
        if (doc) {
            // Extract first few words from document text for a meaningful name
            const words = doc.text.split(' ').slice(0, 5).join(' ');
            return words.length > 40 ? words.substring(0, 40) + '...' : words;
        }
        return `Document ${docId}`;
    };

    const isValidMobile = (mobile) => {
        const mobileRegex = /^[6-9]\d{9}$/;
        return mobileRegex.test(mobile);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleFileChange = (docId, file) => {
        if (!file) return;

        // Create object URL for the file
        const fileUrl = URL.createObjectURL(file);
        
        setUploadedFiles((prev) => ({
            ...prev,
            [docId]: {
                file,
                url: fileUrl,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
            },
        }));
    };

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            Object.values(uploadedFiles).forEach(fileObj => {
                if (fileObj?.url && fileObj.url.startsWith('blob:')) {
                    URL.revokeObjectURL(fileObj.url);
                }
            });
        };
    }, []);

    // ========== FETCH EXISTING DATA ==========
    const fetchExistingData = async () => {
        setIsLoading(true);
        try {
            console.log("Fetching data for:", { applicationNumber, panNumber });
            
            const res = await apiPost("/api/project/documents-consultant/get", {
                application_number: applicationNumber,
                pan_number: panNumber,
            });

            console.log("API Response:", res);

            if (res.status === "success") {
                // Set consultant data
                if (res.consultant && Object.keys(res.consultant).length > 0) {
                    console.log("Setting consultant data:", res.consultant);
                    setConsultancyName(res.consultant.consultancy_name || "");
                    setConsultantName(res.consultant.consultant_name || "");
                    setMobile(res.consultant.mobile_number || "");
                    setEmail(res.consultant.email_id || "");
                    setAddress(res.consultant.address || "");
                    setDeclarationChecked(res.consultant.declaration_accept === "Y");
                    setNote1Checked(res.consultant.note1_accept === "Y");
                    setNote2Checked(res.consultant.note2_accept === "Y");
                }

                // Set documents data - ENHANCED VERSION
                if (res.documents && Object.keys(res.documents).length > 0) {
                    console.log("Setting documents data:", res.documents);
                    const formattedDocs = {};
                    
                    Object.entries(res.documents).forEach(([docId, fileUrl]) => {
                        // Try to extract filename from URL
                        let fileName = extractFileNameFromUrl(fileUrl);
                        
                        // If filename extraction failed, create a meaningful name from document type
                        if (!fileName) {
                            fileName = getDocumentTypeText(parseInt(docId));
                        }
                        
                        formattedDocs[docId] = {
                            file: null,
                            url: fileUrl,
                            fileName: fileName,
                            documentType: getDocumentTypeText(parseInt(docId)),
                        };
                    });
                    
                    setUploadedFiles(formattedDocs);
                }
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setPopupMessage("Error fetching existing data: " + err.message);
            setShowPopup(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (applicationNumber && panNumber) {
            fetchExistingData();
        }
    }, []);

    // ========== UPLOAD/UPDATE DOCUMENTS ==========
    const uploadProjectDocuments = async () => {
        const formData = new FormData();

        formData.append("application_number", applicationNumber);
        formData.append("pan_number", panNumber);

        // Add new files
        Object.entries(uploadedFiles).forEach(([docId, fileObj]) => {
            if (fileObj?.file) {
                formData.append(`doc_${docId}`, fileObj.file);
            }
        });

        // Add existing documents as JSON
        const existingDocs = {};
        Object.entries(uploadedFiles).forEach(([docId, fileObj]) => {
            if (!fileObj?.file && fileObj?.url) {
                existingDocs[docId] = fileObj.url;
            }
        });

        formData.append("existing_documents", JSON.stringify(existingDocs));

        return apiPost("/api/project/documents/upload", formData);
    };

    // ========== SAVE/UPDATE CONSULTANT ==========
    const saveConsultantDeclaration = async () => {
        const payload = {
            application_number: applicationNumber,
            pan_number: panNumber,
            consultancy_name: consultancyName,
            consultant_name: consultantName,
            mobile_number: mobile,
            email_id: email,
            address: address,
            declaration_name: consultantName,
            declaration_accept: declarationChecked ? "Y" : "N",
            note1_accept: note1Checked ? "Y" : "N",
            note2_accept: note2Checked ? "Y" : "N",
        };

        console.log("Saving consultant with payload:", payload);
        
        const res = await apiPost("/api/project/consultant-declaration/save", payload);
        return res;
    };

    // ========== UPDATE CONSULTANT ==========
    const updateConsultantDeclaration = async () => {
        const payload = {
            application_number: applicationNumber,
            pan_number: panNumber,
            consultancy_name: consultancyName,
            consultant_name: consultantName,
            mobile_number: mobile,
            email_id: email,
            address: address,
            declaration_name: consultantName,
            declaration_accept: declarationChecked ? "Y" : "N",
            note1_accept: note1Checked ? "Y" : "N",
            note2_accept: note2Checked ? "Y" : "N",
        };

        console.log("Updating consultant with payload:", payload);
        
        return apiPut("/api/project/consultant-declaration/update", payload);
    };

    // ========== HANDLE SAVE ==========
    const handleSave = async () => {
        // Validation
        const hasAnyDocument = Object.values(uploadedFiles).some(
            (doc) => doc?.file || doc?.url
        );

        if (!hasAnyDocument) {
            setPopupMessage("Please upload at least one document");
            setShowPopup(true);
            return;
        }

        if (!consultancyName.trim()) {
            setPopupMessage("Please Enter Name of Consultancy/Agency/Association/Individual");
            setShowPopup(true);
            return;
        }

        if (!consultantName.trim()) {
            setPopupMessage("Please Enter Name");
            setShowPopup(true);
            return;
        }

        if (!mobile.trim()) {
            setPopupMessage("Please Enter Mobile Number");
            setShowPopup(true);
            return;
        }

        if (!isValidMobile(mobile)) {
            setPopupMessage("Please Enter Valid Mobile Number");
            setShowPopup(true);
            return;
        }

        if (!email.trim()) {
            setPopupMessage("Please Enter Email Id");
            setShowPopup(true);
            return;
        }

        if (!isValidEmail(email)) {
            setPopupMessage("Please Enter Valid Email Id");
            setShowPopup(true);
            return;
        }

        if (!address.trim()) {
            setPopupMessage("Please Enter Address");
            setShowPopup(true);
            return;
        }

        if (!declarationChecked) {
            setPopupMessage("Please Check Self Declaration");
            setShowPopup(true);
            return;
        }

        if (!note1Checked) {
            setPopupMessage("Please Check Note 1");
            setShowPopup(true);
            return;
        }

        if (!note2Checked) {
            setPopupMessage("Please Check Note 2");
            setShowPopup(true);
            return;
        }

        setIsLoading(true);
        try {
            // First check if consultant record exists
            const checkRes = await apiPost("/api/project/documents-consultant/get", {
                application_number: applicationNumber,
                pan_number: panNumber,
            });

            let consultantSaved = false;
            
            if (checkRes.consultant && Object.keys(checkRes.consultant).length > 0) {
                // Update existing consultant
                await updateConsultantDeclaration();
                consultantSaved = true;
                console.log("Consultant updated successfully");
            } else {
                // Save new consultant
                await saveConsultantDeclaration();
                consultantSaved = true;
                console.log("Consultant saved successfully");
            }

            // Upload/Update documents
            if (consultantSaved) {
                const docRes = await uploadProjectDocuments();
                console.log("Documents uploaded successfully:", docRes);
            }

            setPopupMessage("Project documents saved successfully");
            setShowPopup(true);

            // Store values for refresh safety
            sessionStorage.setItem("applicationNumber", applicationNumber);
            sessionStorage.setItem("panNumber", panNumber);

            // Navigate to Preview
          setTimeout(() => {

    if (promoterType === "other") {

        navigate("/othertheninduvidual-preview", {
            state: {
                panNumber,
                applicationNumber
            }
        });

    } else {

        // DO NOT TOUCH Individual flow
        navigate("/preview", {
            state: {
                panNumber,
                applicationNumber
            }
        });

    }

}, 500);

        } catch (err) {
            console.error("Save error:", err);
            setPopupMessage(err.message || "Something went wrong");
            setShowPopup(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="uploaddoc-container">
            {/* Breadcrumb */}
            <div className="uploaddoc-breadcrumb">
                You are here :{" "}
                <span className="uploaddoc-breadcrumb-home">Home</span> / Registration /
                Project Registration
            </div>

            {/* Title */}
            <h2 className="uploaddoc-title">Project Registration</h2>
            <ProjectWizard currentStep={5} type="individual"/>
            <div className="uploaddoc-title-line" />

            {/* Table */}
            <table className="uploaddoc-table">
                <thead>
                    <tr>
                        <th className="uploaddoc-th">Document Type</th>
                        <th className="uploaddoc-th">
                            Upload (Max size 70 MB for each document)
                        </th>
                        <th className="uploaddoc-th">Uploaded Document</th>
                    </tr>
                </thead>

                <tbody>
                    {uploaddocDocuments.map((doc) => (
                        <tr key={doc.id}>
                            <td className="uploaddoc-td">
                                {doc.text}
                                {doc.text1 && (
                                    <span className="uploaddoc-doc-note"> {doc.text1}</span>
                                )}
                            </td>

                            <td className="uploaddoc-td">
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            handleFileChange(doc.id, file);
                                        }
                                    }}
                                    disabled={isLoading}
                                />
                            </td>

                            <td className="uploaddoc-td">
                                {uploadedFiles[doc.id] && (
                                    <a
                                        href={uploadedFiles[doc.id].url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="uploaddoc-download-link"
                                        onClick={(e) => {
                                            if (!uploadedFiles[doc.id].file && uploadedFiles[doc.id].url) {
                                                e.preventDefault();
                                                window.open(uploadedFiles[doc.id].url, '_blank', 'noopener,noreferrer');
                                            }
                                        }}
                                        title={uploadedFiles[doc.id].fileName || `Click to view document ${doc.id}`}
                                    >
                                        {uploadedFiles[doc.id].file 
                                            ? uploadedFiles[doc.id].file.name 
                                            : (uploadedFiles[doc.id].fileName || getDocumentTypeText(doc.id))}
                                    </a>
                                )}
                                {!uploadedFiles[doc.id] && (
                                    <span className="uploaddoc-no-file">No file uploaded</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Submitted By */}
            <div className="uploaddoc-submitted-by">
                <label className="uploaddoc-submitted-label">
                    This Project Registration application is submitted by
                    <span className="uploaddoc-required">*</span>
                </label>

                <label className="uploaddoc-radio">
                    <input type="radio" checked readOnly />
                    Consultancy
                </label>
            </div>

            {/* Consultancy Details */}
            <h3 className="uploaddoc-section-title">Consultancy Details</h3>
            <div className="uploaddoc-section-underline"></div>

            <div className="uploaddoc-form-grid">
                <div>
                    <label>
                        Name of Consultancy/Agency/Association/Individual
                        <span className="uploaddoc-required">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Name of Consultancy/Agency/Association"
                        value={consultancyName}
                        onChange={(e) => setConsultancyName(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label>
                        Name<span className="uploaddoc-required">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Consultant Name"
                        value={consultantName}
                        onChange={(e) => setConsultantName(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label>
                        Mobile Number<span className="uploaddoc-required">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        value={mobile}
                        maxLength={10}
                        onChange={(e) =>
                            setMobile(e.target.value.replace(/\D/g, ""))
                        }
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label>
                        Email Id<span className="uploaddoc-required">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <div className="uploaddoc-full-width">
                    <label>
                        Full Address for communication
                        <span className="uploaddoc-required">*</span>
                    </label>
                    <input
                        placeholder="Full Address for communication"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
            </div>

            <p className="uploaddoc-note">
                Note: If encountered any issue during upload of documents, please contact
                APRERA IT Support Team.
            </p>

            {/* Declaration */}
            <h3 className="uploaddoc-section-title">Declaration</h3>
            <div className="uploaddoc-section-underline"></div>

            <div className="uploaddoc-declaration">
                <input
                    type="checkbox"
                    checked={declarationChecked}
                    onChange={(e) => setDeclarationChecked(e.target.checked)}
                    disabled={isLoading}
                />
                <span>
                    I/We
                    <input 
                        type="text" 
                        className="uploaddoc-inline-input" 
                        value={consultantName}
                        readOnly
                    />
                    solemnly affirm and declare that the particulars given above are correct
                    to my/our knowledge and belief.
                </span>
            </div>

            {/* Note */}
            <h3 className="uploaddoc-section-title">Note</h3>
            <div className="uploaddoc-section-underline"></div>

            <div className="uploaddoc-note-list">
                <div>
                    <input
                        type="checkbox"
                        checked={note1Checked}
                        onChange={(e) => setNote1Checked(e.target.checked)}
                        disabled={isLoading}
                    />
                    <span>
                        1. The applicability of the Penalty/additional fee may be imposed, if
                        any, provision of the act is violated, as determined by the Authority,
                        as the case may be.
                    </span>
                </div>

                <div>
                    <input
                        type="checkbox"
                        checked={note2Checked}
                        onChange={(e) => setNote2Checked(e.target.checked)}
                        disabled={isLoading}
                    />
                    <span>
                        2. As per section 4 of the RERA Act, 2016, you are hereby directed to
                        address the shortfalls within 15 days as addressed by the Authority,
                        failing which the application may be rejected as per Section 4 of the Act.
                    </span>
                </div>
            </div>

            {/* Save Button */}
            <div className="uploaddoc-save-wrapper">
                <button
                    className="uploaddoc-save-btn"
                    onClick={handleSave}
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </div>

            {showPopup && (
                <>
                    <div className="uploaddoc-overlay"></div>
                    <div className="uploaddoc-popup">
                        <button
                            className="uploaddoc-popup-close"
                            onClick={() => setShowPopup(false)}
                        >
                            ×
                        </button>
                        <p>{popupMessage}</p>
                    </div>
                </>
            )}
        </div>
    );
}