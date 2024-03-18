import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { string, bool, func } from "prop-types";

const propTypes = {
  /** message for the alert */
  message: string,
  /** background color of snack bar */
  backgroundColor: string,
  /** state of the snack bar */
  open: bool,
  /** function to handle open state */
  setOpen: func,
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CustomizedSnackbar = ({ message, backgroundColor, open, setOpen }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    myalert: {
      backgroundColor: backgroundColor,
    },
  }));
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          className={classes.myalert}
          onClose={handleClose}
          severity="error"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
CustomizedSnackbar.defaultProps = {
  backgroundColor: "#323232",
};
CustomizedSnackbar.propTypes = propTypes;
export default CustomizedSnackbar;
