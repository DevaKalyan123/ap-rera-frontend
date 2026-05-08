// import { useNavigate } from "react-router-dom";
// import {
//   WIZARD_STEPS,
//   OTHERTHANINDIVIDUALWIZARD_STEPS,
// } from "./wizardConfig";
// import "../styles/projectWizard.css";

// export default function ProjectWizard({ currentStep, type }) {
//   const navigate = useNavigate();

//   // ✅ ADD HERE
//   const steps =
//     type === "other"
//       ? OTHERTHANINDIVIDUALWIZARD_STEPS
//       : WIZARD_STEPS;

//   return (
//     <div className="projwizard-WIZARDDIV">
//       <div className="projwizard-stepper">
//         {/* ✅ CHANGE HERE */}
//         {steps.map((step) => {
//           const isCompleted = step.id < currentStep;
//           const isActive = step.id === currentStep;

//           return (
//             <div
//               key={step.id}
//               className={`projwizard-step-item ${
//                 isCompleted ? "projwizard-completed" : ""
//               } ${isActive ? "projwizard-active" : ""}`}
//               onClick={() => {
//                 if (isCompleted || isActive) {
//                   navigate(step.path);
//                 }
//               }}
//             >
//               <div className="projwizard-step-circle">{step.id}</div>
//               <div className="projwizard-step-label">{step.label}</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { useLocation, useNavigate } from "react-router-dom";
import { OTHERTHANINDIVIDUALWIZARD_STEPS, WIZARD_STEPS } from "./wizardConfig";
import "../styles/projectWizard.css";

const OTHER_FLOW_MAX_STEP_KEY = "otherProjectWizardMaxStep";

export default function ProjectWizard({ currentStep }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isOtherThanIndividualFlow =
    location.pathname.startsWith("/other-than-individual") ||
    location.pathname.startsWith("/othertheninduvidual");

  const steps = isOtherThanIndividualFlow
    ? OTHERTHANINDIVIDUALWIZARD_STEPS
    : WIZARD_STEPS;

  const maxUnlockedStep = isOtherThanIndividualFlow
    ? Math.max(
        Number(sessionStorage.getItem(OTHER_FLOW_MAX_STEP_KEY) || 1),
        Number(currentStep || 1)
      )
    : Number(currentStep || 1);

  if (isOtherThanIndividualFlow) {
    const storedMax = Number(sessionStorage.getItem(OTHER_FLOW_MAX_STEP_KEY) || 1);
    if (maxUnlockedStep > storedMax) {
      sessionStorage.setItem(OTHER_FLOW_MAX_STEP_KEY, String(maxUnlockedStep));
    }
  }

  const buildNavigationState = (step) => {
    const sharedState = {
      ...(location.state || {}),
      panNumber:
        location.state?.panNumber || sessionStorage.getItem("panNumber") || "",
      applicationNumber:
        location.state?.applicationNumber ||
        sessionStorage.getItem("applicationNumber") ||
        "",
      promoterType:
        location.state?.promoterType || sessionStorage.getItem("promoterType") || "",
      typeOfPromoter:
        location.state?.typeOfPromoter || sessionStorage.getItem("typeOfPromoter") || "",
    };

    if (isOtherThanIndividualFlow && step.id === 1) {
      return {
        ...sharedState,
        returnToPromoterProfile: true,
      };
    }

    return sharedState;
  };

  return (
    <div className="projwizard-WIZARDDIV">
      <div className="projwizard-stepper">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isUnlocked = isOtherThanIndividualFlow
            ? step.id <= maxUnlockedStep
            : isCompleted || isActive;

          return (
            <div
              key={step.id}
              className={`projwizard-step-item ${
                isCompleted ? "projwizard-completed" : ""
              } ${isActive ? "projwizard-active" : ""}`}
              onClick={() => {
                if (!isUnlocked) return;

                navigate(step.path, {
                  state: buildNavigationState(step),
                });
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