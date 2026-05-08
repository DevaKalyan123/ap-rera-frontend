import "../../styles/scrutiny/scrutiny_remarks_field.css";

export default function ScrutinyRemarksField({
  id = "scrutiny-remarks",
  value = "",
  onChange,
  maxLength = 5000,
  label = "Enter Remarks (Data Shortfall Remarks if any)*",
  placeholder,
  className = "",
}) {
  const safeValue = typeof value === "string" ? value : "";
  const remainingCharacters = Math.max(0, maxLength - safeValue.length);

  const handleChange = (event) => {
    const nextValue = event.target.value.slice(0, maxLength);

    if (onChange) {
      onChange(nextValue);
    }
  };

  return (
    <section className={`scrutiny-remarks-card ${className}`.trim()}>
      <div className="scrutiny-remarks-head">
        <h3>{label}</h3>
        <span>{remainingCharacters}</span>
      </div>

      <textarea
        id={id}
        className="scrutiny-remarks-box"
        maxLength={maxLength}
        value={safeValue}
        onChange={handleChange}
        placeholder={placeholder || `Maximum of ${maxLength} Characters`}
      />
    </section>
  );
}   