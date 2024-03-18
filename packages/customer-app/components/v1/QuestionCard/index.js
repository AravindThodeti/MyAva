import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import AvaImage from "@/components/v1/Image";
import { object } from "prop-types";
const pcosPaperStyle = makeStyles(() => ({
  root: {
    marginBottom: "12px",
    display: "flex",
    padding: "5px",
    alignItems: "center",
  },
}));
const propTypes = {
  data: object,
};

const QuestionCard = ({ data }) => {
  const pcosPaperClasses = pcosPaperStyle();
  const router = useRouter();
  return (
    <Paper
      key={data.id}
      elevation={3}
      className={pcosPaperClasses.root}
      onClick={() =>
        router
          .push("/pcos-guide/[id]", `/pcos-guide/${data.id}`)
          .then(() => window.scrollTo(0, 0))
      }
    >
      <div style={{ marginRight: "12px" }}>
        <AvaImage name={data.iconSrc} />
      </div>
      <div>
        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#4f4f4f" }}>
          {data.title}
        </div>
        <div style={{ fontSize: "12px", color: "#4f4f4f" }}>
          {data.subTitle}
        </div>
      </div>
    </Paper>
  );
};
QuestionCard.propTypes = propTypes;
export default QuestionCard;
