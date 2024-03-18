import * as React from "react";
import clsx from "clsx";
import PropType, { object, number } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { GOAL_TYPES, GOAL_UNITS } from "@ava/common";

const propTypes = {
  goal: object,
  weight: number,
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  start: {
    backgroundColor: "#89043F",
  },
  end: {
    backgroundColor: "#2E8B02",
  },
  progress: {
    margin: theme.spacing(1),
    border: "1px solid rgb(0,0,0,0.2)",
    height: theme.spacing(1),
    backgroundColor: "#ffffff",
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#2E8B02",
    },
  },
  day: {
    fontSize: "0.8rem",
    padding: theme.spacing(0.8),
  },
  goalTitle: {
    color: "#89043F",
    fontSize: "0.90rem",
    fontWeight: 600,
    textTransform: "capitalize",
    marginBottom: theme.spacing(0.5),
  },
}));

const GoalRow = ({ goal, weight }) => {
  const classes = useStyles();
  if (GOAL_TYPES[goal.type] === GOAL_TYPES.WEIGHT_LOSS) {
    let completed = 0;
    if (weight && goal.initial_value && goal.final_value) {
      const current = goal.initial_value - weight;
      if (current <= 0) {
        completed = 0;
      } else {
        completed = (current / goal.quantity) * 100;
      }
    }
    return (
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={1}>
          <Avatar className={clsx(classes.avatar, classes.start)}>
            {goal.initial_value}
          </Avatar>
        </Grid>
        <Grid item xs={9}>
          <LinearProgress
            className={classes.progress}
            variant="determinate"
            value={completed}
          />
        </Grid>
        <Grid item xs={1}>
          <Avatar className={clsx(classes.avatar, classes.end)}>
            {goal.final_value}
          </Avatar>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container>
      <Grid item>
        <Typography className={classes.day}>Day 1</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.day}>Day 2</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.day}>Day 3</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.day}>Day 4</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.day}>Day 5</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.day}>Day 6</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.day}>Day 7</Typography>
      </Grid>
    </Grid>
  );
};
GoalRow.propTypes = propTypes;

const Goal = (props) => {
  const classes = useStyles();

  const goal = props.goal;
  const lastWeight = props.weights
    ? props.weights.length > 0
      ? props.weights[0].weight
      : null
    : null;
  let goalValue = "";
  if (GOAL_TYPES[goal.type] !== GOAL_TYPES.WEIGHT_LOSS) {
    if (goal.quantity == 0) {
      goalValue = "No";
    } else {
      goalValue = `${goal.quantity} ${GOAL_UNITS[goal.unit]}`;
    }
  }

  return (
    <Paper variant="outlined">
      <Box p={1}>
        <Typography className={classes.goalTitle}>
          {`${goalValue} ${GOAL_TYPES[goal.type]}`.toLowerCase()}
        </Typography>
        <GoalRow goal={goal} weight={lastWeight} />
      </Box>
    </Paper>
  );
};

Goal.propTypes = {
  goal: PropType.object,
  weights: PropType.array,
};
export default Goal;
