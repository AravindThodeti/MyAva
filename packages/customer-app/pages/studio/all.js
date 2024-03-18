import VideoCard from "@/components/VideoCard";
import { StudioTabs } from "@/components/studioNavigationBar";
import { useState } from "react";
import { STUDIO_TABS } from "../../constants";
import Styles from "./studioStyles.module.scss";
import { useRouter } from "next/router";
import { getStudioAllSectionData } from "@/utils/ApiUtils";
import { useEffect } from "react";
import StudioLogo from "@/components/studioLogo";

export default function StudioAll() {
  const [allSectionInfo, setAllSectionInfo] = useState([]);
  const router = useRouter();
  const pathname = router.pathname.replace("/studio/", "").toUpperCase();
  const [tabState, settabState] = useState(pathname);

  const getAllSectionData = async () => {
    const allData = await getStudioAllSectionData();
    setAllSectionInfo(allData);
  };

  useEffect(() => {
    getAllSectionData();
  }, []);

  const pcosArray = allSectionInfo.filter((data) => {
    return data.studio_disease_name === "PCOS";
  });
  const diabetesArray = allSectionInfo.filter((data) => {
    return data.studio_disease_name === "Diabetes";
  });
  const thyroidArray = allSectionInfo.filter((data) => {
    return data.studio_disease_name === "Thyroid";
  });
  const fertilityArray = allSectionInfo.filter((data) => {
    return data.studio_disease_name === "Fertility";
  });

  return (
    <div>
      <div className={Styles.allPgBgColor}>
        <div>
          <StudioLogo
            title="Studio"
            color="white"
            src="/assets/images/studio/playIconWhite.svg"
          />
          <StudioTabs
            data={STUDIO_TABS}
            studioTabsHandler={{ tabState, settabState }}
            textColor="#949494"
          />
        </div>
        <div className={Styles.allPgContainer}>
          <div className={Styles.allPageContent}>
            <img src="/assets/images/studio/knowledge.png" alt="knowledge" />
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "5px",
        }}
      >
        <h2
          style={{
            color: "#C73B5D",
            marginTop: "60px",
            fontWeight: "bold",
            marginBottom: "0px",
          }}
        >
          PCOS
        </h2>
        <p style={{ margin: "0" }}>Most watched videos</p>
        {pcosArray.map((data) => {
          return (
            <VideoCard
              key={data.id}
              id={data.id}
              studio_disease_name={data.studio_disease_name}
              studio_session_name={data.studio_session_name}
              altText={data.video_name}
              video_name={data.video_name}
              video_description={data.video_description}
              likes={data.likes}
              number_of_comments={data.number_of_comments}
              number_of_views={data.number_of_views}
              video_duration={
                data.video_duration ? data.video_duration : "20 min"
              }
              thumbnail={
                data.thumbnail
                  ? data.thumbnail
                  : "/assets/images/studio/serviceProviderImg.png"
              }
            />
          );
        })}

        <h2
          style={{
            color: "#C73B5D",
            marginTop: "60px",
            fontWeight: "bold",
            marginBottom: "0px",
          }}
        >
          FERTILITY
        </h2>
        <p style={{ margin: "0" }}>Most watched videos</p>

        {fertilityArray.map((data) => {
          return (
            <VideoCard
              key={data.id}
              id={data.id}
              studio_disease_name={data.studio_disease_name}
              studio_session_name={data.studio_session_name}
              altText={data.video_name}
              video_name={data.video_name}
              video_description={data.video_description}
              likes={data.likes}
              number_of_comments={data.number_of_comments}
              number_of_views={data.number_of_views}
              video_duration={
                data.video_duration ? data.video_duration : "20 min"
              }
              thumbnail={
                data.thumbnail
                  ? data.thumbnail
                  : "/assets/images/studio/serviceProviderImg.png"
              }
            />
          );
        })}

        {/* <div>
          <h2
            style={{
              color: "#C73B5D",
              marginTop: "60px",
              fontWeight: "bold",
              marginBottom: "0px",
            }}
          >
            DIABETES
          </h2>
          <p style={{ margin: "0" }}>Most watched videos</p>

          {diabetesArray.map((data) => {
            return (
              <VideoCard
                key={data.id}
                id={data.id}
                studio_disease_name={data.studio_disease_name}
                studio_session_name={data.studio_session_name}
                altText={data.video_name}
                video_name={data.video_name}
                video_description={data.video_description}
                likes={data.likes}
                number_of_comments={data.number_of_comments}
                number_of_views={data.number_of_views}
                video_duration={
                  data.video_duration ? data.video_duration : "20 min"
                }
                thumbnail={
                  data.thumbnail
                    ? data.thumbnail
                   : "/assets/images/studio/serviceProviderImg.png"
                }
              />
            );
          })}
        </div> */}
        <div>
          <h2
            style={{
              color: "#C73B5D",
              marginTop: "60px",
              fontWeight: "bold",
              marginBottom: "0px",
            }}
          >
            THYROID
          </h2>
          <p style={{ margin: "0" }}>Most watched videos</p>

          {thyroidArray.map((data) => {
            return (
              <VideoCard
                key={data.id}
                id={data.id}
                studio_disease_name={data.studio_disease_name}
                studio_session_name={data.studio_session_name}
                altText={data.video_name}
                video_name={data.video_name}
                video_description={data.video_description}
                likes={data.likes}
                number_of_comments={data.number_of_comments}
                number_of_views={data.number_of_views}
                video_duration={
                  data.video_duration ? data.video_duration : "20 min"
                }
                thumbnail={
                  data.thumbnail
                    ? data.thumbnail
                    : "/assets/images/studio/serviceProviderImg.png"
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
