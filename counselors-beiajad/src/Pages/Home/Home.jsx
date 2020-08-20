import React from 'react';
import Calendar from '../../Components/Calendar/Calendar'
import Header from '../../Components/Layout/Header/Header'
import { AuthContext } from '../../contexts/AuthContext';
import './Home.css'
import { Button } from 'reactstrap';

function Home(props) {
  const { user1, isAuth } = React.useContext(AuthContext)
  return (
    <>
      <Header />
     
      
      <div id="start">
        
        {isAuth ? (
        <>
        <h1>Bienvenido, {user1.first_name}</h1>
        <Calendar />
        </>
      ) : (
        <>
        <div className="seccion1">
        <h1>Estabilidad emocional para tu vida diaria</h1>
        <h4>Habla de forma segura y privada con una consultora psicólogica de confianza cuando lo necesites.</h4>
        <Button href="/register" color="info">Empieza</Button>{' '}
        </div>
        </>
      )}
      </div>
      
    </>
  );
}

export default Home;
