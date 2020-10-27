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
    const [time, setTime] = useState('10:00')
    const [note, setNote] = useState(' ')
    const [user] = useState(user1.id)
    const [selectedDay, setSelectedDay] = useState(defaultValue);
    const [z, setZ] = useState("")
    
    const x = 

    
    console.log(time)
    console.log(z)
    console.log(date)

    const clear = ()=>{  
        setDate ('')
        setTime ('')
        setNote ('')
    }

    const toFind = (selectedDay) => {
        let dia = selectedDay.day
        let month = selectedDay.month
        let year = selectedDay.year
        if(month < 10){
            setZ(`${year}-0${month}-${dia}`);
        }else{
            setZ(`${year}-${month}-${dia}`);
        }
      }
    const armado = () => {
        setTime("12:00")
        setDate(`${z}T${time}`)
    }
    const saveDate = (event)=>{
      // event.preventDefault();
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
               
               clear()
    
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
          onChange={setSelectedDay, (e)=>{toFind(e)}}
          shouldHighlightWeekends
          calendarTodayClassName="custom-today-day"
        />


            <div className="form-group">

            <label>¿Cuando quieres la cita?</label>   
            <input 
            className="form-control date" 
            type="datetime-local"  
            required 
            value={date}
            onChange={(e)=>{setDate(e.target.value)}}
            />

            <br></br> 

            <label>¿A que hora?</label>
            <input 
            className="form-control time"  
            type="time" 
            required
            value={time}
            onChange={(e)=>{setTime(e.target.value)}}
            />
            
             <br></br> 

             <label>Nota</label>
             <input
             className="form-control note"
             value={note}
             onChange={(e)=>{setNote(e.target.value)}}
             />
             
            <br></br> 

           
            
           </div>   

        
        
        <button onClick={() => {setTime("11:00"); armado()}} className="btn btn-info">11:00</button>
        <button onClick={armado} className="btn btn-info">12:00</button>  
        <button type="submit" onClick={() => {saveDate()}} className="btn btn-info"> Enviar</button> 
             
    </div>
    </>
    )
}

export default Apointment