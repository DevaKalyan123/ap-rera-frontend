import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet, apiPost, BASE_URL } from "../../api/api";
import ScrutinyPageHeader from "../../components/scrutiny/ScrutinyPageHeader";
import ProjectWizard from "../../components/scrutiny/scrutiny_steper";
import ScrutinyRemarksField from "../../components/scrutiny/ScrutinyRemarksField";
import ScrutinyLayout from "../../components/scrutiny/ScrutinyLayout";
import "../../styles/projectWizard.css";
import "../../styles/scrutiny/scrutiny_projectregistation_3.css";
import MapModal from "../../components/MapModal";


const EXTERNAL_WORK_LABELS = [
  ["roads", "Roads"],
  ["water_supply", "Water Supply"],
  ["sewage_and_drainage_system", "Sewage and Drainage System"],
  ["electricity_supply_transformer_sub_station", "Electricity Supply Transformer/Sub Station"],
  ["solid_waste_management_and_disposal", "Solid Waste Management And Disposal"],
  ["fire_fighting_facility", "Fire Fighting Facility"],
  ["drinking_water_facility", "Drinking Water Facility"],
  ["emergency_evacuation_service", "Emergency Evacuation Service"],
  ["use_of_renewable_energy", "Use of Renewable Energy"],
];

const CATEGORY_CONFIG = [
  { key: "Plots", label: "Plots", legendClass: "legal" },
  { key: "Apartments_Flats", label: "Apartment", legendClass: "audit" },
  { key: "Commercial", label: "Engineering", legendClass: "eng" },
  { key: "Villas", label: "Planning", legendClass: "plan" },
];

const SUMMARY_HEADERS = [
  "Promoter Name",
  "Project Name",
  "Project Address",
  "First Transaction Date",
  "No Of Days From Proceeding",
  "Scrutiny Count",
];

const HEADER_LABELS = {
  block_name: "Block Name",
  building_name: "Building Name",
  building_type: "Building Type",
  total_built_up_area_of_all_floors_of_the_block_in_sqmts: "Built-Up Area Of All Floors Of The Block In Sqmts",
  total_built_up_area: "Built-Up Area Of All Floors Of The Block In Sqmts",
  floor_number: "Floor Number",
  unit_number: "Unit Number",
  flat_number: "Flat Number",
  type: "Type",
  carpet_area_of_each_unit_in_sqmts: "Carpet Area Of Each Unit In Sqmts",
  carpet_area: "Carpet Area Of Each Unit In Sqmts",
  outer_wall_area_in_sqmts: "Outer Wall Area In Sqmts",
  outer_wall_area: "Outer Wall Area In Sqmts",
  area_of_exclusive_open_terrace_balcony_verandah_in_sqmts: "Area Of Exclusive Open Terrace/Balcony/Verandah In Sqmts",
  area_of_exclusive_open_terrace_balcony_verandah: "Area Of Exclusive Open Terrace/Balcony/Verandah In Sqmts",
  area_of_exclusive_open_terrace: "Area Of Exclusive Open Terrace/Balcony/Verandah In Sqmts",
  area_of_enclosed_balcony_verandah_in_sqmts: "Area Of Enclosed Balcony/Verandah In Sqmts",
  area_of_enclosed_balcony_verandah: "Area Of Enclosed Balcony/Verandah In Sqmts",
  area_of_enclosed_balcony: "Area Of Enclosed Balcony/Verandah In Sqmts",
  area_of_exclusive_open_parking_in_sqmts: "Area Of Exclusive Open Parking In Sqmts",
  share_of_common_areas_in_sqmts: "Share Of Common Areas In Sqmts",
  share_of_common_areas: "Share Of Common Areas In Sqmts",
  parking_area_of_each_flat_in_sqmts: "Parking Area Of Each Flat In Sqmts",
  parking_area: "Parking Area Of Each Flat In Sqmts",
  total_area_of_each_flat_in_sqmts: "Total Area Of Each Flat In Sqmts",
  total_area: "Total Area Of Each Flat In Sqmts",
};

const normalizeObject = (value) => {
  if (!value) return {};
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return {};
    }
  }
  return typeof value === "object" ? value : {};
};

const normalizeArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

const prettifyKey = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "N/A";
  const normalized = raw.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  if (HEADER_LABELS[normalized]) return HEADER_LABELS[normalized];
  return raw
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const toDisplayValue = (value) => {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

const pickFirst = (...values) => values.find((value) => value !== null && value !== undefined && value !== "") || "N/A";

const normalizeDevelopmentDetails = (input) => {
  const source = normalizeObject(input);
  return {
    Plots: normalizeObject(source.Plots || source.plots),
    Apartments_Flats: normalizeObject(
      source.Apartments_Flats || source.apartments_flats || source.apartmentsFlats
    ),
    Villas: normalizeObject(source.Villas || source.villas),
    Commercial: normalizeObject(source.Commercial || source.commercial),
  };
};

const getRowsFromSection = (section) => {
  const rows = normalizeArray(section?.rows);
  return rows.filter((row) => row && typeof row === "object");
};

const buildExternalWorks = (input) => {
  const source = normalizeObject(input);
  return EXTERNAL_WORK_LABELS.map(([key, label]) => ({
    key,
    label,
    value: source[key] ?? source[label] ?? 0,
  }));
};

const buildSummary = ({ projectPreview, developmentData, applicationNumber, panNumber }) => {
  const projectDetails = projectPreview?.project_details || {};
  const promoterDetails = projectPreview?.promoter_details || {};

  return {
    promoterName: pickFirst(promoterDetails.promoter_name, promoterDetails.name, promoterDetails.organization_name, panNumber),
    projectName: pickFirst(projectDetails.project_name, projectDetails.name, developmentData?.project_id),
    projectAddress: pickFirst(projectDetails.project_address, projectDetails.address, projectDetails.registered_office_address),
    firstTransactionDate: pickFirst(projectDetails.first_transaction_date, projectDetails.transaction_date, projectDetails.created_at),
    proceedingDays: pickFirst(projectDetails.days_from_proceeding, projectDetails.no_of_days_from_proceeding, 20),
    scrutinyCount: pickFirst(projectDetails.scrutiny_count, 1),
    applicationNumber,
  };
};

const useProjectPreview = (applicationNumber, panNumber) => {
  const [projectPreview, setProjectPreview] = useState(null);

  useEffect(() => {
    const fetchPreview = async () => {
      if (!applicationNumber || !panNumber) return;
      try {
        let response = await apiPost("/api/project/preview", {
          applicationNumber,
          panNumber,
        });

        if (!response?.data?.project_details) {
          response = await apiPost("/api/othertheninduvidual/project/preview", {
            applicationNumber,
            panNumber,
          });
        }

        setProjectPreview(response?.data || null);
      } catch (error) {
        console.error("Failed to fetch project preview", error);
        setProjectPreview(null);
      }
    };

    fetchPreview();
  }, [applicationNumber, panNumber]);

  return projectPreview;
};



const DataTable = ({ headers, rows, tableClassName = "" }) => (
  <div className="vdd-table-wrap">
    <table className={`vdd-data-table ${tableClassName}`.trim()}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id || row._id || index}>
            {headers.map((header) => (
              <td key={`${index}-${header}`}>{toDisplayValue(row[header])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function ScrutinyProjectRegistrationThree() {
  const navigate = useNavigate();
  const location = useLocation();

  const applicationNumber =
    location.state?.applicationNumber || sessionStorage.getItem("applicationNumber") || "";
  const panNumber = location.state?.panNumber || sessionStorage.getItem("panNumber") || "";
  const promoterTypeRaw = location.state?.promoterType || sessionStorage.getItem("promoterType") || "";
  const promoterType = String(promoterTypeRaw).toLowerCase() === "other" ? "other" : "individual";

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [developmentData, setDevelopmentData] = useState(null);
  const [remarks, setRemarks] = useState("");
  const projectPreview = useProjectPreview(applicationNumber, panNumber);
  const [showMap, setShowMap] = useState(false);
  const [geoData, setGeoData] = useState(null);

  const fetchGeoData = async () => {
  try {
    const res = await fetch(
  `${BASE_URL}/api/verify/${applicationNumber}`
);

    const data = await res.json();

    console.log("API Response:", data);

    // ✅ Handle backend error
    if (data.error) {
      alert(data.error);       // show message
      setGeoData(null);        // clear data
      setShowMap(false);       // ❌ don't open map
      return;
    }

    // ✅ Validate lat/lng
    if (!data.lat || !data.lng) {
      console.error("Invalid coordinates");
      setShowMap(false);
      return;
    }

    // ✅ Safe to use
    setGeoData(data);
    setShowMap(true);

  } catch (err) {
    console.error("Error fetching geo data", err);
    setShowMap(false);
  }
};

  useEffect(() => {
    if (applicationNumber) sessionStorage.setItem("applicationNumber", applicationNumber);
    if (panNumber) sessionStorage.setItem("panNumber", panNumber);
    if (promoterTypeRaw) sessionStorage.setItem("promoterType", promoterTypeRaw);
  }, [applicationNumber, panNumber, promoterTypeRaw]);

  useEffect(() => {
    const fetchDevelopmentDetails = async () => {
      if (!applicationNumber || !panNumber) {
        setErrorMessage("Application number or PAN number is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setErrorMessage("");

        const response = await apiGet(
          `/api/development-details?application_number=${applicationNumber}&pan_number=${panNumber}`
        );

        const apiData = response?.data?.data || response?.data || response;
        if (!apiData || Object.keys(apiData).length === 0 || (!apiData.id && !apiData.development_details)) {
          setDevelopmentData(null);
          setErrorMessage("No development details found for this application.");
          return;
        }

        setDevelopmentData({
          ...apiData,
          development_details: normalizeDevelopmentDetails(apiData.development_details),
          external_development_work: normalizeObject(apiData.external_development_work),
          other_external_works: normalizeArray(apiData.other_external_works),
        });
      } catch (error) {
        console.error("Failed to fetch development details", error);
        setDevelopmentData(null);
        setErrorMessage("Unable to fetch development details from backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopmentDetails();
  }, [applicationNumber, panNumber]);

  const summary = useMemo(
    () => buildSummary({ projectPreview, developmentData, applicationNumber, panNumber }),
    [projectPreview, developmentData, applicationNumber, panNumber]
  );

  const developmentDetails = useMemo(
    () => normalizeDevelopmentDetails(developmentData?.development_details),
    [developmentData]
  );

  const categorySections = useMemo(
    () =>
      CATEGORY_CONFIG.map((item) => {
        const details = developmentDetails[item.key];
        const rows = getRowsFromSection(details);
        return {
          ...item,
          details,
          rows,
          enabled: rows.length > 0 || Object.keys(details || {}).length > 0,
        };
      }),
    [developmentDetails]
  );

  const activeCategory = useMemo(() => {
    return categorySections.find((section) => section.rows.length > 0) || categorySections.find((section) => section.enabled) || null;
  }, [categorySections]);

  const unitRows = activeCategory?.rows || [];
  const unitHeaders = useMemo(() => {
    const firstRow = unitRows[0] || {};
    return Object.keys(firstRow);
  }, [unitRows]);

  const externalDevelopmentWorks = useMemo(
    () => buildExternalWorks(developmentData?.external_development_work),
    [developmentData]
  );

  const otherExternalWorks = useMemo(
    () => normalizeArray(developmentData?.other_external_works),
    [developmentData]
  );

  const handleContinue = () => {
    navigate("/scrutiny/project-registration_4", {
      state: {
        panNumber,
        applicationNumber,
        promoterType,
      },
    });
  };

  return (
    <ScrutinyLayout>
      <div className="vdd-page-shell">
        <ScrutinyPageHeader />

        <ProjectWizard currentStep={3} />

        <div className="projwizard-page view-development-details-page">
          <div className="projwizard-card view-development-details-card">
            <div className="projwizard-form-body vdd-body">
              {loading && <div className="vdd-message-box">Loading development details...</div>}
              {!loading && errorMessage && <div className="vdd-message-box">{errorMessage}</div>}

              {!loading && !errorMessage && developmentData && (
                <>
                  <DataTable
                    tableClassName="vdd-summary-table"
                    headers={SUMMARY_HEADERS}
                    rows={[
                      {
                        "Promoter Name": summary.promoterName,
                        "Project Name": summary.projectName,
                        "Project Address": summary.projectAddress,
                        "First Transaction Date": summary.firstTransactionDate,
                        "No Of Days From Proceeding": summary.proceedingDays,
                        "Scrutiny Count": summary.scrutinyCount,
                      },
                    ]}
                  />

                  <div className="vdd-legend-row">
                    {categorySections.map((section) => (
                      <div className="vdd-legend-item" key={section.key}>
                        <span className={`vdd-legend-box ${section.legendClass}`}></span>
                        <span>{section.label}</span>
                      </div>
                    ))}
                  </div>

                  <section className="vdd-section-block">
                    <h3 className="vdd-section-title">Development Details</h3>
                    <div className="vdd-section-divider"></div>

                    <div className="vdd-meta-grid">
                      <div className="vdd-meta-item">
                        <span className="vdd-meta-label">Building Type</span>
                        <span className="vdd-meta-value">{activeCategory?.label || "N/A"}</span>
                      </div>
                      <div className="vdd-meta-item">
                        <span className="vdd-meta-label">{activeCategory?.label || "Section"}</span>
                        <span className="vdd-meta-value">
                          {activeCategory?.details?.no_plots || activeCategory?.details?.no_blocks || "N/A"}
                        </span>
                      </div>
                      <div className="vdd-meta-item">
                        <span className="vdd-meta-label">Total No of Blocks</span>
                        <span className="vdd-meta-value">{activeCategory?.details?.no_blocks || unitRows.length || "N/A"}</span>
                      </div>
                    </div>

                    {unitRows.length > 0 ? (
                      <div className="vdd-table-wrap vdd-units-wrap">
                        <table className="vdd-data-table vdd-units-table">
                          <thead>
                            <tr>
                              {unitHeaders.map((header) => (
                                <th key={header}>{prettifyKey(header)}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {unitRows.map((row, index) => (
                              <tr key={row.id || row._id || index}>
                                {unitHeaders.map((header) => (
                                  <td key={`${index}-${header}`}>{toDisplayValue(row?.[header])}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="vdd-message-box">No Excel row details available for the selected development section.</div>
                    )}
                  </section>

                  <section className="vdd-section-block">
                    <h3 className="vdd-section-title">External Development Work</h3>
                    <div className="vdd-section-divider"></div>

                    <div className="vdd-table-wrap">
                      <table className="vdd-data-table vdd-external-table">
                        <thead>
                          <tr>
                            <th>External Development work Type</th>
                            <th>% of Work Completed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {externalDevelopmentWorks.map((item) => (
                            <tr key={item.key}>
                              <td>{item.label}</td>
                              <td>{toDisplayValue(item.value)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="vdd-section-block vdd-other-block">
                    <h3 className="vdd-section-title">Other External Development Works</h3>
                    <div className="vdd-section-divider"></div>

                    {otherExternalWorks.length > 0 ? (
                      <div className="vdd-table-wrap">
                        <table className="vdd-data-table vdd-external-table">
                          <thead>
                            <tr>
                              <th>Work Description</th>
                              <th>Work Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {otherExternalWorks.map((item, index) => (
                              <tr key={item.id || index}>
                                <td>{toDisplayValue(item.description)}</td>
                                <td>{toDisplayValue(item.type)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="vdd-other-empty">Other External Development Works details not available</p>
                    )}
                  </section>
                  {/* ================= GEO LOCATION ================= */}
<section className="vdd-section-block">
  <h3 className="vdd-section-title">Geo Location Verification</h3>
  <div className="vdd-section-divider"></div>

  <button onClick={fetchGeoData}>
    View Map
  </button>

  {geoData && (
    <>
      <p><b>Latitude:</b> {geoData.lat}</p>
      <p><b>Longitude:</b> {geoData.lng}</p>

     {showMap && geoData && (
  <MapModal 
  key={`${geoData.lat}-${geoData.lng}-${geoData.img_lat}-${geoData.img_lng}`}
  lat={geoData.lat} 
  lng={geoData.lng} 
  imgLat={geoData.img_lat} 
  imgLng={geoData.img_lng}
/>
)}

  <div style={{ marginTop: "10px" }}>
    <p>
      <b>Distance:</b>{" "}
      {geoData.distance_km
        ? geoData.distance_km.toFixed(2) + " km"
        : "N/A"}
    </p>

    <p>
      <b>Status:</b>{" "}
      <span
        style={{
          color: geoData.location_valid ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {geoData.location_valid
          ? "VALID (Within 500m)"
          : "INVALID (Too far / Missing)"}
      </span>
    </p>
  </div>


{geoData?.note && (
  <p style={{ color: "orange" }}>
    ⚠️ {geoData.note}
  </p>
)}
      <h4>Site Images</h4>
      <div style={{ display: "flex", gap: "10px" }}>
        {geoData.images?.map((img, i) => (
          <div key={i}>
            {img.url && (
  <img
  src={`${BASE_URL}${img.url}`}
  width="120"
/>
)}
            <p>{img.date}</p>
          </div>
        ))}
      </div>
    </>
  )}
</section>

                  <ScrutinyRemarksField
                    id="scrutiny-development-remarks"
                    value={remarks}
                    onChange={setRemarks}
                  />

                  <div className="projwizard-save-container">
                    <button className="projwizard-save-btn" onClick={handleContinue}>
                      Continue To Next Page
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrutinyLayout>
  );
}