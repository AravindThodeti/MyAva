import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import * as constant from "@/constants/index";
import { getInitiatePlanPurchase } from "@/actions/api.action";
import { capturePlanPayment } from "@/utils/ApiUtils";
import { reset } from "@/actions/planPurchase.action";
import { success } from "@ava/common/lib/store/actions/crud.action";
import { ADD_USER_PROGRAM } from "@/store/actionTypes";
import { loadExternalScript } from "@/utils/Utility";
import router from "next/router";
import { useEffect } from "react";
import { SubscriptionsOutlined } from "@material-ui/icons";

export default function usePlanPayment() {
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.profileReducer.profile);
  const dispatch = useDispatch();
  const [redirectValue, setRedirectValue] = useState(true);

  const capturePayment = (id, paymentId) => {
    setLoading(true);
    capturePlanPayment(id, paymentId).then((res) => {
      dispatch(reset());
      dispatch(success(ADD_USER_PROGRAM, res));
      Router.replace(constant.URL_PAY_SUCCESS).finally(() => {
        setLoading(false);
      });
    });
  };

  function openRazorpay(planPurchase) {
    planPurchase.then((res) => {
      let options = {
        key: constant.RAZORPAY_API_KEY,
        amount: "" + res.price * 100,
        currency: "INR",
        name: "AVA",
        description: "Program #" + res.id,
        order_id: res.payment_gateway_order_id,
        handler: function (response) {
          capturePayment(res.id, response.razorpay_payment_id);
        },
        prefill: {
          name: currentUser?.name,
          email: currentUser?.user.email,
          contact: planPurchase.customer ? planPurchase.customer.mobile : "",
        },
        // redirect: true,
        // callback_url:
        //   window.location.origin +
        //   `/programs/payment-result/${res.payment_gateway_order_id}`,
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
      const draft = res.payment_status === "DRAFT";
      if (!draft) {
        router.push(constant.URL_PAY_SUCCESS);
      } else {
        rzp.open();
      }
    });
  }

  function handleClick(id) {
    const planPurchaseRes = dispatch(getInitiatePlanPurchase(id));
    if (window && !window.Razorpay) {
      loadExternalScript(constant.RAZORPAY_SCRIPT_URL).then(() => {
        console.log("external script loaded");
        openRazorpay(planPurchaseRes);
      });
    } else {
      openRazorpay(planPurchaseRes);
    }
  }

  return {
    loading,
    handleClick,
  };
}
