import React, { useEffect, useReducer, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import EmailList from "../components/EmailList";
import { Container, Row } from "react-bootstrap";
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
    case "MARK_AS_DELETE":
      const remainingEmails = state.emails.filter(
        (email) => email._id !== action.payload
      );
      const remainingUnreadEmails = remainingEmails.filter(
        (email) => !email.read
      );
      return {
        ...state,
        emails: remainingEmails,
        count: remainingEmails.length,
        unreadCount: remainingUnreadEmails.length,
      };

    default:
      return state;
  }
};

const Inbox = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [view, setView] = useState("inbox");

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const url =
        view === "inbox"
          ? "http://127.0.0.1:3000/api/mail/getInboxMail"
          : "http://127.0.0.1:3000/api/mail/getSentMail";
      const response = await axios.get(url, {
        headers: { authorization: token },
      });

      dispatch({ type: "SET_EMAILS", payload: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }, [view]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchData]);

  const handleEmailClick = async (emailId) => {
    try {
      const token = localStorage.getItem("token");

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

  const handleEmailDelete = async (emailId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/api/mail/markAsDelete/${emailId}`
      );
      console.log(response);
      if (response) {
        dispatch({ type: "MARK_AS_DELETE", payload: emailId });
        console.log("email deletd");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container fluid>
      <Row>
        <Sidebar unreadCount={state.unreadCount} onSelect={setView} />
        <EmailList
          emails={state.emails}
          onEmailClick={handleEmailClick}
          onDeleteClick={handleEmailDelete}
        />
      </Row>
    </Container>
  );
};

export default Inbox;
