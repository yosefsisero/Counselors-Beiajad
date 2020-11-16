import React,{useContext} from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2'

const Logout = () => {
  const { logoutUser } = useContext(AuthContext)
  Swal.fire({
    icon: 'success',
    title: 'Cerrando sesión',
    timer: 1500,
    timerProgressBar: true,
  })
  logoutUser()

  return <Redirect to="/" />;
};

export default Logout;