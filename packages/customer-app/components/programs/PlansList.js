import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import * as constant from "@/constants/index";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import { initiatePlanPurchase } from "@/utils/ApiUtils";
import {
  getPlans,
  getProgramDetail,
} from "@ava/common/lib/store/actions/api.action";
import { reset } from "@/actions/planPurchase.action";
import { Box, Divider, Container } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import { object } from "prop-types";

const useStyles = makeStyles((theme) => ({
  programCoverImage: {
    borderTopRightRadius: theme.spacing(1.5),
    borderBottomRightRadius: theme.spacing(1.5),
  },
  programCoverHeading: {
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#595757",
    marginBottom: theme.spacing(1),
  },
  programCoverSubHeading: {
    color: "#979797",
    fontWeight: 500,
    textTransform: "uppercase",
    fontSize: "0.85rem",
  },
  programCoverText: {
    backgroundColor: "#EAECEC",
    borderTopLeftRadius: theme.spacing(1.5),
    borderBottomLeftRadius: theme.spacing(1.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  programSelectionHeading: {
    color: "#89043F",
  },
  price: {
    color: "#89043F",
    fontWeight: 700,
  },
  planName: {
    color: "#89043F",
  },
  radio: {
    padding: 0,
  },
  planDetails: {
    color: "grey",
    fontWeight: 500,
    "& b": {
      color: "#000000",
      fontWeight: 400,
    },
  },
}));

const propTypes = {
  id: object,
};
const PlansList = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.planReducer.programs);
  const programs = useSelector((state) => state.programReducer.programs);
  const [loading, setLoading] = React.useState(false);
  const currentUser = useSelector((state) => state.profileReducer.profile);
  const [planPurchase, setPlanPurchase] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const joinNow = (value) => {
    if (value) {
      setSelectedValue(value);
    } else {
      value = selectedValue;
    }
    if (value) {
      if (!currentUser) {
        Router.push(constant.URL_LOGIN);
      } else {
        setLoading(true);
        initiatePlanPurchase(value)
          .then((res) => {
            setPlanPurchase(res);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    }
  };

  React.useEffect(() => {
    if (id) {
      dispatch(reset());
      if (!programs || !programs[id]) {
        dispatch(getProgramDetail(id));
      }
    }
  }, [id]);

  React.useEffect(() => {
    if (!plans || !plans[id]) {
      dispatch(getPlans(id));
    }
  }, [plans]);

  React.useEffect(() => {
    if (planPurchase) {
      const id = planPurchase.id;
      dispatch(reset());
      Router.push(
        constant.URL_PLAN_PAYMENT_FORMAT,
        constant.URL_PLAN_PAYMENT(id)
      );
    }
  }, [planPurchase]);

  function planRow(plan) {
    return (
      <Grid
        container
        item
        key={plan.id}
        onClick={() => setSelectedValue(plan.id)}
      >
        <Grid item xs={1}>
          <Radio
            className={classes.radio}
            checked={selectedValue == plan.id}
            onChange={handleChange}
            value={plan.id}
            color="primary"
            size="small"
            inputProps={{ "aria-label": plan.id }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.planName} variant="body2">
            {plan.name}
          </Typography>
          {plan.price !== plan.discounted_price && (
            <Typography
              className={classes.price}
              variant="subtitle2"
              style={{ textDecoration: "line-through" }}
            >
              {plan.price}/-
            </Typography>
          )}
          <Typography className={classes.price} variant="subtitle2">
            {plan.discounted_price}/-
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            color="primary"
            size="small"
            onClick={() => joinNow(plan.id)}
            variant="contained"
          >
            Join Now
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.planDetails}>
            {ReactHtmlParser(plan.details)}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mt={2} mb={0.5}>
            <Divider />
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (loading) {
    return <CenterCircularProgress />;
  }

  if (planPurchase) {
    return <CenterCircularProgress />;
  }

  if (plans && plans[id] && programs && programs[id]) {
    const program = programs[id];
    return (
      <>
        <Box ml={1.5} mr={1.5} mb={2} className={classes.programCover}>
          <Grid container justify="center" className={classes.programCoverGrid}>
            <Grid item xs={6} className={classes.programCoverText}>
              <Typography variant="h6" className={classes.programCoverHeading}>
                {program.name}
              </Typography>
              <Typography
                variant="body2"
                className={classes.programCoverSubHeading}
              >
                Win PCOS Naturally
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <img
                className={classes.programCoverImage}
                src={`${constant.STATIC_IMAGE}/conditions/${
                  constant.PROGRAM_IMAGES[program.id]
                }`}
                width="100%"
                height="100%"
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={6}>
            <Box ml={2} mb={0.5}>
              <Typography className={classes.programSelectionHeading}>
                Choose Program
              </Typography>
              <Divider />
            </Box>
          </Grid>
        </Grid>
        <Container>{plans[id].map((plan) => planRow(plan))}</Container>
      </>
    );
  }
  return <CenterCircularProgress />;
};
PlansList.propTypes = propTypes;
export default PlansList;
