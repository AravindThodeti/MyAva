import React, { useEffect } from "react";
import styles from "./MultipleChoiceQuestion.module.scss";
import QuestionText from "../question";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { generateUuid } from "@/utils/UuidUtills";
import { array, string, number, bool } from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { localStorageKeys } from "../../constants/healthScore";

const propTypes = {
  /** Question definition */
  questionText: string,
  /** array of options for the question */
  options: array,
  /**question number */
  questionNumber: number,
  /** name of the health score module */
  moduleName: string,
  /** id of the question */
  questionId: number,
  /** selected Value */
  selectedValue: string,
  /** current step*/
  currentStep: number,
  /** boolean to denote if border bottom is there */
  borderBottom: bool,
};

const theme = createMuiTheme({
  palette: {
    secondary: { main: "#CD3C5D" },
  },
});
const MultipleChoiceQuestion = ({
  questionId,
  questionText,
  options,
  questionNumber,
  moduleName,
  currentStep,
  borderBottom,
}) => {
  const [value, setValue] = React.useState("");
  useEffect(() => {
    const moduleData = localStorage.getItem(
      localStorageKeys.healthScoreModules
    );
    const moduleJson = JSON.parse(moduleData);
    moduleJson.forEach((module) => {
      if (module.name === moduleName) {
        module.questions.forEach((question) => {
          if (question.id === Number(questionId)) {
            if (question.optionSelected) {
              const selectedValue = `${moduleName},${questionId},${question.optionSelected}`;
              setValue(selectedValue);
            }
          }
        });
      }
    });
  }, [currentStep]);

  const handleChange = (event) => {
    const value = event.target.value;
    const [moduleName, questionId, answerId] = value.split(",");
    const moduleData = localStorage.getItem(
      localStorageKeys.healthScoreModules
    );
    const moduleJson = JSON.parse(moduleData);
    moduleJson.forEach((module) => {
      if (module.name === moduleName) {
        module.questions.forEach((question) => {
          if (question.id === Number(questionId)) {
            /** updating the option selected */
            question.optionSelected = answerId;
          }
        });
      }
    });
    localStorage.setItem(
      localStorageKeys.healthScoreModules,
      JSON.stringify(moduleJson)
    );
    setValue(event.target.value);
  };

  return (
    <div
      className={`${styles.multipleChoiceQuestion} ${
        borderBottom && styles.borderBottom
      }`}
    >
      <FormControl component="fieldset">
        <QuestionText
          questionText={questionText}
          questionNumber={questionNumber}
        />
        <div className={styles.options}>
          <MuiThemeProvider theme={theme}>
            <RadioGroup
              aria-label="gender"
              name={`${moduleName},${questionId}`}
              value={value}
              onChange={handleChange}
            >
              {options.map(({ description, id }) => {
                return (
                  <FormControlLabel
                    key={generateUuid()}
                    style={{ color: "#4F4F4F" }}
                    value={`${moduleName},${questionId},${id}`}
                    control={<Radio />}
                    label={description}
                    checked={`${moduleName},${questionId},${id}` === value}
                  />
                );
              })}
            </RadioGroup>
          </MuiThemeProvider>
        </div>
      </FormControl>
    </div>
  );
};
MultipleChoiceQuestion.defaultProps = {
  selectedValue: "",
};
MultipleChoiceQuestion.propTypes = propTypes;
export default MultipleChoiceQuestion;
