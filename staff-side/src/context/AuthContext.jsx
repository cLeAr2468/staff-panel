import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [staffData, setStaffData] = useState(null);
  const [token, setToken] = useState(null);
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    try {
      const storedStaff = localStorage.getItem("staffData");
      const storedToken = localStorage.getItem("token");
      const storedApiKey = localStorage.getItem("apiKey");

      if (storedStaff) setStaffData(JSON.parse(storedStaff));
      if (storedToken) setToken(storedToken);
      if (storedApiKey) setApiKey(storedApiKey);
    } catch (error) {
      console.error("Auth load error:", error);
      localStorage.clear();
    }
  }, []);

  const login = (staff, jwtToken, apiKeyValue) => {
    localStorage.setItem("staffData", JSON.stringify(staff));
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("apiKey", apiKeyValue);

    setStaffData(staff);
    setToken(jwtToken);
    setApiKey(apiKeyValue);
  };

  const logout = () => {
    localStorage.removeItem("staffData");
    localStorage.removeItem("token");
    localStorage.removeItem("apiKey");

    setStaffData(null);
    setToken(null);
    setApiKey(null);
  };

  return (
    <AuthContext.Provider value={{ staffData, token, apiKey, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
