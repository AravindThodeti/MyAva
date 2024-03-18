import React, { useState } from "react";
import styles from "./DietCard.module.scss";
import DishCard from "@/components/dishCard";
import { array, string, number, bool, func } from "prop-types";
import { generateUuid } from "@/utils/UuidUtills";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { DIET_TIME_MAP } from "../../pages/user/diet-tracker";
import { setTackStatusForMeal } from "../../store/actions/dietTracker.action";
import { capitalizeFirstLetterAndLowerCaseRest } from "../../utils/Utility";
import { trackUserDiet } from "@/utils/ApiUtils";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import CustomizedSnackbar from "@/components/snackBar";
import Loader from "@/components/loader";
import { getUserDietPlan } from "@/utils/ApiUtils";
import { modifyDietPlanData } from "@/utils/Utility";
import { DIET_TYPE } from "../../pages/user/diet-tracker";
import { setDietPlan } from "@/actions/dietTracker.action";

const propTypes = {
  /** diet time */
  dietTime: string,
  /** dishes for the diet */
  dishDetails: array,
  /** calories for the diet */
  kCalValue: number,
  /** boolean to denote if meal is already tracked */
  isTracked: bool,
  /** function to change the track status for meal locally */
  setTackStatusForMeal: func,
  /** action to update the diet plan */
  setDietPlan: func,
  /** boolean to denote if user has diet plan */
  hasDietPlan: bool,
  /** toggle date scroll func */
  setDateScroll: func,
};

const DietCard = ({
  dietTime,
  dishDetails,
  kCalValue,
  isTracked,
  setTackStatusForMeal,
  setDietPlan,
  hasDietPlan,
}) => {
  const router = useRouter();
  const [isErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const { current_date, session_list } = useSelector(
    (state) => state.dietTrackerReducer.dietPlan
  );
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickAddDishWhenNoDietPlan = () => {
    router.push(
      "/user/diet-tracker" +
        "/" +
        current_date.split("T")[0] +
        "/" +
        dietTime +
        "/edit-dish"
    );
  };
  const handleClickTrack = async () => {
    if (isTracked) {
      setTackStatusForMeal(dietTime, !isTracked);
    } else {
      try {
        setIsSubmitting(true);
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
      } catch (err) {
        setSnackBarOpen(true);
        let errorMessage = "";
        if (err.message) {
          errorMessage = err.message;
        } else {
          errorMessage = "Something went wrong! Please try again.";
        }
        setErrorMessage(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.dietSection}>
      <CustomizedSnackbar
        open={isSnackBarOpen}
        message={errorMessage}
        setOpen={setSnackBarOpen}
      />
      <div className={styles.mealTimeSection}>
        <h1 className={styles.dietTimeText}>
          {DIET_TIME_MAP[dietTime] || dietTime}
        </h1>
        <span className={styles.kCal}>Calories : {kCalValue} Cal</span>
      </div>

      {dishDetails && (
        <div className={styles.dishSection}>
          {dishDetails.map(
            ({
              id,
              name,
              measurement_unit,
              quantity,
              image_url,
              good_for,
              is_custom,
            }) => (
              <DishCard
                key={generateUuid()}
                dishImageUrl={image_url}
                dishName={name}
                quantity={quantity}
                measurementUnit={capitalizeFirstLetterAndLowerCaseRest(
                  measurement_unit
                )}
                goodFor={good_for}
                mealTime={dietTime}
                dishId={id}
                is_custom={is_custom}
                isTracked={isTracked}
                dietTime={dietTime}
                setDietPlan={setDietPlan}
                setTackStatusForMeal={setTackStatusForMeal}
                setErrorMessageVisible={setErrorMessageVisible}
              />
            )
          )}
          <div className={styles.findAlternate}></div>
        </div>
      )}
      {hasDietPlan && (
        <div className={styles.dietTrackerButtonContainer}>
          <Button
            onClick={handleClickTrack}
            disabled={isTracked}
            style={{
              background: `${
                isTracked
                  ? " #A4A4A4"
                  : "linear-gradient(302.57deg, #8B2B61 0%, #CD3C5D 100%)"
              }`,
              width: "120px",
              height: "33px",
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
              fontFamily: "Lato, sans-serif",
              textTransform: "none",
              borderRadius: "17px",
            }}
          >
            {isTracked ? "Tracked" : "Track"}
          </Button>
          <Button
            onClick={handleClickAddDishWhenNoDietPlan}
            style={{
              background:
                "linear-gradient(302.57deg, #8B2B61 0%, #CD3C5D 100%)",
              width: "120px",
              height: "34px",
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
              fontFamily: "Lato, sans-serif",
              textTransform: "none",
              borderRadius: "17px",
            }}
          >
            Add meal
          </Button>
        </div>
      )}
      {!hasDietPlan && (
        <div className={styles.dietTrackerButtonContainer}>
          <Button
            onClick={handleClickAddDishWhenNoDietPlan}
            style={{
              background:
                "linear-gradient(302.57deg, #8B2B61 0%, #CD3C5D 100%)",
              width: "100%",
              height: "34px",
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
              fontFamily: "Lato, sans-serif",
              textTransform: "none",
              borderRadius: "17px",
            }}
          >
            Add meal
          </Button>
        </div>
      )}
    </div>
  );
};
DietCard.propTypes = propTypes;
export default connect(null, { setTackStatusForMeal, setDietPlan })(DietCard);
