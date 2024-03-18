import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { differenceInCalendarDays, addDays } from "date-fns";
import { MenuItem, Select } from "@material-ui/core";
import { array, func, object } from "prop-types";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    backgroundColor: "rgba(252, 249, 246, 0.7)",
    marginTop: theme.spacing(0.5),
  },
  button: {
    backgroundColor: "#F63A3A",
    textTransform: "unset",
  },
}));

const propTypes = {
  programs: array,
  handleProgramChange: func,
  currentProgram: object,
};

const PendingTime = ({ programs, handleProgramChange, currentProgram }) => {
  const classes = useStyles();

  React.useEffect(() => {}, [currentProgram]);
  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      className={classes.gridContainer}
      spacing={2}
    >
      <Grid item xs={7}>
        <Select
          value={currentProgram.id}
          onChange={(event) => handleProgramChange(event.target.value)}
        >
          {programs.map((program, index) => (
            <MenuItem value={program.id} key={index}>
              {program.plan.program.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={4}>
        {currentProgram.activated_on && (
          <Button
            size="small"
            color="primary"
            className={classes.button}
            variant="contained"
            disableElevation={true}
          >
            {`${Math.max(
              currentProgram.valid_till
                ? differenceInCalendarDays(
                    new Date(currentProgram.valid_till),
                    new Date()
                  )
                : differenceInCalendarDays(
                    addDays(
                      new Date(currentProgram.created_at),
                      currentProgram.plan.validity
                    ),
                    new Date()
                  ),
              0
            )} Days left`}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

PendingTime.propTypes = propTypes;
export default PendingTime;
