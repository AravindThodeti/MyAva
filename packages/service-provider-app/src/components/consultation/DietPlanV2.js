import * as React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Button, FormControl } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { getRecipesByName } from "utils/ApiUtils";
import styles from "./consumedDietPlan/DietPlanV2.module.scss";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DEFAULT_DIET_OBJECT, daySelectionList } from "./DietPlanData";

// import DateFnsUtils from "@date-io/date-fns/build/date-fns-utils";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import d from "final-form-arrays";
import { key } from "localforage";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    marginTop: "20px",
    width: "100%",
  },
  alignDays: {
    margin: "0 auto",
    marginLeft: "10px",
    display: "flex",
    justifyContent: "space-around",
    paddingTop: "20px",
  },
  alignDate: {
    display: "flex",
    paddingTop: "20px",
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
    border: "0",
    borderRadius: "10px",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    fontSize: "20px",
    paddingTop: "10px",
    color: "#A0A0A0",
    width: "100px",
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
    alignItems: "end",
  },
  formControl: {
    minWidth: 120,
  },
  alignIcon: {
    cursor: "pointer",
  },
  displayNone: {
    visibility: "hidden",
  },
});
const propTypes = {
  dayNumber: Number,
  dataObject: Object,
  handleDayList: Function,
};
const DietPlanV2 = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [recipeList, setRecipeList] = React.useState([]);
  const [recipeName, setRecipeName] = React.useState(" ");
  const daySelectionList = ["1", "2", "3", "4", "5", "6", "7", "All"];
  const [isChanged, setIsChanged] = React.useState(false);
  const [daySessionList, setDaySessionList] = React.useState({});
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());
  const [isActive, setIsActive] = useState("");
  const [updatedValues, setUpdatedValues] = useState([]);

  const [options, setOptions] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const firstUpdateForWeight = React.useRef(true);
  const onChangeHandler = async (event, newValue) => {
    // console.log("event",event.target,newValue)
    setSearchQuery(newValue);
  };

  let timer;
  function debounce(func, timeout = 300) {
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  // const data = [...options];
  const changeHandlerTwo = (event, newVal) =>
    debounce(() => onChangeHandler(event, newVal))();

  React.useEffect(() => {
    if (firstUpdateForWeight.current) {
      firstUpdateForWeight.current = false;
      return;
    }
    setOptions([]);
    (async () => {
      setLoading(true);
      const response = await getRecipesByName(searchQuery);
      setLoading(false);
      setOptions(response.data);
    })();
  }, [searchQuery]);

  React.useEffect(() => {
    if (props?.dataObject.day_map == null) {
      props.dataObject.day_map = {};
    }
    if (!(props?.dayNumber in props?.dataObject.day_map)) {
      setDaySessionList(JSON.parse(JSON.stringify(DEFAULT_DIET_OBJECT)));
    } else {
      setDaySessionList(props.dataObject.day_map[props.dayNumber]);
    }
  }, [props]);
  React.useEffect(() => {
    if (Object.keys(daySessionList).length > 0) {
      props.dataObject.day_map[props.dayNumber] = daySessionList;
      // console.log("page", props);
    }
  }, [daySelectionList]);

  const addRecipesToDays = (
    targetDaySessionRecipeArray,
    targetSession,
    dayNum,
    recipeIndex
  ) => {
    if (
      !targetDaySessionRecipeArray.some((res) => res.id == targetSession.id)
    ) {
      if (targetDaySessionRecipeArray.length == 1) {
        if (targetDaySessionRecipeArray[0].id == 0) {
          targetDaySessionRecipeArray[0] = JSON.parse(
            JSON.stringify(targetSession)
          );
        } else {
          targetDaySessionRecipeArray.push(
            JSON.parse(JSON.stringify(targetSession))
          );
        }
      } else {
        console.log("type", props.dataObject.day_map[dayNum][recipeIndex]);
        targetDaySessionRecipeArray.push(
          JSON.parse(JSON.stringify(targetSession))
        );
      }
    }
  };

  const handleDaySelectionChange = (event, value) => {
    console.log("event", event.target, value);
    let recipeIndex = event.target.name[1];
    let obj = { ...updatedValues };
    let valueArray = event.target.value;
    let targetSession = event.target.name[0];
    console.log("day number", props);
    if (!event.target.value.includes(props?.dayNumber.toString())) {
      console.log("yes");
      event.target.value.push(props?.dayNumber.toString());
    }
    console.log("target", targetSession);
    let filteredList = [];
    if (valueArray.indexOf("All") > -1) {
      filteredList = daySelectionList.filter((d) => d != "All");
      targetSession.daysList = filteredList;
      targetSession.selectedDates = filteredList;
    } else if (valueArray.length == daySelectionList.length - 2) {
      targetSession.daysList = daySelectionList;
      targetSession.selectedDates = valueArray;
    } else {
      filteredList = valueArray;
      targetSession.selectedDates = filteredList;
    }
    let targetDaySessionRecipeArray = [];
    filteredList.forEach((dayNum) => {
      if (Object.keys(props.dataObject.day_map).includes(dayNum)) {
        targetDaySessionRecipeArray =
          props.dataObject.day_map[dayNum][recipeIndex].recipe_details;
        addRecipesToDays(
          targetDaySessionRecipeArray,
          targetSession,
          dayNum,
          recipeIndex
        );
      } else {
        props.dataObject.day_map[dayNum] = JSON.parse(
          JSON.stringify(DEFAULT_DIET_OBJECT)
        );
        targetDaySessionRecipeArray =
          props.dataObject.day_map[dayNum][recipeIndex].recipe_details;
        addRecipesToDays(
          targetDaySessionRecipeArray,
          targetSession,
          dayNum,
          recipeIndex
        );
      }
    });

    setDaySessionList([...daySessionList]);
  };
  const handleDeleteIcon = (event, _value) => {
    let newSessionList = JSON.parse(JSON.stringify(daySessionList));
    let index = parseInt(event?.target.id);
    let recipeIndex = event.target.name;
    let newObject = newSessionList[index].recipe_details;
    newObject = newObject.filter(
      (_, currentIndex) => parseInt(recipeIndex) != currentIndex
    );
    newSessionList[index].recipe_details = newObject;
    setDaySessionList(newSessionList);
  };
  const handleAddIcon = (event) => {
    let index = parseInt(event?.target.id);
    let newSessionList = JSON.parse(JSON.stringify(daySessionList));
    let newObj = newSessionList[index];
    newObj.recipe_details.push({
      id: 0,
      name: "",
      quantity: "",
      measurement_unit: "",
      active: true,
      selectedDates: [],
      daysList: daySelectionList,
    });
    setDaySessionList(newSessionList);
  };

  const handleInputChange = (_event, value) => {
    setRecipeName(value);
  };
  const handleRecipeName = (event, value) => {
    let newSessionList = JSON.parse(JSON.stringify(daySessionList));
    let index = parseInt(event?.target.id);
    let sessionName = event.target.name;
    let newObject = newSessionList[sessionName];
    newObject[index].recipe = value;
    setDaySessionList(newSessionList);
  };
  return (
    <div>
      {daySessionList &&
        Object.values(daySessionList).map((sessionValue, sessionIndex) => (
          <div className={styles.sessionSeperator}>
            <h2>{sessionValue.meal_timing.replace(/[_]/g, " ")}</h2>
            <>
              {sessionValue?.recipe_details &&
                Object.values(sessionValue?.recipe_details).map(
                  (singleRecipeDetails, recipeIndex) => (
                    <div className={classes.buildRecipe}>
                      <span className={styles.recipes}>
                        {recipeIndex == 0 ? <p>Add Recipes</p> : null}
                        <Autocomplete
                          style={{ width: 300 }}
                          id={sessionIndex}
                          value={singleRecipeDetails?.name}
                          options={options}
                          getOptionSelected={(option, value) =>
                            option.name === value
                          }
                          getOptionLabel={(option) => {
                            return option.name
                              ? option.name + " - " + option.measurement_unit
                              : singleRecipeDetails.name;
                          }}
                          onChange={(_event, value) => {
                            if (value) {
                              singleRecipeDetails.name = value?.name;
                              singleRecipeDetails.id = value?.id;
                              singleRecipeDetails.measurement_unit =
                                value?.measurement_unit;
                              if (singleRecipeDetails.quantity == "") {
                                singleRecipeDetails.quantity = 1;
                              }
                              if (
                                singleRecipeDetails.selectedDates.length == 0
                              ) {
                                singleRecipeDetails.selectedDates.push(
                                  props.dayNumber.toString()
                                );
                              }

                            }

                            for (let i = 0; i < daySelectionList.length; i++) {
                              let count = 0;
                              if (i == sessionIndex) {
                                let sessionRecipies =
                                  daySessionList[i].recipe_details;
                                for (
                                  let j = 0;
                                  j < sessionRecipies.length;
                                  j++
                                ) {
                                  if (sessionRecipies[j].id == value.id) {
                                    count += 1;
                                    if (count > 1) {
                                      sessionRecipies = sessionRecipies.pop();
                                      setDaySessionList({ ...daySessionList });
                                    }
                                  }
                                }
                              }
                              count = 0;
                            }
                          }}
                          onOpen={() => {
                            setSearchQuery(" ");
                            singleRecipeDetails.openField = true;
                          }}
                          onClose={() => {
                            singleRecipeDetails.openField = false;
                            setSearchQuery(" ");
                          }}
                          onInputChange={changeHandlerTwo}
                          selectOnFocus={false}
                          renderInput={(params) => (
                            <TextField
                              label="Choose Recipe"
                              {...params}
                              InputProps={
                                singleRecipeDetails.openField && {
                                  ...params.InputProps,
                                  endAdornment: (
                                    <React.Fragment>
                                      {loading ? (
                                        <CircularProgress
                                          color="inherit"
                                          size={20}
                                        />
                                      ) : null}
                                      {params.InputProps.endAdornment}
                                    </React.Fragment>
                                  ),
                                }
                              }
                            />
                          )}
                        />
                      </span>
                      <span className={styles.quantity}>
                        {recipeIndex == 0 ? <p>Quantity</p> : null}

                        <TextField
                          type="number"
                          placeholder="0"
                          value={
                            singleRecipeDetails.quantity
                              ? singleRecipeDetails.quantity
                              : ""
                          }
                          onChange={(event, value) => {
                            let val = event.target.value;
                            if (val <= 0) {
                              singleRecipeDetails.quantity = 1;
                              setDaySessionList([...daySessionList]);
                            } else {
                              singleRecipeDetails.quantity = event.target.value;
                              setDaySessionList([...daySessionList]);
                            }
                          }}
                        />
                      </span>
                      <span className={styles.days}>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Days</InputLabel>
                          <Select
                            multiple
                            value={singleRecipeDetails.selectedDates}
                            name={[singleRecipeDetails, sessionIndex]}
                            onChange={handleDaySelectionChange}
                            renderValue={(selected) => selected.join(", ")}
                          >
                            {singleRecipeDetails &&
                              singleRecipeDetails?.daysList?.map(
                                (name, index) => (
                                  <MenuItem key={name} value={name}>
                                    <Checkbox
                                      disabled={
                                        props?.dayNumber == index + 1
                                          ? true
                                          : false
                                      }
                                      checked={
                                        singleRecipeDetails.selectedDates.indexOf(
                                          name
                                        ) > -1 || name == props.dayNumber
                                      }
                                      color="primary"
                                    />
                                    <ListItemText
                                      primary={
                                        index == 7
                                          ? name + " Days"
                                          : "Day " + name
                                      }
                                    />
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </span>
                      <span>
                        <img
                          name={recipeIndex}
                          id={sessionIndex}
                          value={recipeIndex}
                          //src="/assets/images/icons/deleteIcon.svg"
                          src={
                            sessionValue?.recipe_details.length == 1
                              ? "/assets/images/icons/addIcon.svg"
                              : "/assets/images/icons/deleteIcon.svg"
                          }
                          className={classes.alignIcon}
                          onClick={
                            sessionValue?.recipe_details.length == 1
                              ? handleAddIcon
                              : handleDeleteIcon
                          }
                        ></img>
                      </span>
                      <span
                        className={recipeIndex == 0 ? classes.displayNone : ""}
                      >
                        <img
                          name={singleRecipeDetails.name}
                          id={sessionIndex}
                          src="/assets/images/icons/addIcon.svg"
                          className={classes.alignIcon}
                          onClick={handleAddIcon}
                        ></img>
                      </span>
                    </div>
                  )
                )}
            </>
            <hr className={styles.sessionDivider}></hr>
          </div>
        ))}
    </div>
  );
};

//   const handleChangeMultiple = (event) => {
//     const { options } = event.target;
//     const value = [];
//     for (let i = 0, l = options.length; i < l; i += 1) {
//       if (options[i].selected) {
//         value.push(options[i].value);
//       }
//     }
//     setPersonName(value);
//   };
DietPlanV2.propTypes = propTypes;
export default DietPlanV2;
