import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import axios from "axios";
import { Table } from 'reactstrap';
import DeleteUser from "../Delete/DeleteUser";
import './UserList.css'

function UsersList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

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

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => 
         user.first_name.toLowerCase().includes(name.toLowerCase())
     ));
  }, [name, users]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => 
         user.last_name.toLowerCase().includes(lastName.toLowerCase())
     ));
  }, [lastName, users]);

 
  return (
    <>
    {isAuth ? (
      <>
          <div>
             <label>Nombre</label>
             <input
             className="form-control buscador"
             onChange={(e)=>{setName(e.target.value)}}
             />

             <label>Apellido</label>
             <input
             className="form-control buscador"           
             onChange={(e)=>{setLastName(e.target.value)}}
             />
          </div>
            

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
      {filteredUsers.map((user) => (
        <tr>         
          <td >{user.first_name}</td>
          <td >{user.last_name}</td>
          <td >{user.email}</td>
          <td >{user.age}</td>
          <td >{user.comunity}</td>
          <td >{user.country}</td>
          <td >{user.tel}</td>
          <td><DeleteUser id={user._id}/></td>
        </tr>
        ))}
        
      </tbody>
    </Table>
    </>
    ) : (
      <Link to="/login"> Ir a inicio </Link> 
    )} 
    </>     
  );
}

export default UsersList;
