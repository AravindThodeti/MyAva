import * as React from "react";
import PropType from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

export default function NutritionalValue(props) {
  const recipe = props.recipe;
  if (recipe) {
    if (
      recipe.protein ||
      recipe.carbs ||
      recipe.fats ||
      recipe.fibre ||
      recipe.calories
    ) {
      return (
        <Paper variant="outlined">
          <Box p={1}>
            <Typography variant="h6">Nutritional Value</Typography>
            <Grid container>
              {recipe.protein && (
                <Grid item xs={6}>
                  <Typography>{`Proteins: ${recipe.protein}g`}</Typography>
                </Grid>
              )}
              {recipe.carbs && (
                <Grid item xs={6}>
                  <Typography>{`Carbs: ${recipe.carbs}g`}</Typography>
                </Grid>
              )}
              {recipe.fats && (
                <Grid item xs={6}>
                  <Typography>{`Fats: ${recipe.fats}g`}</Typography>
                </Grid>
              )}
              {recipe.fibre && (
                <Grid item xs={6}>
                  <Typography>{`Fibre: ${recipe.fibre}g`}</Typography>
                </Grid>
              )}
              {recipe.calories && (
                <Grid item xs={6}>
                  <Typography>{`Calories: ${recipe.calories}kcal`}</Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>
      );
    }
  }
  return <></>;
}

NutritionalValue.propTypes = {
  recipe: PropType.object,
};
