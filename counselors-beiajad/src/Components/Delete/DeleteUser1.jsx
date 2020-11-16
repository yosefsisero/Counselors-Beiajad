import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from 'sweetalert2'

function DeleteUser (props) {

       
    const { user1 } = useContext(AuthContext)
    const [schedule, setSchedule] = useState([]);
    const URL_GET_USER = `http://localhost:8000/api/v1/schedule/`;

    const IdUser = schedule.filter((idUsuario) => {
          if(idUsuario.user[0]._id === props.id){
            return idUsuario  
          }
        });
    const usuarioFiltrado = IdUser.map((user) => {
      return user._id
    })
    const URLDELETE = `http://localhost:8000/api/v1/users/${props.id}`;
     
    useEffect(() => {
      axios.get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err))
    }, []);
      

    
    
  
   const Borrar = () => {
    for (let i = 0; i < usuarioFiltrado.length; i++) {
       console.log(2)
      const URLDELETECITAS = `http://localhost:8000/api/v1/schedule/${usuarioFiltrado[i]}`;
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

    }
  }

  
    const BorrarUser =  () => {
       axios.delete(URLDELETE, {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        })
        .then((response)=> {
            // alert(`User Borrado`)
            console.log(response.data)
            window.location.reload()
     
     })  .catch((error) => {
            alert(error)
     
     })
  }

     const eliminate =  () => {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Esta acción no se puede revertir",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Borrar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Borrar()
          BorrarUser()
          Swal.fire('Se elimio con exito', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Lo sentimos esa accion no se pudo completar', '', 'error')
        }
      })
      
      }
    

    return (
        <>
           <button onClick={eliminate} className="btn btn-dark boton">Borrar</button> 
        </>
    )
}

export default DeleteUser