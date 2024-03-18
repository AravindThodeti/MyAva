import React from "react";
import styles from "./NutrientValueBar.module.scss";
import LinearProgress from "../../components/linearProgress";
import { string, number } from "prop-types";

const propTypes = {
  /** name of the nutrient */
  nutrientName: string,
  /** consumed amount for the nutrient */
  consumed: number,
  /** nutrient available out of */
  prescribedValue: number,
  /** nutrient value unit */
  unit: string,
  /** width of the bar */
  width: string,
  /** padding for the bar */
  padding: string,
  /** text colors */
  textColor: string,
};

export const nutrientColors = {
  Red: "#FF002E",
  Green: "#31F3B8",
  Yellow: "#FFA439",
};

export const getProgressColor = (consumed, prescribedValue, nutrientColors) => {
  const progress = consumed / prescribedValue;
  if (progress <= 0.8) {
    return nutrientColors.Green;
  } else if (progress > 0.8 && progress <= 1) {
    return nutrientColors.Yellow;
  } else {
    return nutrientColors.Red;
  }
};

const NutrientValueBar = ({
  nutrientName,
  consumed,
  prescribedValue,
  unit,
  width,
  padding,
  textColor,
}) => {
  const nutrientPercentage = (consumed / prescribedValue) * 100;
  return (
    <div style={{ padding: padding }} className={styles.nutrientInfo}>
      <span style={{ color: textColor }} className={styles.nutrientName}>
        {nutrientName}
      </span>
      <LinearProgress
        progress={nutrientPercentage}
        progressBarWidth={width}
        progressBarHeight={"4px"}
        progressBackGroundColor={"#C4C4C4"}
        progressColor={getProgressColor(
          consumed,
          prescribedValue,
          nutrientColors
        )}
      />
      <span style={{ color: textColor }} className={styles.nutrientValue}>
        {`${consumed}/${prescribedValue}
        ${unit}`}
      </span>
    </div>
  );
};
NutrientValueBar.propTypes = propTypes;
NutrientValueBar.defaultProps = {
  width: "80px",
  padding: "0px",
};
export default NutrientValueBar;
