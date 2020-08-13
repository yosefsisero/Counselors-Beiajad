import React, { useState } from "react";
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/"></NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink >
              <Link to="/login">Login</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
            <Link to="/register">Register</Link>
            </NavLink>
          </NavItem>
        
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
