import React, { useState, useEffect, useCallback } from "react";
import styles from "./HealthScore.module.scss";
import HealthScoreStepOne from "../../../modules/healthScoreStepOne";
import HealthScoreQuestions from "../../../modules/healthScoreQuestions";
import { useRouter } from "next/router";
import {
  getHealthScoreModulesFromDb,
  submitHealthScoreResponsesForUser,
} from "@/utils/ApiUtils";
import {
  moduleDescription,
  localStorageKeys,
  healthScoreResultPageUrl,
  modifyDataForPostApi,
} from "../../../constants/healthScore";
import Loader from "@/components/loader";
import CustomizedSnackbar from "@/components/snackBar";

const HealthScoreCalculator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleClickSubmit = async () => {
    try {
      setIsSubmitting(true);
      const healthScoreModulesJson = JSON.parse(
        localStorage.getItem(localStorageKeys.healthScoreModules)
      );
      const responseData = modifyDataForPostApi(healthScoreModulesJson);
      const data = await submitHealthScoreResponsesForUser({
        test_date: new Date(),
        modules: responseData,
      });
      localStorage.setItem(
        localStorageKeys.healthScoreResult,
        JSON.stringify(data)
      );
      setIsSubmitting(false);
      router.push(healthScoreResultPageUrl);
    } catch (err) {
      setIsSubmitting(false);
      setSnackBarOpen(true);
      setErrorMessage("Something went wrong! Please try again.");
    }
  };

  const [healthScoreModulesInState, setHealthScoreModule] = useState();
  const [bestHealthScore, setBestHealthScore] = useState();
  let currentStepSaved;
  if (typeof window !== "undefined") {
    const currentStep = localStorage.getItem(localStorageKeys.currentStep);
    currentStepSaved = currentStep ? Number(currentStep) : 0;
  }
  const [currentStep, setCurrentStep] = useState(currentStepSaved);
  const handleChangeStep = (step) => () => setCurrentStep(step);
  const handlePageNumber = (step) => setCurrentStep(step);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.currentStep, currentStep);
    window.scrollTo(0, 0);
  }, [currentStep]);

  const setHealthScoreModulesFromApi = useCallback(async () => {
    try {
      const data = await getHealthScoreModulesFromDb();
      setHealthScoreModule(data.modules);
      setBestHealthScore(data.total_score);
      localStorage.setItem(
        localStorageKeys.healthScoreModules,
        JSON.stringify(data.modules)
      );
      localStorage.setItem(
        localStorageKeys.bestHealthScore,
        JSON.stringify(data.total_score)
      );
    } catch (err) {
      setSnackBarOpen(true);
      setErrorMessage("Something went wrong! Please try again.");
    }
  }, []);

  useEffect(() => {
    /**Checking if modules are present inside local storage */
    let savedHealthScoreModules;
    let savedTotalScore;
    if (typeof window !== "undefined") {
      const healthScoreModules = localStorage.getItem(
        localStorageKeys.healthScoreModules
      );
      savedHealthScoreModules =
        healthScoreModules && JSON.parse(healthScoreModules);
      const totalScore = localStorage.getItem(localStorageKeys.bestHealthScore);
      savedTotalScore = totalScore && Number(totalScore);
    }
    if (savedHealthScoreModules) {
      /** If modules are present in local storage--> Serve from local storage */
      setHealthScoreModule(savedHealthScoreModules);
      setBestHealthScore(savedTotalScore);
    } else {
      /** If modules are not present --> Serve from API */
      setHealthScoreModulesFromApi();
    }
  }, [currentStep]);

  /**Function to conditionally render the page as per the step */
  const renderComponentsAccToStep = (step) => {
    switch (step) {
      case 0:
        return (
          <HealthScoreStepOne
            moduleDescription={
              moduleDescription[healthScoreModulesInState[0].name]
            }
            bestHealthScore={bestHealthScore}
            handleChangeStep={handleChangeStep(1)}
            handlePageNumber={handlePageNumber}
          />
        );

      case 1:
        return (
          <HealthScoreQuestions
            currentStep={1}
            moduleName={healthScoreModulesInState[1].name}
            handleIncrementStep={handleChangeStep(2)}
            handleDecrementStep={handleChangeStep(0)}
            questions={healthScoreModulesInState[1].questions}
            bestHealthScore={bestHealthScore}
            moduleDescription={
              moduleDescription[healthScoreModulesInState[1].name]
            }
            handlePageNumber={handlePageNumber}
          />
        );

      case 2:
        return (
          <HealthScoreQuestions
            currentStep={2}
            moduleName={healthScoreModulesInState[2].name}
            handleIncrementStep={handleChangeStep(3)}
            handleDecrementStep={handleChangeStep(1)}
            questions={healthScoreModulesInState[2].questions}
            bestHealthScore={bestHealthScore}
            moduleDescription={
              moduleDescription[healthScoreModulesInState[2].name]
            }
            handlePageNumber={handlePageNumber}
          />
        );

      case 3:
        return (
          <HealthScoreQuestions
            currentStep={3}
            moduleName={healthScoreModulesInState[3].name}
            handleIncrementStep={handleChangeStep(4)}
            handleDecrementStep={handleChangeStep(2)}
            questions={healthScoreModulesInState[3].questions}
            bestHealthScore={bestHealthScore}
            moduleDescription={
              moduleDescription[healthScoreModulesInState[3].name]
            }
            handlePageNumber={handlePageNumber}
          />
        );

      case 4:
        return (
          <HealthScoreQuestions
            currentStep={4}
            moduleName={healthScoreModulesInState[4].name}
            handleIncrementStep={handleChangeStep(5)}
            handleDecrementStep={handleChangeStep(3)}
            questions={healthScoreModulesInState[4].questions}
            bestHealthScore={bestHealthScore}
            moduleDescription={
              moduleDescription[healthScoreModulesInState[4].name]
            }
            handlePageNumber={handlePageNumber}
          />
        );
      case 5:
        return (
          <HealthScoreQuestions
            currentStep={5}
            moduleName={healthScoreModulesInState[5].name}
            handleIncrementStep={handleClickSubmit}
            handleDecrementStep={handleChangeStep(4)}
            questions={healthScoreModulesInState[5].questions}
            bestHealthScore={bestHealthScore}
            moduleDescription={
              moduleDescription[healthScoreModulesInState[5].name]
            }
            isSubmitting={isSubmitting}
            handlePageNumber={handlePageNumber}
          />
        );
    }
  };

  return (
    <div className={styles.healthScorePage}>
      {healthScoreModulesInState ? (
        renderComponentsAccToStep(currentStep)
      ) : (
        <Loader />
      )}
      <CustomizedSnackbar
        open={isSnackBarOpen}
        message={errorMessage}
        setOpen={setSnackBarOpen}
      />
    </div>
  );
};

export default HealthScoreCalculator;
