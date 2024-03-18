import * as React from "react";
import AvaSearch from "../v1/Search";
import SuggestiveTopics from "./SuggestiveTopics";
import FilterTopics from "./FilterTopics";
import AvaImage from "../v1/Image";
import FeedCard from "./FeedCard";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

const NO_DATA_TEXT = "Sorry no conversations are available right now";
const DATA = [
  {
    imgSrc: "profileFemale",
    name: "Simran Kaur",
    description: `Hi, I have been taking diane 35 for 3 months.
  Is this good? Is anyone else taking this?`,
    likeCount: 12,
    commentCount: 2,
    comments: [
      {
        name: "Aloki Mehta",
        description:
          "This medicine works for me. It is just an alternative to danie 35, rest all is the same.",
        imgSrc: "profileFemale",
      },
      {
        name: "Aloki Mehta",
        description:
          "This medicine works for me. It is just an alternative to danie 35, rest all is the same.",
        imgSrc: "profileFemale",
      },
    ],
  },
];

export default function Community() {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f9f9f9",
        padding: "15px",
        paddingBottom: "40px",
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <AvaSearch />
        <SuggestiveTopics />
        <FilterTopics />
        {DATA.length > 0 ? (
          <div>
            {DATA.map((datum, index) => (
              <div
                key={index}
                style={{ backgroundColor: "#FFFFFF", margin: "0px -15px" }}
              >
                <FeedCard data={datum} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <AvaImage size="xxxl" name="noData" />
            <div
              style={{
                fontSize: "12px",
                color: "#4f4f4f",
                textAlign: "center",
              }}
            >
              {NO_DATA_TEXT}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-aropund",
          position: "sticky",
          bottom: 15,
        }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#e54d9b",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "15px",
          }}
          size="medium"
          onClick={() => {
            router.push("/community/share-post");
          }}
        >
          Ask a question
        </Button>
      </div>
    </div>
  );
}
