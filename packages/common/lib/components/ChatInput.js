"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ChatInput;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _InputBase = _interopRequireDefault(require("@material-ui/core/InputBase"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Send = _interopRequireDefault(require("@material-ui/icons/Send"));

var _AttachFile = _interopRequireDefault(require("@material-ui/icons/AttachFile"));

var _Call = _interopRequireDefault(require("@material-ui/icons/Call"));

var _CallConfirmationDialog = _interopRequireDefault(require("./CallConfirmationDialog"));

var _api = require("../store/actions/api.action");

var crudAction = _interopRequireWildcard(require("../store/actions/crud.action"));

var actions = _interopRequireWildcard(require("../store/actionTypes"));

var _message = require("../store/actions/message.action");

var _reactRedux = require("react-redux");

var _core = require("@material-ui/core");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      marginBottom: "60px",
      padding: "2px 4px",
      display: "flex",
      width: "97%",
      position: "fixed",
      bottom: 0,
      paddingBottom: 0
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  };
});

function ChatInput(_ref) {
  var groupId = _ref.groupId,
      profile = _ref.profile,
      consultationId = _ref.consultationId;
  var classes = useStyles();
  var dispatch = (0, _reactRedux.useDispatch)();

  var _React$useState = React.useState(""),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      messageContent = _React$useState2[0],
      setMessageContent = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      openConfirmationDialog = _React$useState4[0],
      setOpenConfirmationDialog = _React$useState4[1];

  var messageAdded = (0, _reactRedux.useSelector)(function (state) {
    return state.messageReducer.messageAdded;
  });
  var inputRef = /*#__PURE__*/React.createRef();

  try {
    consultationId = parseInt(consultationId);
  } catch (ex) {
    console.log(ex);
  }

  React.useEffect(function () {
    if (messageAdded === true) {
      dispatch((0, _message.resetAdded)());
      setMessageContent("");
      inputRef.current.focus();
    }
  }, [messageAdded]);

  var handleMessageChange = function handleMessageChange(event) {
    setMessageContent(event.target.value);
  };

  var handleAttachmentChange = function handleAttachmentChange(event) {
    var files = event.target.files;
    var formData = new FormData();
    formData.append("attachment", files[0]);
    dispatch((0, _api.createAttachmentMessage)(groupId, formData));
  };

  var submitHandler = function submitHandler(event) {
    event.preventDefault();
  };

  var handleCallClick = function handleCallClick(event) {
    dispatch(crudAction.actionType(actions.CREATE_CALL_RESET));
    setOpenConfirmationDialog(true);
  };

  var handleCallClose = function handleCallClose() {
    setOpenConfirmationDialog(false);
    dispatch(crudAction.actionType(actions.CREATE_CALL_RESET));
  };

  var CallButton = function CallButton() {
    if (profile && profile.user && profile.user.user_type == "SERVICE_PROVIDER") {
      return /*#__PURE__*/React.createElement(_IconButton["default"], {
        color: "primary",
        className: classes.iconButton,
        "aria-label": "call",
        component: "span",
        onClick: handleCallClick
      }, /*#__PURE__*/React.createElement(_Call["default"], null));
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null);
  };

  var handleSubmitClick = function handleSubmitClick() {
    if (messageContent.trim().length > 0) {
      dispatch((0, _api.createTextMessage)(groupId, {
        message: messageContent.trim(),
        message_type: "TEXT"
      }));
    }
  };

  return /*#__PURE__*/React.createElement(_Paper["default"], {
    component: "form",
    className: classes.root,
    onSubmit: submitHandler
  }, /*#__PURE__*/React.createElement(_InputBase["default"], (0, _defineProperty2["default"])({
    inputRef: inputRef,
    autoFocus: true,
    inputProps: {
      maxLength: 1000
    },
    multiline: true,
    endAdornment: /*#__PURE__*/React.createElement(_core.InputAdornment, null, "".concat(messageContent.length, "/1000")),
    value: messageContent,
    onChange: handleMessageChange,
    className: classes.input,
    placeholder: "Enter Message"
  }, "inputProps", {
    "aria-label": "enter message"
  })), /*#__PURE__*/React.createElement("input", {
    accept: "image/jpeg,image/gif,image/png,application/pdf",
    className: classes.input,
    style: {
      display: "none"
    },
    id: "attachment-button-input",
    multiple: true,
    type: "file",
    onChange: handleAttachmentChange
  }), /*#__PURE__*/React.createElement(CallButton, null), /*#__PURE__*/React.createElement(_CallConfirmationDialog["default"], {
    classes: {
      paper: classes.paper
    },
    id: "call-confirmation-dialog-menu",
    keepMounted: true,
    open: openConfirmationDialog,
    onClose: handleCallClose,
    consultationId: consultationId
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "attachment-button-input"
  }, /*#__PURE__*/React.createElement(_IconButton["default"], {
    component: "span",
    color: "primary",
    className: classes.iconButton,
    "aria-label": "attachment"
  }, /*#__PURE__*/React.createElement(_AttachFile["default"], null))), /*#__PURE__*/React.createElement(_Divider["default"], {
    className: classes.divider,
    orientation: "vertical"
  }), /*#__PURE__*/React.createElement(_IconButton["default"], {
    color: "primary",
    className: classes.iconButton,
    "aria-label": "send",
    onClick: handleSubmitClick
  }, /*#__PURE__*/React.createElement(_Send["default"], null)));
}