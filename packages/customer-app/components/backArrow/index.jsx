import React from "react";
import { func } from "prop-types";
import { Button } from "@material-ui/core";

const propTypes = {
  /** function to handle back functionality */
  handleBackFn: func,
};

const BackArrow = ({ handleBackFn }) => {
  return (
    <Button
      onClick={handleBackFn}
      style={{
        background: "#CB4566",
        color: "#4F4F4F",
        borderRadius: "10px",
        padding: "0px",
        minWidth: "0px",
        width: "35px",
        height: "40px",
      }}
    >
      <img src="/assets/images/healthScore/backArrow.svg" alt="back" />
    </Button>
  );
};

BackArrow.propTypes = propTypes;
export default BackArrow;
