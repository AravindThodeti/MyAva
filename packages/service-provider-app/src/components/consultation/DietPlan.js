import * as React from "react";
import PropTypes from "prop-types";
import { MEAL_TIMINGS } from "@ava/common";
import {
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  getRecipes,
  getConsultationDiet,
  createConsultationDiet,
  deleteConsultationDiet,
} from "utils/ApiUtils";
import MaterialTable from "material-table";
import { tableIcons } from "constants/icons";

function AddRecipeDialog(props) {
  const [mealTiming, setMealTiming] = React.useState(null);
  const [quantity, setQuantity] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleMealTimingChange = (event) => {
    setMealTiming(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const searchRecipe = async (recipeName) => {
    setLoading(true);
    const recipeMeta = await getRecipes(recipeName);
    const recipes = recipeMeta.data;
    const recipeDict = {};
    recipes.forEach((recipe) => {
      recipeDict[recipe.name] = recipe;
    });
    setSearchResult({ ...searchResult, ...recipeDict });
    setOptions(Object.keys(searchResult));
    setLoading(false);
  };

  const handleAdd = () => {
    if (mealTiming && selectedValue && quantity) {
      props.addRecipe({
        recipe_id: selectedValue.id,
        meal_timing: mealTiming,
        quantity: quantity,
      });
      props.handleClose();
    }
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchRecipe(inputValue);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Add Recipe</DialogTitle>
      <DialogContent>
        <FormControl fullWidth={true}>
          <InputLabel id="meal-timing-label">Meal Timing</InputLabel>
          <Select
            labelId="meal-timing-label"
            value={mealTiming}
            onChange={handleMealTimingChange}
            fullWidth={true}
          >
            {Object.keys(MEAL_TIMINGS).map((mt) => (
              <MenuItem key={mt} value={mt}>
                {MEAL_TIMINGS[mt]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          options={options}
          loading={loading}
          filterSelectedOptions
          fullWidth={true}
          onInputChange={(event, newValue) => {
            setInputValue(newValue);
            setSelectedValue(searchResult[newValue]);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Recipe"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          fullWidth={true}
          onChange={handleQuantityChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {selectedValue?.measurement_unit}
              </InputAdornment>
            ),
            inputProps: {min: 0}
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function DietPlan(props) {
  const [open, setOpen] = React.useState(false);
  const tableRef = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (recipe) => {
    createConsultationDiet(props.consultationId, recipe).then((res) => {
      tableRef.current.onQueryChange();
    });
  };

  const handleDelete = (meal) => {
    deleteConsultationDiet(props.consultationId, meal.id).then((res) => {
      tableRef.current.onQueryChange();
    });
  };

  return (
    <>
      <MaterialTable
        tableRef={tableRef}
        icons={tableIcons}
        title="Recipes"
        columns={[
          {
            title: "Meal Timing",
            field: "meal_timing",
            defaultGroupOrder: 0,
          },
          { title: "Recipe", field: "recipe.name", grouping: false },
          { title: "Quantity", field: "quantity", grouping: false },
          { title: "Unit", field: "recipe.measurement_unit", grouping: false },
        ]}
        actions={[
          {
            icon: AddIcon,
            tooltip: "Add Meal",
            isFreeAction: true,
            onClick: handleClickOpen,
          },
          {
            icon: DeleteIcon,
            tooltip: "Delete Meal",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
        options={{
          grouping: false,
          sorting: false,
          filtering: false,
          paging: false,
          showTitle: false,
          search: false,
          actionsColumnIndex: -1,
          defaultExpanded: true
        }}
        data={(query) =>
          new Promise((resolve, reject) => {
            getConsultationDiet(props.consultationId)
              .then((res) => {
                const recipeIds = [];
                res.data.forEach((cd) => {
                  recipeIds.push(cd.recipe_id);
                });
                if (recipeIds.length > 0) {
                  getRecipes(null, recipeIds).then((recipeMeta) => {
                    const recipeIdMapping = {};
                    recipeMeta.data.forEach((rec) => {
                      recipeIdMapping[rec.id] = rec;
                    });
                    res.data.forEach((cd) => {
                      cd.recipe = recipeIdMapping[cd.recipe_id];
                      cd.meal_timing = MEAL_TIMINGS[cd.meal_timing];
                    });
                    resolve({
                      data: res.data,
                      page: res.page_number,
                      totalCount: res.total,
                    });
                  });
                } else {
                  resolve({
                    data: res.data,
                    page: res.page_number,
                    totalCount: res.total,
                  });
                }
              })
              .catch((error) => {
                reject(error);
              });
          })
        }
      />
      <AddRecipeDialog
        open={open}
        handleClose={handleClose}
        addRecipe={handleAdd}
      />
    </>
  );
}

DietPlan.propTypes = {
  consultationId: PropTypes.number.isRequired,
  userProgramId: PropTypes.number,
};

DietPlan.defaultProps = {
  userProgramId: null,
};
