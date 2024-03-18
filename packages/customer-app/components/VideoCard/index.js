import { Card } from "@material-ui/core";
import { useRouter } from "next/router";

export default function VideoCard(props) {
  const router = useRouter();

  const {
    altText,
    thumbnail,
    video_description,
    video_duration,
    video_link,
    video_name,
    onClick,
    likes,
    number_of_views,
    number_of_comments,
    provider_description,
    studio_disease_name,
    studio_session_name,
  } = props;
  const handleClick = () => {
    let sessionNameInLowerCase;
    let capitalizedSessionName;
    if (studio_session_name === "Real women Real stories") {
      capitalizedSessionName = studio_session_name
        .replace(/ /g, "_")
        .toUpperCase();
      sessionNameInLowerCase = studio_session_name
        .replace(/ /g, "_")
        .toLowerCase();
    } else {
      capitalizedSessionName = studio_session_name.toUpperCase();
      sessionNameInLowerCase = studio_session_name.toLowerCase();
    }
    const capitalizedDiseaseName = studio_disease_name.toUpperCase();
    const diseaseNameInLowerCase = studio_disease_name.toLowerCase();
    router.push(
      `/studio/${diseaseNameInLowerCase}/${sessionNameInLowerCase}?diseaseName=${capitalizedDiseaseName}&sessionName=${capitalizedSessionName}`
    );
  };
  return (
    <div style={{ borderBottom: "1px solid #D6D6D6" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div width="100px" height="100px">
          <img
            src={thumbnail}
            alt={altText}
            width="70px"
            height="70px"
            onClick={handleClick}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "10px",
            flexDirection: "column",
            marginRight: "5px",
          }}
        >
          <h3
            style={{
              marginBottom: "0",
              marginTop: "15px",
              color: "#C73B5C",
              fontSize: "19px",
            }}
            onClick={handleClick}
          >
            {video_name}
          </h3>

          <h6
            style={{
              padding: "2px 0 10px 0",
              margin: "0",
              fontSize: "9px",
              fontWeight: "400",
              fontFamily: "Poppins",
              color: "#3D3D3D",
            }}
          >
            {video_description}
          </h6>
          <div
            style={{ display: "flex", marginBottom: "8px", fontSize: "10px" }}
          >
            <span
              style={{ paddingRight: "5px", borderRight: "1px solid #ACACAC" }}
            >
              <img
                src="/assets/images/studio/playVector.svg"
                alt="playVector"
                style={{ padding: "0 5px " }}
              />
              <span>{video_duration}</span>
            </span>

            <span
              style={{ padding: "0 5px ", borderRight: "1px solid #ACACAC" }}
            >
              {" "}
              {likes}
              <img
                src="/assets/images/studio/likeButton.svg"
                alt="likeButton"
                style={{ padding: "0 5px " }}
              />
            </span>
            <span
              style={{ padding: "0 5px ", borderRight: "1px solid #ACACAC" }}
            >
              {number_of_comments}
              <img
                src="/assets/images/studio/commentIcon.svg"
                alt="commentIcon"
                style={{ padding: "0 5px " }}
              />
            </span>
            <span style={{ padding: "0 5px " }}>{number_of_views} Views</span>
          </div>
        </div>
      </div>
    </div>
  );
}
