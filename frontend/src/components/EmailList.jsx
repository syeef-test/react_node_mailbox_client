import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import "../css/EmailList.css";

const EmailList = ({
  emails,
  selectedEmail,
  onEmailClick,
  onDeleteClick,
  onBackClick,
}) => {
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
                onClick={() => onEmailClick(email)}
              >
                <div>
                  {!email.read && <span className="blue-dot"></span>}
                  <div className="fw-bold">{email.subject}</div>
                  <small>
                    <h6>From:</h6> {email.from}
                  </small>
                  <small>
                    <h6>To:</h6> {email.to}
                  </small>
                </div>
                <div>
                  <Button
                    variant="danger"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteClick(email._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      ) : (
        <div>
          <Button variant="secondary" onClick={onBackClick}>
            Back
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
