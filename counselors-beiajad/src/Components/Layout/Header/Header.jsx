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
      <Collapse isOpen={isOpen} navbar>
              <div>
               <img className="logo" src={Logo} /> 
              </div>
        <Nav className="mr-auto" navbar>
          {isAuth ? (
            <>
              <NavItem>
                <NavLink>
                  <Link to="/">Inicio</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                <Link to="/faq">Preguntas Frecuentes</Link>
                </NavLink>
              </NavItem>
              <NavItem>
              <NavLink>
                  <Link to="/logout">Cerrar Sesión</Link>
                </NavLink>
              </NavItem>
              <NavItem> 
                <NavLink>
                  <Contact/>
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink>
                  <Link to="/">Inicio</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                <Link to="/faq">Preguntas Frecuentes</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/register">Registrate</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/login">Iniciar Sesión</Link>
                </NavLink>
              </NavItem>
              <NavbarText> 
                <NavLink>
                  <Contact/>
                </NavLink>
              </NavbarText>
            </>
          )}
        </Nav>
        
                <NavLink>
                  <Link to="/register">Registrate</Link>
                </NavLink>
              
            
                <NavLink>
                  <Link to="/login">Iniciar Sesión</Link>
                </NavLink>
             
      </Collapse>
    </Navbar>
  );
};

export default Header;
