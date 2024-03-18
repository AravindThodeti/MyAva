import * as React from "react";
import PropTypes from "prop-types";
import FilteredQuestionAnswerList from "@ava/common/lib/components/bot/FilteredQuestionAnswerList";

const ConsultationProfileField = ({
  source,
  record = {},
  questionList,
  ...props
}) => {
  const userQuestions = record[source];
  return (
    <FilteredQuestionAnswerList
      userQuestions={userQuestions}
      questionList={questionList}
      readOnly={true}
      {...props}
    />
  );
};

ConsultationProfileField.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  questionList: PropTypes.array.isRequired,
};

export default ConsultationProfileField;
