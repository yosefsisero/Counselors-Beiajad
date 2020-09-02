import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import axios from "axios";
import { Table } from 'reactstrap';
import Editar from '../Delete/DeleteSchedule'

function ScheduleList() {
  const [schedule, setSchedule] = useState([]);

  const { isAuth } = useContext(AuthContext);
  const URL_GET_SCHEDULE = "http://localhost:8000/api/v1/schedule";
  useEffect(() => {
    axios
      .get(URL_GET_SCHEDULE, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
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
          <th>Tel</th>
          <th>Date</th>
          <th>Time</th>
          <th>Note</th>


        </tr>
      </thead>
      <tbody>
      {schedule.map((user) => (
        <tr>         
          <td key={user.user.first_name}>{user.user[0].first_name}</td>
          <td key={user.user.last_name}>{user.user[0].last_name}</td>
          <td key={user.user.tel}>{user.user[0].tel}</td>
          <td key={user.date}>{user.date}</td>
          <td key={user.time}>{user.time}</td>
          <td key={user.note}>{user.note}</td>
          <td><Editar id={user._id}/></td>

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
