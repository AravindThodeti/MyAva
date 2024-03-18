import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlusIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { getActivities } from "@/utils/ApiUtils";
import Grid from "@material-ui/core/Grid";
import { MEASUREMENT_UNITS } from "@ava/common";
import { InputAdornment } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  buttonSize: {
    fontSize: "1rem",
  },
  plusIconButton: {
    padding: 0,
    color: "#F9A826",
  },
  item: {
    fontSize: "0.9rem",
  },
}));

export default function AddOtherWorkout(props) {
  const classes = useStyles();
  const [activities, setActivities] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [sets, setSets] = React.useState({});
  const [repetitions, setRepetitions] = React.useState({});
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAdd = (activity) => {
    if (
      activity.id in sets &&
      sets[activity.id] &&
      activity.id in repetitions &&
      repetitions[activity.id]
    ) {
      props.handleAdd({
        activity,
        sets: sets[activity.id],
        repetitions: repetitions[activity.id],
        activity_id: activity.id,
      });
    }
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getActivities(null, null, null, search).then((res) => {
        setSets({});
        setRepetitions({});
        setActivities(res.data);
      });
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add Activity
          </Typography>
        </Toolbar>
      </AppBar>
      <Box m={2}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
        />
        {activities.map((activity, index) => (
          <Grid container key={index} alignItems="flex-end" spacing={1}>
            <Grid item xs={5}>
              <Typography className={classes.item}>{activity.name}</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id={`activity-set-${activity.id}`}
                label="Set"
                type="number"
                value={activity.id in sets ? sets[activity.id] : ""}
                onChange={(event) => {
                  const r = {};
                  r[activity.id] = event.target.value;
                  setSets({ ...sets, ...r });
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id={`activity-repetition-${activity.id}`}
                label="Repetition"
                type="number"
                value={
                  activity.id in repetitions ? repetitions[activity.id] : ""
                }
                onChange={(event) => {
                  const r = {};
                  r[activity.id] = event.target.value;
                  setRepetitions({ ...repetitions, ...r });
                }}
              />
            </Grid>
            <Grid item container xs={1} justify="flex-end">
              <IconButton
                aria-label="add"
                size="small"
                className={classes.plusIconButton}
                onClick={() => {
                  handleAdd(activity);
                }}
              >
                <PlusIcon className={classes.buttonSize} />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
}

AddOtherWorkout.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};
