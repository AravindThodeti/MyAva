import * as React from "react";
import PropType from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#89043F",
    padding: theme.spacing(1),
  },
  weight: {
    color: "white",
  },
}));

export default function WeightItem(props) {
  const classes = useStyles();
  const date = new Date(props.createdAt);
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Paper variant="outlined" className={classes.paper}>
          <Typography className={classes.weight} variant="h6">
            {props.weight}
          </Typography>
        </Paper>
      </Grid>
      <Grid item>
        <Typography>{format(date, "EEE")}</Typography>
      </Grid>
      <Grid item>
        <Typography>{format(date, "dd MMM")}</Typography>
      </Grid>
    </Grid>
  );
}

WeightItem.propTypes = {
  weight: PropType.number.isRequired,
  createdAt: PropType.string.isRequired,
};
