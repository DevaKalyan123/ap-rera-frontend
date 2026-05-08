import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import "../styles/PromoterData.css";

const ClosureTable = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // get login data from session
    const storedLogin = JSON.parse(sessionStorage.getItem("loginResponse"));

    // get pan from navigation OR session
    const panNumber =
        location.state?.panNumber || storedLogin?.pan_number;

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDate = (d) =>
        d ? new Date(d).toLocaleDateString("en-GB") : "—";

    useEffect(() => {

        if (!panNumber) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {

            try {

                const data = await apiGet(
                    `api/project/basic-details-by-pan?pan=${panNumber}`
                );

                if (data?.success) {
                    setRows(data.data);
                } else {
                    setRows([]);
                }

            } catch (err) {
                console.error(err);
                setRows([]);
            } finally {
                setLoading(false);
            }

        };

        fetchData();

    }, [panNumber]);

    return (

        <div className="extension-pa-page">

            <div className="promoter-corner">
                <h3>Select Project For Closure Requirements</h3>
            </div>

            {/* PROJECT TABLE */}

            {loading ? (
                <p>Loading...</p>
            ) : !panNumber ? (

                <p style={{ color: "red" }}>
                    Login data not found. Please login again.
                </p>

            ) : (

                <table className="extension-pa-table">

                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Application No</th>
                            <th>Project Name</th>
                            <th>Promoter Name</th>
                            {/* <th>BA No</th>
                            <th>Validity From</th>
                            <th>Validity To</th> */}
                        </tr>
                    </thead>

                    <tbody>

                        {rows.length === 0 ? (

                            <tr>
                                <td colSpan="7">No data found</td>
                            </tr>

                        ) : (

                            rows.map((row, index) => (

                                <tr key={index}>

                                    <td>{index + 1}</td>

                                    <td
                                        className="extension-pa-link"
                                        onClick={() =>
                                            navigate("/project-closure", {
                                                state: {
                                                    projectData: row,
                                                    panNumber: panNumber
                                                }
                                            })
                                        }
                                    >
                                        {row.application_number}
                                    </td>

                                    <td>{row.project_name}</td>
                                    <td>{row.name}</td>
                                    {/* <td>{row.building_plan_no}</td>
                                    <td>{formatDate(row.building_permission_from)}</td>
                                    <td>{formatDate(row.building_permission_upto)}</td> */}

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            )}

        </div>

    );

};

export default ClosureTable;