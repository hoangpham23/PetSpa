import React, { createContext, useState, useContext } from "react";

// Create a new context
const ServiceContext = createContext();

// Provider component
export function ServiceProvider({ children }) {
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    price: "",
    description: "",
    feedback: "",
  });
  return (
    <ServiceContext.Provider value={{ serviceData, setServiceData }}>
      {children}
    </ServiceContext.Provider>
  );
}

// Custom hook to use the service context
export function useService() {
  return useContext(ServiceContext);
}
