import React, { createContext, useState, useEffect } from "react";
import decode from 'jwt-decode'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [user1, setUser1] = useState({})

  const loginUser = (token) => {
    localStorage.setItem('app_token', token)
    const decoded = decode(token)
    setUser1(decoded)
    setToken(token);
    setIsAuth(true);
  };
 
  const logoutUser = (token) => {
    localStorage.removeItem("app_token");
    setToken({})
    setIsAuth(false);
    setUser1({})
  };
 

  useEffect(() => {
    const item = localStorage.getItem("app_token");
    //const decoded = decode(item)
    //let dateNow = new Date();
    // const time = item.exp < dateNow.getTime()  && time
    if (item) {
      const decoded = decode(item)
      setUser1(decoded)
      setToken(item);
      setIsAuth(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ 
      token, 
      isAuth,  
      user1, 
      loginUser, 
      logoutUser
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;