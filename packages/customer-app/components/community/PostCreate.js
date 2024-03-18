import React from "react";
import AvaImage from "../v1/Image";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const PostCreate = () => {
  return (
    <div
      style={{ backgroundColor: "#FFFFFF", padding: "15px", marginTop: "15px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <AvaImage name="profileFemale" />
        </div>
        <div style={{ padding: "0px 12px", flexGrow: 1 }}>Simran Kaur</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "0px 12px", flexGrow: 1 }}>
          <TextField
            style={{ width: "100%" }}
            label="What do you want to talk about ?"
          />
        </div>
        <div>
          <Button color="primary">Post</Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "15px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <AvaImage size="xsmall" name="emojiIcon" />
        <div style={{ flexGrow: 1, padding: "0px 12px" }}># Add hashtag</div>
        <div style={{ display: "flex" }}>
          <AvaImage size="xsmall" name="cameraIcon" />
          <AvaImage size="xsmall" name="attachIcon" />
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
