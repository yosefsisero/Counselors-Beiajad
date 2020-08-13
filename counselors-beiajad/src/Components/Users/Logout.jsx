import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  
  alert('Successful logout');
  return (
    <Redirect to="/login" />
  )
}

export default Logout;