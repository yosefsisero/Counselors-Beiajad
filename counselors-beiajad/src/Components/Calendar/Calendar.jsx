import React, { useState } from 'react'
import axios from 'axios'


function Calendar() {
    const URL ="http://localhost:8000/api/v1/schedule/"

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState('')
    const [user, setUser] = useState('5f346c0f712d15180848c4da')

    const clear = ()=>{  
        setDate ('')
        setTime ('')
        setNote ('')
        setUser ('5f346c0f712d15180848c4da')
    }

    const saveDate = (event)=>{
       event.preventDefault();
       console.log("Dieron click en crear")
       
       axios.post(URL, {

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