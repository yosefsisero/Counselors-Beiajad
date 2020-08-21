import React from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody
  } from 'reactstrap';
  import './Seccion2.css'
  import tel from '../../Imagenes/tel.png'
  import confia from '../../Imagenes/confia.png'
  import diploma from '../../Imagenes/diploma.png'
  import happi from '../../Imagenes/happi.png'

function Seccion2(props) {
    return (
        <CardGroup className="seccion2">
          <Card className="card">
            <CardImg top width="100%" className="imagen" src={tel} alt="Card image cap" />
            <CardBody>
              <CardTitle className="texto">Llamadas Anonimas</CardTitle>
              <CardText className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</CardText>
            </CardBody>
          </Card>
          <Card className="card">
            <CardImg top width="100%" className="imagen" src={confia} alt="Card image cap" />
            <CardBody>
              <CardTitle className="texto">Confianza y Discrecion</CardTitle>
              <CardText className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</CardText>            </CardBody>
          </Card>
          <Card className="card">
            <CardImg top width="100%" className="imagen" src={diploma} alt="Card image cap" />
            <CardBody>
              <CardTitle className="texto">Personal Calificado</CardTitle>
              <CardText className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</CardText>            </CardBody>
          </Card>
          <Card className="card">
            <CardImg top width="100%" className="imagen" src={happi} alt="Card image cap" />
            <CardBody>
              <CardTitle className="texto">Felicidad</CardTitle>
              <CardText className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</CardText>            </CardBody>
          </Card>
        </CardGroup>
      );
    };

export default Seccion2
