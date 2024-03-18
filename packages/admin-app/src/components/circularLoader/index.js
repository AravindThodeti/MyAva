import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { number, string } from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    height: "calc(100vh - 56px)",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const propTypes = {
  /** color of the loader in hex */
  color: string,
  /** size of the loader */
  size: number,
};

const CircularLoader = (props) => {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      secondary: { main: props.color },
    },
  });

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <CircularProgress size={props.size} {...props} color="secondary" />
      </MuiThemeProvider>
    </div>
  );
};
CircularLoader.propTypes = propTypes;
CircularLoader.defaultProps = {
  color: "#C73B5D",
  size: 20,
};
export default CircularLoader;
