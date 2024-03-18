"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MessageList;

var React = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _TextMessage = _interopRequireDefault(require("./TextMessage"));

var _DocumentMessage = _interopRequireDefault(require("./DocumentMessage"));

var _ImageMessage = _interopRequireDefault(require("./ImageMessage"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var useStyles = (0, _styles.makeStyles)({
  left: {
    display: "flex",
    justifyContent: "flex-start"
  },
  right: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

function MessageList(_ref) {
  var messages = _ref.messages,
      profile = _ref.profile;
  var classes = useStyles();

  var getDirection = function getDirection(message, profile) {
    if (profile && profile.user.user_type == "SERVICE_PROVIDER") {
      return message.sender_type == "SERVICE_PROVIDER" && message.sender_id == profile.id ? "right" : "left";
    } else {
      return message.sender_type == "CUSTOMER" ? "right" : "left";
    }
  };

  var getMessage = function getMessage(message, profile) {
    if (message.message_type == "TEXT") {
      return /*#__PURE__*/React.createElement(_TextMessage["default"], {
        message: message,
        direction: getDirection(message, profile)
      });
    } else if (message.message_type == "IMAGE") {
      return /*#__PURE__*/React.createElement(_ImageMessage["default"], {
        message: message,
        direction: getDirection(message, profile)
      });
    } else if (message.message_type == "PDF") {
      return /*#__PURE__*/React.createElement(_DocumentMessage["default"], {
        message: message,
        direction: getDirection(message, profile)
      });
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null);
  };

  var getMessageList = function getMessageList(messages, profile) {
    return messages.map(function (message, index) {
      return /*#__PURE__*/React.createElement(_ListItem["default"], {
        className: classes[getDirection(message, profile)],
        key: message.id
      }, getMessage(message, profile));
    });
  };

  return /*#__PURE__*/React.createElement(_List["default"], {
    component: "nav",
    "aria-label": "main mailbox folders"
  }, getMessageList(messages, profile));
}