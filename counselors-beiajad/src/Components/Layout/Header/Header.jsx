import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Logo from'../../../Counselor/Logo.jpg'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import Contact from "../../Contact/Contact";
import './Header.css'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/"></NavbarBrand>
      <NavbarToggler onClick={toggle} />       
      <Collapse className="nav" isOpen={isOpen} navbar>
              <div>
               <img className="logo" src={Logo} /> 
              </div>
       
          {isAuth ? (
            <>
              <div className="links">
              <NavLink>
                  <Link to="/">Inicio</Link>
                </NavLink>
              
                <NavLink>
                <Link to="/faq">Preguntas Frecuentes</Link>
                </NavLink>
              
              <NavLink>
                  <Link to="/logout">Cerrar Sesión</Link>
                </NavLink>
               
                <NavLink>
                  <Contact/>
                </NavLink>
              </div>
               
            </>
          ) : (
     
           <>
              <div className="links">
                <NavLink>
                  <Link to="/">Inicio</Link>
                </NavLink>

                <NavLink>
                <Link to="/faq">Preguntas Frecuentes</Link>
                </NavLink>

                <NavLink>
                  <Link to="/register">Registrate</Link>
                </NavLink>
              
            
                <NavLink>
                  <Link to="/login">Iniciar Sesión</Link>
                </NavLink>

               
                <NavLink>
                  <Contact/>
                </NavLink>
              </div>
               
                </>
         )}                
      </Collapse>
    </Navbar>
  );
};

export default Header;
