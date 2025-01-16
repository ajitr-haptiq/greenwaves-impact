import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to log in
  const login = () => {
    setIsLoggedIn(true);
    console.log("User logged in"); // Debugging
  };

  // Function to log out
  const logout = () => {
    setIsLoggedIn(false);
    console.log("User logged out"); // Debugging
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
