import * as React from "react";
import Box from "@material-ui/core/Box";
import { LS_ACCESS_TOKEN } from "@ava/common";
import { number } from "prop-types";

const propTypes = {
  questionId: number,
};
const QuestionWidget = ({ questionId }) => {
  const questionDivElement = `question-${questionId}`;

  React.useEffect(() => {
    if (questionId && document) {
      const script = document.createElement("script");
      const token = localStorage.getItem(LS_ACCESS_TOKEN);
      if (token) {
        script.innerHTML = `window.Tribe('question', {id: '${questionDivElement}', questionId: '${questionId}', components: ['question'], jwt: '${token}'});`;
      } else {
        script.innerHTML = `window.Tribe('question', {id: '${questionDivElement}', questionId: '${questionId}', components: ['question']});`;
      }
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [questionId]);

  if (questionId) {
    return (
      <Box mt={2} mb={2} ml={1} mr={1}>
        <div id={questionDivElement} />
      </Box>
    );
  }
  return <></>;
};
QuestionWidget.propTypes = propTypes;
export default QuestionWidget;
