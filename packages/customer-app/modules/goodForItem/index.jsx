import styles from "./GoodForItem.module.scss";
import React from "react";
import { number, string } from "prop-types";

const propTypes = {
  noOfItems: number,
  imageUrl: string,
  diseaseName: string,
  textColor: string,
};

const GoodForItem = ({ noOfItems, imageUrl, diseaseName, textColor }) => {
  return (
    <div className={styles.goodForItem}>
      <div className={styles.goodForImage}>
        <img src={imageUrl} alt="acne icon" />
        <div className={styles.separatingLine}></div>
      </div>
      <div style={{ color: textColor }} className={styles.disease}>
        <span className={styles.diseaseName}>{diseaseName}</span>
        <span className={styles.itemsCount}>{noOfItems}</span>
      </div>
    </div>
  );
};

GoodForItem.propTypes = propTypes;
export default GoodForItem;
