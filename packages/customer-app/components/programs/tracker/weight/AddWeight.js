import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function AddWeight(props) {
  const classes = useStyles();
  const [weight, setWeight] = React.useState("");

  const handleOnWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleSaveClick = () => {
    if (weight && !isNaN(weight)) {
      props.handleAdd({weight});
    }
  };

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add Weight
          </Typography>
        </Toolbar>
      </AppBar>
      <Box m={2}>
        <TextField
          fullWidth
          label="Weight"
          variant="outlined"
          type="number"
          value={weight}
          onChange={handleOnWeightChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">Kgs</InputAdornment>,
          }}
        />
      </Box>
      <Box m={2} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </Box>
    </>
  );
}

AddWeight.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};
