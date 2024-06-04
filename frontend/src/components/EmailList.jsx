import React from "react";
import { ListGroup } from "react-bootstrap";

const EmailList = () => {
  const emails = [
    {
      id: 1,
      subject: "Welcome to Yahoo",
      sender: "Yahoo Team",
      time: "10:30 AM",
    },
    { id: 2, subject: "Your invoice", sender: "Billing", time: "9:15 AM" },
  ];

  return (
    <div className="col-md-9">
      <h2 className="h4">Inbox</h2>
      <ListGroup>
        {emails.map((email) => (
          <ListGroup.Item
            key={email.id}
            className="d-flex justify-content-between align-items-start"
          >
            <div>
              <div className="fw-bold">{email.subject}</div>
              <small>{email.sender}</small>
            </div>
            <small>{email.time}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EmailList;
