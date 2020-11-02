import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import './Apointment.css'
import { AuthContext } from '../../contexts/AuthContext';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";


function Apointment() {
  
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth()+1;
  let day = d.getDate();

  const defaultValue = {
    year: year,
    month: month,
    day: day,
  };

    const { user1 } = useContext(AuthContext)    
    const URL = "http://localhost:8000/api/v1/schedule/"
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState('')
    const [date2, setDate2] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState(' ')
    const [user] = useState(user1.id)
    const [selectedDay, setSelectedDay] = useState(defaultValue);
    const [fecha, setFecha] = useState('')
    
    useEffect(() => {
      axios
        .get(URL, {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        })
        .then((data) => (setSchedule(data.data)))
        .catch((err) => console.log(err));
    }, []);

    const diaSeleccionado = (selectedDay) => {
        if(selectedDay.month < 10){  
          if (selectedDay.day < 10){
            setDate(`${selectedDay.year}-0${selectedDay.month}-0${selectedDay.day}T`); 
            setDate2(`${selectedDay.year}-0${selectedDay.month}-0${selectedDay.day}T`);
            setFecha(`0${selectedDay.day}/0${selectedDay.month}/${selectedDay.year}T     `);
        }else{
            setDate(`${selectedDay.year}-0${selectedDay.month}-${selectedDay.day}T`);
            setDate2(`${selectedDay.year}-0${selectedDay.month}-${selectedDay.day}T`);
            setFecha(`${selectedDay.day}/0${selectedDay.month}/${selectedDay.year}T     `);
        }
      }
      else {
          if (selectedDay.day < 10){
            setDate(`${selectedDay.year}-${selectedDay.month}-0${selectedDay.day}T`); 
            setDate2(`${selectedDay.year}-${selectedDay.month}-0${selectedDay.day}T`);
            setFecha(`0${selectedDay.day}/${selectedDay.month}/${selectedDay.year}T     `);
        }else{
            setDate(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}T`);
            setDate2(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}T`);
            setFecha(`${selectedDay.day}/${selectedDay.month}/${selectedDay.year}T     `);
        }
      }
    }

    const hora = (horario) => {
      setTime(horario) 
      let x = date.slice(0, 11)
      let y = fecha.slice(0, 11)
      setDate(`${x}${horario}`)
      setDate2(`${x}${horario}:00.000Z`)
      setFecha(`${y}  ${horario}`)
    }
    
    const chequeo = () => {
        schedule.map((info) =>{
        
        let citaApi = new Date(info.date).valueOf()
        
        let pick = new Date(date2).valueOf()

        let horario = 1000 * 60 * 60 * 6; // aqui sumo 6 horas para México

        let escogida = pick+horario // aqui suma las horas de mexico

        //var element = document.getElementById("todas");

        console.log(citaApi + "cita de api");
        console.log(escogida + "escogida para comparar")
        console.log(pick+"cita escogida sin suma")
        console.log(date2 +"cita escogida sin sumar horas y sin convertir")
        

        citaApi == escogida ? 
        (console.log("desaparece")
        //element.classList.add("off")
        ) : (
        console.log("aparece")
        //element.classList.remove("off")
        )
      }
      )
    }


    const saveDate = ()=>{
       
       console.log("Dieron click en crear")
       
        axios.post(URL, {
        
            date,
            time,
            note,
            user,
      
           },
           {
            headers: {
              Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
            },
          }
           ).then(()=>{
               //alert('Creado con exito')
               window.location.reload()
               
    
           }).catch((error)=>{
               //alert('Hubo un error, revisa que paso')
               console.log(error)
           })
 
  
        }
    

    return (
     <>
        
     <div className="container calendar" >

        <h3>Escoge tu cita</h3>   
        
        <Calendar
          value={selectedDay}
          onChange={setSelectedDay, (e)=>{diaSeleccionado(e)}}
          shouldHighlightWeekends
          calendarTodayClassName="custom-today-day"
        />


            

       <label>Nota</label>
       <input
       className="form-control note"
       value={note}
       onChange={(e)=>{setNote(e.target.value)}}
       />
     
          <button id="todas" onClick={() => hora("10:00")} className="btn btn-info">10:00</button>
          <button id="todas" onClick={() => hora("11:00")} className="btn btn-info">11:00</button>
          <button id="todas" onClick={() => hora("12:00")} className="btn btn-info">12:00</button> 
          <button id="todas" onClick={() => hora("13:00")} className="btn btn-info">13:00</button> 
          <button id="todas" onClick={() => hora("14:00")} className="btn btn-info">14:00</button>
          <button onClick={() => chequeo()} className="btn btn-info">checar</button>
      <h1 className="CitaSeleccionada">Tu cita sera programada para el día:</h1>
      <h1 className="CitaSeleccionada">{fecha.replace("T", " ")}</h1>
      <button type="submit" onClick={() => {saveDate()}} className="btn btn-info"> Confirmar cita</button> 
             
    </div>
    </>
    )
}

export default Apointment