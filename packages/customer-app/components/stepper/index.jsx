import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import { number, string, func } from "prop-types";
import { generateUuid } from "../../utils/UuidUtills";
import { localStorageKeys } from "../../constants/healthScore";

const propTypes = {
  /** current active step */
  activeStep: number,
  /** function to handle page change when clicked on icons */
  handlePageChange: func,
};

const STEP_ICONS = [
  {
    active: "/assets/images/healthScore/htModuleIcons/weightingMachine.svg",
    inactive:
      " /assets/images/healthScore/htModuleIcons/greyIcons/weightingMachine.svg",
  },
  {
    active: "/assets/images/healthScore/htModuleIcons/padWithCalender.svg",
    inactive:
      " /assets/images/healthScore/htModuleIcons/greyIcons/padWithCalender.svg",
  },
  {
    active: "/assets/images/healthScore/htModuleIcons/moleculeStructure.svg",
    inactive:
      " /assets/images/healthScore/htModuleIcons/greyIcons/moleculeStructure.svg",
  },
  {
    active: "/assets/images/healthScore/htModuleIcons/apple.svg",
    inactive: " /assets/images/healthScore/htModuleIcons/greyIcons/apple.svg",
  },
  {
    active: "/assets/images/healthScore/htModuleIcons/brain.svg",
    inactive: " /assets/images/healthScore/htModuleIcons/greyIcons/brain.svg",
  },
  {
    active: "/assets/images/healthScore/htModuleIcons/testTube.svg",
    inactive: "/assets/images/healthScore/htModuleIcons/greyIcons/testTube.svg",
  },
];

const StepperIcon = ({ iconUrl }) => {
  return (
    <img
      style={{ width: "33.35px", height: "33.35px" }}
      src={iconUrl}
      alt="step icons"
    />
  );
};
StepperIcon.propTypes = {
  iconUrl: string,
};

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

const QontoStepIcon = (props) => {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
};

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 15,
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#D8D8D8",
    borderRadius: 1,
  },
})(StepConnector);

const ColorlibStepIcon = (props) => {
  const { completed } = props;
  const activeIcons = {
    1: <StepperIcon iconUrl={STEP_ICONS[0].active} />,
    2: <StepperIcon iconUrl={STEP_ICONS[1].active} />,
    3: <StepperIcon iconUrl={STEP_ICONS[2].active} />,
    4: <StepperIcon iconUrl={STEP_ICONS[3].active} />,
    5: <StepperIcon iconUrl={STEP_ICONS[4].active} />,
    6: <StepperIcon iconUrl={STEP_ICONS[5].active} />,
  };
  const inactiveIcons = {
    1: <StepperIcon iconUrl={STEP_ICONS[0].inactive} />,
    2: <StepperIcon iconUrl={STEP_ICONS[1].inactive} />,
    3: <StepperIcon iconUrl={STEP_ICONS[2].inactive} />,
    4: <StepperIcon iconUrl={STEP_ICONS[3].inactive} />,
    5: <StepperIcon iconUrl={STEP_ICONS[4].inactive} />,
    6: <StepperIcon iconUrl={STEP_ICONS[5].inactive} />,
  };

  return (
    <div>
      {completed === true
        ? activeIcons[String(props.icon)]
        : inactiveIcons[String(props.icon)]}
    </div>
  );
};

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const StepperUseStyles = makeStyles(() => ({
  root: {
    backgroundColor: "transparent",
    padding: "0px",
  },
}));

function getSteps() {
  return [0, 1, 2, 3, 4, 5];
}

const CustomizedSteppers = ({ activeStep, handlePageChange }) => {
  const classes = useStyles();
  const stepperClasses = StepperUseStyles();
  const steps = getSteps();
  const handleClickIcon = (label) => () => {
    const savedCurrentStep = localStorage.getItem(localStorageKeys.currentStep);
    const currentStep = savedCurrentStep ? Number(savedCurrentStep) : 0;
    if (label < currentStep) {
      handlePageChange(label);
    }
  };
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className={stepperClasses.root}
      >
        {steps.map((label) => (
          <Step key={generateUuid()}>
            <StepLabel
              onClick={handleClickIcon(label)}
              StepIconComponent={ColorlibStepIcon}
            ></StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
CustomizedSteppers.propTypes = propTypes;
CustomizedSteppers.defaultProps = {
  activeStep: 0,
};
export default CustomizedSteppers;
