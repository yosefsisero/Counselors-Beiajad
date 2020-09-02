import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'

function DeleteUser(props) {

       
    const { user1 } = useContext(AuthContext)
    const [schedule, setSchedule] = useState([]);
    const [a, setA] = useState([])
    

    const URL_GET_USER = `http://localhost:8000/api/v1/schedule/`;
     
    const info = () => {

      axios.get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err))
    
    }  
   //----------------------------------------------------
    const IdUser = schedule.filter((a) => {
      if(a.user[0]._id === user1.id){
        return a    
      }
    });
    
    const M = IdUser.map((B) => {
      return B._id
    })

  
   const Borrar = () => {
    for (let i = 0; i < M.length; i++) {

      const URLDELETECITAS = `http://localhost:8000/api/v1/schedule/${M[i]}`;
      axios.delete(URLDELETECITAS, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((response)=> {
          console.log(response.data)
          window.location.reload()
    
    })  .catch((error) => {
          alert(error)
    
    })
    }}
 
    const BorrarUser = () => {
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
     
     })
    }
 
   
    
    
 //---------------------------------------------------


 
    return (
        <>
           <button onClick={(event) => {info(); Borrar(); BorrarUser()}}className="btn btn-dark">Borrar</button> 
        </>
    )
}

export default DeleteUser