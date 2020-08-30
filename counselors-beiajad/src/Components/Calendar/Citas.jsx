import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import axios from "axios";
import { Table } from 'reactstrap';
import './Citas.css'
import Editar from '../../Components/Calendar/Editar';


function Citas() {
  const [schedule, setSchedule] = useState([]);
 
  const { user1, isAuth } = useContext(AuthContext)
  
  
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


  //-----------------------------------------------
    
  
  const Delete = (id) => {

      const URLDELETE = `http://localhost:8000/api/v1/schedule/${id}`;
    
        axios.delete(URLDELETE, {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        })
        .then((response)=> {
            alert(`Cita Borrada`)
            console.log(response.data)
            window.location.reload()
    
     })  .catch((error) => {
            alert(error)
    
     })

    } 
       
  //-----------------------------------------------
  
 
  
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
          <td><button onClick={() => Delete(user._id)} className="btn btn-dark">Borrar</button></td>
          <td><Editar/></td> 
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