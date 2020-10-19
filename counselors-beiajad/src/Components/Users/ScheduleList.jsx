import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";
import { Table } from 'reactstrap';
import Editar from '../Delete/DeleteSchedule'

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import './ScheduleList.css'
function ScheduleList() {
  
  const { isAuth } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [data, setData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [searchText, setSearchText] = useState()

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
     
 
 

  const toFind = (selectedDay) => {
    let dia = selectedDay.day
    let month = selectedDay.month
    let year = selectedDay.year
    if(month < 10){
      filterData(`${year}-0${month}-${dia}`);
      setSearchText(`${year}-0${month}-${dia}`);
    }else{
      filterData(`${year}-${month}-${dia}`);
      setSearchText(`${year}-${month}-${dia}`);
    }
    
  }

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

  const Todas = () => {
    setData(schedule)
    }


  return (
    <>
    {isAuth ? (
      <>
   
      <Calendar
      value={selectedDay}
      onChange={setSelectedDay, (e) => {toFind(e)}}
      shouldHighlightWeekends
    />
    <button onClick={Todas}>todas</button>
    <h1>{searchText}</h1>
    <Table striped>
      <thead>
        <tr>
          
          <th>Fecha</th>
          <th>Hora</th>
          <th>Note</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Tel</th>
          <th>Borrar</th>

        </tr>
      </thead>
      <tbody>
      {data.map((user) => (
        <tr>         
          
          <td >{user.date.split("T")[0]}</td>
          <td >{user.time}</td>
          <td >{user.note}</td>
          <td >{user.user[0].first_name}</td>
          <td >{user.user[0].last_name}</td>
          <td >{user.user[0].tel}</td>
          <td><Editar id={user._id}/></td>
            
        </tr>
        ))}
        
      </tbody>
    </Table>
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

export default ScheduleList;
