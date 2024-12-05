import React from "react";
import { IMessage } from "../../types";
import Row from "react-bootstrap/Row";

const MessageItem: React.FC<IMessage> = ({
  _id,
  author,
  datetime,
  message,
}) => {
  return (
    <Row id={_id} className="border bg-light rounded mb-3 p-3 ">
      <Row className="mb-2 pb-1 border-bottom">
        <span>
          From: <span className="text-primary">{author}</span>
        </span>
        <div>
          <strong> Date: </strong>
          <span>{datetime}</span>
        </div>
      </Row>
      <Row className="pb-1">
        <strong>Text of message: </strong>
        <p className="mt-1">{message}</p>
      </Row>
    </Row>
  );
};

export default MessageItem;
