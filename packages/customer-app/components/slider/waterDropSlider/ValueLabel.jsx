import React from "react";
import { object, bool, string } from "prop-types";
import { Tooltip } from "@material-ui/core";

const propTypes = {
  /** children for tooltip */
  children: object,
  /** variable to toggle tooltip visibility */
  open: bool,
  /** current value from the slider */
  value: string,
};

const ValueLabel = ({ children, open, value }) => {
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
};

ValueLabel.propTypes = propTypes;
export default ValueLabel;
