import * as React from "react";
import localForage from "localforage";
import { useSelector, useDispatch } from "react-redux";
import { animateScroll } from "react-scroll";
import { makeStyles } from "@material-ui/core/styles";
import CenterCircularProgress from "./CenterCircularProgress";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { firebaseCloudMessaging } from "../utils/PushNotification";
import { LATEST_MESSAGE_ID, LAST_GROUP_ID, GROUP_TYPE } from "../constants";
import { getGroup, getMessages } from "../store/actions/api.action";
import { reset } from "../store/actions/message.action";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "98%",
    height: "80vh",
    backgroundColor: theme.palette.background.paper,
  },
  loadMore: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    position: "absolute",
    bottom: 0,
  },
}));

export default function Chat({ consultationId = null, programId = null }) {
  const chatType =
    consultationId !== null ? GROUP_TYPE.CONSULTATION : GROUP_TYPE.PROGRAM;
  const chatId = consultationId !== null ? consultationId : programId;
  const classes = useStyles();
  const dispatch = useDispatch();
  const group = useSelector((store) => store.groupReducer.group);
  const paginationMeta = useSelector(
    (store) => store.messageReducer.paginationMeta
  );
  const messages = useSelector((store) => store.messageReducer.messages);
  const messageLoading = useSelector((store) => store.messageReducer.loading);
  const messageAdded = useSelector(
    (store) => store.messageReducer.messageAdded
  );
  const profile = useSelector((store) => store.profileReducer.profile);

  React.useEffect(() => {
    if (
      (chatId) &&
      (group === undefined ||
        (group !== null &&
          (group.group_type != chatType || group.type_id != chatId)))
    ) {
      dispatch(reset());
      dispatch(getGroup(chatId, chatType));
    }
    if (group && (messages === undefined || messages === null)) {
      dispatch(getMessages(group.id));
    }
  }, [chatId, group]);

  React.useEffect(() => {
    if (paginationMeta && paginationMeta.page_number == 0) {
      animateScroll.scrollToBottom({
        containerId: "message-list",
      });
    }
  }, [paginationMeta]);

  React.useEffect(() => {
    if (group) {
      firebaseCloudMessaging.init();
      navigator.serviceWorker.addEventListener(
        "message",
        function(event) {
          if ("firebaseMessaging" in event.data) {
            const payload = event.data.firebaseMessaging.payload;
            if (payload.data.type === "chat") {
              if (payload.data.group_id == group.id) {
                dispatch(reset());
                dispatch(getMessages(group.id));
              }
            }
          }
        },
        group
      );
      navigator.serviceWorker.addEventListener("controllerchange", function() {
        window.location.reload();
      });
    }
  }, [group]);

  const onFocus = () => {
    if (group && messages) {
      localForage.getItem(LAST_GROUP_ID).then((lastGroupId) => {
        if (lastGroupId == group.id) {
          localForage.getItem(LATEST_MESSAGE_ID).then((latestMessageId) => {
            let lastMessageId = null;
            if (messages.length > 0) {
              lastMessageId = messages[messages.length - 1].id;
            }
            if (lastMessageId !== latestMessageId) {
              dispatch(reset());
              dispatch(getMessages(group.id));
            }
          });
        }
      });
    }
  };

  React.useEffect(() => {
    if (messageAdded) {
      animateScroll.scrollToBottom({
        containerId: "message-list",
      });
    }
  }, [messageAdded]);

  React.useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  });

  const loadMore = () => {
    dispatch(getMessages(group.id, paginationMeta.page_number + 1));
  };

  if (group && messages !== undefined && messages !== null) {
    const loadMoreButton = paginationMeta.has_next ? (
      <div className={classes.loadMore}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          disabled={messageLoading}
          onClick={loadMore}
        >
          Load More
        </Button>
      </div>
    ) : (
      <></>
    );
    const messagesList = (
      <div className={classes.root}>
        <MessageList messages={messages} profile={profile} />
      </div>
    );
    return (
      <div style={{ height: "80vh", margin: 0, padding: 0 }}>
        <Box style={{ maxHeight: "90%", overflow: "auto" }} id="message-list">
          {loadMoreButton}
          {messagesList}
        </Box>
        <Box
          display="flex"
          flex="1"
          justifyContent="space-around"
          style={{ height: "10vh" }}
        >
          <ChatInput className={classes.input} groupId={group.id} profile={profile} consultationId={consultationId} />
        </Box>
      </div>
    );
  }

  return <CenterCircularProgress />;
}
