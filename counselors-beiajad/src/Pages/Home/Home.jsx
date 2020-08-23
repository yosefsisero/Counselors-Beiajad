import React from 'react';
import Calendar from '../../Components/Calendar/Calendar'
import Header from '../../Components/Layout/Header/Header'
import Seccion3 from '../../Components/Seccion3/Seccion3'
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from 'reactstrap';
import Seccion2 from '../../Components/Seccion2/Seccion2'
import Footer from '../../Components/Layout/Footer/Footer';
import Cal from '../../Components/Calendar/Cal'
import './Home.css'

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
         
           <h1 className="texto1">Estabilidad emocional para tu vida diaria</h1>
           <h4 className="texto2">Habla de forma segura y privada con una consultora psicólogica de confianza cuando lo necesites.</h4>
           <Button  href="/register" color="info">Comienza ahora</Button>{' '}
          
        </div>
        </>
      )}
      </div>

      <Seccion2 />
      <Seccion3 />
      <Footer/>
      <Cal />
    </>
  );
}

export default Home;
