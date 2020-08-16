import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import axios from "axios";
import { Table } from 'reactstrap';
function ScheduleList() {
  const [users, setUsers] = useState([]);

  const { isAuth } = useContext(AuthContext);
  const URL_GET_USERS = "http://localhost:8000/api/v1/users";
  useEffect(() => {
    axios
      .get(URL_GET_USERS, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, []);

  


  return (
    <>
    {isAuth ? (
    <Table striped>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Comunity</th>
          <th>Country</th>
          <th>Tel</th>

        </tr>
      </thead>
      <tbody>
      {users.map((user) => (
        <tr>         
          <td key={user.first_name}>{user.first_name}</td>
          <td key={user.last_name}>{user.last_name}</td>
          <td key={user.email}>{user.email}</td>
          <td key={user.age}>{user.age}</td>
          <td key={user.comunity}>{user.comunity}</td>
          <td key={user.country}>{user.country}</td>
          <td key={user.tel}>{user.tel}</td>
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

export default ScheduleList;
