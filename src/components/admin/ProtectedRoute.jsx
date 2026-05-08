import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const admin = localStorage.getItem("admin");

  return admin ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;