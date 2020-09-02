import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

function DeleteUser(props) {

    const { user1 } = useContext(AuthContext)

const Borrar = () => {
   

 const [schedule, setSchedule] = useState([]);

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
 })
//----------------------------------------------------

const URLDELETECITAS = `http://localhost:8000/api/v1/schedule/${a._id}`;

axios.delete(URLDELETECITAS, {
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


 //--------------------------------------------------
 
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

 //---------------------------------------------------
}
    

    return (
        <>
           <button onClick={Borrar} className="btn btn-dark">Borrar</button> 
        </>
    )
}

export default DeleteUser