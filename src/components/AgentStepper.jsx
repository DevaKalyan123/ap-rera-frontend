import "../styles/CommonStepper.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const STORAGE_KEY = "agent_stepper_max_step";

const AgentStepper = ({
  currentStep,
  applicationId,
  organisationId,
  panCardNumber
}) => {

  const navigate = useNavigate();

  const steps = [
    { label: "Agent Detail", path: "/AgentDetails" },
    { label: "Upload Documents", path: "/AgentUploadDocumentOtherthan" },
    { label: "Preview", path: "/preview-other" },
    { label: "Payment", path: "/agent-paymentpage" },
    { label: "Acknowledgement", path: "/acknowledgement" },
  ];

  /* Load max step from localStorage */

  const [maxStep, setMaxStep] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });

  /* Update max step when user moves forward */

  useEffect(() => {

    if (currentStep > maxStep) {

      localStorage.setItem(STORAGE_KEY, currentStep);

      setMaxStep(currentStep);

    }

  }, [currentStep, maxStep]);



  /* Step click navigation */

  const handleStepClick = (index) => {

    /* allow navigation only to visited steps */

    if (index <= maxStep) {

      navigate(steps[index].path, {
        state: {
          application_id: applicationId,
          organisation_id: organisationId,
          pan_card_number: panCardNumber,
        },
      });

    }

  };



  return (

    <div className="common-stepper">

      {steps.map((step, i) => {

        const isCompleted = i < maxStep;     
        const isActive = i === currentStep;  
        const isVisited = i <= maxStep;      

        return (

          <div
            key={i}
            className={`common-step
              ${isCompleted ? "completed" : ""}
              ${isActive ? "active" : ""}
              ${!isCompleted && !isActive && isVisited ? "visited" : ""}
            `}
            onClick={() => handleStepClick(i)}
            style={{
              cursor: isVisited ? "pointer" : "not-allowed",
              opacity: isVisited ? 1 : 0.5,
            }}
          >

            <div className="circle">

              {isCompleted ? "✓" : i + 1}

            </div>

            <span>{step.label}</span>

          </div>

        );

      })}

    </div>

  );

};

export default AgentStepper;