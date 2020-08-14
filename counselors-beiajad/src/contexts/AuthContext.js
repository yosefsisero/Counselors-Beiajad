import React, { createContext, useState, useEffect } from "react";
import decode from 'jwt-decode'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({})

  const loginUser = (token) => {
    localStorage.setItem('app_token', token)
    const decoded = decode(token)
    setUser(decoded)
    setToken(token);
    setIsAuth(true);
  };
 
  const logoutUser = (token) => {
    localStorage.removeItem("app_token");
    setToken({})
    setIsAuth(false);
  };

  useEffect(() => {
    const item = localStorage.getItem("app_token");
    if (item) {
      const decoded = decode(item)
      setUser(decoded)
      setToken(item);
      setIsAuth(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ 
      token, 
      isAuth,  
      user, 
      loginUser, 
      logoutUser
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;