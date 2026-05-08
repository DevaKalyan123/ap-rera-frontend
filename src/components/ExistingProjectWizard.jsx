import { useNavigate, useParams, useLocation } from "react-router-dom";

import "../styles/projectWizard2.css";
import { EXISTINGWIZARD_STEPS } from "./ExistingwizardConfig";

export default function ExistingProjectWizard({ currentStep }) {
  const navigate = useNavigate();
  const { id } = useParams();
const location = useLocation();

// ✅ fallback if id not in URL
const appId = id || location.state?.id;

  return (
    <div className="projwizard-WIZARDDIV">
      <div className="projwizard-stepper">
        {EXISTINGWIZARD_STEPS.map((step) => {
          // ✅ completed = steps BEFORE currentStep
          const isCompleted = step.id < currentStep;

          // ✅ active = current step only
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className={`projwizard-step-item ${
                isCompleted ? "projwizard-completed" : ""
              } ${isActive ? "projwizard-active" : ""}`}
              onClick={() => {
  if (isCompleted || isActive) {
    let path = step.path;

    // 🔥 FIX: replace :id with real value
    if (path.includes(":id")) {
      path = path.replace(":id", appId);
    }

    navigate(path);
  }
}}
            >
              <div className="projwizard-step-circle">{step.id}</div>
              <div className="projwizard-step-label">{step.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
