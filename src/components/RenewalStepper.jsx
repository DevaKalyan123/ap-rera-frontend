function RenewalStepper({ step }) {

  const steps = [
    "Upload Documents",
    "Payment",
    "Receipt",
    "New Certificate"
    
  ];

  return (

    <div className="stepper">

      {steps.map((label, index) => (

        <div
          key={index}
          className={`step ${step >= index + 1 ? "active" : ""}`}
        >

          <div className="circle">
            {index + 1}
          </div>

          <p>{label}</p>

        </div>

      ))}

    </div>

  );

}

export default RenewalStepper;