import React from 'react';
import Header from './Layout/Header'
import {
  
} from 'reactstrap';
import  AuthContextProvider  from '../../contexts/AuthContext'
function Home(props) {
  return (
    <AuthContextProvider>
      <Header />
      <h1>Bienvenido</h1>
    
    </AuthContextProvider>
  );
}

export default Home;
