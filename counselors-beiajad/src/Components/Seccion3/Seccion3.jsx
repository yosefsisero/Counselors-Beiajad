import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './Seccion3.css'
import Foto1 from '../../Imagenes/foto1.jpg'
import Mano from '../../Imagenes/mano.jpg'

function Seccion3() {
    return (
        <>
             <Container className="themed-container" fluid={true}>
             <Row>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <h3 className="pregunta">¿Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit ullam laborum?</h2>
                 <h5 className="respuesta">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab pariatur quibusdam nostrum et expedita asperiores? Ratione libero porro ea impedit minus, consequuntur, similique et nisi nostrum numquam esse ut vel!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab pariatur quibusdam nostrum et expedita asperiores? Ratione libero porro ea impedit minus, consequuntur, similique et nisi nostrum numquam esse ut vel!</h4>           
              </Col>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <img className="Foto" src={Foto1} alt=""/>
              </Col>
             </Row>

             <Row>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <img className="Foto" src={Mano} alt=""/>
              </Col>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <h3 className="pregunta">¿Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit ullam laborum?</h2>
                 <h5 className="respuesta">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab pariatur quibusdam nostrum et expedita asperiores? Ratione libero porro ea impedit minus, consequuntur, similique et nisi nostrum numquam esse ut vel!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab pariatur quibusdam nostrum et expedita asperiores? Ratione libero porro ea impedit minus, consequuntur, similique et nisi nostrum numquam esse ut vel!</h4>           
              </Col>
             </Row>
             
             </Container>
          
        </>
    )
}

export default Seccion3
