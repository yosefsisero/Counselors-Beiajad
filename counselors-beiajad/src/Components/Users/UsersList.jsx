import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import axios from "axios";
function UsersList() {
  const [users, setUsers] = useState([]);

  const { isAuth } = useContext(AuthContext);
  const URL_GET_USERS = "http://localhost:8080/api/v1/users";
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
      <ul>
      {users.map((user) => (
        <li key={user.first_name}>{user.first_name}</li>
      ))}
      </ul>
    ) : (
      <Link to="/login"> Ir a inicio </Link>  
    )}
    </>    
  );
}

export default UsersList;
