import * as React from "react";
import PropTypes from "prop-types";
import { ACTIVITY_TYPES } from "@ava/common";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  getActivities,
  getConsultationWorkout,
  createConsultationWorkout,
  deleteConsultationWorkout,
} from "utils/ApiUtils";
import MaterialTable from "material-table";
import { tableIcons } from "constants/icons";

function AddWorkoutDialog(props) {
  const [activityType, setActivityType] = React.useState("");
  const [sets, setSets] = React.useState(0);
  const [repetitions, setRepetitions] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleActivityTypeChange = (event) => {
    setActivityType(event.target.value);
  };

  const handleSetsChange = (event) => {
    setSets(event.target.value);
  };

  const handleRepetitionsChange = (event) => {
    setRepetitions(event.target.value);
  };

  const searchActivity = async (activityName) => {
    setLoading(true);
    const acitivityMeta = await getActivities(activityName, null, activityType);
    const activities = acitivityMeta.data;
    const activityDict = {};
    activities.forEach((activity) => {
      activityDict[activity.name] = activity;
    });
    setSearchResult({ ...searchResult, ...activityDict });
    setOptions(Object.keys(searchResult));
    setLoading(false);
  };

  const handleAdd = () => {
    if (sets != null && selectedValue && repetitions != null) {
      props.addWorkout({
        activity_id: selectedValue.id,
        sets: sets,
        repetitions: repetitions
      });
      props.handleClose();
    }
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchActivity(inputValue);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Add Workout</DialogTitle>
      <DialogContent>
        <FormControl fullWidth={true}>
          <InputLabel id="activity-type-label">Workout Type</InputLabel>
          <Select
            labelId="activity-type-label"
            value={activityType}
            onChange={handleActivityTypeChange}
            fullWidth={true}
          >
            {Object.keys(ACTIVITY_TYPES).map((at) => (
              <MenuItem key={at} value={at}>
                {ACTIVITY_TYPES[at]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          options={options}
          loading={loading}
          filterSelectedOptions
          fullWidth={true}
          onInputChange={(event, newValue) => {
            setInputValue(newValue);
            setSelectedValue(searchResult[newValue]);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Workout"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <TextField
          type="number"
          label="Sets"
          InputProps={{ inputProps: {min: 0, max: 10 }}}
          value={sets}
          fullWidth={true}
          onChange={handleSetsChange}
        />
        <TextField
          type="number"
          label="Repetitions"
          InputProps={{ inputProps: {min: 0, max: 25 }}}
          value={repetitions}
          fullWidth={true}
          onChange={handleRepetitionsChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function WorkoutPlan(props) {
  const [open, setOpen] = React.useState(false);
  const tableRef = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (workout) => {
    createConsultationWorkout(props.consultationId, workout).then((res) => {
      tableRef.current.onQueryChange();
    });
  };

  const handleDelete = (workout) => {
    deleteConsultationWorkout(props.consultationId, workout.id).then((res) => {
      tableRef.current.onQueryChange();
    });
  };

  return (
    <>
      <MaterialTable
        tableRef={tableRef}
        icons={tableIcons}
        title="Workouts"
        columns={[
          {
            title: "Workout Type",
            field: "activity.activity_type",
            defaultGroupOrder: 0,
          },
          { title: "Workout", field: "activity.name", grouping: false },
          { title: "Sets", field: "sets", grouping: false },
          { title: "Repetitions", field: "repetitions", grouping: false },
        ]}
        actions={[
          {
            icon: AddIcon,
            tooltip: "Add Workout",
            isFreeAction: true,
            onClick: handleClickOpen,
          },
          {
            icon: DeleteIcon,
            tooltip: "Delete Workout",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
        options={{
          grouping: false,
          sorting: false,
          filtering: false,
          paging: false,
          showTitle: false,
          search: false,
          actionsColumnIndex: -1,
          defaultExpanded: true,
        }}
        data={(query) =>
          new Promise((resolve, reject) => {
            getConsultationWorkout(props.consultationId)
              .then((res) => {
                const activityIds = [];
                res.data.forEach((cw) => {
                  activityIds.push(cw.activity_id);
                });
                if (activityIds.length > 0) {
                  getActivities(null, activityIds).then((activityMeta) => {
                    const activityIdMapping = {};
                    activityMeta.data.forEach((rec) => {
                      activityIdMapping[rec.id] = rec;
                    });
                    res.data.forEach((cw) => {
                      cw.activity = activityIdMapping[cw.activity_id];
                    });
                    resolve({
                      data: res.data,
                      page: res.page_number,
                      totalCount: res.total,
                    });
                  });
                } else {
                  resolve({
                    data: res.data,
                    page: res.page_number,
                    totalCount: res.total,
                  });
                }
              })
              .catch((error) => {
                reject(error);
              });
          })
        }
      />
      <AddWorkoutDialog
        open={open}
        handleClose={handleClose}
        addWorkout={handleAdd}
      />
    </>
  );
}

WorkoutPlan.propTypes = {
  consultationId: PropTypes.string.isRequired,
  userProgramId: PropTypes.string,
};

WorkoutPlan.defaultProps = {
  userProgramId: null,
};
