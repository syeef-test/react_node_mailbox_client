import React from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const Sidebar = ({ unreadCount, onSelect }) => {
  return (
    <div className="col-md-1 p-3 bg-light">
      <div>
        <NavLink to="/sendMail">
          <Button variant="primary">Compose</Button>
        </NavLink>
      </div>

      <ListGroup>
        <ListGroup.Item action onClick={() => onSelect("inbox")}>
          Inbox <span className="badge bg-primary">{unreadCount}</span>
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => onSelect("sent")}>
          Sent
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
