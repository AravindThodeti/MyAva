import styles from "./programs.module.scss";
import Chip from "@material-ui/core/Chip";
import { useState, useEffect } from "react";
import ConsultationV3 from "@/components/homepage/consultationv3";
import { getPlans } from "@/utils/ApiUtils";
import FeedbackSection from "modules/feedbackSection";
import { useRouter } from "next/router";
import {
  programImgs,
  ProgramNames,
} from "@/constants/programs/programs.metadata";

export default function ProgramList() {
  const [allPlans, setallPlans] = useState([]);
  const [activeTab, setActivetab] = useState({ id: 0, name: "ALL" });
  const router = useRouter();
  let activePrograms = [];

  useEffect(() => {
    getPlans()
      .then((sucRes) => {
        const activePlans = sucRes.data.filter((datum) => {
          return datum.is_active;
        });
        setallPlans(activePlans);
      })
      .catch((err) => {
        console.log("Please Try Again Later.", err);
      });
  }, []);

  function getRequiredPlans(allPlans, programImgs) {
    for (let i = 0; i < programImgs.length; i++) {
      let element = programImgs[i];
      for (let j = 0; j < allPlans.length; j++) {
        if (
          element.id === allPlans[j].program_id &&
          allPlans[j].validity === 90
        ) {
          let newprogram = allPlans[j];
          newprogram["title"] = element.title;
          newprogram["src"] = element.src;
          activePrograms.push(newprogram);
        }
      }
    }
  }
  getRequiredPlans(allPlans, programImgs);

  const [activeProgram, setActiveProgram] = useState(activePrograms);

  const handleProgramTab = (data) => {
    setActivetab(data);
    let activatedTab = activePrograms.filter(
      (item) => item.program_id == data.id
    );
    if (data.id == 0) {
      activatedTab = activePrograms;
    }
    setActiveProgram(activatedTab);
  };
  return (
    <div>
      <div className={styles.backgroundColor}>
        <div className={styles.logoContainer}>
          <img
            src="/assets/images/studio/myavaIcon1.svg"
            alt="MyavaStudioICon"
          />
          <h2>Care</h2>
        </div>
        <p className={styles.programs_img}>
          Scientifically Curated Program Plans <br></br> Personalised For You By
          Experts.
        </p>
      </div>
      <div>
        <div className={styles.programTabs}>
          {ProgramNames?.map((data) => {
            return (
              <Chip
                variant="outlined"
                key={data.id}
                label={data.name}
                style={{
                  border:
                    data.name === activeTab.name ? " 2px solid #C73B5D " : "",
                  marginRight: "15px",
                  fontSize: "14px",
                  color: data.name === activeTab.name ? "#C73B5D" : "#868686",
                  padding: "0 10px",
                }}
                onClick={() => handleProgramTab(data)}
              />
            );
          })}
        </div>
        {(activeTab.id === 0 ? activePrograms : activeProgram)?.map((item) => {
          return (
            <div
              className={styles.card}
              key={item.id}
              onClick={() => {
                router
                  .push(`/programs/${item.program_id}`)
                  .then(() => window.scrollTo(0, 0));
              }}
            >
              <img src={item.src} alt={item.title} />
              <div className={styles.cardContent}>
                <h2>{item.title}</h2>
                <p className={styles.cardDiscountedPrice}>₹{item.price}</p>
                <p className={styles.cardPrice}>
                  ₹{item.discounted_price} / {item.name}
                </p>

                <button className={styles.cardButton}>Explore</button>
              </div>
            </div>
          );
        })}
        <div>
          <div
            className={styles.bottomSection}
            style={{ paddingBottom: "40px !important" }}
          >
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
        </div>
      </div>
    </div>
  );
}
