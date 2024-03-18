import React from "react";
import styles from "./ProgramsCarousel.module.scss";
import Carousel from "react-material-ui-carousel";
import { string, arrayOf, shape } from "prop-types";
import { useRouter } from "next/router";

const CarouselItem = (props) => {
  const router = useRouter();
  return (
    <img
      onClick={() => {
        router.push("/programs");
      }}
      className={styles.carouselImage}
      src={props.imageUrl}
      alt={"program"}
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

const ProgramsCarousel = ({ itemsArray, color }) => {
  return (
    <div className={styles.programsCarousel}>
      <Carousel
        activeIndicatorProps={{
          style: {
            color: color,
          },
        }}
      >
        {itemsArray.map((item) => (
          <CarouselItem key={item.name} imageUrl={item.imageUrl} />
        ))}
      </Carousel>
    </div>
  );
};

ProgramsCarousel.propTypes = propTypes;
ProgramsCarousel.defaultProps = {
  color: "#CD3C5D",
};
export default ProgramsCarousel;
