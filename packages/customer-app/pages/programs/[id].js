import styles from "./programs.module.scss";
import { useState, useEffect } from "react";
import FeedbackSection from "modules/feedbackSection";
import ConsultationV3 from "@/components/homepage/consultationv3";
import { useRouter } from "next/router";
import { getPlansByProgramsId, initiatePlanPurchase } from "@/utils/ApiUtils";
import { useDispatch } from "react-redux";
import { reset } from "@/actions/planPurchase.action";
import usePlanPayment from "hooks/PlanPayment";
import { programBenefitsData } from "@/constants/programs/programs.metadata";
import { WhatsappShareButton } from "next-share";

export default function Plans() {
  const router = useRouter();
  const payment = usePlanPayment();
  const dispatch = useDispatch();
  const [planPurchase, setPlanPurchase] = useState();
  const { id } = router.query;
  const [plans, setPlans] = useState([]);

  const SHARE_MESSAGE = `YOU NEED TO CHECK THIS! So there’s this app called MyAva that have health programs for women. 
   I really think you should look into it! Here’s the link to the app`;

  let Share_URL;
  if (typeof window !== "undefined") {
    Share_URL = window.location.href;
  }

  useEffect(() => {
    if (planPurchase) {
      dispatch(reset());
      payment.handleClick(planPurchase.id);
    }
  }, [planPurchase]);

  const buyNow = (value) => {
    initiatePlanPurchase(value)
      .then((res) => {
        setPlanPurchase(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPlansByProgramsId(id)
      .then((sucRes) => {
        const activePlans = sucRes.data.filter((datum) => datum.is_active);
        setPlans(activePlans);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [id]);

  let programIncludesBenefits = programBenefitsData.filter((item) => {
    return item.id == id;
  });
  const sortPlans = plans.sort((a, b) => (a.name > b.name ? -1 : 1));
  return (
    <div style={{ background: "#F1F1F1" }}>
      <div className={styles.backgroundColor}>
        <div className={styles.logoContainer}>
          <img
            src="/assets/images/studio/myavaIcon1.svg"
            alt="MyavaStudioICon"
          />
          <h2>Care</h2>
        </div>
        <div>
          <p className={styles.programs_img}>
            Scientifically Curated Program Plans <br></br> Personalised For You
            By Experts.
          </p>
          <div style={{ textAlign: "center" }}>
            <img
              src="/assets/images/programs/program_img.png"
              alt="program image"
            />
          </div>
          <p className={styles.programs_img}>
            <b>Success Metrics</b> <br></br>3000+ women managed PCOS/PCOS with
            MyAva 75% women reported no more bloating in first 20 days 70% women
            reported 8-10 Kg weight loss in 90 days
          </p>
        </div>
      </div>

      <div
        style={{
          padding: "15px",
          color: "#102D32",
        }}
      >
        <p style={{ fontWeight: "700" }}>This Program includes:</p>

        {programIncludesBenefits.map((datum) => {
          return (
            <div key={datum.id}>
              <li style={{ paddingLeft: "15px", marginBottom: "15px" }}>
                {datum.description1}
              </li>
              <li style={{ paddingLeft: "15px", marginBottom: "15px" }}>
                {datum.description2}
              </li>
              <li style={{ paddingLeft: "15px", marginBottom: "15px" }}>
                {datum.description3}
              </li>
              <li style={{ paddingLeft: "15px", marginBottom: "15px" }}>
                {datum.description4}
              </li>
              <li style={{ paddingLeft: "15px", marginBottom: "15px" }}>
                {datum.description5}
              </li>
            </div>
          );
        })}
      </div>
      <h3 style={{ textAlign: "center" }}>WHAT HAPPENS ON THE PLAN</h3>
      <img
        src="/assets/images/programs/programDetails.svg"
        alt="program details"
        style={{ marginLeft: "20px" }}
      />
      {sortPlans?.map((item) => {
        return (
          <div className={styles.planCard} id={item.id} key={item.id}>
            <h2
              style={{
                color:
                  item.name == "6 months" || item.name == "6 Months"
                    ? " #F12711"
                    : item.name == "3 months" || item.name == "3 Months"
                    ? "#AD5389"
                    : "#C53A5D",
              }}
            >
              {item.name}
            </h2>
            <div className={styles.planCardPrice}>
              <p>₹{item.price}</p>
              <h4>₹{item.discounted_price}</h4>
            </div>
            <div>
              <button
                className={styles.planCardButton}
                onClick={() => buyNow(item.id)}
              >
                Buy
              </button>
            </div>
          </div>
        );
      })}

      <div className={styles.bottomSection}>
        <h2 className={styles.feedbackHeading}>What people are saying</h2>
        <FeedbackSection activeIndicatorColor="#ffffff" />
        <ConsultationV3
          backgroundColor="#C93B5D"
          headingColor="#ffffff"
          tabDefaultColor="#ffffff"
          tabActiveColor="#ffffff"
          indicatorColor="#ffffff"
          spDetailColor="#ffffff"
        />
      </div>
      <div className={styles.whatsAppButton}>
        <WhatsappShareButton title={SHARE_MESSAGE} url={Share_URL}>
          <img src="/assets/images/programs/WhatsAppChat.svg" alt="whatsapp" />
        </WhatsappShareButton>
      </div>
    </div>
  );
}
