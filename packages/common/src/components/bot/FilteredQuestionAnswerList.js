import * as React from "react";
import PropTypes from "prop-types";
import QuestionAnswerList from "./QuestionAnswerList";
import Typography from "@material-ui/core/Typography";

const FilteredQuestionAnswerList = ({
  userQuestions,
  questionList,
  readOnly = true,
  overrideQuestion = false,
  ...props
}) => {
  const questions = [];
  if (userQuestions && userQuestions.questions && questionList) {
    userQuestions.questions.forEach((currentQuestion) => {
      const questionIndex = questionList.findIndex(
        (q) => q.id === currentQuestion.id
      );
      const question = { ...questionList[questionIndex] };
      question.answer = currentQuestion.answer;
      if (overrideQuestion) {
        question.question = currentQuestion.question;
      }
      questions.push(question);
    });
    return <QuestionAnswerList questions={questions} readOnly={readOnly} />;
  }
  if (props.emptyText) {
    return <Typography>{props.emptyText}</Typography>;
  }
  return <></>;
};
FilteredQuestionAnswerList.propTypes = {
  userQuestions: PropTypes.object,
  questionList: PropTypes.array.isRequired,
  emptyText: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default FilteredQuestionAnswerList;
