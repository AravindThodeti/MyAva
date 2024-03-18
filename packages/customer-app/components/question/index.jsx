import React from "react";
import { string, number } from "prop-types";
import styles from "./QuestionText.module.scss";
const propTypes = {
  questionNumber: number,
  questionText: string,
};

const QuestionText = ({ questionText }) => (
  <h1 className={styles.questionText}>{questionText}</h1>
);
QuestionText.propTypes = propTypes;
export default QuestionText;
