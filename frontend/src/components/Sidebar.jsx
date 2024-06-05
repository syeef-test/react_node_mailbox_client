import React from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="col-md-1 p-3 bg-light">
      <div>
        <NavLink to="/sendMail">
          <Button variant="primary">Compose</Button>
        </NavLink>
      </div>

      <ListGroup>
        <ListGroup.Item as={NavLink} to="/inbox">
          Inbox
        </ListGroup.Item>
        <ListGroup.Item action href="#">
          Sent
        </ListGroup.Item>
        <ListGroup.Item action href="#">
          Drafts
        </ListGroup.Item>
        <ListGroup.Item action href="#">
          Spam
        </ListGroup.Item>
        <ListGroup.Item action href="#">
          Trash
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
