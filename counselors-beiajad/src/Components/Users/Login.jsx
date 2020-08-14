import React, { useState, useContext } from 'react';
import axios from 'axios'
import Header from '../Layout/Header/Header'
import {
  Button,  
  Form,  
  FormGroup,
  Label,  
  Input,
} from 'reactstrap';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext)

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const jsonSend ={
      email,
      password
    };
    const LOGIN_URL= `http://localhost:8000/api/v1/login/`

    try {
      const res = await axios.post(LOGIN_URL, jsonSend)
      loginUser(res.data.token)
      alert('Succesful Login')
    } catch(error){
      alert('Error in Login')
    }
  }
  return (
    <>
    <Header />
      <h1 className="mb-4">Login en mi App</h1>
      <Form className="container" onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="type your email" />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="examplePassword"
            placeholder="type your password here" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </>
  );
}
 
export default Login;
 