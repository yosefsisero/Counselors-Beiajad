import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

function Cita() {
    
  return (
    <>
     <Row>
      <Col sm="2">
        <Card body>
          <CardTitle>Fecha</CardTitle>
          <CardText>Nombre del paciente</CardText>
          <CardText>Nota del paciente</CardText>
        </Card>
      </Col>
    </Row>
    </>
  );
}

export default Cita;
