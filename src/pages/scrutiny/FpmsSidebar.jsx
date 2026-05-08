import { useNavigate } from "react-router-dom";

const FpmsSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="scrutiny-sidebar">
      <h2>FPMS PANEL</h2>

      <button onClick={() => navigate("/fpms/dashboard")}>
        📊 FPMS Dashboard
      </button>

      <button onClick={() => navigate("/fpms/create-files")}>
        📄 Create Files
      </button>

      <button onClick={() => navigate("/fpms/view-files")}>
        📁 View Files
      </button>

      <button onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  );
};

export default FpmsSidebar;