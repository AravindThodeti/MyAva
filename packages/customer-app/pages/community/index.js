import React, { useEffect } from "react";
import AvaSearch from "@/components/v1/Search";
import SuggestiveTopics from "@/components/community/SuggestiveTopics";
import FilterTopics from "@/components/community/FilterTopics";
import AvaImage from "@/components/v1/Image";
import FeedCard from "@/components/community/FeedCard";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityPosts } from "@/actions/api.action";

const NO_DATA_TEXT = "Sorry no conversations are available right now";

export default function Community(props) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.communityReducer.posts);
  console.log("Community", props);
  const router = useRouter();
  let isNextPageLoading = false;
  let latestRawPostApiResponse;
  let hasNextPage;
  let currentPage;

  const getScrollPercentage = () => {
    var h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";
    return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
  };

  const scrollListener = () => {
    const scrollPct = getScrollPercentage();
    // console.log(scrollPct);

    if (scrollPct > 80 && !isNextPageLoading && hasNextPage) {
      //load next page
      // console.log("isNextPageLoading", isNextPageLoading);
      isNextPageLoading = true;

      dispatch(getCommunityPosts(currentPage + 1)).then((rawPostsResponse) => {
        latestRawPostApiResponse = rawPostsResponse;
        hasNextPage = latestRawPostApiResponse.has_next;
        currentPage = latestRawPostApiResponse.page_number;
        // console.log("latestRawPostApiResponse", latestRawPostApiResponse);
        // console.log("hasNextPage", hasNextPage);
        // console.log("currentPage", currentPage);

        isNextPageLoading = false;
      });
    }
  };

  //register and unregister scroll listener only once
  useEffect(() => {
    // console.log("scrollListener registered");
    window.addEventListener("scroll", scrollListener);
    return () => {
      //cleanup: remove listener
      // console.log("scrollListener unregistered");
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  useEffect(() => {
    dispatch(getCommunityPosts()).then((rawPostsResponse) => {
      latestRawPostApiResponse = rawPostsResponse;
      hasNextPage = latestRawPostApiResponse.has_next;
      currentPage = latestRawPostApiResponse.page_number;
      // console.log("latestRawPostApiResponse", latestRawPostApiResponse);
      // console.log("hasNextPage", hasNextPage);
      // console.log("currentPage", currentPage);
    });
  }, []);

  //useEffect(() => {
  //  console.log("posts", posts);
  //}, [posts]);

  return (
    <div
      style={{ backgroundColor: "#f9f9f9", padding: "15px", minHeight: "100%" }}
    >
      <AvaSearch />
      <SuggestiveTopics />
      <FilterTopics />
      {/* <CommunityPostList /> */}
      <div>
        {posts && posts.length > 0 ? (
          <div>
            {posts.map((datum, index) => (
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
          marginTop: "15px",
          justifyContent: "space-aropund",
          position: "sticky",
          bottom: 5,
          alignItems: "center",
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
          Share your story
        </Button>
      </div>
    </div>
  );
}
