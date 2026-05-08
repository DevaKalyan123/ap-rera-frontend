import React, { useState } from "react";
import "../styles/ChangeRequest.css";
import { useLocation } from "react-router-dom";
import { submitChangeRequest, apiPost, apiGet } from "../api/api";
import ProjectDetailsForm, { PROJECT_DETAILS_SUBSECTIONS } from "../components/changeRequest/ProjectDetailsForm";
import PromoterDetailsForm, { PROMOTER_DETAILS_SUBSECTIONS } from "../components/changeRequest/PromoterDetailsForm";
import DevelopmentDetailsForm, { DEVELOPMENT_DETAILS_SUBSECTIONS } from "../components/changeRequest/DevelopmentDetailsForm";
import AssociateDetailsForm, { ASSOCIATE_DETAILS_SUBSECTIONS } from "../components/changeRequest/AssociateDetailsForm";
import UploadDocumentsForm, { UPLOAD_DOCUMENTS_SUBSECTIONS } from "../components/changeRequest/UploadDocumentsForm";
import ReviewSubmit from "../components/changeRequest/ReviewSubmit";
import CRPaymentPage from "../components/changeRequest/CRPaymentPage";


const ALL_SUBSECTION_CONFIGS = [
  ...PROJECT_DETAILS_SUBSECTIONS,
  ...PROMOTER_DETAILS_SUBSECTIONS,
  ...DEVELOPMENT_DETAILS_SUBSECTIONS,
  ...ASSOCIATE_DETAILS_SUBSECTIONS,
  ...UPLOAD_DOCUMENTS_SUBSECTIONS,
];

const SECTIONS_CONFIG = [
  { id: "project_details", label: "Project Details", icon: "🏗️", subSections: PROJECT_DETAILS_SUBSECTIONS, component: "project" },
  { id: "promoter_details", label: "Promoter Details", icon: "👤", subSections: PROMOTER_DETAILS_SUBSECTIONS, component: "promoter" },
  { id: "development_details", label: "Development Details", icon: "🏢", subSections: DEVELOPMENT_DETAILS_SUBSECTIONS, component: "development" },
  { id: "associate_details", label: "Associate Details", icon: "🤝", subSections: ASSOCIATE_DETAILS_SUBSECTIONS, component: "associate" },
  { id: "upload_documents", label: "Upload Documents", icon: "📎", subSections: UPLOAD_DOCUMENTS_SUBSECTIONS, component: "upload" },
];

const genRef = () => "CR" + Date.now().toString().slice(-8);

// ─── ACCORDION BODY ───────────────────────────────────────────────────────────
function AccordionFormBody({ panel, formValues, onChange, docFiles, onDocFile, tableStore, setTableStore, previewData, applicationNumber, panNumber }) {
  const props = { subSectionId: panel.subId, formValues, onChange, docFiles, onDocFile, tableStore, setTableStore, previewData, applicationNumber, panNumber };
  switch (panel.componentType) {
    case "project": return <ProjectDetailsForm     {...props} />;
    case "promoter": return <PromoterDetailsForm    {...props} />;
    case "development": return <DevelopmentDetailsForm {...props} />;
    case "associate": return <AssociateDetailsForm   {...props} />;
    case "upload": return <UploadDocumentsForm    {...props} />;
    default: return null;
  }
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ChangeRequest() {
  const location = useLocation();
  console.log("FULL LOCATION DATA 👉", location);        
  console.log("STATE DATA 👉", location.state);          
  const project = location.state?.projectData || {};
  const panNumber = location.state?.panNumber || "";
  const email = location.state?.email || project.email || "";

  const APP_INFO = {
    applicationNumber: project.application_number || "-",
    panNumber: panNumber || "-",
    projectName: project.project_name || "-",
    applicantName: project.name || "-",
    email: email || "-",
  };

  const [step, setStep] = useState(1);
  const [refNo] = useState(genRef);
  const [reason, setReason] = useState("");
  const [selected, setSelected] = useState({});
  const [formValues, setFormValues] = useState({});
  const [docFiles, setDocFiles] = useState({});
  const [openAccordion, setOpenAccordion] = useState(null);
  const [tableStore, setTableStore] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(true);

  React.useEffect(() => {
    const fetchPreviewData = async () => {
      if (!APP_INFO.applicationNumber || !APP_INFO.panNumber) {
        setLoadingPreview(false);
        return;
      }
      try {
        setLoadingPreview(true);
        let res = await apiPost("/api/project/preview", {
          applicationNumber: APP_INFO.applicationNumber,
          panNumber: APP_INFO.panNumber
        });

        if (!res?.data?.project_details) {
          res = await apiPost("/api/othertheninduvidual/project/preview", {
            applicationNumber: APP_INFO.applicationNumber,
            panNumber: APP_INFO.panNumber
          });
        }

        const pd = res?.data || {};

        const devRes = await apiGet(`/api/development-details?application_number=${APP_INFO.applicationNumber}&pan_number=${APP_INFO.panNumber}`);
        pd.development_details_full = devRes?.data || {};

        setPreviewData(pd);
      } catch (err) {
        console.error("Failed to fetch preview data", err);
      } finally {
        setLoadingPreview(false);
      }
    };
    fetchPreviewData();
  }, [APP_INFO.applicationNumber, APP_INFO.panNumber]);

  // ── SELECTION HELPERS ────────────────────────────────────────────────────
  const toggleSection = (sectionId) => {
    setSelected((prev) => {
      const already = prev[sectionId];
      if (already === undefined) return { ...prev, [sectionId]: {} };
      if (typeof already === "object" && Object.values(already).every((v) => !v))
        return { ...prev, [sectionId]: undefined };
      return { ...prev, [sectionId]: {} };
    });
  };

  const toggleSubSection = (sectionId, subId) => {
    setSelected((prev) => {
      const cur = prev[sectionId] || {};
      return { ...prev, [sectionId]: { ...cur, [subId]: !cur[subId] } };
    });
  };

  const isSectionSelected = (sectionId) =>
    Object.values(selected[sectionId] || {}).some(Boolean);

  const isSubSelected = (sectionId, subId) =>
    !!(selected[sectionId]?.[subId]);

  // ── ACTIVE PANELS ────────────────────────────────────────────────────────
  const getActivePanels = () => {
    const panels = [];
    SECTIONS_CONFIG.forEach((section) => {
      section.subSections.forEach((sub) => {
        if (isSubSelected(section.id, sub.id)) {
          panels.push({
            key: `${section.id}__${sub.id}`,
            sectionId: section.id,
            subId: sub.id,
            sectionLabel: section.label,
            subLabel: sub.label,
            componentType: section.component,
            isDoc: !!sub.isDocumentSection,
            fields: sub.fields || [],
            documents: sub.documents || [],
          });
        }
      });
    });
    return panels;
  };

  const activePanels = getActivePanels();
  const totalSelected = activePanels.length;

  // ── HANDLERS ────────────────────────────────────────────────────────────
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocFile = (docId, file) => {
    setDocFiles((prev) => ({ ...prev, [docId]: file }));
  };

  // ── GUARDS ───────────────────────────────────────────────────────────────
  const canGoStep2 = totalSelected > 0;

  const TABLE_BASED_KEYS = ["__promoter_personal_rows", "__development_rows", "__upload_doc_rows", "__consultancy_rows"];

  const canGoStep3 = activePanels.some((p) => {
    if (p.isDoc) return Object.keys(docFiles).length > 0;
    if (tableStore[p.subId]?.length > 0) return true;
    if (TABLE_BASED_KEYS.some((k) => formValues[k] && formValues[k] !== "")) return true;
    if (Object.keys(formValues).some((k) => k.startsWith("__associate_rows_") && formValues[k] !== "")) return true;
    if (Object.keys(formValues).some((k) => k.startsWith("__project_rows_") && formValues[k] !== "")) return true;
    return p.fields.some((f) => formValues[f.name] && formValues[f.name] !== "");
  });

  // ── BUILD REVIEW ROWS ────────────────────────────────────────────────────
  const buildReviewRows = () => {
    const rows = [];

    activePanels.forEach((panel) => {

      if (panel.isDoc) {
        const subConfig = ALL_SUBSECTION_CONFIGS.find((s) => s.id === panel.subId);
        Object.entries(docFiles).forEach(([docId, file]) => {
          const doc = subConfig?.documents?.find((d) => d.id === Number(docId));
          rows.push({
            subLabel: panel.subLabel, field: doc?.label || `Document #${docId}`,
            oldValue: "-", newValue: file.name, document: file.name, documentUrl: "", type: "file",
          });
        });
        return;
      }

      const stored = tableStore[panel.subId];
      if (stored?.length > 0) {
        const subConfig = ALL_SUBSECTION_CONFIGS.find((s) => s.id === panel.subId);
        const subFields = subConfig?.fields || panel.fields || [];

        stored.forEach((r) => {
          if (r.workType !== undefined) {
           rows.push({
  subLabel: panel.subLabel, field: r.workType, oldValue: r.previousPercent || "-",
  newValue: r.changePercent || "-", description: r.description || "-",
  document: r.documentName || "-", documentUrl: "", type: "field"
});
          } else if (r.docType !== undefined) {
            rows.push({
              subLabel: panel.subLabel, field: r.docType, oldValue: r.oldFileName || "-",
              newValue: r.newFileName || "-", description: r.description || "-",
              document: r.newFileName || r.oldFileName || "-", documentUrl: r.newFileUrl || r.oldFileUrl || "", type: "file",
              _oldFile: r._oldFile, _newFile: r._newFile
            });
          } else if (r.field !== undefined && r.newValue !== undefined && r.fileUrl !== undefined) {
            rows.push({
              subLabel: panel.subLabel, field: r.field, oldValue: r.oldValue || "-",
              newValue: r.newValue, description: r.description || "-", document: r.fileName || "-",
              documentUrl: r.fileUrl || "", type: "field"
            });
          } else if (r.field !== undefined && r.newValue !== undefined) {
            rows.push({
              subLabel: panel.subLabel, field: r.field, oldValue: r.oldValue || "-",
              newValue: r.newValue, description: r.description || "-", document: r.document || "-",
              documentUrl: r.documentUrl || "", type: "field", _proofFile: r._proofFile
            });
          } else if (r.__mode === "new") {
            const fieldHeaders = subFields.map((f) => ({ label: f.label, value: r[f.name] || "-" }));
            rows.push({
              subLabel: panel.subLabel, field: "__associate_new__", fieldHeaders,
              description: r.description || "-", document: r.fileName || "-", documentUrl: r.fileURL || "",
              type: "associate_new"
            });
          } else if (r.__mode === "old") {
            const selField = subFields.find((f) => f.name === r.__selField);
            rows.push({
              subLabel: panel.subLabel, field: selField?.label || r.__selField,
              oldValue: r[`old_${r.__selField}`] || "-", newValue: r[r.__selField] || "-",
              description: r.description || "-", document: r.fileName || "-", documentUrl: r.fileURL || "",
              type: "associate_old"
            });
          }
        });
        return;
      }

      const subConfig = ALL_SUBSECTION_CONFIGS.find((s) => s.id === panel.subId);
      const fields = subConfig?.fields || panel.fields || [];

      fields.forEach((f) => {
        const val = formValues[f.name];
        if (val && val !== "") {
          rows.push({
            subLabel: panel.subLabel, field: f.label, oldValue: "-", newValue: val,
            description: "-", document: "-", documentUrl: "",
            type: panel.subId === "bank_account" ? "bank" : "field"
          });
        }
      });

      if (panel.subId === "bank_account" && formValues["bankDocument"]) {
        rows.push({
          subLabel: panel.subLabel, field: "Upload Document", oldValue: "-",
          newValue: formValues["bankDocument"], description: "-", document: formValues["bankDocument"],
          documentUrl: "", type: "bank"
        });
      }
    });

    return rows;
  };

  const reviewRows = buildReviewRows();


  const handlePaymentAndSubmit = async (gateway) => {
    const fd = new FormData();

    // ── 1. TOP-LEVEL FIELDS ──────────────────────────────────────────────
    fd.append("reference_no", refNo);
    fd.append("application_number", APP_INFO.applicationNumber);
    fd.append("pan_number", APP_INFO.panNumber);
    fd.append("project_name", APP_INFO.projectName);
    fd.append("applicant_name", APP_INFO.applicantName);
    fd.append("email", APP_INFO.email);
    fd.append("payment_gateway", gateway);
    fd.append("payment_transaction_id", "TXN" + Date.now().toString().slice(-8));
    fd.append("payment_status", "SUCCESS");

    // ── 2. BUILD CHANGES ARRAY + COLLECT FILES ───────────────────────────
    // changes[] — JSON array (no File objects inside, files go separately)
    // fileMap   — indexed files: old_file_0, new_file_0, proof_file_0, ...
    const changesArray = [];
    const fileMap = {};  // { "old_file_0": File, "new_file_0": File, ... }

    let idx = 0;  // global change index matching backend loop

    activePanels.forEach((panel) => {

      // ── Document upload section ──────────────────────────────────────
      if (panel.isDoc) {
        Object.entries(docFiles).forEach(([, file]) => {
          changesArray.push({
            section: panel.sectionId,
            subsection: panel.subId,
            field_name: "document",
            old_value: null,
            new_value: file.name,
            description: "Document upload",
            change_mode: "file",
            data_json: null,
          });
          fileMap[`new_file_${idx}`] = file;
          idx++;
        });
        return;
      }

      // ── tableStore rows ──────────────────────────────────────────────
      const stored = tableStore[panel.subId];
      if (stored?.length > 0) {
        stored.forEach((r) => {

          // External development work (workType)
          if (r.workType !== undefined) {
            changesArray.push({
              section: panel.sectionId,
              subsection: panel.subId,
              field_name: r.workType,
              old_value: r.previousPercent || null,
              new_value: r.changePercent || null,
              description: r.description || null,
              change_mode: "update",
              data_json: null,
            });
            idx++;

            // Upload Documents (docType — has old file + new file)
          } else if (r.docType !== undefined) {
            changesArray.push({
              section: panel.sectionId,
              subsection: panel.subId,
              field_name: r.docType,
              old_value: r.oldFileName || null,
              new_value: r.newFileName || null,
              description: r.description || null,
              change_mode: "file",
              data_json: null,
            });
            if (r._oldFile) fileMap[`old_file_${idx}`] = r._oldFile;
            if (r._newFile) fileMap[`new_file_${idx}`] = r._newFile;
            idx++;

            // Consultancy (field / oldValue / newValue / fileUrl — has file)
          } else if (r.field !== undefined && r.fileUrl !== undefined) {
            changesArray.push({
              section: panel.sectionId,
              subsection: panel.subId,
              field_name: r.field,
              old_value: r.oldValue || null,
              new_value: r.newValue || null,
              description: r.description || null,
              change_mode: "old",
              data_json: null,
            });
            if (r._file) fileMap[`proof_file_${idx}`] = r._file;
            idx++;

            // Promoter personal (field / oldValue / newValue / documentUrl — has proof file)
          } else if (r.field !== undefined && r.newValue !== undefined) {
            changesArray.push({
              section: panel.sectionId,
              subsection: panel.subId,
              field_name: r.fieldName || r.field,
              old_value: r.oldValue || null,
              new_value: r.newValue || null,
              description: r.description || null,
              change_mode: "old",
              data_json: null,
            });
            if (r._proofFile) fileMap[`proof_file_${idx}`] = r._proofFile;
            idx++;

            // Associate NEW mode
          } else if (r.__mode === "new") {
            const subConfig = ALL_SUBSECTION_CONFIGS.find((s) => s.id === panel.subId);
            const subFields = subConfig?.fields || panel.fields || [];
            const data_json = {};
            subFields.forEach((f) => { if (r[f.name]) data_json[f.name] = r[f.name]; });
            changesArray.push({
              section: panel.sectionId,
              subsection: panel.subId,
              field_name: null,
              old_value: null,
              new_value: null,
              description: r.description || null,
              change_mode: "new",
              data_json,
            });
            if (r._file) fileMap[`proof_file_${idx}`] = r._file;
            idx++;

            // Associate OLD mode (edit one field)
          } else if (r.__mode === "old") {
            changesArray.push({
              section: panel.sectionId,
              subsection: panel.subId,
              field_name: r.__selField || null,
              old_value: r[`old_${r.__selField}`] || null,
              new_value: r[r.__selField] || null,
              description: r.description || null,
              change_mode: "old",
              data_json: null,
            });
            if (r._file) fileMap[`proof_file_${idx}`] = r._file;
            idx++;
          }
        });
        return;
      }

      // ── Regular form fields (bank account, simple sections) ──────────
      const subConfig = ALL_SUBSECTION_CONFIGS.find((s) => s.id === panel.subId);
      const fields = subConfig?.fields || panel.fields || [];

      const filledFields = fields.filter((f) => formValues[f.name] && formValues[f.name] !== "");
      if (filledFields.length > 0) {
        // Collect all filled fields as one change entry with data_json
        const data_json = {};
        filledFields.forEach((f) => { data_json[f.name] = formValues[f.name]; });

        changesArray.push({
          section: panel.sectionId,
          subsection: panel.subId,
          field_name: filledFields.length === 1 ? filledFields[0].name : null,
          old_value: null,
          new_value: filledFields.length === 1 ? formValues[filledFields[0].name] : null,
          description: null,
          change_mode: "update",
          data_json: filledFields.length > 1 ? data_json : null,
        });

        // Bank document file
        if (panel.subId === "bank_account" && docFiles["bankDocument"]) {
          fileMap[`proof_file_${idx}`] = docFiles["bankDocument"];
        }
        idx++;
      }
    });

    // ── 3. APPEND changes JSON STRING ────────────────────────────────────
    fd.append("changes", JSON.stringify(changesArray));

    // ── 4. APPEND ALL FILES ───────────────────────────────────────────────
    Object.entries(fileMap).forEach(([key, file]) => {
      fd.append(key, file);
    });

    // ── 5. POST TO API ────────────────────────────────────────────────────
    try {
      const res = await submitChangeRequest(fd);
      return res;
    } catch (error) {
      console.error("Change Request Error:", error);
      throw error;
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  const resetAll = () => {
    setStep(1); setSelected({}); setFormValues({});
    setDocFiles({}); setReason(""); setOpenAccordion(null);
    setTableStore({});
  };

  const STEP_LABELS = ["Select Sections", "Review & Submit", "Payment", "Done"];

  // ── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="cr-page">
      <div className="cr-container">

        <div className="cr-page-title">Change Request Form</div>

        {/* APP INFO */}
        <div className="cr-app-card">
          <div className="cr-card-header">
            <span className="cr-card-header-icon">📋</span>Application Information
          </div>
          <div className="cr-app-info-grid">
            {[
              // { label: "Application No", value: APP_INFO.applicationNumber },
              // { label: "PAN Number",     value: APP_INFO.panNumber         },
              { label: "Project Name", value: APP_INFO.projectName },
              { label: "promoter Name", value: APP_INFO.applicantName },
              // { label: "Reference No",   value: refNo                      },
              { label: "Status", value: step === 5 ? "✔ Submitted" : "Draft", className: step === 5 ? "success" : "accent" },
            ].map((item) => (
              <div className="cr-app-info-item" key={item.label}>
                <div className="cr-app-info-label">{item.label}</div>
                <div className={`cr-app-info-value ${item.className || ""}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* STEP BAR */}
        <div className="cr-steps">
          {STEP_LABELS.map((s, i) => {
            const num = i + 1;
            const cls = step === num ? "active" : step > num ? "done" : "";
            return (
              <div key={s} className={`cr-step ${cls}`}>
                <span className="cr-step-num">{step > num ? "✓" : num}</span>
                {s}
              </div>
            );
          })}
        </div>

        {/* ══ STEP 1 ══════════════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="cr-main-card">
            <div className="cr-main-card-header"><span>①</span> Select What You Want to Change</div>
            <div className="cr-main-card-body">
              <div className="cr-note info">
                <span className="cr-note-icon">ℹ️</span>
                <span>Select <strong>one or more sections</strong>. You can change a single field, a whole section, or multiple sections — all in one request.</span>
              </div>

              <div className="cr-section-list">
                {SECTIONS_CONFIG.map((section) => {
                  const isChecked = isSectionSelected(section.id);
                  const subListOpen = selected[section.id] !== undefined;
                  const selectedSubCnt = Object.values(selected[section.id] || {}).filter(Boolean).length;
                  return (
                    <div key={section.id} className={`cr-section-row ${isChecked ? "selected" : ""}`}>
                      <div className="cr-section-toggle" onClick={() => toggleSection(section.id)}>
                        <div className="cr-section-checkbox">{isChecked && "✓"}</div>
                        <span style={{ fontSize: 18 }}>{section.icon}</span>
                        <span className="cr-section-name">{section.label}</span>
                        <span className="cr-section-badge">
                          {selectedSubCnt > 0
                            ? `${selectedSubCnt} sub-section${selectedSubCnt > 1 ? "s" : ""} selected`
                            : `${section.subSections.length} sub-sections`}
                        </span>
                        <span style={{ fontSize: 11, opacity: 0.6, marginLeft: 4 }}>{subListOpen ? "▲" : "▼"}</span>
                      </div>
                      {subListOpen && (
                        <div className="cr-sub-section-list">
                          {section.subSections.map((sub) => {
                            const subChecked = isSubSelected(section.id, sub.id);
                            return (
                              <div key={sub.id}>
                                <div
                                  className={`cr-sub-row ${subChecked ? "selected" : ""}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSubSection(section.id, sub.id);
                                  }}
                                >
                                  <div className="cr-sub-checkbox">{subChecked && "✓"}</div>
                                  <span className="cr-sub-name">{sub.label}</span>
                                </div>

                                {subChecked && (
                                  <div style={{
                                    margin: "10px 0 15px 30px",
                                    padding: "15px",
                                    background: "#f9fbff",
                                    borderRadius: "8px",
                                  }}>
                                   <AccordionFormBody
  panel={{ subId: sub.id, componentType: section.component }}
  formValues={formValues}
  onChange={handleFieldChange}
  docFiles={docFiles}
  onDocFile={handleDocFile}
  tableStore={tableStore}
  setTableStore={setTableStore}
  previewData={previewData}
  applicationNumber={APP_INFO.applicationNumber}
  panNumber={APP_INFO.panNumber}
/>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
                <button
                  className="cr-btn-primary"
                  disabled={!canGoStep2}
                  onClick={() => setStep(3)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ STEP 2 ══════════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="cr-main-card">
            <div className="cr-main-card-header">
              <span>②</span> Make Your Changes
              <span style={{ marginLeft: "auto", fontSize: 12, opacity: 0.8, fontWeight: 500 }}>
                {totalSelected} section{totalSelected > 1 ? "s" : ""} open
              </span>
            </div>
            <div className="cr-main-card-body">
              <div className="cr-note">
                <span className="cr-note-icon">✏️</span>
                <span>Fill only the fields you want to change. <strong>Fields left empty will not be updated.</strong></span>
              </div>

              <div className="cr-accordion-list">
                {activePanels.map((panel) => {
                  const isOpen = openAccordion === panel.key;
                  const filledCount = !panel.isDoc
                    ? panel.fields.filter((f) => formValues[f.name] && formValues[f.name] !== "").length
                    : 0;
                  const tableCount = tableStore[panel.subId]?.length || 0;
                  const docCount = panel.isDoc ? Object.keys(docFiles).length : 0;

                  return (
                    <div key={panel.key} className={`cr-accordion ${isOpen ? "open" : ""}`}>
                      <div className="cr-accordion-header" onClick={() => setOpenAccordion(isOpen ? null : panel.key)}>
                        <div className="cr-accordion-title">
                          {panel.sectionLabel}
                          <span style={{ opacity: 0.5, fontWeight: 400 }}> › </span>
                          {panel.subLabel}
                          {(filledCount > 0 || tableCount > 0) && (
                            <span className="cr-accordion-section-tag">
                              {tableCount > 0 ? `${tableCount} row${tableCount > 1 ? "s" : ""} added` : `${filledCount} field${filledCount > 1 ? "s" : ""} filled`}
                            </span>
                          )}
                          {panel.isDoc && docCount > 0 && (
                            <span className="cr-accordion-section-tag">{docCount} file{docCount > 1 ? "s" : ""} selected</span>
                          )}
                        </div>
                        <span className="cr-accordion-arrow">▼</span>
                      </div>

                      {isOpen && (
                        <div className="cr-accordion-body">
                          <AccordionFormBody
                            panel={panel}
                            formValues={formValues}
                            onChange={handleFieldChange}
                            docFiles={docFiles}
                            onDocFile={handleDocFile}
                            tableStore={tableStore}
                            setTableStore={setTableStore}
                            previewData={previewData}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="cr-btn-row">
                <button className="cr-btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button className="cr-btn-primary" disabled={!canGoStep3} onClick={() => setStep(3)}>
                  Next: Review & Submit →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ STEP 3 — REVIEW & SUBMIT ════════════════════════════════════ */}
        {step === 3 && (
          <ReviewSubmit
            reviewRows={reviewRows}
            onBack={() => setStep(2)}
            onSubmit={() => setStep(4)}
          />
        )}

        {/* ══ STEP 4 — PAYMENT ════════════════════════════════════════════ */}
        {step === 4 && (
          <CRPaymentPage
            appInfo={{
              applicationNumber: APP_INFO.applicationNumber,
              panNumber: APP_INFO.panNumber,
              projectName: APP_INFO.projectName,
              applicantName: APP_INFO.applicantName,
              refNo: refNo,
            }}
            onBack={() => setStep(3)}
            onSuccess={() => setStep(5)}
            onPayment={handlePaymentAndSubmit}
          />
        )}

        {/* ══ STEP 5 — SUCCESS ════════════════════════════════════════════ */}
        {step === 5 && (
          <div className="cr-success-card">
            <div className="cr-success-icon">✓</div>
            <div className="cr-success-title">Change Request Submitted Successfully!</div>
            <div className="cr-success-sub">
              Your request has been sent to AP RERA admin for review.
              You will be notified once the admin approves or rejects the changes.
            </div>
            <div className="cr-success-refno">{refNo}</div>
            <div className="cr-success-refno-label">Reference Number</div>
            <div className="cr-success-detail">
              <strong>{reviewRows.length} change{reviewRows.length > 1 ? "s" : ""}</strong> submitted across{" "}
              <strong>{activePanels.length} section{activePanels.length > 1 ? "s" : ""}</strong><br />
              Application: <strong>{APP_INFO.applicationNumber}</strong> &nbsp;|&nbsp;
              PAN: <strong>{APP_INFO.panNumber}</strong>
            </div>
            <div className="cr-success-actions">
              <button className="cr-btn-secondary" onClick={resetAll}>+ Submit Another Request</button>
              <button className="cr-btn-primary" onClick={() => window.location.href = "/"}>← Back to Home</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}