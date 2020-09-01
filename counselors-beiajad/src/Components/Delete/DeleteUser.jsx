import React, { useEffect } from 'react'
import axios from "axios";

function DeleteUser(props) {

const Borrar = () => {
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
    

    return (
        <>
           <button onClick={Borrar} className="btn btn-dark">Borrar</button> 
        </>
    )
}

export default DeleteUser