import Styles from "./studioCard.module.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import router from "next/router";
import { registerForLiveSession } from "@/utils/ApiUtils";
import { WhatsappShareButton } from "next-share";

export default function StudioLiveCard(props) {
  const {
    id,
    about_expert,
    activity_type,
    description,
    organizer_name,
    session_starts_at,
    session_ends_at,
    session_link,
    thumbnail,
    registered,
    renderPage,
    expired,
  } = props;
  const sessionStartsDate = new Date(session_starts_at);
  const sessionStartsTime = sessionStartsDate.getTime();
  const sessionEndDate = new Date(session_ends_at);
  const sessionEndTime = sessionEndDate.getTime();
  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  const isMeetingProgress =
    currentTime >= sessionStartsTime && currentTime <= sessionEndTime;

  const givenDate =
    sessionStartsDate.getDate() +
    "-" +
    (sessionStartsDate.getMonth() + 1) +
    "-" +
    sessionStartsDate.getFullYear();
  let hr = sessionStartsDate.getHours();
  let min = sessionStartsDate.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  if (hr < 10) {
    hr = "0" + hr;
  }
  const meetingStartsAt = hr + ":" + min;

  const handleRegister = async () => {
    const register = await registerForLiveSession(id);
    alert(register);
    renderPage();
  };
  const LIVE_SHARE_MESSAGE = `New Live session! Register now!
Experts discussing everything about health & wellness. All you wanted to know will be covered in this live session. Register for Free!`;

  let LIVE_URL;
  if (typeof window !== "undefined") {
    LIVE_URL = window.location.href;
  }

  return (
    <Card className={Styles.mainBGColor}>
      <div className={Styles.livePageContent}>
        <img className={Styles.image} src={thumbnail} alt={activity_type} />
      </div>

      <CardContent className={Styles.cardContent}>
        <div className={Styles.sessionDate}>
          <p>{givenDate}</p>
          <p> Starts at {meetingStartsAt}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            style={{
              opacity: registered || expired === true ? "0.6" : "",
            }}
            className={Styles.livePageButtons}
            onClick={handleRegister}
            disabled={registered || expired == true ? true : false}
          >
            {registered === true ? "Registered" : "Register"}
          </button>
          <button
            className={Styles.livePageButtons}
            onClick={() => {
              isMeetingProgress ? router.push(session_link) : "";
            }}
            style={{
              backgroundColor: isMeetingProgress ? " #c93b5d" : "#A4A4A4",
            }}
            disabled={expired === true ? true : false}
          >
            Join
          </button>

          <WhatsappShareButton title={LIVE_SHARE_MESSAGE} url={LIVE_URL}>
            <img src="/assets/images/whatsAppIcon.svg" alt="whatsapp" />
          </WhatsappShareButton>
        </div>
        <h5>About Experts</h5>
        <p className={Styles.livePageDescription}>{about_expert}</p>
        <h5>Description</h5>
        <p className={Styles.livePageDescription}>{description}</p>
      </CardContent>
    </Card>
  );
}
