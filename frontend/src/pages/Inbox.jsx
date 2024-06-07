import React, { useEffect, useReducer } from "react";
import Sidebar from "../components/Sidebar";
import EmailList from "../components/EmailList";
import { Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import axios from "axios";

const initialState = {
  emails: [],
  count: 0,
  unreadCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAILS":
      const unreadEmails = action.payload.filter((email) => !email.read);
      return {
        ...state,
        emails: action.payload,
        count: action.payload.length,
        unreadCount: unreadEmails.length,
      };
    case "MARK_AS_READ":
      const updatedEmails = state.emails.map((email) =>
        email._id === action.payload ? { ...email, read: true } : email
      );
      const updatedUnreadEmails = updatedEmails.filter((email) => !email.read);
      return {
        ...state,
        emails: updatedEmails,
        unreadCount: updatedUnreadEmails.length,
      };
    default:
      return state;
  }
};

const Inbox = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        //setEmails(response.data.data);
        dispatch({ type: "SET_EMAILS", payload: response.data.data });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleEmailClick = async (emailId) => {
    try {
      const token = localStorage.getItem("token");
      // const response = await axios.post(
      //   `http://127.0.0.1:3000/api/mail/markAsRead/${emailId}`,
      //   {
      //     headers: {
      //       authorization: token,
      //     },
      //   }
      // );

      const response = await axios.post(
        `http://127.0.0.1:3000/api/mail/markAsRead/${emailId}`
      );
      console.log(response);
      if (response) {
        dispatch({ type: "MARK_AS_READ", payload: emailId });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container fluid>
      <Row>
        <Header />
        <Sidebar unreadCount={state.unreadCount} />
        <EmailList emails={state.emails} onEmailClick={handleEmailClick} />
      </Row>
    </Container>
  );
};

export default Inbox;
