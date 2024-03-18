import React, { useState, useCallback } from "react";
import ConsultationV3 from "@/components/homepage/consultationv3";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Head from "next/head";
import { firebaseCloudMessaging } from "@ava/common/lib/utils/PushNotification";
import HomePageDashBoard from "../modules/homePageDashBoard";
import {
  getHealthScoreForHomeScreenDashBoard,
  getDietDataForHomeScreen,periodTrackerResultAPI
} from "@/utils/ApiUtils";
import CustomizedSnackbar from "@/components/snackBar";
import { LS_ACCESS_TOKEN } from "@ava/common";
import { URL_LOGIN } from "../constants";
import CalorieCard from "../modules/calorieCard";
import ProgramsCarousel from "@/components/programsCarousel";
import { PROGRAMS_CAROUSEL_IMAGES } from "../constants/programs/programs.metadata";
import styles from "./HomePage.module.scss";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import CommunityCard from "modules/communityCard";
import CommunitySection from "modules/communitySection";
import FeedbackSection from "modules/feedbackSection";
import StudioCarousel from "@/components/studioCarousel";
import { STUDIO_CAROUSEL_IMAGES } from "@/constants/studio/studioData";
import StudioLogo from "@/components/studioLogo";
const dummyConsistencyData = [
  {
    count: 0,
    date: "2022-06-26T00:00:00.000+00:00",
    day_name: "Sunday",
    day_code: "Day 1",
    achieved: false,
  },
  {
    count: 0,
    date: "2022-06-27T00:00:00.000+00:00",
    day_name: "Monday",
    day_code: "Day 2",
    achieved: true,
  },
  {
    count: 0,
    date: "2022-06-28T00:00:00.000+00:00",
    day_name: "Tuesday",
    day_code: "Day 3",
    achieved: false,
  },
  {
    count: 0,
    date: "2022-06-29T00:00:00.000+00:00",
    day_name: "Wednesday",
    day_code: "Day 4",
    achieved: false,
  },
  {
    count: 0,
    date: "2022-06-30T00:00:00.000+00:00",
    day_name: "Thursday",
    day_code: "Day 5",
    achieved: true,
  },
  {
    count: 0,
    date: "2022-07-01T00:00:00.000+00:00",
    day_name: "Friday",
    day_code: "Day 6",
    achieved: false,
  },
  {
    count: 0,
    date: "2022-07-02T00:00:00.000+00:00",
    day_name: "Saturday",
    day_code: "Day 7",
    achieved: false,
  },
];

const dummyGoodForData = [
  {
    name: "Acne",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654153520769-acne.svg",
  },
  {
    name: "Infertility",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654153674343-Infertility.svg",
  },
  {
    name: "Thyroid",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654153012468-thyroid.svg",
  },
  {
    name: "Diabetes",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654153731353-diabetes.svg",
  },
  {
    name: "PCOS",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654153774531-pcos.svg",
  },
  {
    name: "Period",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654153802322-Period.svg",
  },
  {
    name: "Skin",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654153831255-skin.svg",
  },
  {
    name: "Heart",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654153868940-heart.svg",
  },
  {
    name: "Insulin",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654153967635-Insulin.svg",
  },
  {
    name: "Gut",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654154008452-guts.svg",
  },
  {
    name: "Hair",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654154029009-hair.svg",
  },
  {
    name: "Gluten-free",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654154165361-Gluten_free.svg",
  },
  {
    name: "Stress",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654154197493-stress.svg",
  },
  {
    name: "Immunity",
    count: 0,
    image_url:
      "https://storage.googleapis.com/ava-testing/disease_icons/1654154222620-Immunity.svg",
  },
];

const dummyHealthScoreData = {
  total_score: 225,
  total_achieved_score: 0,
  tested_before: false,
};

const dummyCalorieInfo = {
  nutrient_name: "Calories",
  total_count: 0.0,
  consumed_count: 0.0,
};
const dummyPeriodTrackerData ={
  "id": 0,
  "user_id": 0,
  "last_period_date": "",
  "cycle_length": "",
  "period_phase_length": "",
  "phase_name": "",
  "day_count": "",
  "next_period_date": "",
  "period_tracker_phase_details": "",
  "ovulation_day": "",
  "result": {}
}

export default function Home() {
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem(LS_ACCESS_TOKEN);
  }
  const theme = useTheme();
  const router = useRouter();
  const matchesxs = useMediaQuery(theme.breakpoints.down("sm"));
  const matchessm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const matchesmd = useMediaQuery(theme.breakpoints.up("md"));
  const matcheslg = useMediaQuery(theme.breakpoints.up("lg"));
  const [userName, setUserName] = useState("");
  const [consistencyData, setConsistencyData] = useState(dummyConsistencyData);
  const [healthScoreData, setHealthScoreData] = useState(dummyHealthScoreData);
  const [calorieInfo, setCalorieInfo] = useState(dummyCalorieInfo);
  const [goodForData, setGoodFor] = useState(dummyGoodForData);
  const [periodTrackerResultData , setPeriodTrackerResult] =useState(dummyPeriodTrackerData);
  const [lastPeriodDetails, setLastPeriodDetails] = useState([]);
  const [nextPeriodDetails, setNextPeriodDetails] = useState([]);

  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getDateAndMonth = (date) => {
    console.log(date);
    date = new Date(date);
    const nextDay = new Date();
    nextDay.setDate(date.getDate() + 1);
    console.log("nextDate", nextDay);
    date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    let dateDetails = date.toString().split(" ", 3);
    let nextDateDetails = nextDay.toString().split(" ", 3);
    dateDetails.push(nextDateDetails[2]);
    return dateDetails;
  };

  let height, name, padding;
  if (matchesxs) {
    height = `calc(40vh)`;
    name = "communityBanner";
    padding = "0px";
  }
  if (matchessm) {
    height = `calc(50vh)`;
    name = "communityBannerWeb";
    padding = "15px";
  }
  if (matchesmd) {
    height = `calc(100vh)`;
    name = "communityBannerWeb";
    padding = "25px";
  }
  // if (matcheslg) {
  //   height = `calc(100vh)`;
  //   name = 'communityBannerWeb';
  //   padding = '25px';
  // }

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;
      wb.addEventListener("installed", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener("controlling", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener("activated", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });
      const promptNewVersionAvailable = (event) => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (
          confirm(
            "A newer version of this web app is available, reload to update?"
          )
        ) {
          wb.addEventListener("controlling", (event) => {
            window.location.reload();
          });
          // Send a message to the waiting service worker, instructing it to activate.
          wb.messageSW({ type: "SKIP_WAITING" });
        } else {
          console.log(
            "User rejected to reload the web app, keep using old verion. New verion will be automatically load when user open the app next time."
          );
        }
      };
      wb.addEventListener("waiting", promptNewVersionAvailable);
      wb.addEventListener("externalwaiting", promptNewVersionAvailable);
      wb.addEventListener("message", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });
      wb.register();
    }
  }, []);

  React.useEffect(() => {
    firebaseCloudMessaging.init();
  }, []);

  React.useEffect(() =>{
    if(periodTrackerResultData.last_period_date!=null && periodTrackerResultData.last_period_date!=""){
    setLastPeriodDetails(
      getDateAndMonth(periodTrackerResultData.last_period_date)
    );
    setNextPeriodDetails(
      getDateAndMonth(periodTrackerResultData.next_period_date)
    );
    }
   // periodTrackerResultData.last_period_date = lastPeriodDetails[1]+" "+lastPeriodDetails[2]
  },[periodTrackerResultData])

  const getHomeScreenData = useCallback(async () => {
    try {
      const healthScoreData = await getHealthScoreForHomeScreenDashBoard();
      setUserName(healthScoreData.user_name);
      setHealthScoreData(healthScoreData.health_score);
      const dietData = await getDietDataForHomeScreen(
        new Date().toISOString().split("T")[0]
      );
      const periodTrackerResult = await periodTrackerResultAPI();
      setPeriodTrackerResult(periodTrackerResult);
      setConsistencyData(dietData.diet_consistency);
      setGoodFor(dietData.good_for_count_list);
      setCalorieInfo(dietData.calories_info);
    } catch (err) {
      setSnackBarOpen(true);
      let errorMessage = "";
      if (err.message && err.status !== 500) {
        errorMessage = err.message;
      } else {
        errorMessage = "Something went wrong! Please try again.";
      }
      setErrorMessage(errorMessage);
    }
  }, [getHealthScoreForHomeScreenDashBoard, getDietDataForHomeScreen]);

  const handleClickSeeAllPrograms = () => {
    router.push("/programs");
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getHomeScreenData();
  }, [getHomeScreenData]);

  return accessToken ? (
    <>
      <CustomizedSnackbar
        open={isSnackBarOpen}
        message={errorMessage}
        setOpen={setSnackBarOpen}
      />
      <div style={{ backgroundColor: "#E5E5E5" }}>
        <Head></Head>
        <HomePageDashBoard
          isTestedBefore={healthScoreData.tested_before}
          userHealthScore={healthScoreData.total_achieved_score}
          bestHealthScore={healthScoreData.total_score}
          userName={userName}
          dietConsistency={consistencyData}
         lastPeriodTackerData={lastPeriodDetails}
         nexttPeriodTackerData={nextPeriodDetails}
        />
        <div className={styles.buttonsSection}>
          <Button
            onClick={() => {
              router.push("/user/programs");
            }}
            style={{
              background: "#EEEEEE",
              textTransform: "none",
              width: "142px",
              height: "33px",
              borderRadius: "8px",
              boxShadow:
                "-2px -2px 4px rgba(255, 255, 255, 0.25), 2px 2px 4px #C1C1C1",
            }}
          >
            <img src="/assets/images/myProgramsText.svg" />
          </Button>
          <Button
            onClick={() => {
              router.push("/consultation/consultations");
            }}
            style={{
              borderRadius: "8px",
              background: "#EEEEEE",
              width: "142px",
              height: "33px",
              boxShadow:
                "-2px -2px 4px rgba(255, 255, 255, 0.25), 2px 2px 4px #C1C1C1",
            }}
          >
            <img src="/assets/images/myConsultationText.svg" />
          </Button>
        </div>
        <StudioLogo color='#102D32' src="/assets/images/studio/playIconBlack.svg" title="Studio" />
        <p style={{
          padding: "0 15px 15px 15px",
          marginTop: "0",
          marginBottom: "0",
          fontWeight: '500',
          fontSize: '14px',

        }}>Learn, Workout, Yoga, Recipes & more...</p>
        <StudioCarousel
          color="#C73B5D"
          activeIndicatorColor={"#C73B5D"}
          itemsArray={STUDIO_CAROUSEL_IMAGES}
        />
        <CommunitySection />

        <div style={{ padding: "0 15px 15px 15px" }}>
          <CalorieCard
            consumed={calorieInfo.consumed_count}
            prescribed={calorieInfo.total_count}
            nutrientName={calorieInfo.nutrient_name}
            measurementUnit=""
            goodFoodCounts={goodForData.slice(0, 3)}
          />
        </div>
        <div className={styles.programsSection}>
          <div className={styles.programsSeeAllFlex}>
            <h1>Our Programs</h1>
            <Button
              onClick={handleClickSeeAllPrograms}
              style={{
                background: "none",
                color: "white",
                fontWeight: "600",
                fontSize: "12px",
                fontFamily: "Poppins",
                textTransform: "none",
                marginTop: "15px",
              }}
            >
              View All
            </Button>
          </div>

          <p>Explore : Thyroid , PCOS , Fertility , Diabetes </p>
          <ProgramsCarousel
            color="white"
            activeIndicatorColor={"#CD3C5D"}
            itemsArray={PROGRAMS_CAROUSEL_IMAGES}
          />
          <h1 className={styles.realPeopleHeading}>Real People Real Stories</h1>
          <FeedbackSection />
        </div>
        <ConsultationV3 />
        <CommunityCard />
      </div>
    </>
  ) : (
    typeof window !== "undefined" && window.location.assign(URL_LOGIN)
  );
}
