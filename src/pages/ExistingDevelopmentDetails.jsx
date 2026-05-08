// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import { apiPost, apiGet } from "../api/api";
// import '../styles/DevelopmentDetails.css';
// import ReraLoader from "../components/ReraLoader";
// import ExistingProjectWizard from '../components/ExistingProjectWizard';

// const ExistingDevelopmentDetails = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const panNumber =
//         location.state?.panNumber || sessionStorage.getItem("panNumber");

//     const applicationNumber =
//         location.state?.applicationNumber || sessionStorage.getItem("applicationNumber");

//     console.log("🔍 PAN Number:", panNumber);
//     console.log("🔍 Application Number:", applicationNumber);

//     useEffect(() => {
//         if (location.state?.panNumber && location.state?.applicationNumber) {
//             sessionStorage.setItem("panNumber", location.state.panNumber);
//             sessionStorage.setItem("applicationNumber", location.state.applicationNumber);
//         }
//     }, [location.state]);

//     const [projectId, setProjectId] = useState('');
//     const [projectType, setProjectType] = useState('residential');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [hasExistingData, setHasExistingData] = useState(false);

//     const [buildingTypes, setBuildingTypes] = useState({
//         plots: false,
//         apartmentsFlats: false,
//         villas: false,
//         commercial: false
//     });


//     const [plotDetails, setPlotDetails] = useState({
//         totalPlots: '',
//         plotFile: null,
//         no_blocks: '',
//         file_path: ''
//     });

//     const [apartmentDetails, setApartmentDetails] = useState({
//         totalBlocks: '',
//         apartmentFile: null,
//         no_blocks: '',
//         file_path: '',
//         rows: []
//     });

//     const [villaDetails, setVillaDetails] = useState({
//         totalBlocks: '',
//         villaFile: null,
//         no_blocks: '',
//         file_path: ''
//     });

//     const [commercialDetails, setCommercialDetails] = useState({
//         totalBlocks: '',
//         commercialFile: null,
//         no_blocks: '',
//         file_path: ''
//     });

//     const [externalDevelopmentWorks, setExternalDevelopmentWorks] = useState([
//         { type: 'Roads', percentCompleted: 0 },
//         { type: 'Water Supply', percentCompleted: 0 },
//         { type: 'Sewage and Drainage System', percentCompleted: 0 },
//         { type: 'Electricity Supply Transformation Station', percentCompleted: 0 },
//         { type: 'Solid Waste Management And Disposal', percentCompleted: 0 },
//         { type: 'Fire Fighting Facility', percentCompleted: 0 },
//         { type: 'Drinking Water Facility', percentCompleted: 0 },
//         { type: 'Emergency Evacuation Service', percentCompleted: 0 },
//         { type: 'Use of Renewable Energy', percentCompleted: 0 }
//     ]);

//     const [otherWork, setOtherWork] = useState({
//         description: '',
//         type: 'Select'
//     });
//     const [otherWorksList, setOtherWorksList] = useState([]);

//     const [expandedSections, setExpandedSections] = useState({
//         plots: false,
//         apartmentsFlats: false,
//         villas: false,
//         commercial: false
//     });


//     // Fetch existing data from API
//     const fetchDevelopmentDetails = async () => {
//         if (!panNumber || !applicationNumber) {
//             console.log("❌ No PAN/Application number - showing empty form");
//             generateProjectId();
//             setIsLoading(false);
//             return;
//         }

//         try {
//             setIsLoading(true);
//             console.log("📡 Fetching from API...");

//             const response = await apiGet(
//                 `/api/development-details?application_number=${applicationNumber}&pan_number=${panNumber}`
//             );

//             console.log("📥 Full API Response:", response);

//             // ✅ Handle response structure: response.data contains the actual data
//             const apiData = response?.data?.data || response?.data;
//             console.log("✅ FINAL apiData USED:", apiData);




//             console.log("📦 Extracted API Data:", apiData);

//             // Check if data exists (check for id in the data object)
//             if (apiData && apiData.id) {
//                 setHasExistingData(true);
//                 console.log("✅ Data found - Pre-filling form");

//                 // Set project basics
//                 setProjectId(apiData.project_id || '');
//                 setProjectType(apiData.project_type || 'residential');

//                 const devDetails = apiData.development_details || {};
//                 console.log("FULL Apartments_Flats:", devDetails.Apartments_Flats);

//                 console.log("🏗️ Development Details:", devDetails);

//                 // Determine which building types are present
//                 const newBuildingTypes = {
//                     plots: !!devDetails.Plots,
//                     apartmentsFlats: !!devDetails.Apartments_Flats,
//                     villas: !!devDetails.Villas,
//                     commercial: !!devDetails.Commercial
//                 };

//                 console.log("🏘️ Building Types Found:", newBuildingTypes);
//                 setBuildingTypes(newBuildingTypes);

//                 // Auto-expand sections that have data
//                 setExpandedSections({
//                     plots: newBuildingTypes.plots,
//                     apartmentsFlats: newBuildingTypes.apartmentsFlats,
//                     villas: newBuildingTypes.villas,
//                     commercial: newBuildingTypes.commercial
//                 });


//                 // Pre-fill Plot Details
//                 if (devDetails.Plots) {
//                     console.log("📍 Plots Data:", devDetails.Plots);
//                     setPlotDetails({
//                         totalPlots: devDetails.Plots.no_plots?.toString() || '',
//                         no_blocks: devDetails.Plots.no_blocks?.toString() || '',
//                         file_path: devDetails.Plots.file_path || '',
//                         plotFile: null
//                     });
//                 }

//                 // Pre-fill Apartment Details
//                 if (devDetails.Apartments_Flats) {
//                     setApartmentDetails({
//                         totalBlocks: devDetails.Apartments_Flats.no_blocks?.toString() || '',
//                         no_blocks: devDetails.Apartments_Flats.no_blocks?.toString() || '',
//                         file_path: devDetails.Apartments_Flats.file_path || '',
//                         apartmentFile: null,
//                         rows: devDetails.Apartments_Flats.rows || []   // ✅ THIS LINE
//                     });
//                 }


//                 // Pre-fill Villa Details
//                 if (devDetails.Villas) {
//                     console.log("🏡 Villas Data:", devDetails.Villas);
//                     setVillaDetails({
//                         totalBlocks: devDetails.Villas.no_blocks?.toString() || '',
//                         no_blocks: devDetails.Villas.no_blocks?.toString() || '',
//                         file_path: devDetails.Villas.file_path || '',
//                         villaFile: null
//                     });
//                 }

//                 // Pre-fill Commercial Details
//                 if (devDetails.Commercial) {
//                     console.log("🏬 Commercial Data:", devDetails.Commercial);
//                     setCommercialDetails({
//                         totalBlocks: devDetails.Commercial.no_blocks?.toString() || '',
//                         no_blocks: devDetails.Commercial.no_blocks?.toString() || '',
//                         file_path: devDetails.Commercial.file_path || '',
//                         commercialFile: null
//                     });
//                 }

//                 // Pre-fill External Development Work percentages
//                 const extWork = apiData.external_development_work || {};
//                 console.log("🚧 External Work Data:", extWork);

//                 const updatedExt = externalDevelopmentWorks.map(work => {
//                     const key = work.type
//                         .replace(/[^a-zA-Z0-9]/g, '_')
//                         .replace(/\s+/g, '_');
//                     return {
//                         ...work,
//                         percentCompleted: extWork[key] ?? 0
//                     };
//                 });
//                 setExternalDevelopmentWorks(updatedExt);

//                 // Pre-fill Other External Works
//                 if (apiData.other_external_works && Array.isArray(apiData.other_external_works)) {
//                     console.log("📋 Other Works:", apiData.other_external_works);
//                     setOtherWorksList(apiData.other_external_works);
//                 }

//                 console.log("✅ Form pre-filled successfully!");

//             } else {
//                 // No data found - show empty form
//                 setHasExistingData(false);
//                 console.log("ℹ️ No existing data - Showing empty form");
//                 generateProjectId();
//             }

//         } catch (error) {
//             setHasExistingData(false);
//             console.error("❌ Error fetching development details:", error);
//             console.log("⚠️ Showing empty form due to error");
//             generateProjectId();
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Load data on mount
//     useEffect(() => {
//         if (panNumber && applicationNumber) {
//             fetchDevelopmentDetails();
//         }
//     }, [panNumber, applicationNumber]);


//     const generateProjectId = () => {
//         const timestamp = Date.now();
//         const randomNum = Math.floor(Math.random() * 10000);
//         const newProjectId = `PROJ-${timestamp}-${randomNum}`;
//         setProjectId(newProjectId);
//         console.log("🆔 Generated Project ID:", newProjectId);
//     };

//     const handleTemplateDownload = (e, templateType) => {
//         e.preventDefault();
//         e.stopPropagation();

//         let filePath = "";
//         let fileName = "";

//         switch (templateType) {
//             case "plot":
//                 filePath = "/pdf/PlotDetailsTemplate.xlsx";
//                 fileName = "PlotDetailsTemplate.xlsx";
//                 break;
//             case "flat":
//                 filePath = "/pdf/FlatDetailsTemplate (1).xlsx";
//                 fileName = "FlatDetailsTemplate.xlsx";
//                 break;
//             case "villa":
//                 filePath = "/pdf/VillaDetailsTemplate.xlsx";
//                 fileName = "VillaDetailsTemplate.xlsx";
//                 break;
//             case "commercial":
//                 filePath = "/pdf/CommercialDetailsTemplate.xlsx";
//                 fileName = "CommercialDetailsTemplate.xlsx";
//                 break;
//             default:
//                 return;
//         }

//         const link = document.createElement("a");
//         link.href = filePath;
//         link.download = fileName;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };
//     const showReraLoaderAndRun = (action) => {
//         setIsSubmitting(true);

//         setTimeout(() => {
//             action();
//             setIsSubmitting(false);
//         }, 800); // ⏱ feels like real AP-RERA site
//     };


//     const handleBuildingTypeChange = (type) => {
//         showReraLoaderAndRun(() => {
//             setBuildingTypes(prev => ({
//                 ...prev,
//                 [type]: !prev[type]
//             }));

//             setExpandedSections(prev => ({
//                 ...prev,
//                 [type]: !prev[type]
//             }));
//         });
//     };

//     const handleInputChange = (section, field, value) => {
//         switch (section) {
//             case 'plots':
//                 setPlotDetails(prev => ({ ...prev, [field]: value }));
//                 break;
//             case 'apartments':
//                 setApartmentDetails(prev => ({ ...prev, [field]: value }));
//                 break;
//             case 'villas':
//                 setVillaDetails(prev => ({ ...prev, [field]: value }));
//                 break;
//             case 'commercial':
//                 setCommercialDetails(prev => ({ ...prev, [field]: value }));
//                 break;
//             case 'otherWork':
//                 setOtherWork(prev => ({ ...prev, [field]: value }));
//                 break;
//             default:
//                 break;
//         }
//     };

//     const handleFileChange = (section, file) => {
//         if (!file) return;

//         console.log("📎 File selected for", section, ":", file.name);

//         if (!file.name.match(/\.(xls|xlsx)$/i)) {
//             alert("Only Excel files (.xls, .xlsx) are allowed");
//             return;
//         }

//         switch (section) {
//             case "apartments":
//                 setApartmentDetails(prev => ({ ...prev, apartmentFile: file }));
//                 break;
//             case "plots":
//                 setPlotDetails(prev => ({ ...prev, plotFile: file }));
//                 break;
//             case "villas":
//                 setVillaDetails(prev => ({ ...prev, villaFile: file }));
//                 break;
//             case "commercial":
//                 setCommercialDetails(prev => ({ ...prev, commercialFile: file }));
//                 break;
//         }
//     };

//     const handleExternalWorkChange = (index, value) => {
//         const updatedWorks = [...externalDevelopmentWorks];
//         updatedWorks[index].percentCompleted = value;
//         setExternalDevelopmentWorks(updatedWorks);
//     };

//     const handleDeleteOtherWork = (id) => {
//         setOtherWorksList(prev => prev.filter(item => item.id !== id));
//     };

//     const toggleSection = (section) => {
//         setExpandedSections(prev => ({
//             ...prev,
//             [section]: !prev[section]
//         }));
//     };

//     const completeStep = (stepNo) => {
//         const completedSteps = JSON.parse(localStorage.getItem("completedSteps")) || [];
//         if (!completedSteps.includes(stepNo)) {
//             completedSteps.push(stepNo);
//             localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
//         }
//     };

//     const getBackendBuildingTypeKey = (type) => {
//         const keyMap = {
//             'Plots': 'Plots',
//             'Apartments/Flats': 'Apartments_Flats',
//             'Villas': 'Villas',
//             'Commercial': 'Commercial'
//         };
//         return keyMap[type] || type.replace(/[^a-zA-Z0-9]/g, '_');
//     };

//     const handleAddOtherWork = () => {
//         if (!otherWork.description.trim()) {
//             alert("Please enter Work Description");
//             return;
//         }

//         if (otherWork.type === "Select") {
//             alert("Please select Work Type");
//             return;
//         }

//         const newItem = {
//             id: Date.now(),
//             description: otherWork.description,
//             type: otherWork.type
//         }
//         showReraLoaderAndRun(() => {
//             const newItem = {
//                 id: Date.now(),
//                 description: otherWork.description,
//                 type: otherWork.type
//             };



//             setOtherWorksList(prev => [...prev, newItem]);

//             // Reset inputs
//             setOtherWork({
//                 description: '',
//                 type: 'Select'
//             });
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             const formData = new FormData();

//             formData.append('project_id', projectId);
//             formData.append('project_type', projectType);
//             formData.append('work_description', otherWork.description || '');
//             formData.append('work_type', otherWork.type || 'Select');
//             formData.append("pan_number", panNumber);
//             formData.append("application_number", applicationNumber);

//             const developmentDetails = {};

//             if (buildingTypes.plots) {
//                 const key = getBackendBuildingTypeKey('Plots');
//                 developmentDetails[key] = {
//                     no_plots: parseInt(plotDetails.totalPlots) || 0,
//                     no_blocks: parseInt(plotDetails.no_blocks) || 0
//                 };

//                 if (plotDetails.plotFile) {
//                     formData.append(`${key}_file`, plotDetails.plotFile);
//                 }
//             }

//             if (buildingTypes.apartmentsFlats) {
//                 const key = getBackendBuildingTypeKey('Apartments/Flats');
//                 developmentDetails[key] = {
//                     no_plots: 0,
//                     no_blocks: parseInt(apartmentDetails.totalBlocks) || 0
//                 };

//                 if (apartmentDetails.apartmentFile) {
//                     formData.append(`${key}_file`, apartmentDetails.apartmentFile);
//                 } else if (!apartmentDetails.file_path) {
//                     alert('Please upload Flat Details Excel file for Apartments/Flats');
//                     setIsSubmitting(false);
//                     return;
//                 }
//             }

//             if (buildingTypes.villas) {
//                 const key = getBackendBuildingTypeKey('Villas');
//                 developmentDetails[key] = {
//                     no_plots: 0,
//                     no_blocks: parseInt(villaDetails.totalBlocks) || 0
//                 };

//                 if (villaDetails.villaFile) {
//                     formData.append(`${key}_file`, villaDetails.villaFile);
//                 } else if (!villaDetails.file_path) {
//                     alert('Please upload Villa Details Excel file');
//                     setIsSubmitting(false);
//                     return;
//                 }
//             }

//             if (buildingTypes.commercial) {
//                 const key = getBackendBuildingTypeKey('Commercial');
//                 developmentDetails[key] = {
//                     no_plots: 0,
//                     no_blocks: parseInt(commercialDetails.totalBlocks) || 0
//                 };

//                 if (commercialDetails.commercialFile) {
//                     formData.append(`${key}_file`, commercialDetails.commercialFile);
//                 } else if (!commercialDetails.file_path) {
//                     alert('Please upload Commercial Details Excel file');
//                     setIsSubmitting(false);
//                     return;
//                 }
//             }

//             if (Object.keys(developmentDetails).length === 0) {
//                 alert('Please select at least one building type (Apartments/Flats, Plots, Villas, or Commercial)');
//                 setIsSubmitting(false);
//                 return;
//             }

//             formData.append('development_details', JSON.stringify(developmentDetails));

//             const externalDevelopmentWork = {};
//             externalDevelopmentWorks.forEach(work => {
//                 const key = work.type
//                     .replace(/[^a-zA-Z0-9]/g, '_')
//                     .replace(/\s+/g, '_');
//                 externalDevelopmentWork[key] = parseInt(work.percentCompleted) || 0;
//             });

//             formData.append('external_development_work', JSON.stringify(externalDevelopmentWork));
//             formData.append('other_external_works', JSON.stringify(otherWorksList));

//             console.log('📤 Submitting form to /api/development-details');

//             const response = await apiPost("/api/development-details", formData);

//             console.log("📥 Submit Response:", response);

//             if (response && (response.id || response.data?.id)) {
//                 const submittedData = {
//                     projectId,
//                     projectType,
//                     buildingTypes,
//                     plotDetails,
//                     apartmentDetails,
//                     villaDetails,
//                     commercialDetails,
//                     externalDevelopmentWorks,
//                     otherWorksList
//                 };

//                 localStorage.setItem("developmentDetailsSubmitted", JSON.stringify(submittedData));
//                 completeStep(3);

//                 alert("Details submitted successfully.");

//                 navigate('/existing-associate-details', {
//                     state: {
//                         panNumber,
//                         applicationNumber,
//                         developmentData: submittedData
//                     }
//                 });

//             } else {
//                 alert('Unexpected response from server');
//             }

//         } catch (error) {
//             console.error('❌ Error submitting form:', error);

//             let errorMessage = 'Submission failed';
//             if (error.response) {
//                 console.error('Server responded with:', error.response.data);
//                 errorMessage += `: ${error.response.data.message || `Status ${error.response.status}`}`;
//             } else if (error.request) {
//                 console.error('No response received');
//                 errorMessage += ': No response from server. Please check if backend is running.';
//             } else {
//                 console.error('Request setup error:', error.message);
//                 errorMessage += `: ${error.message}`;
//             }

//             alert(errorMessage);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Show loading state
//     if (isLoading) {
//         return (
//             <div className="development-details-container_pd">
//                 <div className="development-details-breadcrumb1">
//                     <span>You are here : </span>
//                     <a href="/">Home</a>
//                     <span> / </span>
//                     <span>Registration / Project Registration</span>
//                 </div>
//                 <ExistingProjectWizard currentStep={3} />
//                 <div style={{ textAlign: 'center', padding: '50px' }}>
//                     <div style={{ fontSize: '24px', marginBottom: '20px' }}>⏳</div>
//                     <h3>Loading development details...</h3>
//                     <p>Please wait while we fetch your data...</p>
//                 </div>
//             </div>
//         );
//     }
//     return (
//         <div className="development-details-container_pd">
//             {(isLoading || isSubmitting) && <ReraLoader />}

//             <div className="development-details-breadcrumb1">
//                 <span>You are here : </span>
//                 <a href="/">Home</a>
//                 <span> / </span>
//                 <span>Registration / Project Registration</span>
//             </div>


//             <ExistingProjectWizard currentStep={3} />

//             {hasExistingData && (
//                 <div style={{
//                     backgroundColor: '#d4edda',
//                     color: '#155724',
//                     padding: '15px',
//                     marginBottom: '20px',
//                     borderRadius: '5px',
//                     border: '1px solid #c3e6cb'
//                 }}>
//                     <strong>✓ Existing data loaded!</strong> You can update the information below and resubmit.
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="development-details-form">
//                 <div className="development-detailsform-section">
//                     <h3 className="development-details-subheading">
//                         Existing Development Details {hasExistingData ? '(Edit Mode)' : ''}
//                     </h3>

//                     <div className="development-details-row development-details-innerdivrow">
//                         <div className="development-details-col-sm-12">
//                             <div className="development-details-form-group">
//                                 <label className="development-details-label">
//                                     Project Consists of<font color="red">*</font>
//                                 </label>

//                                 <table className="development-details-custom_checkbox" style={{ width: '100%' }}>
//                                     <tbody>
//                                         <tr>{/* Plots */}
//                                             <td>
//                                                 <input
//                                                     id="chkPlots"
//                                                     type="checkbox"
//                                                     checked={buildingTypes.plots}
//                                                     onChange={() => handleBuildingTypeChange("plots")}
//                                                 />
//                                                 <label htmlFor="chkPlots">Plots</label>
//                                             </td>

//                                             {/* Apartments/Flats */}
//                                             <td>
//                                                 <input
//                                                     id="chkApartments"
//                                                     type="checkbox"
//                                                     checked={buildingTypes.apartmentsFlats}
//                                                     onChange={() => handleBuildingTypeChange("apartmentsFlats")}
//                                                 />
//                                                 <label htmlFor="chkApartments">Apartments/Flats</label>
//                                             </td>

//                                             {/* Villas */}
//                                             <td>
//                                                 <input
//                                                     id="chkVillas"
//                                                     type="checkbox"
//                                                     checked={buildingTypes.villas}
//                                                     onChange={() => handleBuildingTypeChange("villas")}
//                                                 />
//                                                 <label htmlFor="chkVillas">Villas</label>
//                                             </td>

//                                             {/* Commercial */}
//                                             <td>
//                                                 <input
//                                                     id="chkCommercial"
//                                                     type="checkbox"
//                                                     checked={buildingTypes.commercial}
//                                                     onChange={() => handleBuildingTypeChange("commercial")}
//                                                 />
//                                                 <label htmlFor="chkCommercial">Commercial</label>
//                                             </td>

//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>

//                             <div className="development-details-note-section-of-developmentdetails">
//                                 <label className="development-details-label-note-developmentdetails">
//                                     <strong>Note:</strong><br />
//                                     1. Do not tamper the given excel templates<br />
//                                     2. Do not merge any rows/columns/cells in excel sheets<br />
//                                     3. Total No. of Blocks/Plots entered in text box should be equal to the total number of blocks/Plots in excel sheet.<br />
//                                     4. Built-up area(including stilt area) should be same for all the floors in a block.<br />
//                                     5. Flat/Unit numbers should be unique with in a block.
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="development-details-accordion-wrapper">
//                         {/* Plot Details Section */}
//                         {buildingTypes.plots && (
//                             <div className="development-details-accordion-section">
//                                 <div
//                                     className={`development-details-accordion-header ${expandedSections.plots ? "development-details-active" : ""
//                                         }`}
//                                     onClick={() => toggleSection("plots")}
//                                 >


//                                     <span className="development-details-accordion-icon">{expandedSections.plots ? '−' : '+'}</span>
//                                     Plot Details
//                                 </div>
//                                 {expandedSections.plots && (
//                                     <div className="development-details-accordion-content_pd">
//                                         <div className="development-details-row development-details-innerdivrow_pd">
//                                             <div className="development-details-col-xs-12 development-details-dvborder">
//                                                 <div className="development-details-form-group">
//                                                     <a
//                                                         href="#"
//                                                         className="development-details-lnk-link"
//                                                         onClick={(e) => handleTemplateDownload(e, 'plot')}
//                                                         style={{ fontSize: '16px' }}
//                                                     >
//                                                         Click here to download Plot Details Excel Template
//                                                     </a>
//                                                 </div>
//                                                 <div className="development-details-col-sm-3">
//                                                     <div className="development-details-form-group">
//                                                         <label className="development-details-label">
//                                                             Total No of Plots<font color="red">*</font>
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             maxLength="6"
//                                                             className="development-details-form-control development-details-inputbox development-details-allownumeric"
//                                                             placeholder="Total No of Plots"
//                                                             value={plotDetails.totalPlots}
//                                                             onChange={(e) => handleInputChange('plots', 'totalPlots', e.target.value)}
//                                                             required={buildingTypes.plots}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="development-details-col-xs-4">
//                                                     <div className="development-details-form-group">
//                                                         <label className="development-details-label">
//                                                             Upload Plot Details{!plotDetails.file_path && <font color="red">*</font>}
//                                                         </label>
//                                                         <input
//                                                             type="file"
//                                                             className="development-details-form-control development-details-inputbox"
//                                                             accept=".xlsx,.xls"
//                                                             onChange={(e) => handleFileChange('plots', e.target.files[0])}
//                                                             required={buildingTypes.plots && !plotDetails.file_path}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="development-details-col-xs-3">
//                                                     <div className="development-details-form-group">
//                                                         <button
//                                                             type="button"
//                                                             className="development-details-btn development-details-btn-primary development-details-btnmargintop"
//                                                         >
//                                                             Upload Excel
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 {plotDetails.file_path && (
//                                                     <div className="development-details-col-xs-12">
//                                                         <p className="development-details-file-info" style={{ color: '#28a745', fontWeight: 'bold', background: '#d4edda', padding: '10px', borderRadius: '5px' }}>
//                                                             ✓ Previously uploaded: <strong>{plotDetails.file_path.split('\\').pop().split('/').pop()}</strong>
//                                                         </p>
//                                                     </div>
//                                                 )}
//                                                 {plotDetails.plotFile && (
//                                                     <div className="development-details-col-xs-12">
//                                                         <p className="development-details-file-info" style={{ background: '#e7f3ff', padding: '10px', borderRadius: '5px' }}>
//                                                             📎 New file selected: <strong>{plotDetails.plotFile.name}</strong>
//                                                             ({Math.round(plotDetails.plotFile.size / 1024)} KB)
//                                                         </p>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {/* Apartment/Flat Details Section */}
//                         {buildingTypes.apartmentsFlats && (
//                             <div className="development-details-accordion-section">
//                                 <div
//                                     className={`development-details-accordion-header ${expandedSections.apartmentsFlats ? "development-details-active" : ""
//                                         }`}
//                                     onClick={() => toggleSection("apartmentsFlats")}
//                                 >
//                                     <span className="development-details-accordion-icon">
//                                         {expandedSections.apartmentsFlats ? "−" : "+"}
//                                     </span>
//                                     Apartment/Flat Details
//                                 </div>

//                                 {expandedSections.apartmentsFlats && (
//                                     <div className="development-details-accordion-content">
//                                         <div className="development-details-row development-details-innerdivrow">
//                                             <div className="development-details-col-xs-12 development-details-dvborder">

//                                                 <div className="development-details-form-group">
//                                                     <a
//                                                         href="#"
//                                                         className="development-details-lnk-link"
//                                                         onClick={(e) => handleTemplateDownload(e, "flat")}
//                                                         style={{ fontSize: "16px" }}
//                                                     >
//                                                         Click here to download Flat Details Excel Template
//                                                     </a>
//                                                 </div>

//                                                 <div className="development-details-col-sm-3">
//                                                     <div className="development-details-form-group">
//                                                         <label className="development-details-label">
//                                                             Total No of Blocks<font color="red">*</font>
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             maxLength="6"
//                                                             className="development-details-form-control development-details-inputbox development-details-allownumeric"
//                                                             placeholder="Total No of Blocks"
//                                                             value={apartmentDetails.totalBlocks}
//                                                             onChange={(e) =>
//                                                                 handleInputChange("apartments", "totalBlocks", e.target.value)
//                                                             }
//                                                             required={buildingTypes.apartmentsFlats}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="development-details-col-xs-4">
//                                                     <div className="development-details-form-group">
//                                                         <label className="development-details-label">
//                                                             Upload Flat Details{!apartmentDetails.file_path && <font color="red">*</font>}
//                                                         </label>
//                                                         <input
//                                                             type="file"
//                                                             className="development-details-form-control development-details-inputbox"
//                                                             accept=".xlsx,.xls"
//                                                             onChange={(e) => handleFileChange("apartments", e.target.files[0])}
//                                                             required={buildingTypes.apartmentsFlats && !apartmentDetails.file_path}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="development-details-col-xs-3">
//                                                     <div className="development-details-form-group">
//                                                         <button
//                                                             type="button"
//                                                             className="development-details-btn development-details-btn-primary development-details-btnmargintop"
//                                                         >
//                                                             Upload Excel
//                                                         </button>
//                                                     </div>
//                                                 </div>

//                                                 {apartmentDetails.file_path && (
//                                                     <div className="development-details-col-xs-12">
//                                                         <p className="development-details-file-info" style={{ color: '#28a745', fontWeight: 'bold', background: '#d4edda', padding: '10px', borderRadius: '5px' }}>
//                                                             ✓ Previously uploaded: <strong>{apartmentDetails.file_path.split('\\').pop().split('/').pop()}</strong>
//                                                         </p>
//                                                     </div>
//                                                 )}

//                                                 {/* ✅ TABLE STARTS HERE */}
//                                                 {apartmentDetails.rows.length > 0 && (
//                                                     <div style={{ marginTop: 20, width: "100%", overflowX: "auto" }}>
//                                                         <table
//                                                             className="development-details-development-table"
//                                                             style={{ width: "100%" }}
//                                                         >
//                                                             <thead>
//                                                                 <tr>
//                                                                     {Object.keys(apartmentDetails.rows[0]).map((key) => (
//                                                                         <th key={key}>{key}</th>
//                                                                     ))}
//                                                                 </tr>
//                                                             </thead>
//                                                             <tbody>
//                                                                 {apartmentDetails.rows.map((row, i) => (
//                                                                     <tr key={i}>
//                                                                         {Object.values(row).map((val, j) => (
//                                                                             <td key={j}>{val}</td>
//                                                                         ))}
//                                                                     </tr>
//                                                                 ))}
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                 )}
//                                                 {/* ✅ TABLE ENDS HERE */}



//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {/* Villa Details Section */}
//                         {buildingTypes.villas && (
//                             <div className="development-details-accordion-section">
//                                 <div
//                                     className={`development-details-accordion-header ${expandedSections.villas ? "development-details-active" : ""
//                                         }`}
//                                     onClick={() => toggleSection("villas")}
//                                 >
//                                     <span className="development-details-accordion-icon">
//                                         {expandedSections.villas ? "−" : "+"}
//                                     </span>
//                                     Villa Details
//                                 </div>

//                                 {expandedSections.villas && (
//                                     <div className="development-details-accordion-content">
//                                         <div className="development-details-row development-details-innerdivrow">
//                                             <div className="development-details-col-xs-12 development-details-dvborder">

//                                                 <div className="development-details-form-group">
//                                                     <a
//                                                         href="#"
//                                                         className="development-details-lnk-link"
//                                                         onClick={(e) => handleTemplateDownload(e, "villa")}
//                                                         style={{ fontSize: "16px" }}
//                                                     >
//                                                         Click here to download Villa Details Excel Template
//                                                     </a>
//                                                 </div>

//                                                 <div className="development-details-col-sm-3">
//                                                     <div className="development-details-form-group">
//                                                         <label className="development-details-label">
//                                                             Total No of Villas<font color="red">*</font>
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             maxLength="6"
//                                                             className="development-details-form-control development-details-inputbox development-details-allownumeric"
//                                                             placeholder="Total No of Villas"
//                                                             value={villaDetails.totalBlocks}
//                                                             onChange={(e) =>
//                                                                 handleInputChange("villas", "totalBlocks", e.target.value)
//                                                             }
//                                                             required={buildingTypes.villas}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="development-details-col-xs-4">
//                                                     <div className="development-details-form-group">
//                                                         <label className="development-details-label">
//                                                             Upload Villa Details{!villaDetails.file_path && <font color="red">*</font>}
//                                                         </label>
//                                                         <input
//                                                             type="file"
//                                                             className="development-details-form-control development-details-inputbox"
//                                                             accept=".xlsx,.xls"
//                                                             onChange={(e) => handleFileChange("villas", e.target.files[0])}
//                                                             required={buildingTypes.villas && !villaDetails.file_path}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="development-details-col-xs-3">
//                                                     <div className="development-details-form-group">
//                                                         <button
//                                                             type="button"
//                                                             className="development-details-btn development-details-btn-primary development-details-btnmargintop"
//                                                         >
//                                                             Upload Excel
//                                                         </button>
//                                                     </div>
//                                                 </div>

//                                                 {villaDetails.file_path && (
//                                                     <div className="development-details-col-xs-12">
//                                                         <p className="development-details-file-info" style={{ color: '#28a745', fontWeight: 'bold', background: '#d4edda', padding: '10px', borderRadius: '5px' }}>
//                                                             ✓ Previously uploaded: <strong>{villaDetails.file_path.split('\\').pop().split('/').pop()}</strong>
//                                                         </p>
//                                                     </div>
//                                                 )}

//                                                 {villaDetails.villaFile && (
//                                                     <div className="development-details-col-xs-12">
//                                                         <p className="development-details-file-info" style={{ background: '#e7f3ff', padding: '10px', borderRadius: '5px' }}>
//                                                             📎 New file selected: <strong>{villaDetails.villaFile.name}</strong>{" "}
//                                                             ({Math.round(villaDetails.villaFile.size / 1024)} KB)
//                                                         </p>
//                                                     </div>
//                                                 )}

//                                             </div>
//                                         </div>
//                                     </div>

//                                 )}
//                             </div>
//                         )}

//                         {/* Commercial Details Section */}
//                         {buildingTypes.commercial && (
//                             <div className="development-details-accordion-section">
//                                 <div
//                                     className={`development-details-accordion-header ${expandedSections.commercial ? 'development-details-active' : ''}`}
//                                     onClick={() => toggleSection('commercial')}
//                                 >
//                                     <span className="development-details-accordion-icon">{expandedSections.commercial ? '−' : '+'}</span>
//                                     Commercial Details
//                                 </div>
//                                 {expandedSections.commercial && (
//                                     <div className="development-details-accordion-content">
//                                         <div className="development-details-row development-details-innerdivrow">
//                                             <div className="development-details-col-xs-12 development-details-dvborder">
//                                                 <div className="development-details-form-group">
//                                                     <a
//                                                         href="#"
//                                                         className="development-details-lnk-link"
//                                                         onClick={(e) => handleTemplateDownload(e, 'commercial')}
//                                                         style={{ fontSize: '16px' }}
//                                                     >
//                                                         Click here to download Commercial Details Excel Template
//                                                     </a>
//                                                 </div>
//                                                 <div className="development-details-col-sm-3">
//                                                     <div className="development-details-form-group">
//                                                         <label className="development-details-label">
//                                                             Total No of Blocks<font color="red">*</font>
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             maxLength="6"
//                                                             className="development-details-form-control development-details-inputbox development-details-allownumeric"
//                                                             placeholder="Total No of Blocks"
//                                                             value={commercialDetails.totalBlocks}
//                                                             onChange={(e) => handleInputChange('commercial', 'totalBlocks', e.target.value)}
//                                                             required={buildingTypes.commercial}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="development-details-col-xs-4">
//                                                     <div className="development-details-form-group">
//                                                         <label className="development-details-label">
//                                                             Upload Commercial Details{!commercialDetails.file_path && <font color="red">*</font>}
//                                                         </label>
//                                                         <input
//                                                             type="file"
//                                                             className="development-details-form-control development-details-inputbox"
//                                                             accept=".xlsx,.xls"
//                                                             onChange={(e) => handleFileChange('commercial', e.target.files[0])}
//                                                             required={buildingTypes.commercial && !commercialDetails.file_path}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="development-details-col-xs-3">
//                                                     <div className="development-details-form-group">
//                                                         <button
//                                                             type="button"
//                                                             className="development-details-btn development-details-btn-primary development-details-btnmargintop"
//                                                         >
//                                                             Upload Excel
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 {commercialDetails.file_path && (
//                                                     <div className="development-details-col-xs-12">
//                                                         <p className="development-details-file-info" style={{ color: '#28a745', fontWeight: 'bold', background: '#d4edda', padding: '10px', borderRadius: '5px' }}>
//                                                             ✓ Previously uploaded: <strong>{commercialDetails.file_path.split('\\').pop().split('/').pop()}</strong>
//                                                         </p>
//                                                     </div>
//                                                 )}
//                                                 {commercialDetails.commercialFile && (
//                                                     <div className="development-details-col-xs-12">
//                                                         <p className="development-details-file-info" style={{ background: '#e7f3ff', padding: '10px', borderRadius: '5px' }}>
//                                                             📎 New file selected: <strong>{commercialDetails.commercialFile.name}</strong>
//                                                             ({Math.round(commercialDetails.commercialFile.size / 1024)} KB)
//                                                         </p>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     {/* External Development Work */}
//                     <div className="development-details-external-development-section">
//                         <h4 className="development-details-section-title">External Development Work</h4>

//                         <table className="development-details-development-table">
//                             <thead>
//                                 <tr>
//                                     <th>External Development Work Type</th>
//                                     <th>% of Work Completed</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {externalDevelopmentWorks.map((work, index) => (
//                                     <tr key={index}>
//                                         <td>{work.type}</td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 className="development-details-form-control development-details-percent-input"
//                                                 value={work.percentCompleted}
//                                                 placeholder="0–100"
//                                                 onChange={(e) => {
//                                                     const value = e.target.value;
//                                                     if (/^\d*$/.test(value)) {
//                                                         handleExternalWorkChange(index, value);
//                                                     }
//                                                 }}
//                                                 onBlur={() => {
//                                                     let val = parseInt(work.percentCompleted, 10);
//                                                     if (isNaN(val)) val = 0;
//                                                     if (val < 0) val = 0;
//                                                     if (val > 100) val = 100;
//                                                     handleExternalWorkChange(index, val);
//                                                 }}
//                                             />
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {/* Other External Development Works */}
//                         <div className="development-details-other-works-section">
//                             <h5 className="development-details-sub-section-title">Other External Development Works</h5>
//                             <div className="row development-details-innerdivrow">
//                                 <div className="development-details-col-sm-4">
//                                     <div className="development-details-form-group">
//                                         <label className="development-details-label">Work Description</label>
//                                         <input
//                                             type="text"
//                                             className="development-details-form-control development-details-inputbox"
//                                             placeholder="Work Description"
//                                             value={otherWork.description}
//                                             onChange={(e) => handleInputChange('otherWork', 'description', e.target.value)}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="development-details-col-sm-4">
//                                     <div className="development-details-form-group">
//                                         <label className="development-details-label">Work Type</label>
//                                         <select
//                                             className="development-details-form-control development-details-inputbox"
//                                             value={otherWork.type}
//                                             onChange={(e) => handleInputChange('otherWork', 'type', e.target.value)}
//                                         >
//                                             <option value="Select">Select</option>
//                                             <option value="Local Authority">Local Authority</option>
//                                             <option value="Self Development">Self Development</option>
//                                             <option value="Not Applicable">Not Applicable</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="development-details-col-sm-2">
//                                     <div className="development-details-form-group">
//                                         <button
//                                             type="button"
//                                             className="development-details-btn development-details-btn-default development-details-btn-add"
//                                             onClick={handleAddOtherWork}
//                                         >
//                                             Add
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {otherWorksList.length > 0 && (
//                             <div className="development-details-table-responsive development-details-mt-3">
//                                 <table className="development-details-table development-details-table-bordered">
//                                     <thead style={{ backgroundColor: '#3f5367', color: '#fff' }}>
//                                         <tr>
//                                             <th style={{ width: '10%' }}>S.No</th>
//                                             <th>Work Description</th>
//                                             <th>Work Type</th>
//                                             <th style={{ width: '15%' }}>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {otherWorksList.map((item, index) => (
//                                             <tr key={item.id}>
//                                                 <td>{index + 1}</td>
//                                                 <td>{item.description}</td>
//                                                 <td>{item.type}</td>
//                                                 <td>
//                                                     <button
//                                                         type="button"
//                                                         className="development-details-btn development-details-btn-primary development-details-btn-sm"
//                                                         onClick={() => handleDeleteOtherWork(item.id)}
//                                                     >
//                                                         Delete
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}

//                         <div className="development-details-form-actions">
//                             <button
//                                 type="submit"
//                                 className="development-details-btn development-details-btn-primary development-details-btn-save"
//                                 disabled={isSubmitting}
//                             >
//                                 {isSubmitting ? (hasExistingData ? 'Updating...' : 'Submitting...') : (hasExistingData ? 'Update and Continue' : 'Save and Continue')}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ExistingDevelopmentDetails;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost, apiGet } from "../api/api";
import '../styles/DevelopmentDetails.css';
import ReraLoader from "../components/ReraLoader";
import ExistingProjectWizard from '../components/ExistingProjectWizard';

const ExistingDevelopmentDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const promoterType =
    location.state?.promoterType ||sessionStorage.getItem("promoterType");

    const panNumber =
        location.state?.panNumber || sessionStorage.getItem("panNumber");

    const applicationNumber =
        location.state?.applicationNumber || sessionStorage.getItem("applicationNumber");

    console.log("🔍 PAN Number:", panNumber);
    console.log("🔍 Application Number:", applicationNumber);
    console.log("🔍 Promoter Type:", promoterType);
    useEffect(() => {
    if (location.state) {
        if (location.state.panNumber)
            sessionStorage.setItem("panNumber", location.state.panNumber);

        if (location.state.applicationNumber)
            sessionStorage.setItem("applicationNumber", location.state.applicationNumber);

        if (location.state.promoterType)
            sessionStorage.setItem("promoterType", location.state.promoterType);
    }
}, [location.state]);

    const [projectId, setProjectId] = useState('');
    const [projectType, setProjectType] = useState('residential');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasExistingData, setHasExistingData] = useState(false);

    const [buildingTypes, setBuildingTypes] = useState({
        plots: false,
        apartmentsFlats: false,
        villas: false,
        commercial: false
    });


    const [plotDetails, setPlotDetails] = useState({
        totalPlots: '',
        plotFile: null,
        no_blocks: '',
        file_path: ''
    });

    const [apartmentDetails, setApartmentDetails] = useState({
        totalBlocks: '',
        apartmentFile: null,
        no_blocks: '',
        file_path: '',
        rows: []
    });

    const [villaDetails, setVillaDetails] = useState({
        totalBlocks: '',
        villaFile: null,
        no_blocks: '',
        file_path: ''
    });

    const [commercialDetails, setCommercialDetails] = useState({
        totalBlocks: '',
        commercialFile: null,
        no_blocks: '',
        file_path: ''
    });

    const [externalDevelopmentWorks, setExternalDevelopmentWorks] = useState([
        { type: 'Roads', percentCompleted: 0 },
        { type: 'Water Supply', percentCompleted: 0 },
        { type: 'Sewage and Drainage System', percentCompleted: 0 },
        { type: 'Electricity Supply Transformation Station', percentCompleted: 0 },
        { type: 'Solid Waste Management And Disposal', percentCompleted: 0 },
        { type: 'Fire Fighting Facility', percentCompleted: 0 },
        { type: 'Drinking Water Facility', percentCompleted: 0 },
        { type: 'Emergency Evacuation Service', percentCompleted: 0 },
        { type: 'Use of Renewable Energy', percentCompleted: 0 }
    ]);

    const [otherWork, setOtherWork] = useState({
        description: '',
        type: 'Select'
    });
    const [otherWorksList, setOtherWorksList] = useState([]);

    const [expandedSections, setExpandedSections] = useState({
        plots: false,
        apartmentsFlats: false,
        villas: false,
        commercial: false
    });


    // Fetch existing data from API
    const fetchDevelopmentDetails = async () => {
        if (!panNumber || !applicationNumber) {
            console.log("❌ No PAN/Application number - showing empty form");
            generateProjectId();
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            console.log("📡 Fetching from API...");

            const response = await apiGet(
                `/api/development-details?application_number=${applicationNumber}&pan_number=${panNumber}`
            );

            console.log("📥 Full API Response:", response);

            // ✅ Handle response structure: response.data contains the actual data
            const apiData = response?.data?.data || response?.data;
            console.log("✅ FINAL apiData USED:", apiData);




            console.log("📦 Extracted API Data:", apiData);

            // Check if data exists (check for id in the data object)
            if (apiData && apiData.id) {
                setHasExistingData(true);
                console.log("✅ Data found - Pre-filling form");

                // Set project basics
                setProjectId(apiData.project_id || '');
                setProjectType(apiData.project_type || 'residential');

                const devDetails = apiData.development_details || {};
                console.log("FULL Apartments_Flats:", devDetails.Apartments_Flats);

                console.log("🏗️ Development Details:", devDetails);

                // Determine which building types are present
                const newBuildingTypes = {
                    plots: !!devDetails.Plots,
                    apartmentsFlats: !!devDetails.Apartments_Flats,
                    villas: !!devDetails.Villas,
                    commercial: !!devDetails.Commercial
                };

                console.log("🏘️ Building Types Found:", newBuildingTypes);
                setBuildingTypes(newBuildingTypes);

                // Auto-expand sections that have data
                setExpandedSections({
                    plots: newBuildingTypes.plots,
                    apartmentsFlats: newBuildingTypes.apartmentsFlats,
                    villas: newBuildingTypes.villas,
                    commercial: newBuildingTypes.commercial
                });


                // Pre-fill Plot Details
                if (devDetails.Plots) {
                    console.log("📍 Plots Data:", devDetails.Plots);
                    setPlotDetails({
                        totalPlots: devDetails.Plots.no_plots?.toString() || '',
                        no_blocks: devDetails.Plots.no_blocks?.toString() || '',
                        file_path: devDetails.Plots.file_path || '',
                        plotFile: null
                    });
                }

                // Pre-fill Apartment Details
                if (devDetails.Apartments_Flats) {
                    setApartmentDetails({
                        totalBlocks: devDetails.Apartments_Flats.no_blocks?.toString() || '',
                        no_blocks: devDetails.Apartments_Flats.no_blocks?.toString() || '',
                        file_path: devDetails.Apartments_Flats.file_path || '',
                        apartmentFile: null,
                        rows: devDetails.Apartments_Flats.rows || []   // ✅ THIS LINE
                    });
                }


                // Pre-fill Villa Details
                if (devDetails.Villas) {
                    console.log("🏡 Villas Data:", devDetails.Villas);
                    setVillaDetails({
                        totalBlocks: devDetails.Villas.no_blocks?.toString() || '',
                        no_blocks: devDetails.Villas.no_blocks?.toString() || '',
                        file_path: devDetails.Villas.file_path || '',
                        villaFile: null
                    });
                }

                // Pre-fill Commercial Details
                if (devDetails.Commercial) {
                    console.log("🏬 Commercial Data:", devDetails.Commercial);
                    setCommercialDetails({
                        totalBlocks: devDetails.Commercial.no_blocks?.toString() || '',
                        no_blocks: devDetails.Commercial.no_blocks?.toString() || '',
                        file_path: devDetails.Commercial.file_path || '',
                        commercialFile: null
                    });
                }

                // Pre-fill External Development Work percentages
                const extWork = apiData.external_development_work || {};
                console.log("🚧 External Work Data:", extWork);

                const updatedExt = externalDevelopmentWorks.map(work => {
                    const key = work.type
                        .replace(/[^a-zA-Z0-9]/g, '_')
                        .replace(/\s+/g, '_');
                    return {
                        ...work,
                        percentCompleted: extWork[key] ?? 0
                    };
                });
                setExternalDevelopmentWorks(updatedExt);

                // Pre-fill Other External Works
                if (apiData.other_external_works && Array.isArray(apiData.other_external_works)) {
                    console.log("📋 Other Works:", apiData.other_external_works);
                    setOtherWorksList(apiData.other_external_works);
                }

                console.log("✅ Form pre-filled successfully!");

            } else {
                // No data found - show empty form
                setHasExistingData(false);
                console.log("ℹ️ No existing data - Showing empty form");
                generateProjectId();
            }

        } catch (error) {
            setHasExistingData(false);
            console.error("❌ Error fetching development details:", error);
            console.log("⚠️ Showing empty form due to error");
            generateProjectId();
        } finally {
            setIsLoading(false);
        }
    };

    // Load data on mount
    useEffect(() => {
        if (panNumber && applicationNumber) {
            fetchDevelopmentDetails();
        }
    }, [panNumber, applicationNumber]);


    const generateProjectId = () => {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 10000);
        const newProjectId = `PROJ-${timestamp}-${randomNum}`;
        setProjectId(newProjectId);
        console.log("🆔 Generated Project ID:", newProjectId);
    };

    const handleTemplateDownload = (e, templateType) => {
        e.preventDefault();
        e.stopPropagation();

        let filePath = "";
        let fileName = "";

        switch (templateType) {
            case "plot":
                filePath = "/pdf/PlotDetailsTemplate.xlsx";
                fileName = "PlotDetailsTemplate.xlsx";
                break;
            case "flat":
                filePath = "/pdf/FlatDetailsTemplate (1).xlsx";
                fileName = "FlatDetailsTemplate.xlsx";
                break;
            case "villa":
                filePath = "/pdf/VillaDetailsTemplate.xlsx";
                fileName = "VillaDetailsTemplate.xlsx";
                break;
            case "commercial":
                filePath = "/pdf/CommercialDetailsTemplate.xlsx";
                fileName = "CommercialDetailsTemplate.xlsx";
                break;
            default:
                return;
        }

        const link = document.createElement("a");
        link.href = filePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const showReraLoaderAndRun = (action) => {
        setIsSubmitting(true);

        setTimeout(() => {
            action();
            setIsSubmitting(false);
        }, 800); // ⏱ feels like real AP-RERA site
    };


    const handleBuildingTypeChange = (type) => {
        showReraLoaderAndRun(() => {
            setBuildingTypes(prev => ({
                ...prev,
                [type]: !prev[type]
            }));

            setExpandedSections(prev => ({
                ...prev,
                [type]: !prev[type]
            }));
        });
    };

    const handleInputChange = (section, field, value) => {
        switch (section) {
            case 'plots':
                setPlotDetails(prev => ({ ...prev, [field]: value }));
                break;
            case 'apartments':
                setApartmentDetails(prev => ({ ...prev, [field]: value }));
                break;
            case 'villas':
                setVillaDetails(prev => ({ ...prev, [field]: value }));
                break;
            case 'commercial':
                setCommercialDetails(prev => ({ ...prev, [field]: value }));
                break;
            case 'otherWork':
                setOtherWork(prev => ({ ...prev, [field]: value }));
                break;
            default:
                break;
        }
    };

    const handleFileChange = (section, file) => {
        if (!file) return;

        console.log("📎 File selected for", section, ":", file.name);

        if (!file.name.match(/\.(xls|xlsx)$/i)) {
            alert("Only Excel files (.xls, .xlsx) are allowed");
            return;
        }

        switch (section) {
            case "apartments":
                setApartmentDetails(prev => ({ ...prev, apartmentFile: file }));
                break;
            case "plots":
                setPlotDetails(prev => ({ ...prev, plotFile: file }));
                break;
            case "villas":
                setVillaDetails(prev => ({ ...prev, villaFile: file }));
                break;
            case "commercial":
                setCommercialDetails(prev => ({ ...prev, commercialFile: file }));
                break;
        }
    };

    const handleExternalWorkChange = (index, value) => {
        const updatedWorks = [...externalDevelopmentWorks];
        updatedWorks[index].percentCompleted = value;
        setExternalDevelopmentWorks(updatedWorks);
    };

    const handleDeleteOtherWork = (id) => {
        setOtherWorksList(prev => prev.filter(item => item.id !== id));
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const completeStep = (stepNo) => {
        const completedSteps = JSON.parse(localStorage.getItem("completedSteps")) || [];
        if (!completedSteps.includes(stepNo)) {
            completedSteps.push(stepNo);
            localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
        }
    };

    const getBackendBuildingTypeKey = (type) => {
        const keyMap = {
            'Plots': 'Plots',
            'Apartments/Flats': 'Apartments_Flats',
            'Villas': 'Villas',
            'Commercial': 'Commercial'
        };
        return keyMap[type] || type.replace(/[^a-zA-Z0-9]/g, '_');
    };

    const handleAddOtherWork = () => {
        if (!otherWork.description.trim()) {
            alert("Please enter Work Description");
            return;
        }

        if (otherWork.type === "Select") {
            alert("Please select Work Type");
            return;
        }

        const newItem = {
            id: Date.now(),
            description: otherWork.description,
            type: otherWork.type
        }
        showReraLoaderAndRun(() => {
            const newItem = {
                id: Date.now(),
                description: otherWork.description,
                type: otherWork.type
            };



            setOtherWorksList(prev => [...prev, newItem]);

            // Reset inputs
            setOtherWork({
                description: '',
                type: 'Select'
            });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();

            formData.append('project_id', projectId);
            formData.append('project_type', projectType);
            formData.append('work_description', otherWork.description || '');
            formData.append('work_type', otherWork.type || 'Select');
            formData.append("pan_number", panNumber);
            formData.append("application_number", applicationNumber);

            const developmentDetails = {};

            if (buildingTypes.plots) {
                const key = getBackendBuildingTypeKey('Plots');
                developmentDetails[key] = {
                    no_plots: parseInt(plotDetails.totalPlots) || 0,
                    no_blocks: parseInt(plotDetails.no_blocks) || 0
                };

                if (plotDetails.plotFile) {
                    formData.append(`${key}_file`, plotDetails.plotFile);
                }
            }

            if (buildingTypes.apartmentsFlats) {
                const key = getBackendBuildingTypeKey('Apartments/Flats');
                developmentDetails[key] = {
                    no_plots: 0,
                    no_blocks: parseInt(apartmentDetails.totalBlocks) || 0
                };

                if (apartmentDetails.apartmentFile) {
                    formData.append(`${key}_file`, apartmentDetails.apartmentFile);
                } else if (!apartmentDetails.file_path) {
                    alert('Please upload Flat Details Excel file for Apartments/Flats');
                    setIsSubmitting(false);
                    return;
                }
            }

            if (buildingTypes.villas) {
                const key = getBackendBuildingTypeKey('Villas');
                developmentDetails[key] = {
                    no_plots: 0,
                    no_blocks: parseInt(villaDetails.totalBlocks) || 0
                };

                if (villaDetails.villaFile) {
                    formData.append(`${key}_file`, villaDetails.villaFile);
                } else if (!villaDetails.file_path) {
                    alert('Please upload Villa Details Excel file');
                    setIsSubmitting(false);
                    return;
                }
            }

            if (buildingTypes.commercial) {
                const key = getBackendBuildingTypeKey('Commercial');
                developmentDetails[key] = {
                    no_plots: 0,
                    no_blocks: parseInt(commercialDetails.totalBlocks) || 0
                };

                if (commercialDetails.commercialFile) {
                    formData.append(`${key}_file`, commercialDetails.commercialFile);
                } else if (!commercialDetails.file_path) {
                    alert('Please upload Commercial Details Excel file');
                    setIsSubmitting(false);
                    return;
                }
            }

            if (Object.keys(developmentDetails).length === 0) {
                alert('Please select at least one building type (Apartments/Flats, Plots, Villas, or Commercial)');
                setIsSubmitting(false);
                return;
            }

            formData.append('development_details', JSON.stringify(developmentDetails));

            const externalDevelopmentWork = {};
            externalDevelopmentWorks.forEach(work => {
                const key = work.type
                    .replace(/[^a-zA-Z0-9]/g, '_')
                    .replace(/\s+/g, '_');
                externalDevelopmentWork[key] = parseInt(work.percentCompleted) || 0;
            });

            formData.append('external_development_work', JSON.stringify(externalDevelopmentWork));
            formData.append('other_external_works', JSON.stringify(otherWorksList));

            console.log('📤 Submitting form to /api/development-details');

            const response = await apiPost("/api/development-details", formData);

            console.log("📥 Submit Response:", response);

            if (response && (response.id || response.data?.id)) {
                const submittedData = {
                    projectId,
                    projectType,
                    buildingTypes,
                    plotDetails,
                    apartmentDetails,
                    villaDetails,
                    commercialDetails,
                    externalDevelopmentWorks,
                    otherWorksList
                };

                localStorage.setItem("developmentDetailsSubmitted", JSON.stringify(submittedData));
                completeStep(3);

                alert("Details submitted successfully.");

                navigate('/existing-associate-details', {
                    state: {
                       panNumber,
                       applicationNumber,
                       promoterType,
                       developmentData: submittedData
                       }
                    });
            } else {
                alert('Unexpected response from server');
            }

        } catch (error) {
            console.error('❌ Error submitting form:', error);

            let errorMessage = 'Submission failed';
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                errorMessage += `: ${error.response.data.message || `Status ${error.response.status}`}`;
            } else if (error.request) {
                console.error('No response received');
                errorMessage += ': No response from server. Please check if backend is running.';
            } else {
                console.error('Request setup error:', error.message);
                errorMessage += `: ${error.message}`;
            }

            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="development-details-container_pd">
                <div className="development-details-breadcrumb1">
                    <span>You are here : </span>
                    <a href="/">Home</a>
                    <span> / </span>
                    <span>Registration / Project Registration</span>
                </div>
                <ExistingProjectWizard currentStep={3} />
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <div style={{ fontSize: '24px', marginBottom: '20px' }}>⏳</div>
                    <h3>Loading development details...</h3>
                    <p>Please wait while we fetch your data...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="development-details-container_pd">
            {(isLoading || isSubmitting) && <ReraLoader />}

            <div className="development-details-breadcrumb1">
                <span>You are here : </span>
                <a href="/">Home</a>
                <span> / </span>
                <span>Registration / Project Registration</span>
            </div>


            <ExistingProjectWizard currentStep={3} />

            {hasExistingData && (
                <div style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '15px',
                    marginBottom: '20px',
                    borderRadius: '5px',
                    border: '1px solid #c3e6cb'
                }}>
                    <strong>✓ Existing data loaded!</strong> You can update the information below and resubmit.
                </div>
            )}

            <form onSubmit={handleSubmit} className="development-details-form">
                <div className="development-detailsform-section">
                    <h3 className="development-details-subheading">
                        Existing Development Details {hasExistingData ? '(Edit Mode)' : ''}
                    </h3>

                    <div className="development-details-row development-details-innerdivrow">
                        <div className="development-details-col-sm-12">
                            <div className="development-details-form-group">
                                <label className="development-details-label">
                                    Project Consists of<font color="red">*</font>
                                </label>

                                <table className="development-details-custom_checkbox" style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>{/* Plots */}
                                            <td>
                                                <input
                                                    id="chkPlots"
                                                    type="checkbox"
                                                    checked={buildingTypes.plots}
                                                    onChange={() => handleBuildingTypeChange("plots")}
                                                />
                                                <label htmlFor="chkPlots">Plots</label>
                                            </td>

                                            {/* Apartments/Flats */}
                                            <td>
                                                <input
                                                    id="chkApartments"
                                                    type="checkbox"
                                                    checked={buildingTypes.apartmentsFlats}
                                                    onChange={() => handleBuildingTypeChange("apartmentsFlats")}
                                                />
                                                <label htmlFor="chkApartments">Apartments/Flats</label>
                                            </td>

                                            {/* Villas */}
                                            <td>
                                                <input
                                                    id="chkVillas"
                                                    type="checkbox"
                                                    checked={buildingTypes.villas}
                                                    onChange={() => handleBuildingTypeChange("villas")}
                                                />
                                                <label htmlFor="chkVillas">Villas</label>
                                            </td>

                                            {/* Commercial */}
                                            <td>
                                                <input
                                                    id="chkCommercial"
                                                    type="checkbox"
                                                    checked={buildingTypes.commercial}
                                                    onChange={() => handleBuildingTypeChange("commercial")}
                                                />
                                                <label htmlFor="chkCommercial">Commercial</label>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="development-details-note-section-of-developmentdetails">
                                <label className="development-details-label-note-developmentdetails">
                                    <strong>Note:</strong><br />
                                    1. Do not tamper the given excel templates<br />
                                    2. Do not merge any rows/columns/cells in excel sheets<br />
                                    3. Total No. of Blocks/Plots entered in text box should be equal to the total number of blocks/Plots in excel sheet.<br />
                                    4. Built-up area(including stilt area) should be same for all the floors in a block.<br />
                                    5. Flat/Unit numbers should be unique with in a block.
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="development-details-accordion-wrapper">
                        {/* Plot Details Section */}
                        {buildingTypes.plots && (
                            <div className="development-details-accordion-section">
                                <div
                                    className={`development-details-accordion-header ${expandedSections.plots ? "development-details-active" : ""
                                        }`}
                                    onClick={() => toggleSection("plots")}
                                >


                                    <span className="development-details-accordion-icon">{expandedSections.plots ? '−' : '+'}</span>
                                    Plot Details
                                </div>
                                {expandedSections.plots && (
                                    <div className="development-details-accordion-content_pd">
                                        <div className="development-details-row development-details-innerdivrow_pd">
                                            <div className="development-details-col-xs-12 development-details-dvborder">
                                                <div className="development-details-form-group">
                                                    <a
                                                        href="#"
                                                        className="development-details-lnk-link"
                                                        onClick={(e) => handleTemplateDownload(e, 'plot')}
                                                        style={{ fontSize: '16px' }}
                                                    >
                                                        Click here to download Plot Details Excel Template
                                                    </a>
                                                </div>
                                                <div className="development-details-col-sm-3">
                                                    <div className="development-details-form-group">
                                                        <label className="development-details-label">
                                                            Total No of Plots<font color="red">*</font>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength="6"
                                                            className="development-details-form-control development-details-inputbox development-details-allownumeric"
                                                            placeholder="Total No of Plots"
                                                            value={plotDetails.totalPlots}
                                                            onChange={(e) => handleInputChange('plots', 'totalPlots', e.target.value)}
                                                            required={buildingTypes.plots}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="development-details-col-xs-4">
                                                    <div className="development-details-form-group">
                                                        <label className="development-details-label">
                                                            Upload Plot Details{!plotDetails.file_path && <font color="red">*</font>}
                                                        </label>
                                                        <input
                                                            type="file"
                                                            className="development-details-form-control development-details-inputbox"
                                                            accept=".xlsx,.xls"
                                                            onChange={(e) => handleFileChange('plots', e.target.files[0])}
                                                            required={buildingTypes.plots && !plotDetails.file_path}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="development-details-col-xs-3">
                                                    <div className="development-details-form-group">
                                                        <button
                                                            type="button"
                                                            className="development-details-btn development-details-btn-primary development-details-btnmargintop"
                                                        >
                                                            Upload Excel
                                                        </button>
                                                    </div>
                                                </div>
                                                {plotDetails.file_path && (
                                                    <div className="development-details-col-xs-12">
                                                        <p className="development-details-file-info" style={{ color: '#28a745', fontWeight: 'bold', background: '#d4edda', padding: '10px', borderRadius: '5px' }}>
                                                            ✓ Previously uploaded: <strong>{plotDetails.file_path.split('\\').pop().split('/').pop()}</strong>
                                                        </p>
                                                    </div>
                                                )}
                                                {plotDetails.plotFile && (
                                                    <div className="development-details-col-xs-12">
                                                        <p className="development-details-file-info" style={{ background: '#e7f3ff', padding: '10px', borderRadius: '5px' }}>
                                                            📎 New file selected: <strong>{plotDetails.plotFile.name}</strong>
                                                            ({Math.round(plotDetails.plotFile.size / 1024)} KB)
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Apartment/Flat Details Section */}
                        {buildingTypes.apartmentsFlats && (
                            <div className="development-details-accordion-section">
                                <div
                                    className={`development-details-accordion-header ${expandedSections.apartmentsFlats ? "development-details-active" : ""
                                        }`}
                                    onClick={() => toggleSection("apartmentsFlats")}
                                >
                                    <span className="development-details-accordion-icon">
                                        {expandedSections.apartmentsFlats ? "−" : "+"}
                                    </span>
                                    Apartment/Flat Details
                                </div>

                                {expandedSections.apartmentsFlats && (
                                    <div className="development-details-accordion-content">
                                        <div className="development-details-row development-details-innerdivrow">
                                            <div className="development-details-col-xs-12 development-details-dvborder">

                                                <div className="development-details-form-group">
                                                    <a
                                                        href="#"
                                                        className="development-details-lnk-link"
                                                        onClick={(e) => handleTemplateDownload(e, "flat")}
                                                        style={{ fontSize: "16px" }}
                                                    >
                                                        Click here to download Flat Details Excel Template
                                                    </a>
                                                </div>

                                                <div className="development-details-col-sm-3">
                                                    <div className="development-details-form-group">
                                                        <label className="development-details-label">
                                                            Total No of Blocks<font color="red">*</font>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength="6"
                                                            className="development-details-form-control development-details-inputbox development-details-allownumeric"
                                                            placeholder="Total No of Blocks"
                                                            value={apartmentDetails.totalBlocks}
                                                            onChange={(e) =>
                                                                handleInputChange("apartments", "totalBlocks", e.target.value)
                                                            }
                                                            required={buildingTypes.apartmentsFlats}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="development-details-col-xs-4">
                                                    <div className="development-details-form-group">
                                                        <label className="development-details-label">
                                                            Upload Flat Details{!apartmentDetails.file_path && <font color="red">*</font>}
                                                        </label>
                                                        <input
                                                            type="file"
                                                            className="development-details-form-control development-details-inputbox"
                                                            accept=".xlsx,.xls"
                                                            onChange={(e) => handleFileChange("apartments", e.target.files[0])}
                                                            required={buildingTypes.apartmentsFlats && !apartmentDetails.file_path}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="development-details-col-xs-3">
                                                    <div className="development-details-form-group">
                                                        <button
                                                            type="button"
                                                            className="development-details-btn development-details-btn-primary development-details-btnmargintop"
                                                        >
                                                            Upload Excel
                                                        </button>
                                                    </div>
                                                </div>

                                                {apartmentDetails.file_path && (
                                                    <div className="development-details-col-xs-12">
                                                        <p className="development-details-file-info" style={{ color: '#28a745', fontWeight: 'bold', background: '#d4edda', padding: '10px', borderRadius: '5px' }}>
                                                            ✓ Previously uploaded: <strong>{apartmentDetails.file_path.split('\\').pop().split('/').pop()}</strong>
                                                        </p>
                                                    </div>
                                                )}

                                                {/* ✅ TABLE STARTS HERE */}
                                                {apartmentDetails.rows.length > 0 && (
                                                    <div style={{ marginTop: 20, width: "100%", overflowX: "auto" }}>
                                                        <table
                                                            className="development-details-development-table"
                                                            style={{ width: "100%" }}
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    {Object.keys(apartmentDetails.rows[0]).map((key) => (
                                                                        <th key={key}>{key}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {apartmentDetails.rows.map((row, i) => (
                                                                    <tr key={i}>
                                                                        {Object.values(row).map((val, j) => (
                                                                            <td key={j}>{val}</td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                                {/* ✅ TABLE ENDS HERE */}



                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Villa Details Section */}
                        {buildingTypes.villas && (
                            <div className="development-details-accordion-section">
                                <div
                                    className={`development-details-accordion-header ${expandedSections.villas ? "development-details-active" : ""
                                        }`}
                                    onClick={() => toggleSection("villas")}
                                >
                                    <span className="development-details-accordion-icon">
                                        {expandedSections.villas ? "−" : "+"}
                                    </span>
                                    Villa Details
                                </div>

                                {expandedSections.villas && (
                                    <div className="development-details-accordion-content">
                                        <div className="development-details-row development-details-innerdivrow">
                                            <div className="development-details-col-xs-12 development-details-dvborder">

                                                <div className="development-details-form-group">
                                                    <a
                                                        href="#"
                                                        className="development-details-lnk-link"
                                                        onClick={(e) => handleTemplateDownload(e, "villa")}
                                                        style={{ fontSize: "16px" }}
                                                    >
                                                        Click here to download Villa Details Excel Template
                                                    </a>
                                                </div>

                                                <div className="development-details-col-sm-3">
                                                    <div className="development-details-form-group">
                                                        <label className="development-details-label">
                                                            Total No of Villas<font color="red">*</font>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength="6"
                                                            className="development-details-form-control development-details-inputbox development-details-allownumeric"
                                                            placeholder="Total No of Villas"
                                                            value={villaDetails.totalBlocks}
                                                            onChange={(e) =>
                                                                handleInputChange("villas", "totalBlocks", e.target.value)
                                                            }
                                                            required={buildingTypes.villas}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="development-details-col-xs-4">
                                                    <div className="development-details-form-group">
                                                        <label className="development-details-label">
                                                            Upload Villa Details{!villaDetails.file_path && <font color="red">*</font>}
                                                        </label>
                                                        <input
                                                            type="file"
                                                            className="development-details-form-control development-details-inputbox"
                                                            accept=".xlsx,.xls"
                                                            onChange={(e) => handleFileChange("villas", e.target.files[0])}
                                                            required={buildingTypes.villas && !villaDetails.file_path}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="development-details-col-xs-3">
                                                    <div className="development-details-form-group">
                                                        <button
                                                            type="button"
                                                            className="development-details-btn development-details-btn-primary development-details-btnmargintop"
                                                        >
                                                            Upload Excel
                                                        </button>
                                                    </div>
                                                </div>

                                                {villaDetails.file_path && (
                                                    <div className="development-details-col-xs-12">
                                                        <p className="development-details-file-info" style={{ color: '#28a745', fontWeight: 'bold', background: '#d4edda', padding: '10px', borderRadius: '5px' }}>
                                                            ✓ Previously uploaded: <strong>{villaDetails.file_path.split('\\').pop().split('/').pop()}</strong>
                                                        </p>
                                                    </div>
                                                )}

                                                {villaDetails.villaFile && (
                                                    <div className="development-details-col-xs-12">
                                                        <p className="development-details-file-info" style={{ background: '#e7f3ff', padding: '10px', borderRadius: '5px' }}>
                                                            📎 New file selected: <strong>{villaDetails.villaFile.name}</strong>{" "}
                                                            ({Math.round(villaDetails.villaFile.size / 1024)} KB)
                                                        </p>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>

                                )}
                            </div>
                        )}

                        {/* Commercial Details Section */}
                        {buildingTypes.commercial && (
                            <div className="development-details-accordion-section">
                                <div
                                    className={`development-details-accordion-header ${expandedSections.commercial ? 'development-details-active' : ''}`}
                                    onClick={() => toggleSection('commercial')}
                                >
                                    <span className="development-details-accordion-icon">{expandedSections.commercial ? '−' : '+'}</span>
                                    Commercial Details
                                </div>
                                {expandedSections.commercial && (
                                    <div className="development-details-accordion-content">
                                        <div className="development-details-row development-details-innerdivrow">
                                            <div className="development-details-col-xs-12 development-details-dvborder">
                                                <div className="development-details-form-group">
                                                    <a
                                                        href="#"
                                                        className="development-details-lnk-link"
                                                        onClick={(e) => handleTemplateDownload(e, 'commercial')}
                                                        style={{ fontSize: '16px' }}
                                                    >
                                                        Click here to download Commercial Details Excel Template
                                                    </a>
                                                </div>
                                                <div className="development-details-col-sm-3">
                                                    <div className="development-details-form-group">
                                                        <label className="development-details-label">
                                                            Total No of Blocks<font color="red">*</font>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength="6"
                                                            className="development-details-form-control development-details-inputbox development-details-allownumeric"
                                                            placeholder="Total No of Blocks"
                                                            value={commercialDetails.totalBlocks}
                                                            onChange={(e) => handleInputChange('commercial', 'totalBlocks', e.target.value)}
                                                            required={buildingTypes.commercial}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="development-details-col-xs-4">
                                                    <div className="development-details-form-group">
                                                        <label className="development-details-label">
                                                            Upload Commercial Details{!commercialDetails.file_path && <font color="red">*</font>}
                                                        </label>
                                                        <input
                                                            type="file"
                                                            className="development-details-form-control development-details-inputbox"
                                                            accept=".xlsx,.xls"
                                                            onChange={(e) => handleFileChange('commercial', e.target.files[0])}
                                                            required={buildingTypes.commercial && !commercialDetails.file_path}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="development-details-col-xs-3">
                                                    <div className="development-details-form-group">
                                                        <button
                                                            type="button"
                                                            className="development-details-btn development-details-btn-primary development-details-btnmargintop"
                                                        >
                                                            Upload Excel
                                                        </button>
                                                    </div>
                                                </div>
                                                {commercialDetails.file_path && (
                                                    <div className="development-details-col-xs-12">
                                                        <p className="development-details-file-info" style={{ color: '#28a745', fontWeight: 'bold', background: '#d4edda', padding: '10px', borderRadius: '5px' }}>
                                                            ✓ Previously uploaded: <strong>{commercialDetails.file_path.split('\\').pop().split('/').pop()}</strong>
                                                        </p>
                                                    </div>
                                                )}
                                                {commercialDetails.commercialFile && (
                                                    <div className="development-details-col-xs-12">
                                                        <p className="development-details-file-info" style={{ background: '#e7f3ff', padding: '10px', borderRadius: '5px' }}>
                                                            📎 New file selected: <strong>{commercialDetails.commercialFile.name}</strong>
                                                            ({Math.round(commercialDetails.commercialFile.size / 1024)} KB)
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* External Development Work */}
                    <div className="development-details-external-development-section">
                        <h4 className="development-details-section-title">External Development Work</h4>

                        <table className="development-details-development-table">
                            <thead>
                                <tr>
                                    <th>External Development Work Type</th>
                                    <th>% of Work Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {externalDevelopmentWorks.map((work, index) => (
                                    <tr key={index}>
                                        <td>{work.type}</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="development-details-form-control development-details-percent-input"
                                                value={work.percentCompleted}
                                                placeholder="0–100"
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (/^\d*$/.test(value)) {
                                                        handleExternalWorkChange(index, value);
                                                    }
                                                }}
                                                onBlur={() => {
                                                    let val = parseInt(work.percentCompleted, 10);
                                                    if (isNaN(val)) val = 0;
                                                    if (val < 0) val = 0;
                                                    if (val > 100) val = 100;
                                                    handleExternalWorkChange(index, val);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Other External Development Works */}
                        <div className="development-details-other-works-section">
                            <h5 className="development-details-sub-section-title">Other External Development Works</h5>
                            <div className="row development-details-innerdivrow">
                                <div className="development-details-col-sm-4">
                                    <div className="development-details-form-group">
                                        <label className="development-details-label">Work Description</label>
                                        <input
                                            type="text"
                                            className="development-details-form-control development-details-inputbox"
                                            placeholder="Work Description"
                                            value={otherWork.description}
                                            onChange={(e) => handleInputChange('otherWork', 'description', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="development-details-col-sm-4">
                                    <div className="development-details-form-group">
                                        <label className="development-details-label">Work Type</label>
                                        <select
                                            className="development-details-form-control development-details-inputbox"
                                            value={otherWork.type}
                                            onChange={(e) => handleInputChange('otherWork', 'type', e.target.value)}
                                        >
                                            <option value="Select">Select</option>
                                            <option value="Local Authority">Local Authority</option>
                                            <option value="Self Development">Self Development</option>
                                            <option value="Not Applicable">Not Applicable</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="development-details-col-sm-2">
                                    <div className="development-details-form-group">
                                        <button
                                            type="button"
                                            className="development-details-btn development-details-btn-default development-details-btn-add"
                                            onClick={handleAddOtherWork}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {otherWorksList.length > 0 && (
                            <div className="development-details-table-responsive development-details-mt-3">
                                <table className="development-details-table development-details-table-bordered">
                                    <thead style={{ backgroundColor: '#3f5367', color: '#fff' }}>
                                        <tr>
                                            <th style={{ width: '10%' }}>S.No</th>
                                            <th>Work Description</th>
                                            <th>Work Type</th>
                                            <th style={{ width: '15%' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {otherWorksList.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.description}</td>
                                                <td>{item.type}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="development-details-btn development-details-btn-primary development-details-btn-sm"
                                                        onClick={() => handleDeleteOtherWork(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="development-details-form-actions">
                            <button
                                type="submit"
                                className="development-details-btn development-details-btn-primary development-details-btn-save"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (hasExistingData ? 'Updating...' : 'Submitting...') : (hasExistingData ? 'Update and Continue' : 'Save and Continue')}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ExistingDevelopmentDetails;