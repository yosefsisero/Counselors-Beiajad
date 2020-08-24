import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './Seccion3.css'
import Foto1 from '../../Imagenes/secretaria.jpg'
import Manos from '../../Imagenes/libre.jpg'

function Seccion3() {
    return (
        <>
             <Container className="themed-container" fluid={true}>
             <Row>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <h3 className="pregunta">¿Que es el Counseling?</h3>
                 <h5 className="respuesta">
                    El counseling es una profesión de ayuda que promueve el autoconocimiento, descubriendo y explorando un nuevo modo de ser y estar en el mundo para una mejor calidad de vida.
                    Es una profesión en sí misma, que facilita por medio de un proceso, de manera individual, en pareja, familias y/o grupos
                    Actua en el área de la prevención y promoción del desarrollo humano.
                    El counseling es una profesión en si misma que facilita al consultante vivir de una manera más satisfactoria y plena.
                    su tarea de ayuda estará dirigida a personas que necesitan, un momento de escucha y acompañamiento para comprender mejor sus problemas, tomar decisiones, o realizar cambios en algunos aspectos de sus vidas.</h5>           
              </Col>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <img className="Foto" src={Foto1} alt=""/>
              </Col>
             </Row>

             <Row>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <img className="Foto2" src={Manos} alt=""/>
              </Col>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <h3 className="pregunta">¿Cuándo debo considerar el Counseling como una opción?</h3>
                 <h5 className="respuesta">Si estás atravesando cambios, conflictos, toma de decisiones, duelos, crisis vitales,dificultades, probá el counseling!!!</h5>           
              </Col>
             </Row>
             
             </Container>
          
        </>
    )
}

export default Seccion3
