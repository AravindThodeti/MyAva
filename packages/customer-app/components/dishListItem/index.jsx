import React from "react";
import styles from "./DishListItem.module.scss";
import { string, func, number } from "prop-types";
import IconButton from "@material-ui/core/IconButton";

const propTypes = {
  dishName: string,
  modifyDishQuantity: func,
  quantity: number,
  dishId: number,
  unit: string,
};

const DishListItem = ({
  dishId,
  dishName,
  modifyDishQuantity,
  quantity,
  unit,
}) => {
  const handleClickDecreaseQuantity = () => {
    if (quantity > 0) {
      modifyDishQuantity(dishId, quantity - 1);
    }
  };

  const handleClickIncreaseQuantity = () => {
    modifyDishQuantity(dishId, quantity + 1);
  };

  const firstRender = React.useRef(true);
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    modifyDishQuantity(dishName, quantity);
  }, [quantity]);

  return (
    <div className={styles.dishListItem}>
      <span className={styles.dishName}>{dishName}</span>
      <div className={styles.dishQuantity}>
        <span className={styles.dishUnit}>{unit}</span>
        <div className={styles.dishCounter}>
          <IconButton style={{ padding: "0px" }} aria-label="replace meal">
            <img
              onClick={handleClickDecreaseQuantity}
              src="/assets/images/dietTracker/decreaseIcon.svg"
              alt="decrease"
            />
          </IconButton>
          <span className={styles.counterValue}>{quantity}</span>
          <IconButton style={{ padding: "0px" }} aria-label="replace meal">
            <img
              onClick={handleClickIncreaseQuantity}
              src="/assets/images/dietTracker/increaseIcon.svg"
              alt="increase"
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

DishListItem.propTypes = propTypes;
export default DishListItem;
