import React from "react";
import styles from "./ImageWithCaption.module.scss";
import { string } from "prop-types";

const propTypes = {
  /** image url */
  imageUrl: string,
  /** caption fot the image */
  imageCaption: string,
  /** alt value for the image */
  imageAlt: string,
  /** width of the image */
  imageWidth: string,
  /** height of the image */
  imageHeight: string,
  /** padding for the image */
  padding: string,
  /** caption text color */
  textColor: string,
  /** font size for the caption */
  textSize: string,
  /** font weight for the caption */
  textWeight: string,
};

const defaultProps = {
  padding: 0,
};

const ImageWithCaption = ({
  imageUrl,
  imageCaption,
  imageAlt,
  textColor,
  textSize,
  textWeight,
  imageWidth,
  imageHeight,
  padding,
}) => {
  return (
    <figure className={styles.figure}>
      <img
        style={{ width: imageWidth, height: imageHeight }}
        src={imageUrl}
        alt={imageAlt}
      />
      <figcaption
        style={{
          color: textColor,
          fontSize: textSize,
          fontWeight: textWeight,
          padding,
        }}
        className={styles.figCaption}
      >
        {imageCaption}
      </figcaption>
    </figure>
  );
};

ImageWithCaption.propTypes = propTypes;
ImageWithCaption.defaultProps = defaultProps;
export default ImageWithCaption;
