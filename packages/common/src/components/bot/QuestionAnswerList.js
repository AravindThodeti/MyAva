import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { format } from "date-fns";
import { QUESTION_TYPE } from "../../constants";

const useStyles = makeStyles((theme) => ({
  answerInput: {
    border: "solid 1px",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  question: {
    float: "left",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: "100%",
  },
  hint: {
    float: "left",
    paddingBottom: theme.spacing(1),
    width: "100%",
    fontStyle: "italic",
  },
  answer: {
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: "100%",
  },
}));

const getPrintableAnswer = (question) => {
  if (question.optional && Object.values(question.answer)[0] === null) {
    return question.optionalText ? question.optionalText : "Skipped";
  }
  switch (question.questionType) {
    case QUESTION_TYPE.DATE_SELECT:
      return format(
        new Date(Object.values(question.answer)[0]),
        "do MMM, yyyy"
      );
    case QUESTION_TYPE.YEAR_SELECT:
      return format(new Date(Object.values(question.answer)[0]), "yyyy");
    case QUESTION_TYPE.TIME_RANGE:
      return `${format(
        new Date(Object.values(question.answer)[0].from),
        "hh:mm aaa"
      )} - ${format(
        new Date(Object.values(question.answer)[0].to),
        "hh:mm aaa"
      )}`;
    case QUESTION_TYPE.MULTIPLE_NUMBER_SELECT:
      return Object.keys(question.answer).map((key) => {
        const index = question.labels.findIndex((label) => label.name == key);
        return `${question.answer[key]} ${question.labels[index].label} `;
      });
    case QUESTION_TYPE.MULTIPLE_TEXT_INPUT:
      let output = [];
      Object.keys(question.answer).forEach((key) => {
        const index = question.labels.findIndex((label) => label.name == key);
        output[index] = question.answer[key];
      });
      return output.join(" ");
    case QUESTION_TYPE.SELECT:
    case QUESTION_TYPE.SELECT_WITH_OTHER:
      return Object.values(question.answer).join(" ");
    case QUESTION_TYPE.RADIO:
    case QUESTION_TYPE.RADIO_WITH_OTHER:
    case QUESTION_TYPE.NUMBER_INPUT:
    case QUESTION_TYPE.TEXT_INPUT:
      return Object.values(question.answer)[0];
    default:
      return JSON.stringify(question.answer);
  }
};

const getQuestionAnswers = (question, index, classes) => {
  return (
    <Box key={index} mt={2} mb={3}>
      <Typography className={classes.question}>{question.question}</Typography>
      {question.hint && (
        <>
          <br></br>
          {question.hint.split("<br></br>").map((h, i) => (
            <Typography key={i} className={classes.hint}>
              {h}
            </Typography>
          ))}
        </>
      )}
      {question.answer && (
        <>
          <br></br>
          <Typography className={classes.answer}>
            {getPrintableAnswer(question)}
          </Typography>
        </>
      )}
    </Box>
  );
};

const QuestionAnswerList = ({ questions, readOnly = false }) => {
  const classes = useStyles();
  const questionsList = [];
  for (let i = 0; i < questions.length; i++) {
    if (readOnly) {
      if (questions[i].answer) {
        questionsList.push(questions[i]);
      }
    } else {
      questionsList.push(questions[i]);
      if (!questions[i].answer) {
        break;
      }
    }
  }
  return questionsList.map((question, index) =>
    getQuestionAnswers(question, index, classes)
  );
};

export default QuestionAnswerList;
