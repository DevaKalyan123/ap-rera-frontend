import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation  } from "react-router-dom";
import { apiPost } from "../api/api";
import '../styles/DevelopmentDetails.css';
import ProjectWizard from "../components/ProjectWizard";

const OtherThanIndividualDevelopmentDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();

const panNumber =
  location.state?.panNumber || sessionStorage.getItem("panNumber");

const applicationNumber =
  location.state?.applicationNumber ||
  sessionStorage.getItem("applicationNumber");

  console.log("PAN Number:", panNumber);
console.log("Application Number:", applicationNumber);

  useEffect(() => {
  if (location.state?.panNumber && location.state?.applicationNumber) {
    sessionStorage.setItem("panNumber", location.state.panNumber);
    sessionStorage.setItem(
      "applicationNumber",
      location.state.applicationNumber
    );
  }
}, [location.state]);

    const [projectId, setProjectId] = useState('');
    const [projectType, setProjectType] = useState('residential');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [buildingTypes, setBuildingTypes] = useState({
        plots: false,
        apartmentsFlats: true,
        villas: false,
        commercial: false
    });

    // Plot Details - No blocks field
    const [plotDetails, setPlotDetails] = useState({
        totalPlots: '',
        plotFile: null
    });

    const [apartmentDetails, setApartmentDetails] = useState({
        totalBlocks: '',
        apartmentFile: null
    });

    const [villaDetails, setVillaDetails] = useState({
        totalBlocks: '',
        villaFile: null
    });

    const [commercialDetails, setCommercialDetails] = useState({
        totalBlocks: '',
        commercialFile: null
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
        apartments: false,
        villas: false,
        commercial: false
    });
    
    // Uploaded Excel Rows Table
    const [uploadedExcelRows, setUploadedExcelRows] = useState([]);

    useEffect(() => {
        if (!panNumber || !applicationNumber) {
            alert("Session expired. Please start from Project Details.");
            navigate("/project-details");
        }
    }, [panNumber, applicationNumber, navigate]);

    // Generate project ID on component mount
    useEffect(() => {
        const savedData = localStorage.getItem("developmentDetailsForm");

        if (savedData) {
            const data = JSON.parse(savedData);
            setProjectId(data.projectId || '');
            setProjectType(data.projectType || 'residential');
            setBuildingTypes(data.buildingTypes || {});
            setPlotDetails(data.plotDetails || { totalPlots: '', plotFile: null });
            setApartmentDetails(data.apartmentDetails || { totalBlocks: '', apartmentFile: null });
            setVillaDetails(data.villaDetails || { totalBlocks: '', villaFile: null });
            setCommercialDetails(data.commercialDetails || { totalBlocks: '', commercialFile: null });
            setExternalDevelopmentWorks(data.externalDevelopmentWorks || []);
            setOtherWorksList(data.otherWorksList || []);
        } else {
            generateProjectId();
        }
    }, []);

    const generateProjectId = () => {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 10000);
        const newProjectId = `PROJ-${timestamp}-${randomNum}`;
        setProjectId(newProjectId);
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

    // All checkboxes clickable
    const handleBuildingTypeChange = (type) => {
        setBuildingTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));

        // Toggle expanded section when checkbox is clicked
        setExpandedSections(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
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

    // Toggle section with plus/minus behavior
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
        };

        setOtherWorksList(prev => [...prev, newItem]);
        setOtherWork({ description: '', type: 'Select' });
    };
    
    // Handle Upload Excel for all building types
    const handleUploadExcel = (section) => {
        let file = null;
        let label = "";

        switch (section) {
            case "apartments":
                file = apartmentDetails.apartmentFile;
                label = "Apartments/Flats";
                break;
            case "plots":
                file = plotDetails.plotFile;
                label = "Plots";
                break;
            case "villas":
                file = villaDetails.villaFile;
                label = "Villas";
                break;
            case "commercial":
                file = commercialDetails.commercialFile;
                label = "Commercial";
                break;
            default:
                return;
        }

        if (!file) {
            alert("Please select Excel file first");
            return;
        }

        setUploadedExcelRows(prev => [
            ...prev.filter(r => r.type !== label),
            {
                id: Date.now(),
                type: label,
                fileName: file.name,
                size: Math.round(file.size / 1024)
            }
        ]);
        
        alert(`${label} Excel file ready for upload!`);
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

            // Process Plots - removed no_blocks
            if (buildingTypes.plots) {
                const key = getBackendBuildingTypeKey('Plots');
                developmentDetails[key] = {
                    no_plots: parseInt(plotDetails.totalPlots) || 0
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
                } else {
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
                } else {
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
                } else {
                    alert('Please upload Commercial Details Excel file');
                    setIsSubmitting(false);
                    return;
                }
            }

            if (Object.keys(developmentDetails).length === 0) {
                alert('Please select at least one building type');
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
            
            const response = await apiPost("/api/development-details", formData);

            if (response && response.id) {
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
                
                navigate("/other-than-individual-associate-details", {
                    state: {
                        panNumber,
                        applicationNumber,
                        developmentData: submittedData
                    }
                });
            } else {
                alert('Unexpected response from server');
            }
            
        } catch (error) {
            console.error('Error submitting form:', error);
            let errorMessage = 'Submission failed';
            if (error.response) {
                errorMessage += `: ${error.response.data.message || `Status ${error.response.status}`}`;
            } else if (error.request) {
                errorMessage += ': No response from server. Please check if backend is running.';
            } else {
                errorMessage += `: ${error.message}`;
            }
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="development-details-container_pd">
            <div className="development-details-breadcrumb1">
                <span>You are here : </span>
                <a href="/">Home</a>
                <span> / </span>
                <span>Registration / Project Registration</span>
            </div>
           
            <ProjectWizard currentStep={3} type="other" />

            <form onSubmit={handleSubmit} className="development-details-form">
                <div className="development-detailsform-section">
                    <h3 className="development-details-subheading">Development Details</h3>
                    
                    {/* Project Consists of Checkboxes */}
                    <div className="development-details-custom_checkbox" style={{ width: '100%' }}>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            id="chkPlots"
                                            type="checkbox"
                                            checked={buildingTypes.plots}
                                            onChange={() => handleBuildingTypeChange('plots')}
                                        />
                                        <label htmlFor="chkPlots">Plots</label>
                                    </td>
                                    <td>
                                        <input
                                            id="chkApartments"
                                            type="checkbox"
                                            checked={buildingTypes.apartmentsFlats}
                                            onChange={() => handleBuildingTypeChange('apartmentsFlats')}
                                        />
                                        <label htmlFor="chkApartments">Apartments/Flats</label>
                                    </td>
                                    <td>
                                        <input
                                            id="chkVillas"
                                            type="checkbox"
                                            checked={buildingTypes.villas}
                                            onChange={() => handleBuildingTypeChange('villas')}
                                        />
                                        <label htmlFor="chkVillas">Villas</label>
                                    </td>
                                    <td>
                                        <input
                                            id="chkCommercial"
                                            type="checkbox"
                                            checked={buildingTypes.commercial}
                                            onChange={() => handleBuildingTypeChange('commercial')}
                                        />
                                        <label htmlFor="chkCommercial">Commercial</label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Note Section */}
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

                    {/* Accordion Wrapper */}
                    <div className="development-details-accordion-wrapper">
                        
                        {/* ======================================== */}
                        {/* PLOT DETAILS SECTION - ALL IN ONE LINE */}
                        {/* ======================================== */}
                        {buildingTypes.plots && (
                            <div className="development-details-accordion-section">
                                <div 
                                    className={`development-details-accordion-header ${expandedSections.plots ? 'development-details-active' : ''}`}
                                    onClick={() => toggleSection('plots')}
                                >
                                    <span className="development-details-accordion-icon">
                                        {expandedSections.plots ? "−" : "+"}
                                    </span>
                                    Plot Details
                                </div>
                                {expandedSections.plots && (
                                    <div className="development-details-accordion-content">
                                        <div className="development-details-dvborder">
                                            
                                            {/* Download Link */}
                                            <a 
                                                href="#" 
                                                className="development-details-lnk-link" 
                                                onClick={(e) => handleTemplateDownload(e, 'plot')}
                                            >
                                                Click here to download Plot Details Excel Template
                                            </a>
                                            
                                            {/* INLINE ROW - Total Plots, Upload, Button ALL IN ONE LINE */}
                                            <div className="development-details-inline-row">
                                                
                                                {/* Total No of Plots - 25% */}
                                                <div className="development-details-col-total">
                                                    <label className="development-details-label">
                                                        Total No of Plots<font color="red">*</font>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        maxLength="6"
                                                        className="development-details-inputbox"
                                                        placeholder="Total No of Plots"
                                                        value={plotDetails.totalPlots}
                                                        onChange={(e) => handleInputChange('plots', 'totalPlots', e.target.value)}
                                                        required={buildingTypes.plots}
                                                    />
                                                </div>
                                                
                                                {/* Upload Plot Details - 40% */}
                                                <div className="development-details-col-upload">
                                                    <label className="development-details-label">
                                                        Upload Plot Details<font color="red">*</font>
                                                    </label>
                                                    <input 
                                                        type="file"
                                                        className="development-details-inputbox"
                                                        accept=".xlsx,.xls"
                                                        onChange={(e) => handleFileChange('plots', e.target.files[0])}
                                                        required={buildingTypes.plots}
                                                    />
                                                </div>
                                                
                                                {/* Upload Excel Button - 15% */}
                                                <div className="development-details-col-button">
                                                    <button
                                                        type="button"
                                                        className="development-details-btn-upload"
                                                        onClick={() => handleUploadExcel("plots")}
                                                    >
                                                        Upload Excel
                                                    </button>
                                                </div>
                                            </div>

                                            {/* File Info - Full Width Below */}
                                            {plotDetails.plotFile && (
                                                <div className="development-details-file-info">
                                                    Selected file: <strong>{plotDetails.plotFile.name}</strong> 
                                                    ({Math.round(plotDetails.plotFile.size / 1024)} KB)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ======================================== */}
                        {/* APARTMENT/FLAT DETAILS SECTION - ALL IN ONE LINE */}
                        {/* ======================================== */}
                        {buildingTypes.apartmentsFlats && (
                            <div className="development-details-accordion-section">
                                <div 
                                    className={`development-details-accordion-header ${expandedSections.apartments ? 'development-details-active' : ''}`}
                                    onClick={() => toggleSection('apartments')}
                                >
                                    <span className="development-details-accordion-icon">
                                        {expandedSections.apartments ? "−" : "+"}
                                    </span>
                                    Apartment/Flat Details
                                </div>
                                {expandedSections.apartments && (
                                    <div className="development-details-accordion-content">
                                        <div className="development-details-dvborder">
                                            
                                            <a 
                                                href="#" 
                                                className="development-details-lnk-link" 
                                                onClick={(e) => handleTemplateDownload(e, 'flat')}
                                            >
                                                Click here to download Flat Details Excel Template
                                            </a>
                                            
                                            {/* INLINE ROW - All in one line */}
                                            <div className="development-details-inline-row">
                                                
                                                {/* Total No of Blocks */}
                                                <div className="development-details-col-total">
                                                    <label className="development-details-label">
                                                        Total No of Blocks<font color="red">*</font>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        maxLength="6"
                                                        className="development-details-inputbox"
                                                        placeholder="Total No of Blocks"
                                                        value={apartmentDetails.totalBlocks}
                                                        onChange={(e) => handleInputChange('apartments', 'totalBlocks', e.target.value)}
                                                        required={buildingTypes.apartmentsFlats}
                                                    />
                                                </div>
                                                
                                                {/* Upload Flat Details */}
                                                <div className="development-details-col-upload">
                                                    <label className="development-details-label">
                                                        Upload Flat Details<font color="red">*</font>
                                                    </label>
                                                    <input 
                                                        type="file"
                                                        className="development-details-inputbox"
                                                        accept=".xlsx,.xls"
                                                        onChange={(e) => handleFileChange('apartments', e.target.files[0])}
                                                        required={buildingTypes.apartmentsFlats}
                                                    />
                                                </div>
                                                
                                                {/* Upload Excel Button */}
                                                <div className="development-details-col-button">
                                                    <button
                                                        type="button"
                                                        className="development-details-btn-upload"
                                                        onClick={() => handleUploadExcel("apartments")}
                                                    >
                                                        Upload Excel
                                                    </button>
                                                </div>
                                            </div>

                                            {apartmentDetails.apartmentFile && (
                                                <div className="development-details-file-info">
                                                    Selected file: <strong>{apartmentDetails.apartmentFile.name}</strong> 
                                                    ({Math.round(apartmentDetails.apartmentFile.size / 1024)} KB)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ======================================== */}
                        {/* VILLA DETAILS SECTION - ALL IN ONE LINE */}
                        {/* ======================================== */}
                        {buildingTypes.villas && (
                            <div className="development-details-accordion-section">
                                <div 
                                    className={`development-details-accordion-header ${expandedSections.villas ? 'development-details-active' : ''}`}
                                    onClick={() => toggleSection('villas')}
                                >
                                    <span className="development-details-accordion-icon">
                                        {expandedSections.villas ? "−" : "+"}
                                    </span>
                                    Villa Details
                                </div>
                                {expandedSections.villas && (
                                    <div className="development-details-accordion-content">
                                        <div className="development-details-dvborder">
                                            
                                            <a 
                                                href="#" 
                                                className="development-details-lnk-link" 
                                                onClick={(e) => handleTemplateDownload(e, 'villa')}
                                            >
                                                Click here to download Villa Details Excel Template
                                            </a>
                                            
                                            {/* INLINE ROW - All in one line */}
                                            <div className="development-details-inline-row">
                                                
                                                {/* Total No of Villas */}
                                                <div className="development-details-col-total">
                                                    <label className="development-details-label">
                                                        Total No of Villas<font color="red">*</font>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        maxLength="6"
                                                        className="development-details-inputbox"
                                                        placeholder="Total No of Villas"
                                                        value={villaDetails.totalBlocks}
                                                        onChange={(e) => handleInputChange('villas', 'totalBlocks', e.target.value)}
                                                        required={buildingTypes.villas}
                                                    />
                                                </div>
                                                
                                                {/* Upload Villa Details */}
                                                <div className="development-details-col-upload">
                                                    <label className="development-details-label">
                                                        Upload Villa Details<font color="red">*</font>
                                                    </label>
                                                    <input 
                                                        type="file"
                                                        className="development-details-inputbox"
                                                        accept=".xlsx,.xls"
                                                        onChange={(e) => handleFileChange('villas', e.target.files[0])}
                                                        required={buildingTypes.villas}
                                                    />
                                                </div>
                                                
                                                {/* Upload Excel Button */}
                                                <div className="development-details-col-button">
                                                    <button
                                                        type="button"
                                                        className="development-details-btn-upload"
                                                        onClick={() => handleUploadExcel("villas")}
                                                    >
                                                        Upload Excel
                                                    </button>
                                                </div>
                                            </div>

                                            {villaDetails.villaFile && (
                                                <div className="development-details-file-info">
                                                    Selected file: <strong>{villaDetails.villaFile.name}</strong> 
                                                    ({Math.round(villaDetails.villaFile.size / 1024)} KB)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ======================================== */}
                        {/* COMMERCIAL DETAILS SECTION - ALL IN ONE LINE */}
                        {/* ======================================== */}
                        {buildingTypes.commercial && (
                            <div className="development-details-accordion-section">
                                <div 
                                    className={`development-details-accordion-header ${expandedSections.commercial ? 'development-details-active' : ''}`}
                                    onClick={() => toggleSection('commercial')}
                                >
                                    <span className="development-details-accordion-icon">
                                        {expandedSections.commercial ? "−" : "+"}
                                    </span>
                                    Commercial Details
                                </div>
                                {expandedSections.commercial && (
                                    <div className="development-details-accordion-content">
                                        <div className="development-details-dvborder">
                                            
                                            <a 
                                                href="#" 
                                                className="development-details-lnk-link" 
                                                onClick={(e) => handleTemplateDownload(e, 'commercial')}
                                            >
                                                Click here to download Commercial Details Excel Template
                                            </a>
                                            
                                            {/* INLINE ROW - All in one line */}
                                            <div className="development-details-inline-row">
                                                
                                                {/* Total No of Blocks */}
                                                <div className="development-details-col-total">
                                                    <label className="development-details-label">
                                                        Total No of Blocks<font color="red">*</font>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        maxLength="6"
                                                        className="development-details-inputbox"
                                                        placeholder="Total No of Blocks"
                                                        value={commercialDetails.totalBlocks}
                                                        onChange={(e) => handleInputChange('commercial', 'totalBlocks', e.target.value)}
                                                        required={buildingTypes.commercial}
                                                    />
                                                </div>
                                                
                                                {/* Upload Commercial Details */}
                                                <div className="development-details-col-upload">
                                                    <label className="development-details-label">
                                                        Upload Commercial Details<font color="red">*</font>
                                                    </label>
                                                    <input 
                                                        type="file"
                                                        className="development-details-inputbox"
                                                        accept=".xlsx,.xls"
                                                        onChange={(e) => handleFileChange('commercial', e.target.files[0])}
                                                        required={buildingTypes.commercial}
                                                    />
                                                </div>
                                                
                                                {/* Upload Excel Button */}
                                                <div className="development-details-col-button">
                                                    <button
                                                        type="button"
                                                        className="development-details-btn-upload"
                                                        onClick={() => handleUploadExcel("commercial")}
                                                    >
                                                        Upload Excel
                                                    </button>
                                                </div>
                                            </div>

                                            {commercialDetails.commercialFile && (
                                                <div className="development-details-file-info">
                                                    Selected file: <strong>{commercialDetails.commercialFile.name}</strong> 
                                                    ({Math.round(commercialDetails.commercialFile.size / 1024)} KB)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Uploaded Excel Rows Table */}
                    {uploadedExcelRows.length > 0 && (
                        <div className="development-details-table-responsive development-details-mt-3">
                            <table className="development-details-table development-details-table-bordered">
                                <thead style={{ backgroundColor: "#3f5367", color: "#fff" }}>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Building Type</th>
                                        <th>File Name</th>
                                        <th>Size (KB)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uploadedExcelRows.map((row, index) => (
                                        <tr key={row.id}>
                                            <td>{index + 1}</td>
                                            <td>{row.type}</td>
                                            <td>{row.fileName}</td>
                                            <td>{row.size}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

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
                                                inputMode="numeric"
                                                maxLength="2"
                                                className="development-details-form-control development-details-percent-input"
                                                value={work.percentCompleted}
                                                placeholder="0%–99%"
                                                onChange={(e) => {
                                                    let value = e.target.value;
                                                    if (value === "") {
                                                        handleExternalWorkChange(index, "");
                                                        return;
                                                    }
                                                    if (/^\d{1,2}$/.test(value)) {
                                                        handleExternalWorkChange(index, value);
                                                    }
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
                                            onChange={(e) => {
                                                const value = e.target.value.toUpperCase();
                                                if (/^[A-Z\s]*$/.test(value)) {
                                                    handleInputChange('otherWork', 'description', value);
                                                }
                                            }}
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
                                // disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Save and Continue'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OtherThanIndividualDevelopmentDetails;