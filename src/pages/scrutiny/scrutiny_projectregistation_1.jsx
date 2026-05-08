import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet, BASE_URL } from "../../api/api";
import ProjectWizard from "../../components/scrutiny/scrutiny_steper";
import ScrutinyLayout from "../../components/scrutiny/ScrutinyLayout";
import "../../styles/scrutiny/scrutiny_projectregistation_1.css";
import { useAdmin } from "../../context/AdminContext";

const EMPTY_FORM = {
  applicationNo: "",
  promoterType: "",
  panNumber: "",
  bankState: "",
  bankName: "",
  branchName: "",
  accountNo: "",
  accountHolder: "",
  ifsc: "",
  bankStatement: "",
  selfAffidavit: "",
  name: "",
  fatherName: "",
  aadhaar: "",
  mobile: "",
  landline: "",
  email: "",
  promoterWebsite: "",
  stateUT: "",
  district: "",
  licenseNo: "",
  licenseDate: "",
  gstNum: "",
  otherStateReg: "",
  litigation: "",
  promoter2: "",
  lastFiveYears: "",
  typeOfPromoter: "",
  cinNumber: "",
  registrationNumber: "",
  registrationDate: "",
};



const displayText = (value, fallback = "N/A") => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  return String(value);
};

const firstFilled = (...values) => {
  for (const value of values) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    return value;
  }
  return "";
};

const pickValue = (source, keys, fallback = "N/A") =>
  displayText(firstFilled(...keys.map((key) => source?.[key])), fallback);

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? displayText(value) : date.toLocaleDateString("en-GB");
};

const formatDateTime = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? displayText(value)
    : date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
};

const formatBoolean = (value) => {
  const normalized = String(value || "").toLowerCase();
  if (["yes", "y", "true", "1"].includes(normalized)) return "Yes";
  if (["no", "n", "false", "0"].includes(normalized)) return "No";
  return displayText(value);
};

const normalizePromoterType = (value) => {
  const normalized = String(value || "").toLowerCase();
  return normalized === "individual" ? "individual" : "other";
};

const getFileUrl = (value) => {
  if (!value) return "";
  if (String(value).startsWith("http")) return value;
  const normalizedPath = String(value).replace(/\\/g, "/").replace(/^\/+/, "");
  return `${BASE_URL}/${normalizedPath}`;
};

const getDaysFromDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
};

function DisplayItem({ label, value, linkText = "View", fullWidth = false }) {
  const renderedValue =
    typeof value === "object" && value !== null
      ? value
      : <span className="spr-display-field">{displayText(value)}</span>;

  return (
    <div className={`display-group ${fullWidth ? "spr-full-width" : ""}`}>
      <span className="display-label">{label}</span>
      {typeof value === "string" && value.startsWith("http") ? (
        <a className="spr-file-link" href={value} target="_blank" rel="noreferrer">
          {linkText}
        </a>
      ) : (
        renderedValue
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="spr-section">
      <h2 className="spr-section-title">{title}</h2>
      {children}
    </section>
  );
}

function DocumentCell({ path, label = "View Document" }) {
  const href = getFileUrl(path);

  if (!href) {
    return <span className="spr-display-field">N/A</span>;
  }

  return (
    <a className="spr-file-link" href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

function DataTable({ className = "", columns, rows, emptyText = "No data available." }) {
  return (
    <div className="spr-table-wrap">
      <table className={`spr-table ${className}`.trim()}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(row, rowIndex) : displayText(row[column.key])}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="spr-empty-cell">
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function ScrutinyProjectRegistrationDetail() {
  const navigate = useNavigate();
  const { admin } = useAdmin();
  const dept = admin?.department?.toLowerCase();

  // ✅ NEW LINE ADD
  const isRestrictedDept = ["planning", "ad", "dd"].includes(dept);

  const location = useLocation();

  const panNumber =
    location.state?.panNumber || sessionStorage.getItem("panNumber") || "";
  const applicationNumber =
    location.state?.applicationNumber ||
    sessionStorage.getItem("applicationNumber") ||
    "";
  const promoterTypeFromState = normalizePromoterType(
    location.state?.promoterType || sessionStorage.getItem("promoterType")
  );
  const summaryFromState = location.state?.projectRow || null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(summaryFromState);
  const [remarks, setRemarks] = useState("");
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [reraEntries, setReraEntries] = useState([]);
  const [projectEntries, setProjectEntries] = useState([]);
  const [litigationEntries, setLitigationEntries] = useState([]);
  const [promoter2Entries, setPromoter2Entries] = useState([]);
  const [orgMemberEntries, setOrgMemberEntries] = useState([]);

  useEffect(() => {
    if (panNumber) {
      sessionStorage.setItem("panNumber", panNumber);
    }

    if (applicationNumber) {
      sessionStorage.setItem("applicationNumber", applicationNumber);
    }

    if (promoterTypeFromState) {
      sessionStorage.setItem("promoterType", promoterTypeFromState);
    }
  }, [panNumber, applicationNumber, promoterTypeFromState]);

  useEffect(() => {
    if (!applicationNumber) {
      setError("Application number is missing.");
      setLoading(false);
      return;
    }

    const formatApiDate = (value) => {
      if (!value) return "";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    };

    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        if (promoterTypeFromState === "individual") {
          const resp = await apiGet(`/api/project-registration/${applicationNumber}`);

          const resolvedPanNumber = firstFilled(
            resp.pan_number,
            resp.pan_no,
            resp.pan,
            resp.pan_card_no,
            resp.panNumber
          );

          if (resolvedPanNumber) {
            sessionStorage.setItem("panNumber", resolvedPanNumber);
          }

          sessionStorage.setItem("promoterType", "individual");

          setFormData((prev) => ({
            ...prev,
            applicationNo: resp.application_no || applicationNumber,
            promoterType: "individual",
            panNumber: resolvedPanNumber || prev.panNumber,
            bankState: resp.bank_state || "",
            bankName: resp.bank_name || "",
            branchName: resp.branch_name || "",
            accountNo: resp.account_no || "",
            accountHolder: resp.account_holder || "",
            ifsc: resp.ifsc || "",
            bankStatement: firstFilled(resp.bank_statement, resp.bank_statement_doc, resp.bank_account_statement),
            selfAffidavit: firstFilled(resp.self_affidavit, resp.selfAffidavit),
            name: resp.name || "",
            fatherName: resp.father_name || "",
            aadhaar: resp.aadhaar || "",
            mobile: resp.mobile || "",
            landline: resp.landline || "",
            email: resp.email || "",
            promoterWebsite: resp.promoter_website || "",
            stateUT: resp.state_ut || "",
            district: resp.district || "",
            licenseNo: resp.license_no || "",
            licenseDate: formatApiDate(resp.license_date),
            gstNum: resp.gst_num || "",
            otherStateReg: resp.other_state_reg || "",
            litigation: resp.litigation || "",
            promoter2: resp.promoter2 || "",
          }));
        } else {
          const data = await apiGet(`/api/other-t-indv/promoter/get/${applicationNumber}`);

          if (!data?.formData) {
            throw new Error("Promoter data not found.");
          }

          const resolvedPanNumber = firstFilled(
            data.formData.panNumber,
            data.formData.pan_number,
            data.formData.panNo,
            data.formData.pan,
            data.formData.panCardNumber
          );

          if (resolvedPanNumber) {
            sessionStorage.setItem("panNumber", resolvedPanNumber);
          }

          sessionStorage.setItem("promoterType", "other");

          setFormData((prev) => ({
            ...prev,
            ...data.formData,
            applicationNo: firstFilled(data.formData.applicationNo, applicationNumber),
            promoterType: "other",
            panNumber: resolvedPanNumber || data.formData.panNumber || prev.panNumber,
            name: firstFilled(data.formData.name, data.formData.organizationName),
            email: firstFilled(data.formData.email, data.formData.authorizedSignatoryEmail),
            mobile: firstFilled(data.formData.mobile, data.formData.authorizedSignatoryMobile),
            landline: firstFilled(data.formData.landline, data.formData.authorizedSignatoryLandline),
            registrationNumber: firstFilled(data.formData.registrationNumber, data.formData.cinNumber),
            registrationDate: formatApiDate(data.formData.registrationDate),
            licenseDate: formatApiDate(data.formData.licenseDate),
            bankStatement: firstFilled(data.formData.bankStatement, data.formData.bankAccountStatement),
            selfAffidavit: firstFilled(data.formData.selfAffidavit, data.formData.self_affidavit),
          }));

          setReraEntries(Array.isArray(data.reraEntries) ? data.reraEntries : []);
          setProjectEntries(Array.isArray(data.projectEntries) ? data.projectEntries : []);
          setLitigationEntries(Array.isArray(data.litigationEntries) ? data.litigationEntries : []);
          setPromoter2Entries(Array.isArray(data.promoter2Entries) ? data.promoter2Entries : []);
          setOrgMemberEntries(Array.isArray(data.orgMemberEntries) ? data.orgMemberEntries : []);
        }

        if (!summaryFromState) {
          try {
            const rows = await apiGet(`/api/scrutiny/project-registrations?dept=${dept}`);
            const match = Array.isArray(rows)
              ? rows.find((row) => String(row.application_no) === String(applicationNumber))
              : null;
            if (match) setSummary(match);
          } catch (summaryError) {
            console.error("Summary fetch failed", summaryError);
          }
        }
      } catch (loadError) {
        console.error(loadError);
        setError(loadError.message || "Unable to load application details.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [applicationNumber, promoterTypeFromState, summaryFromState, dept]);

  const isOther = normalizePromoterType(formData.promoterType || promoterTypeFromState) === "other";

  const summaryData = useMemo(() => {
    const promoterName = firstFilled(
      summary?.applicantName,
      summary?.applicant_name,
      formData.name
    );

    const projectAddress = [
      summary?.projectAddress,
      summary?.project_address,
      summary?.address,
      summary?.district,
    ]
      .filter(Boolean)
      .join(", ");

    return {
      promoterName: displayText(promoterName),
      projectName: displayText(firstFilled(summary?.projectName, summary?.project_name)),
      projectAddress: displayText(projectAddress),
      firstTransactionDate: formatDateTime(firstFilled(summary?.created_at, summary?.receivedDate, summary?.applicationDate)),
      noOfDays: displayText(getDaysFromDate(firstFilled(summary?.created_at, summary?.receivedDate))),
      scrutinyCount: displayText(firstFilled(summary?.scrutinyLabel, summary?.scrutiny_label, "S1")),
    };
  }, [formData.name, summary]);

  const bankStatementUrl = getFileUrl(formData.bankStatement);
  const affidavitUrl = getFileUrl(formData.selfAffidavit);

  const memberColumns = [
    { key: "serial", label: "S.No.", render: (_, index) => index + 1 },
    { key: "nationality", label: "Nationality", render: (row) => pickValue(row, ["isIndian", "nationality"], "Indian") },
    { key: "name", label: "Name", render: (row) => pickValue(row, ["name"]) },
    { key: "designation", label: "Designation", render: (row) => pickValue(row, ["designation"]) },
    { key: "mobile", label: "Mobile No", render: (row) => pickValue(row, ["mobile"]) },
    { key: "email", label: "Email Address", render: (row) => pickValue(row, ["email"]) },
    { key: "state", label: "State/UT", render: (row) => pickValue(row, ["state"]) },
    { key: "district", label: "District", render: (row) => pickValue(row, ["district"]) },
    { key: "address1", label: "Address Line1", render: (row) => pickValue(row, ["address1", "addressLine1"]) },
    { key: "address2", label: "Address Line2", render: (row) => pickValue(row, ["address2", "addressLine2"]) },
    { key: "pinCode", label: "PIN Code", render: (row) => pickValue(row, ["pinCode"]) },
    { key: "din", label: "DIN Number", render: (row) => pickValue(row, ["din"]) },
    { key: "aadhaar", label: "Aadhaar Number", render: (row) => pickValue(row, ["aadhaar"]) },
    { key: "pan", label: "PAN Number", render: (row) => pickValue(row, ["pan"]) },
  ];

  const projectColumns = [
    { key: "serial", label: "S.No.", render: (_, index) => index + 1 },
    { key: "projectName", label: "Project Name", render: (row) => pickValue(row, ["projectName"]) },
    { key: "projectType", label: "Project Type", render: (row) => pickValue(row, ["projectType"]) },
    { key: "currentStatus", label: "Current Status", render: (row) => pickValue(row, ["currentStatus"]) },
    { key: "projectAddress", label: "Address", render: (row) => pickValue(row, ["projectAddress"]) },
    { key: "projectStateUT", label: "State", render: (row) => pickValue(row, ["projectStateUT"]) },
    { key: "projectDistrict", label: "District", render: (row) => pickValue(row, ["projectDistrict"]) },
    { key: "pinCode", label: "PIN Code", render: (row) => pickValue(row, ["pinCode"]) },
    { key: "surveyNo", label: "Survey No", render: (row) => pickValue(row, ["surveyNo"]) },
  ];

  const reraColumns = [
    { key: "serial", label: "S.No.", render: (_, index) => index + 1 },
    { key: "reraRegNumber", label: "Registration Number", render: (row) => pickValue(row, ["reraRegNumber"]) },
    { key: "reraState", label: "State/UT", render: (row) => pickValue(row, ["reraState"]) },
    { key: "registrationRevoked", label: "Registration Revoked", render: (row) => formatBoolean(firstFilled(row?.registrationRevoked, row?.revoked)) },
    { key: "revocationReason", label: "Revocation Reason", render: (row) => pickValue(row, ["revocationReason"]) },
  ];

  const litigationColumns = [
    { key: "serial", label: "S.No.", render: (_, index) => index + 1 },
    { key: "caseNo", label: "Case No.", render: (row) => pickValue(row, ["caseNo"]) },
    { key: "tribunalPlace", label: "Tribunal / Authority", render: (row) => pickValue(row, ["tribunalPlace"]) },
    { key: "petitionerName", label: "Petitioner", render: (row) => pickValue(row, ["petitionerName"]) },
    { key: "respondentName", label: "Respondent", render: (row) => pickValue(row, ["respondentName"]) },
    { key: "caseStatus", label: "Present Status", render: (row) => pickValue(row, ["caseStatus"]) },

    {
      key: "interimOrder",
      label: "Interim Order",
      render: (row) => formatBoolean(firstFilled(row?.interimOrder)),
    },
    {
      key: "finalOrderDetails",
      label: "Final Order Details",
      render: (row) => formatBoolean(firstFilled(row?.finalOrderDetails)),
    },

    // 👇 CHANGE ONLY THIS PART
    ...(!isRestrictedDept
      ? [
        {
          key: "interimOrderCertificatePath",
          label: "Interim Order Certificate",
          render: (row) => (
            <DocumentCell path={firstFilled(row?.interimOrderCertificatePath)} />
          ),
        },
        {
          key: "disposedCertificatePath",
          label: "Disposed Certificate",
          render: (row) => (
            <DocumentCell path={firstFilled(row?.disposedCertificatePath)} />
          ),
        },
      ]
      : []),
  ];

  const promoterColumns = [
    { key: "serial", label: "S.No.", render: (_, index) => index + 1 },
    { key: "nationality", label: "Nationality", render: (row) => pickValue(row, ["promoter2IsIndian"], "Indian") },
    {
      key: "promoterType",
      label: "Copromoter Type",
      render: (row) =>
      (String(row?.promoter2IsOrganization || "").toLowerCase() === "yes"
        ? "Organization"
        : "Individual"),
    },
    { key: "promoter2Name", label: "Name", render: (row) => pickValue(row, ["promoter2Name"]) },
    { key: "state", label: "State/UT", render: (row) => pickValue(row, ["promoter2State", "state"]) },
    { key: "district", label: "District", render: (row) => pickValue(row, ["promoter2District", "district"]) },
    { key: "address1", label: "Address Line 1", render: (row) => pickValue(row, ["promoter2AddressLine1"]) },
    { key: "address2", label: "Address Line 2", render: (row) => pickValue(row, ["promoter2AddressLine2"]) },
    { key: "pinCode", label: "PIN Code", render: (row) => pickValue(row, ["promoter2PinCode", "pinCode"]) },
    { key: "mobile", label: "Phone No", render: (row) => pickValue(row, ["promoter2Mobile"]) },
    { key: "email", label: "Email ID", render: (row) => pickValue(row, ["promoter2Email"]) },
    { key: "pan", label: "PAN Card No", render: (row) => pickValue(row, ["promoter2PanCard"]) },

    // ✅ correct way
    ...(!isRestrictedDept
      ? [
        {
          key: "supportingDocumentPath",
          label: "Supporting Document",
          render: (row) => (
            <DocumentCell path={firstFilled(row?.supportingDocumentPath)} />
          ),
        },
      ]
      : []),
  ];

  return (
    <ScrutinyLayout>
      <div className="spr-page">
        <div className="spr-shell">
          <div className="spr-topbar">
            <div className="spr-breadcrumb">
              <span>You are here :</span>
              <span>DashBoard</span>
              <span>/</span>
              <span>Project Registration</span>
              <span>/</span>
              <span>Scrutiny Engineer Requests</span>
              <span>/</span>
              <span>Project Registration Form</span>
            </div>
            <div className="spr-brand">
              <span>RERA-SE</span>
              <button type="button" className="spr-icon-btn" onClick={() => window.print()} title="Print">
                <i className="fa-solid fa-print" />
              </button>
            </div>
          </div>

          <div className="spr-body">
            <div className="spr-header-row">
              <div>
                <h1 className="spr-title">Project Registration Form</h1>
                <p className="spr-subtitle">Read-only scrutiny view for application {displayText(applicationNumber)}.</p>
              </div>
              <button type="button" className="spr-secondary-btn" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>

            <ProjectWizard currentStep={1} />

            {loading ? (
              <div className="spr-state-card">Loading application details...</div>
            ) : error ? (
              <div className="spr-state-card spr-error">{error}</div>
            ) : (
              <>
                <div className="spr-card">
                  <DataTable
                    columns={[
                      { key: "promoterName", label: "Promoter Name" },
                      { key: "projectName", label: "Project Name" },
                      { key: "projectAddress", label: "Project Address" },
                      { key: "firstTransactionDate", label: "First Transaction Date" },
                      { key: "noOfDays", label: "No.of Days from Proceeding" },
                      { key: "scrutinyCount", label: "Scrutiny Count" },
                    ]}
                    rows={[summaryData]}
                  />

                  <div className="spr-legend">
                    <div className="spr-legend-item"><span className="spr-swatch legal" />Legal</div>
                    <div className="spr-legend-item"><span className="spr-swatch audit" />Audit</div>
                    <div className="spr-legend-item"><span className="spr-swatch engineering" />Engineering</div>
                    <div className="spr-legend-item"><span className="spr-swatch planning" />Planning</div>
                  </div>

                  <Section title={isOther ? "Promoter Details" : "Promoter Details"}>
                    <div className="spr-grid">
                      <DisplayItem label="Application Number" value={formData.applicationNo || applicationNumber} />
                      <DisplayItem label="Promoter Type" value={isOther ? "Other Than Individual" : "Individual"} />

                      {isOther ? (
                        <>
                          <DisplayItem label="Type of Organisation" value={formData.typeOfPromoter} />
                          <DisplayItem label="Name" value={formData.name} />
                          <DisplayItem label="Registration Number" value={firstFilled(formData.registrationNumber, formData.cinNumber)} />
                          <DisplayItem label="Date Of Registration" value={formatDate(formData.registrationDate)} />
                          <DisplayItem label="GST Number" value={formData.gstNum} />
                          <DisplayItem label="PAN Card Number" value={formData.panNumber} />
                          <DisplayItem label="Email" value={formData.email} />
                          <DisplayItem label="Mobile Number" value={formData.mobile} />
                          <DisplayItem label="Landline Number" value={formData.landline} />
                          <DisplayItem label="Partnership Firm Website URL" value={formData.promoterWebsite} />
                          <DisplayItem label="State/UT" value={formData.stateUT} />
                          <DisplayItem label="District" value={formData.district} />
                        </>
                      ) : (
                        <>
                          <DisplayItem label="Name" value={formData.name} />
                          <DisplayItem label="Father Name" value={formData.fatherName} />
                          <DisplayItem label="Aadhaar Number" value={formData.aadhaar} />
                          <DisplayItem label="PAN Card Number" value={formData.panNumber} />
                          <DisplayItem label="Email" value={formData.email} />
                          <DisplayItem label="Mobile Number" value={formData.mobile} />
                          <DisplayItem label="Landline Number" value={formData.landline} />
                          <DisplayItem label="Promoter Website URL" value={formData.promoterWebsite} />
                          <DisplayItem label="State/UT" value={formData.stateUT} />
                          <DisplayItem label="District" value={formData.district} />
                          <DisplayItem label="License Number" value={formData.licenseNo} />
                          <DisplayItem label="License Date" value={formatDate(formData.licenseDate)} />
                          <DisplayItem label="GST Number" value={formData.gstNum} />
                        </>
                      )}
                    </div>
                  </Section>

                  <Section title="Project Bank Account Details">
                    <div className="spr-grid">
                      <DisplayItem label="State" value={formData.bankState} />
                      <DisplayItem label="Bank Name" value={formData.bankName} />
                      <DisplayItem label="Branch Name" value={formData.branchName} />
                      <DisplayItem label="Account No" value={formData.accountNo} />
                      <DisplayItem label="Account Holder's Name as in Bank Pass Book" value={formData.accountHolder} />
                      <DisplayItem label="IFSC Code" value={formData.ifsc} />
                      {!isRestrictedDept && (
                        <DisplayItem
                          label="Bank Account Statement"
                          value={bankStatementUrl ? bankStatementUrl : "N/A"}
                          linkText="View Document"
                        />
                      )}
                    </div>
                  </Section>

                  {isOther && !isRestrictedDept && (
                    <Section title="Uploaded Documents">
                      <div className="spr-grid">
                        <DisplayItem
                          label="Organisation Registration Document"
                          value={<DocumentCell path={firstFilled(formData.organizationRegistrationFile)} />}
                        />
                        <DisplayItem
                          label="GST Document"
                          value={<DocumentCell path={firstFilled(formData.gstDocumentFile)} />}
                        />
                        <DisplayItem
                          label="PAN Card"
                          value={<DocumentCell path={firstFilled(formData.panCardFile)} />}
                        />
                        <DisplayItem
                          label="Address Proof"
                          value={<DocumentCell path={firstFilled(formData.addressProofFile)} />}
                        />
                        <DisplayItem
                          label="Income Tax Returns"
                          value={<DocumentCell path={firstFilled(formData.itrReturnsFile)} />}
                        />
                        <DisplayItem
                          label="Balance Sheet"
                          value={<DocumentCell path={firstFilled(formData.balanceSheetFile)} />}
                        />
                      </div>
                    </Section>
                  )}

                  {isOther && (
                    <Section title="Member Details">
                      <DataTable className="spr-magenta-head" columns={memberColumns} rows={orgMemberEntries} />
                    </Section>
                  )}

                  <Section title="Projects launched in the past 5 years">
                    <div className="spr-inline-summary">
                      <DisplayItem label="Last five years project details" value={formatBoolean(formData.lastFiveYears)} />
                    </div>
                    {String(formData.lastFiveYears || "").toLowerCase() === "yes" && (
                      <DataTable className="spr-green-head" columns={projectColumns} rows={projectEntries} />
                    )}
                  </Section>

                  <Section title="Other State/UT RERA Registration Details">
                    <div className="spr-inline-summary">
                      <DisplayItem label="Do you have any registration in other State/UT" value={formatBoolean(formData.otherStateReg)} />
                    </div>
                    {String(formData.otherStateReg || "").toLowerCase() === "yes" && (
                      <DataTable className="spr-blue-head" columns={reraColumns} rows={reraEntries} />
                    )}
                  </Section>

                  <Section title="Litigations">
                    <div className="spr-inline-summary">
                      <DisplayItem label="Any Civil/Criminal Cases" value={formatBoolean(formData.litigation)} />
                    </div>
                    {String(formData.litigation || "").toLowerCase() === "yes" ? (
                      <DataTable className="spr-red-head" columns={litigationColumns} rows={litigationEntries} />
                    ) : (
                      <div className="spr-affidavit">
                        {!isRestrictedDept && (
                          affidavitUrl ? (
                            <a href={affidavitUrl} target="_blank" rel="noreferrer">
                              Affidavit NO CASE PENDING.pdf
                            </a>
                          ) : (
                            <span className="spr-display-field">No affidavit uploaded.</span>
                          )
                        )}
                      </div>
                    )}
                  </Section>

                  <Section title="Co-Promoter Details (Land Owners - only if sale transaction is involved)">
                    <div className="spr-inline-summary">
                      <DisplayItem label="Co-Promoter Details" value={formatBoolean(formData.promoter2)} />
                    </div>
                    {String(formData.promoter2 || "").toLowerCase() === "yes" && (
                      <DataTable className="spr-magenta-head" columns={promoterColumns} rows={promoter2Entries} />
                    )}
                  </Section>
                </div>
                {dept === "verification" && (
                  <div className="spr-remarks-card">
                    <div className="spr-remarks-head">
                      <h3>Enter Remarks (Data Shortfall Remarks if any)<span>*</span></h3>
                      <span>{5000 - remarks.length}</span>
                    </div>
                    <textarea
                      className="spr-remarks-box"
                      maxLength={5000}
                      value={remarks}
                      onChange={(event) => setRemarks(event.target.value)}
                      placeholder="Maximum of 5000 Characters"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ScrutinyLayout>
  );
}