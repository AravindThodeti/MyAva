import * as React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Button, FormControl } from "@material-ui/core";
import { useParams } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { getRecipes, getRecipesByName } from "utils/ApiUtils";
import styles from "./consumedDietPlan/DietPlanV2.module.scss";
import { useState } from "react";
import DietPlanV2 from "./DietPlanV2";
import DietPlanForAllDays from "./DietPlanForAllDays";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {
  getPreparedDietPlan,
  postPreparedDietPlan,
  checkActiveDietPlan,
  putPreparedDietPlan,
} from "utils/ApiUtils";
import { add, addDays } from "date-fns";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    marginTop: "20px",
    width: "100%",
    padding: "0px 60px",
  },
  alignDays: {
    margin: "0 auto",
    marginLeft: "10px",
    display: "flex",
    justifyContent: "space-around",
    paddingTop: "20px",
    marginBottom: "50px",
  },
  alignDate: {
    display: "flex",
    paddingTop: "20px",
    marginBottom: "40px",
  },
  alignContent: {
    margin: "0 auto",
    maxWidth: "1230px",
  },
  datePicker: {
    paddingLeft: "20px",
    underline: {
      color: "red",
      borderBottom: "none !importent",
      "&:before": {
        color: "red",
        borderBottom: "none !importent",
      },
    },
  },
  textareaResize: {
    resize: "none",
    backgroundColor: "#DFDFDF",
    borderRadius: "10px",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    fontSize: "20px",
    paddingTop: "10px",
    color: "#A0A0A0",
    paddingLeft: "10px",
    border: "1px solid transparent",
    width: "100%",
  },
  buildSession: {
    "& h2": {
      textTransform: "uppercase",
    },
  },
  buildRecipe: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: "1080px",
  },
  formControl: {
    margin: 46,
    minWidth: 120,
    maxWidth: 300,
  },
  alignIcon: {
    paddingTop: "60px",
    cursor: "pointer",
  },
  displayNone: {
    visibility: "hidden",
  },
});

export default function DietPlanParent() {
  let { id } = useParams();
  const consultationId = id;
  let dietPlan = {
    start_date: new Date(),
    number_of_days: 7,
    custom_notes: "",
    day_map: {},
  };
  const classes = useStyles();
  const [activeDay, setActiveDay] = useState("1");
  const dayList = ["1", "2", "3", "4", "5", "6", "7", "All"];
  const [daysPlanList, setDaysPlanList] = React.useState(dietPlan);
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());
  const [allData, setAllData] = useState({});
  const [isValueUpdated, setUpdate] = useState(false);
  const [customNotes, setCustomNotes] = React.useState("");
  const [applyForAllDays, setApplyForAllDays] = useState(false);
  const [individualDays, setIndividualDays] = useState(false);
  const [numberOfDaysToBeAdded, setNumberOfDaysToBeAdded] = useState(0);
  const currentDate = new Date();
  let dateChecker =
    new Date(selectedFromDate).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }) !=
    currentDate.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const [dayInterval, setDaysInterval] = React.useState([
    { value: "14", checked: false },
    { value: "21", checked: false },
    { value: "84", checked: false },
  ]);
  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function ChooseNumberOFDays() {
    return (
      <div className={styles.FooterForAllDays}>
        <ul>
          {dayInterval.map((dayGap, ind) => {
            return (
              <li>
                <p>Repeat {dayGap.value} Days</p>
                <Checkbox
                  checked={dayGap.checked}
                  id={dayGap.value}
                  onChange={handleAddingDays}
                  color="primary"
                  className={styles.timeLineCheckbox}
                  // inputProps={{ "aria-label": "controlled" }}
                />
              </li>
            );
          })}
        </ul>
        <button className={styles.footerButton} onClick={handlePublish}>
          Publish
        </button>
        <button className={styles.footerPrevBtn} onClick={formData}>
          Back
        </button>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Published successfully!
          </Alert>
        </Snackbar>
      </div>
    );
  }

  React.useEffect(() => {
    console.log("num", typeof numberOfDaysToBeAdded, numberOfDaysToBeAdded);
  }, [numberOfDaysToBeAdded]);

  React.useEffect(() => {
    checkActiveDietPlan(consultationId).then((res) => {
      if (res == true) {
        getPreparedDietPlan(consultationId).then((res) => {
          console.log("resultt", res);
          setDaysPlanList(res);
        });
      }
    });
  }, [id]);
  React.useEffect(() => {
    daysPlanList.start_date = selectedFromDate;
    setDaysPlanList({ ...daysPlanList });
  }, [selectedFromDate]);
  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };

  React.useEffect(() => {
    console.log("data", daysPlanList);
    setSelectedFromDate(daysPlanList.start_date);
  }, [daysPlanList]);

  const handleDayList = (dataFromChild) => {
    setDaysPlanList({ ...dataFromChild });
  };

  const handleAddingDays = (event, value) => {
    console.log("pos", dayInterval[event.target.id]);
    // dayInterval[event.target.id].checked=true;
    dayInterval.map((val, ind) => {
      if (val.value == event.target.id) {
        val.checked = !val.checked;
      } else {
        val.checked = false;
      }
    });
    setDaysInterval([...dayInterval]);
    console.log("event", event.target, value);
    value
      ? setNumberOfDaysToBeAdded(Number(event.target.id))
      : setNumberOfDaysToBeAdded(0);
    console.log("pos2", dayInterval[event.target.id]);
    ChooseNumberOFDays();
  };
  function footerCheckbox(e) {
    console.log("checkBox event", e.target.value);
    let checkBoxValue = e.target.value;
    if (checkBoxValue == "allDays") {
      setApplyForAllDays(!applyForAllDays);
      setIndividualDays(!individualDays);
    } else {
      setIndividualDays(!individualDays);
    }
  }
  const formData = (event) => {
    // event.preventDefault();
    let value = event?.target?.value;
    setActiveDay(value);
    // if(!(value in daysDataList)){
    //    // let dayObject = {}
    //     daysDataList[value]="day"+value
    //     setDaysDataList({...daysDataList})
    // }
    console.log("event target", event.target);
    if (event.target.innerHTML == "Next") {
      if (Number(activeDay) >= 7) {
        setActiveDay(0);
      } else {
        setActiveDay(Number(activeDay) + 1);
      }
    } else if (event.target.innerHTML == "Back") {
      console.log("elseif activeDay", activeDay);
      if (activeDay == 0 || activeDay == "All") {
        setActiveDay(7);
      }
    } else {
      let value = event?.target?.value;
      if (value == "All" || value == 0) {
        setActiveDay(0);
      } else {
        setActiveDay(Number(value));
      }
    }
  };
  const getdata = (data) => {
    setAllData(data);
  };
  const handlePublish = () => {
    setOpen(true);
    checkActiveDietPlan(consultationId).then((res) => {
      console.log("adding number", numberOfDaysToBeAdded);
      res == true
        ? putPreparedDietPlan(
            consultationId,
            numberOfDaysToBeAdded,
            daysPlanList
          ).then((res) => {
            console.log("put successful", res);
          })
        : postPreparedDietPlan(consultationId, daysPlanList).then((res) => {
            console.log("post successful", res);
          });
    });
  };
  return (
    <div className={classes.root}>
      <h1>Diet Plan</h1>
      <div className={classes.alignDays}>
        {dayList.map((day) => (
          <button
            value={day}
            onClick={formData}
            // className={
            //   activeDay == day
            //     ? styles.dietPlanBtns
            //     : styles.dietPlanNotSelected
            // }
            className={
              activeDay == day
                ? styles.dietPlanBtns
                : day == "All" && activeDay == 0
                ? styles.dietPlanBtns
                : styles.dietPlanNotSelected
            }
          >
            <ul className={styles.dayListItem}>
              <li
                onClick={formData}
                name={day}
                value={day}
                // className={
                //   activeDay == day ? styles.dietPlanBtnsfirstChild : "null"
                // }
                className={
                  activeDay == day
                    ? styles.dietPlanBtnsfirstChild
                    : day == "All" && activeDay == 0
                    ? styles.dietPlanBtnsfirstChild
                    : "null"
                }
              >
                DAY
              </li>
              <li
                onClick={formData}
                value={day}
                className={
                  activeDay == day
                    ? styles.dietPlanBtnsSecondChild
                    : day == "All" && activeDay == 0
                    ? styles.dietPlanBtnsSecondChild
                    : styles.dietPlanDay
                }
              >
                {day}
              </li>
            </ul>
          </button>
        ))}
      </div>
      {activeDay != 0 ? (
        <div className={classes.alignContent}>
          <div className={classes.alignDate}>
            <p>Start Date :</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.datePicker}
                disabled={dateChecker}
                minDate={dateChecker ? null : currentDate}
                id="date-picker-dialog"
                views={["date", "month"]}
                openTo="date"
                format="dd-MMM-yyyy"
                value={selectedFromDate}
                onChange={handleFromDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              ></KeyboardDatePicker>
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <textarea
              value={daysPlanList?.custom_notes}
              rows="6"
              cols="90"
              placeholder="Add Note"
              className={classes.textareaResize}
              onChange={(e) => {
                setDaysPlanList({
                  ...daysPlanList,
                  custom_notes: e.target.value,
                });
              }}
            ></textarea>
            <DietPlanV2
              dayNumber={activeDay}
              dataObject={daysPlanList}
              valueChange={isValueUpdated}
              handleDayList={handleDayList}
              onChange={getdata}
            ></DietPlanV2>
          </div>
        </div>
      ) : (
        <DietPlanForAllDays data={daysPlanList} />
      )}
      {activeDay != 0 ? (
        <div className={styles.footer}>
          <div className={styles.footerDaySelection}>
            <ul>
              <li>
                <p>Apply for All Days</p>
                <Checkbox
                  className={styles.Checkbox}
                  checked={applyForAllDays && individualDays}
                  // onChange={handleChange}
                  // inputProps={{ "aria-label": "controlled" }}
                  style={{ color: "#A4A4A4" }}
                  onClick={footerCheckbox}
                  value="allDays"
                />
              </li>
              {dayList
                .filter((day) => day != "All")
                .map((dayNum) => {
                  return (
                    <li>
                      <p>D{dayNum}</p>
                      <Checkbox
                        className={styles.Checkbox}
                        checked={
                          applyForAllDays || dayNum == activeDay ? true : false
                        }
                        disabled={dayNum == activeDay ? true : false}
                        // onChange={handleChange}
                        // inputProps={{ "aria-label": "controlled" }}
                        style={{ color: "#A4A4A4" }}
                        onClick={footerCheckbox}
                        value={dayNum}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          <button className={styles.footerButton} onClick={formData}>
            Next
          </button>
          {/* <button className={styles.footerButton}>Next</button> */}
        </div>
      ) : (
        <ChooseNumberOFDays />
      )}
    </div>
  );
}
