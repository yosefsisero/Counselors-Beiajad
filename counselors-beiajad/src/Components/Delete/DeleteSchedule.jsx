import React, { useEffect } from 'react'
import axios from "axios";

function DeleteSchedule(props) {

const Borrar = () => {
    
    const URLDELETE = `http://localhost:8000/api/v1/schedule/${props.id}`;
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
    

    return (
        <>
           <button onClick={Borrar} className="btn btn-dark boton">Borrar</button> 
        </>
    )
}

export default DeleteSchedule
