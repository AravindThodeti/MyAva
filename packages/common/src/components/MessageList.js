import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextMessage from "./TextMessage";
import DocumentMessage from "./DocumentMessage";
import ImageMessage from "./ImageMessage";

const useStyles = makeStyles({
  left: {
    display: "flex",
    justifyContent: "flex-start",
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function MessageList({ messages, profile }) {
  const classes = useStyles();
  const getDirection = (message, profile) => {
    if (profile && profile.user.user_type == "SERVICE_PROVIDER") {
      return message.sender_type == "SERVICE_PROVIDER" &&
        message.sender_id == profile.id
        ? "right"
        : "left";
    } else {
      return message.sender_type == "CUSTOMER" ? "right" : "left";
    }
  };
  const getMessage = (message, profile) => {
    if (message.message_type == "TEXT") {
      return (
        <TextMessage message={message} direction={getDirection(message, profile)} />
      );
    } else if (message.message_type == "IMAGE") {
      return (
        <ImageMessage message={message} direction={getDirection(message, profile)} />
      );
    } else if (message.message_type == "PDF") {
      return (
        <DocumentMessage message={message} direction={getDirection(message, profile)} />
      );
    }
    return <></>;
  };

  const getMessageList = (messages, profile) => {
    return messages.map((message, index) => (
      <ListItem className={classes[getDirection(message, profile)]} key={message.id}>
        {getMessage(message, profile)}
      </ListItem>
    ));
  };
  return (
    <List component="nav" aria-label="main mailbox folders">
      {getMessageList(messages, profile)}
    </List>
  );
}
