import styles from "./SummaryItem.module.scss";
import React from "react";
import { generateUuid } from "../../utils/UuidUtills";
import NutrientValueBar from "../../modules/nutrientValueBar";
import { number, string, array } from "prop-types";

const propTypes = {
  noOfItems: number,
  imageUrl: string,
  diseaseName: string,
  nutrientsData: array,
};

const SummaryItem = ({ noOfItems, imageUrl, diseaseName, nutrientsData }) => {
  return (
    <div className={styles.summaryItem}>
      <span className={styles.itemsCount}>{noOfItems} items</span>
      <figure className={styles.figure}>
        <img src={imageUrl} alt="acne icon" />
        <figcaption className={styles.figCaption}>{diseaseName}</figcaption>
      </figure>
      {nutrientsData.map((value) => (
        <NutrientValueBar
          key={generateUuid()}
          nutrientName={value.name}
          consumed={value.available}
          prescribedValue={value.outOf}
          unit={value.unit}
        />
      ))}
    </div>
  );
};

SummaryItem.propTypes = propTypes;
export default SummaryItem;
