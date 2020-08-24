import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import axios from "axios";
import { Table } from 'reactstrap';
import './Dates.css'

function Dates() {
  const [user, setUser] = useState([]);

  const { isAuth } = useContext(AuthContext);
  
  const URL_GET_USER = "http://localhost:8000/api/v1/users/5f39596088e54006028fdb3e";
  useEffect(() => {
    axios
      .get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setUser(data.data.schedule[0]))
      .catch((err) => console.log(err));
  }, []);

  


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
      {
        <tr>         
          <td key={user.first_name}>{user.date}</td>
          <td key={user.time}>{user.time}</td>
          <td key={user.note}>{user.note}</td>
        </tr>
        }
        
      </tbody>
    </Table>
    ) : (
      <Link to="/login"> Ir a inicio </Link>  
    )} 
    </>     
  );
}

export default Dates;
