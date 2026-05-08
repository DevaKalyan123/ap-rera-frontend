import { createContext, useContext, useState } from "react";
const AdminContext = createContext(null);
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem("admin");
      const parsed = stored ? JSON.parse(stored) : null;

      // ✅ LOG 1 — fires on every page load / refresh
      if (parsed) {
        console.log("%c📦 AdminContext — Loaded from localStorage", "color: #6b804b; font-weight: bold;");
        console.table(parsed);
      } else {
        console.log("%c📦 AdminContext — No admin found in localStorage", "color: gray;");
      }

      return parsed;
    } catch {
      console.error("❌ AdminContext — Failed to parse localStorage data");
      return null;
    }
  });

  const saveAdmin = (adminData) => {
    // ✅ LOG 2 — fires after OTP verification succeeds
    
    console.log("🔑 Role  ", adminData?.role ?? "N/A");
   

    localStorage.setItem("admin", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const clearAdmin = () => {
    // ✅ LOG 3 — fires on logout
    console.log("%c🚪 AdminContext — clearAdmin() called → session cleared", "color: red; font-weight: bold;");
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, saveAdmin, clearAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used inside <AdminProvider>");
  }
  return context;
};