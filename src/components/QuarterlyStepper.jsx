import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuarterlyStepper.css";

const steps = [
  { id: 1, label: "Documents", path: "/quarterlyupdate" },
  { id: 2, label: "Block/Villa Details", path: "/project-blockvilla-details" },
  { id: 3, label: "Floor Details", path: "/quarterly/floor-details" },
  { id: 4, label: "Flat Details", path: "/quarterly/flat-details" },
];

const QuarterlyStepper = ({ currentStep }) => {
  const navigate = useNavigate();

  return (
    <div className="qutadocu-stepper-box">
      <div className="qutadocu-stepper-line"></div>

      <div className="qutadocu-stepper">
       {steps.map((step) => {

  const completedSteps =
    JSON.parse(localStorage.getItem("quarterlyCompletedSteps")) || [];

  const isCompleted = completedSteps.includes(step.id);
  const isActive = step.id === currentStep;

  const handleClick = () => {

    // ✅ Allow going back
    if (step.id < currentStep) {
      navigate(step.path);
      return;
    }

    // ✅ Allow if already completed before
    if (completedSteps.includes(step.id)) {
      navigate(step.path);
      return;
    }

    // ✅ Allow next step only if previous step completed
    if (completedSteps.includes(step.id - 1)) {
      navigate(step.path);
      return;
    }

    alert("Please complete previous step first.");
  };

  return (
    <div
      key={step.id}
      className="qutadocu-step"
      onClick={handleClick}
    >
      <div
        className={`qutadocu-step-circle
          ${isCompleted ? "qutadocu-completed" : ""}
          ${isActive ? "qutadocu-active" : ""}`}
      >
        {step.id}
      </div>

      <div className="qutadocu-step-label">
        {step.label}
      </div>
    </div>
  );
})}
      </div>
    </div>
  );
};

export default QuarterlyStepper;