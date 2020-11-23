import React, { createContext, useState, useEffect } from "react";
import decode from 'jwt-decode'
import Swal from 'sweetalert2'
import axios from "axios";


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
 
  const salir = () => {
    const token = localStorage.getItem("app_token");
    let dateNow = Math.floor(Date.now() / 1000);
    const decoded = decode(token)
    let timexp = decoded.exp
    if (dateNow >= timexp){
      localStorage.removeItem("app_token");
      setToken({})
      setIsAuth(false);
      setUser1({})
      Swal.fire({
        icon: 'warning',
        title: 'Tu sesión a caducado',
      })
    }
  }
  
  useEffect(() => {
    const item = localStorage.getItem("app_token");
    if (item) {
      const decoded = decode(item)
      setUser1(decoded)
      setToken(item);
      setIsAuth(true);
      salir()    
    }
  }, []);

  //-------------------------------
   
  const URL_GET_USER = `http://localhost:8000/api/v1/users/${user1.id}`;
  const [logueado, setLogueado] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isAdmin, setIsAdministrador] = useState(false);

  useEffect(() => {
    axios
      .get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => (setLogueado(data.data)))
      .catch((err) => console.log(err));
  }, [user1]);

  useEffect(() => {
    filtro(logueado)
  }, [logueado]);

  const filtro = (log)=>{
    const fil = log.rank
    if(fil === "user") {
      setIsUser(true)
      //console.log("Es usuario")
    }
    if(fil === "doctor") {
      setIsDoctor(true)
      //console.log("Es doctor")
    }
    if(fil === "admin") {
      setIsAdministrador(true)
      //console.log("Es Administrador")
    }
  } 

  //-------------------------------
  return (
    <AuthContext.Provider value={{ 
      token, 
      isAuth,
      isUser,
      isDoctor,
      isAdmin,
      user1, 
      loginUser, 
      logoutUser
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;