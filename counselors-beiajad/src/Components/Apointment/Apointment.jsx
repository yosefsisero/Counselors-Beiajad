import React, { useState, useContext } from 'react'
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
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState(' ')
    const [user] = useState(user1.id)
    const [selectedDay, setSelectedDay] = useState(defaultValue);
    
 

    const diaSeleccionado = (selectedDay) => {
        if(selectedDay.month < 10){  
            setDate(`${selectedDay.year}-0${selectedDay.month}-${selectedDay.day}T `); 
        }else{
            setDate(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}T `);
        }
      }

    const hora = (horario) => {
      setTime(horario) 
      setDate(date + horario)
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

        <h3>Crear una cita</h3>   

        <br></br> 
        
        

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
             
         

        
        
        <button onClick={() => hora("11:00")} className="btn btn-info">11:00</button>
        <button  onClick={() => hora("12:00")} className="btn btn-info">12:00</button> 
          <h1>{date.split("T")}</h1>
        <button type="submit" onClick={() => {saveDate()}} className="btn btn-info"> Confirmar cita</button> 
             
    </div>
    </>
    )
}

export default Apointment