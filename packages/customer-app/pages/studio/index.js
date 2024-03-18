import StudioLiveCard from "@/components/studioCard";
import { useState, useEffect } from "react";
import { StudioTabs } from "@/components/studioNavigationBar";
import { STUDIO_TABS } from "../../constants";
import StudioLogo from "@/components/studioLogo";
import { getStudioLiveData } from "@/utils/ApiUtils";
import Styles from "./studioStyles.module.scss";

export default function StudioHome() {
  const [tabState, settabState] = useState("LIVE");
  const [liveData, setLiveData] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const getLiveData = async () => {
    const liveSection = await getStudioLiveData();
    setLiveData(liveSection?.data);
    setIsDataAvailable(true);
  };

  useEffect(() => {
    getLiveData();
  }, []);

  return (
    <div className={Styles.livePageBgColor}>
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
      {isDataAvailable == true && (
        <div>
          {liveData && liveData.length > 0 ? (
            liveData.map((item) => {
              return (
                <StudioLiveCard
                  id={item.id}
                  key={item.id}
                  activity_type={item.activity_type}
                  organizer_name={item.organizer_name}
                  about_expert={item.about_expert ? item.about_expert : " "}
                  description={item.description ? item.description : ""}
                  session_link={item.session_link}
                  session_starts_at={item.session_starts_at}
                  thumbnail={
                    item.thumbnail
                      ? item.thumbnail
                      : "/assets/images/studio/LiveImage.png"
                  }
                  registered={item.registered}
                  renderPage={getLiveData}
                  session_ends_at={item.session_ends_at}
                  expired={item.expired}
                />
              );
            })
          ) : (
            <div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src="/assets/images/studio/LiveImage.png" alt="liveImg" />
              </div>
              <h2
                style={{
                  textAlign: "center",
                  color: "#FFFFFF ",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  padding: "0 15px ",
                }}
              >
                We're Brewing Some Interesting Sessions Soon. Keep Watching This
                Space.
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
