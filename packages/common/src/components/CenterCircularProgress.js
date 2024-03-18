import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    height: "40vh",
  },
}));

export default function CenterCircularProgress() {
  const classes = useStyles();
  return (
    <Container>
      <Box className={classes.box} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    </Container>
  );
}
