import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import * as constant from "@/constants/index";
import {
  getInitiateConsultation,
  capturePayment,
} from "@/store/actions/api.action";
import * as paymentAction from "@/store/actions/payment.action";
import * as crudAction from "@ava/common/lib/store/actions/crud.action";
import { FETCH_USER_PROGRAMS_SUCCESS } from "@/store/actionTypes";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { loadExternalScript } from "@/utils/Utility";
import { number } from "prop-types";

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
const propTypes = {
  id: number,
};
const ConsultationPayment = ({ id }) => {
  const classes = useStyles();
  const initConsultation = useSelector(
    (state) => state.initConsultationReducer.initConsultation
  );
  const currentUser = useSelector((state) => state.profileReducer.profile);
  const payment = useSelector((state) => state.paymentReducer.res);
  const paymentError = useSelector((state) => state.paymentReducer.error);
  const paymentCapturing = useSelector((state) => state.paymentReducer.loading);
  const [externalScriptLoaded, setExternalScriptLoaded] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (id !== undefined) {
      dispatch(paymentAction.success(null));
      if (
        initConsultation === undefined ||
        (initConsultation !== null && initConsultation.id != id)
      ) {
        dispatch(getInitiateConsultation(id));
      }
    }
  }, [id]);

  React.useEffect(() => {
    if (
      initConsultation &&
      initConsultation.user_program_id &&
      initConsultation.payment_status == constant.PAYMENT_STATUS.CAPTURED
    ) {
      dispatch(
        crudAction.success(FETCH_USER_PROGRAMS_SUCCESS, { data: undefined })
      );
    }
  }, [initConsultation]);

  React.useEffect(() => {
    if (window && !window.Razorpay) {
      loadExternalScript(constant.RAZORPAY_SCRIPT_URL).then(() => {
        setExternalScriptLoaded(true);
      });
    }
  }, [externalScriptLoaded]);

  React.useEffect(() => {
    if (payment && initConsultation) {
      if (initConsultation.user_program_id) {
        Router.replace(constant.URL_MY_PROGRAMS);
      } else {
        Router.replace(constant.URL_CONSULTATION_LIST);
        Router.push(
          constant.URL_CONSULTATION_CHAT_FORMAT,
          constant.URL_CONSULTATION_CHAT(payment.id)
        );
      }
    }
    if (
      initConsultation &&
      initConsultation.payment_status == constant.PAYMENT_STATUS.CAPTURED
    ) {
      if (initConsultation.user_program_id) {
        Router.replace(constant.URL_MY_PROGRAMS);
      } else {
        Router.replace(constant.URL_CONSULTATION_LIST);
      }
    }
  }, [payment, initConsultation]);

  if (initConsultation && initConsultation.id == id && window.Razorpay) {
    let options = {
      key: constant.RAZORPAY_API_KEY,
      amount: "" + initConsultation.price * 100,
      currency: "INR",
      name: "AVA",
      description: "Consultation #" + id,
      order_id: initConsultation.payment_gateway_order_id,
      handler: function (response) {
        dispatch(capturePayment(id, response.razorpay_payment_id));
      },
      prefill: {
        name: currentUser.name,
        email: currentUser.user.email,
        contact: initConsultation.customer.mobile,
      },
      notes: {
        order_type: "consultation",
      },
      modal: {
        ondismiss: function () {
          Router.back();
        },
      },
    };
    const rzp = new Razorpay(options);
    const draft =
      initConsultation.payment_status == constant.PAYMENT_STATUS.DRAFT;
    if (payment) {
      return <CenterCircularProgress />;
    }
    if (initConsultation.payment_status == constant.PAYMENT_STATUS.CAPTURED) {
      return <CenterCircularProgress />;
    }
    const paymentButton = (
      <Container className={classes.container}>
        <Typography>Hi, I&apos;m Ava</Typography>
        <Box mt={2}>
          <Typography>
            Please pay the consultation charges for the doctor
          </Typography>
        </Box>
        <Box className={classes.paymentBox}>
          <Box className={classes.paymentTextWrap}>
            <Typography variant="h6">Pay &nbsp;</Typography>
            <Typography variant="h5">₹{initConsultation.price}</Typography>
          </Box>
          <Typography
            align="center"
            disabled={!draft}
            onClick={() => rzp.open()}
          >
            Click to pay
          </Typography>
        </Box>
      </Container>
    );
    if (paymentCapturing) {
      return <CenterCircularProgress />;
    } else if (paymentError) {
      return (
        <div>
          {paymentButton}
          <Typography variant="h4" component="h4">
            {paymentError.message}
          </Typography>
        </div>
      );
    }
    return paymentButton;
  }
  return <CenterCircularProgress />;
};
ConsultationPayment.propTypes = propTypes;
export default ConsultationPayment;
