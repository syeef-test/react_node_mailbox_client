import React, { useEffect, useReducer, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import EmailList from "../components/EmailList";
import { Container, Row, Alert, Spinner } from "react-bootstrap";

import useAxios from "../hooks/useAxios/index.js";

const initialState = {
  emails: [],
  count: 0,
  unreadCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAILS":
      //console.log("Action payload:", action.payload);
      let unreadEmails;

      //working for intial get request for comp as object is returned
      unreadEmails = action.payload.data.filter((email) => !email.read);
      return {
        ...state,
        emails: action.payload.data,
        count: action.payload.data.length,
        unreadCount: unreadEmails.length,
      };
    case "MARK_AS_READ":
      // console.log("MARK_AS_READ payload:", action.payload);
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
  const { response, error, loading, fetchData } = useAxios();
  const [selectedEmail, setSelectedEmail] = useState(null);

  const fetchEmails = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const url = view === "inbox" ? "mail/getInboxMail" : "mail/getSentMail";

      await fetchData({
        url,
        method: "GET",
        headers: { authorization: token },
      });

      //dispatch({ type: "SET_EMAILS", payload: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }, [view, fetchData]);

  useEffect(() => {
    fetchEmails();

    const interval = setInterval(() => {
      fetchEmails();
    }, 30000);

    return () => clearInterval(interval);
  }, [view]);

  useEffect(() => {
    if (response) {
      console.log("useeffesct", response);

      if (response.message === "Mail data found in inbox") {
        dispatch({ type: "SET_EMAILS", payload: response });
      }

      if (response.message === "Mail data found in sent") {
        dispatch({ type: "SET_EMAILS", payload: response });
      }

      if (response.message === "Mail marked as read") {
        const emailId = response.data._id;
        dispatch({ type: "MARK_AS_READ", payload: emailId });
        //console.log(response.data);
      }

      if (response.message === "Mail marked as delete") {
        const emailId = response.data._id;
        dispatch({ type: "MARK_AS_DELETE", payload: emailId });
      }
    }
  }, [response]);

  const handleEmailClick = async (email) => {
    try {
      //console.log(emailId);
      const token = localStorage.getItem("token");
      fetchData({
        url: `mail/markAsRead/${email._id}`,
        method: "POST",
      });
      const emailId = email._id;
      // dispatch({ type: "MARK_AS_READ", payload: emailId });
      const selected = state.emails.find((email) => email._id === emailId);
      setSelectedEmail(selected);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackClick = () => setSelectedEmail(null);

  const handleEmailDelete = async (emailId) => {
    try {
      fetchData({
        url: `mail/markAsDelete/${emailId}`,
        method: "POST",
      });
      //dispatch({ type: "MARK_AS_DELETE", payload: emailId });
      setSelectedEmail(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container fluid>
      <Row>
        <Sidebar unreadCount={state.unreadCount} onSelect={setView} />
        {loading ? (
          <Spinner animation="border" role="status" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <EmailList
            emails={state.emails}
            selectedEmail={selectedEmail}
            onEmailClick={handleEmailClick}
            onDeleteClick={handleEmailDelete}
            onBackClick={handleBackClick}
          />
        )}
      </Row>
    </Container>
  );
};

export default Inbox;
