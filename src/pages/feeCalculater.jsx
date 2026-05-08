import React, { useState } from "react";
import "../styles/feeCalculater.css";

/* 🔹 helper: force 2 decimals for inputs */
const formatToTwoDecimals = (value, setter) => {
  if (value === "" || isNaN(value)) {
    setter("");
    return;
  }
  setter(parseFloat(value).toFixed(2));
};

/* 🔹 helper: force 2 decimals for calculations */
const round2 = (num) => Number(parseFloat(num || 0).toFixed(2));

const FeeCalculator = () => {
  const [projectType, setProjectType] = useState("");

  // 🔹 input states
  const [siteArea, setSiteArea] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [height, setHeight] = useState("");

  const [resBuiltUp, setResBuiltUp] = useState("");
  const [comBuiltUp, setComBuiltUp] = useState("");

  const [planApprovalDate, setPlanApprovalDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  // 🔹 fee states
  const [baseFee, setBaseFee] = useState(0);
  const [lateFee, setLateFee] = useState(0);
  const [fee, setFee] = useState(null);

  // 🔹 calculation logic (as per ANNEXURE)
  const calculateFee = () => {
    let rate = 0;
    let max = 0;
    let amount = 0;

    const site = parseFloat(siteArea || 0);
    const builtup = parseFloat(builtUpArea || 0);
    const h = parseFloat(height || 0);
    const isMultistoried = h >= 18;

    /* ================= LAYOUTS FOR PLOTS & BUILDINGS ================= */
    if (projectType === "PlotsBuildings") {
      const resBUA = parseFloat(resBuiltUp || 0);
      const comBUA = parseFloat(comBuiltUp || 0);

      if (!site || site <= 0) {
        alert("Please enter valid Site Area (Acre)");
        return;
      }
      if (!resBUA || resBUA <= 0) {
        alert("Please enter Residential Built-up area");
        return;
      }

      amount =
        site * 5000 +
        resBUA * 15 +
        (comBUA > 0 ? comBUA * 20 : 0);
    }

    /* ================= LAYOUT FOR PLOTS ================= */
    else if (projectType === "Plots") {
      amount = Math.min(Math.ceil(site) * 5000, 10000000);
    }

    /* ================= RESIDENTIAL ================= */
    else if (projectType === "Residential") {
      if (site <= 1000) {
        rate = 5;
        max = 200000;
      } else if (site <= 4000 && !isMultistoried) {
        rate = 10;
        max = 500000;
      } else {
        rate = 15;
        max = 1000000;
      }
      amount = Math.min(builtup * rate, max);
    }

    /* ================= COMMERCIAL & MIXED ================= */
    else if (projectType === "Commercial" || projectType === "Mixed") {
      if (site <= 1000) {
        rate = 5;
        max = 200000;
      } else if (site <= 4000 && !isMultistoried) {
        rate = 10;
        max = 500000;
      } else {
        rate = 20;
        max = 1200000;
      }
      amount = Math.min(builtup * rate, max);
    }

    /* ================= LATE FEE CALCULATION ================= */
    let calculatedLateFee = 0;

    if (planApprovalDate && paymentDate) {
      const diffDays = Math.ceil(
        (new Date(paymentDate) - new Date(planApprovalDate)) /
          (1000 * 60 * 60 * 24)
      );

      if (diffDays <= 45) calculatedLateFee = 0;
      else if (diffDays <= 75) calculatedLateFee = amount * 0.25;
      else if (diffDays <= 105) calculatedLateFee = amount * 0.5;
      else if (diffDays <= 135) calculatedLateFee = amount * 1.0;
      else if (diffDays <= 195) calculatedLateFee = amount * 1.5;
      else if (diffDays <= 255) calculatedLateFee = amount * 2.0;
      else calculatedLateFee = amount * 3.0;
    }

    /* 🔹 final state updates (FORCE 2 DECIMALS) */
    const base = round2(amount);
    const late = round2(calculatedLateFee);
    const total = round2(base + late);

    setBaseFee(base);
    setLateFee(late);
    setFee(total);
  };

  return (
    <div className="fc-page-wrapper">
      <div className="fc-content-card">

        {/* Breadcrumb */}
        <div className="fc-breadcrumb-bar">
          You are here : <span>Home</span> / <span>Registration</span> /{" "}
          <span className="fc-active">Fee Calculator</span>
        </div>

        <h2 className="fc-page-title">Fee Calculator for Project Registration</h2>

        <form className="fc-fee-form">

          {/* PROJECT TYPE */}
          <div className="fc-form-row">
            <label>
              Project Type<span className="fc-required">*</span>
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Mixed">Mixed Development</option>
              <option value="Plots">Layout for Plots</option>
              <option value="PlotsBuildings">
                Layouts for Plots & Buildings
              </option>
            </select>
          </div>

          {/* DATES */}
          <div className="fc-form-row">
            <label>
              Plan Approval Date<span className="fc-required">*</span>
            </label>
            <input
              type="date"
              placeholder="Plan Approval Date"
              value={planApprovalDate}
              onChange={(e) => setPlanApprovalDate(e.target.value)}
            />
          </div>
          <div className="fc-form-row">
            <label>
              Date of Payment for Registration
              <span className="fc-required">*</span>
            </label>
            <input
              type="date"
              placeholder="Date of Payment for Registration"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>

          {/* SITE AREA */}
          {(projectType === "" ||
            projectType === "Residential" ||
            projectType === "Commercial" ||
            projectType === "Mixed") && (
            <div className="fc-form-row">
              <label>
                Site Area<span className="fc-required">*</span> (In Sq.m)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Site Area (In Acre)"
                value={siteArea}
                onChange={(e) => setSiteArea(e.target.value)}
                onBlur={() => formatToTwoDecimals(siteArea, setSiteArea)}
              />
            </div>
          )}

          {(projectType === "Plots" || projectType === "PlotsBuildings") && (
            <div className="fc-form-row">
              <label>
                Site Area<span className="fc-required">*</span> (Acre)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter site area "
                value={siteArea}
                onChange={(e) => setSiteArea(e.target.value)}
                onBlur={() => formatToTwoDecimals(siteArea, setSiteArea)}
              />
            </div>
          )}

          {/* ===== LAYOUTS FOR PLOTS & BUILDINGS ===== */}
          {projectType === "PlotsBuildings" && (
            <>
              <div className="fc-form-row">
                <label>
                  Residential Built-up area
                  <br />
                  (including stilt area)
                  <span className="fc-required">*</span> (In Sq.m)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Residential Built-up Area"
                  value={resBuiltUp}
                  onChange={(e) => setResBuiltUp(e.target.value)}
                  onBlur={() => formatToTwoDecimals(resBuiltUp, setResBuiltUp)}
                />
              </div>

              <div className="fc-form-row">
                <label>
                  Commercial Built-up area
                  <br />
                  (including stilt area) (Optional) (In Sq.m)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Commercial Built-up Area (Optional)"
                  value={comBuiltUp}
                  onChange={(e) => setComBuiltUp(e.target.value)}
                  onBlur={() => formatToTwoDecimals(comBuiltUp, setComBuiltUp)}
                />
              </div>
            </>
          )}

          {/* HEIGHT */}
          {(projectType === "Residential" ||
            projectType === "Commercial" ||
            projectType === "Mixed") &&
            siteArea > 1000 &&
            siteArea <= 4000 && (
              <div className="fc-form-row">
                <label>
                  Building Height (In Mtrs)
                  <span className="fc-required">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Building Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  onBlur={() => formatToTwoDecimals(height, setHeight)}
                />
              </div>
            )}

          {/* BUILT-UP AREA */}
          {(projectType === "" ||
            projectType === "Residential" ||
            projectType === "Commercial" ||
            projectType === "Mixed") && (
            <div className="fc-form-row">
              <label>
                Total Built-up area of all the Floors
                <span className="fc-required">*</span> (In Sq.m)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Total Built-up area of all the Floors"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(e.target.value)}
                onBlur={() => formatToTwoDecimals(builtUpArea, setBuiltUpArea)}
              />
            </div>
          )}

          {/* CALCULATE */}
          <div className="fc-form-row fc-last-row">
            <button
              type="button"
              className="fc-calculate-btn"
              onClick={calculateFee}
            >
              Calculate
            </button>
          </div>

          {/* RESULT */}
          {fee !== null && (
            <div className="fc-fee-summary">
              <div>
                <strong>Project Registration Fee</strong>
                <span>₹ {baseFee.toFixed(2)}</span>
              </div>
              <div>
                <strong>Late Registration Fee</strong>
                <span>₹ {lateFee.toFixed(2)}</span>
              </div>
              <div className="fc-total">
                <strong>Total Amount</strong>
                <span>₹ {fee.toFixed(2)}</span>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

export default FeeCalculator;