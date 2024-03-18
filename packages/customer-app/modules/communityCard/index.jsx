import React from "react";
import styles from "./CommunityCard.module.scss";
import { Button } from "@material-ui/core";
import { URL_COMMUNITY } from "../../constants";
import { useRouter } from "next/router";

const CommunityCard = () => {
  const router = useRouter();
  const handleClickJoinNow = () => {
    router.push(URL_COMMUNITY);
  };

  return (
    <div className={styles.communityCard}>
      <h1 className={styles.cardHeading}>Community</h1>
      <h1 className={styles.askQuestions}>Ask questions</h1>
      <h1 className={styles.connectText}>Connect with fellow women</h1>
      <img
        className={styles.bgImage}
        src="/assets/images/workingWoman.svg"
        alt="working woman"
      />
      <Button
        style={{
          width: "124px",
          height: "40px",
          backgroundColor: "white",
          borderRadius: "40px",
          color: "#BF3959",
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: "Poppins",
          position: "absolute",
          bottom: "45px",
        }}
        onClick={handleClickJoinNow}
      >
        JOIN NOW
      </Button>
    </div>
  );
};

export default CommunityCard;
