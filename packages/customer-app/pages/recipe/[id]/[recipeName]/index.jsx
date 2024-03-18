import React, { useEffect, useCallback, useState } from "react";
import styles from "../Recipe.module.scss";
import ImageWithCaption from "@/components/imageWithCaption";
import { generateUuid } from "@/utils/UuidUtills";
import { youTubeGetID } from "@/utils/Utility";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { getRecipeById } from "@/utils/ApiUtils";
import CustomizedSnackbar from "@/components/snackBar";
import Loader from "@/components/loader";
import Parser from "react-html-parser";
import IconButton from "@material-ui/core/IconButton";
import { WhatsappShareButton } from "next-share";

function Recipe() {
  const [recipeData, setRecipeData] = useState("");
  const router = useRouter();
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id, recipeName } = router.query;

  const RECIPE_SHARE_MESSAGE = ` New Recipe Alert! Try this yummy goodness and you're tummy will thank you. click here:`;

  let RECIPE_URL;

  if (typeof window !== "undefined") {
    RECIPE_URL = window.location.href;
  }

  const getRecipeDetails = useCallback(
    async (recipeId) => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipeData(data);
      } catch (err) {
        setSnackBarOpen(true);
        let errorMessage = "";
        if (err.message) {
          errorMessage = err.message;
        } else {
          errorMessage = "Something went wrong! Please try again.";
        }
        setErrorMessage(errorMessage);
      }
    },
    [getRecipeById]
  );
  useEffect(() => {
    id && getRecipeDetails(id);
  }, [id]);

  return recipeData ? (
    <div className={styles.recipePage}>
      <CustomizedSnackbar
        open={isSnackBarOpen}
        message={errorMessage}
        setOpen={setSnackBarOpen}
      />
      <div className={styles.backgroundLiner}>
        <div className={styles.mealType}>
          <IconButton
            onClick={() => {
              router.back();
            }}
            aria-label="delete"
            style={{ padding: "5px" }}
          >
            <img
              src="/assets/images/dietTracker/leftArrowIcon.svg"
              alt="left arrow"
            />
          </IconButton>
          <h1 className={styles.mealTypeText}>Recipe</h1>
        </div>
        <div className={styles.recipeImageSection}>
          <div className={styles.recipeImage}>
            <img
              src={
                recipeData.image_url ||
                "/assets/images/dietTracker/defaultDishImage.svg"
              }
              alt={recipeData.name}
            />
          </div>
          <span className={styles.recipeName}>{recipeData.name}</span>
        </div>
        <div className={styles.goodForSection}>
          <h1 className={styles.goodForText}>Good For:</h1>
          <div className={styles.goodForDiseases}>
            {recipeData.good_for.map(({ name, image_url }) => (
              <ImageWithCaption
                key={generateUuid()}
                imageUrl={image_url}
                imageCaption={name}
                imageAlt={name}
                textColor={"#FFFFFF"}
                textSize={"14px"}
                textWeight={"400"}
                imageWidth={"20px"}
                imageHeight={"24px"}
                padding={"5px"}
              />
            ))}
          </div>
        </div>
        <div className={styles.recipeInfoAlpha}>
          <div className={styles.preparationTime}>
            <img src="/assets/images/dietTracker/watchIcon.svg" alt="watch" />
            <span className={styles.recipeTimeValue}>
              {recipeData.preparation_time}
            </span>
          </div>
          <div className={styles.complexity}>
            <img
              src="/assets/images/dietTracker/strengthIcon.svg"
              alt="complexity"
            />
            <span className={styles.complexityValue}>
              {" "}
              {recipeData.preparation_complexity}
            </span>
          </div>
          <div>
            <WhatsappShareButton title={RECIPE_SHARE_MESSAGE} url={RECIPE_URL}>
              <img
                src="/assets/images/studio/whatsappIcon.svg"
                alt="whatsapp"
              />
            </WhatsappShareButton>
          </div>
        </div>
        <div className={styles.totalNutritionValue}>
          <h1 className={styles.totalNutritionHeading}>
            Total Nutritional Value{" "}
          </h1>
          <div className={styles.nutritionalBreakDown}>
            <div className={styles.nutritionItem}>
              <span className={styles.nutritionContent}>
                {recipeData.protein}g
              </span>
              <span className={styles.nutritionName}>Protein</span>
            </div>
            <div className={styles.nutritionItem}>
              <span className={styles.nutritionContent}>
                {recipeData.carbs}g
              </span>
              <span className={styles.nutritionName}>carbs</span>
            </div>
            <div className={styles.nutritionItem}>
              <span className={styles.nutritionContent}>
                {recipeData.fibre}g
              </span>
              <span className={styles.nutritionName}>Fibre</span>
            </div>
            <div className={styles.nutritionItem}>
              <span className={styles.nutritionContent}>
                {recipeData.fats}g
              </span>
              <span className={styles.nutritionName}>Fats</span>
            </div>
            <div className={styles.nutritionItem}>
              <span className={styles.nutritionContent}>
                {recipeData.calories}
              </span>
              <span className={styles.nutritionName}>Calorie</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.directionSection}>
        <div className={styles.directionsContainer}>
          <h1 className={styles.directionHeading}>Description:</h1>
          <div className={styles.directionText}>{recipeData.description}</div>
        </div>
      </div>
      <div className={styles.directionSection}>
        <div className={styles.directionsContainer}>
          <h1 className={styles.directionHeading}>Ingredients:</h1>
          <div className={styles.directionText}>
            {Parser(recipeData.recipe)}
          </div>
        </div>
      </div>
      {/** video need to check for edge cases */}
      {recipeData.recipeVideoUrl && (
        <div className={styles.videoSection}>
          <h1 className={styles.videHeading}>View Recipe</h1>
          <div className={styles.video}>
            <iframe
              width="100%"
              height="186px"
              src={`https://www.youtube.com/embed/${youTubeGetID(
                recipeData.recipeVideoUrl
              )}`}
              title="YouTube video player"
              frameBorder="0"
              style={{ borderRadius: "16px" }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      <div className={styles.doneButtonContainer}>
        <Button
          onClick={() => {
            router.back();
          }}
          style={{
            background: "linear-gradient(302.57deg, #8B2B61 0%, #CD3C5D 100%)",
            width: "100%",
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
            fontFamily: "Lato, sans-serif",
            textTransform: "none",
            height: "40px",
            borderRadius: "24px",
          }}
        >
          Done
        </Button>
      </div>
    </div>
  ) : (
    // <Loader />
    <p>Recipe data will be coming soon.</p>
  );
}

export default Recipe;
