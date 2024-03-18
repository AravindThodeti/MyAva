import React from "react";
import styles from "./FeedbackSection.module.scss";
import Carousel from "react-material-ui-carousel";
import { string } from "prop-types";
import { generateUuid } from "@/utils/UuidUtills";

const FEEDBACK_ITEMS = [
  {
    name: "Ketaki",
    imageUrl: "/assets/images/ketaki.svg",
    feedBackText:
      "I joined the program at Ava and firstly noticed that my acne issue was solved. I also got natural periods since the last 2 months and lost 4-5 inches around my waist.My hair fall also reduced drastically.I got all my queries and doubts cleared by the team.The diet plan and workout plan was absolutely easy and not at all boring.I was about 75-80% consistent with the program and was able to see changes in myself.",
  },
  {
    name: "KONGKONA",
    imageUrl: "/assets/images/kongkona.svg",
    feedBackText:
      "I joined Ava through Instagram and am extremely happy with my progress.I saw weight reduction from 72-67 kilos and have lost inches as well.I got my periods naturally after 3 months and got the next period within a month.My cycles are getting regularised.I have no constipation and acidity. My skin is totally clear and free of blemishes. I am so glad I joined Ava and inculcated this healthy lifestyle change",
  },
  {
    name: "NILAM ACHARYA",
    imageUrl: "/assets/images/nilam.svg",
    feedBackText:
      "I joined the PCOS Lifestyle program 3 month back, suffering from PCOS for almost 4 years. My biggest problems were irregular periods and facial hair. The first call that I had with the gynaecologist was very informative and she helped me clear all my doubts about PCOS. My nutritionist has also been very helpful and readily available throughout and I am so glad to see the changes already. I lost 2 kgs in a month, I have been eating better and exercising regularly and got my periods naturally after 2.5 months (79 days) of missing them. My hirsutism is majorly under control. My issue of sweating excessively due to thyroid has subsided too and I am now getting proper sleep of 8 hours every night. Thankful to the whole team.",
  },
  {
    name: "Nivetha",
    imageUrl: "/assets/images/nivetha.svg",
    feedBackText:
      "MyAva is the best.They have the best team who constantly keeps motivating and encouraging you in achieving your weight loss goals.The best thing about my ava is that they believe in holistic approach rather than starving.love to my ava team.",
  },
  {
    name: "PATRICIA",
    imageUrl: "/assets/images/patricia.svg",
    feedBackText:
      "I got diagnosed with PCOS about 2 years ago and had been struggling with irregular periods and facial hair since then. It has been about 3 months into the program and there has been a lot of change in my food habits and activity levels by following a diet plan and exercising regularly. I am really happy with these changes. The gynaecologist was very helpful when I got worried about my irregular cycles and advised me to focus on long term lifestyle improvement. I feel less stressed about my cycles now. My facial hair growth has also reduced considerably.",
  },
  {
    name: "PRASANNA",
    imageUrl: "/assets/images/prasanna.svg",
    feedBackText:
      "I am so glad I came across Ava on IG,the gynaecologist understood my problem well, and shared tips about how I can better my lifestyle. The nutritionist is very helpful and helps me out with interesting alternate food options whenever I’m bored of the usual diet plan.The fitness expert was motivating and explained the workout plan. I liked the workout plan and have lost inches. I got my periods naturally after 5 months and am wholeheartedly enjoying the program.",
  },
  {
    name: "Shraddha Sharma",
    imageUrl: "/assets/images/shraddha.svg",
    feedBackText:
      "I chose MyAva because it gave me a complete package of gynaecologist consultation, nutritional diet and exercise. These three mantras are necessary to bring back your hormones under control. The gynaecologist helped me to intake the correct supplements, nutritional experts have me a chart full of interesting healthy food and also the exercises needed for my body which is helping me to cure my PCOS.I got my period naturally after 43 days and I also lost a few inches through the course of the program. ",
  },
  {
    name: "VARSHA",
    imageUrl: "/assets/images/varsha.svg",
    feedBackText:
      "I came across Ava on Instagram and have been following the diet plans given by them consistently. I feel very active and happy about the lifestyle changes I have made so far.I found the team and experts to be very responsive and supportive. In the beginning,I found it a bit difficult to follow the diet because I am a medical student with a very busy schedule. But I am thrilled to see a difference of 2 kgs within a month. I also got my period naturally this month and aim to get rid of acne, lose weight and get regular periods by the end of the program.",
  },
];

const CarouselItem = ({ name, feedbackText, imageUrl }) => {
  return (
    <div className={styles.feedBackCard}>
      <span className={styles.userName}>-{name}</span>
      <img
        className={styles.openingComma}
        src="/assets/images/openingComma.svg"
        alt="comma"
      />
      <img
        className={styles.closingComma}
        src="/assets/images/closingComma.svg"
        alt="comma"
      />
      <p className={styles.feedBackText}>{feedbackText}</p>
      <img src={imageUrl} alt={name} className={styles.userImage} />
    </div>
  );
};
CarouselItem.propTypes = {
  name: string,
  imageUrl: string,
  feedbackText: string,
};

const FeedbackCarousel = ({ activeIndicatorColor }) => {
  return (
    <div className={styles.feedbackSection}>
      <Carousel
        activeIndicatorProps={{
          style: {
            color: activeIndicatorColor,
          },
        }}
        className={styles.carouselRoot}
      >
        {FEEDBACK_ITEMS.map(({ name, imageUrl, feedBackText }) => {
          return (
            <CarouselItem
              key={generateUuid()}
              imageUrl={imageUrl}
              feedbackText={feedBackText}
              name={name}
            />
          );
        })}
      </Carousel>
    </div>
  );
};
FeedbackCarousel.propTypes = {
  activeIndicatorColor: string,
};
FeedbackCarousel.defaultProps = {
  activeIndicatorColor: "#FFFFFF",
};
export default FeedbackCarousel;
