import React from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Sidebar = () => {
  return (
    <div className="col-md-1 p-3 bg-light">
      <div>
        <Button variant="primary">Compose</Button>
      </div>

      <ListGroup>
        <ListGroup.Item action href="#">
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
