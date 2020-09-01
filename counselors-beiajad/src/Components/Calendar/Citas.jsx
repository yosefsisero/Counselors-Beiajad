import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap';
import axios from "axios";
import Editar from '../Editar/Editar';

import '../Modal/Logi.css'
import './Citas.css'
import DeleteSchedule from "../Delete/DeleteSchedule";


function Citas() {

  const { user1, isAuth } = useContext(AuthContext)
  const [schedule, setSchedule] = useState([]);

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
    if(a.user[0]._id === user1.id){
      return a    
    }
  });


  return (
    <>
    {isAuth ? (
    <Table className="citas" striped>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
      {IdUser.map((user) => (
        <tr>   
             
          <td key={user.date}>{user.date.split("T")[0]}</td>
          <td key={user.time}>{user.time}</td>
          <td key={user.note}>{user.note}</td>
         {/* <td><DeleteSchedule id={user._id}/></td>
          <td><Editar id={user._id}/></td>*/}

          </tr>
          ))}

      </tbody>
    </Table>
    ) : (
      <Link to="/login"> Ir a inicio </Link>  
    )} 
    </>     
  ); 
}

export default Citas;