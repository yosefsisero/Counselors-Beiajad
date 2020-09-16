import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";
import { Table } from 'reactstrap';
import Editar from '../Delete/DeleteSchedule'
import Home from '../../Pages/Home/Home'
import Inicio from "./Inicio";

function ScheduleList() {
  
  const { isAuth } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  

  const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"];   // excluye datos del arreglo del filtro
  

  const URL_GET_SCHEDULE = "http://localhost:8000/api/v1/schedule";

  useEffect(() => {
    axios
      .get(URL_GET_SCHEDULE, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => (setSchedule(data.data), setData(data.data)))
      .catch((err) => console.log(err));
  }, []);
     
     
  const handleChange = value => {
    setSearchText(value);
    filterData(value);
  };
  
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(schedule);
    else {
      const filteredData = schedule.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue) 
        )
      });
      setData(filteredData);
    }
  }

  return (
    <>
    {isAuth ? (
      <>
      <div>
       <label>Busqueda</label>
       <input className="form-control buscador"
       style={{ marginLeft: 5 }}
       type="text"
       value={searchText}
       onChange={e => handleChange(e.target.value)}
      />
      </div>
    
    <Table striped>
      <thead>
        <tr>
          
          <th>Fecha</th>
          <th>Hora</th>
          <th>Note</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Tel</th>
          <th>Borrar</th>

        </tr>
      </thead>
      <tbody>
      {data.map((user) => (
        <tr>         
          
          <td >{user.date.split("T")[0]}</td>
          <td >{user.time}</td>
          <td >{user.note}</td>
          <td >{user.user[0].first_name}</td>
          <td >{user.user[0].last_name}</td>
          <td >{user.user[0].tel}</td>
          <td><Editar id={user._id}/></td>
            
        </tr>
        ))}
        
      </tbody>
    </Table>
    <div className="clearboth">
    {data.length === 0 && <span>No hay resultados!</span>}
    </div>
        
    </>
    ) : (
       <Link to="/"> Ir a inicio </Link>
     )} 
    </>     
  );
}

export default ScheduleList;
