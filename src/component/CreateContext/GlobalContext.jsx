import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const GlobalContext = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authtoken");

    if (token) {
      try {
        const storedUser = JSON.parse(localStorage.getItem("current_user"));
        setLoginStatus(true);
        setCurrentUser(storedUser);
      } 
      catch (error) {
        console.error("Invalid user data in localStorage");
        setLoginStatus(false);
        setCurrentUser(null);
      }
    } else {
      setLoginStatus(false);
      setCurrentUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default GlobalContext;