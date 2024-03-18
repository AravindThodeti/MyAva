import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { MEAL_TIMINGS, MEASUREMENT_UNITS } from "@ava/common";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import PlusIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    textTransform: "capitalize",
  },
  item: {
    fontSize: "0.9rem",
  },
  recipeButton: {
    borderRadius: theme.spacing(1),
    backgroundColor: "#F9A826",
    fontSize: "0.8rem",
    color: "white",
    paddingTop: 0,
    paddingBottom: 0,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#F9A826",
    },
  },
  disabledIconButton: {
    padding: 0,
    "&.Mui-disabled": {
      color: "green",
    },
  },
  enabledIconButton: {
    padding: 0,
  },
  plusIconButton: {
    padding: 0,
    color: "#F9A826",
  },
  buttonSize: {
    fontSize: "1rem",
  },
}));

export default function DietTimeList(props) {
  const classes = useStyles();
  return (
    <Box mt={2}>
      <Box mb={2}>
        <Typography className={classes.title}>
          {MEAL_TIMINGS[props.timing].toLowerCase()}
        </Typography>
      </Box>
      {props.diet.map((diet, index) => {
        const consumed = props.consumption.some(
          (item) => item.diet_plan_id === diet.id
        );
        return (
          <Grid container key={index}>
            <Grid item xs={8}>
              <Typography className={classes.item}>
                {`${diet.recipe.name}, ${diet.quantity} ${
                  MEASUREMENT_UNITS[diet.recipe.measurement_unit]
                }`}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {diet.recipe.recipe && (
                <Button
                  size="small"
                  className={classes.recipeButton}
                  onClick={() => props.handleOpenDetail(diet.recipe)}
                >
                  View Recipe
                </Button>
              )}
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="done"
                size="small"
                disabled={consumed}
                className={
                  consumed
                    ? classes.disabledIconButton
                    : classes.enabledIconButton
                }
                onClick={() => props.handleConsumptionClick(diet)}
              >
                <CheckIcon className={classes.buttonSize} />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
      {props.consumption
        .filter((item) => item.diet_plan_id == null)
        .map((item, index) => (
          <Grid container key={index}>
            <Grid item xs={8}>
              <Typography className={classes.item}>
                {`${item.recipe.name}, ${item.quantity} ${
                  MEASUREMENT_UNITS[item.recipe.measurement_unit]
                }`}
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="done"
                size="small"
                disabled={true}
                className={classes.disabledIconButton}
              >
                <CheckIcon className={classes.buttonSize} />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      <Grid container>
        <Grid item xs={8}>
          <Typography className={classes.item}>Other</Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="done"
            size="small"
            className={classes.plusIconButton}
            onClick={() => props.handleOtherClick(props.timing)}
          >
            <PlusIcon className={classes.buttonSize} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

DietTimeList.propTypes = {
  timing: PropTypes.string.isRequired,
  diet: PropTypes.array.isRequired,
  consumption: PropTypes.array.isRequired,
  handleConsumptionClick: PropTypes.func.isRequired,
  handleOtherClick: PropTypes.func.isRequired,
  handleOpenDetail: PropTypes.func.isRequired,
};
