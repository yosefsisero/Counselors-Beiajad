import React, { useState, useContext } from 'react'
import axios from 'axios'
import './Calendar.css'
import { AuthContext } from '../../contexts/AuthContext';



function Calendar() {
    const { user1 } = useContext(AuthContext)
    
    const URL = "http://localhost:8000/api/v1/schedule/"
    const UrlUsers = `http://localhost:8000/api/v1/users/5f39596088e54006028fdb3e`

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState(' ')
    const [user] = useState(user1.id)

    const envioCitas = []

    const clear = ()=>{  
        setDate ('')
        setTime ('')
        setNote ('')
    }
    
    
    
    const saveDate = (event)=>{
       event.preventDefault();
       console.log("Dieron click en crear")
       
  
        //axios.get para trae que citas tiene el ususario en la base de datos users (suponiendo que tiviera 2 citas anteriores)
        //axios.post es el que ya esta hecho que pone la cita en la base de datos del schedule (aumenatndo una nueva cita)
        //axios.patch que es lo que toma las 2 citas anteriores + la nueva cita y los mete en un arreglo y hace el patch de las 3 citas juntas haciendo el post del usuario con las citas completas

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
               
               clear()
    
           }).catch((error)=>{
               //alert('Hubo un error, revisa que paso')
               console.log(error)
           })
 
    /*------------------------------------------------------------------------ */

    axios.get(UrlUsers, {
      headers: {
        Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
      },
    })
    .then((data) => setUsers(data.data.schedule))
    .catch((err) => console.log(err))

    const citasViejas = users.map((cita) => {
        return cita._id
    })
    console.log(citasViejas)
    /*---------------------------------------------------------------------------- */

     citasViejas.push(envioCitas)



       /*---------------------------------------------------------------------*/ 

           axios.patch(UrlUsers, {
        
            schedule: envioCtas
      
           },
           {
            headers: {
              Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
            },
          }
           ).then(()=>{
               //alert('Creado con exito')
               
               clear()
    
           }).catch((error)=>{
               //alert('Hubo un error, revisa que paso')
               console.log(error)
           })
       
        }
      
    /*--------------------------------------------------------------------------------------*/ 
    
    return (
     <>
        
     <div className="container calendar" >

        <h3>Crear una cita</h3>   

        <br></br> 

        <form onSubmit={saveDate}>

            <div className="form-group">

            <label>¿Cuando quieres la cita?</label>   
            <input 
            className="form-control date" 
            type="date"  
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

            <button type="submit" className="btn btn-info"> Enviar</button> 
            </div>   

        </form>
    </div>
    </>
    )
}

export default Calendar