import React, { useEffect, useState } from "react";
import styles from "./HealthScoreStepTwo.module.scss";
import UnitSelector from "@/components/unitSelectorItem";
import { generateUuid } from "@/utils/UuidUtills";
import QuestionText from "@/components/question";
import MultipleChoiceQuestion from "@/components/multipleChoiceQuestion";
import { Button } from "@material-ui/core";
import { func, array, number, string, bool } from "prop-types";
import CircularProgressBar from "@/components/circularProgress";
import { localStorageKeys } from "../../constants/healthScore";
import CustomizedSteppers from "@/components/stepper";
import CircularLoader from "@/components/loader";
import BackArrow from "@/components/backArrow";

const propTypes = {
  /** function to increment the step */
  handleIncrementStep: func,
  /** function to decrement the step */
  handleDecrementStep: func,
  /** array of question */
  questions: array,
  /** current step */
  currentStep: number,
  /** name of the health score module */
  moduleName: string,
  /** message text if user misses any question before moving to next module */
  attemptAllQuestionMessage: string,
  /** module description */
  moduleDescription: string,
  /** best health score */
  bestHealthScore: number,
  /** boolean to denote isSubmitting state */
  isSubmitting: bool,
  /** function to handle Page Number */
  handlePageNumber: func,
};

const checkIfALlQuestionsAreAnsweredForModule = (moduleData, moduleName) => {
  const giveModuleIndex = moduleData.findIndex(
    (module) => module.name === moduleName
  );
  let areAllQuestionsAnswered = true;
  for (let question of moduleData[giveModuleIndex].questions) {
    if (!question.optionSelected) {
      areAllQuestionsAnswered = false;
      break;
    }
  }
  return areAllQuestionsAnswered;
};
var questionPatternsForSelectQuestion = [
  new RegExp(/are your periods regular/i),
  new RegExp(/did you get a pap smear in the last 3 years/i),
  new RegExp(/did you get a mammogram in the last 3 years/i),
];
const updateLsForSelectQuestions = (moduleName, questionRegex, value) => {
  const moduleData = localStorage.getItem(localStorageKeys.healthScoreModules);
  const moduleJson = JSON.parse(moduleData);
  moduleJson.forEach((module) => {
    if (module.name === moduleName) {
      module.questions.forEach((question) => {
        if (questionRegex.test(question.description)) {
          /** updating the option selected */
          question.options.forEach((option) => {
            if (option.description === value) {
              question.optionSelected = option.id;
            }
          });
        }
      });
    }
  });
  localStorage.setItem(
    localStorageKeys.healthScoreModules,
    JSON.stringify(moduleJson)
  );
};

export const calculateHealthScore = (data) => {
  let healthScore = 0;
  data.forEach((module) => {
    module.questions.forEach((question) => {
      if (question.optionSelected) {
        question.options.forEach((option) => {
          if (Number(option.id) === Number(question.optionSelected)) {
            healthScore = healthScore + Number(option.weightage);
          }
        });
      }
    });
  });
  return healthScore;
};

const HealthScoreStepTwo = ({
  handleIncrementStep,
  handleDecrementStep,
  questions,
  currentStep,
  moduleName,
  moduleDescription,
  bestHealthScore,
  isSubmitting,
  handlePageNumber,
}) => {
  const [periodCondition, setPeriodCondition] = useState("");
  const [papSmear, setPapSmear] = useState("");
  const [mammogram, setMammogram] = useState("");
  const [healthScore, setHealthScore] = useState(0);
  const [attemptAllQuestionMessage, setAttemptALlQuestionMessage] =
    useState("");

  const setPeriodConditionAndUpdateLs = (value) => {
    updateLsForSelectQuestions(
      moduleName,
      questionPatternsForSelectQuestion[0],
      value
    );
    setPeriodCondition(value);
  };

  const setMammogramAndUpdateLs = (value) => {
    updateLsForSelectQuestions(
      moduleName,
      questionPatternsForSelectQuestion[2],
      value
    );
    setMammogram(value);
  };

  const setPapSmearAndUpdateLs = (value) => {
    updateLsForSelectQuestions(
      moduleName,
      questionPatternsForSelectQuestion[1],
      value
    );
    setPapSmear(value);
  };
  const validateNoOfResponseAndIncrementStep = async () => {
    const healthScoreModules = localStorage.getItem(
      localStorageKeys.healthScoreModules
    );
    const healthScoreModulesJson =
      healthScoreModules && JSON.parse(healthScoreModules);
    const areAllQuestionAnsweredForModule =
      checkIfALlQuestionsAreAnsweredForModule(
        healthScoreModulesJson,
        moduleName
      );
    if (!areAllQuestionAnsweredForModule) {
      setAttemptALlQuestionMessage("*Please answer all the above questions");
      return;
    }
    handleIncrementStep();
  };
  useEffect(() => {
    /** updating the selected value for card inputs */
    setAttemptALlQuestionMessage("");
    const moduleData = localStorage.getItem(
      localStorageKeys.healthScoreModules
    );
    const moduleJson = JSON.parse(moduleData);
    moduleJson.forEach((module) => {
      if (module.name === moduleName) {
        module.questions.forEach((question) => {
          if (questionPatternsForSelectQuestion[0].test(question.description)) {
            if (question.optionSelected) {
              question.options.forEach((option) => {
                if (option.id === Number(question.optionSelected)) {
                  setPeriodCondition(option.description);
                }
              });
            }
          } else if (
            questionPatternsForSelectQuestion[1].test(question.description)
          ) {
            if (question.optionSelected) {
              question.options.forEach((option) => {
                if (option.id === Number(question.optionSelected)) {
                  setPapSmear(option.description);
                }
              });
            }
          } else if (
            questionPatternsForSelectQuestion[2].test(question.description)
          ) {
            if (question.optionSelected) {
              question.options.forEach((option) => {
                if (option.id === Number(question.optionSelected)) {
                  setMammogram(option.description);
                }
              });
            }
          }
        });
      }
    });
    /** updating the health score */
    const healthScoreFromLs = calculateHealthScore(moduleJson);
    setHealthScore(Number(healthScoreFromLs));
  }, [currentStep]);

  return (
    <div className={styles.healthScoreStepTwo}>
      <div className={styles.topScoreSection}>
        <div className={styles.linearProgressContainer}>
          <BackArrow handleBackFn={handleDecrementStep} />
          <CustomizedSteppers
            handlePageChange={handlePageNumber}
            activeStep={currentStep}
          />
        </div>
        <CircularProgressBar
          progressColor={healthScore < 0 ? "#F22C1F" : "#48C07F"}
          scoreColor={healthScore < 0 ? "#F22C1F" : "#48C07F"}
          progressPercentage={(healthScore / bestHealthScore) * 100}
          bestHealthScore={bestHealthScore}
          currentHealthScore={healthScore}
          useCase={"HEALTH_SCORE"}
          marginTop={"20px"}
          border={"12px"}
          progressThickness={4.5}
          size={118}
        />
        <div className={styles.message}>
          <h1>{moduleName}</h1>
          <p>{moduleDescription}</p>
        </div>
      </div>
      <div className={styles.questions}>
        {questions.map(
          ({ description, options, id, optionSelected }, index) => {
            let selectedValue = "";
            if (optionSelected) {
              selectedValue = `${moduleName},${id},${optionSelected}`;
            }
            if (questionPatternsForSelectQuestion[0].test(description)) {
              return (
                <div key={generateUuid()} className={styles.questionOneBorder}>
                  <QuestionText
                    key={generateUuid()}
                    questionNumber={1}
                    questionText={description}
                  />
                  <div className={styles.answerSection}>
                    {options.map(({ description }) => (
                      <UnitSelector
                        key={generateUuid()}
                        unit={description}
                        selectedUnit={periodCondition}
                        setSelectedUnit={setPeriodConditionAndUpdateLs}
                        activeColor={"#A73260"}
                        inActiveColor={"#B8B8B8"}
                        textColorActive={"#FFFFFF"}
                        textColorInActive={"#FFFFFF"}
                      />
                    ))}
                  </div>
                </div>
              );
            } else if (questionPatternsForSelectQuestion[1].test(description)) {
              return (
                <div key={generateUuid()} className={styles.questionOneBorder}>
                  <QuestionText
                    key={generateUuid()}
                    questionNumber={1}
                    questionText={description}
                  />
                  <div className={styles.answerSection}>
                    {options.map(({ description }) => (
                      <UnitSelector
                        key={generateUuid()}
                        unit={description}
                        selectedUnit={papSmear}
                        setSelectedUnit={setPapSmearAndUpdateLs}
                        activeColor={"#A73260"}
                        inActiveColor={"#B8B8B8"}
                        textColorActive={"#FFFFFF"}
                        textColorInActive={"#FFFFFF"}
                      />
                    ))}
                  </div>
                </div>
              );
            } else if (questionPatternsForSelectQuestion[2].test(description)) {
              return (
                <div key={generateUuid()} className={styles.questionOne}>
                  <QuestionText
                    key={generateUuid()}
                    questionNumber={1}
                    questionText={description}
                  />
                  <div className={styles.answerSection}>
                    {options.map(({ description }) => (
                      <UnitSelector
                        key={generateUuid()}
                        unit={description}
                        selectedUnit={mammogram}
                        setSelectedUnit={setMammogramAndUpdateLs}
                        activeColor={"#A73260"}
                        inActiveColor={"#B8B8B8"}
                        textColorActive={"#FFFFFF"}
                        textColorInActive={"#FFFFFF"}
                      />
                    ))}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={generateUuid()} className={styles.question}>
                  <MultipleChoiceQuestion
                    moduleName={moduleName}
                    questionNumber={id}
                    questionText={description}
                    options={options}
                    questionId={id}
                    borderBottom={index === questions.length - 1 ? false : true}
                    selectedValue={selectedValue}
                    currentStep={currentStep}
                  />
                </div>
              );
            }
          }
        )}
        {attemptAllQuestionMessage && (
          <p className={styles.errorMessageToAttemptAllQs}>
            {attemptAllQuestionMessage}
          </p>
        )}
        <div className={styles.saveButton}>
          <Button
            onClick={handleDecrementStep}
            style={{
              background: "white;",
              width: "120px",
              height: "48px",
              color: "#4F4F4F",
              fontWeight: "400",
              fontSize: "18px",
              fontFamily: "Lato, sans-serif",
              textTransform: "none",
              borderRadius: "10px",
              position: "absolute",
              left: "0px",
            }}
          >
            Back
          </Button>
          <Button
            onClick={validateNoOfResponseAndIncrementStep}
            style={{
              background:
                "linear-gradient(89.65deg, #BF385E 0.23%, #A5325F 63.95%, #972E60 99.7%)",
              width: "120px",
              height: "33px",
              color: "white",
              fontWeight: "600",
              fontSize: "18px",
              fontFamily: "Lato, sans-serif",
              textTransform: "none",
              borderRadius: "27px",
            }}
          >
            {!isSubmitting ? (
              "Next"
            ) : (
              <CircularLoader color="#FFFFFF" size={20} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
HealthScoreStepTwo.defaultProps = {
  isSubmitting: false,
};
HealthScoreStepTwo.propTypes = propTypes;
export default HealthScoreStepTwo;
