import React from "react";
import AvaImage from "@/components/v1/Image";
import Button from "@material-ui/core/Button";
import * as constant from "@/constants/index";
import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset } from "@/actions/planPurchase.action";
import { success } from "@ava/common/lib/store/actions/crud.action";
import { fetchPaymentDetails, capturePlanPayment } from "@/utils/ApiUtils";
import { ADD_USER_PROGRAM } from "@/store/actionTypes";

export default function ProgramPaymentSuccess() {
  const router = useRouter();
  const { orderId } = router.query;
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentImage, setPaymentImage] = useState("");
  const [paymentIcon, setPaymentIcon] = useState("");
  const [isCaptured, setIsCaptured] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   //localStorage.setItem("orderId", router.query.id);
  //   if(router.query.id!=undefined){
  //   fetchPaymentDetails(router.query.id).then((orderResult) => {
  //     if (orderResult?.status == "failed") {
  //       console.log("created")
  //       setIsCaptured(false);
  //       setIsLoaded(true);
  //     } else if (orderResult?.status == "captured") {
  //       console.log("captured")
  //       setIsCaptured(true);
  //       setIsLoaded(true);
  //     } else {
  //       console.log("being captured")
  //       capturePlanPayment(
  //         Number(orderResult?.program_id),
  //         orderResult?.payment_id
  //       ).then((paymentResult) => {
  //         setIsCaptured(true);
  //         setIsLoaded(true);
  //         dispatch(reset());
  //         dispatch(success(ADD_USER_PROGRAM, paymentResult));
  //       });
  //     }
  //   });
  // }
  // }, [router]);
  // useEffect(() => {
  //   if (isLoaded == true && isCaptured == true) {
  //     setPaymentStatus("Payment Successful");
  //     setPaymentImage("paymentSuccess");
  //     setPaymentIcon("paymentSuccessTick");
  //   } else if (isLoaded == true && isCaptured == false) {
  //     setPaymentStatus(" We are sorry!");
  //     setPaymentImage("paymentFailedImage");
  //     setPaymentIcon("paymentFailedIcon");
  //   }
  // }, [isCaptured, isLoaded]);
  return (
    (
      <div style={{ padding: "15px" }}>
        <AvaImage size="paySucHead" name="paymentSuccess" />
        <div
          style={{
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            backgroundColor: "white",
            margin: "50px 0px",
            paddingBottom: "15px",
            border: "1px soild black",
            borderRadius: "15px",
          }}
        >
          <div style={{ marginTop: "-15px" }}>
            <AvaImage name="paymentSuccessTick" />
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              margin: "15px",
              color: "#443e41",
            }}
          >
            Payment Successful
          </div>
          <div
            style={{ textAlign: "center", fontSize: "14px", color: "#443e41" }}
          >
            #FightingBackPCOS
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "15px",
            justifyContent: "space-aropund",
            position: "sticky",
            bottom: 5,
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: "#e54d9b",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "15px",
            }}
            size="medium"
            onClick={() => {
              Router.replace(constant.URL_MY_PROGRAMS);
            }}
          >
            Go to Program
          </Button>
        </div>
      </div>
    )
  );
}
