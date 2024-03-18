"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = QuestionAnswer;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _reactScroll = require("react-scroll");

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _CenterCircularProgress = _interopRequireDefault(require("../CenterCircularProgress"));

var _MultipleTextInput = _interopRequireDefault(require("./inputs/MultipleTextInput"));

var _DateSelect = _interopRequireDefault(require("./inputs/DateSelect"));

var _MultipleNumberSelect = _interopRequireDefault(require("./inputs/MultipleNumberSelect"));

var _NumberInput = _interopRequireDefault(require("./inputs/NumberInput"));

var _TextInput = _interopRequireDefault(require("./inputs/TextInput"));

var _Select = _interopRequireDefault(require("./inputs/Select"));

var _SelectWithOther = _interopRequireDefault(require("./inputs/SelectWithOther"));

var _constants = require("../../constants");

var _RadioWithOther = _interopRequireDefault(require("./inputs/RadioWithOther"));

var _Radio = _interopRequireDefault(require("./inputs/Radio"));

var _TimeRange = _interopRequireDefault(require("./inputs/TimeRange"));

var _Consent = _interopRequireDefault(require("./inputs/Consent"));

var _QuestionAnswerList = _interopRequireDefault(require("./QuestionAnswerList"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    answerInput: {
      border: "solid 1px",
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1)
    },
    question: {
      "float": "left",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      width: "100%"
    },
    hint: {
      "float": "left",
      paddingBottom: theme.spacing(1),
      width: "100%",
      fontStyle: "italic"
    },
    answer: {
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "flex-end",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      width: "100%"
    }
  };
});

var getAnswerConfig = function getAnswerConfig(question, setAnswer, questions, setQuestions, profile) {
  switch (question.questionType) {
    case _constants.QUESTION_TYPE.MULTIPLE_TEXT_INPUT:
      return /*#__PURE__*/React.createElement(_MultipleTextInput["default"], {
        question: question,
        setAnswer: setAnswer
      });

    case _constants.QUESTION_TYPE.DATE_SELECT:
    case _constants.QUESTION_TYPE.YEAR_SELECT:
      return /*#__PURE__*/React.createElement(_DateSelect["default"], {
        question: question,
        setAnswer: setAnswer
      });

    case _constants.QUESTION_TYPE.MULTIPLE_NUMBER_SELECT:
      return /*#__PURE__*/React.createElement(_MultipleNumberSelect["default"], {
        question: question,
        setAnswer: setAnswer
      });

    case _constants.QUESTION_TYPE.NUMBER_INPUT:
      return /*#__PURE__*/React.createElement(_NumberInput["default"], {
        question: question,
        setAnswer: setAnswer
      });

    case _constants.QUESTION_TYPE.SELECT:
      return /*#__PURE__*/React.createElement(_Select["default"], {
        question: question,
        setAnswer: setAnswer
      });

    case _constants.QUESTION_TYPE.SELECT_WITH_OTHER:
      return /*#__PURE__*/React.createElement(_SelectWithOther["default"], {
        question: question,
        setAnswer: setAnswer
      });

    case _constants.QUESTION_TYPE.TEXT_INPUT:
      return /*#__PURE__*/React.createElement(_TextInput["default"], {
        question: question,
        setAnswer: setAnswer
      });

    case _constants.QUESTION_TYPE.RADIO_WITH_OTHER:
      return /*#__PURE__*/React.createElement(_RadioWithOther["default"], {
        question: question,
        setAnswer: setAnswer
      });

    case _constants.QUESTION_TYPE.RADIO:
      return /*#__PURE__*/React.createElement(_Radio["default"], {
        question: question,
        setAnswer: setAnswer
      });

    case _constants.QUESTION_TYPE.TIME_RANGE:
      return /*#__PURE__*/React.createElement(_TimeRange["default"], {
        question: question,
        setAnswer: setAnswer
      });

    case _constants.QUESTION_TYPE.CONSENT:
      return /*#__PURE__*/React.createElement(_Consent["default"], {
        question: question,
        setAnswer: setAnswer,
        questions: questions,
        setQuestions: setQuestions,
        profile: profile
      });

    default:
      return /*#__PURE__*/React.createElement(_CenterCircularProgress["default"], null);
  }
};

function QuestionAnswer(_ref) {
  var initialQuestions = _ref.initialQuestions,
      sendAnswers = _ref.sendAnswers,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? "75vh" : _ref$height,
      _ref$hasPreText = _ref.hasPreText,
      hasPreText = _ref$hasPreText === void 0 ? true : _ref$hasPreText,
      profile = _ref.profile;
  var classes = useStyles();

  var _React$useState = React.useState(initialQuestions),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      questions = _React$useState2[0],
      setQuestions = _React$useState2[1];

  var setAnswer = function setAnswer(question, answer) {
    var updateQuestion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var questionIndex = questions.findIndex(function (q) {
      return q.id === question.id;
    });
    var currentQuestions = (0, _toConsumableArray2["default"])(questions);
    currentQuestions[questionIndex]["answer"] = answer;

    if (updateQuestion) {
      currentQuestions[questionIndex] = _objectSpread(_objectSpread({}, currentQuestions[questionIndex]), question);
    }

    setQuestions(currentQuestions);

    if (questionIndex == questions.length - 1) {
      sendAnswers(questions);
    }
  };

  var AnswerInput = function AnswerInput() {
    var index;

    for (var i = 0; i < questions.length; i++) {
      if (!questions[i].answer) {
        index = i;
        break;
      }
    }

    if (index !== undefined) {
      return getAnswerConfig(questions[index], setAnswer, questions, setQuestions, profile);
    }

    return /*#__PURE__*/React.createElement(_CenterCircularProgress["default"], null);
  };

  var PreText = function PreText() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Typography["default"], null, "Hi there, Welcome to Ava! I am your buddy and I will help you get started."), /*#__PURE__*/React.createElement(_Typography["default"], null, "Please answer these questions to let me know you better."));
  };

  React.useEffect(function () {
    _reactScroll.animateScroll.scrollToBottom({
      containerId: "qa-list"
    });
  }, [questions]);
  return /*#__PURE__*/React.createElement(_Box["default"], {
    padding: 2,
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "".concat(height),
      backgroundColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement(_Box["default"], {
    style: {
      overflow: "scroll"
    },
    id: "qa-list"
  }, hasPreText && /*#__PURE__*/React.createElement(PreText, null), /*#__PURE__*/React.createElement(_Box["default"], null, /*#__PURE__*/React.createElement(_QuestionAnswerList["default"], {
    questions: questions
  }))), /*#__PURE__*/React.createElement(_Box["default"], {
    className: classes.answerInput,
    style: {
      justifyContent: "flex-end"
    },
    marginTop: 4
  }, /*#__PURE__*/React.createElement(AnswerInput, null)));
}