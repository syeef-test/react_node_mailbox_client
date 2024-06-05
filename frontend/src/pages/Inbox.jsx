import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import EmailList from "../components/EmailList";
import { Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import axios from "axios";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:3000/api/mail/getInboxMail",
          {
            headers: {
              authorization: token,
            },
          }
        );
        //console.log(response);
        setEmails(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <Container fluid>
      <Row>
        <Header />
        <Sidebar />
        <EmailList emails={emails} />
      </Row>
    </Container>
  );
};

export default Inbox;
