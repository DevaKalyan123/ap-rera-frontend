// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/AgentChangeRequestStepper.css";

// const DEFAULT_STEPS = [
//   {
//     id: 1,
//     title: "Agent Login",
//     description: "Verify PAN number with OTP",
//     path: "/agent_change_request_1"
//   },
//   {
//     id: 2,
//     title: "Change Request",
//     description: "Choose fields and upload documents",
//     path: "/Agentchangerequest2"
//   },
//   {
//     id: 3,
//     title: "Payment",
//     description: "Confirm the application fee",
//     path: "/agent-change-request-payment"
//   }
// ];

// const AgentChangeRequestStepper = ({ activeStep = 1, steps = DEFAULT_STEPS, onStepClick }) => {
//   const normalizedStep = Number.isNaN(Number(activeStep)) ? 1 : Number(activeStep);
//   const navigate = useNavigate();

//   const handleStepNavigation = (step, status) => {
//     if (typeof onStepClick === "function") {
//       onStepClick(step, status);
//       return;
//     }

//     if (status === "upcoming" || !step.path) {
//       return;
//     }

//     navigate(step.path);
//   };

//   return (
//     <div className="acr-stepper" role="list" aria-label="Agent change request progress">
//       {steps.map((step, index) => {
//         const status =
//           step.id < normalizedStep
//             ? "completed"
//             : step.id === normalizedStep
//             ? "active"
//             : "upcoming";

//         const isClickable = Boolean(
//           typeof onStepClick === "function" ||
//             (status !== "upcoming" && step.path)
//         );

//         return (
//           <React.Fragment key={`acr-step-${step.id}`}>
//             <article
//               className={`acr-step ${status} ${isClickable ? "clickable" : ""}`}
//               role="listitem"
//               tabIndex={isClickable ? 0 : -1}
//               onClick={isClickable ? () => handleStepNavigation(step, status) : undefined}
//               onKeyDown={
//                 isClickable
//                   ? (event) => {
//                       if (event.key === "Enter" || event.key === " ") {
//                         event.preventDefault();
//                         handleStepNavigation(step, status);
//                       }
//                     }
//                   : undefined
//               }
//             >
//               <div className="acr-step-circle" aria-hidden="true">
//                 {status === "completed" ? <i className="fas fa-check" /> : step.id}
//               </div>
//               <div className="acr-step-text">
//                 <span className="acr-step-title">{step.title}</span>
//                 <span className="acr-step-description">{step.description}</span>
//               </div>
//             </article>
//             {index < steps.length - 1 && (
//               <span
//                 className={`acr-step-connector ${step.id < normalizedStep ? "active" : ""}`}
//                 aria-hidden="true"
//               />
//             )}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// };

// export default AgentChangeRequestStepper;
import React from "react";
import "../styles/AgentChangeRequestStepper.css";

const DEFAULT_STEPS = [
  {
    id: 1,
    title: "Agent Login",
    description: "Verify PAN number with OTP"
  },
  {
    id: 2,
    title: "Change Request",
    description: "Choose fields and upload documents"
  },
  {
    id: 3,
    title: "Payment",
    description: "Confirm the application fee"
  }
];

const AgentChangeRequestStepper = ({ activeStep = 1, steps = DEFAULT_STEPS }) => {
  const normalizedStep = Number.isNaN(Number(activeStep)) ? 1 : Number(activeStep);

  return (
    <div className="acr-stepper" role="list" aria-label="Agent change request progress">
      {steps.map((step, index) => {
        const status =
          step.id < normalizedStep
            ? "completed"
            : step.id === normalizedStep
            ? "active"
            : "upcoming";

        return (
          <React.Fragment key={`acr-step-${step.id}`}>
            <article className={`acr-step ${status}`} role="listitem">
              <div className="acr-step-circle" aria-hidden="true">
                {status === "completed" ? <i className="fas fa-check" /> : step.id}
              </div>
              <div className="acr-step-text">
                <span className="acr-step-title">{step.title}</span>
                <span className="acr-step-description">{step.description}</span>
              </div>
            </article>
            {index < steps.length - 1 && (
              <span
                className={`acr-step-connector ${step.id < normalizedStep ? "active" : ""}`}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default AgentChangeRequestStepper;