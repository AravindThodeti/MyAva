import React from "react";
import styles from "./Slider.module.scss";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { func, number } from "prop-types";

const propTypes = {
  /** handle change */
  handleChange: func,
  /** value */
  value: number,
};

const valueLabelFormat = (value) => {
  return `${value} Ltr.`;
};

const WaterDropThumbComponent = (props) => {
  return (
    <img
      style={{ boxShadow: "none" }}
      {...props}
      src={"/assets/images/dietTracker/sliderIcon.svg"}
      alt="water drop"
    />
  );
};

const WaterDropSlider = withStyles({
  root: {
    color: "#0287E8",
    height: 4,
    padding: "13px 0",
  },
  thumb: {
    height: 27,
    width: 27,
    background: "none",
    marginTop: -12,
    marginLeft: -13,
  },
  active: {},
  track: {
    height: 4,
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 4,
  },
})(Slider);

const SliderInput = ({ handleChange, value }) => {
  return (
    <div className={styles.reactSlider}>
      <WaterDropSlider
        ThumbComponent={WaterDropThumbComponent}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        getAriaLabel={(index) =>
          index === 0 ? "Minimum amount" : "Maximum amount"
        }
        value={value}
        step={0.5}
        min={0}
        max={5}
      />
    </div>
  );
};
SliderInput.propTypes = propTypes;
export default SliderInput;
