import React, { useState } from "react";

function ExemptionFileUpload() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    baNumber: "",
  });

  const [files, setFiles] = useState({
    plan: null,
    requestLetter: null,
    landDocument: null,
    advocateDoc: null,
  });

  const [errors, setErrors] = useState({});
  const [resetKey, setResetKey] = useState(0);

  const validate = () => {
    let err = {};

    // Name
    if (!/^[A-Za-z ]+$/.test(form.name)) {
      err.name = "Name should contain only alphabets";
    }

   if (!/^[6-9]\d{9}$/.test(form.mobile)) {
  err.mobile = "Mobile must start with 6, 7, 8, or 9 and be exactly 10 digits";
}

    // Email
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      err.email = "Enter valid email";
    }

    // Address
    if (!form.address.trim()) {
      err.address = "Address is required";
    }

   
    // ✅ File validations (PDF only)
    Object.keys(files).forEach((key) => {
      if (!files[key]) {
        err[key] = "File is required";
      } else if (files[key].type !== "application/pdf") {
        err[key] = "Only PDF files allowed";
      }
    });

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
  if (!/^[A-Za-z ]*$/.test(value)) {
    setErrors({ ...errors, name: "Name should contain only alphabets" });
    return;
  } else {
    setErrors({ ...errors, name: "" });
  }
}if (name === "mobile") {

  // allow only digits
  if (!/^\d*$/.test(value)) return;

  // max 10 digits
  if (value.length > 10) return;

  // 🚨 FIRST DIGIT MUST BE 6-9
  if (value.length === 1 && !/[6-9]/.test(value)) {
    setErrors({ ...errors, mobile: "Mobile must start with 6, 7, 8, or 9" });
    return; // ❌ block typing
  }

  // ✅ valid input → clear error
  if (/^[6-9]\d*$/.test(value)) {
    setErrors({ ...errors, mobile: "" });
  }
}

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ File handler (ALL files visible but only PDF accepted)
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allow selection of any file, but validate here
    if (file.type !== "application/pdf") {
      setErrors({ ...errors, [field]: "Only PDF allowed" });
      return;
    }

    setFiles({ ...files, [field]: file });
    setErrors({ ...errors, [field]: "" });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const formData = new FormData();

    // 🔹 Match backend field names
    formData.append("name", form.name);
    formData.append("mobile_no", form.mobile);
    formData.append("email", form.email);
    formData.append("address", form.address);
    formData.append("ba_number", form.baNumber);

    // 🔹 FILE KEYS MUST MATCH BACKEND
    formData.append("plan_proceedings", files.plan);
    formData.append("request_letter", files.requestLetter);
    formData.append("land_document", files.landDocument);
    formData.append("advocate_document", files.advocateDoc);

    const response = await fetch("https://7zgjxth4-5056.inc1.devtunnels.ms/project-exemption/create", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      alert("Data inserted successfully ✅");

      // Reset form
      setForm({
        name: "",
        mobile: "",
        email: "",
        address: "",
        baNumber: "",
      });

      setFiles({
        plan: null,
        requestLetter: null,
        landDocument: null,
        advocateDoc: null,
      });

      setErrors({});
      setResetKey(prev => prev + 1);

    } else {
      alert("Error: " + result.error);
    }

  } catch (error) {
    console.error(error);
    alert("API Error ❌");
  }
};
  return (
    <div className="container">
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        
        {/* Existing Fields */}
 <div className="form-row">
  <label>Name</label>

  <div className="input-group">
    <input
      type="text"
      name="name"
      placeholder="Enter Name"
      value={form.name}
      onChange={handleChange}
    />
    <span className="error">{errors.name}</span>
  </div>
</div>

<div className="form-row">
  <label>Mobile</label>

  <div className="input-group">
    <input
      type="text"
      name="mobile"
      value={form.mobile}
      placeholder="Enter Mobile number"
      onChange={handleChange}
    />
    <span className="error">{errors.mobile}</span>
  </div>
</div>

<div className="form-row">
  <label>EMail</label>

  <div className="input-group">
    <input
      type="text"
      name="email"
      value={form.email}
      placeholder="Enter Email"
      onChange={handleChange}
    />
    <span className="error">{errors.email}</span>
  </div>
</div>

<div className="form-row">
  <label>Address</label>

  <div className="input-group">
    <input
      type="text"
      name="address"
      value={form.address}
      placeholder="Enter Address"
      onChange={handleChange}
    />
    <span className="error">{errors.address}</span>
  </div>
</div>

<div className="form-row">
  <label>BA Number</label>

  <div className="input-group">
    <input
      type="text"
      name="baNumber"
      value={form.baNumber}
      placeholder="Enter BA-Number"
      onChange={handleChange}
    />
    <span className="error">{errors.baNumber}</span>
  </div>
</div>

        {/* ✅ File Uploads */}

        <div className="form-row">
  <label>Plan & Proceedings</label>

  <div className="input-group">
    <input
      key={resetKey}
      type="file"
      onChange={(e) => handleFileChange(e, "plan")}
    />
    <span className="error">{errors.plan}</span>
  </div>
</div>

        <div className="form-row">
  <label>Request Letter</label>
  <div className="input-group">
    <input key={resetKey} type="file"
      onChange={(e) => handleFileChange(e, "requestLetter")} />
    <span className="error">{errors.requestLetter}</span>
  </div>
</div>

<div className="form-row">
  <label>Land Document</label>
  <div className="input-group">
    <input key={resetKey} type="file"
      onChange={(e) => handleFileChange(e, "landDocument")} />
    <span className="error">{errors.landDocument}</span>
  </div>
</div>

<div className="form-row">
  <label>Advocate (₹100 Stamp Paper)</label>
  <div className="input-group">
    <input key={resetKey} type="file"
      onChange={(e) => handleFileChange(e, "advocateDoc")} />
    <span className="error">{errors.advocateDoc}</span>
  </div>
</div>

       <div className="button-group">
  <button type="submit">Submit</button>
</div>
      </form>

      <style>{`
  body {
    background: linear-gradient(135deg, #74ebd5, #9face6);
    font-family: 'Segoe UI', sans-serif;
  }
.container {
  width: 700px;
  max-width: 90%;
  margin: 60px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  transition: 0.3s;
}

  .container:hover {
    transform: translateY(-5px);
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .form-group {
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #444;
    font-weight: 600;
  }

  input, textarea {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 14px;
    transition: 0.3s;
  }

  input:focus, textarea:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0,123,255,0.3);
  }

  textarea {
    resize: none;
    height: 70px;
  }

  input[type="file"] {
    padding: 8px;
    background: #f8f9fa;
    border: 1px dashed #ccc;
    cursor: pointer;
  }

  input[type="file"]:hover {
    background: #eef3ff;
  }

  button {
    margin-top: 15px;
    padding: 12px;
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background: linear-gradient(135deg, #0056b3, #003f7f);
    transform: scale(1.03);
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }

  .button-group {
  display: flex;
  justify-content: flex-end;  /* 👈 right side ki move */
}
.form-row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 15px;
}

.form-row label {
  width: 180px;
  font-weight: 600;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.form-row input,
.form-row textarea {
  flex: 1;             /* 👈 input full space tiskuntundi */
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.form-row textarea {
  height: 60px;
}

.error {
  color: red;
  font-size: 12px;
  margin-left: 165px;  /* 👈 label width ki align */
}
`}</style>
    </div>
  );
}

export default ExemptionFileUpload;