import React, { useState, useEffect } from "react";
import AvaImage from "../v1/Image";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getComments, saveComment } from "@/utils/ApiUtils";
import { updateLike } from "@/store/actions/api.action";
import { useRouter } from "next/router";
import * as constant from "@/constants/index";
import Router from "next/router";
import { object } from "prop-types";
import { WhatsappShareButton } from "next-share";

const propTypes = {
  data: object,
};
const COMMUNITY_SHARE_MESSAGE = `Check this interesting post on the MyAva community!
Join 25000+ women on the MyAva wellness community and be a part of the tribe!.
`;
const COMMUNITY_URL =
  "https://play.google.com/store/apps/details?id=in.myava.app";

const FeedCard = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showComments, setshowComments] = useState(false);
  const [comments, setcomments] = useState([]);
  const [seemore, setseemore] = useState(false);
  const [comment, setcomment] = useState("");
  const profile = useSelector((store) => store.profileReducer.profile);
  const handleShowComments = () => {
    setshowComments(!showComments);
    getComments(data.id)
      .then(
        (sucRes) => {
          setcomments(sucRes.comments);
        },
        (err) => {
          console.error(err);
        }
      )
      .catch((err) => {
        console.error(err);
      });
  };

  const handleFocus = () => {
    if (!(profile && profile.user)) {
      Router.push({
        pathname: constant.URL_LOGIN,
        query: {
          redirectTo: constant.URL_COMMUNITY,
        },
      });
    }
  };

  const handlePostComment = () => {
    saveComment(data.id, comment)
      .then(
        () => {
          alert("Post Succesful.");
          setcomment("");
          getComments(data.id)
            .then(
              (sucRes) => {
                setcomments(sucRes.comments);
              },
              (err) => {
                console.error(err);
              }
            )
            .catch((err) => {
              console.error(err);
            });
        },
        (err) => {
          if (err.status === 401) {
            router.push({
              pathname: constant.URL_LOGIN,
              query: {
                redirectTo: constant.URL_COMMUNITY,
              },
            });
          }
        }
      )
      .catch((err) => {
        console.log("post comment error", err);
      });
  };

  const togglePostLike = () => {
    dispatch(updateLike(data.id, !data.liked));
  };

  // TODO: trying effects.
  useEffect(() => {
    console.log("data in effect", data.liked);
    return () => {
      console.log("data in in ij", data.liked);
    };
  }, [data.liked]);

  return (
    <div
      style={{ backgroundColor: "#FFFFFF", padding: "15px", marginTop: "15px" }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: "15px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <AvaImage src={data.user.image_url} />
        </div>
        <div style={{ padding: "0px 12px", flexGrow: 1 }}>{data.user.name}</div>
        <div>
          <AvaImage size="xsmall" name="arrowDown" />
        </div>
      </div>
      {seemore ? (
        <div
          style={{ fontSize: "14px", color: "#443e41", marginBottom: "15px" }}
        >
          {data.content}
        </div>
      ) : (
        <div
          style={{ fontSize: "14px", color: "#443e41", marginBottom: "15px" }}
        >
          {data.content.substring(0, 200)}
          {data.content.length > 200 ? " ... " : ""}
          {/* &nbsp;...&nbsp; */}
          <span
            style={{ textDecoration: "underline" }}
            onClick={() => setseemore(true)}
          >
            {data.content.length > 200 ? "see more" : ""}
          </span>
        </div>
      )}
      <div style={{ marginBottom: "15px" }}>
        <AvaImage size="content" src={data.images} />
      </div>
      <div
        style={{
          fontSize: "12px",
          color: "#443e41",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>{data.likes}</span>
        <span>&nbsp;likes</span>
        <span>&nbsp;.&nbsp;</span>
        <span>{data.comments}</span>
        <span>&nbsp;comments</span>
        <span>
          &nbsp; &nbsp;
          <WhatsappShareButton
            title={COMMUNITY_SHARE_MESSAGE}
            url={COMMUNITY_URL}
          >
            <img src="/assets/images/studio/whatsappIcon.svg" alt="whatsapp" />
          </WhatsappShareButton>
        </span>
      </div>
      <hr />
      <div style={{ display: "flex" }}>
        {data.liked ? (
          <AvaImage
            size="xsmall"
            name="likeIconActive"
            onClick={togglePostLike}
          />
        ) : (
          <AvaImage size="xsmall" name="likeIcon" onClick={togglePostLike} />
        )}
        {showComments ? (
          <div
            style={{ alignItems: "center", display: "flex" }}
            onClick={handleShowComments}
          >
            Hide Comments
          </div>
        ) : (
          <div
            style={{ alignItems: "center", display: "flex" }}
            onClick={handleShowComments}
          >
            Show Comments
          </div>
        )}
        {/*TODO: <AvaImage size='xsmall' name='shareIcon' /> */}
      </div>
      {showComments && (
        <div>
          <hr />
          {comments && comments.length > 0 ? (
            <div style={{ maxHeight: "250px", overflow: "scroll" }}>
              {comments.map((comment, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "top",
                    marginBottom: "12px",
                    padding: "12px",
                  }}
                >
                  <div style={{ marginLeft: "-5px", marginRight: "15px" }}>
                    <AvaImage src={comment.user.image_url} />
                  </div>
                  <div
                    style={{
                      padding: "12px",
                      flexGrow: 1,
                      backgroundColor: "#f1f1f1",
                      alignItems: "center",
                      borderRadius: "0px 15px 15px 15px",
                    }}
                  >
                    <div>{comment.user.name}</div>
                    <div>{comment.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>Loading Comments...</div>
          )}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <div>
          {profile && profile.user && <AvaImage src={profile.user.image_url} />}
        </div>
        <div style={{ padding: "0px 12px", flexGrow: 1 }}>
          <TextField
            value={comment}
            style={{ width: "100%" }}
            label="Add comment"
            onFocus={handleFocus}
            onChange={(e) => {
              setcomment(e.target.value);
            }}
          />
        </div>
        {/*TODO: <AvaImage size='xsmall' name='emojiIcon' />
        <AvaImage size='xsmall' name='attachIcon' /> */}
        <div>
          <Button
            onClick={handlePostComment}
            disabled={comment.length < 1}
            style={{
              opacity: comment.length < 1 ? "0.3" : "1",
              marginLeft: "-15px",
            }}
            color="primary"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

FeedCard.propTypes = propTypes;
export default FeedCard;
