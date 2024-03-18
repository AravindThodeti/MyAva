import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./HealthScoreStepOne.module.scss";
import UnitSelector from "../../components/unitSelectorItem";
import { generateUuid } from "../../utils/UuidUtills";
import CircularThumbSlider from "../../components/slider/circularThumbSlider";
import { Button } from "@material-ui/core";
import { func, string, number } from "prop-types";
import CustomizedSteppers from "../../components/stepper";
import CircularProgressBar from "../../components/circularProgress";
import { calculateHealthScore } from "../healthScoreQuestions";
import {
  getScoreByBmi,
  convertFootToFtInch,
  calculateBmi,
  heightUnits,
  weightUnits,
  kgMarks,
  ftMarks,
  cmMarks,
  poundMarks,
  localStorageKeys,
  validateHeight,
  validateWeight,
} from "../../constants/healthScore";
import BackArrow from "../../components/backArrow";

const getHeightAndWeightFromLs = () => {
  const bmiModuleData = localStorage.getItem(
    localStorageKeys.bmiModuleResponse
  );
  if (bmiModuleData) {
    const bmiModuleJson = JSON.parse(bmiModuleData);
    return { ...bmiModuleJson, local: true };
  }
  return {
    height: { unit: "cm", value: 140 },
    weight: { unit: "kg", value: 40 },
  };
};

const updateBmiScore = (moduleData, bmiScore) => {
  moduleData.forEach((module) => {
    if (module.name === "BMI") {
      module.questions.forEach((question) => {
        question.optionSelected = 1;
        question.options = [
          {
            id: 1,
            weightage: bmiScore,
          },
        ];
      });
    }
  });
  localStorage.setItem(
    localStorageKeys.healthScoreModules,
    JSON.stringify(moduleData)
  );
};

const propTypes = {
  /** function to increment the step */
  handleChangeStep: func,
  /** module description */
  moduleDescription: string,
  /** best health score */
  bestHealthScore: number,
  /** function to handle Page Number */
  handlePageNumber: func,
};

const HealthScoreStepOne = ({
  handleChangeStep,
  bestHealthScore,
  moduleDescription,
  handlePageNumber,
}) => {
  const { height, weight, local } = getHeightAndWeightFromLs();
  const router = useRouter();
  let isLocalData;
  if (local) {
    isLocalData = true;
  } else {
    isLocalData = false;
  }

  const handleClickBack = (e) => {
    e.preventDefault();
    router.push("/user/health-score/start");
  };

  const [isHeightChosen, setIsHeightChosen] = useState(isLocalData);
  const [isWeightChosen, setIsWeightChosen] = useState(isLocalData);
  const [heightUnit, setHeightUnit] = useState(height.unit);
  const [heightValue, setHeightValue] = useState(height.value);
  const [weightUnit, setWeightUnit] = useState(weight.unit);
  const [weightValue, setWeightValue] = useState(weight.value);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const [kgValue, setKgValue] = useState(weight.value);
  const [poundValue, setPoundValue] = useState(weight.value);
  const [isHeightAndWeightPractical, setIsHeightAndWeightPractical] = useState(
    false
  );

  const handleNext = () => {
    setIsHeightAndWeightPractical(false);
    setShowErrorMessage(false);
    if (
      !(
        validateHeight(heightUnit, heightValue) &&
        validateWeight(weightUnit, weightValue)
      )
    ) {
      setIsHeightAndWeightPractical(true);
      return;
    }
    if (isHeightChosen && isWeightChosen) {
      const bmiModuleResponse = {
        height: { value: heightValue, unit: heightUnit },
        weight: { value: weightValue, unit: weightUnit },
      };
      localStorage.setItem(
        localStorageKeys.bmiModuleResponse,
        JSON.stringify(bmiModuleResponse)
      );
      const userBmi = calculateBmi(
        weightValue,
        weightUnit,
        heightValue,
        heightUnit
      );
      const moduleData = localStorage.getItem(
        localStorageKeys.healthScoreModules
      );
      const moduleJson = JSON.parse(moduleData);
      updateBmiScore(moduleJson, getScoreByBmi(userBmi));
      handleChangeStep();
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleChangeHeight = (event, newValue) => {
    setIsHeightChosen(true);
    setHeightValue(newValue);
  };

  const handleChangeWeight = (event, newValue) => {
    setIsWeightChosen(true);
    setWeightValue(newValue);
    setKgValue(newValue);
    setPoundValue(newValue);
  };

  useEffect(() => {
    const localData = localStorage.getItem(localStorageKeys.healthScoreModules);
    if (localData) {
      const bmiModuleJson = JSON.parse(localData);
      const healthScoreFromLs = calculateHealthScore(bmiModuleJson);
      setHealthScore(Number(healthScoreFromLs));
    } else {
      setHealthScore(0);
    }
  }, []);

  const firstUpdateForWeight = useRef(true);
  useEffect(() => {
    if (firstUpdateForWeight.current) {
      firstUpdateForWeight.current = false;
      return;
    }
    const weightValueE =
      weightUnit === weightUnits[0]
        ? Math.round(weightValue / 2.20462)
        : Math.round(weightValue * 2.20462);
    setWeightValue(weightValueE);
    setKgValue(weightValueE);
    setPoundValue(weightValueE);
  }, [weightUnit]);

  const firstUpdateForHeight = useRef(true);
  useEffect(() => {
    if (firstUpdateForHeight.current) {
      firstUpdateForHeight.current = false;
      return;
    }
    const heightValueE =
      heightUnit === heightUnits[0]
        ? Math.round(heightValue * 30.48)
        : Math.round(heightValue * 0.0328084 * 10) / 10;
    setHeightValue(heightValueE);
  }, [heightUnit]);

  return (
    <div className={styles.healthScoreStepOne}>
      <div className={styles.topScoreSection}>
        <div className={styles.linearProgressContainer}>
          <BackArrow handleBackFn={handleClickBack} />
          <CustomizedSteppers
            handlePageChange={handlePageNumber}
            activeStep={0}
          />
        </div>
        <CircularProgressBar
          scoreColor={"#48C07F"}
          progressPercentage={(healthScore / bestHealthScore) * 100}
          bestHealthScore={bestHealthScore}
          currentHealthScore={healthScore}
          useCase={"HEALTH_SCORE"}
          marginTop={"10px"}
          border={"12px"}
          progressThickness={4.5}
          size={118}
        />
        <div className={styles.message}>
          <h1>BMI Module</h1>
          <p>{moduleDescription}</p>
        </div>
      </div>
      <div className={styles.pinkBackGround}>
        <div className={styles.height}>
          <label htmlFor="height">Height</label>
          <span className={styles.message}>Please choose your height</span>
          <div className={styles.heightInput}>
            <div className={styles.unitSelector}>
              <div className={styles.units}>
                {heightUnits.map((unit) => (
                  <UnitSelector
                    key={generateUuid()}
                    unit={unit}
                    selectedUnit={heightUnit}
                    setSelectedUnit={setHeightUnit}
                    activeColor={"#A73260"}
                    inActiveColor={"#B8B8B8"}
                    textColorActive={"#FFFFFF"}
                    textColorInActive={"#FFFFFF"}
                  />
                ))}
              </div>
              {heightUnit === heightUnits[1] ? (
                <div className={styles.heightInputBox}>
                  <div className={styles.ftInput}>
                    <span className={styles.ftValue}>
                      {convertFootToFtInch(heightValue).ftNumber}
                    </span>
                    <span className={styles.ftUnit}>ft</span>
                  </div>
                  <div className={styles.inchInput}>
                    <span className={styles.inchValue}>
                      {convertFootToFtInch(heightValue).inchNumber}
                    </span>
                    <span className={styles.inchUnit}>in</span>
                  </div>
                </div>
              ) : (
                <div className={styles.heightInputBox}>
                  <div className={styles.cmInput}>
                    <span className={styles.cmValue}>{heightValue}</span>
                    <span className={styles.cmUnit}>cm</span>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.sliderContainer}>
              <div className={styles.girlImageHeight}>
                <img
                  src="/assets/images/healthScore/heightGirl.svg"
                  alt="girl"
                />
              </div>
              <CircularThumbSlider
                unit={heightUnit}
                handleChange={handleChangeHeight}
                value={heightValue}
                orientation={"vertical"}
                marks={heightUnit === heightUnits[0] ? cmMarks : ftMarks}
              />
            </div>
          </div>
        </div>
        <div className={styles.weight}>
          <label htmlFor="height">Weight</label>
          <span className={styles.message}>Please choose your weight</span>
          <div className={styles.weightInput}>
            <div className={styles.unitSelector}>
              <div className={styles.units}>
                {weightUnits.map((unit) => (
                  <UnitSelector
                    key={generateUuid()}
                    unit={unit}
                    selectedUnit={weightUnit}
                    setSelectedUnit={setWeightUnit}
                    activeColor={"#A73260"}
                    inActiveColor={"#B8B8B8"}
                    textColorActive={"#FFFFFF"}
                    textColorInActive={"#FFFFFF"}
                  />
                ))}
              </div>
              {weightUnit === weightUnits[0] ? (
                <div className={styles.weightInputBox}>
                  <div className={styles.weightInputBox}>
                    <div className={styles.kgInput}>
                      <span className={styles.kgValue}>{kgValue}</span>
                      <span className={styles.kgUnit}>kg</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.weightInputBox}>
                  <div className={styles.poundInput}>
                    <span className={styles.poundValue}>{poundValue}</span>
                    <span className={styles.poundUnit}>pounds</span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.sliderContainer}>
              <div className={styles.girlImageWeightContainer}>
                <div className={styles.girlImageWeight}>
                  <img
                    src="/assets/images/healthScore/girlWeight.svg"
                    alt="girl"
                  />
                </div>
              </div>
              <div className={styles.sliderWrapper}>
                <div className={styles.slider}>
                  <CircularThumbSlider
                    unit={weightUnit}
                    handleChange={handleChangeWeight}
                    value={weightValue}
                    orientation={"horizontal"}
                    marks={weightUnit === weightUnits[0] ? kgMarks : poundMarks}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showErrorMessage && (
        <p
          data-testid="errorMessage"
          className={styles.errorMessageToAttemptAllQs}
        >
          {"*Please answer all the above questions"}
        </p>
      )}
      {isHeightAndWeightPractical && (
        <p
          data-testid="errorMessage"
          className={styles.errorMessageToAttemptAllQs}
        >
          {"*Please select valid values"}
        </p>
      )}
      <div className={styles.saveButton}>
        <Button
          onClick={handleNext}
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
          Next
        </Button>
      </div>
    </div>
  );
};
HealthScoreStepOne.propTypes = propTypes;
export default HealthScoreStepOne;
