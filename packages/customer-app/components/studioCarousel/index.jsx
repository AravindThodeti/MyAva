import React from "react";
import styles from "./StudioCarousel.module.scss";
import Carousel from "react-material-ui-carousel";
import { string, arrayOf, shape } from "prop-types";
import { useRouter } from "next/router";

const CarouselItem = (props) => {
  const router = useRouter();
  return (
    <img
      onClick={() => {
        router.push(props.url).then(() => window.scrollTo(0, 0));
      }}
      className={styles.carouselImage}
      src={props.imageUrl}
      alt={props.name}
    />
  );
};

CarouselItem.propTypes = {
  imageUrl: string,
};

const propTypes = {
  /** array of carousel items */
  itemsArray: arrayOf(
    shape({
      name: string,
      imageUrl: string,
    })
  ),
  /** active indicator color */
  color: string,
};

const StudioCarousel = ({ itemsArray, color }) => {
  return (
    <div className={styles.studioCarousel}>
      <Carousel
        activeIndicatorProps={{
          style: {
            color: color,
          },
        }}
      >
        {itemsArray.map((item) => (
          <CarouselItem
            key={item.name}
            imageUrl={item.imageUrl}
            url={item.url}
            name={item.name}
          />
        ))}
      </Carousel>
    </div>
  );
};

StudioCarousel.propTypes = propTypes;
StudioCarousel.defaultProps = {
  color: "#CD3C5D",
};
export default StudioCarousel;
