import { createContext, useContext, useState } from "react";

const AgentFormContext = createContext();

export const AgentFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <AgentFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </AgentFormContext.Provider>
  );
};

export const useAgentForm = () => useContext(AgentFormContext);