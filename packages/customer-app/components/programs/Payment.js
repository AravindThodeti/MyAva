import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import * as constant from "@/constants/index";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { getInitiatePlanPurchase } from "@/actions/api.action";
import { capturePlanPayment } from "@/utils/ApiUtils";
import { reset } from "@/actions/planPurchase.action";
import { success } from "@ava/common/lib/store/actions/crud.action";
import { ADD_USER_PROGRAM } from "@/store/actionTypes";
import { loadExternalScript } from "@/utils/Utility";
import { number } from "prop-types";

const propTypes = {
  id: number,
};
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paymentBox: {
    borderRadius: 10,
    background: "#F1EEEE",
    display: "flex",
    flexDirection: "column",
    width: "50%",
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  paymentTextWrap: {
    color: "#032986",
    display: "flex",
    justifyContent: "center",
  },
}));

const Payment = ({ id }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [externalScriptLoaded, setExternalScriptLoaded] = React.useState(false);
  const currentUser = useSelector((state) => state.profileReducer.profile);
  const planPurchase = useSelector(
    (state) => state.planPurchaseReducer.planPurchase
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (id !== undefined) {
      if (
        planPurchase === undefined ||
        planPurchase === null ||
        planPurchase.id != id
      ) {
        dispatch(getInitiatePlanPurchase(id));
      }
    }
  }, [id]);

  React.useEffect(() => {
    if (window && !window.Razorpay) {
      loadExternalScript(constant.RAZORPAY_SCRIPT_URL).then(() => {
        setExternalScriptLoaded(true);
      });
    }
  }, [externalScriptLoaded]);

  const capturePayment = (id, paymentId) => {
    setLoading(true);
    capturePlanPayment(id, paymentId).then((res) => {
      dispatch(reset());
      dispatch(success(ADD_USER_PROGRAM, res));

      Router.replace(constant.URL_PAY_SUCCESS).finally(() => {
        setLoading(false);
      });

      // Router.replace(constant.URL_MY_PROGRAMS).finally(() => {
      //   setLoading(false);
      // });
    });
  };

  if (planPurchase && planPurchase.id == id && window.Razorpay) {
    let options = {
      key: constant.RAZORPAY_API_KEY,
      amount: "" + planPurchase.price * 100,
      currency: "INR",
      name: "AVA",
      description: "Program #" + id,
      order_id: planPurchase.payment_gateway_order_id,
      handler: function (response) {
        capturePayment(id, response.razorpay_payment_id);
      },
      prefill: {
        name: currentUser.name,
        email: currentUser.user.email,
        contact: planPurchase.customer.mobile,
      },
      notes: {
        order_type: "program",
      },
      modal: {
        ondismiss: function () {
          Router.back();
        },
      },
    };
    const rzp = new Razorpay(options);
    const draft = planPurchase.payment_status == "DRAFT";
    if (!draft) {
      // Router.replace(constant.URL_MY_PROGRAMS);
      router.replace(constant.URL_PAY_SUCCESS);
      return <CenterCircularProgress />;
    }

    const paymentButton = (
      <Container className={classes.container}>
        <Typography>Hi, I&apos;m Ava</Typography>
        <Box mt={2}>
          <Typography>Please pay the program charges</Typography>
        </Box>
        <Box className={classes.paymentBox}>
          <Box className={classes.paymentTextWrap}>
            <Typography variant="h6">Pay &nbsp;</Typography>
            <Typography variant="h5">₹{planPurchase.price}</Typography>
          </Box>
          <Typography
            align="center"
            disabled={!draft || loading}
            onClick={() => rzp.open()}
          >
            Click to pay
          </Typography>
        </Box>
      </Container>
    );
    return paymentButton;
  }
  return <CenterCircularProgress />;
};
Payment.propTypes = propTypes;
export default Payment;
