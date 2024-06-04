import React from "react";
import Sidebar from "../components/Sidebar";
import EmailList from "../components/EmailList";
import { Container, Row } from "react-bootstrap";
import Header from "../components/Header";

const Inbox = () => {
  return (
    <Container fluid>
      <Row>
        <Header />
        <Sidebar />
        <EmailList />
      </Row>
    </Container>
  );
};

export default Inbox;
