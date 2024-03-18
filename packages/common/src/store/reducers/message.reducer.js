import * as actions from "../actionTypes";
import localForage from "localforage";
import { LATEST_MESSAGE_ID, LAST_GROUP_ID } from "../../constants";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    paginationMeta: null,
    messages: null,
    error: null,
    groupId: null,
    createError: null,
    messageAdded: false
  };
};

export default function messageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_MESSAGES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actions.FETCH_MESSAGES_RESET:
      return {
        ...state,
        loading: false,
        paginationMeta: null,
        messages: null,
        error: null,
        groupId: null,
      };
    case actions.FETCH_MESSAGES_SUCCESS:
      let messageList;
      if (!state.messages) {
        messageList = [];
      } else {
        messageList = state.messages;
      }
      messageList = action.payload.res.messages.reverse().concat(messageList);
      delete action.payload.res.messages;
      if (messageList.length > 0) {
        localForage
          .setItem(LATEST_MESSAGE_ID, messageList[messageList.length - 1].id)
          .then(() => {
            localForage.setItem(LAST_GROUP_ID, action.payload.groupId);
          });
      }
      return {
        ...state,
        loading: false,
        error: null,
        messages: messageList,
        paginationMeta: action.payload.res,
        groupId: action.payload.groupId,
      };

    case actions.CREATE_MESSAGE_SUCCESS:
      const messages = state.messages.concat([action.payload.message]);
      localForage
        .setItem(LATEST_MESSAGE_ID, messages[messages.length - 1].id)
        .then(() => {
          localForage.setItem(LAST_GROUP_ID, state.groupId);
        });
      return {
        ...state,
        loading: false,
        createError: null,
        messageAdded: true,
        messages,
      };
    case actions.CREATE_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        messageAdded: false,
        createError: action.payload.error,
      };
    case actions.RESET_MESSAGE_ADDED:
      return {
        ...state,
        messageAdded: false,
      };

    default:
      return state;
  }
}
