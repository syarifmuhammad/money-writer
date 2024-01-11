"use client"
import React, { createContext, useState, useContext } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const changeIsAuthenticated = (is_authenticated) => {
    setIsAuthenticated(is_authenticated);
  };

  

  return (
    <AuthContext.Provider value={{ isAuthenticated, changeIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthenticated = () => {
  return useContext(AuthContext);
};