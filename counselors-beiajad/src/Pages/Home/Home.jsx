import React from 'react';
import Calendar from '../../Components/Calendar/Calendar'
import Header from '../../Components/Layout/Header/Header'
import Seccion3 from '../../Components/Seccion3/Seccion3'
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from 'reactstrap';
import Get from '../../Components/Calendar/Get'
import Seccion2 from '../../Components/Seccion2/Seccion2'
import Footer from '../../Components/Layout/Footer/Footer';
import Dates from '../../Components/Calendar/Dates'
import './Home.css'
import { Container, Row, Col } from 'reactstrap';


function Home(props) {
  const { user1, isAuth } = React.useContext(AuthContext)
  return (
    <>
      <Header />
     
      
      <div id="start">
        
        {isAuth ? (
        <>
        

          <Container className="themed-container" fluid={true}>
          <h1 className="bienvenido">Hola, {user1.first_name}</h1>

         <Row>
          <Col  md="12" lg={{ size: 5, offset: 1}}>
            <Calendar />
          </Col>

          <Col md="12" lg={{ size: 6}}>
            <Dates />    
            <Get/>       
          </Col>
         </Row>

        </Container>        
       
        </>
      ) : (
        <>
        <div className="seccion1">
         
           <h1 className="texto1">Estabilidad emocional para tu vida diaria</h1>
           <h4 className="texto2">Habla de forma segura y privada con una consultora psicológica de confianza cuando lo necesites.</h4>
           <Button  href="/register" color="info">Comienza ahora</Button>{' '}
          
        </div>
        </>
      )}
      </div>
      <br/><br/>
      <Seccion2 />
      <br/><br/>
      <Seccion3 />
      <Footer/>
    </>
  );
}

export default Home;
