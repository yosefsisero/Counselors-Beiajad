import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from 'sweetalert2'

function DeleteUser (props) {

       
    const { user1 } = useContext(AuthContext)
    const [schedule, setSchedule] = useState([]);
    

    const URL_GET_USER = `http://localhost:8000/api/v1/schedule/`;
     
    useEffect(() => {
      console.log(1)
      axios.get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err))
    }, []);
      
   //----------------------------------------------------
    const IdUser = schedule.filter((a) => {
      if(a.user[0]._id === props.id){
        return a    
      }
    });
    
    const M = IdUser.map((B) => {
      return B._id
    })

  
   const Borrar = () => {
    for (let i = 0; i < M.length; i++) {
      console.log(2)
      const URLDELETECITAS = `http://localhost:8000/api/v1/schedule/${M[i]}`;
      axios.delete(URLDELETECITAS, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((response)=> {
          console.log(response.data)    
    }) 
    .catch((error) => {
          alert(error)
    })

    }}

  
    const BorrarUser =  () => {
      console.log(3)
      const URLDELETE = `http://localhost:8000/api/v1/users/${props.id}`;
       axios.delete(URLDELETE, {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        })
        .then((response)=> {
            alert(`User Borrado`)
            console.log(response.data)
            window.location.reload()
     
     })  .catch((error) => {
            alert(error)
     
     })}
    

    return (
        <>
           <button onClick={() => {Borrar(); BorrarUser()}}className="btn btn-dark boton">Borrar</button> 
        </>
    )
}

export default DeleteUser