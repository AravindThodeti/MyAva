import React from "react";
import PAGE_TITLE, {
  PAGE_SUB_TITLE,
  PCOS_GUIDE,
  PAGE_TITLE_1,
} from "../../constants/pcos/pcos-guide.metadata";
import AvaImage from "@/components/v1/Image";
import QuestionCard from "@/components/v1/QuestionCard";
import pcosGuideStyles from "../../constants/pcos/pcos-guide.style";

export default function PcosGuide() {
  const classes = pcosGuideStyles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.coverContainer}>
        <AvaImage name="pcosGuide" size="large" />
      </div>
      <div className={classes.titleContainer}>
        <div className={classes.title}>
          <span className={classes.titleExtra}>{PAGE_TITLE}&nbsp;</span>
          <span>{PAGE_TITLE_1}</span>
        </div>
        <div className={classes.subTitle}>{PAGE_SUB_TITLE}</div>
      </div>
      <div>
        {PCOS_GUIDE.map((datum, index) => (
          <QuestionCard key={index} data={datum} />
        ))}
      </div>
    </div>
  );
}
