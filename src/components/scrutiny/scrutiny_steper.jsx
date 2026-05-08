import { useLocation, useNavigate } from "react-router-dom";
import {
  OTHERTHANINDIVIDUALWIZARD_STEPS,
  WIZARD_STEPS,
} from "./scrutiny_wizardConfig";
import "../../styles/scrutiny/scrutiny_steper.css";

const normalizePromoterType = (value) => {
  const normalized = String(value || "").trim().toLowerCase();

  if (normalized === "individual") {
    return "individual";
  }

  if (
    normalized === "other" ||
    normalized === "other than individual" ||
    normalized === "otherthanindividual" ||
    normalized === "other_then_individual"
  ) {
    return "other";
  }

  return normalized || "";
};

export default function ProjectWizard({ currentStep }) {
  const navigate = useNavigate();
  const location = useLocation();

  const panNumber =
    location.state?.panNumber || sessionStorage.getItem("panNumber") || "";
  const applicationNumber =
    location.state?.applicationNumber ||
    sessionStorage.getItem("applicationNumber") ||
    "";
  const promoterType = normalizePromoterType(
    location.state?.promoterType || sessionStorage.getItem("promoterType") || ""
  );

  const wizardSteps =
    promoterType === "other"
      ? OTHERTHANINDIVIDUALWIZARD_STEPS
      : WIZARD_STEPS;

  const navigationState = {
    ...location.state,
    panNumber,
    applicationNumber,
    promoterType,
  };

  const handleStepNavigation = (path) => {
    if (panNumber) {
      sessionStorage.setItem("panNumber", panNumber);
    }

    if (applicationNumber) {
      sessionStorage.setItem("applicationNumber", applicationNumber);
    }

    if (promoterType) {
      sessionStorage.setItem("promoterType", promoterType);
    }

    navigate(path, { state: navigationState });
  };

  return (
    <div className="scrutiny-stepper-shell">
      <div className="scrutiny-stepper" role="list" aria-label="Scrutiny progress">
        {wizardSteps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <button
              type="button"
              key={step.id}
              className={`scrutiny-stepper-item ${
                isCompleted ? "scrutiny-stepper-completed" : ""
              } ${isActive ? "scrutiny-stepper-active" : ""}`}
              aria-current={isActive ? "step" : undefined}
              onClick={() => handleStepNavigation(step.path)}
            >
              <span className="scrutiny-stepper-circle">{step.id}</span>
              <span className="scrutiny-stepper-label">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}