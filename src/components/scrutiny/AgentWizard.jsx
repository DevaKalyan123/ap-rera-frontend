import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/scrutiny/scrutiny_steper.css";

export const AGENT_WIZARD_STEPS = [
  { id: 1, label: "Agent Profile", path: "/agent-scrutiny/registration_1" },
  { id: 2, label: "Upload Documents", path: "/agent-scrutiny/registration_2" },
  { id: 3, label: "Action", path: "/agent-scrutiny/registration_action" }
];

export default function AgentWizard({ currentStep }) {
  const navigate = useNavigate();
  const location = useLocation();

  const applicationNumber = location.state?.applicationNumber || sessionStorage.getItem("agentApplicationNumber") || "";
  const agentType = location.state?.agentType || sessionStorage.getItem("agentType") || "";

  const navigationState = {
    ...location.state,
    applicationNumber,
    agentType,
  };

  const handleStepNavigation = (path) => {
    if (applicationNumber) {
      sessionStorage.setItem("agentApplicationNumber", applicationNumber);
    }
    if (agentType) {
      sessionStorage.setItem("agentType", agentType);
    }
    navigate(path, { state: navigationState });
  };

  return (
    <div className="scrutiny-stepper-shell">
      <div className="scrutiny-stepper" role="list" aria-label="Scrutiny progress">
        {AGENT_WIZARD_STEPS.map((step) => {
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
