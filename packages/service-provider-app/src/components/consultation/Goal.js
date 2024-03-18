import * as React from "react";
import PropTypes from "prop-types";
import { GOAL_TYPES, GOAL_UNITS, DEPARTMENTS } from "@ava/common";
import { isBefore, addDays, isAfter, isEqual, format } from "date-fns";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Typography,
  Slider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { getGoals, createGoal, getUserProgram } from "utils/ApiUtils";
import MaterialTable from "material-table";
import { tableIcons } from "constants/icons";

function AddGoalDialog(props) {
  function getGoalTypeKeyFromValue(value) {
    return Object.keys(GOAL_TYPES).find((key) => GOAL_TYPES[key] === value);
  }
  const [week, setWeek] = React.useState();
  const [goalType, setGoalType] = React.useState();
  const [goalValue, setGoalValue] = React.useState(0);

  const handleGoalValueChange = (event, newValue) => {
    setGoalValue(newValue);
  };

  function getGoalValueLabel() {
    switch (goalType) {
      case getGoalTypeKeyFromValue(GOAL_TYPES.SUGAR):
        return GOAL_UNITS.TSP;
      case getGoalTypeKeyFromValue(GOAL_TYPES.GLUTEN):
        return GOAL_UNITS.GMS;
      case getGoalTypeKeyFromValue(GOAL_TYPES.DAIRY):
        return GOAL_UNITS.MI;
      case getGoalTypeKeyFromValue(GOAL_TYPES.WATER):
        return GOAL_UNITS.GLASSES;
      case getGoalTypeKeyFromValue(GOAL_TYPES.WEIGHT_LOSS):
        return GOAL_UNITS.KGS;
      default:
        return "";
    }
  }
  function valuetext(value) {
    return `${value}`;
  }

  function getMin() {
    switch (goalType) {
      case getGoalTypeKeyFromValue(GOAL_TYPES.WATER):
        return 1;
      case getGoalTypeKeyFromValue(GOAL_TYPES.WEIGHT_LOSS):
        return 2;
      default:
        return 0;
    }
  }

  function getMax() {
    switch (goalType) {
      case getGoalTypeKeyFromValue(GOAL_TYPES.SUGAR):
        return 10;
      case getGoalTypeKeyFromValue(GOAL_TYPES.GLUTEN):
        return 200;
      case getGoalTypeKeyFromValue(GOAL_TYPES.DAIRY):
        return 200;
      case getGoalTypeKeyFromValue(GOAL_TYPES.WATER):
        return 15;
      case getGoalTypeKeyFromValue(GOAL_TYPES.WEIGHT_LOSS):
        return 10;
      default:
        return 10;
    }
  }
  function getStep() {
    switch (goalType) {
      case getGoalTypeKeyFromValue(GOAL_TYPES.SUGAR):
        return 1;
      case getGoalTypeKeyFromValue(GOAL_TYPES.GLUTEN):
        return 5;
      case getGoalTypeKeyFromValue(GOAL_TYPES.DAIRY):
        return 5;
      case getGoalTypeKeyFromValue(GOAL_TYPES.WATER):
        return 1;
      case getGoalTypeKeyFromValue(GOAL_TYPES.WEIGHT_LOSS):
        return 1;
      default:
        return 1;
    }
  }
  const handleGoalTypeChange = (event) => {
    setGoalType(event.target.value);
    setGoalValue(getMin());
  };

  const handleWeekChange = (event) => {
    setWeek(event.target.value);
  };
  const handleAdd = () => {
    if (week !== undefined && goalType) {
      props.addGoal({
        start_date: props.weeks[week].startDate.toISOString(),
        end_date: props.weeks[week].endDate.toISOString(),
        type: goalType,
        unit: getGoalValueLabel(),
        quantity: goalValue,
      });
      props.handleClose();
    }
  };
  const currentDate = new Date();
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Add Goal</DialogTitle>
      <DialogContent>
        <FormControl fullWidth={true}>
          <InputLabel id="week-selection-label">Select Week</InputLabel>
          <Select
            labelId="week-selection-label"
            value={week}
            onChange={handleWeekChange}
            fullWidth={true}
          >
            {props.weeks.map((week, index) => (
              <MenuItem
                key={index}
                value={index}
                disabled={isBefore(week.endDate, currentDate)}
              >
                Week {index + 1} {format(week.startDate, "do MMM")} -{" "}
                {format(week.endDate, "do MMM")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel id="goal-type-label">Goal Type</InputLabel>
          <Select
            labelId="goal-type-label"
            value={goalType}
            onChange={handleGoalTypeChange}
            fullWidth={true}
          >
            {props.departmentId === DEPARTMENTS.NUTRITIONIST &&
              Object.keys(GOAL_TYPES).map((gt) => (
                <MenuItem key={gt} value={gt}>
                  {GOAL_TYPES[gt]}
                </MenuItem>
              ))}
            {props.departmentId === DEPARTMENTS["FITNESS EXPERT"] && (
              <MenuItem value={getGoalTypeKeyFromValue(GOAL_TYPES.SUGAR)}>
                {GOAL_TYPES.SUGAR}
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <br></br>
        {goalType && (
          <FormControl fullWidth={true}>
            <Typography id="goal-value-label" gutterBottom>
              Select quantity in {getGoalValueLabel()}
              <br></br>
            </Typography>
            <Slider
              defaultValue={0}
              value={goalValue}
              onChange={handleGoalValueChange}
              getAriaValueText={valuetext}
              aria-labelledby="goal-value-label"
              valueLabelDisplay="auto"
              marks
              step={getStep()}
              min={getMin()}
              max={getMax()}
            />
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Goal(props) {
  const [open, setOpen] = React.useState(false);
  const [weeks, setWeeks] = React.useState([]);
  const tableRef = React.useRef();

  const getWeekOptions = () => {
    getUserProgram(props.userProgramId).then((res) => {
      let startDate = res.activated_on ? new Date(res.activated_on) : null;
      const endDate = res.valid_till ? new Date(res.valid_till) : null;
      const goalWeeks = [];
      if (startDate !== null && endDate !== null) {
        let currentDate = new Date(res.activated_on);
        while (isBefore(currentDate, endDate)) {
          if (currentDate.getDay() === 0) {
            //On Sunday change week
            goalWeeks.push({
              startDate: startDate,
              endDate: currentDate,
            });
            startDate = new Date(currentDate.toISOString());
            startDate = addDays(startDate, 1);
          }
          currentDate = addDays(currentDate, 1);
          if (isEqual(currentDate, endDate) || isAfter(currentDate, endDate)) {
            goalWeeks.push({
              startDate: startDate,
              endDate: endDate,
            });
          }
        }
      }
      setWeeks(goalWeeks);
    });
  };

  React.useEffect(() => {
    getWeekOptions();
  }, [props.userProgramId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (goal) => {
    createGoal(props.userProgramId, goal).then((res) => {
      tableRef.current.onQueryChange();
    });
  };
  return (
    <>
      <MaterialTable
        tableRef={tableRef}
        icons={tableIcons}
        title="Goals"
        actions={[
          {
            icon: AddIcon,
            tooltip: "Add Meal",
            isFreeAction: true,
            onClick: handleClickOpen,
          },
        ]}
        options={{
          grouping: false,
          sorting: false,
          filtering: false,
          showTitle: false,
          search: false,
          actionsColumnIndex: -1,
          defaultExpanded: true,
        }}
        columns={[
          {
            title: "Start Date",
            field: "start_date",
            type: "date",
            defaultGroupOrder: 0,
          },
          {
            title: "Goal Type",
            field: "type",
          },
          {
            title: "Unit",
            field: "unit",
          },
          {
            title: "Value",
            field: "quantity",
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            getGoals(props.userProgramId, query.page, query.pageSize)
              .then((res) => {
                res.data.forEach((g) => {
                  g.type = GOAL_TYPES[g.type];
                  g.unit = GOAL_UNITS[g.unit];
                });
                resolve({
                  data: res.data,
                  page: res.page_number,
                  totalCount: res.total,
                });
              })
              .catch((error) => {
                reject(error);
              });
          })
        }
      />
      <AddGoalDialog
        open={open}
        handleClose={handleClose}
        addGoal={handleAdd}
        weeks={weeks}
        departmentId={props.departmentId}
      />
    </>
  );
}

Goal.propTypes = {
  userProgramId: PropTypes.number.isRequired,
  departmentId: PropTypes.number.isRequired,
};
