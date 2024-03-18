import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getDietTracker } from "@/actions/api.action";
import { addUserProgramDietConsumption } from "@/utils/ApiUtils";
import DietTimeList from "./DietTimeList";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import { startOfDay, endOfDay } from "date-fns";
import { ADD_USER_PROGRAM_DIET_CONSUMPTION } from "@/store/actionTypes";
import * as crudAction from "@ava/common/lib/store/actions/crud.action";
import AddOtherDish from "./AddOtherDish";
import RecipeDetail from "./RecipeDetail";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DietTracker(props) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.dietTrackerReducer.diets);
  const consumption = useSelector(
    (state) => state.dietTrackerReducer.consumption
  );
  const userProgramId = useSelector(
    (state) => state.dietTrackerReducer.userProgramId
  );
  const [otherMealTiming, setOtherMealTiming] = React.useState(null);
  const [fetching, setFetching] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [recipeDetail, setRecipeDetail] = React.useState(null);

  React.useEffect(() => {
    if (diets === undefined || userProgramId !== props.userProgramId) {
      if (!fetching) {
        dispatch(
          getDietTracker(
            props.userProgramId,
            startOfDay(new Date()).toISOString(),
            endOfDay(new Date()).toISOString()
          )
        );
        setFetching(true);
      }
    }
    return () => {
      setFetching(false);
    };
  }, [diets, props.userProgramId]);

  React.useEffect(() => {}, [consumption]);

  const handleConsumptionClick = (diet) => {
    const consumption = {
      recipe_id: diet.recipe_id,
      meal_timing: diet.meal_timing,
      quantity: diet.quantity,
      diet_plan_id: diet.id,
    };
    addUserProgramDietConsumption(props.userProgramId, consumption).then(
      (res) => {
        res.recipe = diet.recipe;
        dispatch(crudAction.success(ADD_USER_PROGRAM_DIET_CONSUMPTION, res));
      }
    );
  };

  const handleOtherAdd = (mealTiming) => {
    setOtherMealTiming(mealTiming);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDetail = (recipe) => {
    setRecipeDetail(recipe);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setRecipeDetail(null);
  };

  const addOtherConsumption = (consumption) => {
    handleClose();
    addUserProgramDietConsumption(props.userProgramId, consumption).then(
      (res) => {
        res.recipe = consumption.recipe;
        dispatch(crudAction.success(ADD_USER_PROGRAM_DIET_CONSUMPTION, res));
      }
    );
  };

  if (diets) {
    if (Object.keys(diets).length > 0) {
      return (
        <Box m={1}>
          <Typography variant="h6">Diet Tracker</Typography>
          {Object.keys(diets).map((timing, index) => (
            <DietTimeList
              key={index}
              timing={timing}
              diet={diets[timing]}
              consumption={consumption}
              handleConsumptionClick={handleConsumptionClick}
              handleOtherClick={handleOtherAdd}
              handleOpenDetail={handleOpenDetail}
            />
          ))}
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AddOtherDish
              handleClose={handleClose}
              mealTiming={otherMealTiming}
              handleAdd={addOtherConsumption}
            />
          </Dialog>
          <Dialog
            fullScreen
            open={openDetail}
            onClose={handleCloseDetail}
            TransitionComponent={Transition}
          >
            <RecipeDetail
              handleClose={handleCloseDetail}
              recipe={recipeDetail}
            />
          </Dialog>
        </Box>
      );
    }
  }

  return <></>;
}

DietTracker.propTypes = {
  userProgramId: PropTypes.number.isRequired,
};
