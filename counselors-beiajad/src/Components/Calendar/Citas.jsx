import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap';
import axios from "axios";
import Editar from '../Editar/Editar';
import '../Modal/Logi.css'
import './Citas.css'
import DeleteSchedule from "../Delete/DeleteSchedule";
import { MDBContainer, MDBScrollbar } from "mdbreact";


function Citas() {

  const { user1, isAuth } = useContext(AuthContext)
  const [schedule, setSchedule] = useState([]);

  const scrollContainerStyle = { width: "100%", maxHeight: "300px" };
  const outerContainerStyle = { width: "100%", height: "300px" };

  const URL_GET_USER = `http://localhost:8000/api/v1/schedule/`;

  useEffect(() => {
    axios.get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err));
  }, []);

  const IdUser = schedule.filter((a) => {
    const fecha = new Date(a.date).valueOf()
    const now = Date.now()
    if(a.user[0]._id === user1.id && fecha >= now){
      return a   
    }
  });
  
 
  return (
    <>
    {isAuth ? (
  
    <MDBContainer>
      
      <div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>   
    <Table className="citas" striped>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
      {IdUser.map((user, i) => (
        <tr key={i}>   
             
          <td >{user.date.split("T")[0]}</td>
          <td >{user.time}</td>
          <td >{user.note}</td>
          <td><Editar id={user._id}/></td>
          <td><DeleteSchedule id={user._id}/></td>
  
          </tr>
          ))}

      </tbody>
    </Table>
    </div>
    </MDBContainer>

    
    
   
    ) : (
      <Link to="/login"> Ir a inicio </Link>  
    )} 
    </>     
  ); 
}

export default Citas;