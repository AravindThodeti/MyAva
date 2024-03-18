import React from "react";
import styles from "./CalorieCard.module.scss";
import NutrientValueBar from "../nutrientValueBar";
import GoodForItem from "../goodForItem";
import { generateUuid } from "@/utils/UuidUtills";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { number, string, array } from "prop-types";

const propTypes = {
  /** calories consumed */
  consumed: number,
  /** calories prescribed */
  prescribed: number,
  /** nutrient name */
  nutrientName: string,
  /** measurement unit */
  measurementUnit: string,
  /** good food counts */
  goodFoodCounts: array,
};

const CalorieCard = ({
  consumed,
  prescribed,
  nutrientName,
  measurementUnit,
  goodFoodCounts,
}) => {
  const router = useRouter();

  const handleClickTrackNow = () => {
    router.push("/user/diet-tracker");
  };

  return (
    <div className={styles.calorieCard}>
      <h1 className={styles.heading}>Diet Tracker</h1>
      <div className={styles.calorieConsumed}>
        <span className={styles.cardText}>Calories consumed</span>
        <div className={styles.trackerBox}>
          <NutrientValueBar
            nutrientName={nutrientName}
            consumed={consumed}
            prescribedValue={prescribed}
            textColor="black"
            unit={measurementUnit}
            padding="10px"
          />
        </div>
      </div>
      <div className={styles.summarySection}>
        <div className={styles.summaryHeading}>
          <h1>Good Food count for today:</h1>
        </div>
        <div className={styles.goodForItems}>
          {goodFoodCounts.map((value) => (
            <GoodForItem
              key={generateUuid()}
              noOfItems={value.count}
              imageUrl={value.image_url}
              diseaseName={value.name}
              textColor="black"
            />
          ))}
        </div>
      </div>
      <div className={styles.dietTrackerButtonContainer}>
        <Button
          style={{
            fontSize: "14px",
            backgroundColor: "#C93B5D",
            width: "93px",
            height: "30px",
            borderRadius: "40px",
            color: "white",
            textTransform: "none",
            fontWeight: "600",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          }}
          onClick={handleClickTrackNow}
        >
          Track Now
        </Button>
      </div>
    </div>
  );
};
CalorieCard.propTypes = propTypes;
export default CalorieCard;
