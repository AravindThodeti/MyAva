import React from "react";
import styles from "./UnitSelector.module.scss";
import { string, func } from "prop-types";

const propTypes = {
  selectedUnit: string,
  setSelectedUnit: func,
  unit: string,
  activeColor: string,
  inActiveColor: string,
  textColorActive: string,
  textColorInActive: string,
};

const UnitSelector = ({
  selectedUnit,
  setSelectedUnit,
  unit,
  activeColor,
  inActiveColor,
  textColorActive,
  textColorInActive,
}) => {
  const handleClickUnit = () => {
    setSelectedUnit(unit);
  };

  const isActive = selectedUnit === unit;

  return (
    <span
      style={{
        "--active-color": activeColor,
        "--inactive-color": inActiveColor,
        "--text-color-active": textColorActive,
        "--text-color-inactive": textColorInActive,
      }}
      onClick={handleClickUnit}
      className={`${styles.unitSelectorItem} ${isActive && styles.isActive}`}
    >
      {unit}
    </span>
  );
};

UnitSelector.defaultProps = {
  activeColor: "white",
  inActiveColor: "#f9e1e6",
  textColorActive: "black",
  textColorInActive: "black",
};

UnitSelector.propTypes = propTypes;
export default UnitSelector;
