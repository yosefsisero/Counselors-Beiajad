import React,{useContext} from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';

const Logout = () => {
  const { logoutUser } = useContext(AuthContext)
  alert("Successful logout");
  logoutUser()

  return <Redirect to="/login" />;
};

export default Logout;