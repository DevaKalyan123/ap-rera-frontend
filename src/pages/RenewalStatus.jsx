import { useState } from "react";

function RenewalStatus(){

  const [status] = useState("DOCUMENTS_UPLOADED");

  return(

    <div style={{padding:"20px"}}>

      <h2>Application Status</h2>

      <div className="status-tracker">

        <div className={status !== "" ? "active" : ""}>Created</div>
        <div className={status === "DOCUMENTS_UPLOADED" ? "active" : ""}>Documents</div>
        <div>Queries</div>
        <div>Preview</div>
        <div>Payment</div>

      </div>

    </div>

  );

}

export default RenewalStatus;