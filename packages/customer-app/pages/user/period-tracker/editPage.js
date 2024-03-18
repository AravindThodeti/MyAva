import React from "react";
import { Fragment } from "react";
import DateFnsUtils from "@date-io/date-fns";
import styles from "./periodTracker.module.scss";
import * as constant from "@/constants/index";

import LinearProgress from "@material-ui/core/LinearProgress";
import { useState, useEffect } from "react";
import {
  periodTrackerQuestions,
  periodTrackerResultAPI,
  savePeriodTrackerResult,
} from "@/utils/ApiUtils";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import PeriodTrackerResult from "../period-tracker-result";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import { Radio } from "@material-ui/core";
function PeriodTracker() {
  const router = useRouter();
  const [reading, setReading] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const questionNumber = 3;
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [booleanValue, setBooleanValue] = useState(true);
  const backButton = "Back";
  const [nextButton, setNextButton] = useState("Next");
  const [periodType, setPeriodType] = useState("");
  const [cycleLength, setCycleLength] = useState();
  const [periodLength, setPeriodLength] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [healthCondition, setHealthCondition] = useState([]);
  const [isDataUpdating, setDataUpdating] = useState(false);
  const [periodTrackedResultFromAPI, setPeriodTrackedResultFromAPI] = useState(
    {}
  );
 
  const assignObject =() => {
    var periodTrackerDataFromLocal = JSON.parse(localStorage.getItem("periodTrackerData"));
       setPeriodType(periodTrackerDataFromLocal?.period_type);
       setCycleLength(periodTrackerDataFromLocal?.cycle_length);
       setSelectedDate(new Date(periodTrackerDataFromLocal?.last_period_date));
       setPeriodLength(periodTrackerDataFromLocal?.period_phase_length);
      var healthConditionArray = periodTrackerDataFromLocal?.health_condition?.split(",")
      setHealthCondition(healthConditionArray);
       setDataUpdating(true);
  }

  const getPeriodTrackerResults = async () => {
    const result = await periodTrackerResultAPI();
    setPeriodTrackedResultFromAPI(result);
  
  };

  const trackedQuestions = async () => {
    const periodQuestions = await periodTrackerQuestions(
      pageNumber,
      questionNumber
    );
    if (periodQuestions) {
      periodQuestions?.data?.map((question) => {
        if (question.question_type == "NUM_SERIES") {
          if(question.id==2){
          question.selected_option=cycleLength;
          }
          else if(question.id==4){
            question.selected_option=periodLength;
          }
          setFormList(
            question,
            question?.options[0]?.description,
            question?.options[1]?.description
          );
        }
        if (question.question_type == "DATE") {
          question.selected_option = selectedDate;
        }
        if (question.question_type == "CHECKBOX") {
          question.selected_option = healthCondition;
        }
      });
      setQuestions(periodQuestions);
      if (questions.total_pages == pageNumber + 1) {
        setNextButton("Submit");
      } else {
        setNextButton("Next");
      }
    }
  };

  function setFormList(question, firstNum, lastNum) {
    firstNum = Number(firstNum);
    let formList = ["I don't know"];
    for (let i = firstNum; i <= lastNum; i++) {
      formList.push(i);
    }
    question.displayOptions = [...formList];
  }

  useEffect(() => {  
    if(Object.keys(periodTrackedResultFromAPI).length>0){
     if((localStorage.getItem("periodTrackerData")===null || localStorage.getItem("periodTrackerData")===undefined)){
      localStorage.setItem("periodTrackerData", JSON.stringify(periodTrackedResultFromAPI?.result));
       assignObject();
    }
    else{
      assignObject();
    }
  }

    trackedQuestions();  
  }, [pageNumber,periodTrackedResultFromAPI]);

  useEffect(() => {
    getPeriodTrackerResults();
    }, []);

    useEffect(() =>{
      localStorage.removeItem("periodTrackerData");
    },[router])
  

  function setSelectedOption(qnId, value) {
    questions.data.map((qn) => {
      if (qn.question_type == "CHECKBOX") {
        qn.selected_option.push(value);
      } else if (qn.id == qnId) {
        qn.selected_option = value;
      }
    });
  }

  const handleDropdown = (event, value) => {
    let id = event.target.id.split("-", 1);
    if (id[0] == 2) {
      if (value === "I don't know") {
        value = 28;
      }
      setCycleLength(value);
      questions.data
    } else if (id[0] == 4) {
      if (value === "I don't know") {
        value = 6;
      }
      setPeriodLength(value);
    }
    questions.data.map((qn) => {
      if (qn.id == id[0]) {
        qn.selected_option = value;
      }
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMCQ = (event) => {
    setPeriodType(event.target.value);
    setSelectedOption(event.target.name, event.target.value);
  };

  const removeItem = (name, value) => {
    if (healthCondition.includes(value)) {
      setHealthCondition(healthCondition.filter((item) => item !== value));
    }
    questions.data.map((qn) => {
      if (qn.id == name && qn.selected_option != null) {
        qn.selected_option = qn.selected_option.filter(
          (item) => item !== value
        );
      }
    });
  };

  const handleCheckBox = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (value === "None") {
      setHealthCondition([]);
      setHealthCondition((arr) => [...arr, value]);
      setSelectedOption(name, value);
    } else if (!healthCondition.includes(value)) {
      removeItem(name, "None");
      setHealthCondition((array) => [...array, value]);
      setSelectedOption(name, value);
    } else {
      removeItem(name, value);
    }
    if (booleanValue == false) {
      setBooleanValue(true);
    } else {
      setBooleanValue(false);
    }
  };

  const handleButton = async (event) => {
    setShowErrorMessage(false);
    let data = {
      period_type: periodType,
      last_period_date: selectedDate.toISOString(),
      cycle_length: cycleLength,
      period_phase_length: periodLength,
      health_condition: healthCondition.toString(),
    };
    localStorage.setItem("periodTrackerData", JSON.stringify(data));
    var buttonName = event.target.id;
    var checkSubmission = true;
    if (pageNumber == 0) {
      if(periodType == "" ||cycleLength==undefined)
      {
      checkSubmission = false;
      }
    }
    else{
      if(periodLength==undefined || healthCondition.length <= 0){
      checkSubmission = false;
      }
    }

    if (questions?.has_next && buttonName == nextButton) {
      if (!checkSubmission) {
        setShowErrorMessage(true);
      } else {
        setReading(reading + 100 / questions.total_pages);
        setPageNumber((pageNumber) => pageNumber + 1);
      }
    } else if (questions?.has_previous && buttonName == backButton) {
      setReading(reading - 100 / questions.total_pages);
      setPageNumber((pageNumber) => pageNumber - 1);
    } else if (!questions?.has_next && buttonName == "Submit") {
      if (!checkSubmission) {
        setShowErrorMessage(true);
      } else {
        try {
          const res = await savePeriodTrackerResult(
            JSON.parse(localStorage.getItem("periodTrackerData"))
          );
          router.push(constant.URL_MY_PERIODTRACKERRESULT);
        } catch (res) {
          let message = "";
          res.message
            ? (message = res.message)
            : (res.message = "something went wrong , Please try again");
          <p>{message}</p>;
        }
      }
    }
  };

  return Object.keys(periodTrackedResultFromAPI).length>0 && isDataUpdating ?(
    <Fragment>
      <div className={styles.body}>
        <div className={styles.ProgressBar}>
          <LinearProgress variant="determinate" value={reading} />
        </div>
        {
          <div className={styles.content}>
            {questions?.data?.map((question, index) => {
              if (question?.question_type == "MCQ") {
                return (
                  <FormControl>
                    <h3>{question.description}</h3>
                    <FormGroup aria-label="position">
                      {question?.options?.map((opt) => {
                        return (
                          <div>
                            {
                              <FormControlLabel
                                key={question.id}
                                id={"mcq" + opt.id}
                                className={`${styles.mcqOPtions} ${
                                  periodType == opt.description
                                    ? styles.changeBg
                                    : styles.mcqOPtions
                                }`}
                                control={
                                  <Radio
                                    icon={true}
                                    checkedIcon={
                                      !(periodType == opt.description)
                                    }
                                    checked={periodType == opt.description}
                                    onChange={handleMCQ}
                                    name={question.id.toString()}
                                    value={opt.description}
                                    color="primary"
                                  />
                                }
                                label={opt.description}
                              />
                            }
                          </div>
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                );
              } else if (question?.question_type == "CHECKBOX") {
                return (
                  <FormControl className={styles.checkBoxOptions}>
                    <h3>{question.description}</h3>

                    <FormGroup aria-label="position">
                      {question?.options?.map((opt) => {
                        return (
                          <div
                            className={`${styles.mcqOPtions} ${
                              healthCondition.includes(opt.description)
                                ? styles.changeBg
                                : "bg-white"
                            }`}
                          >
                            {
                              <FormControlLabel
                                key={opt.id}
                                label={opt.description}
                                classes={{
                                  root: healthCondition.includes(
                                    opt.description
                                  )
                                    ? styles.changeBg
                                    : "bg-white",
                                }}
                                labelPlacement="start"
                                control={
                                  <Checkbox
                                    checked={healthCondition.includes(
                                      opt.description
                                    )}
                                    onChange={handleCheckBox}
                                    value={opt.description}
                                    name={question.id.toString()}
                                    classes={{
                                      checked: healthCondition.includes(
                                        opt.description
                                      )
                                        ? styles.checkBoxWhite
                                        : "",
                                    }}
                                    color="primary"
                                  />
                                }
                              />
                            }
                          </div>
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                );
              } else if (question?.question_type == "NUM_SERIES") {
                return (
                  <FormControl>
                    <div>
                      <h3>{question.description}</h3>
                      <p className={styles.helpText}>
                        {question.id == 2
                          ? "(Average days between your last and next period.)"
                          : " "}
                      </p>
                      <div>
                        {" "}
                        {
                          <Autocomplete
                          blurOnSelect
                            onChange={handleDropdown}
                            id={question.id.toString()}
                            value={question?.id === 2 ? cycleLength : periodLength}
                            options={question?.displayOptions}
                            getOptionLabel={(option) => {
                              return option.toString();
                            }}
                            defaultValue={question?.id === 2 ? cycleLength : periodLength}
                            getOptionSelected={(option, value) => {
                              option.toString() === value.toString();
                              if (option.toString() === value.toString()) {
                                question.selected_option = value.toString();
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                placeholder="Choose one"
                              />
                            )}
                          />
                        }
                      </div>
                    </div>
                  </FormControl>
                );
              } else if (question?.question_type == "DATE") {
                return (
                  <div>
                    <h3>{question.description}</h3>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container>
                        <KeyboardDatePicker
                          fullWidth={true}
                          disableFuture
                          format="MMM/dd/yyyy"
                          margin="normal"
                          id="date picker dialog"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </div>
                );
              }
            })}
          </div>
        }
        {showErrorMessage && (
          <p
            data-testid="errorMessage"
            className={styles.errorMessageToAttemptAllQs}
          >
            {"*Please answer all the above questions"}
          </p>
        )}
        {questions.data && (
          <div className={styles.navigationButtons}>
            <button onClick={handleButton} id={backButton}>
              {backButton}
            </button>
            <button onClick={handleButton} id={nextButton}>
              {nextButton}
            </button>
          </div>
        )}
      </div>
    </Fragment>
  ):(
    <div></div>
  );
}
export default PeriodTracker;
