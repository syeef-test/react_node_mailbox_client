import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import "../css/EmailList.css";

const EmailList = ({ emails, onEmailClick }) => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    onEmailClick(email._id);
    setSelectedEmail(email);
  };

  const handleBackClick = () => setSelectedEmail(null);

  return (
    <div className="col-md-9">
      <h2 className="h4">Inbox</h2>
      {!selectedEmail ? (
        <ListGroup>
          {emails.length > 0 &&
            emails.map((email) => (
              <ListGroup.Item
                key={email._id}
                className="d-flex justify-content-between align-items-start"
                onClick={() => handleEmailClick(email)}
              >
                <div>
                  {!email.read && <span className="blue-dot"></span>}
                  <div className="fw-bold">{email.subject}</div>
                  <small>{email.from}</small>
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      ) : (
        <div>
          <Button variant="secondary" onClick={handleBackClick}>
            Back to Inbox
          </Button>
          <div className="email-details">
            <h3>Subject:{selectedEmail.subject}</h3>
            <p>
              <strong>From:</strong> {selectedEmail.from}
            </p>
            <p>
              <strong>To:</strong> {selectedEmail.to}
            </p>
            <div dangerouslySetInnerHTML={{ __html: selectedEmail.body }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailList;
