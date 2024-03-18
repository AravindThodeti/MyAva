import React, { useState, useEffect, useCallback } from "react";
import { connect, useSelector } from "react-redux";
import styles from "./DietTracker.module.scss";
import { SquareDateItemWithDay } from "../../../components/dateList";
import { generateUuid } from "../../../utils/UuidUtills";
import Slider from "@/components/slider/waterDropSlider";
import { Button } from "@material-ui/core";
import DietCard from "../../../modules/dietCard";
import GoodForItem from "../../../modules/goodForItem";
import NutrientValueBar from "../../../modules/nutrientValueBar";
import ProgramsCarousel from "../../../components/programsCarousel";
import { setDietPlan } from "../../../store/actions/dietTracker.action";
import { func } from "prop-types";
import { extractQueryStringValue } from "@/utils/Utility";
import { getUserDietPlan, submitWaterIntake } from "@/utils/ApiUtils";
import CustomizedSnackbar from "@/components/snackBar";
import Notes from "@/components/notes";
import Loader from "@/components/loader";
import { useRouter } from "next/router";
import {
  checkIfDateIsLessThanOrEqualTo15thJune,
  generateArrayOfRelativeDates,
  formatDate,
  modifyDietPlanData,
} from "@/utils/Utility";
import { PROGRAMS_CAROUSEL_IMAGES } from "../../../constants/programs/programs.metadata";
import IconButton from "@material-ui/core/IconButton";

export const DIET_TIME_MAP = {
  EARLY_MORNING: "Early morning",
  BREAKFAST: "Breakfast",
  MID_MORNING: "Mid morning",
  LUNCH: "Lunch",
  EVENING: "Evening",
  DINNER: "Dinner",
  LATE_DINNER: "Late dinner",
  POST_DINNER: "Post dinner",
};

export const DIET_TYPE = {
  VEG: "VEG",
  NON_VEG: "NON_VEG",
};

function DietTracker({ setDietPlan }) {
  const dietPlan = useSelector((state) => state.dietTrackerReducer.dietPlan);
  const [dateScroll, setDateScroll] = useState(false);
  const router = useRouter();
  const { asPath } = router;

  const [selectedDate, setSelectedDate] = useState("");
  const [waterIntake, setWaterIntake] = useState(0);
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateData, setDateData] = useState("");
  const {
    current_date,
    follow_up_date,
    custom_notes,
    session_list,
    total_good_for_count,
    nutrient_tracking_info,
    water_intake_details,
  } = dietPlan;

  const getUserDietPlanFromDb = useCallback(
    async (date, dietType) => {
      try {
        const data = await getUserDietPlan(date, dietType);
        modifyDietPlanData(data);
        setDietPlan(data);
        setWaterIntake(data.water_intake_details.quantity);
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

  const handleChangeWaterIntake = (event, newValue) => {
    setWaterIntake(newValue);
  };

  useEffect(() => {
    const dates = generateArrayOfRelativeDates(
      new Date().toISOString().split("T")[0],
      4
    );
    console.log("dates",dates)
    setDateData(dates);
  }, []);

  useEffect(() => {
    /** In first render when there is not query string appended useEffect is calling the api two times as
     * router takes a bit of time to update the query string. Need to be optimized.
     */
    const dietDate = extractQueryStringValue(asPath, "dietDate");
    let currentDietDate;
    if (dietDate) {
      currentDietDate = dietDate;
    } else {
      if (
        checkIfDateIsLessThanOrEqualTo15thJune(
          new Date().toISOString().split("T")[0]
        )
      ) {
        {
          currentDietDate = "2022-06-15";
        }
      } else {
        currentDietDate = new Date().toISOString().split("T")[0];
      }
      router.push({
        query: { dietDate: currentDietDate },
      });
    }
    setSelectedDate(currentDietDate);
    getUserDietPlanFromDb(currentDietDate, DIET_TYPE.VEG);
  }, [asPath]);

  useEffect(() => {
    setDateScroll(true);
  }, [selectedDate]);

  const handleClickSubmitWaterIntake = async () => {
    try {
      setIsSubmitting(true);
      await submitWaterIntake({
        track_date: current_date.split("T")[0],
        quantity: waterIntake,
      });
      setSnackBarOpen(true);
      setErrorMessage("Water intake submitted successfully");
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

  return (
    <>
      <CustomizedSnackbar
        open={isSnackBarOpen}
        message={errorMessage}
        setOpen={setSnackBarOpen}
      />
      {dietPlan ? (
        <div className={styles.dietTracker}>
          <div className={styles.pinkBackGround}>
            <div className={styles.backSection}>
              <IconButton
                onClick={() => {
                  router.push("/");
                }}
                aria-label="delete"
                style={{ padding: "5px 5px 5px 10px" }}
              >
                <img
                  src="/assets/images/dietTracker/leftArrowIcon.svg"
                  alt="left arrow"
                />
              </IconButton>
              <h1 className={styles.heading}>Diet Tracker</h1>
            </div>
            <div className={styles.dateSection}>
              {dateData &&
                dateData.map((dateElement, i) => (
                  <SquareDateItemWithDay
                  myClass="dietTrackerClass"
                    key={i}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    date={dateElement.date}
                    day={dateElement.day}
                    fullDate={dateElement.fullDate}
                    dateScroll={dateScroll}
                  />
                ))}
            </div>
            <div className={styles.followUpDateSection}>
              <span className={styles.followUpDateHeading}>
                Follow Up Date:
              </span>
              <span className={styles.followUpDateValue}>
                {formatDate(follow_up_date)}
              </span>
            </div>

            <div className={styles.summarySection}>
              <div className={styles.summaryHeading}>
                <h1>Good Food count:</h1>
              </div>
              <div className={styles.goodForItems}>
                {total_good_for_count.map((value) => (
                  <GoodForItem
                    key={generateUuid()}
                    noOfItems={value.count}
                    imageUrl={value.image_url}
                    diseaseName={value.name}
                  />
                ))}
              </div>
            </div>
            <div className={styles.nutrientsSummary}>
              {nutrient_tracking_info.map((value, index) => {
                /** This is done to insert to empty div after 3rd element to ensure the required UI. */
                if (index === 3) {
                  return (
                    <>
                      <div className={styles.emptyNutrient}></div>
                      <NutrientValueBar
                        key={generateUuid()}
                        nutrientName={value.nutrient_name}
                        consumed={value.consumed_count || 0}
                        prescribedValue={value.total_count}
                        unit={value.nutrient_name == "Calories" ? "" : "gm"}
                        padding={"20px"}
                      />
                    </>
                  );
                }
                return (
                  <NutrientValueBar
                    key={generateUuid()}
                    nutrientName={value.nutrient_name}
                    consumed={value.consumed_count || 0}
                    prescribedValue={value.total_count}
                    unit={value.nutrient_name == "Calories" ? "" : "gm"}
                    padding={"20px"}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.programsSection}>
            <h1>Our Programs</h1>
            <p>Explore : Thyroid , PCOS , Fertility , Diabetes </p>
            <ProgramsCarousel
              activeIndicatorColor={"#CD3C5D"}
              itemsArray={PROGRAMS_CAROUSEL_IMAGES}
            />
          </div>
          <div className={styles.notesSection}>
            <Notes heading="Notes:" noteText={custom_notes} />
          </div>
          <div className={styles.waterIntakeContainer}>
            <div className={styles.waterIntakeSection}>
              <div className={styles.sliderFlex}>
                <div className={styles.heading}>
                  <span className={styles.waterIntakeHeading}>
                    Water Intake
                  </span>
                  <span className={styles.waterIntake}>
                    <span className={styles.waterIntakeValue}>
                      {waterIntake}
                    </span>
                    <span className={styles.waterIntakeUnit}>
                      {water_intake_details.measurement_units}
                    </span>
                  </span>
                </div>
                <Slider
                  value={waterIntake}
                  handleChange={handleChangeWaterIntake}
                />
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  onClick={handleClickSubmitWaterIntake}
                  style={{
                    color: "#CD3C5D",
                    fontWeight: "600",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif",
                    textTransform: "none",
                    height: "33px",
                  }}
                >
                  {isSubmitting ? (
                    <Loader color="#C93B5D" size={20} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </div>
          <h1 className={styles.dietForDayText}>Your Diet For Today</h1>
          <div className={styles.dietContainer}>
            {session_list.map(
              ({
                meal_timing,
                user_recipe_details,
                cal,
                is_tracked,
                hasDietPlan,
              }) => (
                <DietCard
                  hasDietPlan={hasDietPlan}
                  key={generateUuid()}
                  dietTime={meal_timing}
                  dishDetails={user_recipe_details}
                  kCalValue={cal || 0}
                  isTracked={is_tracked}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

DietTracker.propTypes = {
  setDietPlan: func,
};

export default connect(null, { setDietPlan })(DietTracker);
