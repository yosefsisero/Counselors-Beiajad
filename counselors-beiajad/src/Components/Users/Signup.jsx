import React, { useState } from "react";
import { Container } from 'reactstrap';
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer"
import './Signup.css'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [comunity, setComunity] = useState("");
  const [country, setCountry] = useState(""); 
  const [tel, setTel] = useState("");
  
  const handleForm = async (event) =>{
  event.preventDefault();

  const jsonSend = {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    age,
    comunity,
    country,
    tel
  };

  const SIGNUP_URL = `http://localhost:8000/api/v1/signup/`
    try {
      await axios.post(SIGNUP_URL, jsonSend)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setAge('')
      setComunity('')
      setCountry('')
      setTel('')
      alert('Succesfully created acccount')
    }catch (error){
      alert('Error on signup')
    }
  };

  return (
    <>
    <Header />
      <Container className="themed-container" fluid={true}>
      <h1 className="mb-4 reg">Registrate</h1>
      <Form className="container form-regis" onSubmit={handleForm}>
      <FormGroup>
       <Label>Nombre</Label>
       <Input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        id="firstName"
        name="inputFirstName"
        placeholder="Escribe tu nombre"
        valid
      />
      </FormGroup>
        <FormGroup>
          <Label>Apellido</Label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="lastName"
            id="inputLastname"
            placeholder="Escribe tu apellido"
          />
        </FormGroup>
        <FormGroup>
          <Label>Edad</Label>
          <Input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            name="age"
            id="exampleage"
            placeholder="Escribe tu edad"
          />
        </FormGroup>
        <FormGroup>
          <Label>Comunidad</Label>
          <Input
            value={comunity}
            onChange={(e) => setComunity(e.target.value)}
            type="comunity"
            name="comunity"
            id="examplecomunity"
            placeholder="Comunidad que asistes"
          />
        </FormGroup>
        <FormGroup>
          <Label>País</Label>
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            id="country"
            name="inputcountry"
            placeholder="País de residencia"
          />
        </FormGroup>
        <FormGroup>
          <Label>Tel</Label>
          <Input
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            type="number"
            name="tel"
            id="inputTel"
            placeholder="Teléfono"
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Correo electronico"
          />
        </FormGroup>
        <FormGroup>
          <Label>Contraseña</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Escribe tu contraseña"
          />
        </FormGroup>
        <Button color='info'>Enviar</Button>
      </Form>
      </Container>
      <Footer/>
    </>
  );
};

export default Register;

