import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Mailbox Client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/signup">Signup</NavLink>
          </Nav>
        </Navbar.Collapse>
        <ul></ul>
      </Container>
    </Navbar>
  );
}

export default Navigation;
