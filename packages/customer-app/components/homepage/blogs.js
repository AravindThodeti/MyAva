import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: "#D40A63",
    fontWeight: "500",
    marginBottom: theme.spacing(1),
  },
}));

export default function Blogs() {
  const classes = useStyles();
  return (
    <Box mt={2} ml={2} mr={2} mb={3}>
      <Typography className={classes.heading}>Women Health Blogs</Typography>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={6}>
          <Skeleton animation="wave" variant="rect" height="20vh" />
        </Grid>
        <Grid item xs={6}>
          <Skeleton animation="wave" variant="rect" height="20vh" />
        </Grid>
      </Grid>
    </Box>
  );
}
