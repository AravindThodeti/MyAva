import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { formatRelative } from "date-fns";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    maxWidth: "80vw",
  },
  cardContent: {
    paddingBottom: "2px !important",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  message: {
    whiteSpace: "pre-wrap",
    fontSize: 14,
  },
  left: {
    display: "flex",
    justifyContent: "flex-start",
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
  },
  time: {
    display: "flex",
    fontSize: 12,
    justifyContent: "flex-end",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TextMessage({message, direction}) {
  const classes = useStyles();

  return (
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography
            className={`${classes[direction]} ${classes.title}`}
            color="textSecondary"
          >
            {message.sender_name}
          </Typography>
          <Typography
            className={`${classes[direction]} ${classes.message}`}
            color="textPrimary"
          >
            {message.message}
          </Typography>
          <Typography className={classes.time} color="textSecondary">
            {formatRelative(new Date(message.created_at), new Date())}
          </Typography>
        </CardContent>
      </Card>
  );
};