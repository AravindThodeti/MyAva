import * as React from "react";
import SuggestiveTopics from "@/components/community/SuggestiveTopics";
import CreatePost from "@/components/community/CreatePost";
import QuickPost from "@/components/community/QuickPost";

export default function SharePost() {
  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "15px" }}>
      <SuggestiveTopics />
      <div style={{ margin: "0px -15px" }}>
        {/* <PostCreate /> */}
        <CreatePost />
      </div>
      <div style={{ margin: "0px -15px" }}>
        <QuickPost />
      </div>
    </div>
  );
}
