import React from "react";
import styles from "./RecipeCategory.module.scss";
import { string, func } from "prop-types";

const propTypes = {
  category: string,
  selectedCategory: string,
  setSelectedCategory: func,
};

const RecipeTagListItem = ({
  category,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleClickCategory = () => {
    setSelectedCategory(category);
  };
  const isActive = selectedCategory === category;

  return (
    <span
      onClick={handleClickCategory}
      className={`${isActive && styles.categoryActive} ${
        styles.categoryListItem
      }`}
    >
      {category}
    </span>
  );
};

RecipeTagListItem.propTypes = propTypes;
export default RecipeTagListItem;
