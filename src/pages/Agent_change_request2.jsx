import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AgentChangeRequestForm.css";
import { apiGet, apiPost, BASE_URL } from "../api/api";
import AgentChangeRequestStepper from "../components/agent_changerequest_steper";

const SECTION_FIELDS = {
  individual: {
    "Application Details": [
      "Agent Name",
      "Photograph",
      "Father Name",
      "Occupation",
      "Email",
      "Aadhaar Number",
      "PAN Card",
      "PAN Card Proof",
      "Mobile Number",
      "Landline Number",
      "Registration Number / License Number",
      "Registration Date"
    ],
    "Local Address": [
      "Address Line 1",
      "Address Line 2",
      "State",
      "District",
      "Mandal",
      "Local Area / Village",
      "PIN Code",
      "Address Proof"
    ],
    // "Project Launch": ["Last Five Years Project Details", "Project Name"],
    // Litigations: ["Any Civil/Criminal Cases"],
    // "Other State/UT RERA Registration Details": [
    //   "Do You Have Registration In Other States",
    //   "Registration Number",
    //   "State / UT",
    //   "District"
    // ]
    "Upload Documents": [
      "Income tax returns Acknowledgement year1",
      "Income tax returns Acknowledgement year2",
      "Income tax returns Acknowledgement year3"
    ]
  },
  organization: {
    "Authorized Signatory Details": [
      "Authorized Signatory Name",
      "Authorized Signatory Designation",
      "Authorized Signatory Mobile Number",
      "Authorized Signatory Email",
      "Authorized Signatory Photo",
      "Board Resolution for Authorized Signatory"
    ],
    // "Project Launch": ["Last five years project details", "Project Name"],
    // Litigations: [
    //   "Any Civil/Criminal Cases",
    //   "Self Declared Affidavit",
    //   "Case No",
    //   "Name & Place of Tribunal/Authority",
    //   "Name of the Petitioner",
    //   "Name of the Respondent",
    //   "Facts of the Case/Contents of the Case",
    //   "Present Status of the case",
    //   "Interim Order if any",
    //   "Details of final order if disposed",
    //   "Interim Order Certificate",
    //   "Disposed Certificate"
    // ],
    // "Other State/UT RERA Registration Details": [
    //   "Do you have registration in other states",
    //   "Registration Number",
    //   "State / UT",
    //   "District"
    // ],
    "Organization Details": [
      "Organization Name",
      "Organization Type",
      "Registration Number",
      "PAN Number",
      "GST Number",
      "Email",
      "Mobile Number",
      "Upload Registration Certificate",
      "Upload PAN Card",
      "Upload GST"
    ],
    "Local Address": [
      "Address Line 1",
      "Address Line 2",
      "State",
      "District",
      "Mandal",
      "Local Area / Village",
      "PIN Code",
      "Address Proof"
    ]
  , 
    "Upload Documents": [
      "Income tax returns Acknowledgement year1",
      "Income tax returns Acknowledgement year2",
      "Income tax returns Acknowledgement year3"
    ]
  }
};

const FIELD_KEY_MAP = {
  "Agent Name": ["agentName", "agent_name"],
  Photograph: ["photograph", "photo", "agent_photo"],
  "Father Name": ["fatherName", "father_name"],
  Occupation: ["occupationName", "occupation_name", "occupation"],
  Email: ["email"],
  "Aadhaar Number": ["aadhaar", "aadhaar_number"],
  "PAN Card": ["pan", "pan_number"],
  "PAN Card Proof": ["panProof", "pan_proof", "pan_card_doc"],
  "Mobile Number": ["mobile"],
  "Landline Number": ["landline"],
  "Registration Number / License Number": [
    "licenseNumber",
    "license_number",
    "regNumber",
    "registration_number"
  ],
  "Registration Date": [
    "licenseDate",
    "license_date",
    "regDate",
    "registration_date"
  ],
  "Address Line 1": ["address1", "address_line_1"],
  "Address Line 2": ["address2", "address_line_2"],
  State: ["state", "stateName", "state_name"],
  District: ["district", "districtName", "district_name"],
  Mandal: ["mandal", "mandalName", "mandal_name"],
  "Local Area / Village": [
    "village",
    "villageName",
    "village_name",
    "localArea"
  ],
  "PIN Code": ["pincode", "pin", "pin_code"],
  "Address Proof": ["addressProof", "address_proof", "address_proof_doc"],
  "Income tax returns Acknowledgement year1": [
    "income_tax_returns_acknowledgement_year1",
    "income_tax_returns_ack_year1",
    "incomeTaxReturnsAcknowledgementYear1",
    "itr_acknowledgement_year1",
    "itr_ack_year1",
    "itr_year1",
    "itrYear1"
  ],
  "Income tax returns Acknowledgement year2": [
    "income_tax_returns_acknowledgement_year2",
    "income_tax_returns_ack_year2",
    "incomeTaxReturnsAcknowledgementYear2",
    "itr_acknowledgement_year2",
    "itr_ack_year2",
    "itr_year2",
    "itrYear2"
  ],
  "Income tax returns Acknowledgement year3": [
    "income_tax_returns_acknowledgement_year3",
    "income_tax_returns_ack_year3",
    "incomeTaxReturnsAcknowledgementYear3",
    "itr_acknowledgement_year3",
    "itr_ack_year3",
    "itr_year3",
    "itrYear3"
  ],
  "Last Five Years Project Details": [
    "lastFiveYearsProjectDetails",
    "last_five_years_project_details"
  ],
  "Project Name": ["projectName", "project_name"],
  "Any Civil/Criminal Cases": [
    "litigationStatus",
    "anyCivilCriminalCases",
    "any_civil_criminal_cases"
  ],
  "Do You Have Registration In Other States": [
    "otherStateReg",
    "registrationOtherStates",
    "registration_other_states"
  ],
  "Registration Number": [
    "registrationNumber",
    "registration_number",
    "regNo",
    "reg_no"
  ],
  "State / UT": ["otherStateName", "other_state_name", "stateName"],
  "Organization Name": ["orgName", "organizationName", "organization_name"],
  "Organization Type": ["orgType", "organizationType", "organization_type"],
  "PAN Number": ["pan", "pan_number"],
  "GST Number": ["gst", "gst_number"],
  "Authorized Signatory Name": [
    "signName",
    "authorizedSignatoryName",
    "authorized_signatory_name"
  ],
  "Authorized Signatory Designation": [
    "signDesignation",
    "authorizedSignatoryDesignation",
    "authorized_signatory_designation"
  ],
  "Authorized Signatory Mobile Number": [
    "signMobile",
    "authorizedSignatoryMobile",
    "authorized_signatory_mobile"
  ],
  "Authorized Signatory Email": [
    "signEmail",
    "authorizedSignatoryEmail",
    "authorized_signatory_email"
  ],
  "Authorized Signatory Photo": [
    "authPhoto",
    "auth_photo",
    "authorizedPhoto",
    "authorized_photo",
    "photo",
    "photograph"
  ],
  "Board Resolution for Authorized Signatory": [
    "boardResolution",
    "board_resolution"
  ],
  "Upload Registration Certificate": [
    "regCert",
    "reg_cert",
    "registration_cert_doc",
    "registration_certificate"
  ],
  "Upload PAN Card": ["panDoc", "pan_doc", "pan_card_doc"],
  "Upload GST": ["gstDoc", "gst_doc"]
};

const ISSUE_TYPE_SECTIONS = {
  individual: {
    "agent-details-mistake": ["Application Details", "Local Address"],
    "upload-documents-mistake": ["Upload Documents"]
  },
  organization: {
    "change-organization-details": [
      "Authorized Signatory Details",
      "Organization Details",
      "Local Address"
    ],
    "upload-document-change": ["Upload Documents"]
  }
};

const ALLOWED_UPLOAD_EXTENSIONS = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
const IMAGE_UPLOAD_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const fileAccept = ALLOWED_UPLOAD_EXTENSIONS.join(",");

const INDIVIDUAL_REPLACEMENT_FILE_LABELS = new Set([
  "Photograph",
  "PAN Card Proof",
  "Address Proof",
  "Income tax returns Acknowledgement year1",
  "Income tax returns Acknowledgement year2",
  "Income tax returns Acknowledgement year3"
]);

const ORGANIZATION_REPLACEMENT_FILE_LABELS = new Set([
  "Authorized Signatory Photo",
  "Board Resolution for Authorized Signatory",
  "Upload Registration Certificate",
  "Upload Registration Card",
  "Upload PAN Card",
  "Upload GST",
  "Upload GST Certificate",
  "Address Proof",
  "Income tax returns Acknowledgement year1",
  "Income tax returns Acknowledgement year2",
  "Income tax returns Acknowledgement year3"
]);

const FILE_FIELD_LABELS = new Set([
  ...INDIVIDUAL_REPLACEMENT_FILE_LABELS,
  ...ORGANIZATION_REPLACEMENT_FILE_LABELS
]);

const isReplacementFileLabel = (type, label) => {
  if (type === "individual") {
    return INDIVIDUAL_REPLACEMENT_FILE_LABELS.has(label);
  }
  return ORGANIZATION_REPLACEMENT_FILE_LABELS.has(label);
};

const IMAGE_FIELD_LABELS = new Set(["Photograph", "Authorized Signatory Photo"]);
const AGENT_DOC_LABELS = new Set([
  "Authorized Signatory Photo",
  "Board Resolution for Authorized Signatory",
  "Upload Registration Certificate",
  "Upload PAN Card",
  "Upload GST"
]);

const ALPHA_SPACE_FIELDS = new Set([
  "Agent Name",
  "Father Name",
  "Occupation",
  "State",
  "District",
  "Mandal",
  "Local Area / Village",
  "State / UT",
  "Authorized Signatory Name",
  "Authorized Signatory Designation",
  "Organization Name",
  "Organization Type"
]);

const EMAIL_FIELDS = new Set(["Email", "Authorized Signatory Email"]);
const MOBILE_FIELDS = new Set(["Mobile Number", "Authorized Signatory Mobile Number"]);
const LANDLINE_FIELDS = new Set(["Landline Number"]);
const REGISTRATION_FIELDS = new Set([
  "Registration Number / License Number",
  "Registration Number"
]);

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const ALPHA_SPACE_REGEX = /^[A-Za-z ]+$/;
const REGISTRATION_REGEX = /^[A-Za-z0-9]{4,30}$/;

const isFileFieldLabel = (label) => FILE_FIELD_LABELS.has(label);
const isImageFieldLabel = (label) => IMAGE_FIELD_LABELS.has(label);

const getAllowedExtensionsForLabel = (label) =>
  isImageFieldLabel(label) ? IMAGE_UPLOAD_EXTENSIONS : ALLOWED_UPLOAD_EXTENSIONS;

const getUploadAcceptForLabel = (label) =>
  getAllowedExtensionsForLabel(label).join(",");

const getInvalidUploadMessageByLabel = (label) =>
  `Invalid file type. Only ${getAllowedExtensionsForLabel(label).join(", ")} files are allowed.`;

const hasMeaningfulValue = (value) => {
  if (value === undefined || value === null) {
    return false;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized !== "" && normalized !== "null" && normalized !== "undefined";
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length > 0;
  }
  return true;
};

const getFileExtension = (fileName = "") => {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : "";
};

const isAllowedUploadFile = (file, allowedExtensions = ALLOWED_UPLOAD_EXTENSIONS) => {
  if (!file?.name) {
    return false;
  }
  return allowedExtensions.includes(getFileExtension(file.name));
};

const getFileReferenceFromValue = (value) => {
  if (!hasMeaningfulValue(value)) {
    return "";
  }
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value !== "object") {
    return String(value);
  }

  const priorityKeys = [
    "file",
    "url",
    "path",
    "stored_name",
    "storedName",
    "filename",
    "file_name",
    "document",
    "doc",
    "photo",
    "photograph",
    "board_resolution",
    "registration_cert_doc",
    "pan_card_doc",
    "gst_doc",
    "address_proof_doc"
  ];

  for (const key of priorityKeys) {
    const valueAtKey = value?.[key];
    if (typeof valueAtKey === "string" && valueAtKey.trim()) {
      return valueAtKey.trim();
    }
    if (valueAtKey && typeof valueAtKey === "object") {
      const nestedFile =
        valueAtKey.file ||
        valueAtKey.url ||
        valueAtKey.path ||
        valueAtKey.stored_name ||
        valueAtKey.name;
      if (typeof nestedFile === "string" && nestedFile.trim()) {
        return nestedFile.trim();
      }
    }
  }

  if (typeof value?.name === "string" && value.name.trim()) {
    return value.name.trim();
  }

  return "";
};

const getFileNameFromPath = (filePath = "") => {
  if (!filePath) {
    return "";
  }
  const normalized = filePath.split("?")[0].split("#")[0];
  const parts = normalized.split(/[\\/]/);
  return decodeURIComponent(parts[parts.length - 1] || "");
};

const getDisplayFileName = (value) => {
  if (!hasMeaningfulValue(value)) {
    return "";
  }
  if (typeof value === "object" && typeof value?.name === "string" && value.name.trim()) {
    return value.name.trim();
  }
  const fileRef = getFileReferenceFromValue(value);
  return getFileNameFromPath(fileRef) || fileRef;
};

const getFileTypeLabel = (fileName = "") => {
  const extension = getFileExtension(fileName);
  if (extension === ".pdf") {
    return "PDF";
  }
  if (extension === ".doc" || extension === ".docx") {
    return extension.replace(".", "").toUpperCase();
  }
  if (IMAGE_UPLOAD_EXTENSIONS.includes(extension)) {
    return "IMAGE";
  }
  return extension ? extension.replace(".", "").toUpperCase() : "FILE";
};

const BACKEND_BASE_URL = (BASE_URL || "").replace(/\/+$/, "");

const toAbsoluteBackendUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return BACKEND_BASE_URL ? `${BACKEND_BASE_URL}${normalizedPath}` : normalizedPath;
};

const normalizeFileReferencePath = (fileRef = "") => {
  const normalized = fileRef.replace(/\\/g, "/").trim();
  if (!normalized) {
    return "";
  }

  const lower = normalized.toLowerCase();
  const uploadsIndex = lower.indexOf("/uploads/");
  if (uploadsIndex >= 0) {
    return normalized.slice(uploadsIndex + 1);
  }

  const agentDocIndex = lower.indexOf("/agent_doc/");
  if (agentDocIndex >= 0) {
    return normalized.slice(agentDocIndex + 1);
  }

  return normalized.replace(/^\/+/, "");
};

const getFallbackFilePath = (fileName, label) => {
  if (!fileName) {
    return "";
  }

  if (AGENT_DOC_LABELS.has(label)) {
    return `agent_doc/${fileName}`;
  }

  return `uploads/agents/${fileName}`;
};

const toApiFileUrl = (fileRef = "", label = "") => {
  if (!fileRef || typeof fileRef !== "string") {
    return "";
  }
  const trimmed = fileRef.trim();
  if (!trimmed) {
    return "";
  }
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }

  const normalized = normalizeFileReferencePath(trimmed);
  if (!normalized) {
    return "";
  }

  const lower = normalized.toLowerCase();
  if (lower.startsWith("api/")) {
    return toAbsoluteBackendUrl(normalized);
  }
  if (lower.startsWith("uploads/")) {
    return toAbsoluteBackendUrl(normalized);
  }
  if (lower.startsWith("agent_doc/")) {
    return toAbsoluteBackendUrl(`api/${normalized}`);
  }
  if (normalized.includes("/")) {
    return toAbsoluteBackendUrl(normalized);
  }

  const fallbackPath = getFallbackFilePath(normalized, label);
  if (fallbackPath.startsWith("agent_doc/")) {
    return toAbsoluteBackendUrl(`api/${fallbackPath}`);
  }

  return toAbsoluteBackendUrl(fallbackPath);
};

const findNestedValueByKeys = (source, candidateKeys = []) => {
  if (!source || typeof source !== "object" || candidateKeys.length === 0) {
    return undefined;
  }

  const normalizedKeySet = new Set(
    candidateKeys.map((key) => (key || "").toString().trim().toLowerCase())
  );
  const visited = new WeakSet();

  const search = (node) => {
    if (node === null || node === undefined) {
      return undefined;
    }

    if (Array.isArray(node)) {
      for (const item of node) {
        const foundInArray = search(item);
        if (hasMeaningfulValue(foundInArray)) {
          return foundInArray;
        }
      }
      return undefined;
    }

    if (typeof node !== "object") {
      return undefined;
    }

    if (visited.has(node)) {
      return undefined;
    }
    visited.add(node);

    for (const [key, value] of Object.entries(node)) {
      if (normalizedKeySet.has(key.toLowerCase()) && hasMeaningfulValue(value)) {
        return value;
      }
    }

    for (const value of Object.values(node)) {
      const foundNested = search(value);
      if (hasMeaningfulValue(foundNested)) {
        return foundNested;
      }
    }

    return undefined;
  };

  return search(source);
};

const sanitizeAlphaSpaces = (value, maxLength = 100) =>
  value.replace(/[^A-Za-z ]/g, "").replace(/\s{2,}/g, " ").slice(0, maxLength);

const sanitizeDigits = (value, maxLength) => value.replace(/\D/g, "").slice(0, maxLength);

const sanitizeAlphaNumeric = (value, maxLength) =>
  value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, maxLength);

const getFieldInputConfig = (label) => {
  if (isFileFieldLabel(label)) {
    return { maxLength: 300, inputMode: "text" };
  }
  if (ALPHA_SPACE_FIELDS.has(label)) {
    return { maxLength: 100, inputMode: "text" };
  }
  if (EMAIL_FIELDS.has(label)) {
    return { maxLength: 100, inputMode: "email" };
  }
  if (label === "Aadhaar Number") {
    return { maxLength: 12, inputMode: "numeric" };
  }
  if (label === "PAN Card" || label === "PAN Number") {
    return { maxLength: 10, inputMode: "text" };
  }
  if (label === "GST Number") {
    return { maxLength: 15, inputMode: "text" };
  }
  if (MOBILE_FIELDS.has(label) || LANDLINE_FIELDS.has(label)) {
    return { maxLength: 10, inputMode: "numeric" };
  }
  if (label === "PIN Code") {
    return { maxLength: 6, inputMode: "numeric" };
  }
  if (REGISTRATION_FIELDS.has(label)) {
    return { maxLength: 30, inputMode: "text" };
  }
  return { maxLength: 150, inputMode: "text" };
};

const sanitizeFieldValueByLabel = (label, rawValue) => {
  const value = (rawValue || "").toString();

  if (isFileFieldLabel(label)) {
    return value.replace(/\s{2,}/g, " ").trimStart().slice(0, 300);
  }

  if (ALPHA_SPACE_FIELDS.has(label)) {
    return sanitizeAlphaSpaces(value, 100);
  }
  if (EMAIL_FIELDS.has(label)) {
    return value.replace(/\s/g, "").slice(0, 100);
  }
  if (label === "Aadhaar Number") {
    return sanitizeDigits(value, 12);
  }
  if (label === "PAN Card" || label === "PAN Number") {
    return sanitizeAlphaNumeric(value, 10);
  }
  if (label === "GST Number") {
    return sanitizeAlphaNumeric(value, 15);
  }
  if (MOBILE_FIELDS.has(label) || LANDLINE_FIELDS.has(label)) {
    return sanitizeDigits(value, 10);
  }
  if (label === "PIN Code") {
    return sanitizeDigits(value, 6);
  }
  if (REGISTRATION_FIELDS.has(label)) {
    return sanitizeAlphaNumeric(value, 30);
  }

  return value.slice(0, 150);
};

const validateFieldValueByLabel = (label, rawValue) => {
  const value = (rawValue || "").toString().trim();

  if (!value) {
    return isFileFieldLabel(label)
      ? "Please enter reason for replacing this file."
      : "This field is required.";
  }

  if (isFileFieldLabel(label) && value.length < 5) {
    return "Please enter at least 5 characters for the replacement reason.";
  }

  if (ALPHA_SPACE_FIELDS.has(label) && !ALPHA_SPACE_REGEX.test(value)) {
    return "Only alphabets and spaces are allowed.";
  }

  if (EMAIL_FIELDS.has(label) && !EMAIL_REGEX.test(value)) {
    return "Enter a valid email address (example@domain.com).";
  }

  if (label === "Aadhaar Number" && !/^[0-9]{12}$/.test(value)) {
    return "Aadhaar number must be exactly 12 digits.";
  }

  if ((label === "PAN Card" || label === "PAN Number") && !PAN_REGEX.test(value)) {
    return "PAN must follow format: 5 letters, 4 digits, 1 letter.";
  }

  if (label === "GST Number" && !GST_REGEX.test(value)) {
    return "GST number must be a valid 15-character alphanumeric value.";
  }

  if (MOBILE_FIELDS.has(label) && !/^[0-9]{10}$/.test(value)) {
    return "Mobile number must be exactly 10 digits.";
  }

  if (LANDLINE_FIELDS.has(label) && !/^[0-9]{10}$/.test(value)) {
    return "Landline number must be exactly 10 digits.";
  }

  if (label === "PIN Code" && !/^[0-9]{6}$/.test(value)) {
    return "PIN code must be exactly 6 digits.";
  }

  if (REGISTRATION_FIELDS.has(label) && !REGISTRATION_REGEX.test(value)) {
    return "Only letters and numbers are allowed (4 to 30 characters).";
  }

  return "";
};

const createFieldKey = (issue, label) => `${issue}|||${label}`;
const parseFieldKey = (fieldKey) => {
  const [issue = "", label = ""] = fieldKey.split("|||");
  return { issue, label };
};
const getIssueNames = (type) => Object.keys(SECTION_FIELDS[type] || {});
const normalizeApplicationDetails = (rawData) => {
  if (!rawData || typeof rawData !== "object") {
    return null;
  }

  if (rawData.agent_details) {
    return {
      agent_details: rawData.agent_details || {},
      projects: rawData.projects || [],
      litigations: rawData.litigations || [],
      other_state_rera: rawData.other_state_rera || []
    };
  }

  return {
    agent_details: rawData,
    projects: rawData.projects || [],
    litigations: rawData.litigations || [],
    other_state_rera: rawData.other_state_rera || []
  };
};

const determineApplicantType = (agentTypeValue) => {
  const rawValue = (agentTypeValue || "").toString().trim().toLowerCase();
  if (!rawValue) {
    return "individual";
  }
  if (rawValue.includes("other")) {
    return "other-than-individual";
  }
  if (rawValue.includes("individual")) {
    return "individual";
  }
  return "individual";
};

const getSectionsForIssueSelections = (type, selections = []) => {
  const mapping = ISSUE_TYPE_SECTIONS[type] || {};
  const sections = [];
  (selections || []).forEach((issueType) => {
    const issueSections = mapping[issueType] || [];
    issueSections.forEach((section) => {
      if (!sections.includes(section)) {
        sections.push(section);
      }
    });
  });
  return sections;
};

const pruneSectionFieldData = (
  selectedFields,
  fieldChanges,
  fieldDocuments,
  allowedSections
) => {
  const nextSelectedFields = (selectedFields || []).filter((fieldKey) => {
    const { issue } = parseFieldKey(fieldKey);
    return allowedSections.includes(issue);
  });

  const nextFieldChanges = {};
  const nextFieldDocuments = {};

  nextSelectedFields.forEach((fieldKey) => {
    if (fieldChanges?.[fieldKey] !== undefined) {
      nextFieldChanges[fieldKey] = fieldChanges[fieldKey];
    }
    if (fieldDocuments?.[fieldKey] !== undefined) {
      nextFieldDocuments[fieldKey] = fieldDocuments[fieldKey];
    }
  });

  return {
    selectedFields: nextSelectedFields,
    fieldChanges: nextFieldChanges,
    fieldDocuments: nextFieldDocuments
  };
};

function ChangeRequestForm() {
  const navigate = useNavigate();

  const [panNumber, setPanNumber] = useState("");
  const [applicationOptions, setApplicationOptions] = useState([]);
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [isLoadingApplicationDetails, setIsLoadingApplicationDetails] = useState(false);
  const [formData, setFormData] = useState({
    applicationNo: "",
    applicantType: "",
    individualIssueType: "",
    individualIssues: [],
    individualSelectedFields: [],
    individualFieldChanges: {},
    individualFieldDocuments: {},
    individualChangeDocument: "",
    individualReplaceReason: "",
    organizationIssueType: "",
    organizationIssues: [],
    organizationSelectedFields: [],
    organizationFieldChanges: {},
    organizationFieldDocuments: {},
    organizationChangeDocument: "",
    organizationReplaceReason: "",
    individualIssueTypeSelections: [],
    organizationIssueTypeSelections: []
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldValidationErrors, setFieldValidationErrors] = useState({});
  const [fieldDocumentErrors, setFieldDocumentErrors] = useState({});

  const resolveSpecialCurrentValue = (details, issue, label) => {
    const agentDetails = details?.agent_details || {};
    const projects = details?.projects || [];
    const litigations = details?.litigations || [];
    const otherStates = details?.other_state_rera || [];

    if (issue === "Project Launch") {
      if (label === "Project Name") {
        return projects.map((project) => project.project_name).filter(Boolean).join(", ");
      }

      if (label === "Last Five Years Project Details") {
        if (agentDetails.last_five_years_project_details !== undefined && agentDetails.last_five_years_project_details !== null) {
          return String(agentDetails.last_five_years_project_details);
        }
        return projects.length > 0 ? "Yes" : "No";
      }
    }

    if (issue === "Litigations") {
      if (label === "Any Civil/Criminal Cases") {
        if (agentDetails.any_civil_criminal_cases !== undefined && agentDetails.any_civil_criminal_cases !== null) {
          return String(agentDetails.any_civil_criminal_cases);
        }
        return litigations.length > 0 ? "Yes" : "No";
      }
    }

    if (issue === "Other State/UT RERA Registration Details") {
      const firstOtherState = otherStates[0] || {};

      if (
        label === "Do You Have Registration In Other States" ||
        label === "Do you have registration in other states"
      ) {
        if (agentDetails.registration_other_states !== undefined && agentDetails.registration_other_states !== null) {
          return String(agentDetails.registration_other_states);
        }
        return otherStates.length > 0 ? "Yes" : "No";
      }

      if (label === "Registration Number") {
        return firstOtherState.registration_number || "";
      }

      if (label === "State / UT") {
        return firstOtherState.state_name || "";
      }

      if (label === "District") {
        return firstOtherState.district || "";
      }
    }

    return "";
  };

  const resolveCurrentFieldRawValue = (type, issue, label) => {
    const details = applicationDetails || {};
    const merged =
      details.agent_details && typeof details.agent_details === "object"
        ? details.agent_details
        : {};
    const mappedKeys = FIELD_KEY_MAP[label] || [];

    for (const key of mappedKeys) {
      if (merged[key] !== undefined && merged[key] !== null) {
        return merged[key];
      }
    }

    const nestedMatchFromMerged = findNestedValueByKeys(merged, mappedKeys);
    if (hasMeaningfulValue(nestedMatchFromMerged)) {
      return nestedMatchFromMerged;
    }

    const nestedMatchFromDetails = findNestedValueByKeys(details, mappedKeys);
    if (hasMeaningfulValue(nestedMatchFromDetails)) {
      return nestedMatchFromDetails;
    }

    const lowercaseLabel = (label || "").toLowerCase();
    if (merged[lowercaseLabel] !== undefined && merged[lowercaseLabel] !== null) {
      return merged[lowercaseLabel];
    }

    const specialValue = resolveSpecialCurrentValue(details, issue, label);
    if (hasMeaningfulValue(specialValue)) {
      return specialValue;
    }

    return null;
  };

  const resolveCurrentFieldValue = (type, issue, label) => {
    const rawValue = resolveCurrentFieldRawValue(type, issue, label);

    if (isFileFieldLabel(label)) {
      return getFileReferenceFromValue(rawValue);
    }

    if (!hasMeaningfulValue(rawValue)) {
      return "";
    }

    if (typeof rawValue === "string") {
      return rawValue;
    }

    if (typeof rawValue === "object") {
      return JSON.stringify(rawValue);
    }

    return String(rawValue);
  };

  // useEffect(() => {
  //   const storedPan = sessionStorage.getItem("agent_pan");

  //   if (storedPan) {
  //     setPanNumber(storedPan);

  //     const loadApplications = async (pan) => {
  //       try {
  //         const res = await apiPost("/api/change-request/get-applications", {
  //           panNumber: pan
  //         });

  //         if (Array.isArray(res?.applications)) {
  //           setApplicationOptions(
  //             res.applications
  //               .map((item) => item.application_no)
  //               .filter(Boolean)
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Application fetch error:", error);
  //       }
  //     };

  //     loadApplications(storedPan);
  //   }
  // }, []); 

useEffect(() => {
  const storedPan = sessionStorage.getItem("agent_pan");

  if (storedPan) {
    setPanNumber(storedPan);

      const loadAgentData = async () => {
        try {

          // get applications
          const res = await apiPost(
            "/api/change-request/get-applications",
            { panNumber: storedPan }
          );

        const applications = Array.isArray(res?.applications)
          ? res.applications
              .map((item) => item.application_no)
              .filter(Boolean)
          : [];

        setApplicationOptions(applications);
        if (applications.length > 0) {
          setFormData((prev) => {
            if (prev.applicationNo) {
              return prev;
            }
            return {
              ...prev,
              applicationNo: applications[0]
            };
          });
        }

      } catch (error) {
        console.error(error);
      }
    };

    loadAgentData();
  }
}, []);


  useEffect(() => {
    const loadApplicationDetails = async () => {
      if (!formData.applicationNo) {
        setApplicationDetails(null);
        return;
      }

      try {
        setIsLoadingApplicationDetails(true);
        const res = await apiGet(
          `/api/change-request/get-application-details/${encodeURIComponent(
            formData.applicationNo
          )}`
        );
        setApplicationDetails(normalizeApplicationDetails(res?.data));
      } catch (error) {
        console.error("Application details fetch error:", error);
        setApplicationDetails(null);
      } finally {
        setIsLoadingApplicationDetails(false);
      }
    };

    loadApplicationDetails();
  }, [formData.applicationNo]);

  useEffect(() => {
    const source = applicationDetails?.agent_details;

    if (!source) {
      return;
    }

    const applicantType = determineApplicantType(source.agent_type);

    setFormData((prev) => {
      if (prev.applicantType) {
        return prev;
      }

      return {
        ...prev,
        applicantType
      };
    });
  }, [applicationDetails]);

  const individualIssueTypeOptions = [
    { value: "agent-details-mistake", label: "Agent Details Mistake" },
    { value: "upload-documents-mistake", label: "Upload Documents Mistake" }
  ];

  const organizationIssueTypeOptions = [
    {
      value: "change-organization-details",
      label: "Change Organization Details"
    },
    { value: "upload-document-change", label: "Upload Document Change" }
  ];

  const availableIndividualSections = getSectionsForIssueSelections(
    "individual",
    formData.individualIssueTypeSelections
  );
  const availableOrganizationSections = getSectionsForIssueSelections(
    "organization",
    formData.organizationIssueTypeSelections
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "applicantType") {
      setFieldValidationErrors({});
      setFieldDocumentErrors({});
    }

    setFormData((prev) => {
      if (name === "applicantType") {
        return {
          ...prev,
          applicantType: value,
          individualIssueType: "",
          individualIssueTypeSelections: [],
          individualIssues: [],
          individualSelectedFields: [],
          individualFieldChanges: {},
          individualFieldDocuments: {},
          individualChangeDocument: "",
          individualReplaceReason: "",
          organizationIssueType: "",
          organizationIssues: [],
          organizationSelectedFields: [],
          organizationFieldChanges: {},
          organizationFieldDocuments: {},
          organizationChangeDocument: "",
          organizationReplaceReason: ""
        };
      }

      if (name === "organizationIssueType") {
        const defaultIssues = ISSUE_TYPE_SECTIONS.organization[value] || [];
        return {
          ...prev,
          organizationIssueType: value,
          organizationIssues: defaultIssues,
          organizationSelectedFields: [],
          organizationFieldChanges: {},
          organizationFieldDocuments: {},
          organizationChangeDocument: "",
          organizationReplaceReason: ""
        };
      }

      return {
        ...prev,
        [name]: value
      };
    });
  };

  const toggleIndividualIssueType = (issueType) => {
    setFormData((prev) => {
      const selections = prev.individualIssueTypeSelections || [];
      const alreadySelected = selections.includes(issueType);
      const nextSelections = alreadySelected
        ? selections.filter((value) => value !== issueType)
        : [...selections, issueType];
      const nextSections = getSectionsForIssueSelections("individual", nextSelections);
      const nextSelectedIssues = (prev.individualIssues || []).filter((section) =>
        nextSections.includes(section)
      );
      const pruned = pruneSectionFieldData(
        prev.individualSelectedFields,
        prev.individualFieldChanges,
        prev.individualFieldDocuments,
        nextSelectedIssues
      );

      return {
        ...prev,
        individualIssueTypeSelections: nextSelections,
        individualIssueType: nextSelections.join(","),
        individualIssues: nextSelectedIssues,
        individualSelectedFields: pruned.selectedFields,
        individualFieldChanges: pruned.fieldChanges,
        individualFieldDocuments: pruned.fieldDocuments
      };
    });
  };

  const toggleOrganizationIssueType = (issueType) => {
    setFormData((prev) => {
      const selections = prev.organizationIssueTypeSelections || [];
      const alreadySelected = selections.includes(issueType);
      const nextSelections = alreadySelected
        ? selections.filter((value) => value !== issueType)
        : [...selections, issueType];
      const nextSections = getSectionsForIssueSelections("organization", nextSelections);
      const nextSelectedIssues = (prev.organizationIssues || []).filter((section) =>
        nextSections.includes(section)
      );
      const pruned = pruneSectionFieldData(
        prev.organizationSelectedFields,
        prev.organizationFieldChanges,
        prev.organizationFieldDocuments,
        nextSelectedIssues
      );

      return {
        ...prev,
        organizationIssueTypeSelections: nextSelections,
        organizationIssueType: nextSelections.join(","),
        organizationIssues: nextSelectedIssues,
        organizationSelectedFields: pruned.selectedFields,
        organizationFieldChanges: pruned.fieldChanges,
        organizationFieldDocuments: pruned.fieldDocuments
      };
    });
  };

  const handleIssueToggle = (type, issue) => {
    const issuesKey = type === "individual" ? "individualIssues" : "organizationIssues";
    const selectedFieldsKey =
      type === "individual" ? "individualSelectedFields" : "organizationSelectedFields";
    const changesKey =
      type === "individual" ? "individualFieldChanges" : "organizationFieldChanges";
    const documentsKey =
      type === "individual" ? "individualFieldDocuments" : "organizationFieldDocuments";

    setFormData((prev) => {
      const existingIssues = prev[issuesKey] || [];
      const isSelected = existingIssues.includes(issue);

      if (!isSelected) {
        return {
          ...prev,
          [issuesKey]: [...existingIssues, issue]
        };
      }

      const updatedSelectedFields = (prev[selectedFieldsKey] || []).filter(
        (fieldKey) => parseFieldKey(fieldKey).issue !== issue
      );
      const updatedChanges = { ...(prev[changesKey] || {}) };
      const updatedDocuments = { ...(prev[documentsKey] || {}) };

      Object.keys(updatedChanges).forEach((fieldKey) => {
        if (parseFieldKey(fieldKey).issue === issue) {
          delete updatedChanges[fieldKey];
        }
      });

      Object.keys(updatedDocuments).forEach((fieldKey) => {
        if (parseFieldKey(fieldKey).issue === issue) {
          delete updatedDocuments[fieldKey];
        }
      });

      return {
        ...prev,
        [issuesKey]: existingIssues.filter((item) => item !== issue),
        [selectedFieldsKey]: updatedSelectedFields,
        [changesKey]: updatedChanges,
        [documentsKey]: updatedDocuments
      };
    });
  };

  const handleLabelToggle = (type, issue, label) => {
    const selectedKey =
      type === "individual" ? "individualSelectedFields" : "organizationSelectedFields";
    const valuesKey =
      type === "individual" ? "individualFieldChanges" : "organizationFieldChanges";
    const documentsKey =
      type === "individual" ? "individualFieldDocuments" : "organizationFieldDocuments";
    const fieldKey = createFieldKey(issue, label);

    setFormData((prev) => {
      const selectedFields = prev[selectedKey] || [];
      const alreadySelected = selectedFields.includes(fieldKey);

      if (alreadySelected) {
        const updatedValues = { ...(prev[valuesKey] || {}) };
        const updatedDocuments = { ...(prev[documentsKey] || {}) };
        delete updatedValues[fieldKey];
        delete updatedDocuments[fieldKey];

        setFieldValidationErrors((existing) => {
          const next = { ...existing };
          delete next[fieldKey];
          return next;
        });

        setFieldDocumentErrors((existing) => {
          const next = { ...existing };
          delete next[fieldKey];
          return next;
        });

        return {
          ...prev,
          [selectedKey]: selectedFields.filter((item) => item !== fieldKey),
          [valuesKey]: updatedValues,
          [documentsKey]: updatedDocuments
        };
      }

      return {
        ...prev,
        [selectedKey]: [...selectedFields, fieldKey]
      };
    });
  };

  const handleFieldChangeValue = (type, issue, label, value) => {
    const valuesKey =
      type === "individual" ? "individualFieldChanges" : "organizationFieldChanges";
    const fieldKey = createFieldKey(issue, label);
    const sanitizedValue = sanitizeFieldValueByLabel(label, value);
    const fieldError = validateFieldValueByLabel(label, sanitizedValue);

    setFieldValidationErrors((prev) => ({
      ...prev,
      [fieldKey]: fieldError
    }));

    setFormData((prev) => ({
      ...prev,
      [valuesKey]: {
        ...(prev[valuesKey] || {}),
        [fieldKey]: sanitizedValue
      }
    }));
  };

  const handleFieldDocumentChange = (type, issue, label) => (e) => {
    const documentsKey =
      type === "individual" ? "individualFieldDocuments" : "organizationFieldDocuments";
    const fieldKey = createFieldKey(issue, label);
    const file = e.target.files?.[0] || null;
    const allowedExtensions = getAllowedExtensionsForLabel(label);
    const invalidMessage = getInvalidUploadMessageByLabel(label);

    if (file && !isAllowedUploadFile(file, allowedExtensions)) {
      alert(invalidMessage);
      e.target.value = "";
      setFieldDocumentErrors((prev) => ({
        ...prev,
        [fieldKey]: invalidMessage
      }));
      setFormData((prev) => ({
        ...prev,
        [documentsKey]: {
          ...(prev[documentsKey] || {}),
          [fieldKey]: null
        }
      }));
      return;
    }

    setFieldDocumentErrors((prev) => ({
      ...prev,
      [fieldKey]: ""
    }));

    setFormData((prev) => ({
      ...prev,
      [documentsKey]: {
        ...(prev[documentsKey] || {}),
        [fieldKey]: file
      }
    }));
  };

  const renderCurrentValueControl = (value, label, fieldId) => {
    if (isFileFieldLabel(label)) {
      const fileReference = getFileReferenceFromValue(value);
      const fileUrl = toApiFileUrl(fileReference, label);
      const fileName = getDisplayFileName(value);
      const fileType = getFileTypeLabel(fileName);

      if (!fileName && !fileUrl) {
        return <p className="field-change-empty-note">No uploaded file found.</p>;
      }

      if (isImageFieldLabel(label) && fileUrl) {
        return (
          <div>
            <img
              src={fileUrl}
              alt={`Current ${label}`}
              style={{ width: "180px", maxWidth: "100%", borderRadius: "8px" }}
            />
            <p className="field-upload-name">
              {fileName || "Uploaded image"}
            </p>
            <a href={fileUrl} target="_blank" rel="noreferrer">
              Open current image
            </a>
          </div>
        );
      }

      return (
        <div>
          <p className="field-upload-name">
            {fileType}
            {fileName ? ` - ${fileName}` : ""}
          </p>
          {fileUrl && (
            <a href={fileUrl} target="_blank" rel="noreferrer">
              Open current file
            </a>
          )}
        </div>
      );
    }

    const currentValue = value || "";
    if (currentValue.length > 80) {
      return <textarea id={fieldId} value={currentValue} readOnly rows={3} />;
    }
    return <input id={fieldId} type="text" value={currentValue} readOnly />;
  };

  const renderIssueSelector = (type, availableIssues, selectedIssues) => {
    const issues =
      Array.isArray(availableIssues) && availableIssues.length
        ? availableIssues
        : getIssueNames(type);

    if (!issues.length) {
      return null;
    }

    return (
      <div className="issue-selector">
        <p className="field-change-title">Select Issue Sections</p>
        <div className="field-change-list issue-checkbox-list">
          {issues.map((issue) => (
            <label key={issue} className="field-change-item">
              <input
                type="checkbox"
                checked={selectedIssues.includes(issue)}
                onChange={() => handleIssueToggle(type, issue)}
              />
              <span className="field-label-name">{issue}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderFieldChangeBuilder = (type, selectedIssues) => {
    if (!selectedIssues.length) {
      return null;
    }

    const selectedFields =
      type === "individual"
        ? formData.individualSelectedFields
        : formData.organizationSelectedFields;
    const fieldChanges =
      type === "individual"
        ? formData.individualFieldChanges
        : formData.organizationFieldChanges;
    const fieldDocuments =
      type === "individual"
        ? formData.individualFieldDocuments
        : formData.organizationFieldDocuments;

    return (
      <div className="issue-sections">
        {selectedIssues.map((issue) => {
          const fieldList = SECTION_FIELDS[type][issue] || [];
          const issueSelectedFields = selectedFields.filter(
            (fieldKey) => parseFieldKey(fieldKey).issue === issue
          );

          return (
            <div key={issue} className="issue-section-card">
              <p className="issue-section-title">{issue}</p>
              <div className="field-change-builder">
                <div className="field-change-column">
                  <p className="field-change-title">Select Fields To Change</p>
                  <div className="field-change-list">
                    {fieldList.map((label) => {
                      const fieldKey = createFieldKey(issue, label);
                      return (
                        <label key={fieldKey} className="field-change-item">
                          <input
                            type="checkbox"
                            checked={issueSelectedFields.includes(fieldKey)}
                            onChange={() => handleLabelToggle(type, issue, label)}
                          />
                          <span className="field-label-name">{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="field-change-column">
                  <p className="field-change-title">Update Selected Fields</p>
                  {issueSelectedFields.length === 0 ? (
                    <p className="field-change-empty-note">
                      Select at least one field in this section.
                    </p>
                  ) : (
                    <div className="field-change-inputs">
                      {issueSelectedFields.map((fieldKey) => {
                        const { label } = parseFieldKey(fieldKey);
                        const currentRawValue = resolveCurrentFieldRawValue(
                          type,
                          issue,
                          label
                        );
                        const currentValue = resolveCurrentFieldValue(
                          type,
                          issue,
                          label
                        );
                        const isFileField = isFileFieldLabel(label);
                        const inputConfig = getFieldInputConfig(label);
                        const valueError = fieldValidationErrors[fieldKey];
                        const documentError = fieldDocumentErrors[fieldKey];

                        return (
                          <div key={fieldKey} className="field-change-card">
                            <label htmlFor={`${fieldKey}-current`}>
                              {isFileField ? `Current Uploaded ${label}` : `Current ${label}`}
                            </label>
                            {renderCurrentValueControl(
                              isFileField ? currentRawValue : currentValue,
                              label,
                              `${fieldKey}-current`
                            )}
                            {isFileField ? (
                              <>
                                <label htmlFor={`${fieldKey}-document`}>
                                  Replace {label}
                                </label>
                                <input
                                  id={`${fieldKey}-document`}
                                  type="file"
                                  accept={getUploadAcceptForLabel(label)}
                                  onChange={handleFieldDocumentChange(
                                    type,
                                    issue,
                                    label
                                  )}
                                />
                                <label htmlFor={`${fieldKey}-replace`}>
                                  Description for Replacing {label}
                                </label>
                                <textarea
                                  id={`${fieldKey}-replace`}
                                  value={fieldChanges[fieldKey] || ""}
                                  onChange={(e) =>
                                    handleFieldChangeValue(
                                      type,
                                      issue,
                                      label,
                                      e.target.value
                                    )
                                  }
                                  placeholder={`Enter reason for replacing ${label}`}
                                  rows={3}
                                  maxLength={300}
                                />
                                {valueError && (
                                  <p className="field-error-text">{valueError}</p>
                                )}
                                {documentError && (
                                  <p className="field-error-text">{documentError}</p>
                                )}
                                {fieldDocuments[fieldKey]?.name && (
                                  <p className="field-upload-name">
                                    Selected replacement file: {fieldDocuments[fieldKey].name}
                                  </p>
                                )}
                              </>
                            ) : (
                              <>
                                <label htmlFor={`${fieldKey}-replace`}>
                                  Replace {label}
                                </label>
                                <input
                                  id={`${fieldKey}-replace`}
                                  type="text"
                                  value={fieldChanges[fieldKey] || ""}
                                  onChange={(e) =>
                                    handleFieldChangeValue(
                                      type,
                                      issue,
                                      label,
                                      e.target.value
                                    )
                                  }
                                  placeholder={`Enter updated value for ${label}`}
                                  maxLength={inputConfig.maxLength}
                                  inputMode={inputConfig.inputMode}
                                  autoComplete="off"
                                />
                                {valueError && (
                                  <p className="field-error-text">{valueError}</p>
                                )}
                                <label htmlFor={`${fieldKey}-document`}>
                                  Upload Document For {label}
                                </label>
                                <input
                                  id={`${fieldKey}-document`}
                                  type="file"
                                  accept={fileAccept}
                                  onChange={handleFieldDocumentChange(
                                    type,
                                    issue,
                                    label
                                  )}
                                />
                                {documentError && (
                                  <p className="field-error-text">{documentError}</p>
                                )}
                                {fieldDocuments[fieldKey]?.name && (
                                  <p className="field-upload-name">
                                    Selected file: {fieldDocuments[fieldKey].name}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const validateChangeRequest = (type) => {
    const selectedIssues =
      type === "individual" ? formData.individualIssues : formData.organizationIssues;
    const selectedFields =
      type === "individual"
        ? formData.individualSelectedFields
        : formData.organizationSelectedFields;
    const fieldChanges =
      type === "individual"
        ? formData.individualFieldChanges
        : formData.organizationFieldChanges;
    const fieldDocuments =
      type === "individual"
        ? formData.individualFieldDocuments
        : formData.organizationFieldDocuments;

    if (selectedIssues.length === 0) {
      alert("Please select at least one issue section.");
      return false;
    }

    if (selectedFields.length === 0) {
      alert("Please select at least one field to modify.");
      return false;
    }

    const nextFieldErrors = {};
    selectedFields.forEach((fieldKey) => {
      const { label } = parseFieldKey(fieldKey);
      const value = (fieldChanges[fieldKey] || "").trim();
      const validationMessage = validateFieldValueByLabel(label, value);
      if (validationMessage) {
        nextFieldErrors[fieldKey] = validationMessage;
      }
    });
    setFieldValidationErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      const [firstFieldKey] = Object.keys(nextFieldErrors);
      const { label } = parseFieldKey(firstFieldKey);
      alert(`${label}: ${nextFieldErrors[firstFieldKey]}`);
      return false;
    }

    const nextDocumentErrors = {};
    selectedFields.forEach((fieldKey) => {
      const { label } = parseFieldKey(fieldKey);
      const file = fieldDocuments[fieldKey];
      if (!file) {
        nextDocumentErrors[fieldKey] = isFileFieldLabel(label)
          ? "Please upload the replacement file for this field."
          : "Please upload a document for this field.";
        return;
      }

      if (!isAllowedUploadFile(file, getAllowedExtensionsForLabel(label))) {
        nextDocumentErrors[fieldKey] = getInvalidUploadMessageByLabel(label);
      }
    });
    setFieldDocumentErrors(nextDocumentErrors);

    if (Object.keys(nextDocumentErrors).length > 0) {
      alert("Please upload valid files for all selected fields.");
      return false;
    }

    return true;
  };

  const buildFieldPayload = (type) => {
    const selectedFields =
      type === "individual"
        ? formData.individualSelectedFields
        : formData.organizationSelectedFields;
    const fieldChanges =
      type === "individual"
        ? formData.individualFieldChanges
        : formData.organizationFieldChanges;
    const fieldDocuments =
      type === "individual"
        ? formData.individualFieldDocuments
        : formData.organizationFieldDocuments;

    return selectedFields.map((fieldKey, index) => {
      const { issue, label } = parseFieldKey(fieldKey);
      const file = fieldDocuments[fieldKey] || null;

      return {
        issue,
        label,
        oldValue: resolveCurrentFieldValue(type, issue, label),
        newValue: fieldChanges[fieldKey] || "",
        isReplacementFile: isReplacementFileLabel(type, label),
        documentField: file ? `${type}FieldDocument_${index}` : "",
        documentName: file?.name || ""
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (
        formData.applicantType === "individual" &&
        formData.individualIssueTypeSelections.length === 0
      ) {
        alert("Please select at least one issue type.");
        setIsSubmitting(false);
        return;
      }

      if (
        formData.applicantType === "individual" &&
        !validateChangeRequest("individual")
      ) {
        setIsSubmitting(false);
        return;
      }

      if (
        formData.applicantType === "other-than-individual" &&
        formData.organizationIssueTypeSelections.length === 0
      ) {
        alert("Please select at least one issue type.");
        setIsSubmitting(false);
        return;
      }

      if (
        formData.applicantType === "other-than-individual" &&
        !validateChangeRequest("organization")
      ) {
        setIsSubmitting(false);
        return;
      }

      if (
        formData.applicantType === "individual" &&
        !formData.individualReplaceReason.trim()
      ) {
        alert("Please fill replacement reason also.");
        setIsSubmitting(false);
        return;
      }

      if (
        formData.applicantType === "other-than-individual" &&
        !formData.organizationReplaceReason.trim()
      ) {
        alert("Please fill replacement reason also.");
        setIsSubmitting(false);
        return;
      }

      const organizationFieldPayload = buildFieldPayload("organization");
      const formPayload = new FormData();

      formPayload.append("panNumber", panNumber);
      formPayload.append("applicationNo", formData.applicationNo);
      formPayload.append("applicantType", formData.applicantType);

      formPayload.append("individualIssueType", formData.individualIssueType);
      formPayload.append("individualIssue", formData.individualIssues.join(", "));
      const individualFieldPayload = buildFieldPayload("individual");
      formPayload.append(
        "individualDescription",
        individualFieldPayload
          .map((item) => `${item.issue} - ${item.label}: ${item.newValue}`)
          .join("\n")
      );
      formPayload.append(
        "individualFieldChanges",
        JSON.stringify(individualFieldPayload)
      );
      formPayload.append("individualChangeDocument", formData.individualChangeDocument);
      formPayload.append("individualReplaceReason", formData.individualReplaceReason);

      formPayload.append("organizationIssueType", formData.organizationIssueType);
      formPayload.append("organizationIssue", formData.organizationIssues.join(", "));
      formPayload.append(
        "organizationDescription",
        organizationFieldPayload
          .map((item) => `${item.issue} - ${item.label}: ${item.newValue}`)
          .join("\n")
      );
      formPayload.append(
        "organizationFieldChanges",
        JSON.stringify(organizationFieldPayload)
      );
      formPayload.append(
        "organizationChangeDocument",
        formData.organizationChangeDocument
      );
      formPayload.append(
        "organizationReplaceReason",
        formData.organizationReplaceReason
      );

      individualFieldPayload.forEach((item, index) => {
        const file =
          formData.individualFieldDocuments[createFieldKey(item.issue, item.label)];
        if (file) {
          formPayload.append(`individualFieldDocument_${index}`, file);
        }
      });

      organizationFieldPayload.forEach((item, index) => {
        const file =
          formData.organizationFieldDocuments[createFieldKey(item.issue, item.label)];
        if (file) {
          formPayload.append(`organizationFieldDocument_${index}`, file);
        }
      });

      await apiPost("/api/change-request/save", formPayload);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit change request");
    }

    setIsSubmitting(false);
  };

  const displayedAgentInfo = applicationDetails?.agent_details || {};
  const displayApplicationNumber =
    formData.applicationNo || displayedAgentInfo?.application_no || "-";
  const displayAgentName = displayedAgentInfo?.agent_name || "-";
  const displayAddress =
    displayedAgentInfo?.address1 || displayedAgentInfo?.address_line_1 || "-";
  const displayStatus = displayedAgentInfo?.status || "-";
  const selectedChangeCount =
    formData.applicantType === "individual"
      ? formData.individualSelectedFields.length
      : formData.organizationSelectedFields.length;
  const replacementReasonFieldName =
    formData.applicantType === "individual"
      ? "individualReplaceReason"
      : "organizationReplaceReason";
  const replacementReasonValue =
    replacementReasonFieldName === "individualReplaceReason"
      ? formData.individualReplaceReason
      : formData.organizationReplaceReason;
  const shouldShowReplacementReason =
    Boolean(formData.applicantType) && selectedChangeCount > 0;

  return (
    <div className="change-request-page">
      {showSuccess && (
        <div className="success-overlay" role="alert" aria-live="assertive">
          <div className="success-blast">
            <span className="blast-ring blast-ring-one" />
            <span className="blast-ring blast-ring-two" />
            <span className="blast-dot blast-dot-one" />
            <span className="blast-dot blast-dot-two" />
            <span className="blast-dot blast-dot-three" />
            <span className="blast-dot blast-dot-four" />
            <div className="success-card">
              <div className="success-icon">
                <i className="fas fa-check" />
              </div>
              <h3>Change Request Submitted by After Payment</h3>
              <button
                type="button"
                onClick={() => {
                  setShowSuccess(false);
                  navigate("/agent-change-request-payment");
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="change-request-hero">
        <div className="hero-title-wrapper">
          <h2>Apply for Change Request</h2>
        </div>
        <p className="hero-caption">Agent Services</p>
        
        <div className="change-request-stepper-card">
          <AgentChangeRequestStepper activeStep={2} />
        </div>
      </div>

      <div className="change-request-container">
        <div className="change-request-header">
          <p className="eyebrow">Agent Services</p>
          {/* <p className="pan-display">
            PAN Number : <strong>{panNumber}</strong>
          </p>
          <p className="pan-display">
            Application Number : <strong>{panNumber}</strong>
          </p>
          <p className="pan-display">
            User Name : <strong>{panNumber}</strong>
          </p>
          <p className="pan-display">
            Address : <strong>{panNumber}</strong>
          </p>
          <p className="pan-display">
            Status : <strong>{panNumber}</strong>
          </p> */}

          <p className="pan-display">
            PAN Number : <strong>{panNumber}</strong>
          </p>
          <p className="pan-display">
            Application Number : <strong>{displayApplicationNumber}</strong>
          </p>
          <p className="pan-display">
            User Name : <strong>{displayAgentName}</strong>
          </p>
          <p className="pan-display">
            Address : <strong>{displayAddress}</strong>
          </p>
          <p className="pan-display">
            Status : <strong>{displayStatus}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="change-request-form">
          <label>Application Number</label>
          {applicationOptions.length === 0 ? (
            <p className="field-change-empty-note">
              No application number available for this PAN
            </p>
          ) : formData.applicationNo ? (
            <p className="field-change-title">{formData.applicationNo}</p>
          ) : (
            <p className="field-change-empty-note">
              Loading application number...
            </p>
          )}
          {formData.applicationNo && isLoadingApplicationDetails && (
            <p className="field-change-empty-note">Loading application details...</p>
          )}

          <label>Select Applicant Type</label>
          <div className="applicant-type-group">
            <label
              className={`applicant-type-option ${
                formData.applicantType === "individual" ? "selected" : ""
              }`}
              htmlFor="typeIndividual"
            >
              <input
                id="typeIndividual"
                type="radio"
                name="applicantType"
                value="individual"
                checked={formData.applicantType === "individual"}
                onChange={handleChange}
                required
              />
              <span className="dot" />
              <span>Individual</span>
            </label>
            <label
              className={`applicant-type-option ${
                formData.applicantType === "other-than-individual"
                  ? "selected"
                  : ""
              }`}
              htmlFor="typeOtherThanIndividual"
            >
              <input
                id="typeOtherThanIndividual"
                type="radio"
                name="applicantType"
                value="other-than-individual"
                checked={formData.applicantType === "other-than-individual"}
                onChange={handleChange}
                required
              />
              <span className="dot" />
              <span>Other than Individual</span>
            </label>
          </div>

          {formData.applicantType === "individual" && (
            <>
              <p className="field-change-title">Select Issue Types</p>
              <div className="issue-type-checkboxes">
                {individualIssueTypeOptions.map((option) => {
                  const isChecked = formData.individualIssueTypeSelections.includes(
                    option.value
                  );
                  return (
                    <label key={option.value} className="issue-type-option">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleIndividualIssueType(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>

              {availableIndividualSections.length > 0 && (
                <>
                  {renderIssueSelector(
                    "individual",
                    availableIndividualSections,
                    formData.individualIssues
                  )}
                  {renderFieldChangeBuilder("individual", formData.individualIssues)}
                </>
              )}
            </>
          )}

          {formData.applicantType === "other-than-individual" && (
            <>
              <p className="field-change-title">Select Issue Types</p>
              <div className="issue-type-checkboxes">
                {organizationIssueTypeOptions.map((option) => {
                  const isChecked = formData.organizationIssueTypeSelections.includes(
                    option.value
                  );
                  return (
                    <label key={option.value} className="issue-type-option">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOrganizationIssueType(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>

              {availableOrganizationSections.length > 0 && (
                <>
                  {renderIssueSelector(
                    "organization",
                    availableOrganizationSections,
                    formData.organizationIssues
                  )}
                  {renderFieldChangeBuilder(
                    "organization",
                    formData.organizationIssues
                  )}
                </>
              )}
            </>
          )}

          {shouldShowReplacementReason && (
            <>
              <label htmlFor="replacementReason">
                Replacement Reason <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="replacementReason"
                name={replacementReasonFieldName}
                value={replacementReasonValue}
                onChange={handleChange}
                placeholder="Enter replacement reason"
                rows={4}
                maxLength={500}
                required
              />
            </>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangeRequestForm;
