import React, { useState, useContext } from 'react'
import axios from 'axios'

import { AuthContext } from '../../contexts/AuthContext';



function Calendar() {
    const { user1 } = useContext(AuthContext)

    const URL = "http://localhost:8000/api/v1/schedule/"

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState(' ')
    const [user] = useState(user1.id)

    const clear = ()=>{  
        setDate ('')
        setTime ('')
        setNote ('')
    }

    const saveDate = (event)=>{
       event.preventDefault();
       console.log("Dieron click en crear")
       
       axios.post(URL, {
        headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
            date,
            time,
            note,
            user,
      
           }).then(()=>{
               alert('Creado con exito')
               clear()
    
           }).catch((error)=>{
               alert('Hubo un error, revisa que paso')
               console.log(error)
           })
       }
      
    
    
    return (
     <>
        
     <div className="container" >

        <h3>Crear una cita</h3>   

        <br></br> 

        <form onSubmit={saveDate}>

            <div className="form-group">

            <label>¿Cuando quieres la cita?</label>   
            <input 
            className="form-control" 
            type="date"  
            required 
            value={date}
            onChange={(e)=>{setDate(e.target.value)}}
            />

            <br></br> 

            <label>¿A que hora?</label>
            <input 
            className="form-control"  
            type="time" 
            value={time}
            onChange={(e)=>{setTime(e.target.value)}}
           />
            
             <br></br> 

             <label>Nota</label>
             <input
             className="form-control"
             value={note}
             onChange={(e)=>{setNote(e.target.value)}}
             />
             
            <br></br> 

            <button type="submit" className="btn btn-success"> Enviar</button> 
            </div>   

        </form>
    </div>
       
    </>
    )
}

export default Calendar