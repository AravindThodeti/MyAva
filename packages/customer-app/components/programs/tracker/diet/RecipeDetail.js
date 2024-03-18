import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import NutritionalValue from "./NutritionalValue";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function RecipeDetail(props) {
  const classes = useStyles();
  if (props.recipe) {
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
              {props.recipe.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box m={2}>
          <Typography>{props.recipe.description}</Typography>
          <Box mt={2}>
            <NutritionalValue recipe={props.recipe} />
          </Box>
          <Box mt={2}>{ReactHtmlParser(props.recipe.recipe)}</Box>
        </Box>
      </>
    );
  }
  return <></>;
}

RecipeDetail.propTypes = {
  recipe: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};
