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
 
  //-------------
  // useEffect(()=>{
  //   const item1 = localStorage.getItem("app_token");
  //   let dateNow = Math.floor(Date.now() / 1000)
  //   let info = decode(item1)
  //   let timexp = info.exp
  //   if (dateNow >= timexp){
  //     console.log('estas afuera')
  //   }


  // },[])

  //--------------------
  useEffect(() => {
    const item = localStorage.getItem("app_token");
    // let dateNow = Math.floor(Date.now() / 1000)
    // let exp = decode(item)
    // let time = exp.exp
    if (item) {
      const decoded = decode(item)
      // let dateNow = Math.floor(Date.now() / 1000)
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