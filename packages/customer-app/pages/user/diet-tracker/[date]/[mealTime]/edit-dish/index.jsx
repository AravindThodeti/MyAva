import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import styles from "./EditDish.module.scss";
import DishListItem from "@/components/dishListItem";
import { generateUuid } from "@/utils/UuidUtills";
import AsynchronousSearchInput from "../../../../../../modules/asynchronousSearchInput";
import { useRouter } from "next/router";
import { DIET_TIME_MAP } from "../../..";
import {
  changeDishQuantity,
  addDishToMeal,
  deleteDish,
} from "../../../../../../store/actions/dietTracker.action";
import { connect } from "react-redux";
import { func } from "prop-types";
import { trackUserDiet } from "@/utils/ApiUtils";
import CustomizedSnackbar from "@/components/snackBar";
import { getUserDietPlan } from "@/utils/ApiUtils";
import { setDietPlan } from "@/store/actions/dietTracker.action";
import Loader from "@/components/loader";
import { DIET_TYPE } from "../../..";
import {
  capitalizeFirstLetterAndLowerCaseRest,
  modifyDietPlanData,
} from "@/utils/Utility";
import ConfirmationDialogue from "@/components/confirmationDialogue";
import IconButton from "@material-ui/core/IconButton";
import { AddCustomDishForm } from "@/components/addCustomDish";

const EditDishes = ({
  changeDishQuantity,
  addDishToMeal,
  deleteDish,
  setDietPlan,
}) => {
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isPopUpButtonClicked = useRef(false);
  const [notFoundContent, setNotFoundContent] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [addNewRecipe, setAddNewRecipe] = useState(false);
  const [addmeal, setAddmeal] = useState({});
  const [dishNotAvailable, setDishNotAvailable] = useState(false);

  const handleClickDialogueOpen = () => {
    setDialogueOpen(true);
  };

  const handleDialogueClose = () => {
    setDialogueOpen(false);
  };
  const router = useRouter();
  const { mealTime, date } = router.query;
  const sessionList = useSelector(
    (state) => state.dietTrackerReducer.dietPlan.session_list
  );
  const mealDishes =
    sessionList &&
    sessionList.find((session) => session.meal_timing === mealTime)
      .user_recipe_details;

  const getUserDietPlanFromDb = useCallback(
    async (date, dietType) => {
      try {
        const data = await getUserDietPlan(date, dietType);
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
      }
    },
    [getUserDietPlan]
  );
  useEffect(() => {
    if (searchTitle.includes("Didn't find your dish")) {
      setDishNotAvailable(true);
    }
  }, [searchTitle]);

  useEffect(() => {
    if (selectedRecipe) {
      const currentRecipe = mealDishes.find(
        (recipe) => recipe.name === selectedRecipe.name
      );
      if (!currentRecipe) {
        addDishToMeal(mealTime, {
          name: selectedRecipe.name,
          quantity: 1,
          good_for: selectedRecipe.good_for,
          measurement_unit: selectedRecipe.measurement_unit,
          image_url: selectedRecipe.image_url,
          id: selectedRecipe.id,
        });
      }
    }
  }, [selectedRecipe]);

  useEffect(() => {
    if (!sessionList && date) {
      getUserDietPlanFromDb(date, DIET_TYPE.VEG);
    }
  }, [date]);

  const modifyDishQuantity = (dishId, quantity) => {
    if (quantity > 0) {
      changeDishQuantity(mealTime, dishId, quantity);
    } else {
      deleteDish(mealTime, dishId);
    }
  };

  const handleClickAdd = async () => {
    try {
      isPopUpButtonClicked.current = true;
      setIsSubmitting(true);
      const { session_id, user_recipe_details } = sessionList.find(
        (session) => session.meal_timing === mealTime
      );
      const sessionData = {
        diet_plan_date: date,
        session_id: session_id,
        recipe_details: user_recipe_details,
      };
      await trackUserDiet(sessionData);
      router.push(`/user/diet-tracker?dietDate=${date}`, undefined, {
        scroll: false,
      });
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
  };

  useEffect(() => {
    if (!isPopUpButtonClicked.current) {
      router.beforePopState(({ as }) => {
        if (as !== router.asPath) {
          handleClickDialogueOpen();
          return false;
        }
        return true;
      });
    }
    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  let recipeNotAvailable = searchTitle?.replace("Didn't find your dish ", "");
  return (
    <>
      <ConfirmationDialogue
        open={dialogueOpen}
        handleClose={handleDialogueClose}
        rightFunction={handleClickAdd}
        leftFunction={() => {
          isPopUpButtonClicked.current = true;
          router.push(`/user/diet-tracker?dietDate=${date}`, undefined, {
            scroll: false,
          });
        }}
        message ="Your unsaved changes will be lost, Save changes before closing ?"
        alert = "Save changes ? "
        leftButton="close anyway"
        rightButton="save"
      />
      <CustomizedSnackbar
        open={isSnackBarOpen}
        message={errorMessage}
        setOpen={setSnackBarOpen}
      />

      <div className={styles.editDishPage}>
        <div className={styles.searchSection}>
          <div className={styles.editDishHeading}>
            <IconButton
              onClick={handleClickDialogueOpen}
              aria-label="delete"
              style={{ padding: "5px" }}
            >
              <img
                src="/assets/images/dietTracker/leftArrowIcon.svg"
                alt="left arrow"
              />
            </IconButton>
            <h1 className={styles.editDishText}>
              Edit {DIET_TIME_MAP[mealTime]}
            </h1>
          </div>
          {addNewRecipe || dishNotAvailable ? (
            <AddCustomDishForm
              addNewRecipe={addNewRecipe}
              setAddNewRecipe={setAddNewRecipe}
              setNotFoundContent={setNotFoundContent}
              notFoundContent={notFoundContent}
              addmeal={addmeal}
              setAddmeal={setAddmeal}
              setDishNotAvailable={setDishNotAvailable}
            />
          ) : (
            <div className={styles.searchBoxContainer}>
              <AsynchronousSearchInput
                selectedRecipe={selectedRecipe}
                setSelectedRecipe={setSelectedRecipe}
                setNotFoundContent={setNotFoundContent}
                setSearchTitle={setSearchTitle}
                addmeal={addmeal}
                setAddmeal={setAddmeal}
              />
              {/* {notFoundContent === true ? (
                <div
                  style={{
                    textAlign: "center",
                  }}
                  className="recipeHide"
                >
                  <div
                    style={{
                      background: " #FFFFFF",
                      border: " 0.5px solid #202124",
                      boxShadow: "0px 4px 12px 2px rgba(32, 33, 36, 0.12)",
                      borderRadius: "4px",
                      margin: "10px 0 87px",
                    }}
                  >
                    <img
                      src="/assets/images/searchRecipeImg.png"
                      alt="searchRecipeImg"
                    />
                    <h5>No result found for {recipeNotAvailable} </h5>
                    <p>
                      You can go ahead and create your own food and we will add
                      it to our database
                    </p>
                    <button
                      className={styles.addNewDishButton}
                      onClick={() => {
                        setAddNewRecipe(true);
                      }}
                    >
                      Add New Dish
                    </button>
                  </div>
                  <img
                    src="/assets/images/recipeNotFound.png"
                    alt="recipeNotFound"
                  />
                </div>
              ) : */}
              {sessionList ? (
                <div className={styles.dishSection}>
                  {mealDishes &&
                    mealDishes.map(
                      ({ name, quantity, id, measurement_unit }) => (
                        <DishListItem
                          key={generateUuid()}
                          dishId={id}
                          dishName={name}
                          modifyDishQuantity={modifyDishQuantity}
                          quantity={quantity}
                          unit={capitalizeFirstLetterAndLowerCaseRest(
                            measurement_unit
                          )}
                        />
                      )
                    )}
                  <div className={styles.trackButtonContainer}>
                    <Button
                      onClick={handleClickAdd}
                      style={{
                        background:
                          "linear-gradient(302.57deg, #8B2B61 0%, #CD3C5D 100%)",
                        width: "140px",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "14px",
                        fontFamily: "Lato, sans-serif",
                        textTransform: "none",
                        height: "40px",
                        borderRadius: "24px",
                        position: "absolute",
                        bottom: "10px",
                      }}
                    >
                      {isSubmitting ? (
                        <Loader color="#FFFFFF" size={20} />
                      ) : (
                        "Track"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <Loader />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

EditDishes.propTypes = {
  addDishToMeal: func,
  changeDishQuantity: func,
  deleteDish: func,
  setDietPlan: func,
};
export default connect(null, {
  changeDishQuantity,
  addDishToMeal,
  deleteDish,
  setDietPlan,
})(EditDishes);
{
}
