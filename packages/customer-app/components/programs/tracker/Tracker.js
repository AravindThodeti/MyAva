import * as React from "react";
import PropTypes from "prop-types";
import DietTracker from "./diet/DietTracker";
import WorkoutTracker from "./workout/WorkoutTracker";
import WeightTracker from "./weight/WeightTracker";
export default function Tracker(props) {
  React.useEffect(() => {}, [props.userProgramId]);
  return (
    <>
      <DietTracker userProgramId={props.userProgramId} />
      <WorkoutTracker userProgramId={props.userProgramId} />
      <WeightTracker userProgramId={props.userProgramId} />
    </>
  );
}

Tracker.propTypes = {
  userProgramId: PropTypes.number.isRequired,
};
