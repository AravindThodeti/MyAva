import React from "react";
import { Slider } from "@material-ui/core";
import { number, string, func, array } from "prop-types";

const propTypes = {
  /**  min value for the slider */
  // minValue: number,
  /** max value for the slider */
  // maxValue: number,
  /** measurement unit */
  unit: string,
  /**handle change function for the component */
  handleChange: func,
  /** current value for the component */
  value: number,
  /**orientation value for the slider */
  orientation: string,
  /** marks for the slider */
  marks: array,
};

const defaultMarks = [
  {
    value: 100,
    label: "100",
  },
  {
    value: 120,
    label: "120",
  },
  {
    value: 140,
    label: "130",
  },
  {
    value: 160,
    label: "160",
  },
  {
    value: 180,
    label: "180",
  },
  {
    value: 200,
    label: "200",
  },
];

const CircularThumbSlider = ({
  unit,
  handleChange,
  value,
  orientation,
  marks,
}) => {
  const valuetext = (value) => {
    return `${value}${unit}`;
  };

  return (
    <Slider
      step={unit === "ft" ? 0.05 : undefined}
      orientation={orientation}
      aria-labelledby="vertical-slider"
      getAriaValueText={valuetext}
      marks={marks}
      min={marks[0].value}
      max={marks[marks.length - 1].value}
      onChange={handleChange}
      value={value}
    />
  );
};

CircularThumbSlider.propTypes = propTypes;
CircularThumbSlider.defaultProps = {
  marks: defaultMarks,
};
export default CircularThumbSlider;
