import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import axios from "axios";
import { Table } from 'reactstrap';
import './Dates.css'

function Dates() {
  const [user, setUser] = useState([]);
  const { user1, isAuth } = useContext(AuthContext)
  
  
  const URL_GET_USER = `http://localhost:8000/api/v1/users/${user1.id}`;
  useEffect(() => {
    axios
      .get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setUser(data.data.schedule))
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
      {user.map((user) => (
        <tr>         
          <td key={user.first_name}>{user.date.split("T")[0]}</td>
          <td key={user.time}>{user.time}</td>
          <td key={user.note}>{user.note}</td>
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

export default Dates;
