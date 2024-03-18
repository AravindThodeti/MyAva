import React from "react";
import styles from "./DishCard.module.scss";
import { string, array, bool, number, func } from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { generateUuid } from "@/utils/UuidUtills";
import { useRouter } from "next/router";
import { deleteDish } from "../../store/actions/dietTracker.action";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { getUserDietPlan, trackUserDiet } from "@/utils/ApiUtils";
import { modifyDietPlanData } from "@/utils/Utility";
import { useState } from "react";
import CustomizedSnackbar from "@/components/snackBar";

const propTypes = {
  /** Image url for the dish icon */
  dishImageUrl: string,
  /** Name of the dish */
  dishName: string,
  /** prescribed quantity of the dish */
  quantity: string,
  /** measurement unit of dish */
  measurementUnit: string,
  /** target disease list */
  goodFor: array,
  /** boolean to check if actions are disabled */
  areActionsDisabled: bool,
  /** id of the dish */
  dishId: number,
  /** time of the meal */
  mealTime: string,
  /** set error message  */
  setErrorMessageVisible: func,
  /** delete dish from plan */
  deleteDish: func,
};
export const DIET_TYPE = {
  VEG: "VEG",
  NON_VEG: "NON_VEG",
};

const GOOD_FOR_ITEMS_IN_DISH = 3;

const DishGoodFor = ({ image_url, name }) => {
  return (
    <figure className={styles.figure}>
      <img src={image_url} alt={name} />
      <figcaption className={styles.figCaption}>{name}</figcaption>
    </figure>
  );
};

DishGoodFor.propTypes = { image_url: string, name: string };

const DishCard = ({
  dishImageUrl,
  dishName,
  quantity,
  goodFor,
  areActionsDisabled,
  dishId,
  mealTime,
  setErrorMessageVisible,
  deleteDish,
  measurementUnit,
  is_custom,
  isTracked,
  dietTime,
  setDietPlan,
}) => {
  const router = useRouter();
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const { current_date, session_list } = useSelector(
    (state) => state.dietTrackerReducer.dietPlan
  );
  const handleClickReplaceDish = (mealTime) => () => {
    if (!areActionsDisabled) {
      router.push(
        `/user/diet-tracker/${current_date.split("T")[0]}/${mealTime}/edit-dish`
      );
    } else {
      setErrorMessageVisible(true);
    }
  };
  const handleClickDeleteDish = (mealTime, dishId) => async () => {
    try {
      if (!areActionsDisabled) {
        alert("Deleted dish successfully !");

        deleteDish(mealTime, dishId);
        const { session_id, user_recipe_details } = session_list.find(
          (session) => session.meal_timing === dietTime
        );
        const sessionData = {
          diet_plan_date: current_date.split("T")[0],
          session_id: session_id,
          recipe_details: user_recipe_details,
        };
        await trackUserDiet(sessionData);
        const data = await getUserDietPlan(current_date, DIET_TYPE.VEG);
        modifyDietPlanData(data);
        setDietPlan(data);
        // setSnackBarOpen(true);
      } else {
        setErrorMessageVisible(true);
      }
    } catch {}
  };
  const handleClickRecipe = (id, dishName) => () => {
    const DishName = dishName
      .replace(/ /g, "")
      .replace(/,/g, "")
      .replace(/'/g, "")
      .replace(/-/g, "")
      .replace(/%/g, "Percent");
    router.push(`/recipe/${id}/${DishName}`);
  };

  return (
    <>
      {/* <CustomizedSnackbar
        open={isSnackBarOpen}
        message={"Deleted dish successfully"}
        setOpen={setSnackBarOpen}
      /> */}

      <div className={styles.dishContainer}>
        <div className={styles.dish}>
          <div className={styles.dishImageContainer}>
            <img
              src={
                dishImageUrl ||
                "/assets/images/dietTracker/defaultDishImage.svg"
              }
              alt={dishName}
            />
          </div>
          <div className={styles.dishDetails}>
            <div className={styles.dishNameAndQuantity}>
              <span className={styles.dishName}>{dishName}</span>
              <span className={styles.dishQuantity}>
                : {quantity}
                <span
                  className={styles.measurementUnit}
                >{` ${measurementUnit}`}</span>
              </span>
            </div>
            <span className={styles.goodForText}>Good For</span>
            <div className={styles.diseasesList}>
              {goodFor &&
                goodFor
                  .slice(0, GOOD_FOR_ITEMS_IN_DISH)
                  .map(({ image_url, name }, index) => (
                    <>
                      {" "}
                      <DishGoodFor
                        key={generateUuid()}
                        image_url={image_url}
                        name={name}
                      />
                      {index < GOOD_FOR_ITEMS_IN_DISH - 1 &&
                        index !== goodFor.length - 1 && (
                          <div className={styles.verticalDivider}></div>
                        )}
                    </>
                  ))}
            </div>
          </div>
        </div>
        <div className={styles.actionItemsContainer}>
          <IconButton
            onClick={handleClickRecipe(dishId, dishName)}
            style={{ padding: "0px" }}
            aria-label="recipe"
            disabled={is_custom == true ? true : false}
          >
            <img
              src={`/assets/images/dietTracker/${
                is_custom == true ? "disabledChefIcon.svg" : "chefIcon.svg"
              }`}
              alt="recipe"
            />
          </IconButton>
          <IconButton
            onClick={handleClickDeleteDish(mealTime, dishId)}
            style={{ padding: "0px" }}
            aria-label="delete meal"
          >
            <img src="/assets/images/dietTracker/deleteIcon.svg" alt="delete" />
          </IconButton>
        </div>
      </div>
    </>
  );
};
DishCard.propTypes = propTypes;
export default connect(null, { deleteDish })(DishCard);
