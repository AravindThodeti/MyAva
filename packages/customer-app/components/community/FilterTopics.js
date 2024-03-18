import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { getCommunityTags } from "@/utils/ApiUtils";
import { useDispatch } from "react-redux";
import { getCommunityPosts } from "@/actions/api.action";

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4f4f4f",
    margin: "15px 0px",
  },
}));

export default function FilterTopics() {
  const dispatch = useDispatch();
  const [activeTopic, setactiveTopic] = useState({ id: 0, name: "All" });
  const [data, setdata] = useState([{ id: 0, name: "All" }]);
  const classes = useStyles();

  useEffect(() => {
    if (data.length === 1) {
      getCommunityTags()
        .then(
          (res) => {
            console.log("res", res.data);
            const newData = [{ id: 0, name: "All" }].concat(res.data);
            setdata(newData);
          },
          (err) => {
            console.error(err);
          }
        )
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const filterTopic = (topic) => {
    if (topic.id !== 0) {
      dispatch(getCommunityPosts(null, topic.id));
    }
    setactiveTopic(topic);
  };

  return (
    <div>
      <div className={classes.heading}>Filter Topics</div>
      <div
        style={{ display: "flex", overflow: "scroll", paddingBottom: "15px" }}
      >
        {data.map((datum, index) => (
          <Chip
            key={index}
            style={{
              marginRight: "15px",
              backgroundColor:
                datum.id === activeTopic.id ? "#e54d9b" : "#9a9a9a",
              color: "#fff",
              fontSize: "14px",
            }}
            label={datum.name}
            onClick={() => filterTopic(datum)}
          />
        ))}
      </div>
    </div>
  );
}
