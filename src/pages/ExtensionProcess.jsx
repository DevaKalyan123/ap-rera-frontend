import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import "../styles/ExtensionProcess.css";

const ExtensionProcess = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const loginData = location.state?.loginData;
  const panNumber = location.state?.panNumber || loginData?.pan_number;

  const [projects, setProjects] = useState(loginData?.projects || []);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-GB") : "—";

  useEffect(() => {

    // If loginData already has projects, skip API
    if (loginData?.projects?.length) return;

    if (!panNumber) return;

    const fetchProjects = async () => {

      try {

        const data = await apiGet(
          `api/project/basic-details-by-pan?pan=${panNumber}`
        );

        if (data?.success) {
          setProjects(data.data);
        } else {
          setProjects([]);
        }

      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      }

    };

    fetchProjects();

  }, [panNumber, loginData]);

  return (

    <div className="extension-pa-page">

      <h2 className="extension-pa-title">Extension process</h2>

      <table className="extension-pa-table">

        <thead>
          <tr>
            <th>S.No</th>
            <th>Application No</th>
            <th>Promoter Name</th>
            <th>BA No</th>
            <th>Validity From</th>
            <th>Validity To</th>
          </tr>
        </thead>

        <tbody>

          {projects.length === 0 ? (

            <tr>
              <td colSpan="6">No data found</td>
            </tr>

          ) : (

            projects.map((project, index) => (

              <tr key={index}>

                <td>{index + 1}</td>

                <td
                  className="extension-pa-link"
                  onClick={() =>
                    navigate("/projectapplicationdetails", {
                      state: {
                        projectData: project,
                        panNumber: panNumber,
                      },
                    })
                  }
                >
                  {project.application_number}
                </td>

                <td>{project.promoter_name || project.name}</td>

                <td>{project.ba_no || project.building_plan_no}</td>

                <td>
                  {formatDate(
                    project.validity_from ||
                    project.building_permission_from
                  )}
                </td>

                <td>
                  {formatDate(
                    project.validity_to ||
                    project.building_permission_upto
                  )}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

};

export default ExtensionProcess;