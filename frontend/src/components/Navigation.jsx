import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-reducer";

function Navigation() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(authActions.logout());
    alert("Logout Succesful");
    history.push("/signin");
  };

  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Mailbox Client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuth && <NavLink to="/signup">Signup</NavLink>}
          </Nav>
          <Nav className="me-auto">
            {!isAuth && <NavLink to="/signin">Signin</NavLink>}
          </Nav>
          <Nav className="me-auto">
            {isAuth && <NavLink to="/sendMail">Send Mail</NavLink>}
          </Nav>
          <Nav className="me-auto">
            {isAuth && <NavLink to="/inbox">Inbox</NavLink>}
          </Nav>
          <Nav className="me-auto">
            {isAuth && (
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="success">Search</Button>
              </Form>
            )}
          </Nav>
          {isAuth && (
            <Button
              variant="danger"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Navbar.Collapse>
        <ul></ul>
      </Container>
    </Navbar>
  );
}

export default Navigation;
