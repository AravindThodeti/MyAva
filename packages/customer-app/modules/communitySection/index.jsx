import React, { useEffect, useState } from "react";
import styles from "./CommunitySection.module.scss";
import { Button } from "@material-ui/core";
import { string } from "prop-types";
import { generateUuid } from "@/utils/UuidUtills";
import { URL_COMMUNITY } from "../../constants";
import router from "next/router";
import Link from "next/link";

const TOPIC_ITEMS = [
  {
    imageUrl: "/assets/images/healthQuery.svg",
    topicText: "Health Query",
  },
  {
    imageUrl: "/assets/images/healthRecipe.svg",
    topicText: "Healthy Recipes",
  },
  {
    imageUrl: "/assets/images/mentalHealth.svg",
    topicText: "Mental Health",
  },
  {
    imageUrl: "/assets/images/event.svg",
    topicText: "Events",
  },
  {
    imageUrl: "/assets/images/infertility.svg",
    topicText: "Infertility ",
  },
  {
    imageUrl: "/assets/images/sexualHealth.svg",
    topicText: "Sexual Health",
  },
  {
    imageUrl: "/assets/images/testimonial.svg",
    topicText: "Testimonials",
  },
  {
    imageUrl: "/assets/images/pcosFighter.svg",
    topicText: "PCOS Fighters",
  },
  {
    imageUrl: "/assets/images/periodHealth.svg",
    topicText: "Period Health",
  },
];

const TopicItem = ({ imageUrl, topicText }) => {
  return (
    <div
      onClick={() => {
        router.push(URL_COMMUNITY);
      }}
      className={styles.topicItem}
    >
      <img src={imageUrl} alt={topicText} />
      <span>{topicText}</span>
    </div>
  );
};
TopicItem.propTypes = {
  imageUrl: string,
  topicText: string,
};

const CommunitySection = () => {
  const [isShowMoreVisible, setSeeMoreVisible] = useState(true);
  const [topicItems, setTopicItems] = useState(TOPIC_ITEMS.slice(0, 3));

  const handleChangeShowMore = () => {
    setSeeMoreVisible((value) => !value);
  };

  useEffect(() => {
    if (isShowMoreVisible) {
      setTopicItems(TOPIC_ITEMS.slice(0, 3));
    } else {
      setTopicItems(TOPIC_ITEMS);
    }
  }, [isShowMoreVisible]);

  return (
    <div className={styles.communitySection}>
      <img
        className={styles.questionMarkImage}
        src="/assets/images/questionMarkCropped.svg"
        alt="background"
      />
      <div className={styles.askNowSection}>
        <div className={styles.askNow}>
          <span className={styles.heading}>Got a question? </span>
          <span className={styles.subHeading}>Feel Free to ask anything</span>
          <Button
            onClick={() => {
              router.push(URL_COMMUNITY);
            }}
            style={{
              background: "#C93B5D",
              color: "white",
              fontWeight: "600",
              fontSize: "12px",
              fontFamily: "Poppins",
              textTransform: "none",
              marginTop: "15px",
              width: "93px",
              height: "30px",
              borderRadius: "41px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
            }}
          >
            Ask now
          </Button>
        </div>
      </div>
      <h1 className={styles.cardText}>
        Experts answering your health concerns for free
      </h1>
      <div className={styles.sampleQuestions}>
        <div className={styles.question}>
          <div className={styles.devider}></div> What to Eat for PCOS ?
        </div>
        <div className={styles.question}>
          <div className={styles.devider}></div>I&apos;m Facing Hairfall
        </div>
        {!isShowMoreVisible && (
          <>
            <div className={styles.question}>
              <div className={styles.devider}></div>
              How often should a woman get a pelvic exam & Pap test?
            </div>
            <div className={styles.question}>
              <div className={styles.devider}></div>
              What causes mental health problems?
            </div>
          </>
        )}
      </div>

      <div className={styles.communityLink}>
        <Link href={URL_COMMUNITY}>
          <a style={{ textDecoration: "none", color: "#4F4F4F" }}>
            Join Women Exclusive Community{" "}
            <img src="/assets/images/rightArrow.svg" alt="right arrow" />
          </a>
        </Link>
      </div>
      <div className={styles.topics}>
        {topicItems.map(({ topicText, imageUrl }) => (
          <TopicItem
            key={generateUuid()}
            imageUrl={imageUrl}
            topicText={topicText}
          />
        ))}
        <div className={styles.buttonSection}>
          <Button
            onClick={handleChangeShowMore}
            style={{
              background: "#EBEBEB",
              color: "#C93B5D",
              fontWeight: "600",
              fontSize: "12px",
              fontFamily: "Poppins",
              textTransform: "none",
              marginTop: "15px",
              height: "25px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            endIcon={
              <img
                style={{ width: "10px", height: "10px" }}
                src={`/assets/images/${
                  isShowMoreVisible ? "filledDownArrow" : "filledUpArrow"
                }.svg`}
                alt="down arrow"
              />
            }
          >
            Show {isShowMoreVisible ? "more" : "less"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
