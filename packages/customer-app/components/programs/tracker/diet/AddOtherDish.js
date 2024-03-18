import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlusIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { getRecipes } from "@/utils/ApiUtils";
import Grid from "@material-ui/core/Grid";
import { MEASUREMENT_UNITS } from "@ava/common";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  buttonSize: {
    fontSize: "1rem",
  },
  plusIconButton: {
    padding: 0,
    color: "#F9A826",
  },
  item: {
    fontSize: "0.9rem",
  },
}));

export default function AddOtherDish(props) {
  const classes = useStyles();
  const [recipes, setRecipes] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [quantities, setQuantities] = React.useState({});
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAdd = (recipe) => {
    if (recipe.id in quantities && quantities[recipe.id]) {
      props.handleAdd({
        recipe,
        quantity: quantities[recipe.id],
        meal_timing: props.mealTiming,
        recipe_id: recipe.id,
      });
    }
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getRecipes(null, null, null, search).then((res) => {
        setQuantities({});
        setRecipes(res.data);
      });
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);
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
            Add a dish
          </Typography>
        </Toolbar>
      </AppBar>
      <Box m={2}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
        />
        {recipes.map((recipe, index) => (
          <Grid container key={index} alignItems="flex-end">
            <Grid item xs={7}>
              <Typography className={classes.item}>{recipe.name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id={`recipe-qty-${recipe.id}`}
                label="Qty"
                type="number"
                value={recipe.id in quantities ? quantities[recipe.id] : ""}
                onChange={(event) => {
                  const r = {};
                  r[recipe.id] = event.target.value;
                  setQuantities({ ...quantities, ...r });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {MEASUREMENT_UNITS[recipe.measurement_unit]}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item container xs={1} justify="flex-end">
              <IconButton
                aria-label="add"
                size="small"
                className={classes.plusIconButton}
                onClick={() => {
                  handleAdd(recipe);
                }}
              >
                <PlusIcon className={classes.buttonSize} />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
}

AddOtherDish.propTypes = {
  mealTiming: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};
