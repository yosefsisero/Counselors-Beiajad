import React, { useState } from 'react'
import { Modal, ModalFooter, Button } from 'reactstrap';
import axios from 'axios'
import '../Apointment/Apointment.css'
import Apointment from '../../Components/Apointment/Apointment'


function EditSchedule(props) {
        
    const URL = `http://localhost:8000/api/v1/schedule/${props.id}`

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState('')
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const { className } = props;
    

    const clear = ()=>{  
        setDate ('')
        setTime ('')
        setNote ('')
    }

    const editDate = (event)=>{
       event.preventDefault();
       console.log("Dieron click en crear")
       
        axios.patch(URL, {
        
            date,
            time,
            note,

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
     
      <Button color="info" onClick={toggle}>Editar</Button>
       <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalFooter>
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

            <button type="submit" className="btn btn-info"> Guardar Cambios</button> 
            </div>   

          </form>
       </div>
     </ModalFooter>
   </Modal>

    </>
    )
}

export default EditSchedule