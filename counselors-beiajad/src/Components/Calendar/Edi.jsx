import React, { useState, useContext } from 'react'
import axios from 'axios'
import './Calendar.css'
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom'




function Edi() {
    const { user1, isAuth } = useContext(AuthContext)    
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState('')
    const [user] = useState(user1.id)
    const [schedule, setSchedule] = useState([]);
    
   

    const clear = ()=>{  
        setDate ('')
        setTime ('')
        setNote ('')
    }

    // const IdUser = schedule.filter((a) => {
    //     if(user1.id === a.user[0]._id){
    //       return a    
    //     }
    //   });

    const editDate = ()=>{
      //  event.preventDefault();
        const URL = `http://localhost:8000/api/v1/schedule/5f4bb25f9379e20aadf02faa`
       
        axios.patch(URL, {
        
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
               alert('Editado con exito')
               window.location.reload()
               
               clear()
    
           }).catch((error)=>{
               alert('Hubo un error, revisa que paso')
               console.log(error)
           })
 
  
        }
    
    
    return (
     <>
    {isAuth ? ( 
     <div className="container calendar" >

        <h3>Editar una cita</h3>   

        <br></br> 
        
        <form onSubmit={editDate}>

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
            
            <button onClick={() => editDate()} className="btn btn-info"> Editar</button> 
            
            </div>   

        </form>
    </div>
     ) : (
        <Link to="/login"> Ir a inicio </Link>  
      )} 
    </>
    )
}

export default Edi