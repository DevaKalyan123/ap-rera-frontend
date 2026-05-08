import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet } from "../api/api";
import "../styles/ClosureProcess.css";

export default function ClosureProcess() {

  const location = useLocation();
  const navigate = useNavigate();
  const panNumber = location.state?.panNumber;

  const [data, setData] = useState([]);

  useEffect(() => {

    if (!panNumber) return;

   apiGet(`/api/closure-projects/${panNumber}`)
  .then(result => setData(result))
  .catch(err => console.error(err));

  }, [panNumber]);

  return (
    <div className="closure-page">

      <h2 className="closure-title">Closure Process</h2>

      <div className="closure-box">

        <table className="closure-table">

          <thead>
            <tr>
              <th>S.No</th>
              <th>Application No</th>
              <th>Project Name</th>
              <th>Promoter Name</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
  className="app-link"
  onClick={() =>
    navigate("/projectclosure", {
      state: {
        applicationNo: item.application_no,
        projectName: item.project_name,
        promoterName: item.promoter_name
      }
    })
  }
>
  {item.application_no}
</td>
                <td>{item.project_name}</td>
                <td>{item.promoter_name}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}