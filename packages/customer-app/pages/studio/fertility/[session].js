import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import VideoPlayerCard from "@/components/videoPlayerCard";
import {
  getSingleSessionStudioData,
  updateStudioVideosViews,
  updateStudioVideosLikes,
  createStudioVideosComments,
  getStudioVideosComments,
} from "@/utils/ApiUtils";
import StudioLogo from "@/components/studioLogo";
import { StudioTabs } from "@/components/studioNavigationBar";
import { STUDIO_TABS } from "../../../constants";
import styles from "../pcos/pcos.module.scss";
import CommentCard from "@/components/commentCard";
import AddComment from "@/components/addComment";
import { WhatsappShareButton } from "next-share";

export default function SingleSessionFertility() {
  const [singleSessionData, setSingleSessionData] = useState([]);
  const [selectedVideo, setselectedVideo] = useState(0);
  const router = useRouter();
  const { diseaseName, sessionName, videoName } = router.query;
  const [tabState, settabState] = useState(diseaseName?.toUpperCase());
  const [previousComments, setPreviousComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [clickComment, setClickComment] = useState(false);
  const [isDataAvailable, setisDataAvailable] = useState(false);

  const STUDIO_SHARE_MESSAGE = `YOU NEED TO CHECK THIS!
  Watch this interesting session on ${singleSessionData[selectedVideo]?.video_name} on the MyAva app.
  Here’s the link to the app.
`;
  let STUDIO_URL;
  if (typeof window !== "undefined") {
    STUDIO_URL = window.location.href;
  }
  const getSingleSessionData = useCallback(async () => {
    try {
      const sessionsData = await getSingleSessionStudioData(
        diseaseName,
        sessionName
      );
      setSingleSessionData(sessionsData);
      setisDataAvailable(true);
      if (videoName) {
        for (let i = 0; i < sessionsData.length; i++) {
          if (videoName === sessionsData[i].video_name) {
            setselectedVideo(i);
          }
        }
      }
    } catch (err) {
      console.log(err, "err");
    }
  }, []);

  const handleLikes = async (id) => {
    await updateStudioVideosLikes(id);
    getSingleSessionData(diseaseName, sessionName);
  };

  const getComments = async (id) => {
    const PreviousCommentsList = await getStudioVideosComments(id);
    setPreviousComments(PreviousCommentsList);
    getSingleSessionData(diseaseName, sessionName);
  };

  const handleCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  const submitComment = async () => {
    let id = singleSessionData[selectedVideo]?.id;
    let commentData = {
      video_id: id,
      comment: commentValue,
    };
    await createStudioVideosComments(commentData);
    getComments(id);
    setCommentValue(" ");

    getSingleSessionData();
  };
  useEffect(() => {
    getSingleSessionData();
  }, [getSingleSessionData]);
  return (
    <div>
      <div style={{ backgroundColor: "#C73B5C" }}>
        <StudioLogo
          title={diseaseName}
          color="white"
          src="/assets/images/studio/playIconWhite.svg"
        />
        <StudioTabs
          data={STUDIO_TABS}
          studioTabsHandler={{ tabState, settabState }}
          textColor="#DC899D"
        />
      </div>
      {isDataAvailable == true && (
        <div>
          {singleSessionData && singleSessionData.length > 0 ? (
            <div style={{ height: "100%" }}>
              <div
                style={{
                  height: "370px",
                  borderBottom: "1px solid rgb(214, 214, 214)",
                }}
              >
                <iframe
                  width="100%"
                  height="200"
                  src={singleSessionData[selectedVideo]?.video_link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    color: "#7A7A7A",
                    fontSize: "12px",
                    marginRight: "5px",
                  }}
                >
                  {singleSessionData[selectedVideo].number_of_views} views
                </span>

                <div
                  style={{
                    margin: "0",
                    padding: "0px 8px 8px 8px",
                  }}
                >
                  <h2 style={{ margin: "0", fontSize: "18px" }}>
                    {singleSessionData[selectedVideo].video_name}
                  </h2>
                  <h3
                    style={{
                      margin: "0",
                      paddingTop: "3px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {singleSessionData[selectedVideo].provided_by}
                  </h3>
                  <p
                    style={{
                      fontWeight: "400",
                      fontSize: "10px",
                      fontFamily: "Poppins",
                      marginTop: "5px",
                      marginBottom: "0px",
                    }}
                  >
                    {singleSessionData[selectedVideo].provider_description}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    margin: "0",
                    fontSize: "12px",
                  }}
                >
                  <div
                    style={{
                      padding: " 0 15px",
                      borderRight: "1px solid #B9B8B8",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    onClick={() => {
                      handleLikes(singleSessionData[selectedVideo].id);
                    }}
                  >
                    <img
                      src={
                        singleSessionData[selectedVideo]?.liked == true
                          ? "/assets/images/studio/blueLikeIcon.svg"
                          : "/assets/images/studio/likeButton.svg"
                      }
                      width="20px"
                      height="20px"
                      alt="likeButton"
                    />

                    <span style={{ paddingLeft: "5px" }}>
                      {singleSessionData[selectedVideo]?.likes} Likes
                    </span>
                  </div>

                  <div
                    style={{
                      padding: " 0 10px",
                      borderRight: "1px solid #B9B8B8",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    onClick={() => {
                      setClickComment(clickComment ? false : true);
                      getComments(singleSessionData[selectedVideo].id);
                    }}
                  >
                    <img
                      src="/assets/images/studio/commentIcon.svg"
                      alt="commentIcon"
                      width="20px"
                      height="20px"
                      style={{ paddingRight: "5px" }}
                    />
                    {singleSessionData[selectedVideo].number_of_comments}{" "}
                    Comments
                  </div>
                  <div
                    style={{
                      paddingLeft: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <WhatsappShareButton
                      title={STUDIO_SHARE_MESSAGE}
                      url={STUDIO_URL}
                    >
                      <img
                        src="/assets/images/studio/whatsappIcon.svg"
                        alt="whatsapp"
                      />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {clickComment == true && (
                  <AddComment
                    commentValue={commentValue}
                    handleCommentValue={handleCommentValue}
                    submitComment={submitComment}
                  />
                )}
                {clickComment == true && previousComments.length > 0
                  ? previousComments.map((com) => {
                      return (
                        <CommentCard
                          key={com.id}
                          comment={com.comment}
                          user_name={com.user_name}
                        />
                      );
                    })
                  : ""}
              </div>
              <div className={styles.videoCardDataWrapper}>
                {singleSessionData?.map((data, index) => {
                  return (
                    <VideoPlayerCard
                      key={data.id}
                      altText={data?.video_name}
                      video_name={data?.video_name}
                      thumbnail={
                        data?.thumbnail
                          ? data?.thumbnail
                          : "https://storage.googleapis.com/ava-testing/studio_thumbnails/1658834381733-cutting 1 1.png"
                      }
                      video_description={data?.video_description}
                      video_duration={
                        data.video_duration ? data.video_duration : "20 min"
                      }
                      onClick={() => {
                        let video_Name = data.video_name.replace(/-/g, "");
                        data.number_of_views = data.number_of_views + 1;
                        setselectedVideo(index);
                        getComments(data.id);
                        updateStudioVideosViews(data.id);
                        router.push(
                          {
                            pathname: `/studio/pcos/${sessionName}`,
                            query: {
                              diseaseName: diseaseName,
                              sessionName: sessionName,
                              videoName: video_Name,
                            },
                          },
                          undefined,
                          { shallow: true }
                        );
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <h3
              style={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontWeight: "500",
                padding: "0 15px",
              }}
            >
              We're Brewing Some Interesting Videos Soon. Keep Watching This
              Space.
            </h3>
          )}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
