import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import axios from "axios";
import { Table, Modal, ModalFooter, Button } from 'reactstrap';
import './Citas.css'
// import Editar from '../../Components/Calendar/Editar';
import '../Modal/Logi.css'


function Citas(props) {
  const { user1, isAuth } = useContext(AuthContext)

  const {
    className
  } = props;  

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [schedule, setSchedule] = useState([]);

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [note, setNote] = useState('')

  const clear = ()=>{  
        setDate ('')
        setTime ('')
        setNote ('')
    }
 
  
  
  
  const URL_GET_USER = `http://localhost:8000/api/v1/schedule/`;
  useEffect(() => {
    axios.get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err));
  }, []);

  const IdUser = schedule.filter((a) => {
    if(a.user[0]._id === user1.id){
      return a    
    }
  });


  //-----------------------------------------------
    
  
  const Delete = (id) => {

      const URLDELETE = `http://localhost:8000/api/v1/schedule/${id}`;
    
        axios.delete(URLDELETE, {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        })
        .then((response)=> {
            alert(`Cita Borrada`)
            console.log(response.data)
            window.location.reload()
    
     })  .catch((error) => {
            alert(error)
    
     })

    } 
       
  //-----------------------------------------------


  const editDate = (id)=>{
    //  id.preventDefault();
      const URLEDIT = `http://localhost:8000/api/v1/schedule/${id}`
     
      axios.patch(URLEDIT, {
      
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
            //  window.location.reload()
             
             clear()
  
         }).catch((error)=>{
             alert('Hubo un error, revisa que paso')
             console.log(error)
         })


      }
  //-----------------------------------------------
  
 
  
  return (
    <>
    {isAuth ? (
    <Table className="citas" striped>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
      {IdUser.map((user) => (
        <tr>         
          <td key={user.date}>{user.date.split("T")[0]}</td>
          <td key={user.time}>{user.time}</td>
          <td key={user.note}>{user.note}</td>
          <td><button onClick={() => Delete(user._id)} className="btn btn-dark">Borrar</button></td>

        <td>
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
            
            <button onClick={() => editDate(user._id)} className="btn btn-info">Editar</button> 
            
            </div>   

        </form>
    </div>

        </ModalFooter>
        
      </Modal>

      </td>


          {/* <td><button onClick={() => editDate(user._id)} className="btn btn-dark">Borrar</button></td>  */}



        </tr>
        
        ))}
        
      </tbody>
    </Table>
    ) : (
      <Link to="/login"> Ir a inicio </Link>  
    )} 
    </>     
  ); 
}

export default Citas;