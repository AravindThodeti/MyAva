import * as React from "react";
import { isBefore, isEqual, isAfter, format, addDays } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getUserProgramGoals, getWeightTracker } from "@/actions/api.action";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Goal from "./Goal";

export default function Goals(props) {
  const dispatch = useDispatch();
  const [currentWeek, setCurrentWeek] = React.useState(null);
  const goals = useSelector((state) => state.goalReducer.goals);
  const weights = useSelector((state) => state.weightTrackerReducer.weights);
  const userProgramId = useSelector(
    (state) => state.weightTrackerReducer.userProgramId
  );
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    if (props.userProgramId) {
      let startDate = props.userProgram.activated_on
        ? new Date(props.userProgram.activated_on)
        : null;
      const endDate = props.userProgram.valid_till
        ? new Date(props.userProgram.valid_till)
        : null;
      const goalWeeks = [];
      if (startDate !== null && endDate !== null) {
        let currentDate = new Date(props.userProgram.activated_on);
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
      const today = new Date();
      goalWeeks.forEach((week) => {
        if (
          (isBefore(today, week.endDate) || isEqual(today, week.endDate)) &&
          (isAfter(today, week.startDate) || isEqual(today, week.startDate))
        ) {
          setCurrentWeek({ ...week });
        }
      });
    }
  }, [props.userProgramId]);

  React.useEffect(() => {
    if (currentWeek !== null) {
      dispatch(
        getUserProgramGoals(
          props.userProgram.id,
          currentWeek.startDate.toISOString(),
          currentWeek.endDate.toISOString()
        )
      );
    }
  }, [currentWeek]);

  React.useEffect(() => {}, [goals]);

  React.useEffect(() => {
    if (
      (props.userProgramId && weights === undefined) ||
      userProgramId !== props.userProgram.id
    ) {
      if (!fetching) {
        dispatch(getWeightTracker(props.userProgramId));
        setFetching(true);
      }
    }
    return () => {
      setFetching(false);
    };
  }, [weights, props.userProgramId]);

  if (currentWeek) {
    return (
      <>
        <Box p={1}>
          <Typography>{`Weeek ${format(
            currentWeek.startDate,
            "MMM dd"
          )} - ${format(currentWeek.endDate, "MMM dd")}`}</Typography>
        </Box>
        {goals &&
          goals.length > 0 &&
          goals.map((goal, index) => (
            <Box m={1}>
              <Goal goal={goal} weights={weights} key={index} />
            </Box>
          ))}
      </>
    );
  }
  return <></>;
}

Goals.propType = {
  userProgram: PropTypes.object.isRequired,
  userProgramId: PropTypes.number,
};
