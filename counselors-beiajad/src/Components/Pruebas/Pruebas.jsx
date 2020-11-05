import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";
import { Table, Button, Container, Row, Col } from 'reactstrap';
import Editar from '../Delete/DeleteSchedule'
import Home from '../../Pages/Home/Home'

import { Calendar } from "react-modern-calendar-datepicker";
import './Pruebas.css'
import { MDBContainer } from "mdbreact";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";

function Pruebas
() {

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
  const [botones, setBotones] = useState (["10:00","11:00","12:00","13:00"])
  const [borbot, setBorbot] = useState ([])




  

  const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"];   // excluye datos del arreglo del filtro
  
  const scrollContainerStyle = { width: "100%", maxHeight: "400px" };
  
  
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
      if(dia <10){
      filterData(`${year}-0${month}-0${dia}`);
      setSearchText(`0${dia}/0${month}/${year}`);
    }else{
      filterData(`${year}-0${month}-${dia}`);
      setSearchText(`${dia}/0${month}/${year}`);
    }
  }
  else {
    if (dia < 10) {
      filterData(`${year}-${month}-0${dia}`);
      setSearchText(`0${dia}/${month}/${year}`);
    }else{
      filterData(`${year}-${month}-${dia}`);
      setSearchText(`${dia}/${month}/${year}`);

      }
    }
  

    var element = document.getElementById("todas");
      element.classList.remove("off");

    var element1 = document.getElementById("searchText");
      element1.classList.remove("off");
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

    var element1 = document.getElementById("searchText");
    element1.classList.add("off");
    }

   const verify = () => {
    data.map((user) => (     
      borbot.push(user.time), console.log(borbot+"botones para borrar"), console.log(botones+"botones disponibles")
      
    ))
    const gg = botones.filter(item => !borbot.includes(item))
    console.log(gg+"estas horas estan disponibles")
    setBotones(gg)
   }



    let forDeletion = ["11:00","12:00"] // get obtener citas del dia

    let arr = ["10:00","11:00","12:00","13:00"] //const tus botones
    
    arr = arr.filter(item => !forDeletion.includes(item))
    // !!! Read below about array.includes(...) support !!!
    console.log(forDeletion)
    console.log(arr)
  
  
 

 
   
  return (
    <>
    {isAuth ? (
      <> 
      <div className="headerSchedule">
      <Header/>
      </div>
     
    <Container className="themed-container" fluid={true}>
      <h1 className="titulo">Agenda</h1>
     <Row>
      <Col className="padCal"  xl={{ size: 4}}>

      <Calendar
      value={selectedDay}
      onChange={setSelectedDay, (e) => {toFind(e)}}
      shouldHighlightWeekends
      calendarTodayClassName="custom-today-day"
      />

      </Col>

     <Col xl={{ size: 8}}>

     <div className="fechaActual">
       <h1 id="searchText" className="off">{searchText}</h1>
       <Button id="todas" className="btn btn-info off" onClick={Todas}>Ver todas las citas</Button >
     </div>

     <MDBContainer>
      <div className="scrollbar scrollbar-info  mt-5 mx-auto" style={scrollContainerStyle}>
      <Table striped>
      <button onClick = {verify}>verify</button>
      <tbody>

        
      {botones.map((hora) => (       
          <button >{hora}</button>
        ))}
        
      </tbody>
    </Table>

    <div className="clearboth">
    {data.length === 0 && <span>Hoy no hay citas</span>}
    </div>

      </div>
    </MDBContainer>
   
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

export default Pruebas
;
