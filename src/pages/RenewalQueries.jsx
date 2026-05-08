import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQueries } from "../api/renewalApi";
import RenewalStepper from "../components/RenewalStepper";
import "../styles/renewalQueries.css";

function RenewalQueries() {

  const { renewalId } = useParams();
  const [queries, setQueries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    getQueries(renewalId)
      .then(res => {

        if (Array.isArray(res.data)) {
          setQueries(res.data);
        } 
        else if (res.data.queries) {
          setQueries(res.data.queries);
        } 
        else {
          setQueries([]);
        }

      })
      .catch(() => {
        setQueries([]);
      });

  }, [renewalId]);

  return (

    <div className="renewal-page-wrapper">

      <div className="breadcrumb-bar">
        You are here :
        <a href="/" className="breadcrumb-link">Home</a> /
        <span> Registration</span> /
        <span> Agent Renewal</span>
      </div>

      <div className="stepper-wrapper">
        <RenewalStepper step={2} />
      </div>

      <div className="queries-container">

        <h2 className="queries-title">Queries</h2>

        {Array.isArray(queries) && queries.length > 0 ? (
          <>
            <p className="query-info">If any query raised by authority</p>

            {queries.map((q, i) => (
              <div key={i} className="query-card">
                <p>{q.query_text || q}</p>
              </div>
            ))}
          </>
        ) : (
          <p className="no-query">No queries raised</p>
        )}

        <button
          className="continue-btn"
          onClick={() => navigate(`/renewal/preview/${renewalId}`)}
        >
          Continue
        </button>

      </div>

    </div>

  );

}

export default RenewalQueries;