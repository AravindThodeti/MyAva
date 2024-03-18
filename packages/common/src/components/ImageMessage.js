import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { formatRelative } from "date-fns";
import CardHeader from "@material-ui/core/CardHeader";
import Skeleton from "@material-ui/lab/Skeleton";
import { getAttachmentLink } from "../utils/ApiUtils";

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
    maxHeight: "60vh",
    maxWidth: "50vh",
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

export default function ImageMessage({ message, direction }) {
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState(true);
  const [url, setUrl] = React.useState(null);
  const openImage = () => {
    if (url != null) {
      window.open(url, "_blank");
    }
  };

  React.useEffect(() => {
    if (url === null) {
      getAttachmentLink(message.group.id, message.id).then((res) => {
        setUrl(res.url);
      });
    }
  }, [url]);

  const setLoaded = () => {
    setLoading(false);
  };
  const cardLoading = isLoading ? (
    <Skeleton animation="wave" variant="rect" width="50vh" height="60vh" />
  ) : (
    <div></div>
  );
  const image =
    url !== null ? (
      <CardMedia
        component="img"
        className={`${classes[direction]} ${classes.message}`}
        image={url}
        title="Open Image"
        onClick={openImage}
        onLoad={setLoaded}
      />
    ) : (
      <div></div>
    );
  return (
    <Card className={classes.root}>
      <CardHeader
        className={`${classes[direction]} ${classes.title}`}
        color="textSecondary"
        subheader={message.sender_name}
      />
      {cardLoading}
      {image}
      <CardContent className={classes.cardContent}>
        <Typography className={classes.time} color="textSecondary">
          {formatRelative(new Date(message.created_at), new Date())}
        </Typography>
      </CardContent>
    </Card>
  );
}
