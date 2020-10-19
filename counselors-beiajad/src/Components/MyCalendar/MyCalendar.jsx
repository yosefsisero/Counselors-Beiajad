import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";
import { Table } from 'reactstrap';
import Editar from '../Delete/DeleteSchedule'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

function MyCalendar() {
  
  const { isAuth } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  

  const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"];   // excluye datos del arreglo del filtro
  

  const URL_GET_SCHEDULE = "http://localhost:8000/api/v1/schedule";

  useEffect(() => {
    axios
      .get(URL_GET_SCHEDULE, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => (setSchedule(data.data), setData(data.data)))
      .catch((err) => console.log(err));
  }, []);
     
     
  const handleChange = value => {
    setSearchText(value);
    filterData(value);
  };
  
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(schedule);
    else {
      const filteredData = schedule.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue) 
        )
      });
      setData(filteredData);
    }
  }

  return (
    <>
    {isAuth ? (
      <>
      <div>
       <label>Busqueda</label>
       <input className="form-control buscador"
       style={{ marginLeft: 5 }}
       type="text"
       value={searchText}
       onChange={e => handleChange(e.target.value)}
      />
      </div>
    
    
      {data.map((user) => (
         <Row>
         <Col sm="2">
           <Card body>
             <CardTitle>Fecha {user.date.split("T")[0]} {user.time}</CardTitle>
             <CardText>Nombre del paciente {user.user[0].first_name}</CardText>
             <CardText>Nota del paciente {user.note}</CardText>
             <Editar id={user._id}/>
           </Card>
         </Col>
       </Row>
             
        ))}
        
     
    <div className="clearboth">
    {data.length === 0 && <span>No hay resultados!</span>}
    </div>
        
    </>
    ) : (
       <Link to="/"> Ir a inicio </Link>
     )} 
    </>     
  );
}

export default MyCalendar;
