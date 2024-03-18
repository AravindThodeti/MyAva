import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getWorkoutTracker } from "@/actions/api.action";
import { addUserProgramWorkoutConsumption } from "@/utils/ApiUtils";
import ActivityList from "./ActivityList";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import { startOfDay, endOfDay } from "date-fns";
import { ADD_USER_PROGRAM_WORKOUT_CONSUMPTION } from "@/store/actionTypes";
import * as crudAction from "@ava/common/lib/store/actions/crud.action";
import AddOtherWorkout from "./AddOtherWorkout";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WorkoutTracker(props) {
  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workoutTrackerReducer.workouts);
  const consumption = useSelector(
    (state) => state.workoutTrackerReducer.consumption
  );
  const userProgramId = useSelector(
    (state) => state.workoutTrackerReducer.userProgramId
  );
  const [fetching, setFetching] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (workouts === undefined || userProgramId !== props.userProgramId) {
      if (!fetching) {
        dispatch(
          getWorkoutTracker(
            props.userProgramId,
            startOfDay(new Date()).toISOString(),
            endOfDay(new Date()).toISOString()
          )
        );
        setFetching(true);
      }
    }
    return () => {
      setFetching(false);
    };
  }, [workouts, props.userProgramId]);

  React.useEffect(() => {}, [consumption]);

  const handleConsumptionClick = (workout) => {
    const consumption = {
      activity_id: workout.activity_id,
      workout_plan_id: workout.id,
      sets: workout.sets,
      repetitions: workout.repetitions,
    };
    addUserProgramWorkoutConsumption(props.userProgramId, consumption).then(
      (res) => {
        res.activity = consumption.activity;
        dispatch(crudAction.success(ADD_USER_PROGRAM_WORKOUT_CONSUMPTION, res));
      }
    );
  };

  const handleOtherAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addOtherConsumption = (consumption) => {
    handleClose();
    addUserProgramWorkoutConsumption(props.userProgramId, consumption).then(
      (res) => {
        res.activity = consumption.activity;
        dispatch(crudAction.success(ADD_USER_PROGRAM_WORKOUT_CONSUMPTION, res));
      }
    );
  };

  if (workouts && workouts.length > 0) {
    return (
      <Box m={1}>
        <Typography variant="h6">Activity Tracker</Typography>
        <ActivityList
          workouts={workouts}
          consumption={consumption}
          handleConsumptionClick={handleConsumptionClick}
          handleOtherClick={handleOtherAdd}
        />
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AddOtherWorkout
            handleClose={handleClose}
            handleAdd={addOtherConsumption}
          />
        </Dialog>
      </Box>
    );
  }

  return <></>;
}

WorkoutTracker.propTypes = {
  userProgramId: PropTypes.number.isRequired,
};
