import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getWeightTracker } from "@/actions/api.action";
import { addUserProgramWeight } from "@/utils/ApiUtils";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import WeightItem from "./WeightItem";
import Slide from "@material-ui/core/Slide";
import { ADD_USER_PROGRAM_WEIGHT } from "@/store/actionTypes";
import * as crudAction from "@ava/common/lib/store/actions/crud.action";
import Dialog from "@material-ui/core/Dialog";
import { animateScroll } from "react-scroll";
import AddWeight from "./AddWeight";

const useStyles = makeStyles((theme) => ({
  weightListWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#D8D8D8",
    borderRadius: theme.spacing(1),
  },
  list: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    flexDirection: "row-reverse",
    width: "100%",
  },
  weightButton: {
    borderRadius: theme.spacing(1),
    backgroundColor: "#D40A63",
    fontSize: "0.8rem",
    color: "white",
    paddingTop: 0,
    paddingBottom: 0,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#D40A63",
    },
  },
  lastWeight: {
    fontSize: "0.9rem",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WeightTracker(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const weights = useSelector((state) => state.weightTrackerReducer.weights);
  const userProgramId = useSelector(
    (state) => state.weightTrackerReducer.userProgramId
  );
  const [fetching, setFetching] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (weights === undefined || userProgramId !== props.userProgramId) {
      if (!fetching) {
        dispatch(getWeightTracker(props.userProgramId));
        setFetching(true);
      }
    } else {
      animateScroll.scrollToBottom({
        containerId: "weight-list",
      });
    }
    return () => {
      setFetching(false);
    };
  }, [weights, props.userProgramId]);

  const handleTrackWeightClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (weight) => {
    addUserProgramWeight(props.userProgramId, weight).then((res) => {
      dispatch(crudAction.success(ADD_USER_PROGRAM_WEIGHT, res));
      handleClose();
    });
  };

  if (weights && weights.length > 0) {
    return (
      <Box m={1}>
        <Typography variant="h6">Weight Tracker</Typography>
        <Box mt={1}>
          <Grid container>
            <Grid item xs={7}>
              <Typography
                className={classes.lastWeight}
              >{`Last recorded weight: ${weights[0].weight} Kgs`}</Typography>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <Button
                size="small"
                className={classes.weightButton}
                onClick={handleTrackWeightClick}
              >
                Track Weight
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2} className={classes.weightListWrapper} p={1}>
          <GridList
            className={classes.list}
            cols={5}
            id="weight-list"
            style={weights.length < 5 ? { justifyContent: "center" } : {}}
          >
            {weights.map((item, i) => (
              <GridListTile key={i} style={{ height: "fit-content" }}>
                <WeightItem weight={item.weight} createdAt={item.created_at} />
              </GridListTile>
            ))}
          </GridList>
        </Box>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AddWeight handleClose={handleClose} handleAdd={handleAdd} />
        </Dialog>
      </Box>
    );
  }

  return <></>;
}

WeightTracker.propTypes = {
  userProgramId: PropTypes.number.isRequired,
};
