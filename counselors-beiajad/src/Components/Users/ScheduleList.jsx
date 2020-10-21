import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";
import { Table, Button, Container, Row, Col } from 'reactstrap';
import Editar from '../Delete/DeleteSchedule'
import Home from '../../Pages/Home/Home'


import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import './ScheduleList.css'

import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";

function ScheduleList() {


  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth()+1;
  let day = d.getDate();

  const defaultValue = {
    year: year,
    month: month,
    day: day,
  };
  

  const { isAuth } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [data, setData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(defaultValue);
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
      setSearchText(`${dia}-0${month}-${year}`);
    }else{
      filterData(`${year}-${month}-${dia}`);
      setSearchText(`${dia} / ${month} / ${year}`);
    }
    var element = document.getElementById("todas");
      element.classList.remove("off");
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
    setSearchText(null);
    var element = document.getElementById("todas");
    element.classList.add("off");
    }

   
  return (
    <>
    {isAuth ? (
      <> 
     <Header/>
    <Container className="themed-container" fluid={true}>

     <Row>
      <Col  md="12" lg={{ size: 4, offset: 1}}>
      <Calendar
      value={selectedDay}
      onChange={setSelectedDay, (e) => {toFind(e)}}
      shouldHighlightWeekends
      calendarTodayClassName="custom-today-day"
      />

      

      </Col>

     <Col md="12" lg={{ size: 6, offset: 1}}>

     <div className="fechaActual">
     <h1 id="searchText">{searchText}</h1>
     <Button id="todas" className="btn btn-info off" onClick={Todas}>Ver todas las citas</Button >
     </div> 
     
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
      </Col>
    </Row>
   </Container>   
   
     
  
    <Footer/>
    </>
    ) : (
       <Home />
     )} 
    </>     
  );
}

export default ScheduleList;
