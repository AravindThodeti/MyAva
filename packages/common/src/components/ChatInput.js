import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CallIcon from "@material-ui/icons/Call";
import CallConfirmationDialog from "./CallConfirmationDialog";
import {
  createTextMessage,
  createAttachmentMessage,
} from "../store/actions/api.action";
import * as crudAction from "../store/actions/crud.action";
import * as actions from "../store/actionTypes";
import { resetAdded } from "../store/actions/message.action";
import { useSelector, useDispatch } from "react-redux";
import { InputAdornment } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "60px",
    padding: "2px 4px",
    display: "flex",
    width: "97%",
    position: "fixed",
    bottom: 0,
    paddingBottom: 0,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function ChatInput({ groupId, profile, consultationId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [messageContent, setMessageContent] = React.useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(
    false
  );
  const messageAdded = useSelector(
    (state) => state.messageReducer.messageAdded
  );
  const inputRef = React.createRef();
  try {
    consultationId = parseInt(consultationId);
  } catch (ex) {
    console.log(ex);
  }

  React.useEffect(() => {
    if (messageAdded === true) {
      dispatch(resetAdded());
      setMessageContent("");
      inputRef.current.focus();
    }
  }, [messageAdded]);

  const handleMessageChange = (event) => {
    setMessageContent(event.target.value);
  };

  const handleAttachmentChange = (event) => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append("attachment", files[0]);
    dispatch(createAttachmentMessage(groupId, formData));
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const handleCallClick = (event) => {
    dispatch(crudAction.actionType(actions.CREATE_CALL_RESET));
    setOpenConfirmationDialog(true);
  };

  const handleCallClose = () => {
    setOpenConfirmationDialog(false);
    dispatch(crudAction.actionType(actions.CREATE_CALL_RESET));
  };

  const CallButton = () => {
    if (
      profile &&
      profile.user &&
      profile.user.user_type == "SERVICE_PROVIDER"
    ) {
      return (
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="call"
          component="span"
          onClick={handleCallClick}
        >
          <CallIcon />
        </IconButton>
      );
    }
    return <></>;
  };

  const handleSubmitClick = () => {
    if (messageContent.trim().length > 0) {
      dispatch(
        createTextMessage(groupId, {
          message: messageContent.trim(),
          message_type: "TEXT",
        })
      );
    }
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={submitHandler}>
      <InputBase
        inputRef={inputRef}
        autoFocus
        inputProps={{
          maxLength: 1000,
        }}
        multiline
        endAdornment={
          <InputAdornment>{`${messageContent.length}/1000`}</InputAdornment>
        }
        value={messageContent}
        onChange={handleMessageChange}
        className={classes.input}
        placeholder="Enter Message"
        inputProps={{ "aria-label": "enter message" }}
      />
      <input
        accept="image/jpeg,image/gif,image/png,application/pdf"
        className={classes.input}
        style={{ display: "none" }}
        id="attachment-button-input"
        multiple
        type="file"
        onChange={handleAttachmentChange}
      />
      <CallButton />
      <CallConfirmationDialog
        classes={{
          paper: classes.paper,
        }}
        id="call-confirmation-dialog-menu"
        keepMounted
        open={openConfirmationDialog}
        onClose={handleCallClose}
        consultationId={consultationId}
      />
      <label htmlFor="attachment-button-input">
        <IconButton
          component="span"
          color="primary"
          className={classes.iconButton}
          aria-label="attachment"
        >
          <AttachFileIcon />
        </IconButton>
      </label>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="send"
        onClick={handleSubmitClick}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
