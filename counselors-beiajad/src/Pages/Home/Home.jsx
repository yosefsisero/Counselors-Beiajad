import React from 'react';
import Calendar from '../../Components/Calendar/Calendar'
import Header from '../../Components/Layout/Header/Header'
import { AuthContext } from '../../contexts/AuthContext';
import './Home.css'

function Home(props) {
  const { user, isAuth } = React.useContext(AuthContext)
  return (
    <>
      <Header />
      <h1>Home</h1>
      <Calendar />
      <div id="start">
        <h1>Estabilidad emocional para tu vida diaria</h1>
        <h4>Habla de forma segura y privada con un psicólogo de confianza cuando lo necesites.</h4>
        <button>Registrate</button>
        {isAuth ? (
        <h1>Bienvenido, {user.first_name}</h1>
      ) : (
        <h1>Inicia sesion</h1>
      )}
      </div>
      
    </>
  );
}

export default Home;
