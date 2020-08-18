import React, { useState } from "react";
import Header from "../Layout/Header/Header";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
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
      <h1 className="mb-4">Signup</h1>
      <Form className="container" onSubmit={handleForm}>
      <FormGroup>
       <Label>First Name</Label>
       <Input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        id="firstName"
        name="inputFirstName"
        placeholder="type your first name"
      />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="lastName"
            id="inputLastname"
            placeholder="type your last name"
          />
        </FormGroup>
        <FormGroup>
          <Label>Age</Label>
          <Input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            name="age"
            id="exampleage"
            placeholder="type your age"
          />
        </FormGroup>
        <FormGroup>
          <Label>Comunity</Label>
          <Input
            value={comunity}
            onChange={(e) => setComunity(e.target.value)}
            type="comunity"
            name="comunity"
            id="examplecomunity"
            placeholder="type your comunity here"
          />
        </FormGroup>
        <FormGroup>
          <Label>Country</Label>
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            id="country"
            name="inputcountry"
            placeholder="type your country"
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
            placeholder="type your telephone"
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
            placeholder="type your email"
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="examplePassword"
            placeholder="type your password here"
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default Register;

